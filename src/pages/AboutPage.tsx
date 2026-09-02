import { Link } from 'react-router-dom';
import { ArrowUpRight, BookOpen, Briefcase, Gauge, GitBranch, Lightbulb, ShieldCheck, Target } from 'lucide-react';
import { skillCategories, skills, getSkillsByCategory } from '@/data/skills';
import { roadmapItems } from '@/data/roadmap';
import { projectBuilds } from '@/data/projectBuilds';
import { repositories } from '@/data/repositories';

export default function AboutPage() {
  const activeSkills = skills.filter((s) => s.status !== 'not_started').length;
  const inProgress = roadmapItems.filter((i) => i.status === 'in_progress').map((i) => i.title);

  const stats = [
    { label: 'Active skills', value: `${activeSkills}/${skills.length}`, hint: `tracked across ${skillCategories.length} focus areas`, icon: Target },
    { label: 'Project builds', value: String(projectBuilds.length), hint: 'each with milestones & evidence', icon: Briefcase },
    { label: 'Repositories studied', value: String(repositories.length), hint: 'reference systems analyzed', icon: GitBranch },
    { label: 'Roadmap modules', value: String(roadmapItems.length), hint: 'working topics with labs & benchmarks', icon: BookOpen },
  ];

  const quickFacts: [string, string][] = [
    ['Role', 'Agentic AI Engineer'],
    ['Domain', 'Agents · LLMs · RAG · Context Engineering'],
    ['Focus', 'Reliability, evaluation, production systems'],
    ['Approach', 'Demonstrate over consume'],
  ];

  const principles = [
    { icon: ShieldCheck, title: 'Evidence over claims', desc: 'Every skill is backed by modules, labs, benchmarks, and shipped work — not buzzwords on a resume.' },
    { icon: Gauge, title: 'Reliable by design', desc: 'Evaluation and observability are built in from the first milestone, not added after launch.' },
    { icon: Lightbulb, title: 'Build to ship', desc: 'Systems target production: tooling, CI/CD, deployment, and operations are part of the work.' },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="space-y-3">
        <div className="font-mono text-sm text-muted-foreground">// the person behind the system</div>
        <h1 className="text-2xl font-bold">About</h1>
      </section>

      {/* Profile */}
      <section className="rounded-lg border border-border bg-card p-6 sm:p-8">
        <div className="grid gap-6 sm:grid-cols-1">
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold">Hafiz Ahmad Hassan</h2>
              <p className="mt-1 text-sm text-primary">Agentic AI Engineer · Context Engineering · AI Systems</p>
            </div>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
              I engineer the stack around the model — context construction, retrieval, tool use, evaluation, and
              production infrastructure — because that is where AI systems are won or lost. This site is the operating
              system I run that work on: every skill maps to a module, and every module produces evidence instead of a
              reading list.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
          {quickFacts.map(([label, value]) => (
            <div key={label} className="bg-card p-4">
              <div className="text-xs text-muted-foreground">{label}</div>
              <div className="mt-1 text-sm font-medium leading-snug">{value}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ label, value, hint, icon: Icon }) => (
            <div key={label} className="rounded-lg border border-border p-4">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Icon className="h-3.5 w-3.5" /> {label}
              </div>
              <div className="mt-1 font-mono text-2xl font-bold">{value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{hint}</div>
            </div>
          ))}
        </div>

        {inProgress.length > 0 && (
          <div className="mt-6 rounded-lg border border-border bg-background p-4">
            <div className="text-xs text-muted-foreground">Currently focused on</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {inProgress.map((t) => (
                <span key={t} className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Approach */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold">The Approach</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Why this site looks more like a system than a résumé.
          </p>
        </div>
        <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            Most of what matters in agent systems is measurable: retrieval quality, groundedness, tool-call accuracy,
            cost per task, latency, and failure rates. So I build with those numbers in sight — the roadmap is organized
            around modules, each with objectives, labs, a mini-project, benchmarks, and an assessment. Finishing a topic
            means shipping evidence, not ticking a checkbox.
          </p>
          <blockquote className="rounded-lg border-l-2 border-primary/60 bg-card p-4 py-3 pl-4 text-foreground">
            My mission is to build AI systems that are reliable enough to be lived with — engineered with evaluation,
            context discipline, and operational rigor, and proven by what they can actually demonstrate.
          </blockquote>
          <p>
            The field moves too fast to track what I consume. Instead, the record is the work: this site itself is one
            of the artifacts — typed, tested, deployed with CI/CD, and structured the same way I would structure a
            production system.
          </p>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Focus Areas</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {skillCategories.length} domains covering the AI engineering track, weighted by relevance.
            </p>
          </div>
          <Link to="/skills" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
            Skills <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((c) => (
            <div key={c.id} className="group rounded-lg border border-border p-4 transition-colors hover:border-primary/50 hover:bg-accent">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium">{c.name}</h3>
                <span className="rounded-full bg-secondary px-2 py-0.5 font-mono text-xs text-muted-foreground">
                  {Math.round(c.weight * 100)}%
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{c.description}</p>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Target className="h-3 w-3" />
                {getSkillsByCategory(c.id).length} skills
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How I Work */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold">How I Work</h2>
          <p className="mt-1 text-sm text-muted-foreground">The principles behind everything on this site.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {principles.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-lg border border-border p-5 transition-colors hover:border-primary/50 hover:bg-accent">
              <Icon className="h-5 w-5 text-primary" />
              <h3 className="mt-3 font-medium">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* This Site */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold">This Site</h2>
          <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            career-os is a personal operating system for engineering a career, not a résumé in a browser. It runs the
            Skills, Roadmap, Projects, Writing, Interview, and Dashboard areas you reach from the navigation — a static
            site whose source is itself part of the portfolio.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="text-xs text-muted-foreground">Engineering</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {['React + TypeScript', 'Tailwind CSS', 'Vite', 'GitHub Actions CI', 'Static deploy'].map((chip) => (
              <span key={chip} className="rounded bg-secondary px-2 py-1 font-mono text-xs text-secondary-foreground">
                {chip}
              </span>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <a
              href="https://github.com/HafizAhmadHassan/career-os"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              Source on GitHub <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://hafizahmadhassan.github.io/career-os/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              Live site <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">Contact</h2>
        <p className="text-sm text-muted-foreground">The fastest ways to reach me.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <a
            href="mailto:ahmadhassan061@gmail.com"
            className="rounded-lg border border-border p-4 transition-colors hover:border-primary/50 hover:bg-accent"
          >
            <div className="text-xs text-muted-foreground">Email</div>
            <div className="mt-1 text-sm text-primary">ahmadhassan061@gmail.com</div>
          </a>
          <a
            href="https://github.com/hafizahmadhassan"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-border p-4 transition-colors hover:border-primary/50 hover:bg-accent"
          >
            <div className="text-xs text-muted-foreground">GitHub</div>
            <div className="mt-1 text-sm text-primary">github.com/hafizahmadhassan</div>
          </a>
        </div>
      </section>
    </div>
  );
}