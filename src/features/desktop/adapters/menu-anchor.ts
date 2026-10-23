/**
 * Menu-bar dropdowns open under the title that summoned them. Title widths
 * depend on the active app's name and the resolved font, so the x position is
 * measured on click and published as `--menu-anchor-x` on the desktop root,
 * where every fixed-position system menu can read it.
 */
export function anchorMenuToTitle(title: HTMLElement) {
  const desktop = title.closest<HTMLElement>('.desktop');
  desktop?.style.setProperty(
    '--menu-anchor-x',
    `${Math.round(title.getBoundingClientRect().left)}px`,
  );
}
