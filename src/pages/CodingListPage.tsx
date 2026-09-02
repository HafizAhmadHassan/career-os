import { useNavigate } from 'react-router-dom';
import { ArrowRight, Blocks, Code2, ListChecks } from 'lucide-react';
import { useInterviewData } from '@/hooks/useInterviewData';
import { codingChallenges } from '@/data/codingChallenges';
import { InterviewNav } from '@/components/interview-nav';
import { Badge, Btn, Section, Stat } from '@/components/lab-ui';

export default function CodingListPage() {
  const navigate = useNavigate();
  const data = useInterviewData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Coding Challenges</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Short, realistic implementation exercises — retries, queues, tokenization, retrieval, agent loops, rate limiting. Solve with real code.
        </p>
      </div>
      <InterviewNav active="/interview/coding" />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Challenges" value={codingChallenges.length} icon={<Code2 className="h-4 w-4" />} />
        <Stat label="Attempts logged" value={data.codingAttempts.length} icon={<ListChecks className="h-4 w-4" />} />
        <Stat label="Passed" value={data.codingAttempts.filter((a) => a.totalTests > 0 && a.testsPassed === a.totalTests).length} icon={<Blocks className="h-4 w-4" />} />
      </div>

      <Section id="challenges" icon={<Code2 className="h-4 w-4" />} title="Solve a challenge">
        <div className="grid gap-3 sm:grid-cols-2">
          {codingChallenges.map((c) => {
            const attempts = data.codingAttempts.filter((a) => a.challengeId === c.id);
            const best = attempts.reduce((a, b) => Math.max(a, b.totalTests > 0 ? (b.testsPassed / b.totalTests) * 100 : 0), 0);
            return (
              <div key={c.id} className="rounded-lg border border-border p-4 transition-colors hover:border-primary">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{c.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{c.prompt.slice(0, 130)}…</p>
                  </div>
                  <Badge tone={c.difficulty === 'beginner' ? 'green' : c.difficulty === 'intermediate' ? 'blue' : c.difficulty === 'advanced' ? 'amber' : 'red'}>{c.difficulty}</Badge>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                  <Badge tone="muted">{c.category}</Badge>
                  {attempts.length > 0 && <Badge tone="blue">{attempts.length} attempt{attempts.length > 1 ? 's' : ''}</Badge>}
                  {best >= 100 && <Badge tone="green">passed</Badge>}
                  {best > 0 && best < 100 && <Badge tone="amber">best {Math.round(best)}%</Badge>}
                </div>
                <div className="mt-3">
                  <Btn size="sm" onClick={() => navigate(`/interview/coding/${c.id}`)}>
                    {attempts.length > 0 ? 'Solve again' : 'Solve'} <ArrowRight className="h-3.5 w-3.5" />
                  </Btn>
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}