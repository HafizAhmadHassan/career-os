import type {
  AssessmentAnswer,
  LabState,
  MiniProjectState,
  ResourceReadState,
  TopicEvidence,
  TopicProgress,
} from '@/types';
import { defaultTopicProgress } from '@/types';
import { storage } from './index';

async function loadProgress(topicId: string): Promise<TopicProgress> {
  const existing = await storage.getById<TopicProgress>('topicProgress', topicId);
  const base = existing ?? defaultTopicProgress(topicId);
  return {
    ...defaultTopicProgress(topicId),
    ...base,
    resourcesRead: base.resourcesRead ?? {},
    labs: base.labs ?? {},
    assessment: base.assessment ?? {},
    interview: base.interview ?? {},
    repositorySteps: base.repositorySteps ?? {},
    evidence: base.evidence ?? [],
    miniProject: base.miniProject ?? { completed: false, githubUrl: "", notes: "" },
    objectivesCompleted: base.objectivesCompleted ?? [],
  };
}

async function saveProgress(progress: TopicProgress): Promise<void> {
  await storage.put('topicProgress', progress);
}

export const ProgressRepository = {
  get: loadProgress,
  async getAll(): Promise<TopicProgress[]> {
    return storage.getAll<TopicProgress>('topicProgress');
  },
  async save(progress: TopicProgress): Promise<void> {
    await saveProgress(progress);
  },
  async markObjective(topicId: string, objectiveId: string, done: boolean): Promise<void> {
    const p = await loadProgress(topicId);
    p.objectivesCompleted = done
      ? [...new Set([...p.objectivesCompleted, objectiveId])]
      : p.objectivesCompleted.filter((id) => id !== objectiveId);
    if (done && !p.startedAt) p.startedAt = new Date().toISOString();
    await saveProgress(p);
  },
  async markStudied(topicId: string): Promise<void> {
    const p = await loadProgress(topicId);
    p.lastStudiedAt = new Date().toISOString();
    if (!p.startedAt) p.startedAt = new Date().toISOString();
    if (p.status === 'not_started') p.status = 'learning';
    await saveProgress(p);
  },
  async setStatus(topicId: string, status: TopicProgress['status']): Promise<void> {
    const p = await loadProgress(topicId);
    p.status = status;
    if (status === 'demonstrated' || status === 'mastered') {
      p.completedAt = new Date().toISOString();
    }
    if (status === 'not_started') {
      p.completedAt = undefined;
    }
    await saveProgress(p);
  },
  async markRepoStep(topicId: string, repoId: string, stepId: string, done: boolean): Promise<void> {
    const p = await loadProgress(topicId);
    const current = p.repositorySteps[repoId] ?? [];
    p.repositorySteps[repoId] = done
      ? [...new Set([...current, stepId])]
      : current.filter((id) => id !== stepId);
    await saveProgress(p);
  },
  async markRepoStudied(topicId: string, repoId: string, steps: string[]): Promise<void> {
    const p = await loadProgress(topicId);
    p.repositorySteps[repoId] = steps;
    await saveProgress(p);
  },
};

export const ResourceRepository = {
  async get(topicId: string): Promise<Record<string, ResourceReadState>> {
    const p = await loadProgress(topicId);
    return p.resourcesRead;
  },
  async setRead(topicId: string, resourceId: string, state: ResourceReadState): Promise<void> {
    const p = await loadProgress(topicId);
    p.resourcesRead[resourceId] = state;
    await saveProgress(p);
  },
  async unsetRead(topicId: string, resourceId: string): Promise<void> {
    const p = await loadProgress(topicId);
    delete p.resourcesRead[resourceId];
    await saveProgress(p);
  },
};

export const LabRepository = {
  async get(topicId: string, labId: string): Promise<LabState | undefined> {
    const p = await loadProgress(topicId);
    return p.labs[labId];
  },
  async save(topicId: string, labId: string, state: LabState): Promise<void> {
    const p = await loadProgress(topicId);
    p.labs[labId] = state;
    await saveProgress(p);
  },
  async setStatus(topicId: string, labId: string, status: LabState['status']): Promise<void> {
    const p = await loadProgress(topicId);
    const now = new Date().toISOString();
    const current = p.labs[labId] ?? { status: 'not_started', githubUrl: '', notes: '', timeSpentMinutes: 0, evidence: '' };
    p.labs[labId] = {
      ...current,
      status,
      startedAt: current.startedAt ?? (status === 'in_progress' ? now : undefined),
      completedAt: status === 'completed' ? now : current.completedAt,
    };
    await saveProgress(p);
  },
};

export const MiniProjectRepository = {
  async get(topicId: string): Promise<MiniProjectState> {
    const p = await loadProgress(topicId);
    return p.miniProject;
  },
  async save(topicId: string, state: MiniProjectState): Promise<void> {
    const p = await loadProgress(topicId);
    p.miniProject = state;
    await saveProgress(p);
  },
};

export const NotesRepository = {
  async get(topicId: string): Promise<string> {
    const p = await loadProgress(topicId);
    return p.notes;
  },
  async save(topicId: string, notes: string): Promise<void> {
    const p = await loadProgress(topicId);
    p.notes = notes;
    p.lastStudiedAt = new Date().toISOString();
    await saveProgress(p);
  },
};

export const AssessmentRepository = {
  async get(topicId: string): Promise<Record<string, AssessmentAnswer>> {
    const p = await loadProgress(topicId);
    return p.assessment;
  },
  async save(topicId: string, questionId: string, answer: AssessmentAnswer): Promise<void> {
    const p = await loadProgress(topicId);
    p.assessment[questionId] = { ...answer, submittedAt: new Date().toISOString() };
    await saveProgress(p);
  },
};

export const InterviewRepository = {
  async get(topicId: string): Promise<TopicProgress['interview']> {
    const p = await loadProgress(topicId);
    return p.interview;
  },
  async save(topicId: string, questionId: string, state: TopicProgress['interview'][string]): Promise<void> {
    const p = await loadProgress(topicId);
    p.interview[questionId] = state;
    await saveProgress(p);
  },
};

export const EvidenceRepository = {
  async get(topicId: string): Promise<TopicEvidence[]> {
    const p = await loadProgress(topicId);
    return p.evidence;
  },
  async add(topicId: string, evidence: TopicEvidence): Promise<void> {
    const p = await loadProgress(topicId);
    p.evidence = [...p.evidence, evidence];
    await saveProgress(p);
  },
  async remove(topicId: string, evidenceId: string): Promise<void> {
    const p = await loadProgress(topicId);
    p.evidence = p.evidence.filter((e) => e.id !== evidenceId);
    await saveProgress(p);
  },
};

export { loadProgress };