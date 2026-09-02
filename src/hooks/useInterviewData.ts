import { useCallback, useEffect, useState } from 'react';
import type {
  InterviewQuestion,
  InterviewAttempt,
  MockInterview,
  SystemDesignPractice,
  CodingAttemptRecord,
  RubricScores,
  InterviewConfidence,
} from '@/types';
import {
  InterviewQuestionRepository,
  InterviewAttemptRepository,
  MockInterviewRepository,
  SystemDesignRepository,
  CodingChallengeRepository,
  importInterviewData,
  createMockInterview,
  type MockConfig,
} from '@/lib/storage/interviewRepositories';
import {
  computeReadiness,
  buildTodayPractice,
  groupAttempts,
  computeRubricOverall,
  confidenceFromScore,
  scheduleNextReview,
  pickQuestionsForMock,
  type ReadinessModel,
  type DailyPracticeItem,
} from '@/lib/interviewReadiness';
import { generateId } from '@/lib/storage';

export type InterviewData = {
  questions: InterviewQuestion[];
  attempts: InterviewAttempt[];
  mockInterviews: MockInterview[];
  systemDesigns: SystemDesignPractice[];
  codingAttempts: CodingAttemptRecord[];
  readiness: ReadinessModel;
  today: { items: DailyPracticeItem[]; minutes: number };
  loaded: boolean;
  refresh: () => Promise<void>;
  submitAttempt: (payload: {
    questionId: string;
    answer: string;
    scores: RubricScores;
    timeTakenSeconds: number;
    confidenceBefore: InterviewConfidence;
    reviewedIdeal: boolean;
    notes: string;
  }) => Promise<void>;
  startMock: (config: MockConfig) => Promise<string>;
  saveMock: (mock: MockInterview) => Promise<void>;
  deleteMock: (id: string) => Promise<void>;
  saveSystemDesign: (practice: SystemDesignPractice) => Promise<void>;
  deleteSystemDesign: (id: string) => Promise<void>;
  saveCodingAttempt: (attempt: CodingAttemptRecord) => Promise<void>;
  deleteCodingAttempt: (id: string) => Promise<void>;
  importData: (data: Record<string, unknown[]>) => Promise<void>;
};

export function useInterviewData(): InterviewData {
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [attempts, setAttempts] = useState<InterviewAttempt[]>([]);
  const [mockInterviews, setMockInterviews] = useState<MockInterview[]>([]);
  const [systemDesigns, setSystemDesigns] = useState<SystemDesignPractice[]>([]);
  const [codingAttempts, setCodingAttempts] = useState<CodingAttemptRecord[]>([]);
  const [readiness, setReadiness] = useState<ReadinessModel | null>(null);
  const [today, setToday] = useState<{ items: DailyPracticeItem[]; minutes: number }>({ items: [], minutes: 0 });
  const [loaded, setLoaded] = useState(false);

  const refresh = useCallback(async () => {
    const [qs, ats, mocks, sds, codes] = await Promise.all([
      InterviewQuestionRepository.getAll(),
      InterviewAttemptRepository.getAll(),
      MockInterviewRepository.getAll(),
      SystemDesignRepository.getAll(),
      CodingChallengeRepository.getAll(),
    ]);
    setQuestions(qs);
    setAttempts(ats);
    setMockInterviews(mocks);
    setSystemDesigns(sds);
    setCodingAttempts(codes);
    const completedMocks = mocks.filter((m) => m.status === 'completed').length;
    setReadiness(computeReadiness(qs, ats, sds, codes, completedMocks));
    const { latest } = groupAttempts(ats);
    setToday(buildTodayPractice(qs, latest));
    setLoaded(true);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const submitAttempt = useCallback(async (payload: {
    questionId: string;
    answer: string;
    scores: RubricScores;
    timeTakenSeconds: number;
    confidenceBefore: InterviewConfidence;
    reviewedIdeal: boolean;
    notes: string;
  }) => {
    const q = await InterviewQuestionRepository.get(payload.questionId);
    if (!q) return;
    const overallScore = computeRubricOverall(payload.scores);
    const attempt: InterviewAttempt = {
      id: generateId(),
      questionId: q.id,
      answer: payload.answer,
      scores: payload.scores,
      overallScore,
      manualAdjusted: false,
      timeTakenSeconds: payload.timeTakenSeconds,
      confidenceBefore: payload.confidenceBefore,
      reviewedIdeal: payload.reviewedIdeal,
      notes: payload.notes,
      createdAt: new Date().toISOString(),
    };
    await InterviewAttemptRepository.add(attempt);

    const nextConfidence = confidenceFromScore(overallScore, q.reviewCount + 1, q.correctInARow + (overallScore >= 70 ? 1 : 0));
    const next: InterviewQuestion = {
      ...q,
      myAnswer: payload.answer,
      notes: payload.notes,
      reviewCount: q.reviewCount + 1,
      correctInARow: overallScore >= 70 ? q.correctInARow + 1 : 0,
      bestScore: Math.max(q.bestScore, overallScore),
      confidence: nextConfidence,
      lastReviewedAt: new Date().toISOString(),
    };
    scheduleNextReview(next, overallScore);
    await InterviewQuestionRepository.save(next);
    await refresh();
  }, [refresh]);

  const startMock = useCallback(async (config: MockConfig): Promise<string> => {
    const { latest } = groupAttempts(attempts);
    const picked = pickQuestionsForMock(questions, config.type, config.difficulty, config.count, latest);
    const chosen = picked.length > 0 ? picked : questions.slice(0, config.count);
    if (chosen.length === 0) {
      throw new Error('No questions available for this mock interview type.');
    }
    const mock = await createMockInterview(config, chosen.map((q) => q.id));
    await refresh();
    return mock.id;
  }, [attempts, questions, refresh]);

  const saveMock = useCallback(async (mock: MockInterview) => {
    await MockInterviewRepository.save(mock);
    await refresh();
  }, [refresh]);

  return {
    questions,
    attempts,
    mockInterviews,
    systemDesigns,
    codingAttempts,
    readiness: readiness ?? {
      overall: 0, technical: 0, coding: 0, agentic: 0, contextEngineering: 0, systemDesign: 0, behavioral: 0,
      weights: [], categoryBreakdown: [], attemptedQuestions: 0, masteredCount: 0, avgScore: 0,
      mockInterviews: 0, systemDesigns: 0, codingChallenges: 0, streak: 0, weakAreas: [], strongAreas: [],
    },
    today,
    loaded,
    refresh,
    submitAttempt,
    startMock,
    saveMock,
    deleteMock: async (id) => {
      await MockInterviewRepository.delete(id);
      await refresh();
    },
    saveSystemDesign: async (practice) => {
      await SystemDesignRepository.save(practice);
      await refresh();
    },
    deleteSystemDesign: async (id) => {
      await SystemDesignRepository.delete(id);
      await refresh();
    },
    saveCodingAttempt: async (attempt) => {
      await CodingChallengeRepository.save(attempt);
      await refresh();
    },
    deleteCodingAttempt: async (id) => {
      await CodingChallengeRepository.delete(id);
      await refresh();
    },
    importData: async (data) => {
      await importInterviewData(data);
      await refresh();
    },
  };
}