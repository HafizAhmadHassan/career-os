import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AlarmClock, ArrowLeft, Code2, MessageSquare, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useInterviewData } from '@/hooks/useInterviewData';
import { getCodingChallenge } from '@/data/codingChallenges';
import { InterviewNav } from '@/components/interview-nav';
import { Badge, Btn, Card, Section, Stat, inputClass } from '@/components/lab-ui';
import type { CodingAttemptRecord } from '@/types';

export default function CodingWorkspacePage() {
  const { challengeId } = useParams<{ challengeId: string }>();
  const data = useInterviewData();
  const challenge = getCodingChallenge(challengeId ?? '');

  const [code, setCode] = useState('');
  const [notes, setNotes] = useState('');
  const [testsPassed, setTestsPassed] = useState(0);
  const [totalTests, setTotalTests] = useState(1);
  const [elapsed, setElapsed] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) return;
    const t = window.setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => window.clearInterval(t);
  }, [submitted]);

  if (!challenge) {
    return (
      <div className="space-y-4">
        <Link to="/interview/coding" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Coding</Link>
        <Card><p className="text-sm">Challenge not found.</p></Card>
      </div>
    );
  }

  const attempts = data.codingAttempts.filter((a) => a.challengeId === challenge.id);

  async function submit() {
    if (!challenge) return;
    const attempt: CodingAttemptRecord = {
      id: `cc-${Date.now().toString()}-${Math.random().toString(36).slice(2, 8)}`,
      challengeId: challenge.id,
      code,
      testsPassed,
      totalTests: Math.max(1, totalTests),
      timeTakenSeconds: elapsed,
      notes,
      createdAt: new Date().toISOString(),
    };
    await data.saveCodingAttempt(attempt);
    setSubmitted(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link to="/interview/coding" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Coding</Link>
        <div className="flex items-center gap-1.5">
          <Badge tone="primary">{challenge.title}</Badge>
          <Badge tone={challenge.difficulty === 'beginner' ? 'green' : challenge.difficulty === 'intermediate' ? 'blue' : 'amber'}>{challenge.difficulty}</Badge>
          <Badge tone="muted">{challenge.category}</Badge>
        </div>
      </div>
      <InterviewNav active="/interview/coding" />

      <Card>
        <p className="text-sm leading-relaxed">{challenge.prompt}</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {challenge.examples.map((e, i) => (
            <div key={i} className="rounded-md bg-secondary p-2 text-xs">
              <p className="font-medium text-muted-foreground">Example {i + 1}</p>
              <pre className="mt-1 whitespace-pre-wrap text-foreground">Input:  {e.input}{'\n'}Output: {e.output}</pre>
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {challenge.testHints.map((h) => <Badge key={h} tone="muted">{h}</Badge>)}
        </div>
      </Card>

      {!submitted ? (
        <Section
          id="solve"
          icon={<Code2 className="h-4 w-4" />}
          title="Solve it"
          right={
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <AlarmClock className="h-4 w-4" /> {fmt(elapsed)}
            </div>
          }
        >
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="def solve(data):\n    # your code here\n    return ..."
            spellCheck={false}
            className={cn(inputClass(), 'min-h-[280px] resize-y p-4 font-mono text-sm')}
          />
          <div className="mt-3 flex flex-wrap items-end gap-4">
            <label className="text-xs text-muted-foreground">
              Tests passed
              <input type="number" min={0} value={testsPassed} onChange={(e) => setTestsPassed(Math.max(0, Number(e.target.value) || 0))} className="mt-1 w-20 rounded-md border border-border bg-background px-2 py-1 text-sm" />
            </label>
            <label className="text-xs text-muted-foreground">
              Total tests
              <input type="number" min={1} value={totalTests} onChange={(e) => setTotalTests(Math.max(1, Number(e.target.value) || 1))} className="mt-1 w-20 rounded-md border border-border bg-background px-2 py-1 text-sm" />
            </label>
            <div className="flex-1" />
            <Btn onClick={() => void submit()} disabled={!code.trim()}><Send className="h-4 w-4" /> Submit attempt</Btn>
          </div>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes: approach, blockers, what you'd test next" className={cn(inputClass(), 'mt-3 min-h-[60px] resize-y text-sm')} />
        </Section>
      ) : (
        <Section
          id="solution"
          icon={<MessageSquare className="h-4 w-4" />}
          title="Solution notes"
          subtitle="Compare your approach with the intended one. Pass ratio is stored as real data."
        >
          <pre className="whitespace-pre-wrap rounded-md border border-border p-4 text-sm leading-relaxed text-muted-foreground">{challenge.solutionNotes}</pre>
          <div className="mt-3 flex flex-wrap gap-2">
            <Btn onClick={() => { setSubmitted(false); setElapsed(0); }}>Try again</Btn>
            <Link to="/interview/coding" className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent">All challenges</Link>
          </div>
        </Section>
      )}

      <Section id="history" icon={<Code2 className="h-4 w-4" />} title="Attempt history">
        {attempts.length === 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Stat label="Attempts" value={0} icon={<Code2 className="h-4 w-4" />} />
          </div>
        ) : (
          <div className="space-y-2">
            {attempts.map((a) => {
              const pct = a.totalTests > 0 ? Math.round((a.testsPassed / a.totalTests) * 100) : 0;
              return (
                <div key={a.id} className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-border p-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Badge tone={pct === 100 ? 'green' : pct >= 50 ? 'amber' : 'red'}>{a.testsPassed}/{a.totalTests}</Badge>
                    <span className="text-xs text-muted-foreground">{a.createdAt.slice(0, 10)} · {fmt(a.timeTakenSeconds)}</span>
                  </div>
                  <span className="min-w-0 truncate text-xs text-muted-foreground">{a.notes || '—'}</span>
                </div>
              );
            })}
          </div>
        )}
      </Section>
    </div>
  );
}

function fmt(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}