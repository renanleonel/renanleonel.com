/** The fields read from one entry of GitHub's `GET /users/{user}/repos`. */
export type GithubRepositoryResponse = {
  name?: string;
  description?: string | null;
  language?: string | null;
  stargazers_count?: number;
  html_url?: string;
  homepage?: string | null;
  pushed_at?: string | null;
  fork?: boolean;
  archived?: boolean;
};
