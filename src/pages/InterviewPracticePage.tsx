import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ListChecks } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useInterviewData } from '@/hooks/useInterviewData';
import { confidenceMeta } from '@/lib/interviewReadiness';
import { InterviewNav } from '@/components/interview-nav';
import { Badge, Section } from '@/components/lab-ui';
import type { QuestionType, QuestionDifficulty, InterviewQuestion } from '@/types';

const DIFFS: (QuestionDifficulty | 'all')[] = ['all', 'beginner', 'intermediate', 'advanced', 'senior', 'staff'];
const TYPES: (QuestionType | 'all')[] = ['all', 'conceptual', 'practical', 'debugging', 'architecture', 'trade_off', 'coding', 'behavioral'];

export default function InterviewPracticePage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const data = useInterviewData();
  const [diff, setDiff] = useState<QuestionDifficulty | 'all'>('all');
  const [type, setType] = useState<QuestionType | 'all'>('all');

  const category = categoryId ?? 'Fundamentals';
  const categories = [...new Set(data.questions.map((q) => q.category))];

  const filtered = useMemo(() => {
    const base = data.questions.filter((q) => q.category === category);
    return base.filter((q) => (diff === 'all' || q.difficulty === diff) && (type === 'all' || q.type === type));
  }, [data.questions, category, diff, type]);

  const attemptedIds = new Set(data.attempts.map((a) => a.questionId));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Question Bank</h1>
        <p className="mt-1 text-sm text-muted-foreground">Real questions mapped to your projects, labs and roadmap — practice one of them.</p>
      </div>

      <InterviewNav active={`/interview/practice/${category}`} />

      <div className="flex flex-wrap gap-1.5">
        {categories.map((c) => (
          <Link
            key={c}
            to={`/interview/practice/${encodeURIComponent(c)}`}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm transition-colors',
              c === category ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:bg-accent'
            )}
          >
            {c}
            <span className="ml-1 text-xs opacity-70">{data.questions.filter((q) => q.category === c).length}</span>
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1">
          {DIFFS.map((d) => (
            <button
              key={d}
              onClick={() => setDiff(d)}
              className={cn('rounded-md px-2 py-1 text-xs capitalize', diff === d ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-accent')}
            >
              {d}
            </button>
          ))}
        </div>
        <span className="text-muted-foreground">·</span>
        <div className="flex flex-wrap items-center gap-1">
          {TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={cn('rounded-md px-2 py-1 text-xs capitalize', type === t ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-accent')}
            >
              {t.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
        <span className="ml-auto text-xs text-muted-foreground">{filtered.length} questions</span>
      </div>

      <Section id="bank" icon={<ListChecks className="h-4 w-4" />} title={`${category} — questions`}>
        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground">No questions match these filters.</p>
        ) : (
          <div className="space-y-2">
            {filtered.map((q) => (
              <QuestionRow key={q.id} q={q} attempted={attemptedIds.has(q.id)} />
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}

function QuestionRow({ q, attempted }: { q: InterviewQuestion; attempted: boolean }) {
  const meta = confidenceMeta[q.confidence];
  const overdue = q.dueDate && new Date(q.dueDate) <= new Date() && q.reviewCount > 0;
  return (
    <Link to={`/interview/question/${q.id}`} className="flex items-start justify-between gap-3 rounded-md border border-border p-3 text-sm transition-colors hover:border-primary">
      <div className="min-w-0">
        <p className="break-words font-medium">{q.question}</p>
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
          <Badge tone="primary">{q.category}</Badge>
          <Badge tone="muted">{q.difficulty}</Badge>
          <Badge tone="muted">{q.type.replace(/_/g, ' ')}</Badge>
          {attempted && <span className={cn('rounded-md px-2 py-0.5 text-xs', meta.tone)}>{meta.label}</span>}
          {overdue && <Badge tone="red">due review</Badge>}
          {q.relatedProjectId && <Badge tone="blue">project-tied</Badge>}
          {q.importantConcepts.length > 0 && <span>· {q.importantConcepts.slice(0, 3).join(', ')}</span>}
        </div>
      </div>
      {attempted ? (
        <span className={cn('shrink-0 rounded-md px-2 py-0.5 text-xs font-medium', meta.tone)}>
          {q.bestScore ? `best ${q.bestScore}` : 'reviewed'}
        </span>
      ) : (
        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
      )}
    </Link>
  );
}