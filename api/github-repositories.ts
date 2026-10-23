import { loadRecentRepositories } from '../server/github-repositories.js';

/**
 * The only server-rendered data in the app: the Safari page's repository list.
 * The CDN serves a cached copy for an hour and keeps serving it for a day while
 * it revalidates in the background, so GitHub sees at most a request an hour.
 */
export async function GET() {
  const repositories = await loadRecentRepositories();
  if (!repositories) {
    return Response.json(
      { error: 'GitHub is unavailable' },
      { status: 502, headers: { 'Cache-Control': 'no-store' } },
    );
  }
  return Response.json(repositories, {
    headers: {
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
