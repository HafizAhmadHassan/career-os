import type { RoadmapItem, TopicCurriculum, TopicProgress } from '@/types';
import { defaultTopicProgress, progressWeights } from '@/types';
import { roadmapItems } from '@/data/roadmap';

export interface TopicProgressSummary {
  overall: number;
  resources: number;
  objectives: number;
  labs: number;
  miniProject: number;
  assessment: number;
  interview: number;
  evidence: number;
  resourcesRead: number;
  resourcesTotal: number;
  objectivesCompleted: number;
  objectivesTotal: number;
  labsCompleted: number;
  labsTotal: number;
  miniProjectDone: boolean;
  miniProjectTotal: number;
  assessmentScore: number;
  interviewConfident: number;
  interviewTotal: number;
  evidenceCount: number;
}

export interface NextAction {
  section: string;
  label: string;
  meta: string;
  sectionId: string;
}

export function computeTopicProgress(
  curriculum: TopicCurriculum,
  progress: TopicProgress
): TopicProgressSummary {
  const resourcesTotal = curriculum.resources.length;
  const resourcesRead = resourcesTotal === 0
    ? 0
    : curriculum.resources.filter((r) => progress.resourcesRead[r.id]).length;

  const objectivesTotal = curriculum.objectives.length;
  const objectivesCompleted = curriculum.objectives.filter((o) =>
    progress.objectivesCompleted.includes(o.id)
  ).length;

  const labsTotal = curriculum.labs.length;
  const labsCompleted = curriculum.labs.filter(
    (l) => progress.labs[l.id]?.status === 'completed'
  ).length;

  const miniProjectDone = progress.miniProject?.completed ?? false;
  const miniProjectTotal = 1;

  const assessmentQuestions = curriculum.assessment;
  let assessmentScore = 0;
  if (assessmentQuestions.length > 0) {
    const mcq = assessmentQuestions.filter((q) => q.type === 'mcq');
    const mcqCorrect = mcq.filter(
      (q) => progress.assessment[q.id]?.selectedOption === q.correctOption
    ).length;
    const submittedShort = assessmentQuestions.filter(
      (q) => q.type !== 'mcq' && (progress.assessment[q.id]?.text.trim() ?? '') !== ''
    ).length;
    assessmentScore = Math.round((mcqCorrect + submittedShort) / assessmentQuestions.length * 100);
  }

  const interviewTotal = curriculum.interviewQuestions.length;
  const interviewConfident = curriculum.interviewQuestions.filter((q) => {
    const st = progress.interview[q.id];
    return st && (st.status === 'confident' || st.status === 'mastered' || st.confidence >= 70);
  }).length;

  const evidenceCount = progress.evidence?.length ?? 0;

  const pct = (done: number, total: number) =>
    total === 0 ? 100 : Math.round((done / total) * 100);

  const resources = resourcesTotal === 0 ? 100 : pct(resourcesRead, resourcesTotal);
  const objectives = objectivesTotal === 0 ? 100 : pct(objectivesCompleted, objectivesTotal);
  const labs = labsTotal === 0 ? 100 : pct(labsCompleted, labsTotal);
  const miniProject = miniProjectDone ? 100 : 0;
  const assessment = assessmentQuestions.length === 0 ? 100 : assessmentScore;
  const interview = interviewTotal === 0 ? 100 : pct(interviewConfident, interviewTotal);
  const evidence = evidenceCount >= 2 ? 100 : evidenceCount === 1 ? 50 : 0;

  const weights = progressWeights;
  const overall = Math.min(
    100,
    Math.round(
      (resources * weights.resources +
        objectives * weights.objectives +
        labs * weights.labs +
        miniProject * weights.miniProject +
        assessment * weights.assessment +
        interview * weights.interview +
        evidence * weights.evidence) /
        (weights.resources +
          weights.objectives +
          weights.labs +
          weights.miniProject +
          weights.assessment +
          weights.interview +
          weights.evidence)
    )
  );

  return {
    overall,
    resources,
    objectives,
    labs,
    miniProject,
    assessment,
    interview,
    evidence,
    resourcesRead,
    resourcesTotal,
    objectivesCompleted,
    objectivesTotal,
    labsCompleted,
    labsTotal,
    miniProjectDone,
    miniProjectTotal,
    assessmentScore,
    interviewConfident,
    interviewTotal,
    evidenceCount,
  };
}

export interface RequirementCheck {
  met: boolean;
  missing: string[];
}

export function getDemonstratedRequirements(
  summary: TopicProgressSummary
): RequirementCheck {
  const missing: string[] = [];
  if (summary.objectivesTotal > 0 && summary.objectivesCompleted < summary.objectivesTotal) {
    missing.push('Complete all learning objectives');
  }
  if (summary.labsTotal > 0 && summary.labsCompleted < Math.min(2, summary.labsTotal)) {
    missing.push(`Complete at least ${Math.min(2, summary.labsTotal)} practical labs`);
  }
  if (summary.miniProjectTotal > 0 && !summary.miniProjectDone) {
    missing.push('Complete the mini-project');
  }
  if (summary.evidenceCount < 1) {
    missing.push('Attach at least one piece of evidence');
  }
  return { met: missing.length === 0, missing };
}

export function getMasteredRequirements(
  summary: TopicProgressSummary,
  demonstratedMet: boolean
): RequirementCheck {
  const missing: string[] = [];
  if (!demonstratedMet) {
    missing.push('Reach "Demonstrated" first');
  }
  if (summary.interviewTotal > 0 && summary.interviewConfident < summary.interviewTotal) {
    missing.push('Mark all interview questions confident/mastered');
  }
  if (summary.assessmentScore < 80) {
    missing.push('Score 80%+ on the assessment');
  }
  return { met: missing.length === 0, missing };
}

export function getNextAction(
  curriculum: TopicCurriculum,
  progress: TopicProgress
): NextAction | null {
  const firstObjective = curriculum.objectives.find((o) => !progress.objectivesCompleted.includes(o.id));
  if (firstObjective) {
    return {
      section: 'objectives',
      label: firstObjective.text,
      meta: 'Learning objective',
      sectionId: 'objectives',
    };
  }

  const firstResource = curriculum.resources.find((r) => !progress.resourcesRead[r.id]);
  if (firstResource) {
    return {
      section: 'resources',
      label: firstResource.title,
      meta: `${firstResource.difficulty} · ~${firstResource.estimatedMinutes} min`,
      sectionId: 'resources',
    };
  }

  const firstLab = curriculum.labs.find((l) => progress.labs[l.id]?.status !== 'completed');
  if (firstLab) {
    return {
      section: 'labs',
      label: `Lab ${firstLab.id.split('-')[1]}: ${firstLab.title}`,
      meta: `${firstLab.difficulty} · ~${firstLab.estimatedMinutes} min`,
      sectionId: `lab-${firstLab.id}`,
    };
  }

  if (!progress.miniProject?.completed) {
    return {
      section: 'mini-project',
      label: `Mini Project: ${curriculum.miniProject.title}`,
      meta: `~${curriculum.miniProject.estimatedHours} hours`,
      sectionId: 'mini-project',
    };
  }

  const firstAssessment = curriculum.assessment.find((q) => {
    const a = progress.assessment[q.id];
    if (q.type === 'mcq') return a?.selectedOption === undefined;
    return (a?.text.trim() ?? '') === '';
  });
  if (firstAssessment) {
    return {
      section: 'assessment',
      label: `Assessment: ${firstAssessment.question.slice(0, 60)}`,
      meta: `${firstAssessment.type.replace('_', ' ')} question`,
      sectionId: 'assessment',
    };
  }

  const firstInterview = curriculum.interviewQuestions.find(
    (q) => !(progress.interview[q.id]?.status === 'confident' || progress.interview[q.id]?.status === 'mastered')
  );
  if (firstInterview) {
    return {
      section: 'interview',
      label: firstInterview.question,
      meta: 'Interview question',
      sectionId: 'interview',
    };
  }

  const firstRepo = curriculum.repositories.find(
    (r) => (progress.repositorySteps[r.id]?.length ?? 0) < r.guidedSteps.length
  );
  if (firstRepo) {
    return {
      section: 'repositories',
      label: `Study ${firstRepo.name}`,
      meta: `${firstRepo.guidedSteps.length} guided steps`,
      sectionId: `repo-${firstRepo.id}`,
    };
  }

  if ((progress.evidence?.length ?? 0) < 2) {
    return {
      section: 'evidence',
      label: 'Add implementation evidence',
      meta: 'Attach a repo, article, or benchmark',
      sectionId: 'evidence',
    };
  }

  return null;
}

export type ProgressMap = Record<string, TopicProgress>;

export function buildProgressMap(all: TopicProgress[]): ProgressMap {
  const map: ProgressMap = {};
  for (const item of roadmapItems) {
    map[item.id] = defaultTopicProgress(item.id);
  }
  for (const p of all) {
    map[p.topicId] = p;
  }
  return map;
}

export function getRoadmapItem(slug: string): RoadmapItem | undefined {
  return roadmapItems.find((i) => i.slug === slug);
}

export function isTopicComplete(summary: TopicProgressSummary, status?: TopicProgress['status']): boolean {
  return summary.overall >= 100 || status === 'demonstrated' || status === 'mastered';
}

export function getContinueLearningTopic(
  progressMap: ProgressMap,
  curriculumFor: (topicId: string) => TopicCurriculum | undefined
): {
  item: RoadmapItem;
  progress: TopicProgress;
  summary: TopicProgressSummary;
  nextAction: NextAction | null;
} | null {
  const isDone = (item: RoadmapItem) => {
    const curriculum = curriculumFor(item.id);
    if (!curriculum) return false;
    const progress = progressMap[item.id];
    const summary = computeTopicProgress(curriculum, progress);
    return isTopicComplete(summary, progress.status);
  };

  const started = roadmapItems
    .filter((i) => !isDone(i) && progressMap[i.id]?.status !== 'not_started')
    .sort((a, b) => {
      const ta = progressMap[a.id]?.lastStudiedAt ?? '';
      const tb = progressMap[b.id]?.lastStudiedAt ?? '';
      return tb.localeCompare(ta);
    });

  const candidates = started.length > 0 ? started : roadmapItems.filter((i) => !isDone(i));

  if (candidates.length === 0) return null;

  const item = candidates[0];
  const curriculum = curriculumFor(item.id);
  if (!curriculum) return null;
  const progress = progressMap[item.id];
  const summary = computeTopicProgress(curriculum, progress);
  return { item, progress, summary, nextAction: getNextAction(curriculum, progress) };
}

export function getRecommendedNext(
  progressMap: ProgressMap,
  curriculumFor: (topicId: string) => TopicCurriculum | undefined
): { item: RoadmapItem; reason: string } | null {
  const completeIndex: number[] = [];
  roadmapItems.forEach((item, index) => {
    const curriculum = curriculumFor(item.id);
    if (!curriculum) return;
    const summary = computeTopicProgress(curriculum, progressMap[item.id]);
    if (isTopicComplete(summary, progressMap[item.id]?.status)) {
      completeIndex.push(index);
    }
  });

  const lastComplete = completeIndex[completeIndex.length - 1];
  if (lastComplete === undefined) return null;

  const next = roadmapItems.slice(lastComplete + 1).find((item) => {
    const curriculum = curriculumFor(item.id);
    if (!curriculum) return false;
    const summary = computeTopicProgress(curriculum, progressMap[item.id]);
    return !isTopicComplete(summary, progressMap[item.id]?.status);
  });

  if (!next) return null;
  const prev = roadmapItems[lastComplete];
  return { item: next, reason: `You completed ${prev.title} and should now learn ${next.title}.` };
}