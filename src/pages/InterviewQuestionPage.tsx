import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AlarmClock, ArrowLeft, Check, ChevronDown, HelpCircle, ListChecks, PenLine, RotateCcw, Send, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useInterviewData } from '@/hooks/useInterviewData';
import { computeRubricOverall, confidenceMeta } from '@/lib/interviewReadiness';
import { interviewConfidenceOrder, rubricKeys } from '@/types';
import type { InterviewConfidence, RubricScores } from '@/types';
import { Badge, Btn, Card, Section, inputClass } from '@/components/lab-ui';

type Phase = 'start' | 'answer' | 'evaluate' | 'reveal';

const RUBRIC_LABELS: Record<keyof RubricScores, string> = {
  accuracy: 'Accuracy & relevance',
  depth: 'Depth of knowledge',
  clarity: 'Clarity of explanation',
  architecture: 'Architecture choices',
  tradeoffs: 'Trade-offs considered',
  production: 'Production / ops awareness',
  communication: 'Communication & delivery',
};

const RUBRIC_HINTS: Record<keyof RubricScores, string> = {
  accuracy: 'Was your answer factually correct and on-topic?',
  depth: 'Did you show real depth, not surface-level recall?',
  clarity: 'Was your explanation easy to follow and structured?',
  architecture: 'Did you reference concrete architecture that fits the problem?',
  tradeoffs: 'Did you weigh trade-offs (cost, latency, quality)?',
  production: 'Did you cover evals, observability, security, scaling?',
  communication: 'Would an interviewer understand and rate your delivery?',
};

export default function InterviewQuestionPage() {
  const { questionId } = useParams<{ questionId: string }>();
  const data = useInterviewData();
  const q = data.questions.find((x) => x.id === questionId);
  const attempts = data.attempts.filter((a) => a.questionId === questionId);

  const [phase, setPhase] = useState<Phase>('start');
  const [confidenceBefore, setConfidenceBefore] = useState<InterviewConfidence>('good');
  const [answer, setAnswer] = useState('');
  const [notes, setNotes] = useState('');
  const [elapsed, setElapsed] = useState(0);
  const [scores, setScores] = useState<RubricScores>({ accuracy: 3, depth: 3, clarity: 3, architecture: 3, tradeoffs: 3, production: 3, communication: 3 });
  const [manualAdjust, setManualAdjust] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [expandedFollowUp, setExpandedFollowUp] = useState<string | null>(null);

  useEffect(() => {
    if (phase !== 'answer') return;
    const t = window.setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => window.clearInterval(t);
  }, [phase]);

  if (!q) {
    return (
      <div className="space-y-4">
        <Link to="/interview" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Back</Link>
        <Card><p className="text-sm">Question not found.</p></Card>
      </div>
    );
  }

  const meta = confidenceMeta[q.confidence];
  const overall = manualAdjust !== null ? manualAdjust : computeRubricOverall(scores);

  async function saveAndReveal() {
    if (!q) return;
    setSaving(true);
    await data.submitAttempt({
      questionId: q.id,
      answer,
      scores,
      timeTakenSeconds: elapsed,
      confidenceBefore,
      reviewedIdeal: true,
      notes,
    });
    setSaving(false);
    setPhase('reveal');
    setManualAdjust(null);
  }

  function resetForRetry() {
    setPhase('answer');
    setAnswer('');
    setElapsed(0);
    setScores({ accuracy: 3, depth: 3, clarity: 3, architecture: 3, tradeoffs: 3, production: 3, communication: 3 });
    setNotes('');
  }

  const followUps = q.followUps ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link to="/interview" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Interview Lab
        </Link>
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge tone="primary">{q.category}</Badge>
          <Badge tone="muted">{q.difficulty}</Badge>
          <Badge tone="muted">{q.type.replace(/_/g, ' ')}</Badge>
          <span className={cn('rounded-md px-2 py-0.5 text-xs', meta.tone)}>{meta.label}</span>
        </div>
      </div>

      <Card className="border-primary/30">
        <p className="text-lg font-medium leading-snug">{q.question}</p>
        {q.relatedProjectId && (
          <p className="mt-2 text-xs text-muted-foreground">
            Asked in the context of your portfolio project — interviewers will ask about the work you ship.
          </p>
        )}
        {answersToShow(q) && (
          <div className="mt-3 border-t border-border pt-3">
            <p className="mb-1 text-xs font-medium text-muted-foreground">Your latest answer</p>
            <p className="whitespace-pre-wrap text-sm text-muted-foreground">{q.myAnswer}</p>
          </div>
        )}
      </Card>

      {phase === 'start' && (
        <Section id="start" icon={<HelpCircle className="h-4 w-4" />} title="Before you answer" subtitle="Think first — a strong answer names the problem, the constraints and the trade-offs before the details.">
          <div className="space-y-4">
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted-foreground">How confident are you before attempting?</p>
              <div className="flex flex-wrap gap-1.5">
                {interviewConfidenceOrder.slice(1).map((c) => (
                  <button
                    key={c}
                    onClick={() => setConfidenceBefore(c)}
                    className={cn('rounded-md px-2.5 py-1 text-xs transition-colors', confidenceBefore === c ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:bg-accent')}
                  >
                    {c.replace(/_/g, ' ')}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Btn onClick={() => setPhase('answer')}><PenLine className="h-4 w-4" /> Start answering</Btn>
              <Btn variant="secondary" onClick={() => navigateBack()}>Skip for now</Btn>
            </div>
          </div>
        </Section>
      )}

      {phase !== 'start' && phase !== 'reveal' && (
        <Section
          id="answer"
          icon={<PenLine className="h-4 w-4" />}
          title={phase === 'answer' ? 'Answer' : 'Evaluate yourself'}
          subtitle={phase === 'answer' ? 'Answer out loud or in writing. Time yourself — shorter beats rambling.' : 'Score each dimension 0–5. Being honest here is what makes the score real.'}
          right={phase === 'answer' ? (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <AlarmClock className="h-4 w-4" /> {formatTime(elapsed)}
            </div>
          ) : (
            <div className="text-sm font-medium">Overall: <span className="text-xl font-bold">{overall}</span>/100</div>
          )}
        >
          {phase === 'answer' ? (
            <div className="space-y-3">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here — try to answer it fully before looking anything up."
                className={cn(inputClass(), 'min-h-[280px] resize-y p-3')}
              />
              <div className="flex flex-wrap gap-2">
                <Btn onClick={() => setPhase('evaluate')} disabled={!answer.trim()}><Send className="h-4 w-4" /> Submit answer</Btn>
                <Btn variant="secondary" onClick={() => setElapsed(0)}><RotateCcw className="h-4 w-4" /> Reset timer</Btn>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="whitespace-pre-wrap rounded-md bg-secondary p-3 text-sm text-muted-foreground">{answer || q.myAnswer || 'No answer text saved.'}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {rubricKeys.map((key) => (
                  <div key={key} className="rounded-lg border border-border p-3">
                    <div className="mb-1.5 flex items-center justify-between">
                      <label className="text-sm font-medium">{RUBRIC_LABELS[key]}</label>
                      <span className="text-xs text-muted-foreground">{scores[key]}/5</span>
                    </div>
                    <input
                      type="range" min={0} max={5} step={1} value={scores[key]}
                      onChange={(e) => setScores({ ...scores, [key]: Number(e.target.value) })}
                      className="w-full accent-primary"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">{RUBRIC_HINTS[key]}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <label className="text-xs text-muted-foreground">Manual overall override (optional):</label>
                <input type="number" min={0} max={100} value={manualAdjust ?? ''} onChange={(e) => setManualAdjust(e.target.value === '' ? null : Number(e.target.value))} className="w-20 rounded-md border border-border bg-background px-2 py-1 text-sm" />
                <span className="flex-1" />
                <Btn size="sm" variant="secondary" onClick={() => setPhase('answer')}>Edit answer</Btn>
                <Btn onClick={saveAndReveal} disabled={saving}><Check className="h-4 w-4" /> Save & reveal</Btn>
              </div>
            </div>
          )}
        </Section>
      )}

      {phase === 'reveal' && (
        <>
          <Section
            id="reveal"
            icon={<Sparkles className="h-4 w-4" />}
            title="Ideal answer & review"
            subtitle="Compare your answer with the ideal one. This comparison is how you get better."
          >
            <div className="mb-3 rounded-lg border border-primary/30 bg-primary/5 p-4">
              <div className="text-sm font-medium">Your overall score: <span className="text-lg font-bold">{overallForLatest(attempts)}</span>/100</div>
              <p className="mt-0.5 text-xs text-muted-foreground">Next review in {q.dueDate ? formatDue(q.dueDate) : '—'} · {q.reviewCount} reviews · {q.correctInARow} correct in a row</p>
            </div>
            {q.suggestedAnswer && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Suggested answer</p>
                <div className="whitespace-pre-wrap rounded-md border border-border p-4 text-sm leading-relaxed text-muted-foreground">{q.suggestedAnswer}</div>
              </div>
            )}
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-border p-3">
                <p className="mb-2 text-xs font-medium text-muted-foreground">Key concepts</p>
                <div className="flex flex-wrap gap-1.5">
                  {(q.importantConcepts ?? []).map((c) => <Badge key={c} tone="blue">{c}</Badge>)}
                </div>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="mb-2 text-xs font-medium text-muted-foreground">Common mistakes</p>
                <ul className="list-disc space-y-1 pl-4 text-xs text-muted-foreground">
                  {(q.commonMistakes ?? []).map((m) => <li key={m}>{m}</li>)}
                </ul>
              </div>
            </div>

            {followUps.length > 0 && (
              <div className="mt-4">
                <p className="mb-2 text-xs font-medium text-muted-foreground">Follow-up questions</p>
                <div className="space-y-1.5">
                  {followUps.map((f, fi) => (
                    <div key={`${fi}-${f.question}`} className="rounded-md border border-border">
                      <button onClick={() => setExpandedFollowUp(String(fi) === expandedFollowUp ? null : String(fi))} className="flex w-full items-center justify-between gap-2 p-3 text-left text-sm">
                        <span>{f.question}</span>
                        <ChevronDown className={cn('h-4 w-4 text-muted-foreground transition-transform', expandedFollowUp === String(fi) && 'rotate-180')} />
                      </button>
                      {expandedFollowUp === String(fi) && f.hint && <p className="border-t border-border p-3 text-sm text-muted-foreground">{f.hint}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Section>

          <Section id="history" icon={<ListChecks className="h-4 w-4" />} title="Attempt history" subtitle="Every attempt is stored — this is your real pattern of progress.">
            <AttemptsTable attempts={attempts} />
          </Section>

          <div className="flex flex-wrap gap-2">
            <Btn onClick={resetForRetry}><RotateCcw className="h-4 w-4" /> Try again</Btn>
            <Link to="/interview" className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent">
              Back to dashboard
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

function answersToShow(q: { myAnswer?: string }): boolean {
  return Boolean((q.myAnswer ?? '').trim());
}

function overallForLatest(attempts: { overallScore: number }[]): number {
  if (attempts.length === 0) return 0;
  return attempts[0].overallScore;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function formatDue(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function AttemptsTable({ attempts }: { attempts: { id: string; createdAt: string; overallScore: number; confidenceBefore: InterviewConfidence; timeTakenSeconds: number; notes: string }[] }) {
  if (attempts.length === 0) return <p className="text-sm text-muted-foreground">No attempts yet.</p>;
  return (
    <div className="space-y-2">
      {attempts.map((a) => (
        <div key={a.id} className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-border p-3 text-sm">
          <div className="flex items-center gap-2">
            <Badge tone={a.overallScore >= 70 ? 'green' : a.overallScore >= 40 ? 'amber' : 'red'}>{a.overallScore}</Badge>
            <span className="text-xs text-muted-foreground">{a.createdAt.slice(0, 10)} · {formatTime(a.timeTakenSeconds)}</span>
          </div>
          <span className="text-xs text-muted-foreground">was confident: {a.confidenceBefore.replace(/_/g, ' ')}</span>
        </div>
      ))}
    </div>
  );
}

function navigateBack(): void {
  window.history.back();
}