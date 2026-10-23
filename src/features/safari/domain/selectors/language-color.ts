/** GitHub's linguist colours for the languages the account uses. */
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572a5',
  CSS: '#663399',
  HTML: '#e34c26',
  MDX: '#fcb32c',
  Astro: '#ff5a03',
};

export function languageColor(language: string): string {
  return LANGUAGE_COLORS[language] ?? '#8b949e';
}
