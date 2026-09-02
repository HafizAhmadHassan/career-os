import { useCallback, useEffect, useState } from 'react';
import type { ProjectBuild, ProjectProgress } from '@/types';
import { defaultProjectProgress } from '@/types';
import { storage } from '@/lib/storage';
import { loadProject } from '@/lib/storage/projectRepositories';
import { computeProjectBuildProgress, type ProjectBuildProgress } from '@/lib/projectProgress';

export function useProjectProgress(build: ProjectBuild | undefined, projectId: string) {
  const [progress, setProgress] = useState<ProjectProgress>(() =>
    defaultProjectProgress(projectId)
  );
  const [loaded, setLoaded] = useState(false);

  const refresh = useCallback(async () => {
    const p = await loadProject(projectId);
    setProgress(p);
    setLoaded(true);
  }, [projectId]);

  useEffect(() => {
    let active = true;
    loadProject(projectId).then((p) => {
      if (active) {
        setProgress(p);
        setLoaded(true);
      }
    });
    return () => {
      active = false;
    };
  }, [projectId]);

  const summary: ProjectBuildProgress | null = build
    ? computeProjectBuildProgress(build, progress)
    : null;

  return { progress, setProgress, refresh, loaded, summary };
}

export function useAllProjectProgress() {
  const [map, setMap] = useState<Record<string, ProjectProgress>>({});
  const [loaded, setLoaded] = useState(false);

  const refresh = useCallback(async () => {
    const all = (await loadAllProjects()).map((p) => [p.projectId, p] as const);
    setMap(Object.fromEntries(all));
    setLoaded(true);
  }, []);

  useEffect(() => {
    let active = true;
    loadAllProjects().then((all) => {
      if (active) {
        setMap(Object.fromEntries(all.map((p) => [p.projectId, p] as const)));
        setLoaded(true);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  return { map, refresh, loaded };
}

async function loadAllProjects(): Promise<ProjectProgress[]> {
  return storage.getAll<ProjectProgress>('projectProgress');
}