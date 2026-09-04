import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Circle,
  Clock,
  Download,
  ExternalLink,
  FileText,
  FlaskConical,
  Info,
  Layers,
  List,
  ListChecks,
  MessageSquare,
  Play,
  Plus,
  Rocket,
  Star,
  Target,
  Trash2,
  Trophy,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getCurriculumBySlug } from '@/data/curriculum';
import { getVideosForSlug } from '@/data/topicVideos';
import { getPlaylistsForSlug } from '@/data/topicPlaylists';
import { VideoCard } from '@/components/VideoCard';
import { PlaylistCard } from '@/components/PlaylistCard';
import { getRoadmapItem } from '@/lib/progress';
import {
  computeTopicProgress,
  getDemonstratedRequirements,
  getMasteredRequirements,
  getNextAction,
} from '@/lib/progress';
import {
  AssessmentRepository,
  EvidenceRepository,
  InterviewRepository,
  LabRepository,
  MiniProjectRepository,
  NotesRepository,
  ProgressRepository,
  ResourceRepository,
} from '@/lib/storage/repositories';
import { InterviewQuestionRepository } from '@/lib/storage/interviewRepositories';
import { useTopicProgress } from '@/hooks/useTopicProgress';
import { generateId } from '@/lib/storage';
import type {
  AssessmentQuestion,
  InterviewProgress,
  LabState,
  ModuleResource,
  TopicCurriculum,
  TopicProgress,
} from '@/types';

function ProgressBar({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full bg-secondary', className)}>
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
  learning: { label: 'Learning', tone: 'primary' },
  practicing: { label: 'Practicing', tone: 'primary' },
  building: { label: 'Building', tone: 'primary' },
  demonstrated: { label: 'Demonstrated', tone: 'green' },
  mastered: { label: 'Mastered', tone: 'green' },
};

export default function TopicPage() {
  const { topicSlug = '' } = useParams();
  const curriculum = getCurriculumBySlug(topicSlug);
  const item = getRoadmapItem(topicSlug);
  const topicId = item?.id ?? '';
  const { progress, refresh } = useTopicProgress(topicId);
  const [toast, setToast] = useState<string | null>(null);
  const [statusError, setStatusError] = useState<string[] | null>(null);
  const [evidenceType, setEvidenceType] = useState('github');
  const [evidenceTitle, setEvidenceTitle] = useState('');
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const toastTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => window.clearTimeout(toastTimer.current);
  }, []);

  if (!item || !curriculum) {
    return (
      <div className="space-y-6">
        <div className="text-center text-muted-foreground">
          <p className="text-lg font-medium text-foreground">Module not found</p>
          <p className="mt-1 text-sm">That roadmap topic doesn&apos;t exist.</p>
          <Link to="/roadmap" className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline">
            <ArrowRight className="h-4 w-4" /> Back to Roadmap
          </Link>
        </div>
      </div>
    );
  }

  const summary = computeTopicProgress(curriculum, progress);
  const nextAction = getNextAction(curriculum, progress);
  const demonstrated = getDemonstratedRequirements(summary);
  const mastered = getMasteredRequirements(summary, demonstrated.met);
  const statusMetaEntry = statusMeta[progress.status] ?? statusMeta.not_started;

  function notify(message: string) {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2200);
  }

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function handleStatusChange(status: TopicProgress['status']) {
    if (progress.status === status) return;
    if (status === 'demonstrated' && !demonstrated.met) {
      setStatusError(demonstrated.missing);
      return;
    }
    if (status === 'mastered' && !mastered.met) {
      setStatusError([...mastered.missing, ...demonstrated.missing]);
      return;
    }
    setStatusError(null);
    if (progress.status === 'not_started') {
      await ProgressRepository.markStudied(topicId);
    }
    await ProgressRepository.setStatus(topicId, status);
    await refresh();
    notify(status === 'demonstrated' || status === 'mastered' ? `${statusMeta[status].label} — congratulations!` : `Status set to ${statusMeta[status].label}`);
  }

  async function handleStartLearning() {
    await ProgressRepository.markStudied(topicId);
    await refresh();
    scrollToSection('objectives');
  }

  async function handleExportNotes() {
    const blob = new Blob([progress.notes], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${topicSlug}-notes.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleUsage(id: string) {
    scrollToSection(id);
  }

  const headerRight =
    progress.status === 'not_started' && summary.overall === 0 ? (
      <button
        onClick={handleStartLearning}
        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
      >
        <Play className="h-4 w-4" /> Start Learning
      </button>
    ) : (
      nextAction && (
        <button
          onClick={() => handleUsage(nextAction.sectionId)}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Continue Learning <ArrowRight className="h-4 w-4" />
        </button>
      )
    );

  const NOT_STARTED = summary.overall === 0 && progress.status === 'not_started';

  return (
    <div className="space-y-6">
      {toast && (
        <div className="rounded-md border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-600">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to={`/roadmap/phase/${item.phase}`}
            className="inline-flex items-center gap-1 rounded bg-primary/10 px-2 py-0.5 font-mono text-xs text-primary hover:underline"
          >
            Phase {item.phase} · {item.phaseName}
          </Link>
          <Badge tone="primary">{curriculum.difficulty}</Badge>
          <Badge>
            <Clock className="h-3 w-3" /> ~{curriculum.estimatedHours} hours
          </Badge>
          <Badge tone={statusMetaEntry.tone}>{statusMetaEntry.label}</Badge>
        </div>

        <h1 className="mt-3 text-2xl font-bold">{item.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>

        <div className="mt-5">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Overall progress</span>
            <span className="font-mono">{summary.overall}%</span>
          </div>
          <ProgressBar value={summary.overall} className="mt-1.5" />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          {headerRight}
          <select
            value={progress.status}
            onChange={(e) => handleStatusChange(e.target.value as TopicProgress['status'])}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          >
            {Object.entries(statusMeta).map(([value, meta]) => (
              <option key={value} value={value}>
                {meta.label}
              </option>
            ))}
          </select>
        </div>

        {statusError && statusError.length > 0 && (
          <div className="mt-3 rounded-md border border-amber-500/30 bg-amber-500/10 px-4 py-3">
            <div className="flex items-center gap-2 text-sm font-medium text-amber-600">
              <Info className="h-4 w-4" /> Status requires the following to be met
            </div>
            <ul className="mt-2 list-inside list-disc space-y-1 text-xs text-amber-700">
              {statusError.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        )}

        {NOT_STARTED && (
          <div className="mt-5 rounded-md border border-dashed border-border p-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">You haven&apos;t started this module yet.</p>
            <ol className="mt-2 list-inside list-decimal space-y-1 text-xs">
              <li>Read the introduction below</li>
              <li>Complete Resource #1</li>
              <li>Start Lab #1</li>
            </ol>
            <button
              onClick={handleStartLearning}
              className="mt-3 inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90"
            >
              <Play className="h-3 w-3" /> Start Learning
            </button>
          </div>
        )}
      </div>

      {/* Progress breakdown */}
      <Section
        id="progress"
        icon={<Trophy className="h-4 w-4" />}
        title="Topic progress"
        subtitle="Calculated from actual activity — not button clicks."
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {[
            { label: 'Resources', value: summary.resources, detail: `${summary.resourcesRead}/${summary.resourcesTotal}` },
            { label: 'Objectives', value: summary.objectives, detail: `${summary.objectivesCompleted}/${summary.objectivesTotal}` },
            { label: 'Labs', value: summary.labs, detail: `${summary.labsCompleted}/${summary.labsTotal}` },
            { label: 'Mini-project', value: summary.miniProject, detail: summary.miniProjectDone ? '✓' : '—' },
            { label: 'Assessment', value: summary.assessment, detail: summary.assessmentScore > 0 ? `${summary.assessmentScore}%` : '—' },
            { label: 'Interview', value: summary.interview, detail: `${summary.interviewConfident}/${summary.interviewTotal}` },
            { label: 'Evidence', value: summary.evidence, detail: summary.evidenceCount > 0 ? `${summary.evidenceCount}` : '—' },
          ].map((c) => (
            <div key={c.label} className="rounded-md border border-border p-3">
              <div className="text-xs text-muted-foreground">{c.label}</div>
              <div className="mt-1 font-mono text-lg font-bold">{c.value}%</div>
              <div className="text-xs text-muted-foreground">{c.detail}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Introduction */}
      <Section
        id="introduction"
        icon={<BookOpen className="h-4 w-4" />}
        title="Introduction"
        subtitle="Why this module matters."
      >
        <p className="text-sm leading-relaxed text-muted-foreground">{curriculum.introduction}</p>
      </Section>

      <VideosSection topicSlug={topicSlug} />
      <PlaylistsSection topicSlug={topicSlug} />

      <ObjectivesSection topicId={topicId} curriculum={curriculum} progress={progress} refresh={refresh} />
      <ResourcesSection
        topicId={topicId}
        curriculum={curriculum}
        progress={progress}
        refresh={refresh}
        notify={notify}
      />
      <LabsSection
        topicId={topicId}
        curriculum={curriculum}
        progress={progress}
        refresh={refresh}
        notify={notify}
      />
      <MiniProjectSection
        topicId={topicId}
        curriculum={curriculum}
        progress={progress}
        refresh={refresh}
        notify={notify}
      />
      <RepositoriesSection
        topicId={topicId}
        curriculum={curriculum}
        progress={progress}
        refresh={refresh}
        notify={notify}
      />
      <AssessmentSection
        topicId={topicId}
        curriculum={curriculum}
        progress={progress}
        refresh={refresh}
      />
      <InterviewSection
        topicId={topicId}
        curriculum={curriculum}
        progress={progress}
        refresh={refresh}
      />
      <LabQuestionSection topicSlug={topicSlug} />
      <EvidenceSection
        topicId={topicId}
        progress={progress}
        refresh={refresh}
        notify={notify}
        type={evidenceType}
        setType={setEvidenceType}
        title={evidenceTitle}
        setTitle={setEvidenceTitle}
        url={evidenceUrl}
        setUrl={setEvidenceUrl}
      />
      <NotesSection topicId={topicId} progress={progress} refresh={refresh} onExport={handleExportNotes} />

      {nextAction && progress.status !== 'not_started' && (
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs font-medium text-muted-foreground">Continue where you left off</div>
              <div className="mt-1 text-sm font-medium">{nextAction.label}</div>
              <div className="text-xs text-muted-foreground">{nextAction.meta}</div>
            </div>
            <button
              onClick={() => handleUsage(nextAction.sectionId)}
              className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function VideosSection({ topicSlug }: { topicSlug: string }) {
  const videos = getVideosForSlug(topicSlug);
  if (videos.length === 0) return null;
  return (
    <Section
      id="videos"
      icon={<Play className="h-4 w-4" />}
      title="Watch &amp; Learn"
      subtitle="Recommended videos to accelerate this module."
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v, i) => (
          <VideoCard key={`${v.youtubeId}-${i}`} {...v} />
        ))}
      </div>
    </Section>
  );
}

function PlaylistsSection({ topicSlug }: { topicSlug: string }) {
  const playlists = getPlaylistsForSlug(topicSlug);
  if (playlists.length === 0) return null;
  return (
    <Section
      id="playlists"
      icon={<List className="h-4 w-4" />}
      title="Playlists"
      subtitle="Curated YouTube playlists for this module."
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {playlists.map((p, i) => (
          <PlaylistCard key={`${p.playlistId}-${i}`} {...p} />
        ))}
      </div>
    </Section>
  );
}

function ObjectivesSection({
  topicId,
  curriculum,
  progress,
  refresh,
}: {
  topicId: string;
  curriculum: TopicCurriculum;
  progress: ReturnType<typeof useTopicProgress>['progress'];
  refresh: () => Promise<void>;
}) {
  return (
    <Section
      id="objectives"
      icon={<Target className="h-4 w-4" />}
      title="Learning objectives"
      subtitle="By completing this module you should be able to:"
    >
      <div className="space-y-1.5">
        {curriculum.objectives.map((o) => {
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
                  await ProgressRepository.markObjective(topicId, o.id, e.target.checked);
                  await ProgressRepository.markStudied(topicId);
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

function ResourcesSection({
  topicId,
  curriculum,
  progress,
  refresh,
  notify,
}: {
  topicId: string;
  curriculum: TopicCurriculum;
  progress: ReturnType<typeof useTopicProgress>['progress'];
  refresh: () => Promise<void>;
  notify: (m: string) => void;
}) {
  const kindLabel: Record<string, string> = {
    documentation: 'Official documentation',
    repository: 'GitHub repository',
    tutorial: 'Tutorial',
    article: 'Technical article',
    paper: 'Research paper',
    video: 'Video/course',
    example: 'Example implementation',
    blog: 'Blog post',
  };

  async function toggleRead(resource: ModuleResource) {
    if (progress.resourcesRead[resource.id]) {
      await ResourceRepository.unsetRead(topicId, resource.id);
    } else {
      await ResourceRepository.setRead(topicId, resource.id, {
        dateRead: new Date().toISOString(),
        notes: '',
        rating: 0,
        keyTakeaway: '',
      });
      notify('✓ Marked as read');
    }
    await ProgressRepository.markStudied(topicId);
    refresh();
  }

  async function patchResource(resource: ModuleResource, patch: Partial<NonNullable<(typeof progress.resourcesRead)[string]>>) {
    const existing = progress.resourcesRead[resource.id];
    await ResourceRepository.setRead(topicId, resource.id, { ...existing, ...patch });
    refresh();
  }

  if (curriculum.resources.length === 0) {
    return (
      <Section id="resources" icon={<BookOpen className="h-4 w-4" />} title="Resources">
        <p className="text-sm text-muted-foreground">No curated resources for this module yet.</p>
      </Section>
    );
  }

  return (
    <Section
      id="resources"
      icon={<BookOpen className="h-4 w-4" />}
      title="Learning materials"
      subtitle={`${progress.resourcesRead ? Object.keys(progress.resourcesRead).length : 0}/${curriculum.resources.length} read`}
    >
      <div className="space-y-3">
        {curriculum.resources.map((r) => {
          const readState = progress.resourcesRead[r.id];
          return (
            <div
              key={r.id}
              className={cn(
                'rounded-md border border-border p-4',
                readState && 'border-green-500/40 bg-green-500/5'
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium">{r.title}</span>
                    <Badge tone="muted">{r.kind in kindLabel ? kindLabel[r.kind] : r.kind}</Badge>
                    <Badge tone={r.priority === 'high' ? 'primary' : r.priority === 'medium' ? 'default' : 'muted'}>
                      {r.priority} priority
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{r.description}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span>Source: {r.source}</span>
                    <span>{r.difficulty}</span>
                    <span>~{r.estimatedMinutes} min</span>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-accent"
                  >
                    Open Resource <ExternalLink className="h-3 w-3" />
                  </a>
                  {readState ? (
                    <button
                      onClick={() => toggleRead(r)}
                      className="inline-flex items-center gap-1 rounded-md bg-green-500/15 px-3 py-1.5 text-xs font-medium text-green-600 hover:bg-green-500/25"
                    >
                      <Check className="h-3 w-3" /> Read
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleRead(r)}
                      className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-accent"
                    >
                      <Circle className="h-3 w-3" /> Mark as Read
                    </button>
                  )}
                </div>
              </div>

              {readState && (
                <div className="mt-3 grid gap-3 border-t border-border pt-3 sm:grid-cols-2">
                  <div>
                    <div className="text-xs text-muted-foreground">Key takeaway</div>
                    <input
                      type="text"
                      defaultValue={readState.keyTakeaway}
                      onBlur={(e) => patchResource(r, { keyTakeaway: e.target.value })}
                      placeholder="What did you learn?"
                      className="mt-1 w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm"
                    />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                    <div className="mt-1.5 flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          onClick={() => patchResource(r, { rating: n })}
                          className={cn(
                            'p-0.5',
                            (readState.rating ?? 0) >= n ? 'text-amber-500' : 'text-muted-foreground/30'
                          )}
                          aria-label={`Rate ${n} of 5`}
                        >
                          <Star className="h-4 w-4 fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="text-xs text-muted-foreground">Optional notes</div>
                    <textarea
                      defaultValue={readState.notes}
                      onBlur={(e) => patchResource(r, { notes: e.target.value })}
                      rows={2}
                      placeholder="Personal notes about this resource"
                      className="mt-1 w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm"
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Read on {new Date(readState.dateRead).toLocaleDateString()}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function LabsSection({
  topicId,
  curriculum,
  progress,
  refresh,
  notify,
}: {
  topicId: string;
  curriculum: TopicCurriculum;
  progress: ReturnType<typeof useTopicProgress>['progress'];
  refresh: () => Promise<void>;
  notify: (m: string) => void;
}) {
  async function saveLab(labId: string, state: LabState) {
    await LabRepository.save(topicId, labId, state);
    await ProgressRepository.markStudied(topicId);
    refresh();
  }

  async function setLabStatus(labId: string, status: LabState['status']) {
    const prev = progress.labs[labId]?.status;
    await LabRepository.setStatus(topicId, labId, status);
    if (status === 'completed' && prev !== 'completed') {
      notify('✓ Lab completed — nice work');
    }
    await ProgressRepository.markStudied(topicId);
    refresh();
  }

  return (
    <Section
      id="labs"
      icon={<FlaskConical className="h-4 w-4" />}
      title="Practical labs"
      subtitle={`Hands-on work — ${summaryOfLabs(progress, curriculum)}`}
    >
      <div className="space-y-4">
        {curriculum.labs.map((lab, index) => {
          const state = progress.labs[lab.id] ?? {
            status: 'not_started' as const,
            githubUrl: '',
            notes: '',
            timeSpentMinutes: 0,
            evidence: '',
          };
          const statusTone =
            state.status === 'completed' ? 'green' : state.status === 'in_progress' ? 'primary' : 'muted';
          return (
            <div key={lab.id} id={`lab-${lab.id}`} className="scroll-mt-20 rounded-md border border-border p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge tone="muted">Lab {index + 1}</Badge>
                  <span className="font-medium">{lab.title}</span>
                  <Badge tone={statusTone}>{state.status.replace(/_/g, ' ')}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone={lab.difficulty === 'advanced' ? 'amber' : lab.difficulty === 'intermediate' ? 'primary' : 'muted'}>
                    {lab.difficulty}
                  </Badge>
                  <Badge>
                    <Clock className="h-3 w-3" /> ~{lab.estimatedMinutes} min
                  </Badge>
                </div>
              </div>

              <p className="mt-3 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Problem: </span>
                {lab.problem}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Why it matters: </span>
                {lab.whyItMatters}
              </p>

              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <div className="rounded-md bg-secondary/50 p-3">
                  <div className="text-xs font-medium text-muted-foreground">Requirements</div>
                  <ul className="mt-1.5 list-inside list-disc space-y-1 text-xs">
                    {lab.requirements.map((r) => (
                      <li key={r.id}>{r.text}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-md bg-secondary/50 p-3">
                  <div className="text-xs font-medium text-muted-foreground">Acceptance criteria</div>
                  <ul className="mt-1.5 list-inside list-disc space-y-1 text-xs">
                    {lab.acceptanceCriteria.map((r) => (
                      <li key={r.id}>{r.text}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {lab.hints && (
                <p className="mt-3 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Hints: </span>
                  {lab.hints}
                </p>
              )}
              {lab.expectedOutput && (
                <p className="mt-1 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Expected output: </span>
                  {lab.expectedOutput}
                </p>
              )}

              <div className="mt-3 flex flex-wrap gap-1">
                {lab.skillsPracticed.map((s) => (
                  <span key={s} className="rounded bg-secondary px-1.5 py-0.5 text-xs text-muted-foreground">
                    {s}
                  </span>
                ))}
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
                    onBlur={(e) =>
                      saveLab(lab.id, { ...state, timeSpentMinutes: Number(e.target.value) || 0 })
                    }
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
                  placeholder="What did you build? What did you learn?"
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

function summaryOfLabs(
  progress: ReturnType<typeof useTopicProgress>['progress'],
  curriculum: TopicCurriculum
) {
  const done = curriculum.labs.filter((l) => progress.labs[l.id]?.status === 'completed').length;
  return `${done}/${curriculum.labs.length} completed`;
}

function MiniProjectSection({
  topicId,
  curriculum,
  progress,
  refresh,
  notify,
}: {
  topicId: string;
  curriculum: TopicCurriculum;
  progress: ReturnType<typeof useTopicProgress>['progress'];
  refresh: () => Promise<void>;
  notify: (m: string) => void;
}) {
  const mp = curriculum.miniProject;
  const state = progress.miniProject;

  async function update(patch: Partial<typeof state>) {
    const next = { ...state, ...patch };
    if (patch.completed && !state.completed) notify('✓ Mini-project completed — great work');
    await MiniProjectRepository.save(topicId, next);
    await ProgressRepository.markStudied(topicId);
    refresh();
  }

  return (
    <Section
      id="mini-project"
      icon={<Rocket className="h-4 w-4" />}
      title="Mini-project"
      subtitle={`~${mp.estimatedHours} hours · the capstone of this module`}
      right={
        <Badge tone={state.completed ? 'green' : 'muted'}>
          {state.completed ? '✓ Completed' : 'Not completed'}
        </Badge>
      }
    >
      <div className="space-y-3">
        <div>
          <span className="font-medium">{mp.title}</span>
          <p className="mt-1 text-sm text-muted-foreground">{mp.problem}</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-md bg-secondary/50 p-3">
            <div className="text-xs font-medium text-muted-foreground">Requirements</div>
            <ul className="mt-1.5 list-inside list-disc space-y-1 text-xs">
              {mp.requirements.map((r) => (
                <li key={r.id}>{r.text}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-md bg-secondary/50 p-3">
            <div className="text-xs font-medium text-muted-foreground">Acceptance criteria</div>
            <ul className="mt-1.5 list-inside list-disc space-y-1 text-xs">
              {mp.acceptanceCriteria.map((r) => (
                <li key={r.id}>{r.text}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap gap-1">
          {mp.skillsPracticed.map((s) => (
            <span key={s} className="rounded bg-secondary px-1.5 py-0.5 text-xs text-muted-foreground">
              {s}
            </span>
          ))}
        </div>

        <label className="flex cursor-pointer items-center gap-3 rounded-md border border-border p-3 text-sm">
          <input
            type="checkbox"
            checked={state.completed}
            onChange={(e) => update({ completed: e.target.checked })}
          />
          Mark mini-project as completed
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <div className="text-xs text-muted-foreground">GitHub URL</div>
            <input
              type="url"
              defaultValue={state.githubUrl}
              onBlur={(e) => update({ githubUrl: e.target.value })}
              placeholder="https://github.com/you/mini-project"
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm"
            />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Notes</div>
            <textarea
              defaultValue={state.notes}
              onBlur={(e) => update({ notes: e.target.value })}
              rows={2}
              placeholder="Architecture, results, lessons learned"
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

function RepositoriesSection({
  topicId,
  curriculum,
  progress,
  refresh,
  notify,
}: {
  topicId: string;
  curriculum: TopicCurriculum;
  progress: ReturnType<typeof useTopicProgress>['progress'];
  refresh: () => Promise<void>;
  notify: (m: string) => void;
}) {
  if (curriculum.repositories.length === 0) {
    return (
      <Section id="repositories" icon={<Layers className="h-4 w-4" />} title="Repositories to study">
        <p className="text-sm text-muted-foreground">No repository study paths for this module.</p>
      </Section>
    );
  }

  async function toggleStep(repoId: string, stepId: string, done: boolean) {
    await ProgressRepository.markRepoStep(topicId, repoId, stepId, done);
    refresh();
  }

  async function markStudied(repoId: string, repo: TopicCurriculum['repositories'][number]) {
    await ProgressRepository.markRepoStudied(topicId, repoId, repo.guidedSteps.map((s) => s.id));
    notify('✓ Repository marked as studied');
    refresh();
  }

  return (
    <Section
      id="repositories"
      icon={<Layers className="h-4 w-4" />}
      title="Repositories to study"
      subtitle="Guided reading paths for the most important code."
    >
      <div className="space-y-4">
        {curriculum.repositories.map((repo) => {
          const doneSteps = progress.repositorySteps[repo.id] ?? [];
          const allDone = doneSteps.length >= repo.guidedSteps.length;
          return (
            <div key={repo.id} id={`repo-${repo.id}`} className="scroll-mt-20 rounded-md border border-border p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium hover:text-primary"
                  >
                    {repo.name} <ExternalLink className="h-3 w-3" />
                  </a>
                  <p className="text-xs text-muted-foreground">Why study: {repo.whyStudy}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone={allDone ? 'green' : 'muted'}>
                    {doneSteps.length}/{repo.guidedSteps.length} steps
                  </Badge>
                  {!allDone && (
                    <button
                      onClick={() => markStudied(repo.id, repo)}
                      className="rounded-md border border-border px-3 py-1.5 text-xs hover:bg-accent"
                    >
                      Mark Repository Studied
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="rounded-md bg-secondary/50 p-3 text-xs text-muted-foreground">
                  <div className="font-medium text-foreground">What to look for</div>
                  <p className="mt-1">{repo.whatToLookFor}</p>
                  <div className="mt-2 font-medium text-foreground">Important files</div>
                  <ul className="mt-1 list-inside list-disc space-y-0.5 font-mono">
                    {repo.importantFiles.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <div className="mt-2 font-medium text-foreground">Concepts</div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {repo.concepts.map((c) => (
                      <span key={c} className="rounded bg-background px-1.5 py-0.5">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <ol className="space-y-1.5">
                  {repo.guidedSteps.map((step, i) => {
                    const done = doneSteps.includes(step.id);
                    return (
                      <li key={step.id}>
                        <label
                          className={cn(
                            'flex cursor-pointer items-start gap-2 rounded-md border border-border p-2 text-xs',
                            done && 'border-green-500/40 bg-green-500/5'
                          )}
                        >
                          <input
                            type="checkbox"
                            checked={done}
                            onChange={(e) => toggleStep(repo.id, step.id, e.target.checked)}
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

function AssessmentSection({
  topicId,
  curriculum,
  progress,
  refresh,
}: {
  topicId: string;
  curriculum: TopicCurriculum;
  progress: ReturnType<typeof useTopicProgress>['progress'];
  refresh: () => Promise<void>;
}) {
  async function saveQuestion(q: AssessmentQuestion, answer: { selectedOption?: number; text?: string }) {
    await AssessmentRepository.save(topicId, q.id, { text: '', ...answer });
    refresh();
  }

  const answeredCount = curriculum.assessment.filter((q) => {
    const a = progress.assessment[q.id];
    if (q.type === 'mcq') return a?.selectedOption !== undefined;
    return (a?.text.trim() ?? '') !== '';
  }).length;

  return (
    <Section
      id="assessment"
      icon={<ListChecks className="h-4 w-4" />}
      title="Assessment"
      subtitle="Small, self-contained checks — no external API required."
      right={
        <Badge tone={answeredCount >= curriculum.assessment.length ? 'green' : 'muted'}>
          {answeredCount}/{curriculum.assessment.length} answered
        </Badge>
      }
    >
      <div className="space-y-4">
        {curriculum.assessment.map((q) => {
          const answer = progress.assessment[q.id];
          if (q.type === 'mcq') {
            const selected = answer?.selectedOption;
            const isCorrect = selected !== undefined && selected === q.correctOption;
            return (
              <div key={q.id} className="rounded-md border border-border p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="primary">MCQ</Badge>
                  <span className="text-sm font-medium">{q.question}</span>
                </div>
                <div className="mt-3 grid gap-1.5 sm:grid-cols-2">
                  {q.options?.map((opt, i) => {
                    const isSelected = selected === i;
                    const isRight = isSelected && i === q.correctOption;
                    return (
                      <button
                        key={i}
                        onClick={async () => !isSelected && saveQuestion(q, { selectedOption: i })}
                        className={cn(
                          'flex items-center gap-2 rounded-md border border-border px-3 py-2 text-left text-sm transition-colors',
                          isSelected && 'border-primary',
                          isRight && 'border-green-500/50 bg-green-500/5',
                          selected !== undefined && i === q.correctOption && 'border-green-500/50',
                          selected === undefined && 'hover:bg-accent'
                        )}
                      >
                        <span className="font-mono text-xs text-muted-foreground">
                          {String.fromCharCode(65 + i)}
                        </span>
                        {opt}
                        {isRight && <Check className="ml-auto h-4 w-4 text-green-500" />}
                        {isSelected && !isRight && <Circle className="ml-auto h-4 w-4 text-destructive" />}
                      </button>
                    );
                  })}
                </div>
                {selected !== undefined && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    {isCorrect ? (
                      <span className="text-green-600">✓ Correct.</span>
                    ) : (
                      <span className="text-destructive">✗ Not quite.</span>
                    )}{' '}
                    {q.idealAnswer}
                  </p>
                )}
              </div>
            );
          }

          return (
            <div key={q.id} className="rounded-md border border-border p-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="default">{q.type.replace('_', ' ')}</Badge>
                <span className="text-sm font-medium">{q.question}</span>
              </div>
              <textarea
                id={`assessment-text-${q.id}`}
                defaultValue={answer?.text ?? ''}
                rows={3}
                placeholder="Write your answer..."
                className="mt-3 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              />
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    const el = document.getElementById(`assessment-text-${q.id}`) as HTMLTextAreaElement | null;
                    saveQuestion(q, { text: el?.value ?? '' });
                  }}
                  className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90"
                >
                  Submit
                </button>
                {answer?.text && (
                  <span className="inline-flex items-center gap-1 text-xs text-green-600">
                    <Check className="h-3 w-3" /> Saved
                  </span>
                )}
              </div>
              {q.idealAnswer && (
                <p className="mt-2 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Model answer: </span>
                  {q.idealAnswer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function InterviewSection({
  topicId,
  curriculum,
  progress,
  refresh,
}: {
  topicId: string;
  curriculum: TopicCurriculum;
  progress: ReturnType<typeof useTopicProgress>['progress'];
  refresh: () => Promise<void>;
}) {
  if (curriculum.interviewQuestions.length === 0) {
    return (
      <Section id="interview" icon={<MessageSquare className="h-4 w-4" />} title="Interview questions">
        <p className="text-sm text-muted-foreground">No interview questions for this module yet.</p>
      </Section>
    );
  }

  async function save(qid: string, state: InterviewProgress) {
    await InterviewRepository.save(topicId, qid, state);
    await ProgressRepository.markStudied(topicId);
    refresh();
  }

  const confidentCount = curriculum.interviewQuestions.filter((q) => {
    const st = progress.interview[q.id];
    return st && (st.status === 'confident' || st.status === 'mastered');
  }).length;

  return (
    <Section
      id="interview"
      icon={<MessageSquare className="h-4 w-4" />}
      title="Interview questions"
      subtitle="Track how confidently you can answer these."
      right={
        <Badge tone={confidentCount >= curriculum.interviewQuestions.length ? 'green' : 'muted'}>
          {confidentCount}/{curriculum.interviewQuestions.length} confident
        </Badge>
      }
    >
      <div className="space-y-4">
        {curriculum.interviewQuestions.map((q, i) => {
          const st = progress.interview[q.id] ?? { status: 'not_attempted', confidence: 0, myAnswer: '' };
          const tone = st.status === 'mastered' ? 'green' : st.status === 'confident' ? 'primary' : st.status === 'attempted' ? 'amber' : 'muted';
          return (
            <div key={q.id} className="rounded-md border border-border p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-2">
                  <Badge tone="muted">Q{i + 1}</Badge>
                  <span className="text-sm font-medium">{q.question}</span>
                </div>
                <select
                  value={st.status}
                  onChange={(e) => save(q.id, { ...st, status: e.target.value as InterviewProgress['status'] })}
                  className={cn(
                    'rounded-md border border-border bg-background px-2 py-1 text-xs',
                    tone === 'green' && 'text-green-600'
                  )}
                >
                  <option value="not_attempted">Not attempted</option>
                  <option value="attempted">Attempted</option>
                  <option value="confident">Confident</option>
                  <option value="mastered">Mastered</option>
                </select>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Confidence: {st.confidence}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={st.confidence}
                  onChange={(e) => save(q.id, { ...st, confidence: Number(e.target.value) })}
                  className="w-full"
                />
              </div>

              <textarea
                defaultValue={st.myAnswer}
                rows={2}
                placeholder="Your answer for practice..."
                onBlur={(e) => save(q.id, { ...st, myAnswer: e.target.value })}
                className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Ideal: </span>
                {q.idealAnswer}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function EvidenceSection({
  topicId,
  progress,
  refresh,
  notify,
  type,
  setType,
  title,
  setTitle,
  url,
  setUrl,
}: {
  topicId: string;
  progress: ReturnType<typeof useTopicProgress>['progress'];
  refresh: () => Promise<void>;
  notify: (m: string) => void;
  type: string;
  setType: (v: string) => void;
  title: string;
  setTitle: (v: string) => void;
  url: string;
  setUrl: (v: string) => void;
}) {
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
    await EvidenceRepository.add(topicId, {
      id: generateId(),
      type,
      title: title.trim(),
      url: url.trim(),
      date: new Date().toISOString(),
    });
    await ProgressRepository.markStudied(topicId);
    setTitle('');
    setUrl('');
    notify('✓ Evidence added');
    refresh();
  }

  async function removeEvidence(id: string) {
    await EvidenceRepository.remove(topicId, id);
    refresh();
  }

  return (
    <Section
      id="evidence"
      icon={<CheckCircle2 className="h-4 w-4" />}
      title="Evidence"
      subtitle="Proof of work that feeds your skill dashboard."
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
                </div>
                {ev.url && (
                  <a
                    href={ev.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    {ev.url} <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
              <button
                onClick={() => removeEvidence(ev.id)}
                className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                aria-label="Remove evidence"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 grid gap-3 rounded-md border border-dashed border-border p-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="text-xs text-muted-foreground">Type</div>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm"
          >
            {evidenceTypes.map((t) => (
              <option key={t} value={t}>
                {t.replace(/_/g, ' ')}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Title</div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Async API collector"
            className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm"
          />
        </div>
        <div className="lg:col-span-1">
          <div className="text-xs text-muted-foreground">URL</div>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://github.com/you/repo"
            className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm"
          />
        </div>
        <button
          onClick={addEvidence}
          className="inline-flex items-center justify-center gap-1 self-end rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          <Plus className="h-4 w-4" /> Add Evidence
        </button>
      </div>
    </Section>
  );
}

function NotesSection({
  topicId,
  progress,
  refresh,
  onExport,
}: {
  topicId: string;
  progress: ReturnType<typeof useTopicProgress>['progress'];
  refresh: () => Promise<void>;
  onExport: () => void;
}) {
  return (
    <Section
      id="notes"
      icon={<FileText className="h-4 w-4" />}
      title="My notes"
      subtitle="Markdown notes, autosaved locally."
      right={
        <button
          onClick={onExport}
          className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-accent"
        >
          <Download className="h-3 w-3" /> Export .md
        </button>
      }
    >
      <textarea
        defaultValue={progress.notes}
        onBlur={async (e) => {
          await NotesRepository.save(topicId, e.target.value);
          refresh();
        }}
        rows={8}
        placeholder={'What I learned:\n\nImportant concepts:\n\nQuestions:\n\nThings to investigate:'}
        className="w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-sm leading-relaxed"
      />
      <p className="mt-2 text-xs text-muted-foreground">
        Autosaves when you leave the field. Exported as Markdown.
      </p>
    </Section>
  );
}

function LabQuestionSection({ topicSlug }: { topicSlug: string }) {
  const [qs, setQs] = useState<Awaited<ReturnType<typeof InterviewQuestionRepository.getAll>>>([]);
  useEffect(() => {
    void (async () => {
      const all = await InterviewQuestionRepository.getAll();
      setQs(all.filter((q) => q.roadmapSlugs.includes(topicSlug)));
    })();
  }, [topicSlug]);

  return (
    <Section
      id="interview-lab"
      icon={<MessageSquare className="h-4 w-4" />}
      title="Interview Lab questions for this topic"
      subtitle="Real practice questions from your Interview Lab that map to this roadmap module."
      right={
        <Link to="/interview" className="text-xs text-primary hover:underline">
          Open Interview Lab →
        </Link>
      }
    >
      {qs.length === 0 ? (
        <p className="text-sm text-muted-foreground">No Interview Lab questions tagged with this roadmap topic yet.</p>
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