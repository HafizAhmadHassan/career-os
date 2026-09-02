import type {
  InterviewQuestion,
  InterviewAttempt,
  MockInterview,
  MockInterviewType,
  QuestionDifficulty,
  SystemDesignPractice,
  CodingAttemptRecord,
} from '@/types';
import { interviewConfidenceOrder } from '@/types';
import { storage, INTERVIEW_STORES } from './index';
import { downloadJSON } from './index';
import { seedInterviewQuestions } from '@/data/interviewQuestions';

function now(): string {
  return new Date().toISOString();
}

export function newId(prefix: string): string {
  return `${prefix}-${Date.now().toString()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function normalizeQuestion(q: InterviewQuestion): InterviewQuestion {
  return {
    ...q,
    myAnswer: q.myAnswer ?? '',
    notes: q.notes ?? '',
    confidence: interviewConfidenceOrder.includes(q.confidence) ? q.confidence : 'not_attempted',
    importantConcepts: q.importantConcepts ?? [],
    commonMistakes: q.commonMistakes ?? [],
    followUps: q.followUps ?? [],
    roadmapSlugs: q.roadmapSlugs ?? [],
    skillIds: q.skillIds ?? [],
    reviewCount: q.reviewCount ?? 0,
    correctInARow: q.correctInARow ?? 0,
    bestScore: q.bestScore ?? 0,
  };
}

export const InterviewQuestionRepository = {
  async getAll(): Promise<InterviewQuestion[]> {
    const stored = await storage.getAll<InterviewQuestion>('interviewQuestions');
    const storedById = new Map(stored.map((q) => [q.id, q]));
    return seedInterviewQuestions.map((seed) => {
      const s = storedById.get(seed.id);
      return s ? normalizeQuestion({ ...seed, ...s }) : normalizeQuestion({ ...seed });
    });
  },
  async get(id: string): Promise<InterviewQuestion | undefined> {
    const all = await this.getAll();
    return all.find((q) => q.id === id);
  },
  async save(question: InterviewQuestion): Promise<void> {
    await storage.put('interviewQuestions', normalizeQuestion(question));
  },
  async review(questionId: string, passed: boolean): Promise<void> {
    const q = await this.get(questionId);
    if (!q) return;
    const next = {
      ...q,
      reviewCount: q.reviewCount + 1,
      correctInARow: passed ? q.correctInARow + 1 : 0,
      lastReviewedAt: now(),
    };
    await this.save(next);
  },
};

export const InterviewAttemptRepository = {
  async getAll(): Promise<InterviewAttempt[]> {
    return storage.getAll<InterviewAttempt>('interviewAttempts');
  },
  async getForQuestion(questionId: string): Promise<InterviewAttempt[]> {
    const all = await storage.getAll<InterviewAttempt>('interviewAttempts');
    return all.filter((a) => a.questionId === questionId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
  async add(attempt: InterviewAttempt): Promise<void> {
    await storage.put('interviewAttempts', attempt);
  },
  async delete(id: string): Promise<void> {
    await storage.delete('interviewAttempts', id);
  },
};

export const MockInterviewRepository = {
  async getAll(): Promise<MockInterview[]> {
    const all = await storage.getAll<MockInterview>('mockInterviews');
    return all.sort((a, b) => b.startedAt.localeCompare(a.startedAt));
  },
  async get(id: string): Promise<MockInterview | undefined> {
    return storage.getById<MockInterview>('mockInterviews', id);
  },
  async save(mock: MockInterview): Promise<void> {
    await storage.put('mockInterviews', mock);
  },
  async delete(id: string): Promise<void> {
    await storage.delete('mockInterviews', id);
  },
};

export type MockConfig = {
  role: string;
  type: MockInterviewType;
  difficulty: QuestionDifficulty;
  count: number;
};

export async function createMockInterview(config: MockConfig, questionIds: string[]): Promise<MockInterview> {
  const mock: MockInterview = {
    id: newId('mock'),
    title: `${config.type.replace(/_/g, ' ')} / ${config.role}`,
    role: config.role,
    type: config.type,
    difficulty: config.difficulty,
    questionIds,
    results: [],
    status: 'in_progress',
    startedAt: now(),
  };
  await MockInterviewRepository.save(mock);
  return mock;
}

export const SystemDesignRepository = {
  async getAll(): Promise<SystemDesignPractice[]> {
    const all = await storage.getAll<SystemDesignPractice>('systemDesigns');
    return all.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
  async get(id: string): Promise<SystemDesignPractice | undefined> {
    return storage.getById<SystemDesignPractice>('systemDesigns', id);
  },
  async saveForProblem(problemId: string, practice: SystemDesignPractice): Promise<void> {
    await storage.put('systemDesigns', practice);
  },
  async save(practice: SystemDesignPractice): Promise<void> {
    await storage.put('systemDesigns', practice);
  },
  async delete(id: string): Promise<void> {
    await storage.delete('systemDesigns', id);
  },
};

export const CodingChallengeRepository = {
  async getAll(): Promise<CodingAttemptRecord[]> {
    const all = await storage.getAll<CodingAttemptRecord>('codingChallenges');
    return all.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
  async getForChallenge(challengeId: string): Promise<CodingAttemptRecord[]> {
    const all = await storage.getAll<CodingAttemptRecord>('codingChallenges');
    return all.filter((a) => a.challengeId === challengeId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
  async save(attempt: CodingAttemptRecord): Promise<void> {
    await storage.put('codingChallenges', attempt);
  },
  async delete(id: string): Promise<void> {
    await storage.delete('codingChallenges', id);
  },
};

export async function exportInterviewData(): Promise<void> {
  const data = await storage.exportStores(INTERVIEW_STORES);
  downloadJSON(data, 'interview-backup.json');
}

export async function importInterviewData(data: Record<string, unknown[]>): Promise<void> {
  await storage.importStores(INTERVIEW_STORES, data);
}