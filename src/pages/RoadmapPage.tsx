import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Circle, Clock, FileCode2, FlaskConical, GraduationCap, Play, Search, Timer, X } from 'lucide-react';
import { getRoadmapByPhase } from '@/data/roadmap';
import { getCurriculum } from '@/data/curriculum';
import { getSkillById } from '@/data/skills';
import { getVideosForSlug } from '@/data/topicVideos';
import { VideoCard } from '@/components/VideoCard';
import { computeTopicProgress } from '@/lib/progress';
import { useAllTopicProgress } from '@/hooks/useTopicProgress';
import { defaultTopicProgress } from '@/types';
import type { ModuleDifficulty } from '@/types';
import { cn } from '@/lib/utils';

const phases = [1, 2, 3, 4, 5, 6];

const difficulties: { value: 'all' | ModuleDifficulty; label: string }[] = [
  { value: 'all', label: 'All levels' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

function MiniBar({ value }: { value: number }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
      <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, value)}%` }} />
    </div>
  );
}

function Stat({ icon, value, label, detail }: { icon: ReactNode; value: number; label: string; detail: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="text-muted-foreground">{icon}</div>
      <div className="mt-1.5 font-mono text-lg font-bold">{value}</div>
      <div className="text-xs font-medium">{label}</div>
      <div className="text-xs text-muted-foreground">{detail}</div>
    </div>
  );
}

export default function RoadmapPage() {
  const { map, loaded } = useAllTopicProgress();
  const [query, setQuery] = useState('');
  const [difficulty, setDifficulty] = useState<'all' | ModuleDifficulty>('all');
  const [openVideos, setOpenVideos] = useState<number[]>([]);

  function togglePhaseVideos(phase: number) {
    setOpenVideos((prev) => (prev.includes(phase) ? prev.filter((p) => p !== phase) : [...prev, phase]));
  }

  const phaseData = useMemo(
    () =>
      phases.map((phase) => {
        const items = getRoadmapByPhase(phase);
        const data = items.map((item) => {
          const curriculum = getCurriculum(item.id);
          const summary = curriculum
            ? computeTopicProgress(curriculum, map[item.id] ?? defaultTopicProgress(item.id))
            : null;
          return { item, summary, curriculum, phase };
        });
        const overall = data.length
          ? Math.round(data.reduce((s, d) => s + (d.summary?.overall ?? 0), 0) / data.length)
          : 0;
        const completed = data.filter(
          (d) => (d.summary?.overall ?? 0) >= 100 || map[d.item.id]?.status === 'demonstrated' || map[d.item.id]?.status === 'mastered'
        ).length;
        return { phase, items: data, overall, completed };
      }),
    [map]
  );

  const allTopics = useMemo(() => phaseData.flatMap((p) => p.items), [phaseData]);

  const totals = useMemo(() => {
    const hours = allTopics.reduce((s, t) => s + (t.curriculum?.estimatedHours ?? 0), 0);
    const labs = allTopics.reduce((s, t) => s + (t.curriculum?.labs.length ?? 0), 0);
    const resources = allTopics.reduce((s, t) => s + (t.curriculum?.resources.length ?? 0), 0);
    const iq = allTopics.reduce((s, t) => s + (t.curriculum?.interviewQuestions.length ?? 0), 0);
    const assessment = allTopics.reduce((s, t) => s + (t.curriculum?.assessment.length ?? 0), 0);
    const completed = allTopics.filter(
      (t) => (t.summary?.overall ?? 0) >= 100 || map[t.item.id]?.status === 'demonstrated' || map[t.item.id]?.status === 'mastered'
    ).length;
    const overall = allTopics.length
      ? Math.round(allTopics.reduce((s, t) => s + (t.summary?.overall ?? 0), 0) / allTopics.length)
      : 0;
    return { hours, labs, resources, iq, assessment, completed, overall };
  }, [allTopics, map]);

  const isFiltering = query.trim() !== '' || difficulty !== 'all';
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allTopics.filter((t) => {
      if (difficulty !== 'all' && t.curriculum?.difficulty !== difficulty) return false;
      if (!q) return true;
      const hay = [t.item.title, t.item.description, t.item.skillId, t.curriculum?.introduction ?? ''].join(' ').toLowerCase();
      return hay.includes(q);
    });
  }, [allTopics, query, difficulty]);

  function SkillChips({ item }: { item: (typeof allTopics)[number]['item'] }) {
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

  function TopicCard({ item, summary, curriculum }: { item: (typeof allTopics)[number]['item']; summary: (typeof allTopics)[number]['summary']; curriculum: (typeof allTopics)[number]['curriculum'] }) {
    const progress = summary?.overall ?? 0;
    const statusTone = progress >= 100 ? 'text-green-600' : progress > 0 ? 'text-blue-500' : 'text-muted-foreground';
    const labs = curriculum?.labs.length ?? 0;
    const resources = curriculum?.resources.length ?? 0;
    const iq = curriculum?.interviewQuestions.length ?? 0;
    const objectives = curriculum?.objectives.length ?? 0;
    const hours = curriculum?.estimatedHours ?? 0;
    const intro = curriculum?.introduction ?? item.description;
    const miniProject = curriculum?.miniProject.title;
    const labSkills = [...new Set((curriculum?.labs ?? []).flatMap((l) => l.skillsPracticed))].slice(0, 5);
    return (
      <Link
        to={`/roadmap/${item.slug}`}
        className="group block rounded-lg border border-border p-4 transition-colors hover:border-primary/50 hover:bg-accent/40"
      >
        <div className="flex flex-wrap items-start gap-3">
          <Circle className={cn('mt-1 h-4 w-4 shrink-0', statusTone)} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium group-hover:text-primary">{item.title}</span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
              <SkillChips item={item} />
              <span className="inline-flex items-center gap-1"><Timer className="h-3 w-3" /> {hours}h</span>
              <span className="inline-flex items-center gap-1"><GraduationCap className="h-3 w-3" /> {objectives} objectives</span>
              <span className="inline-flex items-center gap-1"><FlaskConical className="h-3 w-3" /> {labs} labs</span>
              <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {resources} resources</span>
              <span className="inline-flex items-center gap-1"><ArrowUpRight className="h-3 w-3" /> {iq} interview Qs</span>
              {curriculum && <span className="rounded bg-secondary px-1.5 py-0.5">{curriculum.difficulty}</span>}
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

          <div className="flex shrink-0 flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground">{progress}%</span>
              <span className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                {progress > 0 ? <Play className="h-3 w-3" /> : 'Open Module'}
                <ArrowUpRight className="h-3 w-3" />
              </span>
            </div>
          </div>
        </div>
        <MiniBar value={progress} />
      </Link>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Learning Roadmap</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Six-phase journey from engineering foundations to advanced agent systems. Every topic is a working module.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <Stat icon={<Timer className="h-4 w-4" />} value={totals.hours} label="Hours" detail="estimated study time" />
        <Stat icon={<GraduationCap className="h-4 w-4" />} value={allTopics.length} label="Topics" detail={`${totals.completed} completed`} />
        <Stat icon={<FlaskConical className="h-4 w-4" />} value={totals.labs} label="Labs" detail="hands-on builds" />
        <Stat icon={<Clock className="h-4 w-4" />} value={totals.resources} label="Resources" detail="curated links" />
        <Stat icon={<ArrowUpRight className="h-4 w-4" />} value={totals.iq} label="Interview Qs" detail={`${totals.assessment} assessments`} />
        <Stat icon={<Play className="h-4 w-4" />} value={totals.overall} label="Completion" detail="overall %" />
      </div>

      <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {phaseData.map(({ phase, overall, completed, items }) => (
          <Link
            key={phase}
            to={`/roadmap/phase/${phase}`}
            className="group rounded-lg border border-border p-3 text-center transition-colors hover:border-primary/50"
          >
            <div className="font-mono text-xs text-muted-foreground">Phase {phase}</div>
            <div className="mt-1 text-sm font-medium">{items[0]?.item.phaseName}</div>
            <div className="mt-1 text-xs text-muted-foreground">{completed}/{items.length}</div>
            <MiniBar value={overall} />
            <div className="mt-1.5 inline-flex items-center gap-1 text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
              Open Phase <ArrowUpRight className="h-3 w-3" />
            </div>
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-0 flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics or skills…"
            className="w-full rounded-md border border-border bg-card py-2 pl-8 pr-8 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1">
          {difficulties.map((d) => (
            <button
              key={d.value}
              onClick={() => setDifficulty(d.value)}
              className={cn(
                'rounded-md border px-2.5 py-1 text-xs font-medium transition-colors',
                difficulty === d.value
                  ? 'border-primary/60 bg-primary/10 text-primary'
                  : 'border-border text-muted-foreground hover:bg-accent'
              )}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {!loaded && <p className="text-sm text-muted-foreground">Loading progress…</p>}

      {isFiltering ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{filtered.length} of {allTopics.length} topics</span>
            <button
              onClick={() => {
                setQuery('');
                setDifficulty('all');
              }}
              className="inline-flex items-center gap-1 rounded border border-border px-2 py-1 hover:bg-accent"
            >
              <X className="h-3 w-3" /> Clear filters
            </button>
          </div>
          {filtered.length > 0 ? (
            <div className="space-y-2">
              {filtered.map(({ item, summary, curriculum }) => (
                <TopicCard key={item.id} item={item} summary={summary} curriculum={curriculum} />
              ))}
            </div>
          ) : (
            <p className="rounded-lg border border-border p-6 text-center text-sm text-muted-foreground">
              No topics match your search.
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {phaseData.map(({ phase, items }) => {
            const phaseName = items[0]?.item.phaseName ?? `Phase ${phase}`;
            return (
              <div key={phase} className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs text-primary">
                    Phase {phase}
                  </span>
                  <h2 className="font-medium">{phaseName}</h2>
                  <Link
                    to={`/roadmap/phase/${phase}`}
                    className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                  >
                    Open Phase <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>

                <div className="space-y-2">
                  {items.map(({ item, summary, curriculum }) => (
                    <TopicCard key={item.id} item={item} summary={summary} curriculum={curriculum} />
                  ))}
                </div>

                {(() => {
                  const videos = items.flatMap(({ item }) => getVideosForSlug(item.slug));
                  if (videos.length === 0) return null;
                  const open = openVideos.includes(phase);
                  return (
                    <div>
                      <button
                        onClick={() => togglePhaseVideos(phase)}
                        className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-accent"
                      >
                        <Play className="h-3 w-3" />
                        Watch &amp; Learn
                        <span className="text-muted-foreground">{videos.length} video{videos.length === 1 ? '' : 's'}</span>
                      </button>
                      {open && (
                        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                          {videos.map((v, i) => (
                            <VideoCard key={`${v.youtubeId}-${i}`} {...v} />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}