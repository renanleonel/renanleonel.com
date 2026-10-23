import { ROUND_CHECKBOX, WINDOW_TOOLBAR } from '@/shared/domain/constants/liquid-glass';
import { cn } from '@/shared/utils/cn';
import { TODAY_TASKS } from '@/features/notes/domain/constants/today-tasks';
import type { TodayTaskId } from '@/features/notes/domain/enums/today-task-id';
import type { Note } from '@/features/notes/domain/models/note';

type NoteEditorProps = {
  note: Note;
  completedTasks: TodayTaskId[];
  onToggleTask: (taskId: TodayTaskId) => void;
};

export function NoteEditor({ note, completedTasks, onToggleTask }: NoteEditorProps) {
  const completed = new Set<TodayTaskId>(completedTasks);

  return (
    <div className='min-w-0 flex-1 flex flex-col'>
      <div className={cn(WINDOW_TOOLBAR, 'touch-none')} data-window-drag-region />
      <article
        className={cn(
          'note-editor',
          '[&.note-editor]:min-w-0 [&.note-editor]:flex-1 [&.note-editor]:px-12 [&.note-editor]:pt-2 [&.note-editor]:pb-9 [&.note-editor]:overflow-auto [&.note-editor]:text-(--label-primary) [&.note-editor]:[user-select:text]',
          'max-[900px]:[&.note-editor]:px-6',
          '[&.note-editor_time]:block [&.note-editor_time]:mb-6 [&.note-editor_time]:text-(--label-tertiary) [&.note-editor_time]:text-center [&.note-editor_time]:text-[11px] [&.note-editor_time]:font-medium',
          '[&.note-editor_h1]:m-[0_0_16px] [&.note-editor_h1]:text-[26px] [&.note-editor_h1]:font-bold [&.note-editor_h1]:tracking-[-0.02em]',
          '[&.note-editor_h2]:m-[26px_0_8px] [&.note-editor_h2]:text-[18px] [&.note-editor_h2]:font-semibold [&.note-editor_h2]:tracking-[-0.01em]',
          '[&.note-editor_p]:text-[15px] [&.note-editor_p]:leading-[1.6] [&.note-editor_p]:text-pretty',
          '[&.note-editor_li]:text-[15px] [&.note-editor_li]:leading-[1.6]',
          '[&.note-editor_ul]:pl-5',
          '[&.note-editor_blockquote]:m-[28px_0] [&.note-editor_blockquote]:p-[12px_16px] [&.note-editor_blockquote]:rounded-[10px] [&.note-editor_blockquote]:[background:oklch(0.94_0.05_85)] [&.note-editor_blockquote]:text-[16px]',
        )}
        aria-live='polite'
      >
        <time>{note.updated}</time>
        <h1>{note.editorTitle}</h1>
        <p>{note.intro}</p>
        <h2>{note.sectionTitle}</h2>
        <ul
          className={cn(
            'note-task-list',
            '[&.note-task-list]:[--round-checkbox-tint:var(--honey)] [&.note-task-list_input]:mt-[3px]',
            '[&.note-task-list_li.is-complete_span]:text-(--label-tertiary) [&.note-task-list_li.is-complete_span]:[text-decoration:line-through]',
            '[&.note-task-list]:[list-style:none] [&.note-task-list]:pl-0!',
            '[&.note-task-list_li]:m-[7px_0]',
            '[&.note-task-list_label]:flex [&.note-task-list_label]:items-start [&.note-task-list_label]:gap-2.5',
          )}
        >
          {TODAY_TASKS.map((task) => (
            <li className={cn(completed.has(task.id) ? 'is-complete' : '')} key={task.id}>
              <label>
                <input
                  className={ROUND_CHECKBOX}
                  type='checkbox'
                  checked={completed.has(task.id)}
                  onChange={() => onToggleTask(task.id)}
                />
                <span>{task.detail}</span>
              </label>
            </li>
          ))}
        </ul>
        <p>{note.closing}</p>
      </article>
    </div>
  );
}
