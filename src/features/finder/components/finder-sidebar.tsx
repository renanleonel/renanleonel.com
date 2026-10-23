import {
  CircleArrowDown,
  CircleUserRound,
  Clock3,
  Cloud,
  Folder,
  LayoutGrid,
  Laptop,
  Monitor,
  Trash2,
  type LucideIcon,
} from 'lucide-react';

import { FINDER_FAVORITES } from '@/features/finder/domain/constants/finder-favorites';
import { FinderSection } from '@/features/finder/domain/enums/finder-section';
import {
  GLASS_SIDEBAR,
  SIDEBAR_HEADING,
  SIDEBAR_ROW,
} from '@/shared/domain/constants/liquid-glass';
import { cn } from '@/shared/utils/cn';
import { PROFILE } from '@/shared/domain/constants/profile';

type FinderSidebarProps = {
  section: FinderSection;
  onSelectSection: (section: FinderSection) => void;
};

const SECTION_ICONS: Record<FinderSection, LucideIcon> = {
  [FinderSection.RECENTS]: Clock3,
  [FinderSection.ABOUT_ME]: CircleUserRound,
  [FinderSection.APPLICATIONS]: LayoutGrid,
  [FinderSection.DESKTOP]: Monitor,
  [FinderSection.PORTFOLIO]: Folder,
  [FinderSection.DOWNLOADS]: CircleArrowDown,
  [FinderSection.ICLOUD_DRIVE]: Cloud,
  [FinderSection.TRASH]: Trash2,
};

const TAG_CLASS_NAME = 'size-2.75 flex-none rounded-full';

export function FinderSidebar({ section, onSelectSection }: FinderSidebarProps) {
  return (
    <aside
      className={cn(
        'finder-sidebar',
        GLASS_SIDEBAR,
        'w-55 flex-[0_0_220px] pb-2 px-2 overflow-y-auto',
        'max-[900px]:w-41.25 max-[900px]:basis-41.25',
        'max-[600px]:hidden',
      )}
    >
      <div className='absolute inset-x-0 top-0 h-11 touch-none' data-window-drag-region />
      <span className={SIDEBAR_HEADING}>Favorites</span>
      {FINDER_FAVORITES.map((item) => {
        const Icon = SECTION_ICONS[item];
        return (
          <button
            type='button'
            key={item}
            className={SIDEBAR_ROW}
            aria-current={section === item ? 'page' : undefined}
            onClick={() => onSelectSection(item)}
          >
            <Icon size={16} strokeWidth={1.9} />
            <span className='truncate'>{item}</span>
          </button>
        );
      })}
      <span className={SIDEBAR_HEADING}>Locations</span>
      <button type='button' className={SIDEBAR_ROW}>
        <Laptop size={16} strokeWidth={1.9} />
        <span className='truncate'>{PROFILE.machineName}</span>
      </button>
      <button type='button' className={SIDEBAR_ROW}>
        <Cloud size={16} strokeWidth={1.9} />
        <span className='truncate'>iCloud</span>
      </button>
      <button
        type='button'
        className={SIDEBAR_ROW}
        aria-current={section === FinderSection.TRASH ? 'page' : undefined}
        onClick={() => onSelectSection(FinderSection.TRASH)}
      >
        <Trash2 size={16} strokeWidth={1.9} />
        <span className='truncate'>Trash</span>
      </button>
      <span className={SIDEBAR_HEADING}>Tags</span>
      <button type='button' className={SIDEBAR_ROW}>
        <i className={cn(TAG_CLASS_NAME, '[background:oklch(0.66_0.23_25)]')} />
        Important
      </button>
      <button type='button' className={SIDEBAR_ROW}>
        <i className={cn(TAG_CLASS_NAME, '[background:oklch(0.76_0.18_65)]')} />
        In progress
      </button>
      <button type='button' className={SIDEBAR_ROW}>
        <i className={cn(TAG_CLASS_NAME, '[background:oklch(0.69_0.2_145)]')} />
        Shipped
      </button>
    </aside>
  );
}
