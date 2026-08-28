import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'proj-1',
    title: 'Production RAG Agent',
    description: 'A production-ready Retrieval-Augmented Generation agent with evaluation, monitoring, and guardrails.',
    problem: 'Build an AI system that can accurately answer questions from a knowledge base while handling edge cases and failures gracefully.',
    architecture: 'Document ingestion pipeline → Chunking & embedding → Vector store → Retrieval → Reranking → LLM generation → Evaluation',
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'OpenAI', 'LangGraph', 'Docker'],
    skillIds: ['rag', 'chunking', 'vector-databases', 'retrieval', 'evaluation'],
    githubUrl: '',
    demoUrl: '',
    screenshots: [],
    benchmarks: [],
    status: 'planned',
    featured: true,
    startDate: '2026-02-01',
  },
  {
    id: 'proj-2',
    title: 'Context Engineering Lab',
    description: 'An experiment dashboard for testing and comparing different context engineering strategies.',
    problem: 'Understand how different context management approaches affect LLM performance, cost, and latency.',
    architecture: 'Experiment runner → Multiple context strategies → Metrics collection → Comparison dashboard',
    technologies: ['Python', 'React', 'TypeScript', 'Recharts', 'OpenAI', 'IndexedDB'],
    skillIds: ['context-compression', 'context-pruning', 'context-ranking', 'working-memory'],
    githubUrl: '',
    demoUrl: '',
    screenshots: [],
    benchmarks: [],
    status: 'planned',
    featured: true,
    startDate: '2026-03-01',
  },
  {
    id: 'proj-3',
    title: 'Multi-Agent Research System',
    description: 'A system of coordinated AI agents that research topics and produce comprehensive reports.',
    problem: 'Automate deep research on complex topics using multiple specialized agents working together.',
    architecture: 'Orchestrator → Research Agent → Analysis Agent → Writing Agent → Review Agent → Output',
    technologies: ['Python', 'LangGraph', 'OpenAI', 'Anthropic', 'FastAPI'],
    skillIds: ['multi-agent-systems', 'planning', 'handoffs', 'state-management'],
    githubUrl: '',
    demoUrl: '',
    screenshots: [],
    benchmarks: [],
    status: 'planned',
    featured: true,
    startDate: '2026-04-01',
  },
  {
    id: 'proj-4',
    title: 'MCP Business Agent',
    description: 'An AI agent using Model Context Protocol to integrate with business tools and data sources.',
    problem: 'Create an agent that can seamlessly interact with multiple business tools through a standardized protocol.',
    architecture: 'MCP Client → Tool Servers → Business APIs → Agent Logic → Response Generation',
    technologies: ['Python', 'MCP SDK', 'FastAPI', 'React', 'TypeScript'],
    skillIds: ['tools', 'agent-loops', 'guardrails'],
    githubUrl: '',
    demoUrl: '',
    screenshots: [],
    benchmarks: [],
    status: 'planned',
    featured: true,
    startDate: '2026-05-01',
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter(p => p.featured);
}
