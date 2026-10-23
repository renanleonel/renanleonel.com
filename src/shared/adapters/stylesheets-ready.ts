/**
 * Resolves once the app stylesheets injected by the first-paint loader (see
 * `deferAppAssetsUntilFirstPaint` in vite.config.ts) have loaded, so React
 * never paints unstyled markup over the static lock screen. In development
 * Vite injects styles from JavaScript, so there is nothing to wait for.
 */
export function whenStylesheetsReady(): Promise<void> {
  const links = document.querySelectorAll<HTMLLinkElement>('link[data-app-stylesheet]');
  return Promise.all(
    Array.from(links, (link) =>
      link.sheet
        ? undefined
        : new Promise<void>((resolve) => {
            link.addEventListener('load', () => resolve(), { once: true });
            link.addEventListener('error', () => resolve(), { once: true });
          }),
    ),
  ).then(() => undefined);
}
