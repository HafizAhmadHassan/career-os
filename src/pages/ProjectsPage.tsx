import { projects } from '@/data/projects';
import { ExternalLink, GitBranch } from 'lucide-react';

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Projects</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Portfolio of AI engineering projects demonstrating practical skills.
        </p>
      </div>

      <div className="space-y-4">
        {projects.map(project => (
          <div
            key={project.id}
            className="rounded-lg border border-border p-6 transition-colors hover:border-primary/50"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-medium">{project.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{project.description}</p>
              </div>
              <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground">
                {project.status.replace(/_/g, ' ')}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <h3 className="text-xs font-medium text-muted-foreground">Problem</h3>
                <p className="mt-0.5 text-sm">{project.problem}</p>
              </div>
              <div>
                <h3 className="text-xs font-medium text-muted-foreground">Architecture</h3>
                <p className="mt-0.5 font-mono text-xs">{project.architecture}</p>
              </div>
              <div>
                <h3 className="text-xs font-medium text-muted-foreground">Technologies</h3>
                <div className="mt-1 flex flex-wrap gap-1">
                  {project.technologies.map(tech => (
                    <span key={tech} className="rounded bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent"
                >
                  <GitBranch className="h-3 w-3" /> Code
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent"
                >
                  <ExternalLink className="h-3 w-3" /> Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
