import type {
  ProjectBuild,
  ProjectProgress,
  ProjectStatusValue,
} from '@/types';

export type ProjectBuildProgress = {
  percent: number;
  status: ProjectStatusValue;
  gates: {
    projectComplete: boolean;
    portfolioReady: boolean;
    interviewReady: boolean;
  };
  totalTasks: number;
  completedTasks: number;
  totalLabs: number;
  completedLabs: number;
  totalExperiments: number;
  completedExperiments: number;
  totalTesting: number;
  completedTesting: number;
  totalSecurity: number;
  completedSecurity: number;
  totalDeployment: number;
  completedDeployment: number;
  prerequisitesTotal: number;
  prerequisitesCompleted: number;
  objectivesTotal: number;
  objectivesCompleted: number;
  contextAnswered: number;
  contextTotal: number;
  evidenceCount: number;
  adrCount: number;
  journalCount: number;
  hoursLogged: number;
  totalHours: { min: number; max: number };
  nextAction:
    | { kind: 'prerequisite'; id: string }
    | { kind: 'task'; id: string }
    | { kind: 'lab'; id: string }
    | { kind: 'experiment'; id: string }
    | { kind: 'testing'; id: string }
    | { kind: 'security'; id: string }
    | { kind: 'deployment'; id: string }
    | { kind: 'evaluation' }
    | { kind: 'evidence' }
    | { kind: 'caseStudy' }
    | { kind: 'done' };
};

function clampPercent(value: number): number {
  return Math.round(Math.max(0, Math.min(100, value)));
}

export function computeProjectBuildProgress(
  build: ProjectBuild,
  progress: ProjectProgress,
): ProjectBuildProgress {
  const totalTasks = build.tasks.length;
  const completedTasks = build.tasks.filter((t) => progress.tasks[t.id]?.completed).length;

  const totalLabs = build.labs.length;
  const completedLabs = build.labs.filter((l) => progress.labs[l.id]?.status === 'completed').length;

  const completedExperiments = progress.experiments.length;
  const totalExperiments = build.experiments.length;

  const totalTesting = build.testing.length;
  const completedTesting = progress.testingCompleted.length;
  const totalSecurity = build.security.length;
  const completedSecurity = progress.securityCompleted.length;
  const totalDeployment = build.deployment.length;
  const completedDeployment = progress.deploymentCompleted.length;

  const prerequisitesTotal = build.prerequisites.length;
  const prerequisitesCompleted = progress.prerequisitesCompleted.length;
  const objectivesTotal = build.objectives.length;
  const objectivesCompleted = progress.objectivesCompleted.length;

  const contextTotal = build.contextEngineering.length;
  const contextAnswered = build.contextEngineering.filter((q) => {
    const answer = progress.contextEngineering[q.id];
    return typeof answer === 'string' && answer.trim().length > 0;
  }).length;

  const evaluationAnswered = build.evaluation.metrics.filter((m) => {
    const value = progress.evaluation[m.key];
    return typeof value === 'number' && Number.isFinite(value);
  }).length;

  const evidenceCount = progress.evidence.length;
  const adrCount = progress.adrs.length;
  const journalCount = progress.journal.length;

  const hoursLogged = progress.journal.reduce((sum, e) => sum + (e.hours || 0), 0);

  const weights = {
    tasks: 0.35,
    labs: 0.15,
    experiments: 0.1,
    prerequisites: 0.05,
    objectives: 0.05,
    testing: 0.05,
    security: 0.1,
    deployment: 0.05,
    evaluation: 0.05,
    evidence: 0.05,
  };

  const frac = (done: number, total: number) => (total === 0 ? 1 : Math.min(1, done / total));
  const evidenceFrac = Math.min(1, evidenceCount / 5);

  const percent = clampPercent(
    frac(completedTasks, totalTasks) * weights.tasks +
      frac(completedLabs, totalLabs) * weights.labs +
      frac(completedExperiments, totalExperiments) * weights.experiments +
      frac(prerequisitesCompleted, prerequisitesTotal) * weights.prerequisites +
      frac(objectivesCompleted, objectivesTotal) * weights.objectives +
      frac(completedTesting, totalTesting) * weights.testing +
      frac(completedSecurity, totalSecurity) * weights.security +
      frac(completedDeployment, totalDeployment) * weights.deployment +
      frac(evaluationAnswered, build.evaluation.metrics.length) * weights.evaluation +
      evidenceFrac * weights.evidence,
  ) * 100;

  const gates = {
    projectComplete:
      completedTasks === totalTasks &&
      completedLabs === totalLabs &&
      completedExperiments >= totalExperiments &&
      completedTesting >= totalTesting &&
      completedSecurity >= totalSecurity &&
      completedDeployment >= totalDeployment,
    portfolioReady: false,
    interviewReady: false,
  };
  gates.portfolioReady =
    gates.projectComplete &&
    evidenceCount >= build.completionRequirements.portfolioReady.length &&
    build.portfolioFields.every((f) => {
      const value = progress.caseStudy[f.id];
      return typeof value === 'string' && value.trim().length > 0;
    }) &&
    progress.githubUrl.trim().length > 0;
  gates.interviewReady =
    gates.portfolioReady &&
    adrCount >= 1 &&
    journalCount >= 3 &&
    evaluationAnswered >= Math.min(3, build.evaluation.metrics.length);

  let status: ProjectStatusValue = 'in_progress';
  if (percent === 0 && completedTasks === 0) {
    status = 'not_started';
  } else if (gates.interviewReady) {
    status = 'interview_ready';
  } else if (gates.portfolioReady) {
    status = 'portfolio_ready';
  } else if (gates.projectComplete) {
    status = 'project_complete';
  }

  const nextAction = computeNextAction(build, progress);

  return {
    percent,
    status,
    gates,
    totalTasks,
    completedTasks,
    totalLabs,
    completedLabs,
    totalExperiments,
    completedExperiments,
    totalTesting,
    completedTesting,
    totalSecurity,
    completedSecurity,
    totalDeployment,
    completedDeployment,
    prerequisitesTotal,
    prerequisitesCompleted,
    objectivesTotal,
    objectivesCompleted,
    contextAnswered,
    contextTotal,
    evidenceCount,
    adrCount,
    journalCount,
    hoursLogged,
    totalHours: build.estimatedHours,
    nextAction,
  };
}

function computeNextAction(
  build: ProjectBuild,
  progress: ProjectProgress,
): ProjectBuildProgress['nextAction'] {
  const prereq = build.prerequisites.find((p) => !progress.prerequisitesCompleted.includes(p.id));
  if (prereq) return { kind: 'prerequisite', id: prereq.id };

  for (const milestone of build.milestones) {
    for (const taskId of milestone.taskIds) {
      const task = build.tasks.find((t) => t.id === taskId);
      if (task && !progress.tasks[task.id]?.completed) {
        return { kind: 'task', id: task.id };
      }
    }
  }

  const lab = build.labs.find((l) => progress.labs[l.id]?.status !== 'completed');
  if (lab) return { kind: 'lab', id: lab.id };

  const experiment = build.experiments.find(
    (e) => !progress.experiments.some((r) => r.name === e.name),
  );
  if (experiment) return { kind: 'experiment', id: experiment.id };

  const test = build.testing.find(
    (t) => !progress.testingCompleted.includes(t.id),
  );
  if (test) return { kind: 'testing', id: test.id };

  const security = build.security.find(
    (s) => !progress.securityCompleted.includes(s.id),
  );
  if (security) return { kind: 'security', id: security.id };

  const deployment = build.deployment.find(
    (d) => !progress.deploymentCompleted.includes(d.id),
  );
  if (deployment) return { kind: 'deployment', id: deployment.id };

  const unmeasured = build.evaluation.metrics.filter(
    (m) => typeof progress.evaluation[m.key] !== 'number',
  );
  if (unmeasured.length > 0) return { kind: 'evaluation' };

  if (progress.evidence.length < build.completionRequirements.portfolioReady.length) {
    return { kind: 'evidence' };
  }

  const unfilled = build.portfolioFields.find((f) => {
    const value = progress.caseStudy[f.id];
    return typeof value !== 'string' || value.trim().length === 0;
  });
  if (unfilled && progress.githubUrl.trim().length === 0) return { kind: 'caseStudy' };

  return { kind: 'done' };
}