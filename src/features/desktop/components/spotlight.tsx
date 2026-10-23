import { Search } from 'lucide-react';
import { useState, type KeyboardEvent } from 'react';

import { LAUNCHPAD_APPLICATIONS } from '@/features/desktop/domain/constants/launchpad-applications';
import { AppIcon } from '@/shared/components/app-icon';
import { GLASS_MENU, GLASS_REDUCED_TRANSPARENCY } from '@/shared/domain/constants/liquid-glass';
import type { AppId } from '@/shared/domain/enums/app-id';
import { cn } from '@/shared/utils/cn';

type SpotlightProps = { openApp: (app: AppId) => void; close: () => void };

const RESULTS_ID = 'spotlight-results';

export function Spotlight({ openApp, close }: SpotlightProps) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const results = LAUNCHPAD_APPLICATIONS.filter((app) =>
    app.label.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const active = Math.min(activeIndex, Math.max(results.length - 1, 0));

  const launch = (app: AppId) => {
    openApp(app);
    close();
  };

  // Spotlight is driven from the field: arrows move the highlight, Return
  // opens it — the pointer is optional.
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!results.length) return;
      const step = event.key === 'ArrowDown' ? 1 : -1;
      setActiveIndex((active + step + results.length) % results.length);
    } else if (event.key === 'Enter' && results[active]) {
      event.preventDefault();
      launch(results[active].id);
    }
  };

  return (
    <div className='spotlight fixed z-800 top-[18%] left-1/2 w-[min(640px,calc(100vw-32px))] -translate-x-1/2 animate-[spotlight-in_180ms_var(--ease-mac)]'>
      <div
        className={cn(
          'spotlight-bar',
          GLASS_MENU,
          GLASS_REDUCED_TRANSPARENCY,
          '[&.spotlight-bar]:rounded-full h-14 flex items-center gap-3 px-5 text-(--label-primary)',
        )}
      >
        <Search size={20} strokeWidth={2.2} className='flex-none text-(--label-secondary)' />
        <input
          autoFocus
          role='combobox'
          aria-label='Spotlight Search'
          aria-expanded={results.length > 0}
          aria-controls={RESULTS_ID}
          aria-activedescendant={results[active] ? `spotlight-${results[active].id}` : undefined}
          className='min-w-0 flex-1 border-0 bg-transparent text-[20px] font-normal tracking-[-0.01em] outline-none! placeholder:text-(--label-tertiary)'
          placeholder='Spotlight Search'
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
          }}
          onKeyDown={onKeyDown}
        />
      </div>
      <div
        id={RESULTS_ID}
        role='listbox'
        aria-label='Applications'
        className={cn(
          'spotlight-results',
          GLASS_MENU,
          GLASS_REDUCED_TRANSPARENCY,
          '[&.spotlight-results]:rounded-[24px] mt-2 max-h-[min(352px,50vh)] overflow-auto p-2 text-(--label-primary)',
        )}
      >
        {results.length ? (
          results.map((app, index) => (
            <button
              type='button'
              role='option'
              id={`spotlight-${app.id}`}
              key={app.id}
              tabIndex={-1}
              aria-selected={index === active}
              className='w-full h-12 flex items-center gap-3 px-2.5 rounded-2xl border-0 bg-transparent text-left aria-selected:text-[white] aria-selected:[background:var(--system-blue)]'
              onPointerMove={() => setActiveIndex(index)}
              onClick={() => launch(app.id)}
            >
              <AppIcon app={app.id} size={32} />
              <span className='min-w-0 flex-1 flex flex-col leading-[1.2]'>
                <strong className='text-[13px] font-semibold'>{app.label}</strong>
                <small className='text-[11px] opacity-[0.7]'>Application</small>
              </span>
              {index === active ? (
                <kbd className='font-[inherit] text-[12px] opacity-[0.75]'>↵</kbd>
              ) : null}
            </button>
          ))
        ) : (
          <p
            className='m-0 px-3 py-4 text-center text-[13px] text-(--label-secondary)'
            role='status'
          >
            No results for “{query.trim()}”
          </p>
        )}
      </div>
    </div>
  );
}
