export default function BlogPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Writing</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Technical articles on Agentic AI, Context Engineering, RAG, and Production AI Systems.
        </p>
      </div>

      <div className="rounded-lg border border-border p-12 text-center">
        <p className="text-sm text-muted-foreground">
          Articles coming soon. Check back for technical deep dives on AI engineering topics.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="font-medium">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {['Agentic AI', 'Context Engineering', 'RAG', 'LLM Engineering', 'AI Evaluation', 'AI Security', 'MCP', 'AI Architecture', 'Production AI'].map(cat => (
            <span key={cat} className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
              {cat}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
