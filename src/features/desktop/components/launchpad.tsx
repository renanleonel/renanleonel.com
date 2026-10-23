import { Search } from 'lucide-react';
import { useState } from 'react';

import { LAUNCHPAD_APPLICATIONS } from '@/features/desktop/domain/constants/launchpad-applications';
import { AppIcon } from '@/shared/components/app-icon';
import type { AppId } from '@/shared/domain/enums/app-id';
import { cn } from '@/shared/utils/cn';
type LaunchpadProps = { openApp: (app: AppId) => void; close: () => void };
export function Launchpad({ openApp, close }: LaunchpadProps) {
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLowerCase();
  const applications = LAUNCHPAD_APPLICATIONS.filter((app) =>
    app.label.toLowerCase().includes(normalizedQuery),
  );

  const launch = (app: AppId) => {
    openApp(app);
    close();
  };

  return (
    <div
      className={cn(
        'launchpad',
        '[&.launchpad]:fixed [&.launchpad]:inset-0 [&.launchpad]:z-600 [&.launchpad]:pt-[calc(24px_+_8vh)] [&.launchpad]:text-[white] [&.launchpad]:[background:oklch(0.12_0.04_245/0.55)] [&.launchpad]:[backdrop-filter:blur(38px)_saturate(1.15)] [&.launchpad]:[-webkit-backdrop-filter:blur(38px)_saturate(1.15)] [&.launchpad]:animate-[launchpad-in_240ms_var(--ease-mac)_both]',
        '[&.launchpad_>_label]:w-[min(300px,calc(100vw-48px))] [&.launchpad_>_label]:h-9 [&.launchpad_>_label]:flex [&.launchpad_>_label]:items-center [&.launchpad_>_label]:gap-2 [&.launchpad_>_label]:m-[0_auto_52px] [&.launchpad_>_label]:px-3.5 [&.launchpad_>_label]:rounded-full [&.launchpad_>_label]:text-[oklch(1_0_0/0.75)] [&.launchpad_>_label]:[background:oklch(1_0_0/0.16)] [&.launchpad_>_label]:[box-shadow:inset_0_1px_0_oklch(1_0_0/0.35),inset_0_0_0_1px_oklch(1_0_0/0.14),0_4px_14px_oklch(0.05_0.02_250/0.18)] [&.launchpad_>_label:focus-within]:[background:oklch(1_0_0/0.22)]',
        '[&.launchpad_label_input]:min-w-0 [&.launchpad_label_input]:flex-1 [&.launchpad_label_input]:[border:0] [&.launchpad_label_input]:[outline:0] [&.launchpad_label_input]:text-[white] [&.launchpad_label_input]:[background:transparent] [&.launchpad_label_input]:text-[14px]',
        '[&.launchpad_label_input::placeholder]:text-[oklch(1_0_0/0.7)]',
      )}
    >
      <label>
        <Search size={15} strokeWidth={2.2} aria-hidden='true' />
        <input
          autoFocus
          aria-label='Search apps'
          placeholder='Search'
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && applications[0]) launch(applications[0].id);
          }}
        />
      </label>
      <div
        className={cn(
          'launchpad-grid',
          '[&.launchpad-grid_button]:[transition-property:scale] [&.launchpad-grid_button]:duration-120 [&.launchpad-grid_button]:ease-[ease-out] [&.launchpad-grid_button]:flex [&.launchpad-grid_button]:flex-col [&.launchpad-grid_button]:items-center [&.launchpad-grid_button]:gap-2.25 [&.launchpad-grid_button]:[border:0] [&.launchpad-grid_button]:text-[white] [&.launchpad-grid_button]:[background:transparent] [&.launchpad-grid_button]:[text-shadow:0_2px_5px_oklch(0.1_0.03_245/0.5)]',
          '[&.launchpad-grid_button:active]:scale-[0.96]',
          '[&.launchpad-grid]:max-w-185 [&.launchpad-grid]:m-auto [&.launchpad-grid]:grid [&.launchpad-grid]:grid-cols-[repeat(4,1fr)] [&.launchpad-grid]:gap-[44px_80px]',
          '[&.launchpad-grid_button:active_.app-icon]:brightness-75',
          '[&.launchpad-grid_span]:text-[13px] [&.launchpad-grid_span]:font-medium',
          'max-[900px]:[&.launchpad-grid]:max-w-130 max-[900px]:[&.launchpad-grid]:grid-cols-[repeat(4,1fr)] max-[900px]:[&.launchpad-grid]:gap-8.75',
          'max-[600px]:[&.launchpad-grid]:grid-cols-[repeat(3,1fr)] max-[600px]:[&.launchpad-grid]:gap-[32px_22px]',
          'max-[600px]:[&.launchpad-grid_.app-icon]:[--icon-size:62px]!',
        )}
      >
        {applications.map((app) => (
          <button type='button' key={app.id} onClick={() => launch(app.id)}>
            <AppIcon app={app.id} size={72} />
            <span>{app.label}</span>
          </button>
        ))}
        {applications.length === 0 ? (
          <p
            className='col-span-full m-0 text-center text-[15px] text-[oklch(1_0_0/0.7)]'
            role='status'
          >
            No apps match “{query.trim()}”
          </p>
        ) : null}
      </div>
    </div>
  );
}
