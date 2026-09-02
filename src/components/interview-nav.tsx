import { Link } from 'react-router-dom';
import { BookOpen, Brain, Code2, Layers, MessageSquare, Swords } from 'lucide-react';
import { cn } from '@/lib/utils';

export const INTERVIEW_NAV = [
  { path: '/interview', label: 'Dashboard', icon: <Layers className="h-4 w-4" /> },
  { path: '/interview/practice/Fundamentals', label: 'Fundamentals', icon: <BookOpen className="h-4 w-4" /> },
  { path: '/interview/practice/LLM Engineering', label: 'LLM Engineering', icon: <Brain className="h-4 w-4" /> },
  { path: '/interview/practice/RAG', label: 'RAG', icon: <Layers className="h-4 w-4" /> },
  { path: '/interview/practice/Agentic AI', label: 'Agentic AI', icon: <Swords className="h-4 w-4" /> },
  { path: '/interview/practice/Context Engineering', label: 'Context Engineering', icon: <Brain className="h-4 w-4" /> },
  { path: '/interview/system-design', label: 'AI System Design', icon: <Layers className="h-4 w-4" /> },
  { path: '/interview/coding', label: 'Coding', icon: <Code2 className="h-4 w-4" /> },
  { path: '/interview/practice/Behavioral', label: 'Behavioral', icon: <MessageSquare className="h-4 w-4" /> },
  { path: '/interview/mock', label: 'Mock Interviews', icon: <Swords className="h-4 w-4" /> },
];

export function InterviewNav({ active }: { active: string }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {INTERVIEW_NAV.map((n) => (
        <Link
          key={n.path}
          to={n.path}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors',
            active === n.path ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:bg-accent'
          )}
        >
          {n.icon}
          {n.label}
        </Link>
      ))}
    </div>
  );
}