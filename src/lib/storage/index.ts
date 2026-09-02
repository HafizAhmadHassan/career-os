import { openDB, type IDBPDatabase } from 'idb';
import type {
  DailyLog,
  WeeklyReview,
  Goal,
  InterviewQuestion,
  InterviewAttempt,
  Experiment,
  TopicProgress,
  ProjectProgress,
  Article,
  WritingIdea,
  ResearchNote,
  MockInterview,
  SystemDesignPractice,
  CodingAttemptRecord,
} from '@/types';

const DB_NAME = 'career-os-db';
const DB_VERSION = 4;

export interface CareerOSDB {
  dailyLogs: DailyLog;
  weeklyReviews: WeeklyReview;
  goals: Goal;
  interviewQuestions: InterviewQuestion;
  interviewAttempts: InterviewAttempt;
  experiments: Experiment;
  topicProgress: TopicProgress;
  projectProgress: ProjectProgress;
  articles: Article;
  writingIdeas: WritingIdea;
  researchNotes: ResearchNote;
  mockInterviews: MockInterview;
  systemDesigns: SystemDesignPractice;
  codingChallenges: CodingAttemptRecord;
}

let dbPromise: Promise<IDBPDatabase<CareerOSDB>> | null = null;

export function getDB() {
  if (!dbPromise) {
    dbPromise = openDB<CareerOSDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('dailyLogs')) {
          db.createObjectStore('dailyLogs', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('weeklyReviews')) {
          db.createObjectStore('weeklyReviews', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('goals')) {
          db.createObjectStore('goals', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('interviewQuestions')) {
          db.createObjectStore('interviewQuestions', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('experiments')) {
          db.createObjectStore('experiments', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('topicProgress')) {
          db.createObjectStore('topicProgress', { keyPath: 'topicId' });
        }
        if (!db.objectStoreNames.contains('projectProgress')) {
          db.createObjectStore('projectProgress', { keyPath: 'projectId' });
        }
        if (!db.objectStoreNames.contains('articles')) {
          db.createObjectStore('articles', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('writingIdeas')) {
          db.createObjectStore('writingIdeas', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('researchNotes')) {
          db.createObjectStore('researchNotes', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('interviewAttempts')) {
          db.createObjectStore('interviewAttempts', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('mockInterviews')) {
          db.createObjectStore('mockInterviews', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('systemDesigns')) {
          db.createObjectStore('systemDesigns', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('codingChallenges')) {
          db.createObjectStore('codingChallenges', { keyPath: 'id' });
        }
      },
    });
  }
  return dbPromise;
}

export interface StorageProvider {
  getAll<T>(storeName: keyof CareerOSDB): Promise<T[]>;
  getById<T>(storeName: keyof CareerOSDB, id: string): Promise<T | undefined>;
  put<T>(storeName: keyof CareerOSDB, data: T): Promise<void>;
  delete(storeName: keyof CareerOSDB, id: string): Promise<void>;
  clear(storeName: keyof CareerOSDB): Promise<void>;
  exportAll(): Promise<Record<string, unknown[]>>;
  exportStores(stores: (keyof CareerOSDB)[]): Promise<Record<string, unknown[]>>;
  importAll(data: Record<string, unknown[]>): Promise<void>;
  importStores(stores: (keyof CareerOSDB)[], data: Record<string, unknown[]>): Promise<void>;
}

const EXPORT_STORES: (keyof CareerOSDB)[] = [
  'dailyLogs',
  'weeklyReviews',
  'goals',
  'interviewQuestions',
  'interviewAttempts',
  'experiments',
  'topicProgress',
  'projectProgress',
  'articles',
  'writingIdeas',
  'researchNotes',
  'mockInterviews',
  'systemDesigns',
  'codingChallenges',
];

export const WRITING_STORES: (keyof CareerOSDB)[] = [
  'articles',
  'writingIdeas',
  'researchNotes',
];

export const INTERVIEW_STORES: (keyof CareerOSDB)[] = [
  'interviewQuestions',
  'interviewAttempts',
  'mockInterviews',
  'systemDesigns',
  'codingChallenges',
];

class IndexedDBProvider implements StorageProvider {
  async getAll<T>(storeName: keyof CareerOSDB): Promise<T[]> {
    const db = await getDB();
    return db.getAll(storeName) as Promise<T[]>;
  }

  async getById<T>(storeName: keyof CareerOSDB, id: string): Promise<T | undefined> {
    const db = await getDB();
    return db.get(storeName, id) as Promise<T | undefined>;
  }

  async put<T>(storeName: keyof CareerOSDB, data: T): Promise<void> {
    const db = await getDB();
    await db.put(storeName, data);
  }

  async delete(storeName: keyof CareerOSDB, id: string): Promise<void> {
    const db = await getDB();
    await db.delete(storeName, id);
  }

  async clear(storeName: keyof CareerOSDB): Promise<void> {
    const db = await getDB();
    await db.clear(storeName);
  }

  async exportAll(): Promise<Record<string, unknown[]>> {
    const db = await getDB();
    const data: Record<string, unknown[]> = {};
    for (const store of EXPORT_STORES) {
      data[store] = await db.getAll(store);
    }
    return data;
  }

  async exportStores(stores: (keyof CareerOSDB)[]): Promise<Record<string, unknown[]>> {
    const db = await getDB();
    const data: Record<string, unknown[]> = {};
    for (const store of stores) {
      data[store] = await db.getAll(store);
    }
    return data;
  }

  async importAll(data: Record<string, unknown[]>): Promise<void> {
    const db = await getDB();
    const tx = db.transaction(EXPORT_STORES, 'readwrite');
    for (const storeName of EXPORT_STORES) {
      const items = data[storeName];
      const store = tx.objectStore(storeName);
      await store.clear();
      if (Array.isArray(items)) {
        for (const item of items) {
          await store.put(item);
        }
      }
    }
    await tx.done;
  }

  async importStores(stores: (keyof CareerOSDB)[], data: Record<string, unknown[]>): Promise<void> {
    const db = await getDB();
    const tx = db.transaction(stores, 'readwrite');
    for (const storeName of stores) {
      const items = data[storeName];
      const store = tx.objectStore(storeName);
      await store.clear();
      if (Array.isArray(items)) {
        for (const item of items) {
          await store.put(item);
        }
      }
    }
    await tx.done;
  }
}

export const storage: StorageProvider = new IndexedDBProvider();

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function downloadJSON(data: unknown, filename: string): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}