import { BIRTHDAY } from '@/features/desktop/domain/constants/calendar-events';
import {
  calendarEventForDate,
  isBirthdayMonth,
} from '@/features/desktop/domain/selectors/calendar-event-for-date';
import { GLASS_WIDGET } from '@/shared/domain/constants/liquid-glass';
import { cn } from '@/shared/utils/cn';

type CalendarWidgetProps = { now: Date };

/** Calendar's system red, used for the weekday, month, and today marker. */
const CALENDAR_RED = 'text-[oklch(0.63_0.23_27)]';

/**
 * Apple's medium Calendar widget: today and the next event on the left, the
 * month on the right with today circled in red.
 */
export function CalendarWidget({ now }: CalendarWidgetProps) {
  const weekday = now.toLocaleDateString('en-US', { weekday: 'long' });
  const month = now.toLocaleDateString('en-US', { month: 'long' });
  const start = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
  const days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const event = calendarEventForDate(now);
  const showsBirthday = isBirthdayMonth(now);
  return (
    <section className={cn(GLASS_WIDGET, 'col-span-full grid grid-cols-[1fr_164px] gap-4 p-4')}>
      <div className='min-w-0 flex flex-col'>
        <span className={cn(CALENDAR_RED, 'text-[11px] leading-3.5 font-semibold uppercase tracking-[0.03em]')}>
          {weekday}
        </span>
        <span className='text-[40px] leading-11 font-light tracking-[-0.02em] tabular-nums'>
          {now.getDate()}
        </span>
        <div
          className={cn(
            'relative mt-auto min-w-0 flex flex-col rounded-[7px] py-1 pr-2 pl-3',
            "before:absolute before:inset-y-1 before:left-1 before:w-0.75 before:rounded-full before:content-['']",
            event.isBirthday
              ? 'bg-[color-mix(in_oklch,var(--honey)_18%,transparent)] before:bg-(--honey)'
              : 'bg-[color-mix(in_oklch,var(--system-blue)_14%,transparent)] before:bg-(--system-blue)',
          )}
        >
          <span className='truncate text-[12px] leading-4 font-semibold'>{event.title}</span>
          <small className='truncate text-[11px] leading-3.5 text-(--label-secondary)'>{event.detail}</small>
        </div>
      </div>
      <div className='min-w-0 flex flex-col'>
        <span className={cn(CALENDAR_RED, 'mb-1 ps-1 text-[10px] leading-3.5 font-bold uppercase tracking-[0.03em]')}>
          {month}
        </span>
        <div
          className='grid flex-1 grid-cols-7 content-between text-center text-[10px] leading-4 font-medium tabular-nums'
          aria-label={`${month} ${now.getFullYear()}`}
        >
          {'SMTWTFS'.split('').map((day, index) => (
            <span className='text-[9px] font-semibold text-(--label-secondary)' key={`${day}-${index}`}>
              {day}
            </span>
          ))}
          {Array.from({ length: start }).map((_, index) => (
            <span key={`empty-${index}`} />
          ))}
          {Array.from({ length: days }, (_, index) => index + 1).map((day) => {
            const weekend = (start + day - 1) % 7 === 0 || (start + day - 1) % 7 === 6;
            const birthday = showsBirthday && day === BIRTHDAY.day;
            return (
              <span
                className={cn(
                  'mx-auto grid size-4.25 place-items-center rounded-full',
                  // The filled circle wins when the birthday is also today.
                  day === now.getDate()
                    ? 'bg-[oklch(0.63_0.23_27)] font-semibold text-white'
                    : birthday
                      ? 'font-bold text-(--honey)'
                      : weekend && 'text-(--label-secondary)',
                )}
                key={day}
                title={birthday ? 'Birthday' : undefined}
              >
                {day}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
