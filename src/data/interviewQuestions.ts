import type { InterviewQuestion } from '@/types';

export const interviewQuestions: InterviewQuestion[] = [
  // Python
  {
    id: 'iq-1',
    category: 'Python',
    question: 'Explain the difference between a list and a tuple in Python. When would you use each?',
    status: 'not_attempted',
    confidence: 0,
    myAnswer: '',
    idealAnswer: 'Lists are mutable, tuples are immutable. Use lists when the collection needs to change, tuples for fixed collections and dictionary keys.',
    notes: '',
  },
  {
    id: 'iq-2',
    category: 'Python',
    question: 'What are Python decorators and how do they work?',
    status: 'not_attempted',
    confidence: 0,
    myAnswer: '',
    idealAnswer: 'Decorators are functions that modify other functions. They use the @syntax and wrap a function to extend its behavior without modifying it.',
    notes: '',
  },
  {
    id: 'iq-3',
    category: 'Python',
    question: 'Explain async/await in Python. When is it useful?',
    status: 'not_attempted',
    confidence: 0,
    myAnswer: '',
    idealAnswer: 'Async/await enables cooperative multitasking. Useful for I/O-bound tasks like API calls, file operations, and database queries.',
    notes: '',
  },

  // LLM Engineering
  {
    id: 'iq-4',
    category: 'LLM Engineering',
    question: 'What is the difference between temperature and top_p in LLM APIs?',
    status: 'not_attempted',
    confidence: 0,
    myAnswer: '',
    idealAnswer: 'Temperature controls randomness of token selection. Top_p (nucleus sampling) limits to most probable tokens. Both control output creativity.',
    notes: '',
  },
  {
    id: 'iq-5',
    category: 'LLM Engineering',
    question: 'How do you handle token limits when working with LLMs?',
    status: 'not_attempted',
    confidence: 0,
    myAnswer: '',
    idealAnswer: 'Use truncation, summarization, chunking, or sliding windows. Consider context importance and relevance when selecting what to keep.',
    notes: '',
  },

  // RAG
  {
    id: 'iq-6',
    category: 'RAG',
    question: 'Explain the difference between naive RAG and advanced RAG.',
    status: 'not_attempted',
    confidence: 0,
    myAnswer: '',
    idealAnswer: 'Naive RAG: simple retrieval + generation. Advanced RAG: adds query rewriting, reranking, hybrid search, metadata filtering, and evaluation.',
    notes: '',
  },
  {
    id: 'iq-7',
    category: 'RAG',
    question: 'What are the key metrics for evaluating a RAG system?',
    status: 'not_attempted',
    confidence: 0,
    myAnswer: '',
    idealAnswer: 'Retrieval precision/recall, answer relevance, faithfulness, context relevance, and end-to-end accuracy.',
    notes: '',
  },

  // Agentic AI
  {
    id: 'iq-8',
    category: 'Agentic AI',
    question: 'What is the agent loop and why is it important?',
    status: 'not_attempted',
    confidence: 0,
    myAnswer: '',
    idealAnswer: 'The agent loop is: Observe → Think → Act → Observe. It enables autonomous decision-making and task completion.',
    notes: '',
  },
  {
    id: 'iq-9',
    category: 'Agentic AI',
    question: 'How do you implement tool use in an AI agent?',
    status: 'not_attempted',
    confidence: 0,
    myAnswer: '',
    idealAnswer: 'Define tools as functions with schemas. Agent decides when to call them based on task requirements. Parse and execute results.',
    notes: '',
  },

  // Context Engineering
  {
    id: 'iq-10',
    category: 'Context Engineering',
    question: 'What is context engineering and why does it matter?',
    status: 'not_attempted',
    confidence: 0,
    myAnswer: '',
    idealAnswer: 'Context engineering is designing what information an LLM receives. It directly impacts output quality, cost, and latency.',
    notes: '',
  },
  {
    id: 'iq-11',
    category: 'Context Engineering',
    question: 'Explain context compression techniques.',
    status: 'not_attempted',
    confidence: 0,
    myAnswer: '',
    idealAnswer: 'Summarization, key point extraction, sliding windows, hierarchical compression, and importance-based pruning.',
    notes: '',
  },

  // AI System Design
  {
    id: 'iq-12',
    category: 'AI System Design',
    question: 'Design a production RAG system. What components would you include?',
    status: 'not_attempted',
    confidence: 0,
    myAnswer: '',
    idealAnswer: 'Document pipeline, chunking, embedding, vector store, retrieval, reranking, generation, evaluation, monitoring, guardrails.',
    notes: '',
  },
];

export function getQuestionsByCategory(category: string): InterviewQuestion[] {
  return interviewQuestions.filter(q => q.category === category);
}

export function getInterviewCategories(): string[] {
  return [...new Set(interviewQuestions.map(q => q.category))];
}
