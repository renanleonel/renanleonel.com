import { List } from 'lucide-react';

import {
  TODAY_TASKS,
  TODAY_WIDGET_TASK_LIMIT,
} from '@/features/notes/domain/constants/today-tasks';
import { NoteId } from '@/features/notes/domain/enums/note-id';
import type { TodayTaskId } from '@/features/notes/domain/enums/today-task-id';
import { GLASS_WIDGET, ROUND_CHECKBOX } from '@/shared/domain/constants/liquid-glass';
import { cn } from '@/shared/utils/cn';

type TodayWidgetProps = {
  completedTasks: TodayTaskId[];
  onToggleTask: (taskId: TodayTaskId) => void;
  onOpenNote: (noteId: NoteId) => void;
};

/**
 * Apple's small Reminders widget: the list glyph and remaining count on top,
 * the list name in its colour, then the first few items with round checkboxes.
 */
export function TodayWidget({ completedTasks, onToggleTask, onOpenNote }: TodayWidgetProps) {
  const completed = new Set<TodayTaskId>(completedTasks);
  const remainingTasks = TODAY_TASKS.length - completedTasks.length;
  // A macOS widget is a fixed-size summary: it shows what fits and sends you to
  // the app for the rest. It never scrolls.
  const visibleTasks = TODAY_TASKS.slice(0, TODAY_WIDGET_TASK_LIMIT);

  return (
    <section className={cn(GLASS_WIDGET, 'flex flex-col px-4 pt-3.5 pb-2')}>
      <button
        type='button'
        className='flex flex-col border-0 bg-transparent p-0 text-left text-(--system-blue) cursor-default'
        aria-label='Open Start here in Notes'
        onClick={() => onOpenNote(NoteId.GUIDE)}
      >
        <span className='flex w-full items-start justify-between'>
          <span className='grid size-6.5 place-items-center rounded-full bg-(--system-blue) text-white'>
            <List size={14} strokeWidth={2.75} />
          </span>
          <span className='text-[24px] leading-6.5 font-semibold tabular-nums'>{remainingTasks}</span>
        </span>
        <strong className='mt-1 text-[13px] leading-4 font-semibold'>Start here</strong>
      </button>
      <span className='sr-only' aria-live='polite'>
        {remainingTasks === 0 ? 'All complete' : `${remainingTasks} remaining`}
      </span>
      <div className='mt-1 flex flex-col'>
        {visibleTasks.map((task, index) => (
          <label className='min-w-0 h-6.75 flex items-center gap-2 text-[12px]' key={task.id}>
            <input
              className={cn(ROUND_CHECKBOX, 'size-4!')}
              type='checkbox'
              checked={completed.has(task.id)}
              onChange={() => onToggleTask(task.id)}
            />
            <span
              className={cn(
                'min-w-0 flex-1 self-stretch flex items-center truncate',
                index < visibleTasks.length - 1 && '[border-bottom:0.5px_solid_var(--separator)]',
                completed.has(task.id) && 'text-(--label-tertiary)',
              )}
            >
              <span className='truncate'>{task.label}</span>
            </span>
          </label>
        ))}
      </div>
    </section>
  );
}
