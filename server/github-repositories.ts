// Node-only: shared by the Vercel Function in `api/` and the Vite plugin that
// bakes the build-time snapshot. Relative `.js` specifiers because neither the
// function bundler nor Vite's config loader resolves the `@/` alias.
import { selectRecentRepositories } from '../src/features/safari/domain/selectors/select-recent-repositories.js';
import type { GithubRepository } from '../src/features/safari/domain/models/github-repository.js';
import { PROFILE } from '../src/shared/domain/constants/profile.js';

const REPOSITORIES_URL = `https://api.github.com/users/${PROFILE.githubUser}/repos?per_page=100&sort=pushed&type=owner`;

/**
 * Fetches the most recently pushed repositories. `GITHUB_TOKEN` is optional:
 * without it GitHub allows 60 requests per hour per IP, which the CDN cache in
 * front of the function keeps well clear of. Resolves to null on any failure.
 */
export async function loadRecentRepositories(): Promise<GithubRepository[] | null> {
  try {
    const token = process.env.GITHUB_TOKEN;
    const response = await fetch(REPOSITORIES_URL, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': PROFILE.site,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return null;
    const repositories = selectRecentRepositories(await response.json(), PROFILE.githubUser);
    return repositories.length > 0 ? repositories : null;
  } catch {
    return null;
  }
}
