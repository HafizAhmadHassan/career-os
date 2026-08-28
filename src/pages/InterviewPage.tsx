import { useState } from 'react';
import { getInterviewCategories, getQuestionsByCategory } from '@/data/interviewQuestions';
import type { InterviewStatus } from '@/types';

function statusColor(status: InterviewStatus): string {
  switch (status) {
    case 'mastered': return 'bg-green-500/20 text-green-400';
    case 'confident': return 'bg-blue-500/20 text-blue-400';
    case 'attempted': return 'bg-yellow-500/20 text-yellow-400';
    default: return 'bg-secondary text-muted-foreground';
  }
}

export default function InterviewPage() {
  const categories = getInterviewCategories();
  const [activeCategory, setActiveCategory] = useState(categories[0] ?? '');
  const questions = getQuestionsByCategory(activeCategory);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Interview Lab</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Practice interview questions across key domains. Track confidence and progress.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
              activeCategory === cat
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-muted-foreground hover:bg-accent'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {questions.map(q => (
          <div key={q.id} className="rounded-lg border border-border p-4">
            <div className="flex items-start justify-between">
              <p className="text-sm font-medium">{q.question}</p>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs ${statusColor(q.status)}`}>
                {q.status.replace(/_/g, ' ')}
              </span>
            </div>
            {q.idealAnswer && (
              <div className="mt-3 rounded bg-secondary/50 p-3">
                <div className="text-xs font-medium text-muted-foreground">Ideal Answer</div>
                <p className="mt-1 text-sm">{q.idealAnswer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
