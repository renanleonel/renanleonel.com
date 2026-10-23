/**
 * The Dock bounces an icon while its app launches. Apps here open instantly,
 * so one bounce acknowledges the click. Reduced-motion users get none.
 */
export function bounceDockIcon(icon: Element | null) {
  if (!icon || globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  icon.animate(
    [
      { transform: 'translateY(0)' },
      { transform: 'translateY(-16px)', offset: 0.4 },
      { transform: 'translateY(0)', offset: 0.8 },
      { transform: 'translateY(-3px)', offset: 0.9 },
      { transform: 'translateY(0)' },
    ],
    { duration: 620, easing: 'cubic-bezier(0.33, 0, 0.3, 1)' },
  );
}
