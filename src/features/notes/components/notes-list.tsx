import { GLASS_SIDEBAR, SIDEBAR_HEADING } from '@/shared/domain/constants/liquid-glass';
import { cn } from '@/shared/utils/cn';
import type { NoteId } from '@/features/notes/domain/enums/note-id';
import type { Note } from '@/features/notes/domain/models/note';

type NotesListProps = {
  notes: readonly Note[];
  selectedId: NoteId;
  onSelectNote: (noteId: NoteId) => void;
};

export function NotesList({ notes, selectedId, onSelectNote }: NotesListProps) {
  return (
    <aside
      className={cn(
        'notes-list',
        GLASS_SIDEBAR,
        'w-61.25 flex-[0_0_245px] px-2 pb-2 overflow-y-auto',
        'max-[900px]:w-45 max-[900px]:basis-45 max-[600px]:hidden',
      )}
    >
      <div className='absolute inset-x-0 top-0 h-11 touch-none' data-window-drag-region />
      <span className={SIDEBAR_HEADING}>Notes</span>
      {notes.map((item) => (
        <button
          type='button'
          key={item.id}
          className={cn(
            `note-row${selectedId === item.id ? ' selected' : ''}`,
            '[&.note-row]:w-full [&.note-row]:px-3 [&.note-row]:py-2.5 [&.note-row]:grid [&.note-row]:grid-cols-[1fr_auto] [&.note-row]:items-baseline [&.note-row]:gap-x-2 [&.note-row]:[border:0] [&.note-row]:rounded-[10px] [&.note-row]:[background:transparent] [&.note-row]:text-left',
            '[&.note-row:not(.selected):hover]:[background:oklch(0.2_0.01_250/0.05)]',
            '[&.note-row.selected]:[background:oklch(0.86_0.13_88/0.9)]',
            '[&.note-row_strong]:overflow-hidden [&.note-row_strong]:whitespace-nowrap [&.note-row_strong]:text-ellipsis [&.note-row_strong]:text-[13px] [&.note-row_strong]:font-semibold',
            '[&.note-row_span]:text-(--label-secondary) [&.note-row_span]:text-[11px]',
            '[&.note-row_p]:col-span-full [&.note-row_p]:m-[2px_0_0] [&.note-row_p]:text-(--label-secondary) [&.note-row_p]:text-[12px] [&.note-row_p]:whitespace-nowrap [&.note-row_p]:overflow-hidden [&.note-row_p]:text-ellipsis',
            '[.desktop--dark_&.note-row.selected]:[background:oklch(0.62_0.12_80/0.55)]',
          )}
          aria-current={selectedId === item.id ? 'page' : undefined}
          onClick={() => onSelectNote(item.id)}
        >
          <strong>{item.title}</strong>
          <span>{item.date}</span>
          <p>{item.preview}</p>
        </button>
      ))}
    </aside>
  );
}
