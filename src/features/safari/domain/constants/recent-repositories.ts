import type { GithubRepository } from '@/features/safari/domain/models/github-repository';
import { PROFILE } from '@/shared/domain/constants/profile';

/**
 * Shown only when the build could not reach GitHub, until the server function
 * answers. A snapshot of `selectRecentRepositories` taken on 2026-10-23; the
 * build-time snapshot and the function supersede it on every deploy.
 */
export const FALLBACK_REPOSITORIES: GithubRepository[] = [
  {
    name: 'frontend-skills',
    description: 'my personal skills for frontend engineering',
    language: 'Python',
    stars: 0,
    url: `https://github.com/${PROFILE.githubUser}/frontend-skills`,
    homepage: null,
    pushedAt: '2026-10-21T12:14:55Z',
  },
  {
    name: 'system-design',
    description: 'implementation of system design concepts',
    language: 'TypeScript',
    stars: 0,
    url: `https://github.com/${PROFILE.githubUser}/system-design`,
    homepage: null,
    pushedAt: '2026-09-22T11:14:19Z',
  },
  {
    name: 'renanleonel.com',
    description: 'An interactive macOS 27 desktop as a portfolio. Built with GPT-5.6 Sol and Claude Opus 5 agents.',
    language: 'TypeScript',
    stars: 0,
    url: `https://github.com/${PROFILE.githubUser}/renanleonel.com`,
    homepage: 'https://renanleonel.com',
    pushedAt: '2026-08-21T15:24:49Z',
  },
  {
    name: 'leetcode',
    description: 'data structures and algorithms',
    language: 'Python',
    stars: 0,
    url: `https://github.com/${PROFILE.githubUser}/leetcode`,
    homepage: 'https://leetcode.com/u/renao/',
    pushedAt: '2026-02-03T11:03:51Z',
  },
  {
    name: 'quark',
    description: 'ticket creator for development teams',
    language: 'TypeScript',
    stars: 2,
    url: `https://github.com/${PROFILE.githubUser}/quark`,
    homepage: null,
    pushedAt: '2025-12-11T22:54:59Z',
  },
  {
    name: 'react-virtualization',
    description: 'demo showing how to virtualize a select component from scratch and using TanStack Virtual',
    language: 'TypeScript',
    stars: 0,
    url: `https://github.com/${PROFILE.githubUser}/react-virtualization`,
    homepage: 'https://renanleonel.com/posts/virtualizing-react',
    pushedAt: '2025-12-11T22:42:54Z',
  },
  {
    name: 'next-minimal-template',
    description: 'minimal starter template for projects using next.js 15 and react 19',
    language: 'CSS',
    stars: 0,
    url: `https://github.com/${PROFILE.githubUser}/next-minimal-template`,
    homepage: null,
    pushedAt: '2025-12-11T22:41:25Z',
  },
  {
    name: 'next-better-auth',
    description: 'implementation of basic authentication flow using better-auth',
    language: 'TypeScript',
    stars: 1,
    url: `https://github.com/${PROFILE.githubUser}/next-better-auth`,
    homepage: null,
    pushedAt: '2025-12-11T22:38:39Z',
  },
];
