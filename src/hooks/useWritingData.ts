import { useCallback, useEffect, useState } from 'react';
import type {
  Article,
  WritingIdea,
  ResearchNote,
  ResearchSource,
  ResearchItem,
  ProjectProgress,
  TopicProgress,
} from '@/types';
import {
  ArticleRepository,
  WritingIdeaRepository,
  ResearchRepository,
  importWritingData,
} from '@/lib/storage/writingRepositories';
import { seedWritingIdeas } from '@/data/writingIdeas';
import { storage, generateId } from '@/lib/storage';
import {
  computeWritingStats,
  resolveIdeaRecommendations,
  type WritingStats,
  type IdeaWithRecommendation,
} from '@/lib/writingStats';

export type WritingData = {
  articles: Article[];
  ideas: WritingIdea[];
  researchNotes: ResearchNote[];
  stats: WritingStats;
  recommendations: IdeaWithRecommendation[];
  loaded: boolean;
  refresh: () => Promise<void>;
  createArticle: (title: string) => Promise<Article | undefined>;
  saveArticle: (article: Article) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
  addIdea: (idea: WritingIdea) => Promise<void>;
  saveIdea: (idea: WritingIdea) => Promise<void>;
  deleteIdea: (id: string) => Promise<void>;
  getResearch: (articleId: string) => Promise<ResearchNote>;
  saveResearch: (note: ResearchNote) => Promise<void>;
  addSource: (note: ResearchNote, source: Omit<ResearchSource, 'id'>) => Promise<ResearchNote>;
  addResearchItem: (note: ResearchNote, kind: ResearchItem['kind'], text: string) => Promise<ResearchNote>;
  importData: (data: Record<string, unknown[]>) => Promise<void>;
};

export function useWritingData(): WritingData {
  const [articles, setArticles] = useState<Article[]>([]);
  const [ideas, setIdeas] = useState<WritingIdea[]>([]);
  const [researchNotes, setResearchNotes] = useState<ResearchNote[]>([]);
  const [stats, setStats] = useState<WritingStats>({ articles: 0, published: 0, drafts: 0, ideas: 0, experimentsDocumented: 0, wordsWritten: 0, readingMinutes: 0, researchSessions: 0, sourcesCollected: 0, skillsDemonstrated: 0, projectsDocumented: 0, featured: 0 });
  const [recommendations, setRecommendations] = useState<IdeaWithRecommendation[]>([]);
  const [loaded, setLoaded] = useState(false);

  const refresh = useCallback(async () => {
    await WritingIdeaRepository.seedAll(seedWritingIdeas);
    const [arts, allIdeas, research, projectProgress, topicProgress] = await Promise.all([
      ArticleRepository.getAll(),
      WritingIdeaRepository.getAll(),
      storage.getAll<ResearchNote>('researchNotes'),
      storage.getAll<ProjectProgress>('projectProgress'),
      storage.getAll<TopicProgress>('topicProgress'),
    ]);
    setArticles(arts);
    setIdeas(allIdeas);
    setResearchNotes(research);
    setStats(computeWritingStats(arts, allIdeas, research));
    const pMap = Object.fromEntries(projectProgress.map((p) => [p.projectId, p]));
    const tMap = Object.fromEntries(topicProgress.map((t) => [t.topicId, t]));
    setRecommendations(resolveIdeaRecommendations(allIdeas, pMap, tMap));
    setLoaded(true);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const importData = useCallback(async (data: Record<string, unknown[]>) => {
    await importWritingData(data);
    await refresh();
  }, [refresh]);

  return {
    articles,
    ideas,
    researchNotes,
    stats,
    recommendations,
    loaded,
    refresh,
    createArticle: async (title) => {
      const a = await ArticleRepository.create(title);
      await refresh();
      return a;
    },
    saveArticle: async (article) => {
      await ArticleRepository.save(article);
      await refresh();
    },
    deleteArticle: async (id) => {
      await ArticleRepository.delete(id);
      await refresh();
    },
    addIdea: async (idea) => {
      await WritingIdeaRepository.create({ ...idea, id: idea.id || generateId() });
      await refresh();
    },
    saveIdea: async (idea) => {
      await WritingIdeaRepository.save(idea);
      await refresh();
    },
    deleteIdea: async (id) => {
      await WritingIdeaRepository.delete(id);
      await refresh();
    },
    getResearch: (articleId) => ResearchRepository.get(articleId),
    saveResearch: (note) => ResearchRepository.save(note),
    addSource: (note, source) => ResearchRepository.addSource(note, source),
    addResearchItem: async (note, kind, text) => {
      const item: ResearchItem = { id: generateId(), kind, text, createdAt: new Date().toISOString() };
      const next: ResearchNote = { ...note, items: [...note.items, item], updatedAt: new Date().toISOString() };
      await ResearchRepository.save(next);
      return next;
    },
    importData,
  };
}