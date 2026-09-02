import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Brain,
  Code2,
  Download,
  Layers,
  ListChecks,
  MessageSquare,
  Play,
  Swords,
  Upload,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useInterviewData } from '@/hooks/useInterviewData';
import { storage, downloadJSON } from '@/lib/storage';
import { projectBuilds } from '@/data/projectBuilds';
import { getSkillById } from '@/data/skills';
import { seedInterviewQuestions } from '@/data/interviewQuestions';
import { Badge, Card, Section, Stat, Btn, ProgressBar } from '@/components/lab-ui';
import type { Article, ProjectProgress } from '@/types';

const NAV = [
  { path: '/interview', label: 'Dashboard', icon: <Layers className="h-4 w-4" /> },
  { path: '/interview/practice/Fundamentals', label: 'Fundamentals', icon: <BookOpen className="h-4 w-4" /> },
  { path: '/interview/practice/LLM Engineering', label: 'LLM Engineering', icon: <Brain className="h-4 w-4" /> },
  { path: '/interview/practice/RAG', label: 'RAG', icon: <Layers className="h-4 w-4" /> },
  { path: '/interview/practice/Agentic AI', label: 'Agentic AI', icon: <Swords className="h-4 w-4" /> },
  { path: '/interview/practice/Context Engineering', label: 'Context Engineering', icon: <Brain className="h-4 w-4" /> },
  { path: '/interview/system-design', label: 'AI System Design', icon: <Layers className="h-4 w-4" /> },
  { path: '/interview/coding', label: 'Coding', icon: <Code2 className="h-4 w-4" /> },
  { path: '/interview/practice/Behavioral', label: 'Behavioral', icon: <MessageSquare className="h-4 w-4" /> },
  { path: '/interview/mock', label: 'Mock Interviews', icon: <Swords className="h-4 w-4" /> },
];

const levelScore: Record<number, number> = { 1: 20, 2: 40, 3: 60, 4: 80, 5: 100 };

export default function InterviewPage() {
  const navigate = useNavigate();
  const data = useInterviewData();
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const r = data.readiness;

  const [projectProgress, setProjectProgress] = useState<ProjectProgress[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    void (async () => {
      const [pp, ar] = await Promise.all([storage.getAll<ProjectProgress>('projectProgress'), storage.getAll<Article>('articles')]);
      setProjectProgress(pp);
      setArticles(ar);
    })();
  }, []);

  function notify(msg: string) {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2200);
  }

  async function handleExport() {
    const all = await storage.exportStores(['interviewQuestions', 'interviewAttempts', 'mockInterviews', 'systemDesigns', 'codingChallenges']);
    downloadJSON(all, 'interview-backup.json');
    notify('✓ interview-backup.json downloaded');
  }

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      await data.importData(JSON.parse(text));
      notify('✓ Interview data imported');
    } catch {
      notify('✗ Invalid JSON file');
    }
    e.target.value = '';
  }

  const domainRows = ['Agentic AI', 'Context Engineering', 'System Design', 'RAG', 'LLM Engineering', 'MCP', 'Behavioral', 'Coding'].map((category) => {
    const qs = seedInterviewQuestions.filter((q) => (category === 'Coding' ? q.type === 'coding' : q.category === category));
    const skillIds = [...new Set(qs.flatMap((q) => q.skillIds))];
    const matchedSkills = skillIds.map((id) => getSkillById(id)).filter((s): s is NonNullable<typeof s> => Boolean(s));
    const knowledge = matchedSkills.length ? Math.round(matchedSkills.reduce((a, s) => a + (levelScore[s.level] ?? 0), 0) / matchedSkills.length) : 0;
    const skillLevels = matchedSkills.reduce<Record<string, string[]>>((acc, s) => {
      (acc[String(s.level)] ??= []).push(s.name);
      return acc;
    }, {});
    const relatedProjects = projectBuilds.filter((p) => p.skills.some((s) => skillIds.includes(s.id)));
    const progressOf = (id: string) => projectProgress.find((p) => p.projectId === id);
    const projectsDone = relatedProjects.filter((p) => { const st = progressOf(p.projectId)?.status; return st && st !== 'not_started'; }).length;
    const labsDone = relatedProjects.reduce((acc, p) => {
      const prog = progressOf(p.projectId);
      if (!prog) return acc;
      return acc + Object.values(prog.labs).filter((l) => l.status === 'completed').length;
    }, 0);
    const articlesDone = articles.filter((a) => a.status === 'published' && a.relatedSkillIds.some((id) => skillIds.includes(id))).length;
    const breakdown = r.categoryBreakdown.find((c) => c.category === category || (category === 'Coding' && c.category === 'Python'));
    return { category, qs, knowledge, skillLevels, relatedProjects, projectsDone, labsDone, articlesDone, score: breakdown?.score ?? 0, attempted: breakdown?.attempted ?? 0 };
  });

  const spans = Array.from(new Set([...r.weakAreas, ...r.strongAreas]));

  return (
    <div className="space-y-8">
      {toast && <div className="fixed right-4 top-16 z-50 rounded-md border border-border bg-background px-4 py-2 text-sm shadow-lg">{toast}</div>}

      <div>
        <h1 className="text-2xl font-bold">Interview Lab</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A living interview preparation system — every number below comes from your real practice, projects, labs and writing.
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {NAV.map((n) => (
          <Link
            key={n.path}
            to={n.path}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors',
              n.path === '/interview' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:bg-accent'
            )}
          >
            {n.icon}
            {n.label}
          </Link>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="flex flex-col items-center justify-center gap-3 py-8 text-center">
          <Ring value={r.overall} label="Overall readiness" />
          <div className="flex flex-wrap justify-center gap-1.5">
            <Badge tone="green">{r.streak} day streak</Badge>
            <Badge tone="blue">{r.attemptedQuestions} questions practiced</Badge>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-medium">Readiness breakdown</h2>
            <Badge tone="muted">Transparent weights</Badge>
          </div>
          <div className="space-y-2.5">
            {r.weights.map((w) => (
              <div key={w.key} className="flex items-center gap-3">
                <span className="w-44 shrink-0 text-xs text-muted-foreground">{w.label} ({Math.round(w.weight * 100)}%)</span>
                <ProgressBar value={w.value} className="flex-1" />
                <span className="w-8 text-right text-xs">{w.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Section
          id="today"
          icon={<Play className="h-4 w-4" />}
          title="Today's Interview Practice"
          subtitle={`${data.today.items.length} questions · ~${data.today.minutes} minutes. Recommended from real gaps and due reviews.`}
          right={
            <Btn size="sm" onClick={() => navigate('/interview/mock')} disabled={data.today.items.length === 0}>
              <Play className="h-3.5 w-3.5" /> Start session
            </Btn>
          }
        >
          {data.today.items.length === 0 ? (
            <p className="text-sm text-muted-foreground">No recommendations yet. Answer a few questions and this fills automatically.</p>
          ) : (
            <div className="space-y-2">
              {data.today.items.map((item, i) => (
                <Link key={item.question.id} to={`/interview/question/${item.question.id}`} className="flex items-center justify-between gap-3 rounded-md border border-border p-3 text-sm transition-colors hover:border-primary">
                  <div className="min-w-0">
                    <p className="break-words font-medium">{i + 1}. {item.question.question}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{item.reason}</p>
                  </div>
                  <Badge tone="muted">{item.question.category} · {item.question.difficulty}</Badge>
                </Link>
              ))}
            </div>
          )}
        </Section>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Stat label="Avg score" value={r.avgScore} sub="across all attempts" icon={<Layers className="h-4 w-4" />} />
          <Stat label="Mastered" value={r.masteredCount} sub="interview ready" icon={<CheckIcon className="h-4 w-4" />} />
          <Stat label="Mock interviews" value={r.mockInterviews} sub="completed" icon={<Swords className="h-4 w-4" />} />
          <Stat label="System designs" value={r.systemDesigns} sub="practices done" icon={<Layers className="h-4 w-4" />} />
          <Stat label="Coding challenges" value={r.codingChallenges} sub="attempts logged" icon={<Code2 className="h-4 w-4" />} />
          <Stat label="Questions" value={data.questions.length} sub="in the bank" icon={<ListChecks className="h-4 w-4" />} />
        </div>
      </div>

      <Section
        id="gaps"
        icon={<Brain className="h-4 w-4" />}
        title="Weak vs strong areas"
        subtitle="Computed from your latest scores per category."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
            <p className="mb-2 text-sm font-medium text-red-500">Weak areas — practice next</p>
            {spans.length === 0 || r.weakAreas.length === 0 ? (
              <p className="text-xs text-muted-foreground">No weak areas detected. Keep it up!</p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {r.weakAreas.map((c) => <Badge key={c} tone="red">{c}</Badge>)}
              </div>
            )}
          </div>
          <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
            <p className="mb-2 text-sm font-medium text-green-600">Strong areas — keep sharp</p>
            {r.strongAreas.length === 0 ? (
              <p className="text-xs text-muted-foreground">Answer more questions to surface strengths.</p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {r.strongAreas.map((c) => <Badge key={c} tone="green">{c}</Badge>)}
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section
        id="evidence"
        icon={<Layers className="h-4 w-4" />}
        title="Career evidence by competency"
        subtitle="How your knowledge, labs, projects, writing and interviews line up per category."
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="py-2 pr-3 font-medium">Category</th>
                <th className="py-2 pr-3 font-medium">Knowledge</th>
                <th className="py-2 pr-3 font-medium">Labs</th>
                <th className="py-2 pr-3 font-medium">Projects</th>
                <th className="py-2 pr-3 font-medium">Articles</th>
                <th className="py-2 pr-3 font-medium">Interview score</th>
                <th className="py-2 font-medium">Evidence</th>
              </tr>
            </thead>
            <tbody>
              {domainRows.map((row) => (
                <tr key={row.category} className="border-b border-border last:border-0">
                  <td className="py-2 pr-3 font-medium">{row.category}</td>
                  <td className="py-2 pr-3">
                    <Badge tone={row.knowledge >= 70 ? 'green' : row.knowledge >= 40 ? 'amber' : 'muted'}>{row.knowledge}</Badge>
                  </td>
                  <td className="py-2 pr-3">{row.labsDone}</td>
                  <td className="py-2 pr-3">{row.projectsDone}/{row.relatedProjects.length}</td>
                  <td className="py-2 pr-3">{row.articlesDone}</td>
                  <td className="py-2 pr-3">
                    {row.attempted > 0 ? <Badge tone={row.score >= 70 ? 'green' : row.score >= 40 ? 'amber' : 'red'}>{row.score}</Badge> : <Badge tone="muted">—</Badge>}
                  </td>
                  <td className="py-2">
                    {settingsEvidence(row.skillLevels)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section
        id="backup"
        icon={<Download className="h-4 w-4" />}
        title="Interview backup"
        right={
          <div className="flex gap-2">
            <Btn size="sm" onClick={handleExport}><Download className="h-3.5 w-3.5" /> Export</Btn>
            <Btn size="sm" variant="secondary" onClick={() => fileRef.current?.click()}><Upload className="h-3.5 w-3.5" /> Import</Btn>
          </div>
        }
      >
        <p className="text-sm text-muted-foreground">Your attempts, review schedules, mock results, system designs and coding attempts are stored locally in IndexedDB. Export a JSON backup at any time.</p>
        <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={handleImport} />
      </Section>
    </div>
  );
}

function Ring({ value, label }: { value: number; label: string }) {
  const pct = Math.min(100, Math.max(0, value));
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;
  return (
    <div className="relative h-36 w-36">
      <svg viewBox="0 0 120 120" className="h-36 w-36 -rotate-90">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="currentColor" strokeWidth="10" className="text-secondary" />
        <circle
          cx="60" cy="60" r={radius} fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset} className="text-primary transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold">{value}</span>
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 6 9 17l-5-5" /></svg>;
}

function settingsEvidence(skillLevels: Record<string, string[]>): React.ReactNode {
  const labels: Record<number, string> = { 0: 'none', 1: 'novice', 2: 'learning', 3: 'demonstrated', 4: 'applied', 5: 'mastered' };
  const title = Object.entries(skillLevels)
    .sort((a, b) => (levelScore[Number(b[0])] ?? 0) - (levelScore[Number(a[0])] ?? 0))
    .map(([lv, names]) => `${labels[Number(lv)] ?? lv}: ${names.join(', ')}`)
    .join(' · ');
  return <span className="text-xs text-muted-foreground">{title || '—'}</span>;
}