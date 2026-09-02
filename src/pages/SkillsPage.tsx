import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BarChart3, CheckCircle2, ChevronDown, ChevronUp, FlaskConical, Layers, Search, Target, TrendingDown, X } from 'lucide-react';
import { skillCategories, getSkillsByCategory } from '@/data/skills';
import { roadmapItems } from '@/data/roadmap';
import { getCurriculum } from '@/data/curriculum';
import { computeTopicProgress, type TopicProgressSummary } from '@/lib/progress';
import { defaultTopicProgress } from '@/types';
import { useAllTopicProgress } from '@/hooks/useTopicProgress';
import { cn } from '@/lib/utils';
import type { RoadmapItem, Skill, SkillLevel, SkillStatus } from '@/types';

const STATUS_ORDER: SkillStatus[] = ['mastered', 'demonstrated', 'practicing', 'building', 'learning', 'not_started'];

const STATUS_META: Record<SkillStatus, { label: string; className: string }> = {
  mastered: { label: 'Mastered', className: 'bg-green-500/15 text-green-600' },
  demonstrated: { label: 'Demonstrated', className: 'bg-green-500/15 text-green-600' },
  practicing: { label: 'Practicing', className: 'bg-blue-500/15 text-blue-500' },
  building: { label: 'Building', className: 'bg-amber-500/15 text-amber-600' },
  learning: { label: 'Learning', className: 'bg-primary/15 text-primary' },
  not_started: { label: 'Not started', className: 'bg-secondary text-muted-foreground' },
};

function levelTone(level: number): string {
  if (level >= 4) return 'bg-green-500/20 text-green-500';
  if (level >= 3) return 'bg-blue-500/20 text-blue-500';
  if (level >= 2) return 'bg-yellow-500/20 text-yellow-600';
  if (level >= 1) return 'bg-orange-500/20 text-orange-500';
  return 'bg-secondary text-muted-foreground';
}

interface SkillModule {
  item: RoadmapItem;
  summary: TopicProgressSummary;
  overall: number;
  evidenceCount: number;
  started: boolean;
}

interface SkillRow {
  skill: Skill;
  modules: SkillModule[];
  effectiveLevel: SkillLevel;
  displayStatus: SkillStatus;
  maxOverall: number;
  evidenceCount: number;
}

function MiniBar({ value }: { value: number }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
      <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, value)}%` }} />
    </div>
  );
}

export default function SkillsPage() {
  const { map } = useAllTopicProgress();
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<SkillStatus | 'all'>('all');
  const [sort, setSort] = useState<'level-asc' | 'level-desc' | 'name'>('level-asc');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const moduleBySkillId = useMemo(() => {
    const lookup: Record<string, RoadmapItem[]> = {};
    for (const item of roadmapItems) {
      if (!item.skillId && !item.skillIds) continue;
      const ids = item.skillIds && item.skillIds.length > 0 ? item.skillIds : [item.skillId!];
      for (const id of ids) (lookup[id] ??= []).push(item);
    }
    return lookup;
  }, []);

  const rowsByCategory = useMemo(() => {
    const build = (skill: Skill): SkillRow => {
      const items = moduleBySkillId[skill.id] ?? [];
      const modules: SkillModule[] = items
        .map((item) => {
          const curriculum = getCurriculum(item.id);
          if (!curriculum) return null;
          const progress = map[item.id] ?? defaultTopicProgress(item.id);
          const summary = computeTopicProgress(curriculum, progress);
          return {
            item,
            summary,
            overall: summary.overall,
            evidenceCount: progress.evidence?.length ?? 0,
            started: progress.status !== 'not_started',
          };
        })
        .filter((m): m is SkillModule => m !== null);
      const maxOverall = modules.reduce((m, x) => Math.max(m, x.overall), 0);
      const derived = Math.min(5, Math.round(maxOverall / 20));
      const effectiveLevel = Math.max(skill.level, derived) as SkillLevel;
      let displayStatus: SkillStatus = skill.status;
      if (maxOverall >= 100) {
        displayStatus = 'demonstrated';
      } else if (maxOverall > 0 && skill.status === 'not_started') {
        displayStatus = 'learning';
      }
      return {
        skill,
        modules,
        effectiveLevel,
        displayStatus,
        maxOverall,
        evidenceCount: modules.reduce((s, m) => s + m.evidenceCount, 0),
      };
    };
    return skillCategories.map((category) => {
      const skills = getSkillsByCategory(category.id);
      const rows = skills.map(build);
      const score = skills.length
        ? Math.round((rows.reduce((s, r) => s + r.effectiveLevel / 5, 0) / skills.length) * 100)
        : 0;
      const demonstrated = rows.filter((r) => r.displayStatus === 'demonstrated' || r.displayStatus === 'mastered').length;
      return { category, rows, score, demonstrated };
    });
  }, [map, moduleBySkillId]);

  const allRows = useMemo(() => rowsByCategory.flatMap((c) => c.rows), [rowsByCategory]);

  const totals = useMemo(() => {
    const weightSum = skillCategories.reduce((s, c) => s + c.weight, 0);
    const weighted = skillCategories.length
      ? Math.round(rowsByCategory.reduce((s, c) => s + c.category.weight * c.score, 0) / weightSum)
      : 0;
    const evidence = allRows.reduce((s, r) => s + r.evidenceCount, 0);
    const demonstrated = allRows.filter((r) => r.displayStatus === 'demonstrated' || r.displayStatus === 'mastered').length;
    const scored = rowsByCategory.filter((c) => c.rows.length > 0);
    const maxScore = scored.length ? Math.max(...scored.map((c) => c.score)) : 0;
    const minScore = scored.length ? Math.min(...scored.map((c) => c.score)) : 0;
    const strength = maxScore > 0 ? (scored.find((c) => c.score === maxScore) ?? null) : null;
    const gap = minScore < 100 ? (scored.find((c) => c.score === minScore) ?? null) : null;
    return { weighted, evidence, demonstrated, strength, gap, maxScore, minScore };
  }, [rowsByCategory, allRows]);

  const availableStatuses = useMemo(() => {
    const present = new Set(allRows.map((r) => r.displayStatus));
    return STATUS_ORDER.filter((s) => present.has(s));
  }, [allRows]);

  const levelDistribution = useMemo(() => {
    const counts = [0, 1, 2, 3, 4, 5].map((l) => allRows.filter((r) => r.effectiveLevel === l).length);
    return { counts, total: allRows.length };
  }, [allRows]);

  const isFiltering = query.trim() !== '' || statusFilter !== 'all' || sort !== 'level-asc';

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const sorted = [...allRows].sort((a, b) => {
      if (sort === 'name') return a.skill.name.localeCompare(b.skill.name);
      if (sort === 'level-desc') return b.effectiveLevel - a.effectiveLevel || a.skill.name.localeCompare(b.skill.name);
      return a.effectiveLevel - b.effectiveLevel || a.skill.name.localeCompare(b.skill.name);
    });
    return sorted.filter((r) => {
      if (statusFilter !== 'all' && r.displayStatus !== statusFilter) return false;
      if (!q) return true;
      return `${r.skill.name} ${r.skill.description}`.toLowerCase().includes(q);
    });
  }, [allRows, query, statusFilter, sort]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Skills</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Skill matrix tied to your roadmap — levels grow as you complete modules, labs, and evidence.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <div className="rounded-lg border border-border bg-card p-3">
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
          <div className="mt-1.5 font-mono text-lg font-bold">{totals.weighted}%</div>
          <div className="text-xs font-medium">Overall score</div>
          <div className="text-xs text-muted-foreground">weighted by category</div>
        </div>
        <div className="rounded-lg border border-border bg-card p-3">
          <Layers className="h-4 w-4 text-muted-foreground" />
          <div className="mt-1.5 font-mono text-lg font-bold">{allRows.length}</div>
          <div className="text-xs font-medium">Skills</div>
          <div className="text-xs text-muted-foreground">{skillCategories.length} categories</div>
        </div>
        <div className="rounded-lg border border-border bg-card p-3">
          <Target className="h-4 w-4 text-muted-foreground" />
          <div className="mt-1.5 font-mono text-lg font-bold">{totals.strength?.category.name ?? '—'}</div>
          <div className="text-xs font-medium">Top strength</div>
          <div className="text-xs text-muted-foreground">
            {totals.strength ? `score ${totals.strength.score}%` : 'start from the roadmap'}
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-3">
          <TrendingDown className="h-4 w-4 text-muted-foreground" />
          <div className="mt-1.5 font-mono text-lg font-bold">{totals.gap?.category.name ?? '—'}</div>
          <div className="text-xs font-medium">Biggest gap</div>
          <div className="text-xs text-muted-foreground">
            {totals.gap ? `score ${totals.gap.score}%` : 'no progress yet'}
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-3">
          <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          <div className="mt-1.5 font-mono text-lg font-bold">{totals.demonstrated}</div>
          <div className="text-xs font-medium">Demonstrated</div>
          <div className="text-xs text-muted-foreground">completed skills</div>
        </div>
        <div className="rounded-lg border border-border bg-card p-3">
          <FlaskConical className="h-4 w-4 text-muted-foreground" />
          <div className="mt-1.5 font-mono text-lg font-bold">{totals.evidence}</div>
          <div className="text-xs font-medium">Evidence</div>
          <div className="text-xs text-muted-foreground">linked to skills</div>
        </div>
      </div>

      {/* Level distribution */}
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-medium">Level distribution</h2>
          <span className="font-mono text-xs text-muted-foreground">
            {levelDistribution.total} skills · levels 0–5
          </span>
        </div>
        <div className="mt-3 flex h-3 w-full gap-0.5 overflow-hidden rounded-full bg-secondary" role="img" aria-label="Skill level distribution">
          {levelDistribution.counts.map((count, level) =>
            count > 0 ? (
              <div
                key={level}
                className={cn('h-full min-w-[2px]', level === 0 ? 'bg-foreground/15' : levelTone(level))}
                style={{ width: `${(count / levelDistribution.total) * 100}%` }}
              />
            ) : null
          )}
        </div>
        <div className="mt-2 flex justify-between font-mono text-[11px] text-muted-foreground">
          {levelDistribution.counts.map((count, level) => (
            <span key={level}>
              L{level} · {count}
            </span>
          ))}
        </div>
      </div>

      {/* Status legend */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {STATUS_ORDER.map((s) => (
          <span key={s} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className={cn('rounded-full px-2 py-0.5 text-[11px] font-medium', STATUS_META[s].className)}>
              {STATUS_META[s].label}
            </span>
            {s === 'mastered' || s === 'demonstrated' ? 'evidence-backed' : s === 'not_started' ? 'no work yet' : 'active'}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-0 flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search skills…"
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
          <button
            onClick={() => setStatusFilter('all')}
            className={cn(
              'rounded-md border px-2.5 py-1 text-xs font-medium transition-colors',
              statusFilter === 'all'
                ? 'border-primary/60 bg-primary/10 text-primary'
                : 'border-border text-muted-foreground hover:bg-accent'
            )}
          >
            All
          </button>
          {availableStatuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(statusFilter === s ? 'all' : s)}
              className={cn(
                'rounded-md border px-2.5 py-1 text-xs font-medium transition-colors',
                statusFilter === s
                  ? 'border-primary/60 bg-primary/10 text-primary'
                  : 'border-border text-muted-foreground hover:bg-accent'
              )}
            >
              {STATUS_META[s].label}
            </button>
          ))}
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          className="rounded-md border border-border bg-card px-2 py-1.5 text-xs"
          aria-label="Sort skills"
        >
          <option value="level-asc">Weakest first</option>
          <option value="level-desc">Strongest first</option>
          <option value="name">A–Z</option>
        </select>
      </div>

      <div className="space-y-6">
        {rowsByCategory.map(({ category, rows, score, demonstrated }) => {
          const viewRows = rows.filter((r) => filteredRows.includes(r));
          return (
            <div key={category.id} className="rounded-lg border border-border">
              <div className="border-b border-border px-4 py-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h2 className="font-medium">{category.name}</h2>
                    <p className="mt-0.5 text-xs text-muted-foreground">{category.description}</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>
                      {demonstrated}/{rows.length} demonstrated
                    </span>
                    <span>Weight: {Math.round(category.weight * 100)}%</span>
                    <span className="font-mono">{score}%</span>
                  </div>
                </div>
                <MiniBar value={score} />
              </div>

              {isFiltering && viewRows.length === 0 ? (
                <p className="px-4 py-4 text-center text-xs text-muted-foreground">
                  No skills match your filter in this category.
                </p>
              ) : (
                <div className="divide-y divide-border">
                  {(isFiltering ? viewRows : rows).map((row) => {
                    const meta = STATUS_META[row.displayStatus];
                    const isOpen = expanded.has(row.skill.id);
                    const module = row.modules[0];
                    return (
                      <div key={row.skill.id}>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-sm font-medium">{row.skill.name}</span>
                              <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium', meta.className)}>
                                {meta.label}
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground">{row.skill.description}</div>
                          </div>

                          {row.modules.length === 0 ? (
                            <span className="text-xs text-muted-foreground">No module yet</span>
                          ) : row.modules.length === 1 && module ? (
                            <div className="w-full sm:w-44">
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>
                                  Module {row.maxOverall}%{row.evidenceCount > 0 && ` · ${row.evidenceCount} evidence`}
                                </span>
                                <Link
                                  to={`/roadmap/${module.item.slug}`}
                                  className="inline-flex items-center gap-0.5 text-primary hover:underline"
                                >
                                  Open <ArrowUpRight className="h-3 w-3" />
                                </Link>
                              </div>
                              <MiniBar value={row.maxOverall} />
                            </div>
                          ) : (
                            <div className="flex w-full items-center gap-3 sm:w-56">
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                  <span>
                                    {row.modules.length} modules · {row.maxOverall}%
                                    {row.evidenceCount > 0 && ` · ${row.evidenceCount} evidence`}
                                  </span>
                                </div>
                                <MiniBar value={row.maxOverall} />
                              </div>
                              <button
                                onClick={() => toggleExpanded(row.skill.id)}
                                aria-expanded={isOpen}
                                aria-label={`${isOpen ? 'Collapse' : 'Expand'} modules for ${row.skill.name}`}
                                className="shrink-0 rounded-md border border-border p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                              >
                                {isOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                              </button>
                            </div>
                          )}

                          <div className="flex items-center gap-3">
                            <div className="flex gap-0.5" aria-label={`Level ${row.effectiveLevel} of 5`}>
                              {([1, 2, 3, 4, 5] as const).map((level) => (
                                <div
                                  key={level}
                                  className={cn('h-2 w-2 rounded-full', level <= row.effectiveLevel ? 'bg-primary' : 'bg-secondary')}
                                />
                              ))}
                            </div>
                            <span className={cn('rounded-md px-1.5 py-0.5 font-mono text-xs', levelTone(row.effectiveLevel))}>
                              {row.effectiveLevel}/5
                            </span>
                          </div>
                        </div>

                        {isOpen && row.modules.length > 1 && (
                          <div className="space-y-2 border-t border-border bg-secondary/30 px-4 py-3">
                            {row.modules.map((m) => (
                              <div key={m.item.id} className="flex flex-wrap items-center gap-x-4 gap-y-2">
                                <div className="min-w-0 flex-1">
                                  <div className="flex flex-wrap items-center gap-2 text-xs">
                                    <Link
                                      to={`/roadmap/${m.item.slug}`}
                                      className="font-medium text-foreground hover:text-primary hover:underline"
                                    >
                                      {m.item.title}
                                    </Link>
                                    <span className="text-muted-foreground">
                                      {m.item.phaseName} · {m.overall}%
                                    </span>
                                    {m.evidenceCount > 0 && (
                                      <span className="rounded-full bg-secondary px-1.5 py-0.5 text-[11px] text-muted-foreground">
                                        {m.evidenceCount} evidence
                                      </span>
                                    )}
                                  </div>
                                  <MiniBar value={m.overall} />
                                </div>
                                <Link
                                  to={`/roadmap/${m.item.slug}`}
                                  className="inline-flex items-center gap-0.5 text-xs text-primary hover:underline"
                                >
                                  Open <ArrowUpRight className="h-3 w-3" />
                                </Link>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}