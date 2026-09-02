import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AlarmClock, ArrowLeft, ChevronRight, Eye, Send, Swords } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useInterviewData } from '@/hooks/useInterviewData';
import { MockInterviewRepository } from '@/lib/storage/interviewRepositories';
import { InterviewNav } from '@/components/interview-nav';
import { Badge, Btn, Card, Section, inputClass, ProgressBar } from '@/components/lab-ui';
import type { InterviewQuestion, MockInterview, MockInterviewResult } from '@/types';

export default function MockInterviewSessionPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const data = useInterviewData();
  const [mock, setMock] = useState<MockInterview | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [elapsed, setElapsed] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [selfScore, setSelfScore] = useState(70);
  const [notes, setNotes] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      if (!sessionId) return;
      const m = await MockInterviewRepository.get(sessionId);
      setMock(m ?? null);
      setLoaded(true);
      // resume positions: index = number of results already answered
      if (m && m.results.length < m.questionIds.length) {
        setIndex(m.results.length);
      }
    })();
  }, [sessionId]);

  useEffect(() => {
    if (!mock || mock.status !== 'in_progress' || revealed) return;
    const t = window.setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => window.clearInterval(t);
  }, [mock, revealed]);

  const question: InterviewQuestion | undefined = useMemo(
    () => (mock ? data.questions.find((q) => q.id === mock.questionIds[index]) : undefined),
    [mock, index, data.questions],
  );

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(t);
  }, [toast]);

  if (loaded && !mock) {
    return (
      <div className="space-y-4">
        <Link to="/interview/mock" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Mock interviews</Link>
        <Card><p className="text-sm">Mock interview not found.</p></Card>
      </div>
    );
  }

  if (!mock || !question) {
    return <p className="text-sm text-muted-foreground">Loading…</p>;
  }

  const done = mock.status === 'completed' || (mock.results.length >= mock.questionIds.length && mock.questionIds.length > 0);

  async function revealIdeal() {
    setRevealed(true);
  }

  async function next() {
    const result: MockInterviewResult = {
      questionId: question!.id,
      answer,
      timeTakenSeconds: elapsed,
      revealed: true,
      selfScore,
      notes,
    };
    const mockData = mock as MockInterview;
    const updated: MockInterview = {
      ...mockData,
      results: [...mockData.results, result],
      status: index + 1 >= mockData.questionIds.length ? 'completed' : 'in_progress',
      completedAt: index + 1 >= mockData.questionIds.length ? new Date().toISOString() : undefined,
    };
    await MockInterviewRepository.save(updated);
    setMock(updated);
    if (updated.status === 'completed') {
      setToast('★ Mock interview complete');
      return;
    }
    setIndex((i) => i + 1);
    setAnswer('');
    setElapsed(0);
    setRevealed(false);
    setSelfScore(70);
    setNotes('');
    await data.refresh();
  }

  if (done) {
    const avg = mock.results.length ? Math.round(mock.results.reduce((a, r) => a + r.selfScore, 0) / mock.results.length) : 0;
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Session complete</h1>
          <p className="mt-1 text-sm text-muted-foreground">{mock.title}</p>
        </div>
        <InterviewNav active="/interview/mock" />
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-3xl font-bold text-primary">{avg}</div>
              <p className="text-xs text-muted-foreground">avg self-score across {mock.results.length} questions</p>
            </div>
            <div className="flex gap-2">
              <Btn size="sm" variant="secondary" onClick={() => window.history.back()}>Back</Btn>
              <Link to="/interview/mock" className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">Run another</Link>
            </div>
          </div>
        </Card>
        <Section id="summary" icon={<Swords className="h-4 w-4" />} title="Question by question">
          <div className="space-y-2">
            {mock.results.map((r, i) => {
              const q = data.questions.find((x) => x.id === r.questionId);
              return (
                <div key={r.questionId} className="rounded-md border border-border p-3">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-medium">{i + 1}. {q?.question ?? r.questionId}</p>
                    <Badge tone={r.selfScore >= 70 ? 'green' : r.selfScore >= 40 ? 'amber' : 'red'}>{r.selfScore}</Badge>
                  </div>
                  {r.revealed && (
                    <div className="mt-2 rounded border border-border p-3">
                      <p className="mb-1 text-xs font-medium text-muted-foreground">Suggested answer</p>
                      <p className="whitespace-pre-wrap text-xs text-muted-foreground">{q?.suggestedAnswer ?? '—'}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Section>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {toast && <div className="fixed right-4 top-16 z-50 rounded-md border border-border bg-background px-4 py-2 text-sm shadow-lg">{toast}</div>}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link to="/interview/mock" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Mock interviews</Link>
        <div className="text-xs text-muted-foreground">
          {mock.title} · Question {index + 1} of {mock.questionIds.length}
        </div>
      </div>

      <ProgressBar value={(index / mock.questionIds.length) * 100} />

      {revealed ? (
        <Section
          id="ideal"
          icon={<Eye className="h-4 w-4" />}
          title="Here's how an ideal answer would sound"
          subtitle="Now score your own attempt honestly — this is real data."
        >
          <div className="whitespace-pre-wrap rounded-md border border-border p-4 text-sm leading-relaxed text-muted-foreground">{question.suggestedAnswer ?? 'No ideal answer prepared for this question.'}</div>
          <div className="mt-4 flex flex-wrap items-end gap-4">
            <div>
              <p className="mb-1 text-xs font-medium text-muted-foreground">Self-score</p>
              <input type="range" min={0} max={100} value={selfScore} onChange={(e) => setSelfScore(Number(e.target.value))} className="w-56 accent-primary" />
              <span className="ml-2 text-sm font-medium">{selfScore}</span>
            </div>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="What would you say differently next time?" className={cn(inputClass(), 'min-h-[60px] max-w-sm flex-1 resize-y')} />
            <Btn size="sm" onClick={() => void next()}>
              {index + 1 >= mock.questionIds.length ? 'Finish session' : 'Next question'} <ChevronRight className="h-3.5 w-3.5" />
            </Btn>
          </div>
        </Section>
      ) : (
        <Section
          id="current"
          icon={<Swords className="h-4 w-4" />}
          title={`Question ${index + 1} of ${mock.questionIds.length}`}
          right={
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <AlarmClock className="h-4 w-4" /> {fmt(elapsed)}
            </div>
          }
        >
          <div className="mb-3 flex flex-wrap gap-1.5">
            <Badge tone="primary">{question.category}</Badge>
            <Badge tone="muted">{question.difficulty}</Badge>
            <Badge tone="muted">{question.type.replace(/_/g, ' ')}</Badge>
          </div>
          <p className="text-lg font-medium leading-snug">{question.question}</p>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Answer as you would in the interview. When you're done, reveal the ideal answer and score yourself."
            className={cn(inputClass(), 'mt-4 min-h-[240px] resize-y p-3')}
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <Btn onClick={() => void revealIdeal()} disabled={!answer.trim()}><Send className="h-4 w-4" /> Submit & reveal ideal</Btn>
          </div>
        </Section>
      )}
    </div>
  );
}

function fmt(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}