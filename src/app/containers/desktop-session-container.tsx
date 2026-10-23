import { useState } from 'react';

import { ManagedAppWindowContainer } from '@/app/containers/managed-app-window-container';
import { AppleMenu } from '@/features/desktop/components/apple-menu';
import { BatteryMenu } from '@/features/desktop/components/battery-menu';
import { ControlCenter } from '@/features/desktop/components/control-center';
import { DesktopFiles } from '@/features/desktop/components/desktop-files';
import { DesktopWidgets } from '@/features/desktop/components/desktop-widgets';
import { DisplayDimmer } from '@/features/desktop/components/display-dimmer';
import { Dock } from '@/features/desktop/components/dock';
import { DockHotzone } from '@/features/desktop/components/dock-hotzone';
import { EditMenu } from '@/features/desktop/components/edit-menu';
import { FileMenu } from '@/features/desktop/components/file-menu';
import { ForceQuitDialog } from '@/features/desktop/components/force-quit-dialog';
import { GoMenu } from '@/features/desktop/components/go-menu';
import { HelpMenu } from '@/features/desktop/components/help-menu';
import { KeyboardShortcutsDialog } from '@/features/desktop/components/keyboard-shortcuts-dialog';
import { Launchpad } from '@/features/desktop/components/launchpad';
import { MenuBar } from '@/features/desktop/components/menu-bar';
import { NotificationCenter } from '@/features/desktop/components/notification-center';
import { SiriMenu } from '@/features/desktop/components/siri-menu';
import { Spotlight } from '@/features/desktop/components/spotlight';
import { ViewMenu } from '@/features/desktop/components/view-menu';
import { WifiMenu } from '@/features/desktop/components/wifi-menu';
import { WindowMenu } from '@/features/desktop/components/window-menu';
import { BootMode } from '@/features/desktop/domain/enums/boot-mode';
import { OverlayId } from '@/features/desktop/domain/enums/overlay-id';
import { PowerState } from '@/features/desktop/domain/enums/power-state';
import { SystemDialogId } from '@/features/desktop/domain/enums/system-dialog-id';
import { useDesktopAppearanceActions } from '@/features/desktop/hooks/use-desktop-appearance-actions';
import { useDesktopAppearanceState } from '@/features/desktop/hooks/use-desktop-appearance-state';
import { useDesktopInteractionActions } from '@/features/desktop/hooks/use-desktop-interaction-actions';
import { useDesktopInteractionState } from '@/features/desktop/hooks/use-desktop-interaction-state';
import { useDesktopSessionActions } from '@/features/desktop/hooks/use-desktop-session-actions';
import { useDesktopSessionState } from '@/features/desktop/hooks/use-desktop-session-state';
import { useDesktopShortcuts } from '@/features/desktop/hooks/use-desktop-shortcuts';
import { FinderSection } from '@/features/finder/domain/enums/finder-section';
import { useFinderActions } from '@/features/finder/hooks/use-finder-actions';
import { useFinderState } from '@/features/finder/hooks/use-finder-state';
import { NoteId } from '@/features/notes/domain/enums/note-id';
import { useNotesActions } from '@/features/notes/hooks/use-notes-actions';
import { useNotesState } from '@/features/notes/hooks/use-notes-state';
import { SettingsSectionId } from '@/features/settings/domain/enums/settings-section-id';
import { DESKTOP_REVEAL_EDGES } from '@/features/window-manager/domain/constants/desktop-reveal-edges';
import { DesktopRevealEdge } from '@/features/window-manager/domain/enums/desktop-reveal-edge';
import { WindowLayout } from '@/features/window-manager/domain/enums/window-layout';
import { selectActiveWindow } from '@/features/window-manager/domain/selectors/window-selectors';
import { useWindowActions } from '@/features/window-manager/hooks/use-window-actions';
import { useWindowState } from '@/features/window-manager/hooks/use-window-state';
import { AppId } from '@/shared/domain/enums/app-id';
import { DockUtilityId } from '@/shared/domain/enums/dock-utility-id';
import type { DockId } from '@/shared/domain/models/dock-id';

export function DesktopSessionContainer() {
  const windows = useWindowState();
  const {
    openWindow,
    closeWindow,
    focusWindow,
    arrangeWindow,
    minimizeWindow,
    toggleMaximizeWindow,
  } = useWindowActions();
  const { dark, lowPower, systemPreferences, brightness } = useDesktopAppearanceState();
  const { setDark, setLowPower, updateSystemPreferences, setBrightness } =
    useDesktopAppearanceActions();
  const { systemDialog } = useDesktopSessionState();
  const { setLoggedIn, setBootMode, setPowerState, setSystemDialog } = useDesktopSessionActions();
  const { overlay, showDesktop, selectedDesktopFile } = useDesktopInteractionState();
  const { setOverlay, setShowDesktop, setSelectedDesktopFile } = useDesktopInteractionActions();
  const { preferences: finderPreferences } = useFinderState();
  const { setSection: setFinderSection, updatePreferences: updateFinderPreferences } =
    useFinderActions();
  const { completedTasks } = useNotesState();
  const { selectNote, toggleTask } = useNotesActions();
  const [settingsSection, setSettingsSection] = useState<SettingsSectionId>(
    SettingsSectionId.APPEARANCE,
  );
  const activeWindow = selectActiveWindow(windows);
  const activeApp = activeWindow?.app ?? AppId.FINDER;

  const openApp = (app: AppId) => {
    setShowDesktop(false);
    openWindow(app);
    setOverlay(null);
  };
  const openSettings = (section: SettingsSectionId) => {
    setSettingsSection(section);
    openApp(AppId.SETTINGS);
  };
  const openFinderSection = (section: FinderSection) => {
    setFinderSection(section);
    openApp(AppId.FINDER);
  };
  const launch = (app: DockId) => {
    setShowDesktop(false);
    if (app === DockUtilityId.LAUNCHPAD) {
      if (overlay === OverlayId.LAUNCHPAD) return;
      return setOverlay(OverlayId.LAUNCHPAD);
    }
    if (app === DockUtilityId.MAIL) return openApp(AppId.MESSAGES);
    if (app === DockUtilityId.TRASH) {
      setFinderSection(FinderSection.TRASH);
      return openApp(AppId.FINDER);
    }
    openApp(app);
  };
  const closeOverlay = () => setOverlay(null);
  const minimizeActiveWindow = () => {
    setShowDesktop(false);
    if (activeWindow) minimizeWindow(activeWindow.id);
    setOverlay(null);
  };
  const maximizeActiveWindow = () => {
    setShowDesktop(false);
    if (activeWindow) toggleMaximizeWindow(activeWindow.id);
    setOverlay(null);
  };
  const focusActiveWindow = () => {
    setShowDesktop(false);
    if (activeWindow) focusWindow(activeWindow.id);
    setOverlay(null);
  };
  const arrangeActiveWindow = (layout: WindowLayout) => {
    setShowDesktop(false);
    if (activeWindow) arrangeWindow(activeWindow.id, layout);
    setOverlay(null);
  };
  const openNote = (noteId: NoteId) => {
    selectNote(noteId);
    openApp(AppId.NOTES);
  };
  useDesktopShortcuts(setOverlay, setShowDesktop);

  const revealableWindows = windows.filter((window) => !window.minimized && !window.maximized);
  const revealEdgeByWindow = new Map(
    revealableWindows.map((window, index) => [
      window.id,
      DESKTOP_REVEAL_EDGES[index % DESKTOP_REVEAL_EDGES.length],
    ]),
  );
  const revealIndexByWindow = new Map(
    revealableWindows.map((window, index) => [window.id, index]),
  );
  return (
    <>
      <DesktopWidgets
        windows={windows}
        dark={dark}
        lowPower={lowPower}
        brightness={brightness}
        completedTasks={completedTasks}
        onToggleTask={toggleTask}
        onOpenNote={openNote}
        openSettings={() => openSettings(SettingsSectionId.APPEARANCE)}
      />
      <DesktopFiles
        openApp={openApp}
        selectedFile={selectedDesktopFile}
        onSelectFile={setSelectedDesktopFile}
      />
      {windows.map((window) => (
        <ManagedAppWindowContainer
          key={window.id}
          window={window}
          active={window.id === activeWindow?.id}
          desktopRevealed={showDesktop}
          revealEdge={revealEdgeByWindow.get(window.id) ?? DesktopRevealEdge.LEFT}
          revealIndex={revealIndexByWindow.get(window.id) ?? 0}
          openApp={openApp}
          settingsSection={settingsSection}
          setSettingsSection={setSettingsSection}
        />
      ))}
      <MenuBar
        activeApp={activeApp}
        overlay={overlay}
        onOverlay={setOverlay}
        lowPower={lowPower}
        doNotDisturb={systemPreferences.doNotDisturb}
        setDoNotDisturb={(value) => updateSystemPreferences({ doNotDisturb: value })}
      />
      {overlay === OverlayId.APPLE ? (
        <AppleMenu
          openApp={openApp}
          openSettings={() => openSettings(SettingsSectionId.APPEARANCE)}
          lock={() => {
            setShowDesktop(false);
            setLoggedIn(false);
            setOverlay(null);
          }}
          sleep={() => {
            setOverlay(null);
            setPowerState(PowerState.SLEEPING);
          }}
          forceQuit={() => {
            setOverlay(null);
            setSystemDialog(SystemDialogId.FORCE_QUIT);
          }}
          restart={() => {
            setOverlay(null);
            setLoggedIn(false);
            setBootMode(BootMode.RESTART);
          }}
          shutDown={() => {
            setOverlay(null);
            setLoggedIn(false);
            setPowerState(PowerState.SHUTDOWN);
          }}
        />
      ) : null}
      {overlay === OverlayId.FILE ? <FileMenu openApp={openApp} /> : null}
      {overlay === OverlayId.EDIT ? <EditMenu /> : null}
      {overlay === OverlayId.VIEW ? (
        <ViewMenu
          preferences={finderPreferences}
          updatePreferences={updateFinderPreferences}
          finderCommandsEnabled={activeApp === AppId.FINDER}
          maximized={Boolean(activeWindow?.maximized)}
          maximize={maximizeActiveWindow}
          close={closeOverlay}
        />
      ) : null}
      {overlay === OverlayId.GO ? (
        <GoMenu openFinderSection={openFinderSection} />
      ) : null}
      {overlay === OverlayId.WINDOW ? (
        <WindowMenu
          window={activeWindow}
          minimize={minimizeActiveWindow}
          maximize={maximizeActiveWindow}
          center={() => arrangeActiveWindow(WindowLayout.CENTER)}
          moveToLeftHalf={() => arrangeActiveWindow(WindowLayout.LEFT_HALF)}
          moveToRightHalf={() => arrangeActiveWindow(WindowLayout.RIGHT_HALF)}
          bringToFront={focusActiveWindow}
        />
      ) : null}
      {overlay === OverlayId.HELP ? (
        <HelpMenu
          openApp={openApp}
          openShortcuts={() => {
            setOverlay(null);
            setSystemDialog(SystemDialogId.KEYBOARD_SHORTCUTS);
          }}
        />
      ) : null}
      {overlay === OverlayId.WIFI ? <WifiMenu openSettings={openSettings} /> : null}
      {overlay === OverlayId.BATTERY ? (
        <BatteryMenu
          openSettings={openSettings}
          lowPower={lowPower}
          setLowPower={setLowPower}
        />
      ) : null}
      {overlay === OverlayId.SIRI ? <SiriMenu openApp={openApp} /> : null}
      {overlay === OverlayId.CONTROL ? (
        <ControlCenter
          dark={dark}
          setDark={setDark}
          brightness={brightness}
          setBrightness={setBrightness}
          doNotDisturb={systemPreferences.doNotDisturb}
          setDoNotDisturb={(value) => updateSystemPreferences({ doNotDisturb: value })}
          volume={systemPreferences.volume}
          setVolume={(value) => updateSystemPreferences({ volume: value })}
        />
      ) : null}
      {overlay === OverlayId.NOTIFICATIONS ? (
        <NotificationCenter doNotDisturb={systemPreferences.doNotDisturb} />
      ) : null}
      {overlay === OverlayId.SPOTLIGHT ? (
        <Spotlight openApp={openApp} close={closeOverlay} />
      ) : null}
      {overlay === OverlayId.LAUNCHPAD ? (
        <Launchpad openApp={openApp} close={closeOverlay} />
      ) : null}
      {systemDialog === SystemDialogId.FORCE_QUIT ? (
        <ForceQuitDialog
          windows={windows}
          onQuit={closeWindow}
          onClose={() => setSystemDialog(null)}
        />
      ) : null}
      {systemDialog === SystemDialogId.KEYBOARD_SHORTCUTS ? (
        <KeyboardShortcutsDialog onClose={() => setSystemDialog(null)} />
      ) : null}
      <DockHotzone />
      <Dock
        windows={windows}
        launch={launch}
        size={systemPreferences.dockSize}
        showRecentApps={systemPreferences.showRecentApps}
      />
      <DisplayDimmer brightness={brightness} />
    </>
  );
}
