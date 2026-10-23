import { useEffect, useState } from 'react';
import repositoriesSnapshot from 'virtual:github-repositories-snapshot';

import { fetchGithubRepositories } from '@/features/safari/adapters/github-repositories';
import { FALLBACK_REPOSITORIES } from '@/features/safari/domain/constants/recent-repositories';
import type { GithubRepository } from '@/features/safari/domain/models/github-repository';

/**
 * Renders the list baked in at build time immediately, then swaps in the
 * server's fresher copy, so the page never shows a spinner or an empty state.
 * The committed fallback covers builds that could not reach GitHub.
 */
export function useGithubRepositories() {
  const [repositories, setRepositories] = useState<GithubRepository[]>(
    repositoriesSnapshot ?? FALLBACK_REPOSITORIES,
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchGithubRepositories(controller.signal).then(
      (latest) => {
        if (latest) setRepositories(latest);
      },
      // Offline, aborted, or the function failed: the snapshot stays on screen.
      () => undefined,
    );
    return () => controller.abort();
  }, []);

  return { repositories };
}
