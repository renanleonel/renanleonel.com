import { Search } from 'lucide-react';
import { useState } from 'react';

import { SettingsAppIcon } from '@/features/settings/components/settings-app-icon';
import {
  SETTINGS_SECTIONS,
  SETTINGS_SIDEBAR_GROUPS,
} from '@/features/settings/domain/constants/settings-sections';
import type { SettingsSectionId } from '@/features/settings/domain/enums/settings-section-id';
import { GLASS_SIDEBAR } from '@/shared/domain/constants/liquid-glass';
import { PROFILE } from '@/shared/domain/constants/profile';
import { cn } from '@/shared/utils/cn';

type SettingsSidebarProps = {
  selectedSection: SettingsSectionId;
  selectSection: (section: SettingsSectionId) => void;
};

/**
 * System Settings' sidebar: search, the account row, then the panes in their
 * macOS groups. Search filters the panes by name as you type.
 */
export function SettingsSidebar({ selectedSection, selectSection }: SettingsSidebarProps) {
  const [query, setQuery] = useState('');
  const needle = query.trim().toLowerCase();
  const groups = SETTINGS_SIDEBAR_GROUPS.map((group) =>
    group
      .map((id) => SETTINGS_SECTIONS.find((section) => section.id === id))
      .filter((section) => section && section.label.toLowerCase().includes(needle)),
  ).filter((group) => group.length > 0);

  return (
    <aside
      aria-label='System Settings sections'
      className={cn(
        GLASS_SIDEBAR,
        'w-56.25 flex-[0_0_225px] flex flex-col px-2.5 pb-2 overflow-hidden',
        'max-[900px]:w-50 max-[900px]:basis-50 max-[600px]:hidden',
      )}
    >
      <div className='absolute inset-x-0 top-0 h-11 touch-none' data-window-drag-region />
      <label className='mb-2.5 h-7 flex flex-none items-center gap-1.5 rounded-full px-2.5 text-(--label-secondary) [background:oklch(0.2_0.01_250/0.06)] focus-within:[box-shadow:0_0_0_3px_color-mix(in_oklch,var(--keyboard-focus)_45%,transparent)] [.desktop--dark_&]:[background:oklch(1_0_0/0.08)]'>
        <Search size={13} strokeWidth={2.2} aria-hidden='true' />
        <input
          className='min-w-0 flex-1 border-0 bg-transparent text-[13px] text-(--label-primary) outline-none! placeholder:text-(--label-tertiary)'
          type='search'
          placeholder='Search'
          aria-label='Search settings'
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <nav className='min-h-0 flex-1 overflow-y-auto' aria-label='Settings panes'>
        {needle ? null : (
          <div className='mb-2.5 flex items-center gap-2.5 rounded-[10px] px-1.5 py-1.5'>
            <span className='grid size-9 flex-none place-items-center rounded-full text-[15px] font-semibold text-white [background:linear-gradient(180deg,oklch(0.79_0.17_70),oklch(0.6_0.18_35))]'>
              {PROFILE.initial}
            </span>
            <span className='min-w-0 flex flex-col'>
              <strong className='truncate text-[13px] leading-4 font-semibold'>{PROFILE.name}</strong>
              <small className='truncate text-[11px] leading-3.5 text-(--label-secondary)'>
                {PROFILE.role}
              </small>
            </span>
          </div>
        )}
        {groups.map((group, index) => (
          <div className='mb-2.5 flex flex-col gap-px' key={index}>
            {group.map((section) => {
              if (!section) return null;
              const isSelected = section.id === selectedSection;
              return (
                <button
                  type='button'
                  className={cn(
                    'w-full h-7 flex items-center gap-2 px-1.5 rounded-[8px] border-0 bg-transparent text-left text-[13px] text-(--label-primary)',
                    isSelected
                      ? 'text-white [background:var(--system-blue)]'
                      : 'hover:[background:oklch(0.2_0.01_250/0.05)] [.desktop--dark_&]:hover:[background:oklch(1_0_0/0.06)]',
                  )}
                  aria-current={isSelected ? 'page' : undefined}
                  key={section.id}
                  onClick={() => selectSection(section.id)}
                >
                  <SettingsAppIcon section={section} size={20} />
                  <span className='truncate'>{section.label}</span>
                </button>
              );
            })}
          </div>
        ))}
        {groups.length === 0 ? (
          <p className='mt-6 text-center text-[13px] text-(--label-secondary)'>No Results</p>
        ) : null}
      </nav>
    </aside>
  );
}
