import type { Certification } from '@/types';

export const certifications: Certification[] = [];

export function getCertificationById(id: string): Certification | undefined {
  return certifications.find(c => c.id === id);
}
