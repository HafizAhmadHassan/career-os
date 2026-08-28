import { skillCategories, getSkillsByCategory } from '@/data/skills';
import type { SkillLevel, SkillStatus } from '@/types';

function levelColor(level: SkillLevel): string {
  if (level >= 4) return 'bg-green-500/20 text-green-400';
  if (level >= 3) return 'bg-blue-500/20 text-blue-400';
  if (level >= 2) return 'bg-yellow-500/20 text-yellow-400';
  if (level >= 1) return 'bg-orange-500/20 text-orange-400';
  return 'bg-secondary text-muted-foreground';
}

function statusLabel(status: SkillStatus): string {
  return status.replace(/_/g, ' ');
}

export default function SkillsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Skills</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Comprehensive skill matrix tracking progress across all domains.
        </p>
      </div>

      <div className="space-y-6">
        {skillCategories.map(category => {
          const skills = getSkillsByCategory(category.id);
          return (
            <div key={category.id} className="rounded-lg border border-border">
              <div className="border-b border-border px-4 py-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-medium">{category.name}</h2>
                  <span className="text-xs text-muted-foreground">
                    Weight: {Math.round(category.weight * 100)}%
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{category.description}</p>
              </div>
              <div className="divide-y divide-border">
                {skills.map(skill => (
                  <div key={skill.id} className="flex items-center justify-between px-4 py-2.5">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{skill.name}</div>
                      <div className="text-xs text-muted-foreground">{skill.description}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                        {statusLabel(skill.status)}
                      </span>
                      <div className="flex gap-0.5">
                        {([1, 2, 3, 4, 5] as const).map(level => (
                          <div
                            key={level}
                            className={`h-2 w-2 rounded-full ${level <= skill.level ? 'bg-primary' : 'bg-secondary'}`}
                          />
                        ))}
                      </div>
                      <span className="w-4 text-center font-mono text-xs text-muted-foreground">
                        {skill.level}
                      </span>
                    </div>
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
