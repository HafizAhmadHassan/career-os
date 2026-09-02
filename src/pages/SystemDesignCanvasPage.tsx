import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Clock, Layers, PenTool, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useInterviewData } from '@/hooks/useInterviewData';
import { getSystemDesignProblem } from '@/data/systemDesignProblems';
import { InterviewNav } from '@/components/interview-nav';
import { Badge, Btn, Card, Section, inputClass } from '@/components/lab-ui';
import type { SystemDesignPractice } from '@/types';

export default function SystemDesignCanvasPage() {
  const { problemId } = useParams<{ problemId: string }>();
  const data = useInterviewData();
  const problem = getSystemDesignProblem(problemId ?? '');

  const [canvas, setCanvas] = useState('');
  const [notes, setNotes] = useState('');
  const [minutes, setMinutes] = useState(30);
  const [reviewMode, setReviewMode] = useState(false);
  const [rubric, setRubric] = useState<Record<string, number>>({});
  const [reviewNotes, setReviewNotes] = useState('');
  const [practiceId, setPracticeId] = useState<string | null>(null);

  useEffect(() => {
    if (problem && problem.rubric.length > 0 && Object.keys(rubric).length === 0) {
      setRubric(Object.fromEntries(problem.rubric.map((r) => [r, 0])));
    }
  }, [problem, rubric]);

  const past = problem ? data.systemDesigns.filter((s) => s.problemId === problem.id) : [];

  async function saveCurrent() {
    if (!problem) return;
    const practice: SystemDesignPractice = {
      id: practiceId ?? `sd-${Date.now().toString()}-${Math.random().toString(36).slice(2, 8)}`,
      problemId: problem.id,
      canvas,
      notes,
      timeTakenMinutes: minutes,
      rubricScores: rubric,
      reviewNotes,
      createdAt: practiceId ? past[0]?.createdAt ?? new Date().toISOString() : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await data.saveSystemDesign(practice);
    setPracticeId(practice.id);
    setReviewMode(false);
  }

  if (!problem) {
    return (
      <div className="space-y-4">
        <Link to="/interview/system-design" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> System design</Link>
        <Card><p className="text-sm">Problem not found.</p></Card>
      </div>
    );
  }

  const avg = Object.keys(rubric).length ? Math.round(Object.values(rubric).reduce((a, b) => a + b, 0) / Object.keys(rubric).length * 20) : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link to="/interview/system-design" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> System design</Link>
        <div className="flex items-center gap-1.5">
          <Badge tone="primary">{problem.title}</Badge>
          <Badge tone="muted">{problem.category}</Badge>
        </div>
      </div>
      <InterviewNav active="/interview/system-design" />

      <Card>
        <p className="font-medium">Design prompt</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{problem.prompt}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div>
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">Requirements</p>
            <ul className="list-disc space-y-1 pl-4 text-xs text-muted-foreground">{problem.requirements.map((r) => <li key={r}>{r}</li>)}</ul>
          </div>
          <div>
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">Constraints</p>
            <ul className="list-disc space-y-1 pl-4 text-xs text-muted-foreground">{problem.constraints.map((r) => <li key={r}>{r}</li>)}</ul>
          </div>
          <div>
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">Scale</p>
            <p className="text-xs text-muted-foreground">{problem.scale}</p>
            <p className="mb-1.5 mt-3 text-xs font-medium text-muted-foreground">Discussion areas</p>
            <ul className="list-disc space-y-1 pl-4 text-xs text-muted-foreground">{problem.discussionAreas.map((r) => <li key={r}>{r}</li>)}</ul>
          </div>
        </div>
      </Card>

      {!reviewMode ? (
        <Section
          id="canvas"
          icon={<Layers className="h-4 w-4" />}
          title="Your design canvas"
          subtitle="Diagram or describe your architecture. Cover retrieval/context/agents/cost and the trade-offs you accepted."
          right={
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <input type="number" min={1} value={minutes} onChange={(e) => setMinutes(Math.max(1, Number(e.target.value) || 30))} className="w-16 rounded-md border border-border bg-background px-2 py-1 text-sm" />
              <span className="text-xs text-muted-foreground">min so far</span>
            </div>
          }
        >
          <textarea
            value={canvas}
            onChange={(e) => setCanvas(e.target.value)}
            placeholder="Requirements → services → data flow → retrieval → LLM call → response → evals. Use text or mermaid (it renders in writing previews)."
            className={cn(inputClass(), 'min-h-[300px] resize-y p-3 font-mono text-sm')}
          />
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes: open questions, numbers you'd estimate, things you'd verify."
            className={cn(inputClass(), 'mt-3 min-h-[80px] resize-y p-3 text-sm')} />
          <div className="mt-3 flex flex-wrap gap-2">
            <Btn onClick={() => void saveCurrent()}><Save className="h-4 w-4" /> Save design</Btn>
            <Btn variant="secondary" onClick={() => setReviewMode(true)}><PenTool className="h-4 w-4" /> Score it with the rubric</Btn>
          </div>
        </Section>
      ) : (
        <Section
          id="review"
          icon={<PenTool className="h-4 w-4" />}
          title="Rubric review"
          subtitle="Score each dimension 0–5. What would a staff reviewer at an AI startup check?"
          right={Object.keys(rubric).length > 0 ? <div className="text-sm font-medium">Average: <span className="text-xl font-bold">{avg}</span>/100</div> : null}
        >
          <div className="space-y-3">
            {problem.rubric.map((item) => (
              <div key={item} className="rounded-lg border border-border p-3">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-sm font-medium">{item}</span>
                  <span className="text-xs text-muted-foreground">{rubric[item]}/5</span>
                </div>
                <input type="range" min={0} max={5} step={1} value={rubric[item] ?? 0} onChange={(e) => setRubric({ ...rubric, [item]: Number(e.target.value) })} className="w-full accent-primary" />
              </div>
            ))}
          </div>
          <textarea value={reviewNotes} onChange={(e) => setReviewNotes(e.target.value)} placeholder="What would you change in a v2?" className={cn(inputClass(), 'mt-3 min-h-[80px] resize-y p-3 text-sm')} />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Btn onClick={() => void saveCurrent()} disabled={Object.keys(rubric).length === 0}><Check className="h-4 w-4" /> Save review</Btn>
            <Btn variant="secondary" onClick={() => setReviewMode(false)}>Back to canvas</Btn>
            <div className="flex-1" />
            <div className="text-xs text-muted-foreground">
              Follow-ups to prepare for: {problem.followUps.slice(0, 3).join(' · ')}
            </div>
          </div>
        </Section>
      )}

      <Section id="past" icon={<Clock className="h-4 w-4" />} title="Past practices on this problem">
        {past.length === 0 ? (
          <p className="text-sm text-muted-foreground">No saved practices yet for this problem.</p>
        ) : (
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {past.map((p) => {
              const v = Object.values(p.rubricScores);
              const a = v.length ? Math.round((v.reduce((x, y) => x + y, 0) / v.length) * 20) : 0;
              return (
                <div key={p.id} className="rounded-md border border-border p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{p.createdAt.slice(0, 10)}</span>
                    {v.length > 0 ? <Badge tone={a >= 70 ? 'green' : a >= 40 ? 'amber' : 'red'}>{a}</Badge> : <Badge tone="muted">no rubric</Badge>}
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{p.notes || p.canvas.slice(0, 120) || '—'}</p>
                </div>
              );
            })}
          </div>
        )}
      </Section>
    </div>
  );
}