import type { ArticleTemplate } from '@/types';

export const articleTemplates: ArticleTemplate[] = [
  {
    id: 'tutorial',
    name: 'Technical Tutorial',
    description: 'Step-by-step guide that walks through building or using something.',
    sections: [
      { title: 'Problem', hint: 'What problem does this tutorial solve?' },
      { title: 'Prerequisites', hint: 'What should the reader already know or have installed?' },
      { title: 'Concept', hint: 'The core idea behind the approach' },
      { title: 'Architecture', hint: 'High-level diagram and components' },
      { title: 'Implementation', hint: 'Code walkthrough with explanations' },
      { title: 'Testing', hint: 'How you verified it works' },
      { title: 'Common mistakes', hint: 'Pitfalls you hit and how to avoid them' },
      { title: 'Results', hint: 'What the reader should expect' },
      { title: 'Conclusion', hint: 'Summary and next steps' },
    ],
  },
  {
    id: 'deep_dive',
    name: 'Engineering Deep Dive',
    description: 'Analyze how a technique works at a deep level, with trade-offs.',
    sections: [
      { title: 'Problem', hint: 'What problem is being solved?' },
      { title: 'Why it matters', hint: 'Why should the reader care?' },
      { title: 'Mental model', hint: 'Give the reader a clear mental model' },
      { title: 'Architecture', hint: 'System view and components' },
      { title: 'Trade-offs', hint: 'What you gain and lose with each design choice' },
      { title: 'Experiments', hint: 'Tests that validated (or invalidated) your model' },
      { title: 'Results', hint: 'Honest data' },
      { title: 'Lessons', hint: 'What changed in how you think' },
      { title: 'Conclusion', hint: 'Wrap up clearly' },
    ],
  },
  {
    id: 'experiment',
    name: 'Experiment Report',
    description: 'A benchmark or controlled experiment, written like a lab report.',
    sections: [
      { title: 'Question', hint: 'The exact question you are answering' },
      { title: 'Hypothesis', hint: 'What you expected and why' },
      { title: 'Setup', hint: 'Models, data, environment, versions' },
      { title: 'Variables', hint: 'What you changed and what you kept fixed' },
      { title: 'Method', hint: 'How the benchmark ran' },
      { title: 'Results', hint: 'Tables and numbers - never fabricated' },
      { title: 'Analysis', hint: 'What the results actually mean' },
      { title: 'Conclusion', hint: 'The takeaway and limits' },
    ],
  },
  {
    id: 'case_study',
    name: 'Project Case Study',
    description: 'A realistic write-up of a project you built, including failures.',
    sections: [
      { title: 'Problem', hint: 'The problem you set out to solve' },
      { title: 'Requirements', hint: 'Constraints and goals' },
      { title: 'Architecture', hint: 'The system you designed' },
      { title: 'Technology choices', hint: 'And why you chose them' },
      { title: 'Implementation', hint: 'How it was built' },
      { title: 'Context strategy', hint: 'How context was selected, built, compressed' },
      { title: 'Evaluation', hint: 'How you measured success' },
      { title: 'Security', hint: 'Threats considered and mitigations' },
      { title: 'Performance', hint: 'Latency, cost, throughput' },
      { title: 'Cost', hint: 'Real numbers where available' },
      { title: 'Failures', hint: 'What went wrong' },
      { title: 'Trade-offs', hint: 'Decisions and their costs' },
      { title: 'Lessons learned', hint: 'What you would do differently' },
    ],
  },
];

export const templateOutline = (template?: ArticleTemplate): string => {
  if (!template) return '';
  return template.sections.map((s) => `## ${s.title}\n\n_${s.hint}_\n`).join('\n');
};