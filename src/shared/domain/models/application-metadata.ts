import type { WindowChrome } from '@/shared/domain/enums/window-chrome';

export type ApplicationMetadata = {
  label: string;
  dockLabel?: string;
  launchpadLabel?: string;
  menuBarLabel?: string;
  title: string;
  chrome: WindowChrome;
  width: number;
  height: number;
  x: number;
  y: number;
};
