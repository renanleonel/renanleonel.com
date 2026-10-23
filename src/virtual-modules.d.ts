/** Repositories fetched at build time by `server/github-repositories-plugin.ts`. */
declare module 'virtual:github-repositories-snapshot' {
  import type { GithubRepository } from '@/features/safari/domain/models/github-repository';

  const snapshot: GithubRepository[] | null;
  export default snapshot;
}
