import type { Goal } from '@/types';

export const goals: Goal[] = [];

export function getGoalById(id: string): Goal | undefined {
  return goals.find(g => g.id === id);
}
