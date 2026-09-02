import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListVideo, Play, RefreshCw, Swords, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useInterviewData } from '@/hooks/useInterviewData';
import { InterviewNav } from '@/components/interview-nav';
import { Badge, Btn, Card, Section, Stat, inputClass } from '@/components/lab-ui';
import type { MockInterviewType, QuestionDifficulty } from '@/types';

const ROLES = ['AI Engineer', 'LLM Engineer', 'Agent Engineer', 'Applied AI Engineer', 'AI Platform Engineer', 'Senior AI Engineer'];
const TYPES: { value: MockInterviewType; label: string; desc: string }[] = [
  { value: 'mixed', label: 'Mixed', desc: 'Everything' },
  { value: 'technical', label: 'Technical', desc: 'Fundamentals, projects' },
  { value: 'system_design', label: 'System design', desc: 'Design & trade-offs' },
  { value: 'coding', label: 'Coding', desc: 'Implementation' },
  { value: 'behavioral', label: 'Behavioral', desc: 'Generic & self' },
];
const DIFFS: QuestionDifficulty[] = ['beginner', 'intermediate', 'advanced', 'senior', 'staff'];

export default function MockInterviewSetupPage() {
  const navigate = useNavigate();
  const data = useInterviewData();
  const [role, setRole] = useState(ROLES[0]);
  const [type, setType] = useState<MockInterviewType>('mixed');
  const [difficulty, setDifficulty] = useState<QuestionDifficulty>('intermediate');
  const [count, setCount] = useState(5);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  function notify(msg: string) {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2200);
  }

  async function start() {
    try {
      const id = await data.startMock({ role, type, difficulty, count });
      navigate(`/interview/mock/${id}`);
    } catch (err) {
      notify(err instanceof Error ? `✗ ${err.message}` : '✗ Could not start mock');
    }
  }

  return (
    <div className="space-y-6">
      {toast && <div className="fixed right-4 top-16 z-50 rounded-md border border-border bg-background px-4 py-2 text-sm shadow-lg">{toast}</div>}
      <div>
        <h1 className="text-2xl font-bold">Mock Interviews</h1>
        <p className="mt-1 text-sm text-muted-foreground">Full-length simulations with self-scoring. Results feed your readiness model.</p>
      </div>
      <InterviewNav active="/interview/mock" />

      <Card>
        <div className="mb-4 flex items-center gap-2">
          <Swords className="h-4 w-4 text-primary" />
          <h2 className="font-medium">Configure a mock interview</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">Role</p>
            <div className="flex flex-wrap gap-1.5">
              {ROLES.map((r) => (
                <button key={r} onClick={() => setRole(r)} className={cn('rounded-md px-2.5 py-1 text-xs transition-colors', role === r ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:bg-accent')}>{r}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">Type</p>
            <div className="flex flex-wrap gap-1.5">
              {TYPES.map((t) => (
                <button key={t.value} onClick={() => setType(t.value)} className={cn('rounded-md px-2.5 py-1 text-xs transition-colors', type === t.value ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:bg-accent')}>
                  {t.label} <span className="ml-0.5 opacity-60">{t.desc}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">Difficulty</p>
            <div className="flex flex-wrap gap-1.5">
              {DIFFS.map((d) => (
                <button key={d} onClick={() => setDifficulty(d)} className={cn('rounded-md px-2.5 py-1 text-xs capitalize transition-colors', difficulty === d ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:bg-accent')}>{d}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">Number of questions</p>
            <input type="number" min={3} max={8} value={count} onChange={(e) => setCount(Math.max(3, Math.min(8, Number(e.target.value) || 5)))} className={cn(inputClass(), 'max-w-[140px]')} />
          </div>
        </div>
        <div className="mt-5">
          <Btn onClick={start}><Play className="h-4 w-4" /> Start mock interview</Btn>
        </div>
      </Card>

      <Section
        id="history"
        icon={<ListVideo className="h-4 w-4" />}
        title="Past sessions"
      >
        {data.mockInterviews.length === 0 ? (
          <p className="text-sm text-muted-foreground">No mock interviews yet — start your first one above.</p>
        ) : (
          <div className="space-y-2">
            {data.mockInterviews.map((m) => {
              const avg = m.results.length ? Math.round(m.results.reduce((a, r) => a + r.selfScore, 0) / m.results.length) : 0;
              return (
                <div key={m.id} className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-border p-3">
                  <div className="min-w-0">
                    <p className="font-medium">{m.title}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                      <Badge tone="muted">{m.role}</Badge>
                      <Badge tone="muted">{m.type.replace(/_/g, ' ')}</Badge>
                      <Badge tone="muted">{m.difficulty}</Badge>
                      <Badge tone={m.status === 'completed' ? 'green' : 'amber'}>{m.status.replace(/_/g, ' ')}</Badge>
                      <span>· {m.results.length}/{m.questionIds.length} answered</span>
                      {m.status === 'completed' && <span>· avg {avg}</span>}
                      <span>· {m.startedAt.slice(0, 10)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {m.status === 'in_progress' ? (
                      <Btn size="sm" onClick={() => navigate(`/interview/mock/${m.id}`)}><Play className="h-3.5 w-3.5" /> Resume</Btn>
                    ) : (
                      <Btn size="sm" variant="secondary" onClick={() => navigate(`/interview/mock/${m.id}`)}><RefreshCw className="h-3.5 w-3.5" /> Review</Btn>
                    )}
                    <button onClick={() => data.deleteMock(m.id)} className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Section>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Completed" value={data.readiness.mockInterviews} icon={<Swords className="h-4 w-4" />} />
        <Stat label="In progress" value={data.mockInterviews.filter((m) => m.status === 'in_progress').length} icon={<Play className="h-4 w-4" />} />
        <Stat label="Questions in bank" value={data.questions.length} icon={<ListVideo className="h-4 w-4" />} />
      </div>
    </div>
  );
}