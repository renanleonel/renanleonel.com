import { MessageCircle, Settings, Trash2, UserRound, type LucideProps } from 'lucide-react';
import type { ComponentType, CSSProperties } from 'react';

import { FinderAppGlyph } from '@/shared/components/finder-app-glyph';
import { LaunchpadAppGlyph } from '@/shared/components/launchpad-app-glyph';
import { MailAppGlyph } from '@/shared/components/mail-app-glyph';
import { NotesAppGlyph } from '@/shared/components/notes-app-glyph';
import { PhotosAppGlyph } from '@/shared/components/photos-app-glyph';
import { SafariAppGlyph } from '@/shared/components/safari-app-glyph';
import { TerminalAppGlyph } from '@/shared/components/terminal-app-glyph';
import { AppId } from '@/shared/domain/enums/app-id';
import { DockUtilityId } from '@/shared/domain/enums/dock-utility-id';
import type { DockId } from '@/shared/domain/models/dock-id';
import { cn } from '@/shared/utils/cn';

type AppIconProps = {
  app: DockId;
  size?: number;
};

const APP_ICON_COMPONENTS: Record<DockId, ComponentType<LucideProps>> = {
  [AppId.FINDER]: FinderAppGlyph,
  [DockUtilityId.LAUNCHPAD]: LaunchpadAppGlyph,
  [AppId.SAFARI]: SafariAppGlyph,
  [AppId.MESSAGES]: MessageCircle,
  [DockUtilityId.MAIL]: MailAppGlyph,
  [AppId.PHOTOS]: PhotosAppGlyph,
  [AppId.NOTES]: NotesAppGlyph,
  [AppId.TERMINAL]: TerminalAppGlyph,
  [AppId.SETTINGS]: Settings,
  [DockUtilityId.TRASH]: Trash2,
  [AppId.ABOUT]: UserRound,
};

export function AppIcon({ app, size = 48 }: AppIconProps) {
  const Icon = APP_ICON_COMPONENTS[app];

  return (
    <span
      className={cn(
        `app-icon app-icon--${app}`,
        '[&.app-icon]:[--icon-size:48px] [&.app-icon]:w-(--icon-size) [&.app-icon]:h-(--icon-size) [&.app-icon]:grid [&.app-icon]:place-items-center [&.app-icon]:rounded-[calc(var(--icon-size)*0.235)] [&.app-icon]:text-[white] [&.app-icon]:[box-shadow:0_0_0_0.5px_oklch(0.1_0.02_250/0.14),0_2px_6px_oklch(0.08_0.03_245/0.22)] [&.app-icon]:overflow-hidden [&.app-icon]:relative [&.app-icon]:isolate',
        "[&.app-icon::before]:[content:''] [&.app-icon::before]:absolute [&.app-icon::before]:z-1 [&.app-icon::before]:inset-0 [&.app-icon::before]:rounded-[inherit] [&.app-icon::before]:[background:linear-gradient(180deg,oklch(1_0_0/0.22),transparent_45%)] [&.app-icon::before]:[box-shadow:inset_0_1px_0_oklch(1_0_0/0.55),inset_0_-1px_0_oklch(0_0_0/0.08)] [&.app-icon::before]:pointer-events-none",
        '[&.app-icon_svg]:relative [&.app-icon_svg]:z-2 [&.app-icon_svg]:filter-[drop-shadow(0_1px_1px_oklch(0.08_0.02_250/0.12))]',
        '[&.app-icon.app-icon--finder]:[background:#0a5fe0]',
        '[&.app-icon.app-icon--launchpad]:[background:linear-gradient(180deg,#fbfcfd,#d5dae2)]',
        '[&.app-icon.app-icon--safari]:[background:linear-gradient(180deg,#ffffff,#e3e6eb)]',
        '[&.app-icon.app-icon--messages]:[background:linear-gradient(180deg,#6cf27e,#0bbf38)]',
        '[&.app-icon.app-icon--mail]:text-[#1a7ff5] [&.app-icon.app-icon--mail]:[background:linear-gradient(180deg,#2bb4ff,#1462f0)]',
        '[&.app-icon.app-icon--photos]:[background:linear-gradient(180deg,#ffffff,#eceef2)]',
        '[&.app-icon.app-icon--notes]:[background:linear-gradient(180deg,#ffffff,#f1f1f3)]',
        '[&.app-icon.app-icon--terminal]:text-[#f2f4f6] [&.app-icon.app-icon--terminal]:[background:linear-gradient(180deg,#3d454e,#121619)]',
        '[&.app-icon.app-icon--settings]:text-[#34373d] [&.app-icon.app-icon--settings]:[background:linear-gradient(180deg,#e4e6ea,#8f939b)]',
        '[&.app-icon.app-icon--trash]:text-[#52606d] [&.app-icon.app-icon--trash]:[background:linear-gradient(145deg,oklch(0.96_0.025_220/0.95),oklch(0.75_0.055_225/0.86))]',
        '[&.app-icon.app-icon--about]:[background:linear-gradient(180deg,#f3a85b,#b4566a)]',
      )}
      style={{ '--icon-size': `${size}px` } as CSSProperties}
    >
      <Icon
        size={Math.round(size * 0.52)}
        strokeWidth={1.7}
        fill={app === AppId.MESSAGES ? 'currentColor' : undefined}
      />
    </span>
  );
}
