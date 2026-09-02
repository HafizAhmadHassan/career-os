import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { calculateCareerReadiness, getRoadmapDashboard } from '@/lib/readiness';
import type { RoadmapDashboard } from '@/lib/readiness';
import { skills } from '@/data/skills';
import { experiments } from '@/data/experiments';
import { Download, Upload, RotateCcw, ArrowRight, CheckCircle2, Clock, FlaskConical, Target } from 'lucide-react';
import { storage, downloadJSON } from '@/lib/storage';

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
      <div
        className="h-full rounded-full bg-primary transition-all duration-300"
        style={{ width: `${Math.min(100, value)}%` }}
      />
    </div>
  );
}

export default function DashboardPage() {
  const readiness = calculateCareerReadiness();
  const [dashboard, setDashboard] = useState<RoadmapDashboard | null>(null);
  const [exportMsg, setExportMsg] = useState('');

  useEffect(() => {
    let active = true;
    void getRoadmapDashboard().then((data) => {
      if (active) setDashboard(data);
    });
    return () => {
      active = false;
    };
  }, []);

  const radarData = readiness.map(r => ({
    subject: r.category.replace(' ', '\n'),
    score: r.score,
    fullMark: 100,
  }));

  const skillLevels = readiness.map(r => ({
    name: r.category.split(' ')[0],
    score: r.score,
  }));

  const handleExport = async () => {
    const data = await storage.exportAll();
    downloadJSON(data, `career-os-backup-${new Date().toISOString().split('T')[0]}.json`);
    setExportMsg('Data exported!');
    setTimeout(() => setExportMsg(''), 2000);
  };

  const handleImport = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const text = await file.text();
      try {
        const data = JSON.parse(text);
        await storage.importAll(data);
        setExportMsg('Data imported! Refresh to see changes.');
        setTimeout(() => setExportMsg(''), 3000);
      } catch {
        setExportMsg('Invalid JSON file.');
        setTimeout(() => setExportMsg(''), 3000);
      }
    };
    input.click();
  };

  const handleReset = async () => {
    if (confirm('Reset all local data? This cannot be undone.')) {
      await storage.clear('dailyLogs');
      await storage.clear('weeklyReviews');
      await storage.clear('goals');
      await storage.clear('interviewQuestions');
      await storage.clear('experiments');
      await storage.clear('topicProgress');
      setExportMsg('Local data cleared.');
      setTimeout(() => setExportMsg(''), 3000);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Career tracking and progress overview.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleExport} className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-accent">
            <Download className="h-3 w-3" /> Export
          </button>
          <button onClick={handleImport} className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-accent">
            <Upload className="h-3 w-3" /> Import
          </button>
          <button onClick={handleReset} className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-accent">
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
        </div>
      </div>

      {exportMsg && (
        <div className="rounded-md bg-primary/10 px-3 py-2 text-sm text-primary">{exportMsg}</div>
      )}

      {/* Today's Mission — driven by incomplete roadmap work */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="text-xs text-muted-foreground">// Today&apos;s Mission</div>
        <h2 className="mt-2 text-lg font-medium">{dashboard?.mission.title ?? 'Loading…'}</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="text-xs text-muted-foreground">Skill / Phase</div>
            <div className="text-sm">{dashboard?.mission.skill ?? '—'}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Estimated Time</div>
            <div className="text-sm">{dashboard?.mission.estimatedTime ?? '—'}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Why It Matters</div>
            <div className="text-sm">{dashboard?.mission.whyItMatters ?? '—'}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Related Topic</div>
            <div className="text-sm">{dashboard?.mission.relatedProject ?? '—'}</div>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          {dashboard?.mission.topicSlug && (
            <>
              <Link
                to={`/roadmap/${dashboard.mission.topicSlug}`}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                <Target className="h-4 w-4" /> Start Mission
              </Link>
              <span className="text-xs text-muted-foreground">{dashboard.mission.actionLabel}</span>
            </>
          )}
        </div>
      </div>

      {/* Continue Learning + Recommended Next */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-border p-5">
          <div className="text-xs font-medium text-muted-foreground">Continue Learning</div>
          {dashboard?.continueLearning ? (
            <>
              <div className="mt-2 flex items-center justify-between gap-2">
                <span className="font-medium">{dashboard.continueLearning.item.title}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {dashboard.continueLearning.summary.overall}%
                </span>
              </div>
              <ProgressBar value={dashboard.continueLearning.summary.overall} />
              <p className="mt-2 text-sm text-muted-foreground">
                Next: {dashboard.continueLearning.nextAction?.label ?? 'Module complete'}
              </p>
              <Link
                to={`/roadmap/${dashboard.continueLearning.item.slug}`}
                className="mt-3 inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </Link>
            </>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">
              {dashboard ? 'Nothing left to learn — great work!' : 'Loading…'}
            </p>
          )}
        </div>

        <div className="rounded-lg border border-border p-5">
          <div className="text-xs font-medium text-muted-foreground">Recommended Next</div>
          {dashboard?.recommendedNext ? (
            <>
              <div className="mt-2 flex items-center gap-2">
                <FlaskConical className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{dashboard.recommendedNext.item.title}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{dashboard.recommendedNext.reason}</p>
              <Link
                to={`/roadmap/${dashboard.recommendedNext.item.slug}`}
                className="mt-3 inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent"
              >
                Start Module <ArrowRight className="h-4 w-4" />
              </Link>
            </>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">
              {dashboard ? 'No next topic yet — start or continue any module.' : 'Loading…'}
            </p>
          )}
        </div>
      </div>

      {/* Career Readiness Radar */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-border p-6">
          <h3 className="mb-4 font-medium">Career Readiness</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
              <Radar name="Score" dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg border border-border p-6">
          <h3 className="mb-4 font-medium">Skill Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillLevels} layout="vertical">
              <XAxis type="number" domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
              <YAxis type="category" dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} width={80} />
              <Tooltip
                contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.5rem' }}
              />
              <Bar dataKey="score" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-border p-4">
          <div className="text-xs text-muted-foreground">Total Skills</div>
          <div className="mt-1 text-2xl font-bold font-mono">{skills.length}</div>
        </div>
        <div className="rounded-lg border border-border p-4">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            Overall Roadmap <Clock className="h-3 w-3" />
          </div>
          <div className="mt-1 text-2xl font-bold font-mono">
            {dashboard?.stats.overall ?? 0}%
          </div>
        </div>
        <div className="rounded-lg border border-border p-4">
          <div className="text-xs text-muted-foreground">Modules Demonstrated</div>
          <div className="mt-1 text-2xl font-bold font-mono">
            {dashboard ? `${dashboard.stats.demonstrated}/18` : '·'}
          </div>
        </div>
        <div className="rounded-lg border border-border p-4">
          <div className="text-xs text-muted-foreground">Labs Completed</div>
          <div className="mt-1 text-2xl font-bold font-mono">
            {dashboard?.stats.labsCompleted ?? 0}
          </div>
        </div>
      </div>

      {/* Recently Completed */}
      <div className="space-y-3">
        <h3 className="font-medium">Roadmap Progress</h3>
        {dashboard ? (
          <>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              {dashboard.stats.demonstrated} of 18 modules demonstrated · {dashboard.stats.resourcesRead} resources read
            </div>
            <ProgressBar value={dashboard.stats.overall} />
          </>
        ) : (
          <p className="text-sm text-muted-foreground">Loading progress…</p>
        )}
      </div>

      {/* Recent Experiments */}
      <div className="space-y-3">
        <h3 className="font-medium">Recent Experiments</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {experiments.slice(0, 6).map(exp => (
            <div key={exp.id} className="rounded-lg border border-border p-4">
              <div className="text-sm font-medium">{exp.name}</div>
              <p className="mt-1 text-xs text-muted-foreground">{exp.description}</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {exp.metrics.accuracy != null && (
                  <div>
                    <div className="text-xs text-muted-foreground">Accuracy</div>
                    <div className="font-mono text-sm">{(exp.metrics.accuracy * 100).toFixed(0)}%</div>
                  </div>
                )}
                {exp.metrics.tokens != null && (
                  <div>
                    <div className="text-xs text-muted-foreground">Tokens</div>
                    <div className="font-mono text-sm">{exp.metrics.tokens.toLocaleString()}</div>
                  </div>
                )}
                {exp.metrics.cost != null && (
                  <div>
                    <div className="text-xs text-muted-foreground">Cost</div>
                    <div className="font-mono text-sm">${exp.metrics.cost.toFixed(3)}</div>
                  </div>
                )}
                {exp.metrics.latency != null && (
                  <div>
                    <div className="text-xs text-muted-foreground">Latency</div>
                    <div className="font-mono text-sm">{exp.metrics.latency}ms</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}