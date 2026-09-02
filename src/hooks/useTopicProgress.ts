import { useCallback, useEffect, useState } from 'react';
import type { TopicProgress } from '@/types';
import { defaultTopicProgress } from '@/types';
import { ProgressRepository } from '@/lib/storage/repositories';
import { buildProgressMap, type ProgressMap } from '@/lib/progress';

export function useTopicProgress(topicId: string) {
  const [progress, setProgress] = useState<TopicProgress>(() =>
    defaultTopicProgress(topicId)
  );
  const [loaded, setLoaded] = useState(false);

  const refresh = useCallback(async () => {
    const p = await ProgressRepository.get(topicId);
    setProgress(p);
    setLoaded(true);
  }, [topicId]);

  useEffect(() => {
    let active = true;
    ProgressRepository.get(topicId).then((p) => {
      if (active) {
        setProgress(p);
        setLoaded(true);
      }
    });
    return () => {
      active = false;
    };
  }, [topicId]);

  return { progress, setProgress, refresh, loaded };
}

export function useAllTopicProgress() {
  const [map, setMap] = useState<ProgressMap>({});
  const [loaded, setLoaded] = useState(false);

  const refresh = useCallback(async () => {
    const all = await ProgressRepository.getAll();
    setMap(buildProgressMap(all));
    setLoaded(true);
  }, []);

  useEffect(() => {
    let active = true;
    ProgressRepository.getAll().then((all) => {
      if (active) {
        setMap(buildProgressMap(all));
        setLoaded(true);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  return { map, refresh, loaded };
}