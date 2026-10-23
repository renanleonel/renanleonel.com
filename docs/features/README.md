# Feature catalog

This guide maps user-visible behavior to the feature that owns it. Use it to find the right source before changing UI, copy, state, or integrations.

## System features

### Desktop

Path: `src/features/desktop`

Desktop owns the operating-system shell rather than a single window. It includes:

- boot, login, sleep, shutdown, and power-on screens;
- wallpaper, dark theme, accent variables, brightness dimmer, and low-power state;
- menu bar and Apple/File/Edit/View/Go/Window/Help menus;
- Wi-Fi, Battery, Siri, Control Center, and Notification Center overlays;
- Spotlight, Launchpad, keyboard-shortcuts dialog, and Force Quit dialog;
- Dock, Dock hot zone, desktop files, calendar/weather/system/Today widgets;
- global keyboard shortcuts and the live clock/weather lifecycle.

State is split into session, appearance, and interaction state/action contexts. Desktop persistence is owned by adapters in `desktop/adapters/`; application identity is read from the shared registry.

Important source files:

| Concern | Source |
| --- | --- |
| State owner | `containers/desktop-provider.tsx` |
| Cross-surface assembly | `src/app/containers/desktop-composition-container.tsx` (entry) and `desktop-session-container.tsx` (after login) |
| Dock and Launchpad order | `domain/constants/dock-applications.ts`, `launchpad-applications.ts` |
| Menu-to-overlay mapping | `domain/constants/menu-overlays.ts` |
| System preference defaults | `domain/constants/default-system-preferences.ts` |
| Accent palette | `domain/constants/accent-colors.ts` |
| Weather | `adapters/maringa-weather.ts`, `hooks/use-maringa-weather.ts` |

### Window manager

Path: `src/features/window-manager`

The window manager is application-agnostic. It owns window state and mechanics but never imports simulated application UI.

Capabilities include single-instance open/restore, close, focus, z-order, dragging, clamping, minimize, maximize, center, left-half/right-half arrangements, responsive bounds, and desktop-reveal transforms.

Important source files:

| Concern | Source |
| --- | --- |
| Provider/actions | `containers/window-manager-provider.tsx` |
| State machine | `domain/reducers/window-reducer.ts` |
| Initial Finder window | `domain/constants/initial-window.ts` |
| Layout calculations | `domain/calculate-window-layout.ts`, `domain/clamp-window-position.ts` |
| Pointer and maximize animation | `hooks/use-window-interactions.ts` |
| Window frame | `components/app-window.tsx` |

## Simulated applications

### Finder

Path: `src/features/finder`

Finder is the primary portfolio navigation experience and the only application loaded with the desktop session. It opens initially in the Portfolio section and keeps a per-window back/forward history (`finder/domain/reducers/navigate-finder-history.ts`).

Capabilities:

- section navigation through the sidebar and Go menu;
- query filtering by entry name;
- Icons, List, Columns, and Gallery view selection;
- sidebar, preview pane, status bar, and icon-size preferences;
- selection and cross-application opening from file entries;
- share-to-Messages and copy-current-URL actions;
- toolbar menus with outside-pointer dismissal.

Finder preferences persist in `macos27:finder-preferences`; current section, query, selection, and open popover do not. Its portfolio hierarchy and app destinations are defined in `domain/constants/finder-sections.ts`.

### Safari

Path: `src/features/safari`

Safari renders the portfolio webpage inside a Safari 26 frame (sidebar and history capsules, a centred address field with a working reload, share / new tab / tab overview). The page scrolls beneath the glass toolbar. It is not a general-purpose browser and does not navigate remote pages.

The page (`components/safari-page.tsx`) lists the account's eight most recently pushed repositories and recent dev.to posts. `domain/selectors/select-recent-repositories.ts` picks the repositories: original, non-archived work with a description, newest push first. They render from a build-time snapshot and are refreshed from the `/api/github-repositories` server function; `domain/constants/recent-repositories.ts` is the fallback for builds that could not reach GitHub. Reload remounts the page and refetches.

### Messages

Path: `src/features/messages`

Messages renders searchable contacts and a selected conversation. Visitors can switch chats and submit any non-empty composer value as a local sent bubble. Search matches contact details and conversation copy. Messages does not contact a server or persist drafts, search, selection, or sent replies.

- Contacts: `domain/constants/message-contacts.ts`
- Conversation copy: `domain/constants/conversation-messages.ts`
- Local search, selection, draft, and sent-message state: `containers/messages-container.tsx`

The Dock's Mail utility intentionally opens Messages.

### Photos

Path: `src/features/photos`

Photos is a static generated gallery. It maps the titles in `domain/constants/photo-titles.ts` to styled tiles in `components/photos-content.tsx`; it does not load image files, upload media, or persist a library.

Desktop photo files and Finder entries can open this application.

### Notes

Path: `src/features/notes`

Notes renders authored note content and shares a Today checklist with the desktop widget.

- Notes are immutable content from `domain/constants/notes.ts`.
- Today tasks come from `domain/constants/today-tasks.ts`.
- `NotesProvider` owns selected note and completed task IDs.
- Task toggles use a pure reducer and persist to `macos27:today-completed`.
- Selecting a task from the desktop widget can open the corresponding note workflow through the app composition layer.

Note text is not editable even though it is displayed in an editor-like surface. Only Today-task completion persists.

### Terminal

Path: `src/features/terminal`

Terminal is a local command simulator. `TerminalContainer` owns input and output lines, while `domain/execute-terminal-command.ts` remains pure.

Supported commands:

| Command | Behavior |
| --- | --- |
| `help` | Lists available commands. |
| `about` | Prints short biography copy. |
| `projects` | Prints placeholder project names. |
| `contact` | Prints placeholder email/social values. |
| `skills` | Prints the current skills line. |
| `date` | Prints the browser's current date string. |
| `clear` | Clears the terminal history. |

Unknown commands receive a local zsh-style error. Nothing is executed on the operating system, and history resets when the Terminal window closes.

### System Settings

Path: `src/features/settings`

Settings provides ten sidebar sections: Wi-Fi, Bluetooth, Network, Notifications, Sound, Battery, Focus, General, Appearance, and Desktop & Dock.

Desktop-owned values are passed through `src/app/containers/settings-content-container.tsx`:

- appearance light/dark state;
- accent color;
- low-power mode;
- Dock auto-hide, size, and recent apps;
- Do Not Disturb and volume.

Accent, Dock, Do Not Disturb, and volume values use Desktop persistence. Dark mode and low power are session-only. Other panel switches are simulated local state created from `domain/constants/settings-panel-copy.ts` and reset when Settings content unmounts.

The selected section is owned by `DesktopCompositionContainer`, so menus can open Settings directly to a section and the section survives closing/reopening the window during the same page session.

### About This Mac

Path: `src/features/about`

About presents the portfolio as device information. Device values live in `domain/constants/about-device-specifications.ts`; biography/social markup and placeholder URLs live in `components/about-content.tsx`.

The `More Info` control is intentionally inert. Replace the GitHub, LinkedIn, and email links before treating the site as production content.

## Shared user-facing contracts

Application identity is spread across a few purposeful owners:

| Contract | Source of truth |
| --- | --- |
| Stable application ID | `src/shared/domain/enums/app-id.ts` |
| Label, title, initial size and position | `src/shared/domain/constants/application-registry.ts` |
| App UI implementation and lazy import | `src/app/containers/app-content-container.tsx` |
| Dock order | `src/features/desktop/domain/constants/dock-applications.ts` |
| Launchpad order | `src/features/desktop/domain/constants/launchpad-applications.ts` |
| Finder portfolio entries | `src/features/finder/domain/constants/finder-sections.ts` |
| App/utility glyph mapping | `src/shared/components/app-icon.tsx` |

Adding or removing an application requires reviewing every row, then updating this guide and the application table in the root README.

## Current product boundaries

- Portfolio projects, biography, contact information, and social links include placeholder values.
- There is no backend, authentication, real messaging, file system, shell execution, or photo library.
- Weather from Open-Meteo is the only feature-owned network request; Vercel Web Analytics separately reports production page views and visitor metrics at the application entry point.
- Many controls intentionally simulate macOS visual state without changing an underlying platform capability.
- The window manager supports one instance per application.

Treat these as documented product behavior. Change them only when the task includes a product change, then update the implementation, root README, and this guide together.
