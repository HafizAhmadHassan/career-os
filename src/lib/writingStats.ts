import type { Article, WritingIdea, ProjectProgress, TopicProgress } from '@/types';
import { getProjectBuildById } from '@/data/projectBuilds';

export type WritingStats = {
  articles: number;
  published: number;
  drafts: number;
  ideas: number;
  experimentsDocumented: number;
  wordsWritten: number;
  readingMinutes: number;
  researchSessions: number;
  sourcesCollected: number;
  skillsDemonstrated: number;
  projectsDocumented: number;
  featured: number;
};

export function computeWritingStats(
  articles: Article[],
  ideas: WritingIdea[],
  researchNotes: { sources: unknown[] }[],
): WritingStats {
  const published = articles.filter((a) => a.status === 'published').length;
  const drafts = articles.filter((a) =>
    ['researching', 'outlining', 'drafting', 'editing'].includes(a.status),
  ).length;
  return {
    articles: articles.length,
    published,
    drafts,
    ideas: ideas.filter((i) => i.status === 'idea').length,
    experimentsDocumented: articles.filter((a) => a.template === 'experiment').length,
    wordsWritten: articles.reduce((sum, a) => sum + (a.wordCount || 0), 0),
    readingMinutes: articles.reduce((sum, a) => sum + (a.readingTime || 0), 0),
    researchSessions: researchNotes.length,
    sourcesCollected: researchNotes.reduce((sum, r) => sum + r.sources.length, 0),
    skillsDemonstrated: new Set(articles.filter((a) => a.status === 'published').flatMap((a) => a.relatedSkillIds)).size,
    projectsDocumented: new Set(articles.filter((a) => a.status === 'published').flatMap((a) => a.relatedProjectIds)).size,
    featured: articles.filter((a) => a.featured && a.status === 'published').length,
  };
}

export type IdeaWithRecommendation = {
  idea: WritingIdea;
  recommended: boolean;
  reason?: string;
};

function projectTriggered(idea: WritingIdea, projectProgress: Record<string, ProjectProgress>): boolean {
  const src = idea.source;
  if (src.kind !== 'project') return false;
  const p = projectProgress[src.projectId];
  if (!p) return false;

  if (src.targetType === 'lab') {
    return p.labs[src.targetId ?? '']?.status === 'completed';
  }
  if (src.targetType === 'experiment') {
    const build = getProjectBuildById(src.projectId);
    const template = build?.experiments.find((e) => e.id === src.targetId);
    const name = template?.name;
    return !!name && p.experiments.some((e) => e.name === name);
  }
  return Object.values(p.tasks).some((t) => t.completed);
}

export function resolveIdeaRecommendations(
  ideas: WritingIdea[],
  projectProgress: Record<string, ProjectProgress>,
  topicProgress: Record<string, TopicProgress>,
): IdeaWithRecommendation[] {
  return ideas.map((idea) => {
    const src = idea.source;
    let recommended = false;
    let reason: string | undefined;

    if (src.kind === 'project' && projectTriggered(idea, projectProgress)) {
      const build = getProjectBuildById(src.projectId);
      recommended = true;
      reason = src.targetType === 'lab'
        ? `Suggested — you completed a lab in ${build?.title}`
        : `Suggested — you ran an experiment in ${build?.title}`;
    } else if (src.kind === 'roadmap') {
      const topic = topicProgress[src.roadmapSlug];
      if (topic && (topic.status === 'demonstrated' || topic.status === 'mastered')) {
        recommended = true;
        reason = 'Suggested — you completed the roadmap topic';
      }
    }

    return { idea, recommended, reason };
  });
}