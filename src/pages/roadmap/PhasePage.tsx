import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Circle, Clock, FileCode2, FlaskConical, GraduationCap, Layers, Play, Target, Timer } from 'lucide-react';
import { getRoadmapByPhase } from '@/data/roadmap';
import { getCurriculum } from '@/data/curriculum';
import { getSkillById } from '@/data/skills';
import { getVideosForSlug } from '@/data/topicVideos';
import { VideoCard } from '@/components/VideoCard';
import { computeTopicProgress } from '@/lib/progress';
import { defaultTopicProgress } from '@/types';
import type { RoadmapItem } from '@/types';
import { useAllTopicProgress } from '@/hooks/useTopicProgress';

const phases = [1, 2, 3, 4, 5, 6];

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

export default function PhasePage() {
  const { phaseId = '' } = useParams();
  const phase = Number(phaseId);
  const { map } = useAllTopicProgress();

  if (!phases.includes(phase)) {
    return (
      <div className="space-y-6">
        <div className="text-center text-muted-foreground">
          <p className="text-lg font-medium text-foreground">Phase not found</p>
          <Link
            to="/roadmap"
            className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Roadmap
          </Link>
        </div>
      </div>
    );
  }

  function SkillChips({ item }: { item: RoadmapItem }) {
    const ids =
      item.skillIds && item.skillIds.length > 0
        ? item.skillIds
        : item.skillId
          ? [item.skillId]
          : [];
    if (ids.length === 0) {
      return <span className="rounded bg-secondary px-1.5 py-0.5 text-xs text-muted-foreground">{item.phaseName}</span>;
    }
    const primary = getSkillById(ids[0]);
    return (
      <>
        <span className="rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
          {primary?.name ?? ids[0]}
        </span>
        {ids.length > 1 && <span className="text-xs text-muted-foreground">+{ids.length - 1} more</span>}
      </>
    );
  }

  const items = getRoadmapByPhase(phase);
  const phaseName = items[0]?.phaseName ?? `Phase ${phase}`;

  const summaries = items.map((item) => {
    const curriculum = getCurriculum(item.id);
    if (!curriculum) {
      return { item, overall: 0, labs: 0, resources: 0, questions: 0, done: false, curriculum: undefined };
    }
    const summary = computeTopicProgress(curriculum, map[item.id] ?? defaultTopicProgress(item.id));
    return {
      item,
      overall: summary.overall,
      labs: summary.labsTotal,
      resources: summary.resourcesTotal,
      questions: curriculum.interviewQuestions.length,
      done: summary.overall >= 100 || map[item.id]?.status === 'demonstrated' || map[item.id]?.status === 'mastered',
      curriculum,
    };
  });

  const phaseProgress = summaries.length
    ? Math.round(summaries.reduce((s, x) => s + x.overall, 0) / summaries.length)
    : 0;
  const completedTopics = summaries.filter((s) => s.done).length;
  const totalLabs = summaries.reduce((s, x) => s + x.labs, 0);
  const totalResources = summaries.reduce((s, x) => s + x.resources, 0);
  const totalQuestions = summaries.reduce((s, x) => s + x.questions, 0);

  return (
    <div className="space-y-6">
      <Link
        to="/roadmap"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Roadmap
      </Link>

      {/* Header */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs text-primary">
            Phase {phase}
          </span>
          <span className="rounded bg-secondary px-2 py-0.5 font-mono text-xs text-muted-foreground">
            {completedTopics}/{items.length} topics completed
          </span>
        </div>
        <h1 className="mt-3 text-2xl font-bold">{phaseName}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {phase === 1 && 'Foundations every agentic AI engineer needs: Python, web, git, APIs, and containers.'}
          {phase === 2 && 'Connect reliably to LLMs and shape their output into structured, usable data.'}
          {phase === 3 && 'Design autonomous agents: loops, tools, and multi-agent coordination.'}
          {phase === 4 && 'Your specialization: selecting, building, compressing, and remembering context.'}
          {phase === 5 && 'Make AI systems measurable, observable, and safe in production.'}
          {phase === 6 && 'Cutting-edge systems: MCP integrations and agents that use browsers and computers.'}
        </p>

        <div className="mt-5">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Phase completion</span>
            <span className="font-mono">{phaseProgress}%</span>
          </div>
          <ProgressBar value={phaseProgress} />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3 sm:max-w-md">
          <div className="rounded-md border border-border p-3 text-center">
            <Layers className="mx-auto h-4 w-4 text-muted-foreground" />
            <div className="mt-1 font-mono text-lg font-bold">{items.length}</div>
            <div className="text-xs text-muted-foreground">Topics</div>
          </div>
          <div className="rounded-md border border-border p-3 text-center">
            <FlaskConical className="mx-auto h-4 w-4 text-muted-foreground" />
            <div className="mt-1 font-mono text-lg font-bold">{totalLabs}</div>
            <div className="text-xs text-muted-foreground">Labs</div>
          </div>
          <div className="rounded-md border border-border p-3 text-center">
            <Target className="mx-auto h-4 w-4 text-muted-foreground" />
            <div className="mt-1 font-mono text-lg font-bold">{totalQuestions}</div>
            <div className="text-xs text-muted-foreground">Interview Qs</div>
          </div>
        </div>
      </div>

      {/* Topics */}
      <div className="space-y-3">
        {summaries.map(({ item, overall, curriculum }) => {
          const intro = curriculum?.introduction ?? item.description;
          const objectives = curriculum?.objectives.length ?? 0;
          const hours = curriculum?.estimatedHours ?? 0;
          const labs = curriculum?.labs.length ?? 0;
          const resources = curriculum?.resources.length ?? 0;
          const iq = curriculum?.interviewQuestions.length ?? 0;
          const miniProject = curriculum?.miniProject.title;
          const labSkills = [...new Set((curriculum?.labs ?? []).flatMap((l) => l.skillsPracticed))].slice(0, 5);
          return (
            <Link
              key={item.id}
              to={`/roadmap/${item.slug}`}
              className="block rounded-lg border border-border p-4 transition-colors hover:border-primary/50 hover:bg-accent"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  {overall >= 100 ? (
                    <Circle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  ) : (
                    <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  )}
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium">{item.title}</span>
                      <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
                        {item.order}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
                      <SkillChips item={item} />
                      <span className="inline-flex items-center gap-1"><Timer className="h-3 w-3" /> {hours}h</span>
                      <span className="inline-flex items-center gap-1"><GraduationCap className="h-3 w-3" /> {objectives} objectives</span>
                      <span className="inline-flex items-center gap-1"><FlaskConical className="h-3 w-3" /> {labs} labs</span>
                      <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {resources} resources</span>
                      <span className="inline-flex items-center gap-1"><ArrowRight className="h-3 w-3" /> {iq} interview Qs</span>
                      {curriculum && (
                        <span className="rounded bg-secondary px-1.5 py-0.5 text-xs text-muted-foreground">
                          {curriculum.difficulty}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{intro}</p>

                    {labSkills.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {labSkills.map((s) => (
                          <span key={s} className="rounded bg-primary/5 px-1.5 py-0.5 text-xs text-primary/80">{s}</span>
                        ))}
                      </div>
                    )}

                    {miniProject && (
                      <div className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <FileCode2 className="h-3 w-3" /> Mini project: {miniProject}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="font-mono text-xs text-muted-foreground">{overall}%</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <ProgressBar value={overall} />
              </div>
            </Link>
          );
        })}

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {totalResources} curated resources across this phase.
        </div>
      </div>

      {/* Watch & Learn */}
      {(() => {
        const videos = items.flatMap((item) => getVideosForSlug(item.slug));
        if (videos.length === 0) return null;
        return (
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="flex flex-wrap items-center gap-2">
              <Play className="h-4 w-4 text-primary" />
              <h2 className="font-medium">Watch &amp; Learn</h2>
              <span className="rounded bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                {videos.length} video{videos.length === 1 ? '' : 's'}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {summaries.flatMap(({ item }) =>
                getVideosForSlug(item.slug).map((v, i) => <VideoCard key={`${v.youtubeId}-${i}`} {...v} />)
              )}
            </div>
          </div>
        );
      })()}
    </div>
  );
}