import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  FlaskConical,
  GitBranch,
  Layers,
  Rocket,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { projects as portfolioProjects } from '@/data/projects';
import { projectBuilds } from '@/data/projectBuilds';
import { computeProjectBuildProgress } from '@/lib/projectProgress';
import { useAllProjectProgress } from '@/hooks/useProjectProgress';
import { cn } from '@/lib/utils';
import type { ProjectBuild } from '@/types';

const difficultyTone: Record<string, string> = {
  advanced: 'bg-amber-500/10 text-amber-600',
  production: 'bg-primary/10 text-primary',
};

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

export default function ProjectsPage() {
  const navigate = useNavigate();
  const { map } = useAllProjectProgress();

  const cards = projectBuilds.map((build: ProjectBuild) => {
    const progress = map[build.projectId] ?? null;
    const summary = progress ? computeProjectBuildProgress(build, progress) : null;
    const portfolio = portfolioProjects.find((p) => p.id === build.projectId);
    return { build, progress, summary, portfolio };
  });

  const totals = cards.reduce(
    (acc, c) => {
      if (!c.summary) return acc;
      acc.taskTotal += c.summary.totalTasks;
      acc.taskDone += c.summary.completedTasks;
      acc.labTotal += c.summary.totalLabs;
      acc.labDone += c.summary.completedLabs;
      acc.experimentTotal += c.summary.totalExperiments;
      acc.experimentDone += c.summary.completedExperiments;
      acc.securityDone += c.summary.completedSecurity;
      acc.deploymentDone += c.summary.completedDeployment;
      acc.evidence += c.summary.evidenceCount;
      acc.hoursLogged += c.summary.hoursLogged;
      acc.started += c.summary.percent > 0 ? 1 : 0;
      acc.completed += c.summary.gates.projectComplete ? 1 : 0;
      return acc;
    },
    {
      taskTotal: 0,
      taskDone: 0,
      labTotal: 0,
      labDone: 0,
      experimentTotal: 0,
      experimentDone: 0,
      securityDone: 0,
      deploymentDone: 0,
      evidence: 0,
      hoursLogged: 0,
      started: 0,
      completed: 0,
    }
  );

  function openProject(slug: string) {
    navigate(`/projects/${slug}`);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Projects</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Portfolio of AI engineering projects — each one a guided build: idea, architecture, implementation, testing, deployment, and evidence.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {[
          { label: 'Active', value: totals.started, detail: `${totals.completed} completed`, icon: TrendingUp },
          { label: 'Tasks', value: totals.taskDone, detail: `${totals.taskTotal} total`, icon: Layers },
          { label: 'Labs', value: totals.labDone, detail: `${totals.labTotal} total`, icon: FlaskConical },
          { label: 'Experiments', value: totals.experimentDone, detail: `${totals.experimentTotal} run`, icon: Rocket },
          { label: 'Security', value: totals.securityDone, detail: 'controls verified', icon: ShieldCheck },
          { label: 'Hours', value: totals.hoursLogged, detail: `${totals.evidence} evidence items`, icon: Clock },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-border bg-card p-4">
            <s.icon className="h-4 w-4 text-muted-foreground" />
            <div className="mt-2 font-mono text-xl font-bold">{s.value}</div>
            <div className="text-xs font-medium">{s.label}</div>
            <div className="text-xs text-muted-foreground">{s.detail}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {cards.map((c) => {
          const build = c.build;
          const summary = c.summary;
          const portfolio = c.portfolio;
          const notStarted = !summary || summary.percent === 0;
          const statusLabel = notStarted
            ? 'Not started'
            : summary.gates.interviewReady
              ? 'Interview ready'
              : summary.gates.portfolioReady
                ? 'Portfolio ready'
                : summary.gates.projectComplete
                  ? 'Project complete'
                  : 'In progress';

          return (
            <div
              key={build.projectId}
              role="link"
              tabIndex={0}
              onClick={() => openProject(build.slug)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openProject(build.slug);
                }
              }}
              className={cn(
                'group cursor-pointer rounded-lg border border-border bg-card p-6 transition-all',
                'hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-lg'
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    {build.difficulty && (
                      <span className={cn('rounded-full px-2.5 py-0.5 text-xs', difficultyTone[build.difficulty] ?? 'bg-secondary text-muted-foreground')}>
                        {build.difficulty}
                      </span>
                    )}
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground">{statusLabel}</span>
                  </div>
                  <h2 className="mt-2 text-lg font-medium transition-colors group-hover:text-primary">
                    {build.title}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">{build.tagline}</p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span className="font-mono">{summary ? summary.percent : 0}%</span>
                </div>
                <ProgressBar value={summary ? summary.percent : 0} />
              </div>

              <div className="mt-4 flex flex-wrap gap-1">
                {build.technologies.slice(0, 6).map((t) => (
                  <span key={t.label} className="rounded bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                    {t.label}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  {build.estimatedHours && (
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {build.estimatedHours.min}–{build.estimatedHours.max}h
                    </span>
                  )}
                  {summary && (
                    <>
                      <span>{summary.completedTasks}/{summary.totalTasks} tasks</span>
                      <span>{summary.completedLabs}/{summary.totalLabs} labs</span>
                      <span>{summary.completedExperiments}/{summary.totalExperiments} experiments</span>
                    </>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openProject(build.slug);
                  }}
                  className={cn(
                    'inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                    notStarted
                      ? 'bg-primary text-primary-foreground hover:opacity-90'
                      : 'border border-border hover:bg-accent'
                  )}
                >
                  {notStarted ? 'Start Building' : 'Open Project'} <ArrowRight className="h-3 w-3" />
                </button>
              </div>

              <div className="mt-4 flex items-center gap-4 border-t border-border pt-3 text-xs text-muted-foreground">
                {portfolio?.githubUrl && (
                  <a
                    href={portfolio.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 hover:text-primary"
                  >
                    <GitBranch className="h-3 w-3" /> Code
                  </a>
                )}
                {portfolio?.demoUrl && (
                  <a
                    href={portfolio.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 hover:text-primary"
                  >
                    <ExternalLink className="h-3 w-3" /> Demo
                  </a>
                )}
                {!portfolio?.githubUrl && !portfolio?.demoUrl && (
                  <span className="inline-flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Guided build
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {portfolioProjects.filter((p) => !projectBuilds.some((b) => b.projectId === p.id)).map((p) => (
            <div key={p.id} className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-lg font-medium">{p.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
              <p className="mt-3 font-mono text-xs text-muted-foreground">{p.architecture}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {p.technologies.map((tech) => (
                  <span key={tech} className="rounded bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                {p.githubUrl && (
                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded border border-border px-3 py-1.5 text-xs hover:bg-accent">
                    <GitBranch className="h-3 w-3" /> Code
                  </a>
                )}
                {p.demoUrl && (
                  <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded border border-border px-3 py-1.5 text-xs hover:bg-accent">
                    <ExternalLink className="h-3 w-3" /> Demo
                  </a>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}