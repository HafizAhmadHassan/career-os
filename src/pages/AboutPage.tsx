export default function AboutPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">About</h1>
      </div>

      <div className="prose prose-invert max-w-none space-y-6">
        <section className="space-y-3">
          <h2 className="text-lg font-medium">Who I Am</h2>
          <p className="text-sm text-muted-foreground">
            I&apos;m Hafiz Ahmad Hassan, an Agentic AI Engineer focused on building reliable AI systems
            using agents, LLMs, RAG, context engineering, tools, evaluation, and production infrastructure.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium">What I Focus On</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Agentic AI systems with tool use and planning</li>
            <li>• Context engineering for optimal LLM performance</li>
            <li>• Production-ready RAG pipelines</li>
            <li>• AI evaluation and observability</li>
            <li>• Multi-agent orchestration</li>
            <li>• Model Context Protocol (MCP) integrations</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium">This Site</h2>
          <p className="text-sm text-muted-foreground">
            This isn&apos;t a generic portfolio. It&apos;s a personal career operating system — a place to
            track learning, evidence, projects, and career progression. It&apos;s built as a static site
            with React, TypeScript, Tailwind CSS, and deployed on GitHub Pages.
          </p>
          <p className="text-sm text-muted-foreground">
            The source code itself is part of my portfolio, demonstrating engineering practices
            like type safety, component architecture, and CI/CD deployment.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium">Contact</h2>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>Email: ahmadhassan061@gmail.com</p>
            <p>GitHub: github.com/hafizahmadhassan</p>
          </div>
        </section>
      </div>
    </div>
  );
}
