import type { Connect, Plugin } from 'vite';

import { loadRecentRepositories } from './github-repositories.js';

const SNAPSHOT_ID = 'virtual:github-repositories-snapshot';
const RESOLVED_SNAPSHOT_ID = `\0${SNAPSHOT_ID}`;
const API_PATH = '/api/github-repositories';
const DEV_CACHE_MS = 10 * 60 * 1000;

/**
 * Static generation for the Safari repository list, plus a local stand-in for
 * the Vercel Function:
 *
 * - `virtual:github-repositories-snapshot` is the list fetched when the bundle
 *   is built (or `null` if GitHub was unreachable), so the page renders real
 *   data with no request. The function then refreshes it at runtime.
 * - `pnpm dev` and `pnpm preview` answer `/api/github-repositories` themselves,
 *   from a ten-minute memory cache, because Vite does not run `api/` functions.
 */
export function githubRepositories(): Plugin {
  let cached: { at: number; body: string | null } | null = null;
  const load = async () => {
    if (cached && Date.now() - cached.at < DEV_CACHE_MS) return cached.body;
    const repositories = await loadRecentRepositories();
    cached = { at: Date.now(), body: repositories ? JSON.stringify(repositories) : null };
    return cached.body;
  };
  const middleware: Connect.NextHandleFunction = (request, response, next) => {
    if (request.url?.split('?')[0] !== API_PATH) return next();
    void load().then((body) => {
      response.setHeader('Content-Type', 'application/json');
      response.statusCode = body ? 200 : 502;
      response.end(body ?? '{"error":"GitHub is unavailable"}');
    });
  };

  return {
    name: 'github-repositories',
    resolveId: (id) => (id === SNAPSHOT_ID ? RESOLVED_SNAPSHOT_ID : null),
    async load(id) {
      if (id !== RESOLVED_SNAPSHOT_ID) return null;
      const body = await load();
      return `export default ${body ?? 'null'};`;
    },
    configureServer: (server) => void server.middlewares.use(middleware),
    configurePreviewServer: (server) => void server.middlewares.use(middleware),
  };
}
