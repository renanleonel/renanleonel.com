import type { GithubRepository } from '@/features/safari/domain/models/github-repository';
import { parseRepositories } from '@/features/safari/domain/selectors/select-recent-repositories';

/** Same-origin Vercel Function (served by a Vite plugin in dev and preview). */
const REPOSITORIES_URL = '/api/github-repositories';

/**
 * Requests the latest repository list from the server, which caches GitHub's
 * answer at the CDN. Resolves to null on any non-OK or malformed response so
 * the caller keeps the build-time snapshot on screen.
 */
export async function fetchGithubRepositories(
  signal: AbortSignal,
): Promise<GithubRepository[] | null> {
  const response = await fetch(REPOSITORIES_URL, { signal });
  if (!response.ok) return null;
  return parseRepositories(await response.json());
}
