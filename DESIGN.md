# Design System

## Direction

Pixel-conscious macOS 27 Tahoe simulation: sunlit ocean wallpaper, transparent menu bar, dense Finder chrome, bright app icons, and liquid-glass surfaces that reveal the desktop beneath them.

## Color

- Brand seed: `oklch(0.817 0.161 75.1)` honey, used sparingly inside Notes and highlights.
- System blue: `oklch(0.67 0.17 245)` for selection and focus.
- Background: the ocean wallpaper; no flat application background.
- Window: translucent neutral whites, with high-opacity content regions.
- Ink: near-black `oklch(0.22 0.01 250)` for strong contrast.

## Typography

Use the native Apple system stack (`-apple-system`, BlinkMacSystemFont, `SF Pro Display`, `SF Pro Text`) so the simulation inherits the closest available San Francisco metrics. Other platforms fall back to self-hosted Inter (`public/fonts`, `font-display: optional`, so text never reflows). The lock screen uses the system stack only, so the first frame never waits on a font. Window titles are 15px bold, sidebar rows and controls 13px, captions 11px; content uses 14–17px; display moments (the lock-screen clock) stay restrained in weight.

## Materials

Liquid Glass surfaces compose the constants in `src/shared/domain/constants/liquid-glass.ts`: `GLASS_MENU` (menus, Spotlight, popovers), `GLASS_DOCK`, `GLASS_MODULE` and `CONTROL_TOGGLE` (Control Center modules and toggles), `GLASS_WIDGET`, `GLASS_SIDEBAR`, and the toolbar set (`WINDOW_TOOLBAR`, `GLASS_TOOLBAR_GROUP`, `TOOLBAR_BUTTON`, `GLASS_TOOLBAR_FIELD`). Each is a Tailwind class string pairing a lensing backdrop with a **directional** specular rim — brightest on the top edge where light enters, softer on the bottom where it exits, dimmest on the sides. That asymmetry is what separates glass from frosted plastic; a uniform `ring` reads flat. Each constant carries its own `.desktop--dark` variant, so dark appearance needs nothing added in `desktop-shell.tsx`.

Two constraints are baked into how that file is written, and both are easy to undo by accident:

- **The rim is stacked inset shadows, not a masked gradient border.** Tailwind emits each arbitrary property as a separate declaration and may order `mask-composite` before the `mask` shorthand, which resets it — leaving the gradient veiling the whole element instead of just its edge.
- **Classes are spelled out literally**, never assembled from template literals, because Tailwind scans raw source text and will not generate a class it cannot see.

Keep `saturate()` at or below ~1.3. Past that the wallpaper's colour drags through and every panel turns blue.

The menu bar carries **no** material at all — Tahoe's has no fill, blur, or divider. Legibility comes entirely from a soft shadow on the glyphs. Menu titles materialise a glass pill only on hover or while open.

Main application content stays opaque for reading.

### Window chrome

Windows default to Tahoe's **unified** chrome (`WindowChrome.UNIFIED` in the application registry): no title strip; the traffic lights float 20px from the left edge, centered in a 52px toolbar row; the sidebar is a floating glass slab inset 8px; toolbar controls are grouped into 36px glass capsules; the window title (or current location) is 15px bold in the toolbar. Apps mark draggable areas with `data-window-drag-region`. Terminal keeps a classic 32px centered-title bar (`WindowChrome.TITLE_BAR`).

### Concentric corners

Radii are derived from one rule — inner radius = outer radius − inset — so every corner shares a center: 26px unified windows → 18px sidebars (8px inset) → 10px sidebar rows (8px inset); 36px toolbar capsules (fully round) sit 8px from the window edge. Title-bar windows use 16px, widgets 22px, menus 14px, Spotlight is a capsule, and the Dock 22px.

### Controls

Settings toggles are Tahoe switches (`SYSTEM_SWITCH`), checklists use Apple's round check (`ROUND_CHECKBOX`, honey in Notes), sidebar selection is a quiet grey capsule with accent-tinted icons (System Settings and Messages use an accent fill), and menu highlights are flat accent fills. App icons use Apple's top-to-bottom gradients, with drawn Finder, Safari, Photos, and Notes artwork.

## Motion

Use fast exponential ease-out movement for opening, focusing, and Dock hover. Window dragging is direct. Minimize collapses toward the Dock. Launching an app from the Dock bounces its icon once, and pressing an icon darkens it. Reduced-motion users receive fades or instant state changes.

## Layout

The desktop fills the viewport with a 28px menu bar and a bottom Dock. Menu-bar dropdowns open under the title that was clicked. Widgets sit in the top-left, desktop files in the top-right, and app windows occupy the central work area. On narrow screens, windows become inset full-screen sheets and nonessential widgets disappear.
