import { Link } from 'react-router-dom';
import { ArrowRight, GitBranch, BookOpen, Target, FlaskConical, Award, Code2, Briefcase, FileText } from 'lucide-react';
import { getOverallReadiness, getTodayMission } from '@/lib/readiness';
import { roadmapItems } from '@/data/roadmap';

export default function HomePage() {
  const readiness = getOverallReadiness();
  const mission = getTodayMission();
  const currentLearning = roadmapItems.find(i => i.status === 'in_progress');

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="space-y-6 text-center">
        <div className="font-mono text-sm text-muted-foreground">// personal career operating system</div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Hafiz Ahmad Hassan
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Agentic AI Engineer | Context Engineering | AI Systems
        </p>
        <p className="mx-auto max-w-xl text-sm text-muted-foreground">
          Building reliable AI systems using agents, LLMs, RAG, context engineering, tools, evaluation, and production infrastructure.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Explore My Work <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="https://github.com/hafizahmadhassan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
          >
            <GitBranch className="h-4 w-4" /> GitHub
          </a>
          <Link
            to="/freelance"
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
          >
            <Briefcase className="h-4 w-4" /> Freelance
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
          >
            Contact
          </Link>
        </div>
      </section>

      {/* Career Readiness */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Career Readiness</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border p-4">
            <div className="text-sm text-muted-foreground">Overall Score</div>
            <div className="mt-1 text-3xl font-bold font-mono">{readiness}%</div>
            <div className="mt-2 h-2 rounded-full bg-secondary">
              <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${readiness}%` }} />
            </div>
          </div>
          <div className="rounded-lg border border-border p-4">
            <div className="text-sm text-muted-foreground">Currently Learning</div>
            <div className="mt-1 text-lg font-medium">{currentLearning?.title ?? 'None'}</div>
            <div className="mt-1 text-xs text-muted-foreground">{currentLearning?.phaseName}</div>
          </div>
          <div className="rounded-lg border border-border p-4">
            <div className="text-sm text-muted-foreground">Roadmap Progress</div>
            <div className="mt-1 text-3xl font-bold font-mono">
              {roadmapItems.filter(i => i.status === 'completed').length}/{roadmapItems.length}
            </div>
            <div className="mt-1 text-xs text-muted-foreground">items completed</div>
          </div>
          <div className="rounded-lg border border-border p-4">
            <div className="text-sm text-muted-foreground">Today&apos;s Mission</div>
            <div className="mt-1 text-sm font-medium">{mission.title}</div>
            <div className="mt-1 text-xs text-muted-foreground">{mission.estimatedTime}</div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Quick Navigation</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { to: '/skills', icon: Target, label: 'Skills', desc: 'Skill matrix & evidence' },
            { to: '/roadmap', icon: BookOpen, label: 'Roadmap', desc: 'Learning journey' },
            { to: '/projects', icon: Code2, label: 'Projects', desc: 'Portfolio projects' },
            { to: '/github', icon: GitBranch, label: 'GitHub', desc: 'Repos & contributions' },
            { to: '/interview', icon: FileText, label: 'Interview', desc: 'Preparation lab' },
            { to: '/writing', icon: BookOpen, label: 'Writing', desc: 'Technical articles' },
            { to: '/freelance', icon: Briefcase, label: 'Freelance', desc: 'Services offered' },
            { to: '/dashboard', icon: FlaskConical, label: 'Dashboard', desc: 'Career tracking' },
          ].map(({ to, icon: Icon, label, desc }) => (
            <Link
              key={to}
              to={to}
              className="group rounded-lg border border-border p-4 transition-colors hover:border-primary/50 hover:bg-accent"
            >
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                <span className="font-medium">{label}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Featured Projects</h2>
          <Link to="/projects" className="text-sm text-muted-foreground hover:text-primary">
            View all →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { title: 'Production RAG Agent', desc: 'Production-ready RAG with evaluation and monitoring', status: 'Planned' },
            { title: 'Context Engineering Lab', desc: 'Experiment dashboard for context strategies', status: 'Planned' },
            { title: 'Multi-Agent Research System', desc: 'Coordinated AI agents for deep research', status: 'Planned' },
            { title: 'MCP Business Agent', desc: 'Agent using Model Context Protocol for business tools', status: 'Planned' },
          ].map(project => (
            <div key={project.title} className="rounded-lg border border-border p-4 transition-colors hover:border-primary/50">
              <div className="flex items-start justify-between">
                <h3 className="font-medium">{project.title}</h3>
                <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                  {project.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{project.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Principle */}
      <section className="rounded-lg border border-border bg-card p-8 text-center">
        <div className="font-mono text-xs text-muted-foreground">// core principle</div>
        <p className="mt-3 text-lg font-medium">
          Don&apos;t track what I consume. Track what I can demonstrate.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
          {['Learn', 'Understand', 'Implement', 'Experiment', 'Benchmark', 'Build', 'Deploy', 'Write', 'Contribute', 'Demonstrate'].map((step, i) => (
            <span key={step} className="flex items-center gap-1">
              <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs">{step}</span>
              {i < 9 && <span className="text-muted-foreground/50">→</span>}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
