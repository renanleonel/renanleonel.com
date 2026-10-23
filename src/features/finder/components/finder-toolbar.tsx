import {
  ChevronLeft,
  ChevronRight,
  Columns3,
  GalleryVerticalEnd,
  LayoutGrid,
  List,
  MoreHorizontal,
  Search,
  Share,
} from 'lucide-react';

import { FinderMoreMenu } from '@/features/finder/components/finder-more-menu';
import { FinderShareMenu } from '@/features/finder/components/finder-share-menu';
import { FinderSection } from '@/features/finder/domain/enums/finder-section';
import { FinderToolbarMenu } from '@/features/finder/domain/enums/finder-toolbar-menu';
import { FinderView } from '@/features/finder/domain/enums/finder-view';
import type { FinderPreferences } from '@/features/finder/domain/models/finder-preferences';
import {
  GLASS_TOOLBAR_FIELD,
  GLASS_TOOLBAR_GROUP,
  TOOLBAR_BUTTON,
  WINDOW_TOOLBAR,
} from '@/shared/domain/constants/liquid-glass';
import { cn } from '@/shared/utils/cn';

type FinderToolbarProps = {
  section: FinderSection;
  query: string;
  toolbarMenu: FinderToolbarMenu | null;
  shareStatus: string;
  preferences: FinderPreferences;
  sidebarVisible: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
  onGoBack: () => void;
  onGoForward: () => void;
  onQueryChange: (query: string) => void;
  onToggleShareMenu: () => void;
  onToggleMoreMenu: () => void;
  onCloseMenu: () => void;
  onShareInMessages: () => void;
  onCopyPortfolioLink: () => void;
  onUpdatePreferences: (patch: Partial<FinderPreferences>) => void;
};

export function FinderToolbar({
  section,
  query,
  toolbarMenu,
  shareStatus,
  preferences,
  sidebarVisible,
  canGoBack,
  canGoForward,
  onGoBack,
  onGoForward,
  onQueryChange,
  onToggleShareMenu,
  onToggleMoreMenu,
  onCloseMenu,
  onShareInMessages,
  onCopyPortfolioLink,
  onUpdatePreferences,
}: FinderToolbarProps) {
  return (
    <div
      className={cn(
        'finder-toolbar',
        WINDOW_TOOLBAR,
        'touch-none max-[600px]:pl-24',
        !sidebarVisible && 'pl-24',
      )}
      data-window-drag-region
    >
      <div className={GLASS_TOOLBAR_GROUP}>
        <button
          type='button'
          className={TOOLBAR_BUTTON}
          aria-label='Back'
          disabled={!canGoBack}
          onClick={onGoBack}
        >
          <ChevronLeft size={18} strokeWidth={2} />
        </button>
        <button
          type='button'
          className={TOOLBAR_BUTTON}
          aria-label='Forward'
          disabled={!canGoForward}
          onClick={onGoForward}
        >
          <ChevronRight size={18} strokeWidth={2} />
        </button>
      </div>
      <h2 className='min-w-0 m-0 ml-1.5 truncate text-[15px] font-bold tracking-[-0.01em]'>
        {section}
      </h2>
      <span className='flex-1' />
      <div className={cn('view-switcher', GLASS_TOOLBAR_GROUP, 'max-[700px]:hidden')}>
        <button
          type='button'
          className={TOOLBAR_BUTTON}
          aria-pressed={preferences.view === FinderView.ICONS}
          aria-label='View as Icons'
          onClick={() => onUpdatePreferences({ view: FinderView.ICONS })}
        >
          <LayoutGrid size={16} strokeWidth={1.9} />
        </button>
        <button
          type='button'
          className={TOOLBAR_BUTTON}
          aria-pressed={preferences.view === FinderView.LIST}
          aria-label='View as List'
          onClick={() => onUpdatePreferences({ view: FinderView.LIST })}
        >
          <List size={17} strokeWidth={1.9} />
        </button>
        <button
          type='button'
          className={TOOLBAR_BUTTON}
          aria-pressed={preferences.view === FinderView.COLUMNS}
          aria-label='View as Columns'
          onClick={() => onUpdatePreferences({ view: FinderView.COLUMNS })}
        >
          <Columns3 size={16} strokeWidth={1.9} />
        </button>
        <button
          type='button'
          className={TOOLBAR_BUTTON}
          aria-pressed={preferences.view === FinderView.GALLERY}
          aria-label='View as Gallery'
          onClick={() => onUpdatePreferences({ view: FinderView.GALLERY })}
        >
          <GalleryVerticalEnd size={16} strokeWidth={1.9} />
        </button>
      </div>
      <div className='relative flex-none'>
        <div className={GLASS_TOOLBAR_GROUP}>
          <button
            type='button'
            className={TOOLBAR_BUTTON}
            aria-label='Share'
            aria-haspopup='menu'
            aria-expanded={toolbarMenu === FinderToolbarMenu.SHARE}
            onClick={onToggleShareMenu}
          >
            <Share size={16} strokeWidth={1.9} />
          </button>
          <button
            type='button'
            className={TOOLBAR_BUTTON}
            aria-label='More'
            aria-haspopup='menu'
            aria-expanded={toolbarMenu === FinderToolbarMenu.MORE}
            onClick={onToggleMoreMenu}
          >
            <MoreHorizontal size={18} strokeWidth={1.9} />
          </button>
        </div>
        {toolbarMenu === FinderToolbarMenu.SHARE ? (
          <FinderShareMenu
            section={section}
            shareStatus={shareStatus}
            onShareInMessages={onShareInMessages}
            onCopyPortfolioLink={onCopyPortfolioLink}
          />
        ) : null}
        {toolbarMenu === FinderToolbarMenu.MORE ? (
          <FinderMoreMenu
            preferences={preferences}
            onCloseMenu={onCloseMenu}
            onUpdatePreferences={onUpdatePreferences}
          />
        ) : null}
      </div>
      <label
        className={cn('finder-search', GLASS_TOOLBAR_FIELD, 'w-44 flex-none max-[600px]:hidden')}
      >
        <Search size={14} strokeWidth={2} aria-hidden='true' />
        <input
          aria-label='Search files'
          placeholder='Search'
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </label>
    </div>
  );
}
