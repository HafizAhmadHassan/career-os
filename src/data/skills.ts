import type { Skill, SkillCategory } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'software-engineering',
    name: 'Software Engineering',
    description: 'Core programming and software development fundamentals',
    skillIds: ['python', 'typescript', 'git', 'github', 'linux', 'rest-apis', 'fastapi', 'sql', 'postgresql', 'docker', 'testing', 'async-programming', 'system-design'],
    weight: 0.15,
  },
  {
    id: 'llm-engineering',
    name: 'LLM Engineering',
    description: 'Working with large language models and their APIs',
    skillIds: ['llm-apis', 'structured-outputs', 'function-calling', 'streaming', 'embeddings', 'token-management', 'model-selection', 'cost-optimization'],
    weight: 0.15,
  },
  {
    id: 'rag',
    name: 'RAG',
    description: 'Retrieval-Augmented Generation systems',
    skillIds: ['chunking', 'rag-embeddings', 'vector-databases', 'retrieval', 'hybrid-search', 'reranking', 'query-rewriting', 'metadata-filtering', 'retrieval-evaluation'],
    weight: 0.10,
  },
  {
    id: 'agentic-ai',
    name: 'Agentic AI',
    description: 'Building autonomous AI agent systems',
    skillIds: ['agent-loops', 'state-management', 'tools', 'planning', 'memory', 'handoffs', 'multi-agent-systems', 'human-in-the-loop', 'guardrails'],
    weight: 0.20,
  },
  {
    id: 'context-engineering',
    name: 'Context Engineering',
    description: 'Managing context for optimal AI performance',
    skillIds: ['context-selection', 'context-construction', 'context-compression', 'context-pruning', 'context-ranking', 'working-memory', 'long-term-memory', 'tool-result-management', 'retrieval-context', 'context-isolation', 'long-context-strategies', 'context-evaluation', 'prompt-injection-defense'],
    weight: 0.20,
  },
  {
    id: 'production-ai',
    name: 'Production AI',
    description: 'Deploying and operating AI systems in production',
    skillIds: ['evaluation', 'observability', 'tracing', 'monitoring', 'logging', 'cicd', 'security', 'authentication', 'authorization', 'caching'],
    weight: 0.10,
  },
  {
    id: 'cloud',
    name: 'Cloud',
    description: 'Cloud infrastructure and deployment',
    skillIds: ['cloud-cost-optimization'],
    weight: 0.05,
  },
  {
    id: 'open-source',
    name: 'Open Source',
    description: 'Open source contribution and community',
    skillIds: ['oss-contribution'],
    weight: 0.05,
  },
];

export const skills: Skill[] = [
  // Software Engineering
  { id: 'python', name: 'Python', category: 'software-engineering', level: 3, status: 'practicing', description: 'Core Python programming', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'typescript', name: 'TypeScript', category: 'software-engineering', level: 2, status: 'learning', description: 'TypeScript development', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'git', name: 'Git', category: 'software-engineering', level: 3, status: 'practicing', description: 'Version control', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'github', name: 'GitHub', category: 'software-engineering', level: 3, status: 'practicing', description: 'GitHub platform', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'linux', name: 'Linux', category: 'software-engineering', level: 2, status: 'learning', description: 'Linux systems', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'rest-apis', name: 'REST APIs', category: 'software-engineering', level: 3, status: 'practicing', description: 'RESTful API design', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'fastapi', name: 'FastAPI', category: 'software-engineering', level: 2, status: 'learning', description: 'FastAPI framework', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'sql', name: 'SQL', category: 'software-engineering', level: 2, status: 'learning', description: 'SQL databases', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'postgresql', name: 'PostgreSQL', category: 'software-engineering', level: 2, status: 'learning', description: 'PostgreSQL database', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'docker', name: 'Docker', category: 'software-engineering', level: 2, status: 'learning', description: 'Containerization', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'testing', name: 'Testing', category: 'software-engineering', level: 2, status: 'learning', description: 'Software testing', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'async-programming', name: 'Async Programming', category: 'software-engineering', level: 2, status: 'learning', description: 'Asynchronous programming', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'system-design', name: 'System Design', category: 'software-engineering', level: 1, status: 'learning', description: 'System architecture design', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },

  // LLM Engineering
  { id: 'llm-apis', name: 'LLM APIs', category: 'llm-engineering', level: 2, status: 'learning', description: 'Working with LLM APIs', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'structured-outputs', name: 'Structured Outputs', category: 'llm-engineering', level: 1, status: 'learning', description: 'Structured output from LLMs', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'function-calling', name: 'Function Calling', category: 'llm-engineering', level: 1, status: 'learning', description: 'LLM function calling', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'streaming', name: 'Streaming', category: 'llm-engineering', level: 1, status: 'not_started', description: 'Streaming responses', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'embeddings', name: 'Embeddings', category: 'llm-engineering', level: 2, status: 'learning', description: 'Text embeddings', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'token-management', name: 'Token Management', category: 'llm-engineering', level: 1, status: 'learning', description: 'Token optimization', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'model-selection', name: 'Model Selection', category: 'llm-engineering', level: 1, status: 'not_started', description: 'Choosing the right model', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'cost-optimization', name: 'Cost Optimization', category: 'llm-engineering', level: 1, status: 'not_started', description: 'LLM cost optimization', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },

  // RAG
  { id: 'chunking', name: 'Chunking', category: 'rag', level: 1, status: 'learning', description: 'Document chunking strategies', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'rag-embeddings', name: 'RAG Embeddings', category: 'rag', level: 1, status: 'learning', description: 'Embeddings for RAG', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'vector-databases', name: 'Vector Databases', category: 'rag', level: 1, status: 'not_started', description: 'Vector database systems', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'retrieval', name: 'Retrieval', category: 'rag', level: 1, status: 'not_started', description: 'Information retrieval', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'hybrid-search', name: 'Hybrid Search', category: 'rag', level: 0, status: 'not_started', description: 'Hybrid search strategies', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'reranking', name: 'Reranking', category: 'rag', level: 0, status: 'not_started', description: 'Result reranking', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'query-rewriting', name: 'Query Rewriting', category: 'rag', level: 0, status: 'not_started', description: 'Query transformation', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'metadata-filtering', name: 'Metadata Filtering', category: 'rag', level: 0, status: 'not_started', description: 'Metadata-based filtering', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'retrieval-evaluation', name: 'Retrieval Evaluation', category: 'rag', level: 0, status: 'not_started', description: 'Evaluating retrieval quality', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },

  // Agentic AI
  { id: 'agent-loops', name: 'Agent Loops', category: 'agentic-ai', level: 1, status: 'learning', description: 'Agent execution loops', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'state-management', name: 'State Management', category: 'agentic-ai', level: 1, status: 'learning', description: 'Agent state management', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'tools', name: 'Tools', category: 'agentic-ai', level: 1, status: 'learning', description: 'Agent tool use', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'planning', name: 'Planning', category: 'agentic-ai', level: 0, status: 'not_started', description: 'Agent planning', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'memory', name: 'Memory', category: 'agentic-ai', level: 0, status: 'not_started', description: 'Agent memory systems', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'handoffs', name: 'Handoffs', category: 'agentic-ai', level: 0, status: 'not_started', description: 'Agent handoffs', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'multi-agent-systems', name: 'Multi-Agent Systems', category: 'agentic-ai', level: 0, status: 'not_started', description: 'Multi-agent architectures', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'human-in-the-loop', name: 'Human-in-the-Loop', category: 'agentic-ai', level: 0, status: 'not_started', description: 'Human oversight in agents', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'guardrails', name: 'Guardrails', category: 'agentic-ai', level: 0, status: 'not_started', description: 'Agent safety guardrails', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },

  // Context Engineering
  { id: 'context-selection', name: 'Context Selection', category: 'context-engineering', level: 0, status: 'not_started', description: 'Selecting relevant context', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'context-construction', name: 'Context Construction', category: 'context-engineering', level: 0, status: 'not_started', description: 'Building effective context', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'context-compression', name: 'Context Compression', category: 'context-engineering', level: 0, status: 'not_started', description: 'Compressing context efficiently', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'context-pruning', name: 'Context Pruning', category: 'context-engineering', level: 0, status: 'not_started', description: 'Removing irrelevant context', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'context-ranking', name: 'Context Ranking', category: 'context-engineering', level: 0, status: 'not_started', description: 'Ranking context importance', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'working-memory', name: 'Working Memory', category: 'context-engineering', level: 0, status: 'not_started', description: 'Short-term context management', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'long-term-memory', name: 'Long-term Memory', category: 'context-engineering', level: 0, status: 'not_started', description: 'Persistent context storage', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'tool-result-management', name: 'Tool Result Management', category: 'context-engineering', level: 0, status: 'not_started', description: 'Managing tool outputs', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'retrieval-context', name: 'Retrieval Context', category: 'context-engineering', level: 0, status: 'not_started', description: 'Context from retrieval', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'context-isolation', name: 'Context Isolation', category: 'context-engineering', level: 0, status: 'not_started', description: 'Isolating context streams', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'long-context-strategies', name: 'Long-Context Strategies', category: 'context-engineering', level: 0, status: 'not_started', description: 'Handling long contexts', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'context-evaluation', name: 'Context Evaluation', category: 'context-engineering', level: 0, status: 'not_started', description: 'Evaluating context quality', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'prompt-injection-defense', name: 'Prompt Injection Defense', category: 'context-engineering', level: 0, status: 'not_started', description: 'Security against injection', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },

  // Production AI
  { id: 'evaluation', name: 'Evaluation', category: 'production-ai', level: 1, status: 'learning', description: 'AI system evaluation', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'observability', name: 'Observability', category: 'production-ai', level: 0, status: 'not_started', description: 'System observability', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'tracing', name: 'Tracing', category: 'production-ai', level: 0, status: 'not_started', description: 'Request tracing', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'monitoring', name: 'Monitoring', category: 'production-ai', level: 0, status: 'not_started', description: 'System monitoring', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'logging', name: 'Logging', category: 'production-ai', level: 1, status: 'learning', description: 'Structured logging', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'cicd', name: 'CI/CD', category: 'production-ai', level: 1, status: 'learning', description: 'Continuous integration/deployment', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'security', name: 'Security', category: 'production-ai', level: 1, status: 'learning', description: 'AI security practices', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'authentication', name: 'Authentication', category: 'production-ai', level: 1, status: 'learning', description: 'Auth systems', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'authorization', name: 'Authorization', category: 'production-ai', level: 0, status: 'not_started', description: 'Authz systems', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
  { id: 'caching', name: 'Caching', category: 'production-ai', level: 1, status: 'learning', description: 'Caching strategies', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },

  // Cloud
  { id: 'cloud-cost-optimization', name: 'Cloud Cost Optimization', category: 'cloud', level: 0, status: 'not_started', description: 'Optimizing cloud costs', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },

  // Open Source
  { id: 'oss-contribution', name: 'Open Source Contribution', category: 'open-source', level: 0, status: 'not_started', description: 'Contributing to open source', evidenceIds: [], relatedProjectIds: [], lastUpdated: '2026-01-15' },
];

export function getSkillsByCategory(categoryId: string): Skill[] {
  return skills.filter(s => s.category === categoryId);
}

export function getSkillById(id: string): Skill | undefined {
  return skills.find(s => s.id === id);
}
