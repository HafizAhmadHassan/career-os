import { BookOpen, Code2, Brain, Bot, Shield, Workflow, FileSearch, FileText, BarChart3 } from 'lucide-react';

const services = [
  { icon: Bot, title: 'AI Assistants', desc: 'Custom AI assistants tailored to your business needs.' },
  { icon: Brain, title: 'RAG Systems', desc: 'Retrieval-Augmented Generation for accurate, grounded AI responses.' },
  { icon: FileSearch, title: 'Knowledge Agents', desc: 'Agents that navigate and synthesize information from knowledge bases.' },
  { icon: Workflow, title: 'Workflow Automation', desc: 'Automate complex workflows with intelligent AI orchestration.' },
  { icon: Code2, title: 'Agentic Workflows', desc: 'Multi-step autonomous agent systems for complex tasks.' },
  { icon: Shield, title: 'MCP Integrations', desc: 'Model Context Protocol integrations for tool and data connectivity.' },
  { icon: BookOpen, title: 'Research Agents', desc: 'AI agents that conduct deep research and produce reports.' },
  { icon: FileText, title: 'Document Intelligence', desc: 'Extract, analyze, and reason over documents with AI.' },
  { icon: BarChart3, title: 'AI Evaluation Systems', desc: 'Frameworks for measuring and improving AI system performance.' },
];

export default function FreelancePage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Freelance</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          I build production AI systems focused on reliability, evaluation, and real-world impact.
          Here&apos;s what I can help you build.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-lg border border-border p-5 transition-colors hover:border-primary/50">
            <Icon className="h-5 w-5 text-muted-foreground" />
            <h3 className="mt-3 font-medium">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <h2 className="text-lg font-medium">Let&apos;s work together</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Ready to build something with AI? Reach out and let&apos;s discuss your project.
        </p>
        <div className="mt-4 flex justify-center gap-3">
          <a
            href="mailto:ahmadhassan061@gmail.com"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Get in Touch
          </a>
          <a
            href="https://github.com/hafizahmadhassan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
          >
            View GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
