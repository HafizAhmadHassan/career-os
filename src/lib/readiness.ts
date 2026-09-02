import type { CareerReadiness, SkillLevel, Skill } from '@/types';
import { skillCategories, skills } from '@/data/skills';
import { roadmapItems } from '@/data/roadmap';
import { getCurriculum } from '@/data/curriculum';
import { ProgressRepository } from '@/lib/storage/repositories';
import {
  buildProgressMap,
  computeTopicProgress,
  getContinueLearningTopic,
  getRecommendedNext,
  isTopicComplete,
  type NextAction,
  type ProgressMap,
  type TopicProgressSummary,
} from '@/lib/progress';
import type { RoadmapItem, TopicProgress } from '@/types';

function calculateSkillScore(level: SkillLevel, evidenceCount: number): number {
  const levelScore = (level / 5) * 0.6;
  const evidenceScore = Math.min(evidenceCount * 0.1, 0.4);
  return levelScore + evidenceScore;
}

export function calculateCareerReadiness(): CareerReadiness[] {
  return skillCategories.map((category) => {
    const categorySkills: Skill[] = category.skillIds
      .map((id) => skills.find((s) => s.id === id))
      .filter((s): s is Skill => s !== undefined);

    const skillsData = categorySkills.map((skill) => ({
      name: skill.name,
      level: skill.level,
      evidenceCount: skill.evidenceIds.length,
    }));

    const avgScore =
      skillsData.length > 0
        ? skillsData.reduce(
            (sum: number, s) => sum + calculateSkillScore(s.level, s.evidenceCount),
            0
          ) / skillsData.length
        : 0;

    return {
      category: category.name,
      score: Math.round(avgScore * 100),
      weight: category.weight,
      skills: skillsData,
    };
  });
}

export function getOverallReadiness(): number {
  const readiness = calculateCareerReadiness();
  return Math.round(
    readiness.reduce((sum: number, r) => sum + r.score * r.weight, 0)
  );
}

export function getTodayMission(): {
  title: string;
  skill: string;
  estimatedTime: string;
  whyItMatters: string;
  relatedProject: string;
} {
  const inProgressSkills = skills.filter(
    (s) => s.status === 'learning' || s.status === 'practicing'
  );
  if (inProgressSkills.length === 0) {
    return {
      title: 'Start your first skill',
      skill: 'Any skill from your roadmap',
      estimatedTime: '1 hour',
      whyItMatters: 'Every expert journey begins with the first step',
      relatedProject: 'Career OS Setup',
    };
  }
  const skill = inProgressSkills[0];
  return {
    title: `Continue learning ${skill.name}`,
    skill: skill.name,
    estimatedTime: '2 hours',
    whyItMatters: `${skill.name} is a core skill in ${skill.category.replace('-', ' ')}`,
    relatedProject: 'Personal Learning',
  };
}

export interface RoadmapMission {
  title: string;
  skill: string;
  estimatedTime: string;
  whyItMatters: string;
  relatedProject: string;
  topicSlug: string;
  actionLabel: string;
}

export interface RoadmapDashboard {
  continueLearning: {
    item: RoadmapItem;
    progress: TopicProgress;
    summary: TopicProgressSummary;
    nextAction: NextAction | null;
  } | null;
  recommendedNext: { item: RoadmapItem; reason: string } | null;
  mission: RoadmapMission;
  stats: {
    overall: number;
    demonstrated: number;
    mastered: number;
    labsCompleted: number;
    resourcesRead: number;
    completedCount: number;
  };
}

function estimateTimeForAction(action: NextAction | null): string {
  if (!action) return '1–2 hours';
  const minutes = action.meta.match(/(\d+)\s*min/);
  if (minutes) return `${minutes[1]} minutes`;
  const hours = action.meta.match(/(\d+)\s*hours?/);
  if (hours) return `~${hours[1]} hours`;
  return '1–2 hours';
}

function computeMission(
  map: ProgressMap,
  continueLearning: ReturnType<typeof getContinueLearningTopic>
): RoadmapMission {
  if (continueLearning) {
    const { item, nextAction } = continueLearning;
    return {
      title: nextAction ? nextAction.label : `Finish ${item.title}`,
      skill: item.phaseName,
      estimatedTime: estimateTimeForAction(nextAction),
      whyItMatters: `Next step in ${item.title} · ${item.phaseName}`,
      relatedProject: item.title,
      topicSlug: item.slug,
      actionLabel: nextAction?.label ?? 'Continue',
    };
  }
  return {
    title: 'Roadmap complete — build a capstone project',
    skill: 'Agentic AI Engineering',
    estimatedTime: '4+ hours',
    whyItMatters: 'Pull everything together into one production-ready system',
    relatedProject: 'Capstone Project',
    topicSlug: 'mcp-advanced-integrations',
    actionLabel: 'Roll a capstone',
  };
}

export async function getRoadmapDashboard(): Promise<RoadmapDashboard> {
  const all = await ProgressRepository.getAll();
  const map = buildProgressMap(all);

  const continueLearning = getContinueLearningTopic(map, getCurriculum);
  const recommendedNext = getRecommendedNext(map, getCurriculum);
  const mission = computeMission(map, continueLearning);

  const statsByTopic = roadmapItems
    .map((item) => {
      const curriculum = getCurriculum(item.id);
      if (!curriculum) return null;
      const progress = map[item.id];
      return { item, progress, summary: computeTopicProgress(curriculum, progress) };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const overall = statsByTopic.length
    ? Math.round(statsByTopic.reduce((s, x) => s + x.summary.overall, 0) / statsByTopic.length)
    : 0;

  const completed = statsByTopic.filter(
    (x) => isTopicComplete(x.summary, x.progress.status) || x.summary.overall >= 100
  ).length;

  return {
    continueLearning,
    recommendedNext,
    mission,
    stats: {
      overall,
      demonstrated: completed,
      mastered: statsByTopic.filter((x) => x.progress.status === 'mastered').length,
      labsCompleted: statsByTopic.reduce((s, x) => s + x.summary.labsCompleted, 0),
      resourcesRead: statsByTopic.reduce((s, x) => s + x.summary.resourcesRead, 0),
      completedCount: completed,
    },
  };
}
