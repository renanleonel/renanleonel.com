import type { GithubRepository } from '@/features/safari/domain/models/github-repository';
import type { GithubRepositoryResponse } from '@/features/safari/domain/models/github-repository-response';

/** How many repositories the Safari page shows. */
export const RECENT_REPOSITORY_LIMIT = 8;

/**
 * The account's most recently pushed original work. Forks, archived repos, the
 * profile README repo (named after the user), deprecated repos, and repos
 * without a description are left out — they read as noise on a portfolio.
 *
 * Shared by the server function, the build-time snapshot, and the browser, so
 * it imports types only: the server bundles do not resolve the `@/` alias.
 */
export function selectRecentRepositories(
  data: unknown,
  githubUser: string,
  limit = RECENT_REPOSITORY_LIMIT,
): GithubRepository[] {
  if (!Array.isArray(data)) return [];
  const repositories: GithubRepository[] = [];
  for (const entry of data as GithubRepositoryResponse[]) {
    const description = entry.description?.trim() ?? '';
    if (!entry.name || !entry.html_url || !entry.pushed_at) continue;
    if (entry.fork || entry.archived || !description) continue;
    if (entry.name.toLowerCase() === githubUser.toLowerCase()) continue;
    if (/^\[deprecated\]/i.test(description)) continue;
    repositories.push({
      name: entry.name,
      description,
      language: entry.language ?? null,
      stars: entry.stargazers_count ?? 0,
      url: entry.html_url,
      homepage: entry.homepage || null,
      pushedAt: entry.pushed_at,
    });
  }
  return repositories
    .sort(
      (a, b) =>
        b.pushedAt.localeCompare(a.pushedAt) || b.stars - a.stars || a.name.localeCompare(b.name),
    )
    .slice(0, limit);
}

/** Accepts only a non-empty array of well-formed repositories, else null. */
export function parseRepositories(data: unknown): GithubRepository[] | null {
  if (!Array.isArray(data) || data.length === 0) return null;
  const valid = data.every(
    (entry: Partial<GithubRepository> | null) =>
      typeof entry?.name === 'string' &&
      typeof entry.url === 'string' &&
      typeof entry.description === 'string' &&
      typeof entry.stars === 'number' &&
      typeof entry.pushedAt === 'string',
  );
  return valid ? (data as GithubRepository[]) : null;
}
