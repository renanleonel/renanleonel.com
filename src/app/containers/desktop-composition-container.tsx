import {
  useEffect,
  useState,
  type ComponentType,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react';

import { BootScreen } from '@/features/desktop/components/boot-screen';
import { DesktopShell } from '@/features/desktop/components/desktop-shell';
import { LoginScreen } from '@/features/desktop/components/login-screen';
import { ShutdownScreen } from '@/features/desktop/components/shutdown-screen';
import { SleepScreen } from '@/features/desktop/components/sleep-screen';
import { ACCENT_COLORS } from '@/features/desktop/domain/constants/accent-colors';
import { BootMode } from '@/features/desktop/domain/enums/boot-mode';
import { PowerState } from '@/features/desktop/domain/enums/power-state';
import { useDesktopAppearanceState } from '@/features/desktop/hooks/use-desktop-appearance-state';
import { useDesktopInteractionActions } from '@/features/desktop/hooks/use-desktop-interaction-actions';
import { useDesktopInteractionState } from '@/features/desktop/hooks/use-desktop-interaction-state';
import { useDesktopSessionActions } from '@/features/desktop/hooks/use-desktop-session-actions';
import { useDesktopSessionState } from '@/features/desktop/hooks/use-desktop-session-state';
import { selectFullscreenWindow } from '@/features/window-manager/domain/selectors/window-selectors';
import { useWindowState } from '@/features/window-manager/hooks/use-window-state';

// The logged-in desktop is a separate chunk. The lock screen starts fetching it
// on mount and keeps the loaded component in state, so login renders it in the
// same commit. `React.lazy` would suspend once even when the chunk is cached,
// leaving a frame of bare wallpaper between the lock screen and the desktop.
const loadDesktopSession = () =>
  import('@/app/containers/desktop-session-container').then(
    ({ DesktopSessionContainer }) => DesktopSessionContainer,
  );

export function DesktopCompositionContainer() {
  const windows = useWindowState();
  const { dark, accentColor, systemPreferences } = useDesktopAppearanceState();
  const { loggedIn, bootMode, powerState } = useDesktopSessionState();
  const { setLoggedIn, setBootMode, setPowerState } = useDesktopSessionActions();
  const { showDesktop } = useDesktopInteractionState();
  const { setOverlay, setShowDesktop, setSelectedDesktopFile } = useDesktopInteractionActions();
  const fullscreenWindow = selectFullscreenWindow(windows);
  const accent = ACCENT_COLORS[accentColor];
  const desktopStyle = {
    '--system-blue': accent.color,
    '--system-blue-deep': accent.deep,
    '--keyboard-focus': accent.color,
    '--link-color': accent.deep,
  } as CSSProperties;
  const [sessionStarted, setSessionStarted] = useState(false);
  const [DesktopSession, setDesktopSession] = useState<ComponentType | null>(null);
  const hasRevealableWindows = windows.some((window) => !window.minimized && !window.maximized);

  const loadSession = () =>
    loadDesktopSession().then(
      (session) => setDesktopSession(() => session),
      () => undefined,
    );

  useEffect(() => {
    void loadSession();
  }, []);

  const onDesktopPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    setOverlay(null);
    if (event.target !== event.currentTarget) return;
    setSelectedDesktopFile(null);
    if (fullscreenWindow || !hasRevealableWindows) return;
    setShowDesktop((current) => !current);
  };

  if (bootMode) return <BootScreen />;
  if (powerState === PowerState.SLEEPING) {
    return <SleepScreen wake={() => setPowerState(PowerState.AWAKE)} />;
  }
  if (powerState === PowerState.SHUTDOWN) {
    return (
      <ShutdownScreen
        powerOn={() => {
          setPowerState(PowerState.AWAKE);
          setBootMode(BootMode.STARTUP);
        }}
      />
    );
  }

  return (
    <DesktopShell
      dark={dark}
      fullscreen={Boolean(fullscreenWindow)}
      showingDesktop={showDesktop}
      dockAutoHide={systemPreferences.dockAutoHide}
      style={desktopStyle}
      onPointerDown={onDesktopPointerDown}
    >
      {/* The lock screen stays up until the session chunk has arrived. */}
      {loggedIn && DesktopSession ? (
        <DesktopSession />
      ) : (
        <LoginScreen
          animateIn={sessionStarted}
          enter={() => {
            setSessionStarted(true);
            setLoggedIn(true);
            if (!DesktopSession) void loadSession();
          }}
        />
      )}
    </DesktopShell>
  );
}
