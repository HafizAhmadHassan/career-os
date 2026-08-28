import type { Contribution } from '@/types';

export const contributions: Contribution[] = [];

export function getContributionById(id: string): Contribution | undefined {
  return contributions.find(c => c.id === id);
}
