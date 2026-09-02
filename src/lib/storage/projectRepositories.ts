import type {
  LabState,
  ProjectADR,
  ProjectEvidenceItem,
  ProjectExperimentResult,
  ProjectJournalEntry,
  ProjectProgress,
  ProjectStatusValue,
  TaskProgress,
} from '@/types';
import { defaultProjectProgress } from '@/types';
import { storage } from './index';

async function loadProject(projectId: string): Promise<ProjectProgress> {
  const existing = await storage.getById<ProjectProgress>('projectProgress', projectId);
  const base = existing ?? defaultProjectProgress(projectId);
  return {
    ...defaultProjectProgress(projectId),
    ...base,
    prerequisitesCompleted: base.prerequisitesCompleted ?? [],
    objectivesCompleted: base.objectivesCompleted ?? [],
    tasks: base.tasks ?? {},
    labs: base.labs ?? {},
    experiments: base.experiments ?? [],
    evaluation: base.evaluation ?? {},
    testingCompleted: base.testingCompleted ?? [],
    securityCompleted: base.securityCompleted ?? [],
    deploymentCompleted: base.deploymentCompleted ?? [],
    contextEngineering: base.contextEngineering ?? {},
    technologyDecisions: base.technologyDecisions ?? {},
    repositories: base.repositories ?? {},
    journal: base.journal ?? [],
    adrs: base.adrs ?? [],
    evidence: base.evidence ?? [],
    caseStudy: base.caseStudy ?? {},
  };
}

async function saveProject(projectId: string, mutate: (p: ProjectProgress) => void): Promise<void> {
  const p = await loadProject(projectId);
  mutate(p);
  p.lastActivityAt = new Date().toISOString();
  if (!p.startedAt) p.startedAt = p.lastActivityAt;
  if (p.status === 'not_started') p.status = 'in_progress';
  await storage.put('projectProgress', p);
}

export const ProjectTaskRepository = {
  async getProgress(projectId: string): Promise<Record<string, TaskProgress>> {
    const p = await loadProject(projectId);
    return p.tasks;
  },
  async get(projectId: string, taskId: string): Promise<TaskProgress | undefined> {
    const p = await loadProject(projectId);
    return p.tasks[taskId];
  },
  async setCompleted(projectId: string, taskId: string, completed: boolean): Promise<void> {
    await saveProject(projectId, (p) => {
      const current = p.tasks[taskId] ?? { completed: false, notes: '' };
      p.tasks[taskId] = { ...current, completed };
    });
  },
  async setNotes(projectId: string, taskId: string, notes: string): Promise<void> {
    await saveProject(projectId, (p) => {
      const current = p.tasks[taskId] ?? { completed: false, notes: '' };
      p.tasks[taskId] = { ...current, notes };
    });
  },
};

export const ProjectPrerequisiteRepository = {
  async get(projectId: string): Promise<string[]> {
    const p = await loadProject(projectId);
    return p.prerequisitesCompleted;
  },
  async toggle(projectId: string, prerequisiteId: string, done: boolean): Promise<void> {
    await saveProject(projectId, (p) => {
      p.prerequisitesCompleted = done
        ? [...new Set([...p.prerequisitesCompleted, prerequisiteId])]
        : p.prerequisitesCompleted.filter((id) => id !== prerequisiteId);
    });
  },
};

export const ProjectObjectiveRepository = {
  async get(projectId: string): Promise<string[]> {
    const p = await loadProject(projectId);
    return p.objectivesCompleted;
  },
  async toggle(projectId: string, objectiveId: string, done: boolean): Promise<void> {
    await saveProject(projectId, (p) => {
      p.objectivesCompleted = done
        ? [...new Set([...p.objectivesCompleted, objectiveId])]
        : p.objectivesCompleted.filter((id) => id !== objectiveId);
    });
  },
};

export const ProjectLabRepository = {
  async get(projectId: string): Promise<Record<string, LabState>> {
    const p = await loadProject(projectId);
    return p.labs;
  },
  async getOne(projectId: string, labId: string): Promise<LabState | undefined> {
    const p = await loadProject(projectId);
    return p.labs[labId];
  },
  async save(projectId: string, labId: string, state: LabState): Promise<void> {
    await saveProject(projectId, (p) => {
      p.labs[labId] = state;
    });
  },
  async setStatus(projectId: string, labId: string, status: LabState['status']): Promise<void> {
    await saveProject(projectId, (p) => {
      const now = new Date().toISOString();
      const current = p.labs[labId] ?? { status: 'not_started' as const, githubUrl: '', notes: '', timeSpentMinutes: 0, evidence: '' };
      p.labs[labId] = {
        ...current,
        status,
        startedAt: current.startedAt ?? (status === 'in_progress' ? now : undefined),
        completedAt: status === 'completed' ? now : current.completedAt,
      };
    });
  },
};

export const ProjectExperimentRepository = {
  async get(projectId: string): Promise<ProjectExperimentResult[]> {
    const p = await loadProject(projectId);
    return p.experiments;
  },
  async add(projectId: string, result: ProjectExperimentResult): Promise<void> {
    await saveProject(projectId, (p) => {
      p.experiments = [...p.experiments, result];
      p.evaluation = { ...p.evaluation, ...result.metrics };
    });
  },
  async remove(projectId: string, id: string): Promise<void> {
    await saveProject(projectId, (p) => {
      p.experiments = p.experiments.filter((e) => e.id !== id);
    });
  },
};

export const ProjectJournalRepository = {
  async get(projectId: string): Promise<ProjectJournalEntry[]> {
    const p = await loadProject(projectId);
    return p.journal;
  },
  async add(projectId: string, entry: ProjectJournalEntry): Promise<void> {
    await saveProject(projectId, (p) => {
      p.journal = [...p.journal, entry];
      p.timeSpentMinutes += entry.hours * 60;
    });
  },
  async remove(projectId: string, entryId: string): Promise<void> {
    await saveProject(projectId, (p) => {
      p.journal = p.journal.filter((e) => e.id !== entryId);
    });
  },
};

export const ProjectEvidenceRepository = {
  async get(projectId: string): Promise<ProjectEvidenceItem[]> {
    const p = await loadProject(projectId);
    return p.evidence;
  },
  async add(projectId: string, evidence: ProjectEvidenceItem): Promise<void> {
    await saveProject(projectId, (p) => {
      p.evidence = [...p.evidence, evidence];
    });
  },
  async remove(projectId: string, evidenceId: string): Promise<void> {
    await saveProject(projectId, (p) => {
      p.evidence = p.evidence.filter((e) => e.id !== evidenceId);
    });
  },
};

export const ProjectADRRepository = {
  async get(projectId: string): Promise<ProjectADR[]> {
    const p = await loadProject(projectId);
    return p.adrs;
  },
  async add(projectId: string, adr: ProjectADR): Promise<void> {
    await saveProject(projectId, (p) => {
      p.adrs = [...p.adrs, adr];
    });
  },
  async setStatus(projectId: string, adrId: string, status: ProjectADR['status']): Promise<void> {
    await saveProject(projectId, (p) => {
      p.adrs = p.adrs.map((a) => (a.id === adrId ? { ...a, status } : a));
    });
  },
  async remove(projectId: string, adrId: string): Promise<void> {
    await saveProject(projectId, (p) => {
      p.adrs = p.adrs.filter((a) => a.id !== adrId);
    });
  },
};

export const ProjectChecklistRepository = {
  async toggle(projectId: string, key: 'testingCompleted' | 'securityCompleted' | 'deploymentCompleted', itemId: string, done: boolean): Promise<void> {
    await saveProject(projectId, (p) => {
      const list = p[key];
      p[key] = done
        ? [...new Set([...list, itemId])]
        : list.filter((id) => id !== itemId);
    });
  },
};

export const ProjectMiscRepository = {
  async saveContextAnswer(projectId: string, questionId: string, answer: string): Promise<void> {
    await saveProject(projectId, (p) => {
      p.contextEngineering[questionId] = answer;
    });
  },
  async saveTechDecision(projectId: string, techId: string, choice: string): Promise<void> {
    await saveProject(projectId, (p) => {
      p.technologyDecisions[techId] = choice;
    });
  },
  async saveEvaluationMetric(projectId: string, key: string, value: number | null): Promise<void> {
    await saveProject(projectId, (p) => {
      p.evaluation[key] = value;
    });
  },
  async saveRepositoryStep(projectId: string, repoId: string, stepId: string, done: boolean): Promise<void> {
    await saveProject(projectId, (p) => {
      const current = p.repositories[repoId] ?? [];
      p.repositories[repoId] = done
        ? [...new Set([...current, stepId])]
        : current.filter((id) => id !== stepId);
    });
  },
  async saveCaseStudyField(projectId: string, field: string, value: string): Promise<void> {
    await saveProject(projectId, (p) => {
      p.caseStudy[field] = value;
    });
  },
  async saveNotes(projectId: string, notes: string): Promise<void> {
    await saveProject(projectId, (p) => {
      p.notes = notes;
    });
  },
  async saveLinks(projectId: string, githubUrl: string, demoUrl: string): Promise<void> {
    await saveProject(projectId, (p) => {
      p.githubUrl = githubUrl;
      p.demoUrl = demoUrl;
    });
  },
  async setStatus(projectId: string, status: ProjectStatusValue): Promise<void> {
    await saveProject(projectId, (p) => {
      p.status = status;
      if (status === 'project_complete' || status === 'portfolio_ready' || status === 'interview_ready') {
        p.completedAt = new Date().toISOString();
      }
      if (status === 'not_started') {
        p.completedAt = undefined;
      }
    });
  },
};

export async function deleteProjectProgress(projectId: string): Promise<void> {
  await storage.delete('projectProgress', projectId);
}

export const ProjectExportRepository = {
  async exportData(projectId: string): Promise<ProjectProgress> {
    return loadProject(projectId);
  },
  async importData(projectId: string, data: unknown): Promise<void> {
    const p = data as ProjectProgress;
    const merged: ProjectProgress = {
      ...defaultProjectProgress(projectId),
      ...p,
      projectId,
      tasks: p.tasks ?? {},
      labs: p.labs ?? {},
      experiments: p.experiments ?? [],
      evaluation: p.evaluation ?? {},
      testingCompleted: p.testingCompleted ?? [],
      securityCompleted: p.securityCompleted ?? [],
      deploymentCompleted: p.deploymentCompleted ?? [],
      contextEngineering: p.contextEngineering ?? {},
      technologyDecisions: p.technologyDecisions ?? {},
      repositories: p.repositories ?? {},
      journal: p.journal ?? [],
      adrs: p.adrs ?? [],
      evidence: p.evidence ?? [],
      caseStudy: p.caseStudy ?? {},
    };
    await storage.put('projectProgress', merged);
  },
};

export { loadProject };