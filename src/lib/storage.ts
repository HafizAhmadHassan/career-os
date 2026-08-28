import { openDB, type IDBPDatabase } from 'idb';
import type {
  DailyLog,
  WeeklyReview,
  Goal,
  InterviewQuestion,
  Experiment,
} from '@/types';

const DB_NAME = 'career-os-db';
const DB_VERSION = 1;

interface CareerOSDB {
  dailyLogs: DailyLog;
  weeklyReviews: WeeklyReview;
  goals: Goal;
  interviewQuestions: InterviewQuestion;
  experiments: Experiment;
}

let dbPromise: Promise<IDBPDatabase<CareerOSDB>> | null = null;

function getDB() {
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
  importAll(data: Record<string, unknown[]>): Promise<void>;
}

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
    const stores = ['dailyLogs', 'weeklyReviews', 'goals', 'interviewQuestions', 'experiments'] as const;
    const data: Record<string, unknown[]> = {};
    for (const store of stores) {
      data[store] = await db.getAll(store);
    }
    return data;
  }

  async importAll(data: Record<string, unknown[]>): Promise<void> {
    const db = await getDB();
    const tx = db.transaction(
      ['dailyLogs', 'weeklyReviews', 'goals', 'interviewQuestions', 'experiments'],
      'readwrite'
    );
    for (const [storeName, items] of Object.entries(data)) {
      const store = tx.objectStore(storeName as keyof CareerOSDB);
      await store.clear();
      for (const item of items) {
        await store.put(item);
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
