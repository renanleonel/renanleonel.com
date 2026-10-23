import { Folder, Images, Sparkles } from 'lucide-react';
import { useState } from 'react';

import { PHOTO_TITLES } from '@/features/photos/domain/constants/photo-titles';
import {
  GLASS_SIDEBAR,
  GLASS_TOOLBAR_GROUP,
  SIDEBAR_HEADING,
  SIDEBAR_ROW,
  TOOLBAR_BUTTON,
  WINDOW_TOOLBAR,
} from '@/shared/domain/constants/liquid-glass';
import { cn } from '@/shared/utils/cn';

const LIBRARY_SCALES = ['Years', 'Months', 'Days', 'All Photos'] as const;

export function PhotosContent() {
  const [libraryScale, setLibraryScale] = useState<(typeof LIBRARY_SCALES)[number]>('All Photos');

  return (
    <div
      className={cn(
        'photos-app',
        'h-full flex text-(--label-primary) [background:var(--material-content)]',
      )}
    >
      <aside
        className={cn(
          GLASS_SIDEBAR,
          'w-50 flex-[0_0_200px] px-2 pb-2 overflow-y-auto',
          'max-[900px]:w-41.25 max-[900px]:basis-41.25 max-[600px]:hidden',
        )}
      >
        <div className='absolute inset-x-0 top-0 h-11 touch-none' data-window-drag-region />
        <span className={SIDEBAR_HEADING}>Photos</span>
        <button type='button' className={SIDEBAR_ROW} aria-current='page'>
          <Images size={16} strokeWidth={1.9} />
          Library
        </button>
        <button type='button' className={SIDEBAR_ROW}>
          <Sparkles size={16} strokeWidth={1.9} />
          Featured
        </button>
        <button type='button' className={SIDEBAR_ROW}>
          <Folder size={16} strokeWidth={1.9} />
          Projects
        </button>
      </aside>
      <div className='min-w-0 flex-1 flex flex-col'>
        <div
          className={cn(WINDOW_TOOLBAR, 'touch-none pl-4 max-[600px]:pl-24')}
          data-window-drag-region
        >
          <div className='min-w-0 flex flex-col leading-[1.15]'>
            <h2 className='m-0 truncate text-[15px] font-bold tracking-[-0.01em]'>Library</h2>
            <span className='text-[11px] text-(--label-secondary)'>
              Interface studies · {PHOTO_TITLES.length} items
            </span>
          </div>
          <span className='flex-1' />
          <div
            className={cn(GLASS_TOOLBAR_GROUP, 'max-[700px]:hidden')}
            role='group'
            aria-label='Library zoom'
          >
            {LIBRARY_SCALES.map((scale) => (
              <button
                type='button'
                key={scale}
                className={cn(TOOLBAR_BUTTON, 'px-3 text-[12px] font-medium')}
                aria-pressed={scale === libraryScale}
                onClick={() => setLibraryScale(scale)}
              >
                {scale}
              </button>
            ))}
          </div>
        </div>
        <main className='min-h-0 flex-1 overflow-auto px-2 pb-2'>
          <div className='photo-grid [&.photo-grid]:grid [&.photo-grid]:grid-cols-[repeat(4,minmax(100px,1fr))] [&.photo-grid]:gap-0.5 [&.photo-grid]:rounded-[14px] [&.photo-grid]:overflow-hidden max-[600px]:[&.photo-grid]:grid-cols-[repeat(2,1fr)]'>
            {PHOTO_TITLES.map((title, index) => (
              <div
                className={cn(
                  `photo-tile photo-tile--${index + 1}`,
                  '[&.photo-tile]:relative [&.photo-tile]:aspect-[1] [&.photo-tile]:overflow-hidden [&.photo-tile]:bg-cover [&.photo-tile]:bg-center',
                  '[&.photo-tile_span]:absolute [&.photo-tile_span]:inset-[auto_8px_7px] [&.photo-tile_span]:text-[white] [&.photo-tile_span]:opacity-[0] [&.photo-tile_span]:[text-shadow:0_1px_4px_black] [&.photo-tile_span]:text-[12px] [&.photo-tile_span]:[transition:opacity_150ms]',
                  '[&.photo-tile:hover_span]:opacity-[1]',
                  '[&.photo-tile.photo-tile--1]:[background:radial-gradient(circle_at_30%_35%,oklch(0.9_0.15_80),transparent_20%),linear-gradient(135deg,oklch(0.57_0.18_252),oklch(0.78_0.13_210))]',
                  '[&.photo-tile.photo-tile--2]:[background:linear-gradient(140deg,oklch(0.18_0.02_250)_0_45%,oklch(0.92_0.01_250)_45%)]',
                  '[&.photo-tile.photo-tile--3]:[background:radial-gradient(ellipse_at_60%_20%,oklch(0.84_0.13_190),transparent_30%),linear-gradient(oklch(0.38_0.13_225),oklch(0.18_0.08_245))]',
                  '[&.photo-tile.photo-tile--4]:[background:repeating-radial-gradient(circle_at_10%_100%,oklch(0.2_0.01_250)_0_10px,oklch(0.86_0.01_250)_12px_20px)]',
                  '[&.photo-tile.photo-tile--5]:[background:linear-gradient(35deg,oklch(0.38_0.15_145),oklch(0.82_0.16_95))]',
                  '[&.photo-tile.photo-tile--6]:[background:linear-gradient(115deg,oklch(0.73_0.22_28),oklch(0.61_0.2_325))]',
                  '[&.photo-tile.photo-tile--7]:[background:radial-gradient(circle_at_70%_30%,white_0_5%,transparent_6%),linear-gradient(145deg,oklch(0.8_0.12_230),oklch(0.92_0.06_80))]',
                  '[&.photo-tile.photo-tile--8]:[background:conic-gradient(from_20deg,oklch(0.42_0.17_260),oklch(0.71_0.2_330),oklch(0.78_0.18_75),oklch(0.42_0.17_260))]',
                )}
                key={title}
              >
                <span>{title}</span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
