import { getRoadmapByPhase, roadmapItems } from '@/data/roadmap';
import { CheckCircle2, Circle, Clock, SkipForward } from 'lucide-react';
import type { RoadmapStatus } from '@/types';

function statusIcon(status: RoadmapStatus) {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case 'in_progress':
      return <Clock className="h-4 w-4 text-blue-500" />;
    case 'skipped':
      return <SkipForward className="h-4 w-4 text-muted-foreground" />;
    default:
      return <Circle className="h-4 w-4 text-muted-foreground" />;
  }
}

const phases = [1, 2, 3, 4, 5, 6];

export default function RoadmapPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Learning Roadmap</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Six-phase journey from engineering foundations to advanced agent systems.
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {phases.map(phase => {
          const items = getRoadmapByPhase(phase);
          const completed = items.filter(i => i.status === 'completed').length;
          return (
            <div key={phase} className="rounded-lg border border-border p-3 text-center">
              <div className="font-mono text-xs text-muted-foreground">Phase {phase}</div>
              <div className="mt-1 text-sm font-medium">{items[0]?.phaseName}</div>
              <div className="mt-1 text-xs text-muted-foreground">{completed}/{items.length}</div>
            </div>
          );
        })}
      </div>

      <div className="space-y-6">
        {phases.map(phase => {
          const items = getRoadmapByPhase(phase);
          const phaseName = items[0]?.phaseName ?? `Phase ${phase}`;
          return (
            <div key={phase} className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs text-primary">
                  Phase {phase}
                </span>
                <h2 className="font-medium">{phaseName}</h2>
              </div>
              <div className="space-y-2">
                {items.map(item => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 rounded-lg border border-border p-4 transition-colors hover:border-primary/50"
                  >
                    {statusIcon(item.status)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.title}</span>
                        {item.skillId && (
                          <span className="rounded bg-secondary px-1.5 py-0.5 text-xs text-muted-foreground">
                            {item.skillId}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                      {item.resources.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {item.resources.map((r, i) => (
                            <a
                              key={i}
                              href={r.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded bg-secondary px-1.5 py-0.5 text-xs text-muted-foreground hover:text-primary"
                            >
                              {r.title}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                      {item.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
