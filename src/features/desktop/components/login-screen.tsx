import { useClock } from '@/features/desktop/hooks/use-clock';
import { cn } from '@/shared/utils/cn';
import { PROFILE } from '@/shared/domain/constants/profile';
type LoginScreenProps = {
  enter: () => void;
  /**
   * The first lock screen replaces the static copy painted by index.html, so it
   * must appear without a fade; later ones (lock, restart) fade in.
   */
  animateIn: boolean;
};
export function LoginScreen({ enter, animateIn }: LoginScreenProps) {
  const now = useClock();
  return (
    <button
      type='button'
      className={cn(
        animateIn && 'animate-[login-in_500ms_ease-out_both]',
        'login-screen [&.login-screen]:absolute [&.login-screen]:inset-0 [&.login-screen]:z-1000 [&.login-screen]:w-full [&.login-screen]:h-full [&.login-screen]:flex [&.login-screen]:flex-col [&.login-screen]:items-center [&.login-screen]:[border:0] [&.login-screen]:text-[white] [&.login-screen]:[background:oklch(0.12_0.04_245/0.22)] [&.login-screen]:[backdrop-filter:blur(11px)_saturate(0.9)] [&.login-screen]:[-webkit-backdrop-filter:blur(11px)_saturate(0.9)] [&.login-screen]:[text-shadow:0_2px_12px_oklch(0.08_0.03_245/0.4)] [&.login-screen]:cursor-default',
        // System stack only, matching the static copy in index.html: the first
        // frame never waits on Inter.
        "[&.login-screen]:font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Text','SF_Pro_Display','Segoe_UI',Roboto,'Helvetica_Neue',sans-serif]",
      )}
      onClick={enter}
    >
      <div
        className={cn(
          'login-time',
          '[&.login-time]:flex [&.login-time]:flex-col [&.login-time]:items-center [&.login-time]:mt-[12vh]',
          '[&.login-time_span]:text-[22px] [&.login-time_span]:font-semibold [&.login-time_span]:tracking-[-0.01em] [&.login-time_span]:text-[oklch(1_0_0/0.86)]',
          '[&.login-time_strong]:mt-1 [&.login-time_strong]:text-[clamp(5.5rem,11vw,9rem)] [&.login-time_strong]:leading-[0.95] [&.login-time_strong]:tracking-[-0.035em] [&.login-time_strong]:font-semibold [&.login-time_strong]:text-[oklch(1_0_0/0.9)] [&.login-time_strong]:[font-variant-numeric:tabular-nums]',
          'max-[600px]:[&.login-time_span]:text-[18px]',
        )}
      >
        <span>
          {now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </span>
        <strong>
          {now
            .toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
            .replace(/\s?[AP]M$/, '')}
        </strong>
      </div>
      <div
        className={cn(
          'login-user',
          '[&.login-user]:flex [&.login-user]:flex-col [&.login-user]:items-center [&.login-user]:mt-auto [&.login-user]:mb-[12vh]',
          '[&.login-user_strong]:text-[15px]',
          '[&.login-user_small]:mt-1.5 [&.login-user_small]:text-[13px] [&.login-user_small]:text-[oklch(1_0_0/0.75)]',
        )}
      >
        <span className='login-avatar [&.login-avatar]:w-18 [&.login-avatar]:h-18 [&.login-avatar]:grid [&.login-avatar]:place-items-center [&.login-avatar]:mb-2.5 [&.login-avatar]:rounded-[50%] [&.login-avatar]:text-[white] [&.login-avatar]:[background:linear-gradient(180deg,oklch(0.79_0.17_70),oklch(0.6_0.18_35))] [&.login-avatar]:[box-shadow:inset_0_0_0_1px_oklch(1_0_0/0.45),0_9px_28px_oklch(0.08_0.03_245/0.25)] [&.login-avatar]:text-[28px] [&.login-avatar]:font-semibold'>
          {PROFILE.initial}
        </span>
        <strong>{PROFILE.firstName}</strong>
        <small>Click to log in</small>
      </div>
    </button>
  );
}
