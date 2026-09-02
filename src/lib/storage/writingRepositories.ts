import type {
  Article,
  WritingIdea,
  ResearchNote,
  ResearchSource,
} from '@/types';
import { defaultQualityChecks } from '@/types';
import { storage, WRITING_STORES } from './index';
import { downloadJSON } from './index';

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'article';
}

function deriveStage(status: Article['status']): number {
  switch (status) {
    case 'idea': return 0;
    case 'researching': return 1;
    case 'outlining': return 2;
    case 'drafting': return 3;
    case 'editing': return 4;
    case 'published': return 5;
    case 'archived': return 0;
  }
}

function wordCount(content: string): number {
  const text = content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/[#>*_\-[]()!|]/g, ' ');
  return text.split(/\s+/).filter(Boolean).length;
}

async function loadArticle(id: string): Promise<Article | undefined> {
  const existing = await storage.getById<Article>('articles', id);
  if (!existing) return existing;
  return {
    ...existing,
    qualityChecks: existing.qualityChecks?.length ? existing.qualityChecks : defaultQualityChecks(),
    tags: existing.tags ?? [],
    relatedSkillIds: existing.relatedSkillIds ?? [],
    relatedProjectIds: existing.relatedProjectIds ?? [],
  };
}

export const ArticleRepository = {
  async getAll(): Promise<Article[]> {
    const all = await storage.getAll<Article>('articles');
    return all.map((a) => ({
      ...a,
      qualityChecks: a.qualityChecks?.length ? a.qualityChecks : defaultQualityChecks(),
    }));
  },
  async get(id: string): Promise<Article | undefined> {
    return loadArticle(id);
  },
  async create(title: string): Promise<Article> {
    const now = new Date().toISOString();
    const nowMs = Date.now().toString();
    const id = `${nowMs}-${Math.random().toString(36).slice(2, 8)}`;
    const article: Article = {
      id,
      title: title || 'Untitled article',
      slug: slugify(title || 'untitled-article'),
      category: 'Agentic AI',
      tags: [],
      stage: 0,
      status: 'idea',
      content: '',
      wordCount: 0,
      readingTime: 0,
      createdAt: now,
      updatedAt: now,
      lastSavedAt: now,
      relatedSkillIds: [],
      relatedProjectIds: [],
      qualityChecks: defaultQualityChecks(),
      featured: false,
    };
    await storage.put('articles', article);
    return article;
  },
  async save(article: Article, { autosave: _autosave = false } = {}): Promise<void> {
    const clean: Article = {
      ...article,
      stage: deriveStage(article.status),
      wordCount: wordCount(article.content),
      readingTime: Math.max(1, Math.round(wordCount(article.content) / 200)),
      updatedAt: new Date().toISOString(),
      lastSavedAt: new Date().toISOString(),
      qualityChecks: article.qualityChecks ?? defaultQualityChecks(),
      tags: article.tags ?? [],
      relatedSkillIds: article.relatedSkillIds ?? [],
      relatedProjectIds: article.relatedProjectIds ?? [],
    };
    await storage.put('articles', clean);
  },
  async setQuality(key: string, done: boolean): Promise<Article | undefined> {
    void key;
    void done;
    return undefined;
  },
  async delete(id: string): Promise<void> {
    await storage.delete('articles', id);
  },
};

export const WritingIdeaRepository = {
  async getAll(): Promise<WritingIdea[]> {
    return storage.getAll<WritingIdea>('writingIdeas');
  },
  async get(id: string): Promise<WritingIdea | undefined> {
    return storage.getById<WritingIdea>('writingIdeas', id);
  },
  async create(idea: WritingIdea): Promise<void> {
    await storage.put('writingIdeas', idea);
  },
  async save(idea: WritingIdea): Promise<void> {
    await storage.put('writingIdeas', idea);
  },
  async delete(id: string): Promise<void> {
    await storage.delete('writingIdeas', id);
  },
  async seedAll(ideas: WritingIdea[]): Promise<void> {
    const existing = await storage.getAll<WritingIdea>('writingIdeas');
    const existingIds = new Set(existing.map((i) => i.id));
    for (const idea of ideas) {
      if (!existingIds.has(idea.id)) {
        await storage.put('writingIdeas', idea);
      }
    }
  },
};

export const ResearchRepository = {
  async get(articleId: string): Promise<ResearchNote> {
    const all = await storage.getAll<ResearchNote>('researchNotes');
    const existing = all.find((r) => r.articleId === articleId);
    if (existing) return existing;
    const note: ResearchNote = {
      id: `rn-${Date.now().toString()}-${Math.random().toString(36).slice(2, 8)}`,
      articleId,
      sources: [],
      items: [],
      updatedAt: new Date().toISOString(),
    };
    await storage.put('researchNotes', note);
    return note;
  },
  async save(note: ResearchNote): Promise<void> {
    await storage.put('researchNotes', { ...note, updatedAt: new Date().toISOString() });
  },
  async addSource(note: ResearchNote, source: Omit<ResearchSource, 'id'>): Promise<ResearchNote> {
    const next: ResearchNote = {
      ...note,
      sources: [...note.sources, { ...source, id: `src-${Date.now().toString()}-${Math.random().toString(36).slice(2, 8)}` }],
      updatedAt: new Date().toISOString(),
    };
    await storage.put('researchNotes', next);
    return next;
  },
};

export async function exportWritingData(): Promise<void> {
  const data = await storage.exportStores(WRITING_STORES);
  downloadJSON(data, 'writing-backup.json');
}

export async function importWritingData(data: Record<string, unknown[]>): Promise<void> {
  await storage.importStores(WRITING_STORES, data);
}

export { defaultQualityChecks };
