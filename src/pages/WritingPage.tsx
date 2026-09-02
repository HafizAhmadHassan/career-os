import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Download,
  FileText,
  FlaskConical,
  FolderOpen,
  Lightbulb,
  Link2,
  ListChecks,
  PenLine,
  Plus,
  Sparkles,
  Star,
  Trash2,
  Upload,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWritingData } from '@/hooks/useWritingData';
import { writingCategories } from '@/data/writingCategories';
import { articleTemplates } from '@/data/articleTemplates';
import { projectBuilds } from '@/data/projectBuilds';
import { storage, downloadJSON, formatDate } from '@/lib/storage';
import { Badge, Stat, Section, Btn, Field, inputClass } from '@/components/lab-ui';
import type { Article, WritingIdea, IdeaPriority, ArticleTemplateId } from '@/types';

const statusOptions: Article['status'][] = ['idea', 'researching', 'outlining', 'drafting', 'editing', 'published', 'archived'];

const statusTone: Record<string, 'default' | 'blue' | 'amber' | 'purple' | 'green' | 'muted'> = {
  idea: 'blue',
  researching: 'purple',
  outlining: 'purple',
  drafting: 'amber',
  editing: 'amber',
  published: 'green',
  archived: 'muted',
};

const priorityTone: Record<IdeaPriority, 'green' | 'amber' | 'blue'> = { high: 'green', medium: 'amber', low: 'blue' };

type Tab = 'overview' | 'ideas' | 'articles' | 'research' | 'progress' | 'backup';

export default function WritingPage() {
  const navigate = useNavigate();
  const w = useWritingData();
  const [tab, setTab] = useState<Tab>('overview');
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  function notify(msg: string) {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2200);
  }

  async function createArticle(title: string, opts?: { template?: ArticleTemplateId; fromIdea?: WritingIdea }) {
    const a = await w.createArticle(title);
    if (!a) return null;
    if (opts?.template) {
      const t = articleTemplates.find((x) => x.id === opts.template);
      const updated: Article = {
        ...a,
        content: t ? `# ${title}\n\n${t.sections.map((s) => `## ${s.title}\n\n_${s.hint}_\n`).join('\n')}` : a.content,
        stage: 2,
        status: 'outlining',
        template: t?.id,
        category: opts?.fromIdea?.category ?? a.category,
        relatedSkillIds: opts?.fromIdea?.relatedSkillIds ?? [],
        relatedProjectIds: opts?.fromIdea?.relatedProjectIds ?? [],
      };
      await w.saveArticle(updated);
      return updated;
    }
    if (opts?.fromIdea) {
      const updated: Article = {
        ...a,
        title: opts.fromIdea.title,
        category: opts.fromIdea.category,
        stage: 1,
        status: 'researching',
        relatedSkillIds: opts.fromIdea.relatedSkillIds,
        relatedProjectIds: opts.fromIdea.relatedProjectIds,
      };
      await w.saveArticle(updated);
      await w.saveIdea({ ...opts.fromIdea, status: 'researching' });
      return updated;
    }
    return a;
  }

  function openArticle(a: Article) {
    navigate(`/writing/articles/${a.id}`);
  }

  async function handleNewArticle(template: ArticleTemplateId | '') {
    const a = await createArticle('Untitled article', { template: template || undefined });
    if (a) {
      notify('✓ Article created');
      navigate(`/writing/articles/${a.id}`);
    }
  }

  async function handleIdeaStart(idea: WritingIdea) {
    const a = await createArticle(idea.title, { fromIdea: idea });
    if (a) {
      notify('✓ Moved to research');
      navigate(`/writing/articles/${a.id}`);
    }
  }

  async function handleDeleteArticle(a: Article) {
    await w.deleteArticle(a.id);
    notify('✗ Article deleted');
  }

  async function handleDeleteIdea(idea: WritingIdea) {
    await w.deleteIdea(idea.id);
    notify('✗ Idea deleted');
  }

  async function handleToggleFeatured(a: Article) {
    await w.saveArticle({ ...a, featured: !a.featured });
    notify(a.featured ? '☆ Removed from featured' : '★ Marked featured');
  }

  const featured = w.articles.filter((a) => a.featured && a.status === 'published');
  const recommended = w.recommendations.filter((r) => r.recommended);

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'overview', label: 'Overview', icon: <BookOpen className="h-4 w-4" /> },
    { key: 'ideas', label: 'Ideas', icon: <Lightbulb className="h-4 w-4" /> },
    { key: 'articles', label: 'Articles', icon: <FileText className="h-4 w-4" /> },
    { key: 'research', label: 'Research Notes', icon: <FolderOpen className="h-4 w-4" /> },
    { key: 'progress', label: 'Writing Progress', icon: <ListChecks className="h-4 w-4" /> },
    { key: 'backup', label: 'Backup', icon: <Download className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-8">
      {toast && (
        <div className="fixed right-4 top-16 z-50 rounded-md border border-border bg-background px-4 py-2 text-sm shadow-lg">
          {toast}
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold">Technical Writing</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Share what I build, learn, test and discover — this is evidence that I understand AI engineering deeply enough to explain it.
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors',
              tab === t.key ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:bg-accent'
            )}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Articles" value={w.stats.articles} icon={<FileText className="h-4 w-4" />} />
            <Stat label="Published" value={w.stats.published} icon={<BookOpen className="h-4 w-4" />} />
            <Stat label="Drafts" value={w.stats.drafts} icon={<PenLine className="h-4 w-4" />} />
            <Stat label="Ideas" value={w.stats.ideas} icon={<Lightbulb className="h-4 w-4" />} />
            <Stat label="Technical experiments" value={w.stats.experimentsDocumented} icon={<FlaskConical className="h-4 w-4" />} />
            <Stat label="Words written" value={w.stats.wordsWritten.toLocaleString()} icon={<PenLine className="h-4 w-4" />} />
            <Stat label="Research sessions" value={w.stats.researchSessions} icon={<FolderOpen className="h-4 w-4" />} />
            <Stat label="Skills demonstrated" value={w.stats.skillsDemonstrated} icon={<Sparkles className="h-4 w-4" />} />
          </div>

          <Section
            id="featured"
            icon={<Star className="h-4 w-4" />}
            title="Selected Technical Work"
            subtitle="Featured articles — strongest proof of understanding."
          >
            {featured.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No featured articles yet. Publish an article, then star it from the Articles tab or the editor.
              </p>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {featured.map((a) => (
                  <button key={a.id} onClick={() => openArticle(a)} className="group rounded-lg border border-border p-4 text-left transition-colors hover:border-primary">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-medium group-hover:text-primary">{a.title}</span>
                      <Badge tone="green">Published</Badge>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                      <Badge tone="primary">{a.category}</Badge>
                      <span>{a.readingTime} min read</span>·<span>{a.wordCount.toLocaleString()} words</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {a.tags.slice(0, 4).map((t) => <span key={t} className="rounded bg-secondary px-1.5 py-0.5 text-xs text-muted-foreground">{t}</span>)}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </Section>

          <Section
            id="recent"
            icon={<FileText className="h-4 w-4" />}
            title="Recent writing"
          >
            {w.articles.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nothing yet. Start from the Ideas tab or create a new article.</p>
            ) : (
              <div className="space-y-2">
                {[...w.articles].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 6).map((a) => (
                  <button key={a.id} onClick={() => openArticle(a)} className="flex w-full items-center justify-between gap-3 rounded-md border border-border p-3 text-left transition-colors hover:border-primary">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{a.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{a.category} · updated {formatDate(a.updatedAt)}</p>
                    </div>
                    <Badge tone={statusTone[a.status]}>{a.status}</Badge>
                  </button>
                ))}
              </div>
            )}
          </Section>
        </>
      )}

      {tab === 'ideas' && (
        <IdeaSection
          data={w}
          recommended={recommended}
          onStart={handleIdeaStart}
          onDelete={handleDeleteIdea}
          onNotify={notify}
        />
      )}

      {tab === 'articles' && (
        <ArticleSection
          articles={w.articles}
          onCreate={handleNewArticle}
          onOpen={openArticle}
          onDelete={handleDeleteArticle}
          onToggleFeatured={handleToggleFeatured}
        />
      )}

      {tab === 'research' && (
        <ResearchSection data={w} onOpen={(a) => openArticle(a)} />
      )}

      {tab === 'progress' && (
        <ProgressSection data={w} />
      )}

      {tab === 'backup' && (
        <BackupSection data={w} onNotify={notify} />
      )}
    </div>
  );
}

function IdeaSection({
  data,
  recommended,
  onStart,
  onDelete,
  onNotify,
}: {
  data: ReturnType<typeof useWritingData>;
  recommended: { idea: WritingIdea; reason?: string }[];
  onStart: (idea: WritingIdea) => void;
  onDelete: (idea: WritingIdea) => void;
  onNotify: (msg: string) => void;
}) {
  const [statusFilter, setStatusFilter] = useState<'all' | WritingIdea['status']>('all');
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(writingCategories[1] ?? 'Context Engineering');
  const [priority, setPriority] = useState<IdeaPriority>('medium');
  const [projectId, setProjectId] = useState('');

  const filtered = data.ideas.filter((i) => statusFilter === 'all' || i.status === statusFilter);

  async function addIdea() {
    if (!title.trim()) return;
    const idea: WritingIdea = {
      id: `wi-${Date.now().toString()}-${Math.random().toString(36).slice(2, 7)}`,
      title: title.trim(),
      category,
      description: '',
      whyItMatters: '',
      relatedSkillIds: [],
      relatedProjectIds: projectId ? [projectId] : [],
      difficulty: 'intermediate',
      priority,
      status: 'idea',
      source: projectId ? { kind: 'project', projectId } : { kind: 'manual' },
      createdAt: new Date().toISOString(),
    };
    await data.addIdea(idea);
    setTitle('');
    setShowForm(false);
    onNotify('✓ Idea added');
  }

  return (
    <div className="space-y-4">
      <Section
        id="recommended"
        icon={<Sparkles className="h-4 w-4" />}
        title="Recommended topics"
        subtitle="Suggested from your completed labs, experiments and roadmap topics."
      >
        {recommended.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Complete labs, experiments, or roadmap topics and writing ideas will appear here automatically.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {recommended.map(({ idea, reason }) => (
              <div key={idea.id} className="rounded-lg border border-primary/40 bg-primary/5 p-4">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-medium">{idea.title}</span>
                  <Badge tone="primary">{idea.priority}</Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{reason}</p>
                <div className="mt-3">
                  <Btn size="sm" onClick={() => onStart(idea)}>
                    <PenLine className="h-3.5 w-3.5" /> Start writing
                  </Btn>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section
        id="ideas"
        icon={<Lightbulb className="h-4 w-4" />}
        title={`Writing ideas (${filtered.length})`}
        right={
          <div className="flex items-center gap-2">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as 'all' | WritingIdea['status'])} className="rounded-md border border-border bg-background px-2 py-1 text-xs">
              <option value="all">All statuses</option>
              {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <Btn onClick={() => setShowForm(!showForm)}>
              <Plus className="h-4 w-4" /> New idea
            </Btn>
          </div>
        }
      >
        {showForm && (
          <div className="mb-4 space-y-3 rounded-lg border border-border p-4">
            <Field label="Title"><input className={inputClass()} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Article idea title" /></Field>
            <div className="grid gap-3 sm:grid-cols-3">
              <Field label="Category">
                <select className={inputClass()} value={category} onChange={(e) => setCategory(e.target.value)}>
                  {writingCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Priority">
                <select className={inputClass()} value={priority} onChange={(e) => setPriority(e.target.value as IdeaPriority)}>
                  <option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option>
                </select>
              </Field>
              <Field label="Related project">
                <select className={inputClass()} value={projectId} onChange={(e) => setProjectId(e.target.value)}>
                  <option value="">None</option>
                  {projectBuilds.map((p) => <option key={p.projectId} value={p.projectId}>{p.title}</option>)}
                </select>
              </Field>
            </div>
            <div className="flex gap-2">
              <Btn onClick={addIdea} disabled={!title.trim()}>Add idea</Btn>
              <Btn variant="secondary" onClick={() => setShowForm(false)}>Cancel</Btn>
            </div>
          </div>
        )}

        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground">No ideas in this filter.</p>
        ) : (
          <div className="space-y-2">
            {data.recommendations
              .filter(({ idea }) => filtered.includes(idea))
              .map(({ idea }) => {
                const itemShowActions = idea.status === 'idea';
                const tieProjectId = idea.source.kind === 'project' ? idea.source.projectId : undefined;
                const tieProject = tieProjectId ? projectBuilds.find((p) => p.projectId === tieProjectId) : undefined;
                return (
                <div key={idea.id} className="rounded-lg border border-border p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-medium">{idea.title}</p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                        <Badge tone="primary">{idea.category}</Badge>
                        <Badge tone={priorityTone[idea.priority]}>{idea.priority}</Badge>
                        <Badge tone="muted">{idea.difficulty}</Badge>
                        <Badge tone="muted">status: {idea.status}</Badge>
                      </div>
                      {idea.description && <p className="mt-2 text-sm text-muted-foreground">{idea.description}</p>}
                      {idea.whyItMatters && <p className="mt-1 text-xs text-muted-foreground/70">Why it matters: {idea.whyItMatters}</p>}
                      {tieProject && (
                        <div className="mt-1.5 text-xs text-muted-foreground">
                          <Link2 className="mr-1 inline h-3 w-3" />
                          Tied to {tieProject.title}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      {itemShowActions && (
                        <Btn size="sm" variant="secondary" onClick={() => onStart(idea)}>
                          <PenLine className="h-3.5 w-3.5" /> Start research
                        </Btn>
                      )}
                      <button onClick={() => onDelete(idea)} className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
                );
              })}
          </div>
        )}
      </Section>
    </div>
  );
}

function ArticleSection({
  articles,
  onCreate,
  onOpen,
  onDelete,
  onToggleFeatured,
}: {
  articles: Article[];
  onCreate: (template: ArticleTemplateId | '') => void;
  onOpen: (a: Article) => void;
  onDelete: (a: Article) => void;
  onToggleFeatured: (a: Article) => void;
}) {
  const [filter, setFilter] = useState<'all' | Article['status']>('all');
  const [template, setTemplate] = useState<ArticleTemplateId | ''>('');
  const grouped = articles.filter((a) => filter === 'all' || a.status === filter);

  return (
    <Section
      id="articles"
      icon={<FileText className="h-4 w-4" />}
      title={`Articles (${articles.length})`}
      subtitle="Drafts autosave. Photos of every stage — Published, Drafts, Ideas — are straight from real data."
      right={
        <div className="flex items-center gap-2">
          <select value={filter} onChange={(e) => setFilter(e.target.value as 'all' | Article['status'])} className="rounded-md border border-border bg-background px-2 py-1 text-xs">
            <option value="all">All statuses</option>
            {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={template} onChange={(e) => setTemplate(e.target.value as ArticleTemplateId | '')} className="rounded-md border border-border bg-background px-2 py-1 text-xs">
            <option value="">No template</option>
            {articleTemplates.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          <Btn onClick={() => onCreate(template)}>
            <Plus className="h-4 w-4" /> New article
          </Btn>
        </div>
      }
    >
      {grouped.length === 0 ? (
        <p className="text-sm text-muted-foreground">No articles in this filter.</p>
      ) : (
        <div className="space-y-2">
          {grouped.map((a) => (
            <div key={a.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border p-4 transition-colors hover:border-primary">
              <button onClick={() => onOpen(a)} className="min-w-0 flex-1 text-left">
                <p className="font-medium hover:text-primary">{a.title}</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                  <Badge tone={statusTone[a.status]}>{a.status}</Badge>
                  <Badge tone="primary">{a.category}</Badge>
                  <span>{a.wordCount.toLocaleString()} words</span>·<span>{a.readingTime} min</span>
                  <span>· saved {formatDate(a.lastSavedAt)}</span>
                  {a.template && <span>· {articleTemplates.find((t) => t.id === a.template)?.name}</span>}
                </div>
              </button>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onToggleFeatured(a)}
                  title={a.featured ? 'Remove from featured' : 'Feature this article'}
                  className={cn('rounded-md p-1.5 hover:bg-accent', a.featured ? 'text-amber-400' : 'text-muted-foreground')}
                >
                  <Star className="h-4 w-4" />
                </button>
                <Btn size="sm" onClick={() => onOpen(a)}>Open</Btn>
                <button onClick={() => onDelete(a)} className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-red-500">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}

function ResearchSection({ data, onOpen }: { data: ReturnType<typeof useWritingData>; onOpen: (a: Article) => void }) {
  const byArticle = data.researchNotes;
  return (
    <Section
      id="research"
      icon={<FolderOpen className="h-4 w-4" />}
      title={`Research workspace (${byArticle.length})`}
      subtitle="Sources, notes, quotes, key facts, questions and claims to verify — stored per article. No invented citations."
    >
      {byArticle.length === 0 ? (
        <p className="text-sm text-muted-foreground">No research sessions yet. Open any article and use its Research section.</p>
      ) : (
        <div className="space-y-2">
          {byArticle.map((note) => {
            const article = data.articles.find((a) => a.id === note.articleId);
            return (
              <div key={note.id} className="rounded-lg border border-border p-4">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="font-medium">{article?.title ?? 'Article'}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {note.sources.length} sources · {note.items.length} notes/items · updated {formatDate(note.updatedAt)}
                      {note.items.filter((i) => i.kind === 'claim').length > 0 && ` · ${note.items.filter((i) => i.kind === 'claim').length} claims to verify`}
                    </p>
                  </div>
                  {article && <Btn size="sm" onClick={() => onOpen(article)}>Open research</Btn>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Section>
  );
}

function ProgressSection({ data }: { data: ReturnType<typeof useWritingData> }) {
  const byStatus = statusOptions.map((s) => ({ status: s, count: data.articles.filter((a) => a.status === s).length }));
  const maxCount = Math.max(1, ...byStatus.map((b) => b.count));
  const skills = [...new Set(data.articles.filter((a) => a.status === 'published').flatMap((a) => a.relatedSkillIds))];
  const projects = [...new Set(data.articles.filter((a) => a.status === 'published').flatMap((a) => a.relatedProjectIds))];

  return (
    <div className="space-y-4">
      <Section id="analytics" icon={<ListChecks className="h-4 w-4" />} title="Writing analytics" subtitle="Tracked from real data — no fabricated statistics.">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <Stat label="Published" value={data.stats.published} />
          <Stat label="Drafts completed" value={data.stats.drafts} />
          <Stat label="Research sessions" value={data.stats.researchSessions} />
          <Stat label="Words written" value={data.stats.wordsWritten.toLocaleString()} />
          <Stat label="Experiments documented" value={data.stats.experimentsDocumented} />
          <Stat label="Skills demonstrated" value={data.stats.skillsDemonstrated} />
        </div>

        <div className="mt-4">
          <div className="mb-2 text-sm font-medium">Articles by status</div>
          <div className="space-y-2">
            {byStatus.map((b) => (
              <div key={b.status} className="flex items-center gap-3">
                <span className="w-28 text-xs text-muted-foreground">{b.status}</span>
                <div className="h-3 flex-1 overflow-hidden rounded bg-secondary">
                  <div className="h-full rounded bg-primary" style={{ width: `${(b.count / maxCount) * 100}%` }} />
                </div>
                <span className="w-8 text-right text-xs">{b.count}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="skills" icon={<Sparkles className="h-4 w-4" />} title="Skills demonstrated by published work">
        {skills.length === 0 ? <p className="text-sm text-muted-foreground">Publish an article to demonstrate skills.</p> : (
          <div className="flex flex-wrap gap-1.5">{skills.map((s) => <Badge key={s} tone="green">{s}</Badge>)}</div>
        )}
      </Section>

      <Section id="projects" icon={<Link2 className="h-4 w-4" />} title="Projects documented">
        {projects.length === 0 ? <p className="text-sm text-muted-foreground">Connect articles to projects for portfolio integration.</p> : (
          <div className="flex flex-wrap gap-1.5">
            {projects.map((p) => (
              <Badge key={p} tone="primary">{projectBuilds.find((b) => b.projectId === p)?.title ?? p}</Badge>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}

function BackupSection({ data, onNotify }: { data: ReturnType<typeof useWritingData>; onNotify: (msg: string) => void }) {
  const fileRef = useRef<HTMLInputElement | null>(null);

  async function handleExport() {
    const all = await storage.exportStores(['articles', 'writingIdeas', 'researchNotes']);
    downloadJSON(all, 'writing-backup.json');
    onNotify('✓ writing-backup.json downloaded');
  }

  async function handleFullExport() {
    const all = await storage.exportAll();
    downloadJSON(all, 'career-os-backup.json');
    onNotify('✓ career-os-backup.json downloaded');
  }

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const json = JSON.parse(text);
      await data.importData(json);
      onNotify('✓ Writing data imported');
    } catch {
      onNotify('✗ Invalid JSON file');
    }
    e.target.value = '';
  }

  return (
    <Section id="backup" icon={<Download className="h-4 w-4" />} title="Writing backup" subtitle="Export and import your writing data locally.">
      <div className="flex flex-wrap gap-2">
        <Btn onClick={handleExport}><Download className="h-4 w-4" /> Export writing-backup.json</Btn>
        <Btn variant="secondary" onClick={() => fileRef.current?.click()}>
          <Upload className="h-4 w-4" /> Import writing data
        </Btn>
        <Btn variant="secondary" onClick={handleFullExport}><Download className="h-4 w-4" /> Export full Career OS backup</Btn>
      </div>
      <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={handleImport} />
    </Section>
  );
}