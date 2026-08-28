import type { Experiment } from '@/types';

export const experiments: Experiment[] = [
  {
    id: 'exp-1',
    name: 'Full Context Baseline',
    description: 'Pass entire conversation history to the LLM without any compression or pruning.',
    type: 'context_strategy',
    metrics: { accuracy: 0.85, tokens: 8000, cost: 0.24, latency: 2500, contextRelevance: 0.7, failureRate: 0.05 },
    date: '2026-01-20',
    notes: 'Baseline measurement for comparison.',
    projectId: 'proj-2',
  },
  {
    id: 'exp-2',
    name: 'Sliding Window Memory',
    description: 'Keep only the last N messages as context.',
    type: 'context_strategy',
    metrics: { accuracy: 0.78, tokens: 3000, cost: 0.09, latency: 1200, contextRelevance: 0.65, failureRate: 0.08 },
    date: '2026-01-21',
    notes: 'Good for cost reduction but loses early context.',
    projectId: 'proj-2',
  },
  {
    id: 'exp-3',
    name: 'Summary Memory',
    description: 'Maintain a running summary of the conversation.',
    type: 'context_strategy',
    metrics: { accuracy: 0.82, tokens: 2500, cost: 0.075, latency: 1400, contextRelevance: 0.75, failureRate: 0.06 },
    date: '2026-01-22',
    notes: 'Good balance of cost and performance.',
    projectId: 'proj-2',
  },
  {
    id: 'exp-4',
    name: 'Retrieval Memory',
    description: 'Store all messages and retrieve relevant ones based on the current query.',
    type: 'context_strategy',
    metrics: { accuracy: 0.88, tokens: 4000, cost: 0.12, latency: 1800, contextRelevance: 0.85, failureRate: 0.04 },
    date: '2026-01-23',
    notes: 'Best accuracy but higher latency.',
    projectId: 'proj-2',
  },
  {
    id: 'exp-5',
    name: 'Context Compression',
    description: 'Compress older messages into dense representations.',
    type: 'context_strategy',
    metrics: { accuracy: 0.84, tokens: 2000, cost: 0.06, latency: 1600, contextRelevance: 0.8, failureRate: 0.05 },
    date: '2026-01-24',
    notes: 'Excellent cost-to-accuracy ratio.',
    projectId: 'proj-2',
  },
];

export function getExperimentById(id: string): Experiment | undefined {
  return experiments.find(e => e.id === id);
}

export function getExperimentsByProject(projectId: string): Experiment[] {
  return experiments.filter(e => e.projectId === projectId);
}
