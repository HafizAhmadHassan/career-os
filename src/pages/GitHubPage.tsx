import { repositories } from '@/data/repositories';
import { GitFork, Star, ExternalLink } from 'lucide-react';
import type { Repository } from '@/types';

function statusColor(status: Repository['status']): string {
  switch (status) {
    case 'contributed': return 'bg-green-500/20 text-green-400';
    case 'deep_understanding': return 'bg-blue-500/20 text-blue-400';
    case 'implemented': return 'bg-purple-500/20 text-purple-400';
    case 'studying': return 'bg-yellow-500/20 text-yellow-400';
    default: return 'bg-secondary text-muted-foreground';
  }
}

export default function GitHubPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">GitHub</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Repository study tracker and contributions. Tracking progress through key AI/ML repositories.
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        <div className="rounded-lg border border-border p-4 text-center">
          <div className="text-2xl font-bold font-mono">{repositories.length}</div>
          <div className="text-xs text-muted-foreground">Repositories Tracked</div>
        </div>
        <div className="rounded-lg border border-border p-4 text-center">
          <div className="text-2xl font-bold font-mono">
            {repositories.filter(r => r.status !== 'to_study').length}
          </div>
          <div className="text-xs text-muted-foreground">In Progress</div>
        </div>
        <div className="rounded-lg border border-border p-4 text-center">
          <div className="text-2xl font-bold font-mono">
            {repositories.filter(r => r.status === 'contributed').length}
          </div>
          <div className="text-xs text-muted-foreground">Contributed To</div>
        </div>
      </div>

      <div className="space-y-2">
        {repositories.map(repo => (
          <div
            key={repo.id}
            className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:border-primary/50"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{repo.name}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs ${statusColor(repo.status)}`}>
                  {repo.status.replace(/_/g, ' ')}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">{repo.description}</p>
              <div className="mt-1 flex flex-wrap gap-1">
                {repo.topics.map(topic => (
                  <span key={topic} className="rounded bg-secondary px-1.5 py-0.5 text-xs text-muted-foreground">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 shrink-0 rounded p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
