import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  FileText,
  FlaskConical,
  GitBranch,
  Info,
  Layers,
  ListChecks,
  MessageSquare,
  Play,
  Plus,
  Rocket,
  ShieldCheck,
  Target,
  Trash2,
  Trophy,
  Upload,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getProjectBuild } from '@/data/projectBuilds';
import type { ProjectBuildProgress } from '@/lib/projectProgress';
import { useProjectProgress } from '@/hooks/useProjectProgress';
import { InterviewQuestionRepository } from '@/lib/storage/interviewRepositories';
import {
  ProjectADRRepository,
  ProjectChecklistRepository,
  ProjectEvidenceRepository,
  ProjectExperimentRepository,
  ProjectExportRepository,
  ProjectJournalRepository,
  ProjectLabRepository,
  ProjectMiscRepository,
  ProjectObjectiveRepository,
  ProjectPrerequisiteRepository,
  ProjectTaskRepository,
} from '@/lib/storage/projectRepositories';
import { downloadJSON, generateId } from '@/lib/storage';
import type {
  LabState,
  ProjectADR,
  ProjectBuild,
  ProjectEvidenceItem,
  ProjectExperimentResult,
  ProjectJournalEntry,
  ProjectProgress,
} from '@/types';

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

function Badge({
  children,
  tone = 'default',
}: {
  children: React.ReactNode;
  tone?: 'default' | 'primary' | 'green' | 'muted' | 'amber';
}) {
  const tones: Record<string, string> = {
    default: 'bg-secondary text-secondary-foreground',
    primary: 'bg-primary/10 text-primary',
    green: 'bg-green-500/10 text-green-600',
    muted: 'bg-muted text-muted-foreground',
    amber: 'bg-amber-500/10 text-amber-600',
  };
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium', tones[tone])}>
      {children}
    </span>
  );
}

function Section({
  id,
  icon,
  title,
  subtitle,
  right,
  children,
}: {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 rounded-lg border border-border bg-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-md bg-secondary p-1.5 text-primary">{icon}</div>
          <div>
            <h2 className="font-medium">{title}</h2>
            {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
          </div>
        </div>
        {right}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

const statusMeta: Record<string, { label: string; tone: 'muted' | 'primary' | 'green' }> = {
  not_started: { label: 'Not Started', tone: 'muted' },
  in_progress: { label: 'In Progress', tone: 'primary' },
  project_complete: { label: 'Project Complete', tone: 'green' },
  portfolio_ready: { label: 'Portfolio Ready', tone: 'green' },
  interview_ready: { label: 'Interview Ready', tone: 'green' },
};

export default function ProjectPage() {
  const { projectSlug = '' } = useParams();
  const build = getProjectBuild(projectSlug);
  const { progress, refresh, summary } = useProjectProgress(build, build?.projectId ?? '');
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => window.clearTimeout(toastTimer.current);
  }, []);

  if (!build) {
    return (
      <div className="space-y-6">
        <div className="text-center text-muted-foreground">
          <p className="text-lg font-medium text-foreground">Project not found</p>
          <p className="mt-1 text-sm">That build guide doesn&apos;t exist.</p>
          <Link to="/projects" className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline">
            <ArrowRight className="h-4 w-4" /> Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const topicId = build.projectId;
  const statusEntry = summary ? statusMeta[summary.status] ?? statusMeta.not_started : statusMeta.not_started;
  const nextAction = summary ? nextActionLabel(build, summary) : null;

  function notify(message: string) {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2200);
  }

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function handleContinue() {
    if (!nextAction) return;
    scrollToSection(nextAction.sectionId);
  }

  const handleExport = async () => {
    const data = await ProjectExportRepository.exportData(topicId);
    downloadJSON(data, `${build.slug}-progress.json`);
    notify('✓ Progress exported');
  };

  async function handleImport(file: File | undefined) {
    if (!file) return;
    const text = await file.text();
    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch {
      notify('✗ Invalid JSON file');
      return;
    }
    await ProjectExportRepository.importData(topicId, data);
    await refresh();
    notify('✓ Progress imported');
  }

  const nextActionBar =
    nextAction && summary && summary.percent > 0 ? (
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-medium text-muted-foreground">Continue where you left off</div>
            <div className="mt-1 text-sm font-medium">{nextAction.label}</div>
            <div className="text-xs text-muted-foreground">{nextAction.meta}</div>
          </div>
          <button
            onClick={handleContinue}
            className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent"
          >
            Continue <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    ) : null;

  return (
    <div className="space-y-6">
      {toast && (
        <div className="rounded-md border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-600">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="rounded-lg border border-border bg-card p-6">
        <Link to="/projects" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-3 w-3" /> All projects
        </Link>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge tone="primary">{build.difficulty}</Badge>
          <Badge>
            <Clock className="h-3 w-3" /> {build.estimatedHours.min}–{build.estimatedHours.max} hours
          </Badge>
          <Badge tone={statusEntry.tone}>{statusEntry.label}</Badge>
          {summary && summary.hoursLogged > 0 && (
            <Badge>
              <Clock className="h-3 w-3" /> {summary.hoursLogged}h logged
            </Badge>
          )}
        </div>

        <h1 className="mt-3 text-2xl font-bold">{build.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{build.tagline}</p>

        <div className="mt-5">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Overall progress</span>
            <span className="font-mono">{summary ? summary.percent : 0}%</span>
          </div>
          <ProgressBar value={summary ? summary.percent : 0} />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          {summary && summary.percent > 0 && nextAction ? (
            <button
              onClick={handleContinue}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Continue Building <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => scrollToSection('prerequisites')}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              <Play className="h-4 w-4" /> Start Building
            </button>
          )}
          <div className="ml-auto flex flex-wrap items-center gap-3">
            {(progress.githubUrl || build.githubUrl) && (
              <a
                href={progress.githubUrl || build.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-medium hover:bg-accent"
              >
                <GitBranch className="h-3 w-3" /> GitHub
              </a>
            )}
            {(progress.demoUrl || build.demoUrl) && (
              <a
                href={progress.demoUrl || build.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-medium hover:bg-accent"
              >
                <ExternalLink className="h-3 w-3" /> Demo
              </a>
            )}
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-medium hover:bg-accent"
            >
              <Download className="h-3 w-3" /> Export
            </button>
            <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-medium hover:bg-accent">
              <Upload className="h-3 w-3" /> Import
              <input type="file" accept="application/json" className="hidden" onChange={(e) => handleImport(e.target.files?.[0])} />
            </label>
          </div>
        </div>
      </div>

      {/* Progress breakdown */}
      <Section
        id="progress"
        icon={<Trophy className="h-4 w-4" />}
        title="Build progress"
        subtitle="Calculated from actual work — not button clicks."
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {summary
            ? [
                { label: 'Tasks', value: `${summary.completedTasks}/${summary.totalTasks}` },
                { label: 'Labs', value: `${summary.completedLabs}/${summary.totalLabs}` },
                { label: 'Experiments', value: `${summary.completedExperiments}/${summary.totalExperiments}` },
                { label: 'Testing', value: `${summary.completedTesting}/${summary.totalTesting}` },
                { label: 'Security', value: `${summary.completedSecurity}/${summary.totalSecurity}` },
                { label: 'Deployment', value: `${summary.completedDeployment}/${summary.totalDeployment}` },
                { label: 'Prerequisites', value: `${summary.prerequisitesCompleted}/${summary.prerequisitesTotal}` },
                { label: 'Objectives', value: `${summary.objectivesCompleted}/${summary.objectivesTotal}` },
                { label: 'Context Qs', value: `${summary.contextAnswered}/${summary.contextTotal}` },
                { label: 'Evidence', value: `${summary.evidenceCount}` },
              ].map((c) => (
                <div key={c.label} className="rounded-md border border-border p-3">
                  <div className="text-xs text-muted-foreground">{c.label}</div>
                  <div className="mt-1 font-mono text-lg font-bold">{c.value}</div>
                </div>
              ))
            : null}
        </div>
        {summary && (
          <div className="mt-4 grid gap-2 rounded-md bg-secondary/50 p-4 text-sm sm:grid-cols-2">
            <div>
              <span className="font-medium">Hours:</span>{' '}
              <span className="text-muted-foreground">
                {summary.hoursLogged}h logged of {summary.totalHours.min}–{summary.totalHours.max}h estimated
              </span>
            </div>
            <div>
              <span className="font-medium">Journal:</span>{' '}
              <span className="text-muted-foreground">{summary.journalCount} entries · {summary.adrCount} ADRs</span>
            </div>
          </div>
        )}
      </Section>

      <IntroductionSection build={build} />
      <PrerequisitesSection topicId={topicId} build={build} progress={progress} refresh={refresh} />
      <ObjectivesSection topicId={topicId} build={build} progress={progress} refresh={refresh} />
      <ArchitectureSection build={build} />
      <TechStackSection topicId={topicId} build={build} progress={progress} refresh={refresh} />
      <ContextSection topicId={topicId} build={build} progress={progress} refresh={refresh} />
      <MilestonesSection topicId={topicId} build={build} progress={progress} refresh={refresh} notify={notify} />
      <LabsSection topicId={topicId} build={build} progress={progress} refresh={refresh} notify={notify} />
      <ExperimentsSection topicId={topicId} build={build} progress={progress} refresh={refresh} notify={notify} />
      <EvaluationSection topicId={topicId} build={build} progress={progress} refresh={refresh} />
      <ChecklistGroupSection topicId={topicId} build={build} progress={progress} refresh={refresh} notify={notify} />
      <RelatedRoadmapSection build={build} />
      <DefendSection build={build} />
      <RepositoriesSection topicId={topicId} build={build} progress={progress} refresh={refresh} notify={notify} />
      <JournalSection topicId={topicId} progress={progress} refresh={refresh} notify={notify} />
      <ADRSection topicId={topicId} progress={progress} refresh={refresh} notify={notify} />
      <EvidenceSection topicId={topicId} progress={progress} refresh={refresh} notify={notify} />
      <CaseStudySection topicId={topicId} build={build} progress={progress} refresh={refresh} />

      {nextActionBar}
    </div>
  );
}

function nextActionLabel(
  build: ProjectBuild,
  summary: ProjectBuildProgress
): { label: string; meta: string; sectionId: string } | null {
  switch (summary.nextAction.kind) {
    case 'prerequisite': {
      const na = summary.nextAction;
      const item = build.prerequisites.find((p) => p.id === na.id);
      return { label: item ? `Prerequisite: ${item.skill}` : 'Complete prerequisites', meta: 'Mark what you already know', sectionId: 'prerequisites' };
    }
    case 'task': {
      const na = summary.nextAction;
      const task = build.tasks.find((t) => t.id === na.id);
      return { label: task ? task.title : 'Next task', meta: task ? task.goal : 'Continue the build', sectionId: 'milestones' };
    }
    case 'lab': {
      const na = summary.nextAction;
      const lab = build.labs.find((l) => l.id === na.id);
      return { label: lab ? `Lab: ${lab.title}` : 'Next lab', meta: 'Hands-on micro-lab', sectionId: 'labs' };
    }
    case 'experiment': {
      const na = summary.nextAction;
      const exp = build.experiments.find((e) => e.id === na.id);
      return { label: exp ? `Experiment: ${exp.name}` : 'Next experiment', meta: 'Run the benchmark and log results', sectionId: 'experiments' };
    }
    case 'testing':
      return { label: 'Testing checklist', meta: 'Verify the system works', sectionId: 'testing' };
    case 'security':
      return { label: 'Security checklist', meta: 'Verify the guardrails', sectionId: 'security' };
    case 'deployment':
      return { label: 'Deployment checklist', meta: 'Ship it and verify', sectionId: 'deployment' };
    case 'evaluation':
      return { label: 'Evaluation', meta: 'Record your measured improvements', sectionId: 'evaluation' };
    case 'evidence':
      return { label: 'Add evidence', meta: 'Prove the work with links or screenshots', sectionId: 'evidence' };
    case 'caseStudy':
      return { label: 'Portfolio case study', meta: 'Write up the results', sectionId: 'case-study' };
    case 'done':
      return null;
  }
}

function IntroductionSection({ build }: { build: ProjectBuild }) {
  return (
    <Section id="introduction" icon={<BookOpen className="h-4 w-4" />} title="Brief" subtitle="What you are building and why.">
      <div className="space-y-3">
        <div>
          <div className="text-xs font-medium text-muted-foreground">Overview</div>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{build.overview}</p>
        </div>
        <div>
          <div className="text-xs font-medium text-muted-foreground">Problem it solves</div>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{build.problem}</p>
        </div>
        <div>
          <div className="text-xs font-medium text-muted-foreground">Skills you will practice</div>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {build.skills.map((s) => (
              <span key={s.id} className="rounded bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function PrerequisitesSection({
  topicId,
  build,
  progress,
  refresh,
}: {
  topicId: string;
  build: ProjectBuild;
  progress: ProjectProgress;
  refresh: () => Promise<void>;
}) {
  const doneCount = build.prerequisites.filter((p) => progress.prerequisitesCompleted.includes(p.id)).length;
  return (
    <Section
      id="prerequisites"
      icon={<Zap className="h-4 w-4" />}
      title="Prerequisites"
      subtitle="Skill gates before you start building. The guide will only unlock sequencing hints once these are honest."
      right={
        <Badge tone={doneCount >= build.prerequisites.length ? 'green' : 'muted'}>
          {doneCount}/{build.prerequisites.length}
        </Badge>
      }
    >
      <div className="space-y-1.5">
        {build.prerequisites.map((p) => {
          const done = progress.prerequisitesCompleted.includes(p.id);
          return (
            <label
              key={p.id}
              className={cn(
                'flex cursor-pointer items-start gap-3 rounded-md border border-border p-3 text-sm transition-colors',
                done ? 'border-green-500/40 bg-green-500/5' : 'hover:bg-accent'
              )}
            >
              <input
                type="checkbox"
                checked={done}
                onChange={async (e) => {
                  await ProjectPrerequisiteRepository.toggle(topicId, p.id, e.target.checked);
                  refresh();
                }}
                className="mt-0.5 h-4 w-4"
              />
              <div>
                <span className={cn('font-medium', done && 'text-muted-foreground line-through')}>{p.skill}</span>
                {p.roadmapSlug && (
                  <Link to={`/roadmap/${p.roadmapSlug}`} className="ml-2 text-xs text-primary hover:underline">
                    {p.roadmapSlug.replace(/-/g, ' ')}
                  </Link>
                )}
                {!p.required && <span className="ml-2 text-xs text-muted-foreground">optional</span>}
              </div>
            </label>
          );
        })}
      </div>
    </Section>
  );
}

function ObjectivesSection({
  topicId,
  build,
  progress,
  refresh,
}: {
  topicId: string;
  build: ProjectBuild;
  progress: ProjectProgress;
  refresh: () => Promise<void>;
}) {
  return (
    <Section
      id="objectives"
      icon={<Target className="h-4 w-4" />}
      title="Objectives"
      subtitle="By completing this project you should be able to:"
    >
      <div className="space-y-1.5">
        {build.objectives.map((o) => {
          const done = progress.objectivesCompleted.includes(o.id);
          return (
            <label
              key={o.id}
              className={cn(
                'flex cursor-pointer items-start gap-3 rounded-md border border-border p-3 text-sm transition-colors',
                done ? 'border-green-500/40 bg-green-500/5' : 'hover:bg-accent'
              )}
            >
              <input
                type="checkbox"
                checked={done}
                onChange={async (e) => {
                  await ProjectObjectiveRepository.toggle(topicId, o.id, e.target.checked);
                  refresh();
                }}
                className="mt-0.5 h-4 w-4"
              />
              <span className={cn(done && 'text-muted-foreground line-through')}>{o.text}</span>
            </label>
          );
        })}
      </div>
    </Section>
  );
}

function ArchitectureSection({ build }: { build: ProjectBuild }) {
  const branch = build.architecture.branch;
  let mainFlow = build.architecture.flow;
  let pre: string[] = mainFlow;
  let post: string[] = [];
  let branchLeft: { label: string; steps: string[] } | null = null;
  let branchRight: { label: string; steps: string[] } | null = null;
  if (branch) {
    const idx = mainFlow.indexOf(branch.after);
    pre = mainFlow.slice(0, idx + 1);
    post = mainFlow.slice(idx + 1);
    branchLeft = { label: 'Branch A', steps: branch.left };
    branchRight = { label: 'Branch B', steps: branch.right };
  }

  return (
    <Section
      id="architecture"
      icon={<Layers className="h-4 w-4" />}
      title="Architecture"
      subtitle="The mental model before you write any code."
    >
      <div className="flex flex-col items-stretch gap-0">
        {pre.map((step) => (
          <FlowBox key={step} text={step} />
        ))}

        {branchLeft && branchRight && (
          <>
            <ArrowDown className="mx-auto h-4 w-4 text-muted-foreground" />
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-md bg-secondary/50 p-3">
                <div className="mb-2 text-xs font-medium text-muted-foreground">{branchLeft.label}</div>
                <div className="flex flex-col items-stretch gap-0">
                  {branchLeft.steps.map((step) => (
                    <FlowBox key={step} text={step} />
                  ))}
                </div>
              </div>
              <div className="rounded-md bg-secondary/50 p-3">
                <div className="mb-2 text-xs font-medium text-muted-foreground">{branchRight.label}</div>
                <div className="flex flex-col items-stretch gap-0">
                  {branchRight.steps.map((step) => (
                    <FlowBox key={step} text={step} />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {post.length > 0 && (
          <>
            <ArrowDown className="mx-auto h-4 w-4 text-muted-foreground" />
            {post.map((step) => (
              <FlowBox key={step} text={step} />
            ))}
          </>
        )}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-md bg-secondary/50 p-4">
          <div className="text-xs font-medium text-muted-foreground">Why this shape</div>
          <ul className="mt-2 list-inside list-disc space-y-1 text-xs">
            {build.architecture.why.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs font-medium text-muted-foreground">Architecture decisions to justify</div>
          <div className="mt-2 space-y-2">
            {build.architecture.decisions.map((d, i) => (
              <div key={d.id} className="rounded-md border border-border p-3 text-xs">
                <div className="font-medium text-foreground">D{i + 1}. {d.question}</div>
                <p className="mt-1 text-muted-foreground">{d.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function FlowBox({ text }: { text: string }) {
  return (
    <>
      <div className="rounded-md bg-secondary/70 px-4 py-2 text-center font-mono text-xs">{text}</div>
      <ArrowDown className="mx-auto h-4 w-4 py-0 text-muted-foreground" />
    </>
  );
}

function TechStackSection({
  topicId,
  build,
  progress,
  refresh,
}: {
  topicId: string;
  build: ProjectBuild;
  progress: ProjectProgress;
  refresh: () => Promise<void>;
}) {
  return (
    <Section
      id="tech-stack"
      icon={<Layers className="h-4 w-4" />}
      title="Tech stack"
      subtitle="Recommended choice with honest alternatives. Record your decision."
    >
      <div className="space-y-4">
        {build.technologies.map((tech) => {
          const choices = [tech.recommended, ...tech.alternatives.filter((a) => a !== tech.recommended)];
          const chosen = progress.technologyDecisions[tech.id] ?? '';
          return (
            <div key={tech.id} className="rounded-md border border-border p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-medium">{tech.label}</div>
                  <p className="mt-1 text-xs text-muted-foreground">{tech.why}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="primary">Recommended: {tech.recommended}</Badge>
                  {tech.alternatives.filter((a) => a !== tech.recommended).length > 0 && (
                    <Badge>Alts: {tech.alternatives.filter((a) => a !== tech.recommended).join(', ')}</Badge>
                  )}
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-xs text-muted-foreground">What you chose:</span>
                <select
                  value={chosen}
                  onChange={async (e) => {
                    await ProjectMiscRepository.saveTechDecision(topicId, tech.id, e.target.value);
                    refresh();
                  }}
                  className="rounded-md border border-border bg-background px-2 py-1.5 text-sm"
                >
                  <option value="">—</option>
                  {choices.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function ContextSection({
  topicId,
  build,
  progress,
  refresh,
}: {
  topicId: string;
  build: ProjectBuild;
  progress: ProjectProgress;
  refresh: () => Promise<void>;
}) {
  return (
    <Section id="context" icon={<MessageSquare className="h-4 w-4" />} title="Context engineering" subtitle="Answer these before coding — they force you to design the agent's context.">
      <div className="space-y-4">
        {build.contextEngineering.map((q, i) => {
          const value = progress.contextEngineering[q.id] ?? '';
          return (
            <div key={q.id} className="rounded-md border border-border p-4">
              <div className="flex items-start gap-2">
                <Badge tone="primary">Q{i + 1}</Badge>
                <span className="text-sm font-medium">{q.question}</span>
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">Example: {q.example}</p>
              <textarea
                defaultValue={value}
                rows={2}
                onBlur={(e) => {
                  ProjectMiscRepository.saveContextAnswer(topicId, q.id, e.target.value);
                  refresh();
                }}
                placeholder="Your answer..."
                className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function MilestonesSection({
  topicId,
  build,
  progress,
  refresh,
  notify,
}: {
  topicId: string;
  build: ProjectBuild;
  progress: ProjectProgress;
  refresh: () => Promise<void>;
  notify: (m: string) => void;
}) {
  async function toggleTask(taskId: string, done: boolean) {
    const prev = progress.tasks[taskId]?.completed;
    await ProjectTaskRepository.setCompleted(topicId, taskId, done);
    if (done && !prev) notify('✓ Task completed');
    refresh();
  }

  return (
    <Section
      id="milestones"
      icon={<Rocket className="h-4 w-4" />}
      title="Build milestones"
      subtitle="A guided sequence — each task has why, how, and acceptance criteria."
      right={
        <Badge tone="muted">
          {build.tasks.filter((t) => progress.tasks[t.id]?.completed).length}/{build.tasks.length} tasks
        </Badge>
      }
    >
      <div className="space-y-4">
        {build.milestones.map((milestone, mi) => {
          const tasks = milestone.taskIds.flatMap((id) => build.tasks.filter((t) => t.id === id));
          const done = tasks.filter((t) => progress.tasks[t.id]?.completed).length;
          return (
            <div key={milestone.id} className="rounded-md border border-border p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge tone="muted">M{mi + 1}</Badge>
                  <span className="font-medium">{milestone.title}</span>
                </div>
                <Badge tone={done >= tasks.length ? 'green' : 'muted'}>{done}/{tasks.length}</Badge>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{milestone.summary}</p>

              <div className="mt-3 space-y-2">
                {tasks.map((task, ti) => {
                  const state = progress.tasks[task.id] ?? { completed: false, notes: '' };
                  return (
                    <details key={task.id} id={`task-${task.id}`} className="rounded-md border border-border group/task">
                      <summary className="flex cursor-pointer list-none items-center gap-3 p-3 text-sm">
                        <input
                          type="checkbox"
                          checked={state.completed}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => toggleTask(task.id, e.target.checked)}
                          className="h-4 w-4 shrink-0"
                        />
                        <span className={cn('min-w-0 flex-1 font-medium', state.completed && 'text-muted-foreground line-through')}>
                          M{mi + 1}.{ti + 1} — {task.title}
                        </span>
                        <span className="shrink-0 text-xs text-muted-foreground group-open/task:hidden">Show details</span>
                        <span className="hidden shrink-0 text-xs text-muted-foreground group-open/task:inline">Hide details</span>
                      </summary>
                      <div className="space-y-3 border-t border-border p-3 text-xs">
                        <div>
                          <span className="font-medium text-foreground">Goal: </span>
                          <span className="text-muted-foreground">{task.goal}</span>
                        </div>
                        <div>
                          <span className="font-medium text-foreground">Why it matters: </span>
                          <span className="text-muted-foreground">{task.whyItMatters}</span>
                        </div>
                        {task.prerequisites.length > 0 && (
                          <TaskList label="Prerequisites" items={task.prerequisites} />
                        )}
                        {task.concepts.length > 0 && (
                          <TaskList label="Concepts" items={task.concepts} />
                        )}
                        {task.approach.length > 0 && (
                          <div>
                            <div className="font-medium text-foreground">Approach</div>
                            <ol className="mt-1 list-inside list-decimal space-y-1 text-muted-foreground">
                              {task.approach.map((a) => <li key={a}>{a}</li>)}
                            </ol>
                          </div>
                        )}
                        {task.acceptanceCriteria.length > 0 && (
                          <TaskList label="Acceptance criteria" items={task.acceptanceCriteria} check />
                        )}
                        {task.commonMistakes !== undefined && task.commonMistakes.length > 0 && (
                          <TaskList label="Common mistakes" items={task.commonMistakes} />
                        )}
                        {task.hints && (
                          <div>
                            <span className="font-medium text-foreground">Hints: </span>
                            <span className="text-muted-foreground">{task.hints}</span>
                          </div>
                        )}
                        {task.resources && task.resources.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {task.resources.map((r) => (
                              <a
                                key={r.url}
                                href={r.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 hover:bg-accent"
                              >
                                {r.title} <ExternalLink className="h-3 w-3" />
                              </a>
                            ))}
                          </div>
                        )}
                        {task.relatedRoadmapSlugs && task.relatedRoadmapSlugs.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {task.relatedRoadmapSlugs.map((slug) => (
                              <Link key={slug} to={`/roadmap/${slug}`} className="rounded-md border border-border px-2 py-1 hover:bg-accent">
                                {slug.replace(/-/g, ' ')}
                              </Link>
                            ))}
                          </div>
                        )}
                        {task.evidenceRequirement && (
                          <div>
                            <span className="font-medium text-foreground">Evidence: </span>
                            <span className="text-muted-foreground">{task.evidenceRequirement}</span>
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-foreground">Your notes</div>
                          <textarea
                            defaultValue={state.notes}
                            rows={2}
                            onBlur={(e) => {
                              ProjectTaskRepository.setNotes(topicId, task.id, e.target.value);
                              refresh();
                            }}
                            placeholder="What did you do? What did you observe?"
                            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm"
                          />
                        </div>
                      </div>
                    </details>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function TaskList({ label, items, check }: { label: string; items: string[]; check?: boolean }) {
  return (
    <div>
      <div className="font-medium text-foreground">{label}</div>
      <ul className="mt-1 list-inside space-y-1 text-muted-foreground">
        {items.map((item) => (
          <li key={item} className={cn(check && 'flex items-start gap-1.5')}>
            {check && <Check className="mt-0.5 h-3 w-3 shrink-0 text-green-600" />}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function LabsSection({
  topicId,
  build,
  progress,
  refresh,
  notify,
}: {
  topicId: string;
  build: ProjectBuild;
  progress: ProjectProgress;
  refresh: () => Promise<void>;
  notify: (m: string) => void;
}) {
  async function saveLab(labId: string, state: LabState) {
    await ProjectLabRepository.save(topicId, labId, state);
    refresh();
  }

  async function setLabStatus(labId: string, status: LabState['status']) {
    const prev = progress.labs[labId]?.status;
    await ProjectLabRepository.setStatus(topicId, labId, status);
    if (status === 'completed' && prev !== 'completed') notify('✓ Lab completed — nice work');
    refresh();
  }

  return (
    <Section
      id="labs"
      icon={<FlaskConical className="h-4 w-4" />}
      title="Hands-on labs"
      subtitle="Micro-labs that isolate the key mechanisms of this architecture."
    >
      <div className="space-y-4">
        {build.labs.map((lab, index) => {
          const state = progress.labs[lab.id] ?? {
            status: 'not_started' as const,
            githubUrl: '',
            notes: '',
            timeSpentMinutes: 0,
            evidence: '',
          };
          const statusTone = state.status === 'completed' ? 'green' : state.status === 'in_progress' ? 'primary' : 'muted';
          return (
            <div key={lab.id} id={`lab-${lab.id}`} className="scroll-mt-20 rounded-md border border-border p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge tone="muted">Lab {index + 1}</Badge>
                  <span className="font-medium">{lab.title}</span>
                  <Badge tone={statusTone}>{state.status.replace(/_/g, ' ')}</Badge>
                </div>
                <Badge>
                  <Clock className="h-3 w-3" /> ~{lab.estimatedMinutes} min
                </Badge>
              </div>

              <p className="mt-3 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Problem: </span>
                {lab.problem}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{lab.description}</p>

              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <div className="rounded-md bg-secondary/50 p-3">
                  <div className="text-xs font-medium text-muted-foreground">Compare</div>
                  <ul className="mt-1.5 list-inside list-disc space-y-1 text-xs">
                    {lab.compare.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                </div>
                <div className="rounded-md bg-secondary/50 p-3">
                  <div className="text-xs font-medium text-muted-foreground">Measure</div>
                  <ul className="mt-1.5 list-inside list-disc space-y-1 text-xs">
                    {lab.measure.map((m) => <li key={m}>{m}</li>)}
                  </ul>
                </div>
              </div>

              <div className="mt-3">
                <div className="text-xs font-medium text-muted-foreground">Deliverables</div>
                <ul className="mt-1.5 list-inside list-disc space-y-1 text-xs">
                  {lab.deliverables.map((d) => <li key={d}>{d}</li>)}
                </ul>
              </div>

              <div className="mt-4 grid gap-3 border-t border-border pt-3 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <div className="text-xs text-muted-foreground">Status</div>
                  <select
                    value={state.status}
                    onChange={(e) => setLabStatus(lab.id, e.target.value as LabState['status'])}
                    className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm"
                  >
                    <option value="not_started">Not Started</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">GitHub URL</div>
                  <input
                    type="url"
                    defaultValue={state.githubUrl}
                    onBlur={(e) => saveLab(lab.id, { ...state, githubUrl: e.target.value })}
                    placeholder="https://github.com/you/repo"
                    className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm"
                  />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Time spent (min)</div>
                  <input
                    type="number"
                    min={0}
                    defaultValue={state.timeSpentMinutes || ''}
                    onBlur={(e) => saveLab(lab.id, { ...state, timeSpentMinutes: Number(e.target.value) || 0 })}
                    placeholder="0"
                    className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm"
                  />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Evidence</div>
                  <input
                    type="text"
                    defaultValue={state.evidence}
                    onBlur={(e) => saveLab(lab.id, { ...state, evidence: e.target.value })}
                    placeholder="Link or note"
                    className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm"
                  />
                </div>
              </div>

              <div className="mt-3">
                <div className="text-xs text-muted-foreground">Lab notes</div>
                <textarea
                  defaultValue={state.notes}
                  onBlur={(e) => saveLab(lab.id, { ...state, notes: e.target.value })}
                  rows={2}
                  placeholder="Results, trade-offs, surprises"
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm"
                />
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function ExperimentsSection({
  topicId,
  build,
  progress,
  refresh,
  notify,
}: {
  topicId: string;
  build: ProjectBuild;
  progress: ProjectProgress;
  refresh: () => Promise<void>;
  notify: (m: string) => void;
}) {
  const [templateId, setTemplateId] = useState(build.experiments[0]?.id ?? '');
  const [version, setVersion] = useState('v1');
  const [notes, setNotes] = useState('');
  const [metrics, setMetrics] = useState<Record<string, string>>({});
  const template = build.experiments.find((e) => e.id === templateId);

  async function submitExperiment() {
    if (!template) return;
    const result: ProjectExperimentResult = {
      id: generateId(),
      name: template.name,
      version: version.trim() || 'v1',
      date: new Date().toISOString(),
      metrics: Object.fromEntries(
        Object.entries(metrics).map(([k, v]) => [k, v === '' || v === null ? null : Number(v)])
      ),
      notes: notes.trim(),
    };
    await ProjectExperimentRepository.add(topicId, result);
    setMetrics({});
    setVersion('v1');
    setNotes('');
    notify('✓ Experiment result logged');
    refresh();
  }

  return (
    <Section
      id="experiments"
      icon={<FlaskConical className="h-4 w-4" />}
      title="Experiments"
      subtitle="Benchmarks that produce real, honest numbers for your portfolio."
      right={
        <Badge tone="muted">{progress.experiments.length}/{build.experiments.length} logged</Badge>
      }
    >
      <div className="space-y-4">
        {build.experiments.map((exp) => {
          const logged = progress.experiments.some((r) => r.name === exp.name);
          const results = progress.experiments.filter((r) => r.name === exp.name);
          return (
            <div key={exp.id} className="rounded-md border border-border p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium">{exp.name}</span>
                    {logged && <Badge tone="green">✓ Logged</Badge>}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{exp.description}</p>
                </div>
                <Badge>{results.length} run{results.length === 1 ? '' : 's'}</Badge>
              </div>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <div className="rounded-md bg-secondary/50 p-3">
                  <div className="text-xs font-medium text-muted-foreground">Variants</div>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {exp.variants.map((v) => (
                      <span key={v} className="rounded bg-background px-1.5 py-0.5 text-xs">{v}</span>
                    ))}
                  </div>
                </div>
                <div className="rounded-md bg-secondary/50 p-3">
                  <div className="text-xs font-medium text-muted-foreground">Metrics</div>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {exp.metrics.map((m) => (
                      <span key={m} className="rounded bg-background px-1.5 py-0.5 font-mono text-xs">{m}</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">What honest results usually show: </span>
                {exp.expectedInsights}
              </p>
              {results.length > 0 && (
                <div className="mt-3 overflow-x-auto border-t border-border pt-3">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="text-muted-foreground">
                        <th className="py-1 pr-3 font-medium">Run</th>
                        <th className="py-1 pr-3 font-medium">Date</th>
                        {exp.metrics.map((m) => (
                          <th key={m} className="py-1 pr-3 font-mono font-medium">{m}</th>
                        ))}
                        <th className="py-1 pr-3 font-medium">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((r) => (
                        <tr key={r.id} className="border-t border-border">
                          <td className="py-1.5 pr-3">{r.version}</td>
                          <td className="py-1.5 pr-3">{new Date(r.date).toLocaleDateString()}</td>
                          {exp.metrics.map((m) => (
                            <td key={m} className="py-1.5 pr-3 font-mono">
                              {typeof r.metrics[m] === 'number' ? r.metrics[m] : '—'}
                            </td>
                          ))}
                          <td className="py-1.5 pr-3 text-muted-foreground">{r.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}

        <div className="rounded-md border border-dashed border-border p-4">
          <div className="text-sm font-medium">Log a new experiment run</div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <div className="text-xs text-muted-foreground">Experiment</div>
              <select
                value={templateId}
                onChange={(e) => {
                  setTemplateId(e.target.value);
                  setMetrics({});
                }}
                className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm"
              >
                {build.experiments.map((e) => (
                  <option key={e.id} value={e.id}>{e.name}</option>
                ))}
              </select>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Version</div>
              <input
                type="text"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                placeholder="v1"
                className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm"
              />
            </div>
          </div>
          {template && (
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {template.metrics.map((m) => (
                <div key={m}>
                  <div className="font-mono text-xs text-muted-foreground">{m}</div>
                  <input
                    type="number"
                    step="any"
                    value={metrics[m] ?? ''}
                    onChange={(e) => setMetrics({ ...metrics, [m]: e.target.value })}
                    placeholder="value"
                    className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5 font-mono text-sm"
                  />
                </div>
              ))}
            </div>
          )}
          <div className="mt-3">
            <div className="text-xs text-muted-foreground">Notes (what you changed / observed)</div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Describe the run..."
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
          </div>
          <button
            onClick={submitExperiment}
            className="mt-3 inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90"
          >
            <Plus className="h-3 w-3" /> Log result
          </button>
        </div>
      </div>
    </Section>
  );
}

function EvaluationSection({
  topicId,
  build,
  progress,
  refresh,
}: {
  topicId: string;
  build: ProjectBuild;
  progress: ProjectProgress;
  refresh: () => Promise<void>;
}) {
  const measured = build.evaluation.metrics.filter((m) => typeof progress.evaluation[m.key] === 'number').length;
  return (
    <Section
      id="evaluation"
      icon={<Info className="h-4 w-4" />}
      title="Evaluation"
      subtitle={build.evaluation.description}
      right={
        <Badge tone={measured >= build.evaluation.metrics.length ? 'green' : 'muted'}>
          {measured}/{build.evaluation.metrics.length} measured
        </Badge>
      }
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {build.evaluation.metrics.map((m) => {
          const value = progress.evaluation[m.key];
          return (
            <div key={m.key} className="rounded-md border border-border p-3">
              <div className="text-xs font-medium text-muted-foreground">{m.name}</div>
              <div className="text-xs text-muted-foreground">{m.description}</div>
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="number"
                  step="any"
                  defaultValue={typeof value === 'number' ? String(value) : ''}
                  onBlur={(e) => {
                    const v = e.target.value;
                    ProjectMiscRepository.saveEvaluationMetric(topicId, m.key, v === '' ? null : Number(v));
                    refresh();
                  }}
                  placeholder="value"
                  className="w-full rounded-md border border-border bg-background px-2 py-1.5 font-mono text-sm"
                />
                <span className="shrink-0 text-xs text-muted-foreground">{m.unit}</span>
              </div>
              {typeof value === 'number' && (
                <div className="mt-1.5 text-xs text-green-600">Logged: {value}{m.unit.trim() ? ` ${m.unit}` : ''}</div>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function ChecklistGroupSection({
  topicId,
  build,
  progress,
  refresh,
  notify,
}: {
  topicId: string;
  build: ProjectBuild;
  progress: ProjectProgress;
  refresh: () => Promise<void>;
  notify: (m: string) => void;
}) {
  const groups = [
    {
      key: 'testingCompleted' as const,
      id: 'testing',
      icon: <ListChecks className="h-4 w-4" />,
      title: 'Testing',
      subtitle: 'Verify the system behaves correctly.',
      items: build.testing,
      doneList: progress.testingCompleted,
    },
    {
      key: 'securityCompleted' as const,
      id: 'security',
      icon: <ShieldCheck className="h-4 w-4" />,
      title: 'Security & guardrails',
      subtitle: 'Attack-oriented controls — this is what interviewers ask about.',
      items: build.security.map((s) => ({ id: s.id, text: s.title, description: `${s.threat} → ${s.mitigation} — Test: ${s.test}` })),
      doneList: progress.securityCompleted,
      detailed: build.security,
    },
    {
      key: 'deploymentCompleted' as const,
      id: 'deployment',
      icon: <Rocket className="h-4 w-4" />,
      title: 'Deployment',
      subtitle: 'Ship it and prove it runs.',
      items: build.deployment,
      doneList: progress.deploymentCompleted,
    },
  ];

  return (
    <>
      {groups.map((g) => {
        const doneCount = g.doneList.length;
        return (
          <Section
            key={g.id}
            id={g.id}
            icon={g.icon}
            title={g.title}
            subtitle={g.subtitle}
            right={
              <Badge tone={doneCount >= g.items.length ? 'green' : 'muted'}>
                {doneCount}/{g.items.length}
              </Badge>
            }
          >
            <div className="space-y-2">
              {g.items.map((item) => {
                const done = g.doneList.includes(item.id);
                return (
                  <div key={item.id} className="rounded-md border border-border p-3">
                    <label className="flex cursor-pointer items-start gap-3 text-sm">
                      <input
                        type="checkbox"
                        checked={done}
                        onChange={async (e) => {
                          await ProjectChecklistRepository.toggle(topicId, g.key, item.id, e.target.checked);
                          if (e.target.checked) notify(`✓ ${g.title} item completed`);
                          refresh();
                        }}
                        className="mt-0.5 h-4 w-4"
                      />
                      <span className={cn(done && 'text-muted-foreground line-through')}>{item.text}</span>
                    </label>
                    {item.description && <p className="ml-7 mt-1 text-xs text-muted-foreground">{item.description}</p>}
                  </div>
                );
              })}
            </div>
          </Section>
        );
      })}
    </>
  );
}

function RelatedRoadmapSection({ build }: { build: ProjectBuild }) {
  return (
    <Section id="related-roadmap" icon={<Layers className="h-4 w-4" />} title="Related roadmap modules" subtitle="Skills this project assumes and deepens.">
      <div className="flex flex-wrap gap-2">
        {build.relatedRoadmap.map((r) => (
          <Link key={r.slug} to={`/roadmap/${r.slug}`} className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent">
            {r.label}
          </Link>
        ))}
      </div>
    </Section>
  );
}

function DefendSection({ build }: { build: ProjectBuild }) {
  const [qs, setQs] = useState<Awaited<ReturnType<typeof InterviewQuestionRepository.getAll>>>([]);
  useEffect(() => {
    void (async () => {
      const all = await InterviewQuestionRepository.getAll();
      setQs(all.filter((q) => q.relatedProjectId === build.projectId));
    })();
  }, [build.projectId]);

  return (
    <Section
      id="defend"
      icon={<MessageSquare className="h-4 w-4" />}
      title="Defend this project"
      subtitle="Interviewers will ask about this exact build — practice the real questions tied to it."
      right={
        qs.length > 0 ? (
          <Link to="/interview" className="text-xs text-primary hover:underline">
            Open Interview Lab →
          </Link>
        ) : undefined
      }
    >
      {qs.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No Interview Lab questions tied to this project yet. Practice questions in the Lab and your defenses will appear here.
        </p>
      ) : (
        <div className="space-y-2">
          {qs.map((q) => (
            <Link
              key={q.id}
              to={`/interview/question/${q.id}`}
              className="flex items-center justify-between gap-3 rounded-md border border-border p-3 text-sm transition-colors hover:border-primary"
            >
              <span className="min-w-0 break-words">{q.question}</span>
              <span className="flex shrink-0 items-center gap-1.5">
                <Badge tone="primary">{q.category}</Badge>
                <Badge tone="muted">{q.difficulty}</Badge>
              </span>
            </Link>
          ))}
        </div>
      )}
    </Section>
  );
}

function RepositoriesSection({
  topicId,
  build,
  progress,
  refresh,
  notify,
}: {
  topicId: string;
  build: ProjectBuild;
  progress: ProjectProgress;
  refresh: () => Promise<void>;
  notify: (m: string) => void;
}) {
  return (
    <Section
      id="repositories"
      icon={<GitBranch className="h-4 w-4" />}
      title="Repositories to study"
      subtitle="Guided reading of the real code that inspired this architecture."
    >
      <div className="space-y-4">
        {build.relatedRepositories.map((repo) => {
          const doneSteps = progress.repositories[repo.id] ?? [];
          const allDone = doneSteps.length >= repo.guidedSteps.length;
          return (
            <div key={repo.id} className="rounded-md border border-border p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <a href={repo.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium hover:text-primary">
                    {repo.name} <ExternalLink className="h-3 w-3" />
                  </a>
                  <p className="text-xs text-muted-foreground">Why study: {repo.whyStudy}</p>
                </div>
                <Badge tone={allDone ? 'green' : 'muted'}>{doneSteps.length}/{repo.guidedSteps.length} steps</Badge>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="rounded-md bg-secondary/50 p-3 text-xs text-muted-foreground">
                  <div className="font-medium text-foreground">What to look for</div>
                  <p className="mt-1">{repo.whatToLookFor}</p>
                  <div className="mt-2 font-medium text-foreground">Important files</div>
                  <ul className="mt-1 list-inside list-disc space-y-0.5 font-mono">
                    {repo.importantFiles.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                  <div className="mt-2 font-medium text-foreground">Concepts</div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {repo.concepts.map((c) => (
                      <span key={c} className="rounded bg-background px-1.5 py-0.5">{c}</span>
                    ))}
                  </div>
                </div>
                <ol className="space-y-1.5">
                  {repo.guidedSteps.map((step, i) => {
                    const done = doneSteps.includes(step.id);
                    return (
                      <li key={step.id}>
                        <label className={cn('flex cursor-pointer items-start gap-2 rounded-md border border-border p-2 text-xs', done && 'border-green-500/40 bg-green-500/5')}>
                          <input
                            type="checkbox"
                            checked={done}
                            onChange={async (e) => {
                              await ProjectMiscRepository.saveRepositoryStep(topicId, repo.id, step.id, e.target.checked);
                              if (e.target.checked && doneSteps.length + 1 >= repo.guidedSteps.length) notify(`✓ ${repo.name} fully studied`);
                              refresh();
                            }}
                            className="mt-0.5 h-3.5 w-3.5"
                          />
                          <span className={cn(done && 'text-muted-foreground line-through')}>
                            <span className="font-medium text-foreground">Step {i + 1}:</span> {step.text}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function JournalSection({
  topicId,
  progress,
  refresh,
  notify,
}: {
  topicId: string;
  progress: ProjectProgress;
  refresh: () => Promise<void>;
  notify: (m: string) => void;
}) {
  const [today, setToday] = useState('');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [lesson, setLesson] = useState('');
  const [hours, setHours] = useState('');

  async function addEntry() {
    if (!today.trim()) return;
    const entry: ProjectJournalEntry = {
      id: generateId(),
      date: new Date().toISOString(),
      today: today.trim(),
      problem: problem.trim(),
      solution: solution.trim(),
      lesson: lesson.trim(),
      hours: Number(hours) || 0,
    };
    await ProjectJournalRepository.add(topicId, entry);
    setToday('');
    setProblem('');
    setSolution('');
    setLesson('');
    setHours('');
    notify('✓ Journal entry added');
    refresh();
  }

  async function removeEntry(id: string) {
    await ProjectJournalRepository.remove(topicId, id);
    refresh();
  }

  return (
    <Section
      id="journal"
      icon={<FileText className="h-4 w-4" />}
      title="Build journal"
      subtitle="Day-by-day log of the work — this becomes your interview story."
      right={<Badge tone="muted">{progress.journal.length} entries</Badge>}
    >
      <div className="space-y-4">
        {progress.journal.length > 0 && (
          <div className="space-y-2">
            {[...progress.journal].reverse().map((e) => (
              <div key={e.id} className="flex items-start gap-3 rounded-md border border-border p-3 text-sm">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium">{e.today}</span>
                    <Badge tone="muted">{e.hours}h · {new Date(e.date).toLocaleDateString()}</Badge>
                  </div>
                  {e.problem && <p className="mt-1 text-xs text-muted-foreground"><span className="font-medium text-foreground">Problem:</span> {e.problem}</p>}
                  {e.solution && <p className="mt-1 text-xs text-muted-foreground"><span className="font-medium text-foreground">Solution:</span> {e.solution}</p>}
                  {e.lesson && <p className="mt-1 text-xs text-muted-foreground"><span className="font-medium text-foreground">Lesson:</span> {e.lesson}</p>}
                </div>
                <button onClick={() => removeEntry(e.id)} className="shrink-0 text-muted-foreground hover:text-destructive" aria-label="Delete entry">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="rounded-md border border-dashed border-border p-4">
          <div className="text-sm font-medium">Log today&apos;s work</div>
          <div className="mt-3 space-y-3">
            <input
              type="text"
              value={today}
              onChange={(e) => setToday(e.target.value)}
              placeholder="What did you build today?"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                type="text"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="Hardest problem"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              />
              <input
                type="text"
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                placeholder="How you solved it"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-[1fr_120px]">
              <input
                type="text"
                value={lesson}
                onChange={(e) => setLesson(e.target.value)}
                placeholder="Lesson learned"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              />
              <input
                type="number"
                min={0}
                step={0.5}
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="Hours"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <button
              onClick={addEntry}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90"
            >
              <Plus className="h-3 w-3" /> Add entry
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}

function ADRSection({
  topicId,
  progress,
  refresh,
  notify,
}: {
  topicId: string;
  progress: ProjectProgress;
  refresh: () => Promise<void>;
  notify: (m: string) => void;
}) {
  const [draft, setDraft] = useState<Omit<ProjectADR, 'id' | 'date' | 'status'>>({
    title: '',
    context: '',
    alternatives: [],
    decision: '',
    reason: '',
  });

  async function addADR() {
    if (!draft.title.trim() || !draft.decision.trim()) return;
    const adr: ProjectADR = {
      ...draft,
      id: generateId(),
      date: new Date().toISOString(),
      status: 'accepted',
      alternatives: draft.alternatives.filter((a) => a.trim().length > 0),
    };
    await ProjectADRRepository.add(topicId, adr);
    setDraft({ title: '', context: '', alternatives: [], decision: '', reason: '' });
    notify('✓ ADR added');
    refresh();
  }

  return (
    <Section
      id="adrs"
      icon={<FileText className="h-4 w-4" />}
      title="Architecture decision records"
      subtitle="Every real engineering team leaves a paper trail. Write the ones that matter."
      right={<Badge tone="muted">{progress.adrs.length} ADRs</Badge>}
    >
      <div className="space-y-4">
        {progress.adrs.length > 0 && (
          <div className="space-y-2">
            {progress.adrs.map((adr) => (
              <div key={adr.id} className="rounded-md border border-border p-3 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-medium">{adr.title}</span>
                  <div className="flex items-center gap-2">
                    <Badge tone={adr.status === 'accepted' ? 'green' : adr.status === 'superseded' ? 'amber' : 'muted'}>{adr.status}</Badge>
                    <button onClick={async () => { await ProjectADRRepository.remove(topicId, adr.id); refresh(); }} className="text-muted-foreground hover:text-destructive" aria-label="Delete ADR">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{adr.context}</p>
                <p className="mt-1 text-xs text-muted-foreground"><span className="font-medium text-foreground">Decision:</span> {adr.decision}</p>
                <p className="mt-1 text-xs text-muted-foreground"><span className="font-medium text-foreground">Why:</span> {adr.reason}</p>
                {adr.alternatives.length > 0 && (
                  <p className="mt-1 text-xs text-muted-foreground"><span className="font-medium text-foreground">Considered:</span> {adr.alternatives.join(', ')}</p>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="rounded-md border border-dashed border-border p-4">
          <div className="text-sm font-medium">Record a decision</div>
          <div className="mt-3 space-y-3">
            <input
              type="text"
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              placeholder="Title (e.g. Use pgvector instead of Pinecone)"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
            <textarea
              value={draft.context}
              onChange={(e) => setDraft({ ...draft, context: e.target.value })}
              rows={2}
              placeholder="Context — what forced this decision?"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                type="text"
                value={draft.alternatives[0] ?? ''}
                onChange={(e) => setDraft({ ...draft, alternatives: [e.target.value, draft.alternatives[1] ?? ''].filter(Boolean) })}
                placeholder="Alternative considered"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              />
              <input
                type="text"
                value={draft.alternatives[1] ?? ''}
                onChange={(e) => setDraft({ ...draft, alternatives: [draft.alternatives[0] ?? '', e.target.value].filter(Boolean) })}
                placeholder="Another alternative (optional)"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                type="text"
                value={draft.decision}
                onChange={(e) => setDraft({ ...draft, decision: e.target.value })}
                placeholder="Decision"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              />
              <input
                type="text"
                value={draft.reason}
                onChange={(e) => setDraft({ ...draft, reason: e.target.value })}
                placeholder="Why this choice"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <button
              onClick={addADR}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90"
            >
              <Plus className="h-3 w-3" /> Add ADR
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}

function EvidenceSection({
  topicId,
  progress,
  refresh,
  notify,
}: {
  topicId: string;
  progress: ProjectProgress;
  refresh: () => Promise<void>;
  notify: (m: string) => void;
}) {
  const [type, setType] = useState('github');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const evidenceTypes = [
    'github',
    'pull_request',
    'article',
    'benchmark',
    'demo',
    'deployment',
    'certification',
    'architecture_diagram',
  ];

  async function addEvidence() {
    if (!title.trim()) return;
    const item: ProjectEvidenceItem = {
      id: generateId(),
      type,
      title: title.trim(),
      url: url.trim(),
      date: new Date().toISOString(),
    };
    await ProjectEvidenceRepository.add(topicId, item);
    setTitle('');
    setUrl('');
    notify('✓ Evidence added');
    refresh();
  }

  return (
    <Section
      id="evidence"
      icon={<CheckCircle2 className="h-4 w-4" />}
      title="Evidence"
      subtitle="Proof of work — links, screenshots, benchmarks, deployments."
      right={
        <Badge tone={progress.evidence.length > 0 ? 'green' : 'muted'}>
          {progress.evidence.length} item{progress.evidence.length === 1 ? '' : 's'}
        </Badge>
      }
    >
      {progress.evidence.length > 0 && (
        <div className="space-y-2">
          {progress.evidence.map((ev) => (
            <div key={ev.id} className="flex items-center gap-3 rounded-md border border-border p-3 text-sm">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" />
              <div className="min-w-0 flex-1">
                <div className="font-medium">{ev.title}</div>
                <div className="text-xs text-muted-foreground">
                  {ev.type} · {new Date(ev.date).toLocaleDateString()}
                  {ev.url && (
                    <a href={ev.url} target="_blank" rel="noopener noreferrer" className="ml-2 inline-flex items-center gap-1 text-primary hover:underline">
                      link <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
              <button
                onClick={async () => { await ProjectEvidenceRepository.remove(topicId, ev.id); refresh(); }}
                className="shrink-0 text-muted-foreground hover:text-destructive"
                aria-label="Remove evidence"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 grid gap-3 sm:grid-cols-[160px_1fr_1fr_auto]">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-md border border-border bg-background px-2 py-1.5 text-sm"
        >
          {evidenceTypes.map((t) => (
            <option key={t} value={t}>{t.replace(/_/g, ' ')}</option>
          ))}
        </select>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title (e.g. Retrieval benchmark graph)"
          className="rounded-md border border-border bg-background px-3 py-1.5 text-sm"
        />
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://... (optional)"
          className="rounded-md border border-border bg-background px-3 py-1.5 text-sm"
        />
        <button
          onClick={addEvidence}
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90"
        >
          <Plus className="h-3 w-3" /> Add
        </button>
      </div>
    </Section>
  );
}

function CaseStudySection({
  topicId,
  build,
  progress,
  refresh,
}: {
  topicId: string;
  build: ProjectBuild;
  progress: ProjectProgress;
  refresh: () => Promise<void>;
}) {
  const filled = build.portfolioFields.filter((f) => {
    const value = progress.caseStudy[f.id];
    return typeof value === 'string' && value.trim().length > 0;
  }).length;

  return (
    <Section
      id="case-study"
      icon={<Trophy className="h-4 w-4" />}
      title="Portfolio case study"
      subtitle="The written artifact — what you built, why it matters, what you measured."
      right={
        <Badge tone={filled >= build.portfolioFields.length ? 'green' : 'muted'}>
          {filled}/{build.portfolioFields.length} fields
        </Badge>
      }
    >
      <div className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <div className="text-xs text-muted-foreground">GitHub URL</div>
            <input
              type="url"
              defaultValue={progress.githubUrl}
              onBlur={(e) => {
                ProjectMiscRepository.saveLinks(topicId, e.target.value, progress.demoUrl);
                refresh();
              }}
              placeholder="https://github.com/you/repo"
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm"
            />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Demo / deployed URL</div>
            <input
              type="url"
              defaultValue={progress.demoUrl}
              onBlur={(e) => {
                ProjectMiscRepository.saveLinks(topicId, progress.githubUrl, e.target.value);
                refresh();
              }}
              placeholder="https://yourapp.example.com"
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm"
            />
          </div>
        </div>
        {build.portfolioFields.map((f) => {
          const value = progress.caseStudy[f.id] ?? '';
          return (
            <div key={f.id}>
              <div className="text-xs text-muted-foreground">{f.label}</div>
              <textarea
                defaultValue={value}
                rows={2}
                onBlur={(e) => {
                  ProjectMiscRepository.saveCaseStudyField(topicId, f.id, e.target.value);
                  refresh();
                }}
                placeholder={f.placeholder}
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm"
              />
            </div>
          );
        })}
      </div>
    </Section>
  );
}