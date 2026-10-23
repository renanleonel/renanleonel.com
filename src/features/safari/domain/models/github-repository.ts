export type GithubRepository = {
  name: string;
  description: string;
  language: string | null;
  stars: number;
  url: string;
  homepage: string | null;
  /** ISO timestamp of the last push, which is what "recent" is ranked by. */
  pushedAt: string;
};
