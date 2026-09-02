import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Bold,
  Check,
  ChevronRight,
  Code,
  FileText,
  FlaskConical,
  Heading1,
  Heading2,
  Image,
  Italic,
  Link2,
  List,
  ListOrdered,
  MessageSquare,
  PenLine,
  Plus,
  Quote,
  Ruler,
  Save,
  Sparkles,
  Table,
  ThumbsUp,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ArticleRepository, ResearchRepository } from '@/lib/storage/writingRepositories';
import { generateId } from '@/lib/storage';
import { Markdown } from '@/lib/markdown';
import { writingCategories } from '@/data/writingCategories';
import { articleTemplates, templateOutline } from '@/data/articleTemplates';
import { skills } from '@/data/skills';
import { projectBuilds } from '@/data/projectBuilds';
import { seedInterviewQuestions } from '@/data/interviewQuestions';
import { Badge, Btn, inputClass, Section, Card } from '@/components/lab-ui';
import type {
  Article,
  ResearchItem,
  ResearchNote,
  ResearchSource,
  ArticleTemplateId,
} from '@/types';
import { writingWorkflow } from '@/types';

const TOOLS: { label: string; icon: React.ReactNode; prefix: string; suffix?: string }[] = [
  { label: 'H1', icon: <Heading1 className="h-4 w-4" />, prefix: '# ' },
  { label: 'H2', icon: <Heading2 className="h-4 w-4" />, prefix: '## ' },
  { label: 'Bold', icon: <Bold className="h-4 w-4" />, prefix: '**', suffix: '**' },
  { label: 'Italic', icon: <Italic className="h-4 w-4" />, prefix: '_', suffix: '_' },
  { label: 'Code', icon: <Code className="h-4 w-4" />, prefix: '`', suffix: '`' },
  { label: 'Quote', icon: <Quote className="h-4 w-4" />, prefix: '> ' },
  { label: 'UL', icon: <List className="h-4 w-4" />, prefix: '- ' },
  { label: 'OL', icon: <ListOrdered className="h-4 w-4" />, prefix: '1. ' },
  { label: 'Link', icon: <Link2 className="h-4 w-4" />, prefix: '[' },
  { label: 'Image', icon: <Image className="h-4 w-4" />, prefix: '![alt](' },
  { label: 'Table', icon: <Table className="h-4 w-4" />, prefix: '| A | B |\n| --- | --- |\n| | |\n' },
  { label: 'Fence', icon: <Code className="h-4 w-4" />, prefix: '```ts\n', suffix: '\n```' },
  { label: 'Mermaid', icon: <FlaskConical className="h-4 w-4" />, prefix: '```mermaid\nflowchart LR\n  A --> B\n', suffix: '\n```' },
  { label: 'HR', icon: <Ruler className="h-4 w-4" />, prefix: '\n---\n' },
];

export default function ArticleEditorPage() {
  const { articleId } = useParams<{ articleId: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [missing, setMissing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [mode, setMode] = useState<'edit' | 'preview' | 'split'>('edit');
  const [note, setNote] = useState<ResearchNote | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const saveTimer = useRef<number | undefined>(undefined);
  const toastTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    void (async () => {
      if (!articleId) return;
      const a = await ArticleRepository.get(articleId);
      if (!a) {
        setMissing(true);
        return;
      }
      setArticle(a);
      setNote(await ResearchRepository.get(a.id));
    })();
  }, [articleId]);

  function notify(msg: string) {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2200);
  }

  function patch(p: Partial<Article>) {
    setArticle((prev) => (prev ? { ...prev, ...p } : prev));
  }

  async function doSave(a: Article, opts?: { silence?: boolean }) {
    setSaving(true);
    await ArticleRepository.save(a);
    setSaving(false);
    const now = new Date();
    setSavedAt(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    if (!opts?.silence) notify('✓ Saved');
  }

  useEffect(() => {
    if (!article || !article.lastSavedAt) return;
    window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      void (async () => {
        await doSave(article, { silence: true });
        notify('✓ Autosaved');
      })();
    }, 800);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article?.content, article?.title, article?.category, article?.tags, article?.status, article?.featured, article?.relatedSkillIds, article?.relatedProjectIds]);

  function insertTool(tool: { label: string; icon: React.ReactNode; prefix: string; suffix?: string }) {
    if (!article || !textAreaRef.current) return;
    const el = textAreaRef.current;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = article.content.slice(start, end);
    const next = article.content.slice(0, start) + tool.prefix + selected + (tool.suffix ?? '') + article.content.slice(end);
    patch({ content: next });
    requestAnimationFrame(() => {
      el.focus();
      el.selectionStart = end + tool.prefix.length;
      el.selectionEnd = start + tool.prefix.length + selected.length;
    });
  }

  function applyTemplate(t: ArticleTemplateId) {
    if (!article) return;
    const template = articleTemplates.find((x) => x.id === t);
    const outline = templateOutline(template);
    patch({
      template: t,
      content: article.content.trim() ? `${article.content}\n\n${outline}` : outline,
      stage: 2,
      status: 'outlining',
    });
    notify('✓ Template outline applied');
  }

  function setStatus(status: Article['status']) {
    if (!article) return;
    const published = status === 'published';
    if (published) {
      const incomplete = article.qualityChecks.filter((q) => !q.done);
      if (incomplete.length > 0) {
        notify(`✗ Complete quality gate first (${incomplete.length} checks remaining)`);
        return;
      }
    }
    patch({
      status,
      stage: published ? 5 : article.stage,
      publishedAt: published ? article.publishedAt ?? new Date().toISOString() : undefined,
      publishedUrl: published ? article.publishedUrl ?? '#' : article.publishedUrl,
    });
    if (published) notify('★ Published — now add this to your portfolio evidence');
  }

  function toggleQuality(key: string) {
    if (!article) return;
    patch({
      qualityChecks: article.qualityChecks.map((q) => (q.key === key ? { ...q, done: !q.done } : q)),
    });
  }

  function toggleProject(projectId: string) {
    if (!article) return;
    const has = article.relatedProjectIds.includes(projectId);
    patch({
      relatedProjectIds: has ? article.relatedProjectIds.filter((id) => id !== projectId) : [...article.relatedProjectIds, projectId],
    });
  }

  function toggleSkill(skillId: string) {
    if (!article) return;
    const has = article.relatedSkillIds.includes(skillId);
    patch({ relatedSkillIds: has ? article.relatedSkillIds.filter((id) => id !== skillId) : [...article.relatedSkillIds, skillId] });
  }

  async function handleDeleteSource(sourceId: string) {
    if (!note) return;
    const next = { ...note, sources: note.sources.filter((s) => s.id !== sourceId) };
    setNote(next);
    await ResearchRepository.save(next);
  }

  async function handleDeleteItem(itemId: string) {
    if (!note) return;
    const next = { ...note, items: note.items.filter((i) => i.id !== itemId) };
    setNote(next);
    await ResearchRepository.save(next);
  }

  if (missing) {
    return (
      <div className="space-y-4">
        <Link to="/writing" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Writing
        </Link>
        <Card>
          <p className="text-sm">Article not found.</p>
        </Card>
      </div>
    );
  }

  if (!article) {
    return <p className="text-sm text-muted-foreground">Loading…</p>;
  }

  const skillsToShow = skills.slice(0, 24);
  const relevantQs = seedInterviewQuestions
    .filter((q) => {
      const sameCategory = q.category.toLowerCase() === article.category.toLowerCase();
      const skillMatch = q.skillIds.some((s) => article.relatedSkillIds.includes(s));
      const topicMatch = q.roadmapSlugs.some((slug) => article.relatedSkillIds.includes(slug));
      return sameCategory || skillMatch || topicMatch;
    })
    .slice(0, 8);

  const doneChecks = article.qualityChecks.filter((q) => q.done).length;

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed right-4 top-16 z-50 rounded-md border border-border bg-background px-4 py-2 text-sm shadow-lg">{toast}</div>
      )}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link to="/writing" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Writing hub
        </Link>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {saving ? <span className="inline-flex items-center gap-1"><Save className="h-3.5 w-3.5" /> Saving…</span> : savedAt ? <span>Saved {savedAt}</span> : null}
          <Badge tone={article.status === 'published' ? 'green' : 'muted'}>{article.status}</Badge>
          <span className="hidden sm:inline">{article.wordCount.toLocaleString()} words · {article.readingTime} min read</span>
        </div>
      </div>

      <div>
        <input
          value={article.title}
          onChange={(e) => patch({ title: e.target.value })}
          placeholder="Article title"
          className="w-full bg-transparent text-2xl font-bold focus:outline-none"
        />
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge tone="primary">{article.category}</Badge>
          {article.tags.map((t) => <Badge key={t} tone="muted">{t}</Badge>)}
          {article.template && <Badge tone="purple">{articleTemplates.find((t) => t.id === article.template)?.name}</Badge>}
          {article.featured && <Badge tone="amber">★ Featured</Badge>}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          <input
            value={article.tags.join(', ')}
            onChange={(e) => patch({ tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean).slice(0, 6) })}
            placeholder="tags, comma separated"
            className={cn(inputClass(), 'max-w-xs')}
          />
        </div>
      </div>

      <Section
        id="workflow"
        icon={<PenLine className="h-4 w-4" />}
        title="Writing workflow"
        subtitle="Move an article forward stage by stage. Publishing requires the quality gate."
        right={
          <div className="flex items-center gap-2">
            <Btn size="sm" variant="secondary" onClick={() => applyTemplate('tutorial')}>Tutorial outline</Btn>
            <Btn size="sm" variant="secondary" onClick={() => applyTemplate('deep_dive')}>Deep dive outline</Btn>
            <Btn size="sm" variant="secondary" onClick={() => applyTemplate('experiment')}>Experiment outline</Btn>
            <select
              value={article.category}
              onChange={(e) => patch({ category: e.target.value })}
              className="rounded-md border border-border bg-background px-2 py-1 text-xs"
            >
              {writingCategories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        }
      >
        <div className="flex flex-wrap items-center gap-1">
          {writingWorkflow.map((stage, i) => (
            <div key={`${stage.status}-${i}`} className="flex items-center gap-1">
              <button
                onClick={() => patch({ stage: i, status: stage.status })}
                className={cn(
                  'flex items-center gap-1.5 rounded-md px-2 py-1 text-xs transition-colors',
                  i === article.stage ? 'bg-primary text-primary-foreground' : i < article.stage ? 'text-muted-foreground' : 'bg-secondary text-muted-foreground',
                )}
              >
                {i < article.stage || (article.stage === 5 && i === 5) ? <Check className="h-3 w-3" /> : null}
                <span className="hidden sm:inline">{stage.label}</span>
                <span className="sm:hidden">{i + 1}</span>
              </button>
              {i < writingWorkflow.length - 1 && <ChevronRight className="h-3 w-3 text-muted-foreground/50" />}
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Btn onClick={() => setStatus('published')} disabled={article.status === 'published'}>
            <ThumbsUp className="h-4 w-4" /> Publish
          </Btn>
          {article.status !== 'published' && (
            <Btn variant="secondary" onClick={() => setStatus(article.status === 'drafting' ? 'editing' : article.status === 'researching' ? 'outlining' : 'drafting')}>
              Advance stage
            </Btn>
          )}
          <div className="flex-1" />
          <label className="flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground">
            <input type="checkbox" checked={article.featured} onChange={(e) => patch({ featured: e.target.checked })} />
            Featured in Selected Technical Work
          </label>
        </div>
      </Section>

      <Section
        id="editor"
        icon={<FileText className="h-4 w-4" />}
        title="Editor"
        subtitle="Write in markdown with the toolbar, preview, split view. Autosaves every few seconds."
        right={
          <div className="flex items-center gap-1">
            {(['edit', 'split', 'preview'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cn('rounded-md px-2 py-1 text-xs capitalize', mode === m ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground')}
              >
                {m}
              </button>
            ))}
          </div>
        }
      >
        <div className="flex flex-wrap gap-1">
          {TOOLS.map((tool) => (
            <button key={tool.label} title={tool.label} onClick={() => insertTool(tool)} className="rounded-md border border-border p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground">
              {tool.icon}
            </button>
          ))}
        </div>
        <div className={cn('mt-3 grid gap-3', mode === 'split' && 'lg:grid-cols-2')}>
          {(mode !== 'preview') && (
            <textarea
              ref={textAreaRef}
              value={article.content}
              onChange={(e) => patch({ content: e.target.value })}
              spellCheck={false}
              placeholder="Write your article in markdown here…"
              className="min-h-[480px] w-full resize-y rounded-md border border-border bg-background p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          )}
          {(mode !== 'edit') && (
            <div className="min-h-[480px] max-w-full overflow-x-auto rounded-md border border-border p-4">
              <Markdown content={article.content} />
            </div>
          )}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {article.wordCount.toLocaleString()} words · {article.readingTime} min read · mermaid diagrams render as source in preview
        </p>
      </Section>

      <Section id="qualities" icon={<Check className="h-4 w-4" />} title={`Quality gate (${doneChecks}/${article.qualityChecks.length})`} subtitle="Every check must pass before publishing — this is what makes writing trustworthy.">
        <div className="grid gap-2 sm:grid-cols-2">
          {article.qualityChecks.map((q) => (
            <label key={q.key} className={cn('flex cursor-pointer items-start gap-2 rounded-md border p-3 text-sm transition-colors', q.done ? 'border-green-600/40 bg-green-500/5' : 'border-border')}>
              <input type="checkbox" checked={q.done} onChange={() => toggleQuality(q.key)} className="mt-0.5" />
              <span>
                <span className="font-medium">{q.label}</span>
                <span className="block text-xs text-muted-foreground">{q.help}</span>
              </span>
            </label>
          ))}
        </div>
      </Section>

      <Section
        id="research"
        icon={<FlaskConical className="h-4 w-4" />}
        title="Research workspace"
        subtitle="Collect real sources and notes here — never invent references in the article."
        right={note && <Badge tone="blue">{note.sources.length} sources · {note.items.length} items</Badge>}
      >
        <ResearchWorkspace note={note} onNote={(n) => setNote(n)} onDeleteSource={handleDeleteSource} onDeleteItem={handleDeleteItem} />
      </Section>

      <Section
        id="evidence"
        icon={<Sparkles className="h-4 w-4" />}
        title="Knowledge + evidence linking"
        subtitle="Connect this article to portfolio projects and the skill matrix."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">Related projects</p>
            <div className="space-y-1.5">
              {projectBuilds.map((p) => (
                <label key={p.projectId} className="flex cursor-pointer items-center gap-2 rounded-md border border-border p-2 text-sm">
                  <input type="checkbox" checked={article.relatedProjectIds.includes(p.projectId)} onChange={() => toggleProject(p.projectId)} />
                  <span className="truncate">{p.title}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">Demonstrated skills</p>
            <div className="flex flex-wrap gap-1.5">
              {skillsToShow.map((s) => (
                <button
                  key={s.id}
                  onClick={() => toggleSkill(s.id)}
                  className={cn('rounded-md px-2 py-1 text-xs transition-colors', article.relatedSkillIds.includes(s.id) ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:bg-accent')}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {relevantQs.length > 0 && (
        <Section
          id="interview"
          icon={<MessageSquare className="h-4 w-4" />}
          title="Related interview questions"
          subtitle="This article maps to real questions in the Interview Lab by category, skill or roadmap topic."
          right={<Link to="/interview" className="text-xs text-primary hover:underline">Open Interview Lab →</Link>}
        >
          <div className="space-y-2">
            {relevantQs.map((q) => (
              <Link key={q.id} to={`/interview/question/${q.id}`} className="flex items-center justify-between gap-3 rounded-md border border-border p-3 text-sm transition-colors hover:border-primary">
                <span className="min-w-0 break-words">{q.question}</span>
                <Badge tone="muted">{q.category} · {q.difficulty}</Badge>
              </Link>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

function ResearchWorkspace({
  note,
  onNote,
  onDeleteSource,
  onDeleteItem,
}: {
  note: ResearchNote | null;
  onNote: (n: ResearchNote) => void;
  onDeleteSource: (id: string) => void;
  onDeleteItem: (id: string) => void;
}) {
  const [kind, setKind] = useState<ResearchSource['kind']>('article');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [itemKind, setItemKind] = useState<ResearchItem['kind']>('note');
  const [text, setText] = useState('');

  if (!note) return <p className="text-sm text-muted-foreground">Loading…</p>;
  const n: ResearchNote = note;

  async function addSource() {
    if (!title.trim()) return;
    await ResearchRepository.addSource(n, { kind, title: title.trim(), url: url.trim() });
    const next = await ResearchRepository.get(n.articleId);
    onNote(next);
    setTitle('');
    setUrl('');
  }

  async function addItem() {
    if (!text.trim()) return;
    const next: ResearchNote = {
      ...n,
      items: [...n.items, { id: generateId(), kind: itemKind, text: text.trim(), createdAt: new Date().toISOString() }],
      updatedAt: new Date().toISOString(),
    };
    await ResearchRepository.save(next);
    onNote(next);
    setText('');
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 lg:grid-cols-2">
        <Card className="p-4">
          <p className="mb-2 text-xs font-medium text-muted-foreground">Add a source</p>
          <div className="space-y-2">
            <div className="flex gap-2">
              <select value={kind} onChange={(e) => setKind(e.target.value as ResearchSource['kind'])} className={cn(inputClass(), 'max-w-[160px]')}>
                <option value="article">Article</option>
                <option value="paper">Paper</option>
                <option value="docs">Docs</option>
                <option value="video">Video</option>
                <option value="repo">Repo</option>
                <option value="person">Person</option>
                <option value="other">Other</option>
              </select>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Source title" className={inputClass()} />
            </div>
            <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://… (optional)" className={inputClass()} />
            <Btn size="sm" onClick={addSource} disabled={!title.trim()}><Plus className="h-3.5 w-3.5" /> Add source</Btn>
          </div>
          <div className="mt-3 space-y-1.5">
            {note.sources.map((s) => (
              <div key={s.id} className="flex items-center justify-between gap-2 rounded border border-border px-2 py-1.5 text-sm">
                <div className="min-w-0">
                  <Badge tone="muted">{s.kind}</Badge>{' '}
                  {s.url ? <a href={s.url} target="_blank" rel="noreferrer" className="text-primary hover:underline">{s.title}</a> : <span>{s.title}</span>}
                </div>
                <button onClick={() => onDeleteSource(s.id)} className="text-muted-foreground hover:text-red-500"><X className="h-3.5 w-3.5" /></button>
              </div>
            ))}
            {note.sources.length === 0 && <p className="text-xs text-muted-foreground">No sources yet.</p>}
          </div>
        </Card>
        <Card className="p-4">
          <p className="mb-2 text-xs font-medium text-muted-foreground">Capture notes & claims</p>
          <div className="space-y-2">
            <select value={itemKind} onChange={(e) => setItemKind(e.target.value as ResearchItem['kind'])} className={cn(inputClass(), 'max-w-[180px]')}>
              <option value="note">Note</option>
              <option value="quote">Quote with attribution</option>
              <option value="key_fact">Key fact</option>
              <option value="question">Open question</option>
              <option value="claim">Claim to verify</option>
            </select>
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste the idea, quote, or claim. For quotes, include who said it and where." className={cn(inputClass(), 'min-h-[72px] resize-y')} />
            <Btn size="sm" onClick={addItem} disabled={!text.trim()}><Plus className="h-3.5 w-3.5" /> Add item</Btn>
          </div>
        </Card>
      </div>
      <div className="space-y-1.5">
        {note.items.map((i) => (
          <div key={i.id} className="flex items-start justify-between gap-2 rounded-md border border-border p-3 text-sm">
            <div>
              <Badge tone={i.kind === 'claim' ? 'red' : i.kind === 'question' ? 'amber' : 'muted'}>{i.kind.replace('_', ' ')}</Badge>
              <p className="mt-1 whitespace-pre-wrap text-muted-foreground">{i.text}</p>
            </div>
            <button onClick={() => onDeleteItem(i.id)} className="text-muted-foreground hover:text-red-500"><X className="h-3.5 w-3.5" /></button>
          </div>
        ))}
        {note.items.length === 0 && <p className="text-xs text-muted-foreground">No notes yet.</p>}
      </div>
    </div>
  );
}