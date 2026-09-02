import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Dices, Layers, PenTool } from 'lucide-react';
import { useInterviewData } from '@/hooks/useInterviewData';
import { systemDesignProblems } from '@/data/systemDesignProblems';
import { InterviewNav } from '@/components/interview-nav';
import { Badge, Btn, Section, Stat } from '@/components/lab-ui';

export default function SystemDesignListPage() {
  const navigate = useNavigate();
  const data = useInterviewData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">AI System Design</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Six design problems drawn from the systems you build and ship. Requirements are real; so is your practice.
        </p>
      </div>
      <InterviewNav active="/interview/system-design" />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Design problems" value={systemDesignProblems.length} icon={<Layers className="h-4 w-4" />} />
        <Stat label="Practices done" value={data.systemDesigns.length} icon={<PenTool className="h-4 w-4" />} />
        <Stat label="Problems attempted" value={new Set(data.systemDesigns.map((s) => s.problemId)).size} icon={<Dices className="h-4 w-4" />} />
      </div>

      <Section id="problems" icon={<Layers className="h-4 w-4" />} title="Practice a design problem">
        <div className="grid gap-3 sm:grid-cols-2">
          {systemDesignProblems.map((p) => {
            const completed = data.systemDesigns.filter((s) => s.problemId === p.id);
            return (
              <div key={p.id} className="rounded-lg border border-border p-4 transition-colors hover:border-primary">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{p.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{p.prompt.slice(0, 140)}…</p>
                  </div>
                  <Badge tone="muted">{p.category}</Badge>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                  <Badge tone="primary">{p.requirements.length} requirements</Badge>
                  <Badge tone="muted">{p.constraints.length} constraints</Badge>
                  <Badge tone="muted">{p.followUps.length} follow-ups</Badge>
                  {completed.length > 0 && <Badge tone="green">{completed.length} practice{completed.length > 1 ? 's' : ''}</Badge>}
                </div>
                <div className="mt-3">
                  <Btn size="sm" onClick={() => navigate(`/interview/system-design/${p.id}`)}>
                    {completed.length > 0 ? 'Practice again' : 'Start design'} <ArrowRight className="h-3.5 w-3.5" />
                  </Btn>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section id="history" icon={<PenTool className="h-4 w-4" />} title="Past practices">
        {data.systemDesigns.length === 0 ? (
          <p className="text-sm text-muted-foreground">Design a problem above and your practice sessions will appear here.</p>
        ) : (
          <div className="space-y-2">
            {data.systemDesigns.map((s) => {
              const problem = systemDesignProblems.find((p) => p.id === s.problemId);
              const values = Object.values(s.rubricScores);
              const avg = values.length ? Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 20) : 0;
              return (
                <Link key={s.id} to={`/interview/system-design/${s.problemId}`} className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-border p-3 text-sm transition-colors hover:border-primary">
                  <div>
                    <p className="font-medium">{problem?.title ?? s.problemId}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{s.createdAt.slice(0, 10)} · {s.timeTakenMinutes} min · rubric avg {avg}</p>
                  </div>
                  {Object.keys(s.rubricScores).length > 0 ? <Badge tone={avg >= 70 ? 'green' : avg >= 40 ? 'amber' : 'red'}>{avg}</Badge> : <Badge tone="muted">no rubric yet</Badge>}
                </Link>
              );
            })}
          </div>
        )}
      </Section>
    </div>
  );
}