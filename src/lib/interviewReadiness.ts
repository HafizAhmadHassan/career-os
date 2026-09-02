import type {
  InterviewQuestion,
  InterviewAttempt,
  RubricScores,
  InterviewConfidence,
  SystemDesignPractice,
  CodingAttemptRecord,
  QuestionType,
  QuestionDifficulty,
  MockInterviewType,
} from '@/types';
import { rubricKeys } from '@/types';
import { skills, getSkillById } from '@/data/skills';

export const readinessWeights = [
  { key: 'conceptual', label: 'Conceptual knowledge', weight: 0.2 },
  { key: 'practical', label: 'Practical problem solving', weight: 0.2 },
  { key: 'project', label: 'Project understanding', weight: 0.2 },
  { key: 'systemDesign', label: 'System design', weight: 0.2 },
  { key: 'communication', label: 'Communication', weight: 0.1 },
  { key: 'behavioral', label: 'Behavioral', weight: 0.1 },
] as const;

export const confidenceMeta: Record<InterviewConfidence, { label: string; tone: string }> = {
  not_attempted: { label: 'Not attempted', tone: 'bg-secondary text-muted-foreground' },
  weak: { label: 'Weak', tone: 'bg-red-500/15 text-red-500' },
  learning: { label: 'Learning', tone: 'bg-amber-500/15 text-amber-600' },
  good: { label: 'Good', tone: 'bg-blue-500/15 text-blue-500' },
  strong: { label: 'Strong', tone: 'bg-green-500/15 text-green-600' },
  interview_ready: { label: 'Interview ready', tone: 'bg-emerald-500/20 text-emerald-500' },
};

export function computeRubricOverall(scores: RubricScores): number {
  const values = rubricKeys.map((k) => scores[k]);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  return Math.round(avg * 20);
}

export function srsDaysForScore(score: number): number {
  if (score >= 85) return 30;
  if (score >= 70) return 7;
  if (score >= 50) return 3;
  return 1;
}

export function confidenceFromScore(score: number, attempts: number, correctInARow: number): InterviewConfidence {
  if (attempts === 0) return 'not_attempted';
  if (score >= 85 && attempts >= 3 && correctInARow >= 3) return 'interview_ready';
  if (score >= 70 && attempts >= 2) return 'strong';
  if (score >= 55) return 'good';
  if (score >= 40) return 'learning';
  return 'weak';
}

export function scheduleNextReview(question: InterviewQuestion, score: number): void {
  const days = srsDaysForScore(score);
  const d = new Date();
  d.setDate(d.getDate() + days);
  question.dueDate = d.toISOString();
}

export type AttemptById = Record<string, InterviewAttempt[]>;

export function groupAttempts(attempts: InterviewAttempt[]): { byQuestion: AttemptById; latest: Map<string, InterviewAttempt> } {
  const byQuestion: AttemptById = {};
  for (const a of attempts) {
    (byQuestion[a.questionId] ??= []).push(a);
  }
  const latest = new Map<string, InterviewAttempt>();
  for (const [qid, list] of Object.entries(byQuestion)) {
    list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    latest.set(qid, list[0]);
  }
  return { byQuestion, latest };
}

export type CategoryScore = { category: string; score: number; attempted: number; questionCount: number };

export function categoryScores(questions: InterviewQuestion[], latest: Map<string, InterviewAttempt>): CategoryScore[] {
  const map = new Map<string, { total: number; count: number; attempted: number }>();
  for (const q of questions) {
    const entry = map.get(q.category) ?? { total: 0, count: 0, attempted: 0 };
    entry.count += 1;
    const attempt = latest.get(q.id);
    if (attempt) {
      entry.total += attempt.overallScore;
      entry.attempted += 1;
    } else {
      entry.total += 0;
    }
    map.set(q.category, entry);
  }
  return [...map.entries()].map(([category, e]) => ({
    category,
    score: e.attempted > 0 ? Math.round(e.total / e.attempted) : 0,
    attempted: e.attempted,
    questionCount: e.count,
  }));
}

function mean(list: number[]): number {
  if (list.length === 0) return 0;
  return Math.round(list.reduce((a, b) => a + b, 0) / list.length);
}

export type ReadinessModel = {
  overall: number;
  technical: number;
  coding: number;
  agentic: number;
  contextEngineering: number;
  systemDesign: number;
  behavioral: number;
  weights: { key: string; label: string; weight: number; value: number }[];
  categoryBreakdown: CategoryScore[];
  attemptedQuestions: number;
  masteredCount: number;
  avgScore: number;
  mockInterviews: number;
  systemDesigns: number;
  codingChallenges: number;
  streak: number;
  weakAreas: string[];
  strongAreas: string[];
};

export function computeReadiness(
  questions: InterviewQuestion[],
  attempts: InterviewAttempt[],
  systemPractices: SystemDesignPractice[],
  codingAttempts: CodingAttemptRecord[],
  mockCount: number,
): ReadinessModel {
  const { latest } = groupAttempts(attempts);

  const scoreOf = (q: InterviewQuestion): number => latest.get(q.id)?.overallScore ?? 0;

  const conceptual = mean(questions.filter((q) => q.type === 'conceptual').map(scoreOf));
  const practical = mean(questions.filter((q) => q.type === 'practical' || q.type === 'debugging').map(scoreOf));
  const project = mean(questions.filter((q) => q.relatedProjectId).map(scoreOf));
  const sdQuestions = mean(questions.filter((q) => q.category === 'System Design').map(scoreOf));
  const communication = mean(rubricScoresFor(attempts, 'communication'));
  const behavioral = mean(questions.filter((q) => q.category === 'Behavioral').map(scoreOf));

  const sdPractices = mean(systemPractices.map((p) => {
    const vals = Object.values(p.rubricScores);
    if (vals.length === 0) return 0;
    return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 20);
  }));
  const systemDesign = mean([sdQuestions, sdPractices].filter((v) => v > 0));

  const codingQuestionScore = mean(questions.filter((q) => q.type === 'coding').map(scoreOf));
  const codingChallengeScore = mean(codingAttempts.map((c) => c.totalTests > 0 ? Math.round((c.testsPassed / c.totalTests) * 100) : 0));
  const coding = mean([codingQuestionScore, codingChallengeScore].filter((v) => v > 0));

  const weights = readinessWeights.map((w) => {
    let value: number;
    switch (w.key) {
      case 'conceptual': value = conceptual; break;
      case 'practical': value = practical; break;
      case 'project': value = project; break;
      case 'systemDesign': value = systemDesign; break;
      case 'communication': value = communication; break;
      case 'behavioral': value = behavioral; break;
    }
    return { key: w.key, label: w.label, weight: w.weight, value };
  });

  const overall = weights.reduce((sum, w) => sum + w.value * w.weight, 0) / weights.reduce((sum, w) => sum + w.weight, 0);

  const agentic = mean(questions.filter((q) => q.category === 'Agentic AI').map(scoreOf));
  const context = mean(questions.filter((q) => q.category === 'Context Engineering').map(scoreOf));

  const { byQuestion } = groupAttempts(attempts);
  const attemptedQuestions = Object.keys(byQuestion).length;
  const masteredCount = questions.filter((q) => q.confidence === 'interview_ready').length;
  const avgScore = attempts.length ? Math.round(attempts.reduce((a, b) => a + b.overallScore, 0) / attempts.length) : 0;

  const breakdown = categoryScores(questions, latest);
  const weakAreas = breakdown.filter((c) => c.attempted > 0 && c.score < 60).map((c) => c.category);
  const strongAreas = breakdown.filter((c) => c.attempted > 0 && c.score >= 80).map((c) => c.category);

  return {
    overall: Math.round(overall),
    technical: mean([conceptual, practical, project, systemDesign].filter((v) => v > 0)),
    coding,
    agentic,
    contextEngineering: context,
    systemDesign,
    behavioral,
    weights,
    categoryBreakdown: breakdown,
    attemptedQuestions,
    masteredCount,
    avgScore,
    mockInterviews: mockCount,
    systemDesigns: systemPractices.length,
    codingChallenges: codingAttempts.length,
    streak: computeStreak(attempts),
    weakAreas,
    strongAreas,
  };
}

function rubricScoresFor(attempts: InterviewAttempt[], key: keyof RubricScores): number[] {
  return attempts.map((a) => a.scores[key] * 20);
}

export function computeStreak(attempts: InterviewAttempt[]): number {
  const days = new Set(attempts.map((a) => a.createdAt.slice(0, 10)));
  if (days.size === 0) return 0;
  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  const today = fmt(new Date());
  let cursor = new Date();
  if (!days.has(today)) {
    cursor.setDate(cursor.getDate() - 1);
  }
  let streak = 0;
  while (days.has(fmt(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export type DailyPracticeItem = { question: InterviewQuestion; reason: string };

export function buildTodayPractice(questions: InterviewQuestion[], latest: Map<string, InterviewAttempt>, count = 4): { items: DailyPracticeItem[]; minutes: number } {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = questions
    .filter((q) => q.dueDate && new Date(q.dueDate) <= today)
    .sort((a, b) => (a.dueDate ?? '').localeCompare(b.dueDate ?? ''));
  const picked: InterviewQuestion[] = [];
  const reasons: string[] = [];

  for (const q of due) {
    if (picked.length >= count) break;
    picked.push(q);
    reasons.push('Due for review (spaced repetition)');
  }

  if (picked.length < count) {
    const weakest = categoryScores(questions, latest)
      .filter((c) => c.attempted === 0 || c.score < 60)
      .sort((a, b) => a.score - b.score)
      .map((c) => c.category);
    const remaining = questions.filter((q) => !picked.includes(q));
    const ordered = [...new Set(weakest)].length > 0
      ? remaining.filter((q) => weakest.includes(q.category)).concat(remaining.filter((q) => !weakest.includes(q.category)))
      : remaining;
    for (const q of ordered) {
      if (picked.length >= count) break;
      picked.push(q);
      reasons.push(weakest.includes(q.category) ? 'Weakest area — practice to improve' : 'Fill for today');
    }
  }

  return {
    items: picked.slice(0, count).map((q, i) => ({ question: q, reason: reasons[i] ?? 'Recommended' })),
    minutes: Math.min(picked.length, count) * 5,
  };
}

export function pickQuestionsForMock(
  questions: InterviewQuestion[],
  type: MockInterviewType,
  difficulty: QuestionDifficulty,
  count: number,
  latest: Map<string, InterviewAttempt>,
): InterviewQuestion[] {
  const byType: Partial<Record<MockInterviewType, (q: InterviewQuestion) => boolean>> = {
    technical: (q) => q.type !== 'behavioral' && q.category !== 'Behavioral' && q.type !== 'coding',
    system_design: (q) => q.category === 'System Design' || q.type === 'architecture' || q.type === 'trade_off',
    coding: (q) => q.type === 'coding',
    behavioral: (q) => q.category === 'Behavioral',
    mixed: () => true,
  };
  const filter = byType[type] ?? (() => true);
  let pool = questions.filter(filter);

  const difficulties: QuestionDifficulty[] = ['beginner', 'intermediate', 'advanced', 'senior', 'staff'];
  const idx = difficulties.indexOf(difficulty);
  const allowed = difficulties.slice(Math.max(0, idx - 1), idx + 2);
  if (type !== 'mixed') {
    pool = pool.filter((q) => allowed.includes(q.difficulty));
  }

  const scored = pool.map((q) => ({
    q,
    score: latest.get(q.id)?.overallScore ?? 0,
    due: q.dueDate ? new Date(q.dueDate).getTime() : 0,
  }));
  scored.sort((a, b) => a.score - b.score || a.due - b.due);
  return scored.slice(0, count).map((s) => s.q);
}

export function questioningTypeLabel(type: QuestionType): string {
  return type.replace(/_/g, ' ');
}

export function getQuestionsByCategoryName(questions: InterviewQuestion[], category: string): InterviewQuestion[] {
  return questions.filter((q) => q.category === category);
}

export { getSkillById, skills };