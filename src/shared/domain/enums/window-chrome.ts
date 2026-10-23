/**
 * How a window draws its frame. `UNIFIED` is Tahoe's default: no title strip,
 * traffic lights float over the app's own sidebar or toolbar, and the app marks
 * its draggable areas. `TITLE_BAR` keeps a classic centered-title strip.
 */
export enum WindowChrome {
  UNIFIED = 'unified',
  TITLE_BAR = 'title-bar',
}
