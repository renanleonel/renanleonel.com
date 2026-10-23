import { cn } from '@/shared/utils/cn';

/**
 * Liquid Glass material (macOS 27 Tahoe), expressed as Tailwind class strings.
 *
 * A Tahoe surface is not one translucent fill. It is a lensing backdrop plus a
 * *directional* specular rim — brightest where light enters (top edge), softer
 * where it exits (bottom edge), dimmest on the sides. That asymmetry is the tell
 * that separates real glass from frosted plastic.
 *
 * Two constraints shape how this is written:
 *
 *  - The rim is stacked inset shadows, not a masked gradient border. Tailwind
 *    emits each arbitrary property as its own declaration and may order
 *    `mask-composite` before the `mask` shorthand, which resets it and leaves the
 *    gradient veiling the whole element instead of just its edge.
 *  - Every class is spelled out literally. Tailwind scans raw source text, so a
 *    class assembled from a template literal is never generated.
 *
 * Saturation stays low on purpose. Past roughly 1.3 the wallpaper's colour drags
 * through the surface and every panel turns blue.
 */

/** Backdrop lensing. Neutral enough that panels read grey-white, not tinted. */
const BACKDROP =
  '[backdrop-filter:blur(30px)_saturate(1.25)] [-webkit-backdrop-filter:blur(30px)_saturate(1.25)]';

/**
 * Menu-bar dropdowns and Control Center. Light and near-neutral, the way macOS
 * keeps menus readable over any wallpaper.
 */
export const GLASS_MENU = cn(
  'relative rounded-[14px] [background:oklch(1_0_0/0.62)]',
  BACKDROP,
  '[box-shadow:inset_0_1px_0_oklch(1_0_0/0.8),inset_1px_0_0_oklch(1_0_0/0.34),inset_-1px_0_0_oklch(1_0_0/0.26),inset_0_-1px_0_oklch(1_0_0/0.5),0_16px_38px_oklch(0.08_0.03_245/0.2),0_3px_10px_oklch(0.08_0.03_245/0.12)]',
  '[.desktop--dark_&]:[background:oklch(0.21_0.008_250/0.74)]',
  '[.desktop--dark_&]:[box-shadow:inset_0_1px_0_oklch(1_0_0/0.22),inset_1px_0_0_oklch(1_0_0/0.09),inset_-1px_0_0_oklch(1_0_0/0.07),inset_0_-1px_0_oklch(1_0_0/0.14),0_16px_38px_oklch(0.01_0.005_250/0.46),0_3px_10px_oklch(0.01_0.005_250/0.3)]',
);

/** The Dock: more transparent than a menu, so the icons stay the subject. */
export const GLASS_DOCK = cn(
  'relative rounded-[22px] [background:oklch(1_0_0/0.3)]',
  BACKDROP,
  '[box-shadow:inset_0_1px_0_oklch(1_0_0/0.8),inset_1px_0_0_oklch(1_0_0/0.34),inset_-1px_0_0_oklch(1_0_0/0.26),inset_0_-1px_0_oklch(1_0_0/0.5),0_10px_28px_oklch(0.08_0.03_245/0.18),0_2px_6px_oklch(0.08_0.03_245/0.12)]',
  '[.desktop--dark_&]:[background:oklch(0.18_0.008_250/0.46)]',
  '[.desktop--dark_&]:[box-shadow:inset_0_1px_0_oklch(1_0_0/0.22),inset_1px_0_0_oklch(1_0_0/0.09),inset_-1px_0_0_oklch(1_0_0/0.07),inset_0_-1px_0_oklch(1_0_0/0.14),0_10px_28px_oklch(0.01_0.005_250/0.42)]',
);

/**
 * A Control Center module: a platter nested on the panel's glass. It carries no
 * backdrop filter of its own — stacking blurs muddies what sits behind both —
 * and stays near-neutral so the wallpaper tint does not wash it blue. The 18px
 * radius is concentric with the 28px panel at its 10px inset.
 */
export const GLASS_MODULE = cn(
  'relative rounded-[18px] [background:oklch(1_0_0/0.5)]',
  '[box-shadow:inset_0_1px_0_oklch(1_0_0/0.75),inset_0_0_0_0.5px_oklch(1_0_0/0.5),0_1px_3px_oklch(0.2_0.02_250/0.08)]',
  '[.desktop--dark_&]:[background:oklch(1_0_0/0.08)] [.desktop--dark_&]:[box-shadow:inset_0_1px_0_oklch(1_0_0/0.12),inset_0_0_0_0.5px_oklch(1_0_0/0.08)]',
);

/**
 * Control Center's round toggle: a quiet grey disc when off, a solid accent
 * disc with a white glyph when on.
 */
export const CONTROL_TOGGLE = cn(
  'size-7.5 flex-none grid place-items-center rounded-full text-(--label-primary) [background:oklch(0.2_0.01_250/0.1)]',
  '[transition:background-color_180ms_ease-out,color_180ms_ease-out]',
  'group-hover:[background:oklch(0.2_0.01_250/0.15)] group-active:[background:oklch(0.2_0.01_250/0.22)]',
  'group-aria-pressed:text-white group-aria-pressed:[background:var(--system-blue)]',
  '[.desktop--dark_&]:[background:oklch(1_0_0/0.14)] [.desktop--dark_&]:group-hover:[background:oklch(1_0_0/0.2)]',
  '[.desktop--dark_&]:group-aria-pressed:[background:var(--system-blue)]',
);

/** Surfaces opt out of translucency when the user asks the system to reduce it. */
export const GLASS_REDUCED_TRANSPARENCY =
  '[@media(prefers-reduced-transparency:_reduce)]:[backdrop-filter:none] [@media(prefers-reduced-transparency:_reduce)]:[-webkit-backdrop-filter:none] [@media(prefers-reduced-transparency:_reduce)]:[background:var(--window-background)]';

/**
 * Tahoe's floating sidebar: a glass slab inset 8px from the window edge. Its
 * 18px radius is concentric with the 26px window corner (26 − 8). The top 44px
 * is left clear for the traffic lights the window manager floats over it.
 */
export const GLASS_SIDEBAR = cn(
  'relative m-2 mr-0 rounded-[18px] pt-11 [background:oklch(0.962_0.004_250/0.84)]',
  '[backdrop-filter:blur(24px)_saturate(1.2)] [-webkit-backdrop-filter:blur(24px)_saturate(1.2)]',
  '[box-shadow:inset_0_1px_0_oklch(1_0_0/0.9),inset_0_0_0_1px_oklch(1_0_0/0.4),0_0_0_0.5px_oklch(0.25_0.01_250/0.1),0_4px_14px_oklch(0.2_0.02_250/0.07)]',
  '[.desktop--dark_&]:[background:oklch(0.25_0.006_250/0.82)]',
  '[.desktop--dark_&]:[box-shadow:inset_0_1px_0_oklch(1_0_0/0.14),inset_0_0_0_1px_oklch(1_0_0/0.06),0_0_0_0.5px_oklch(0_0_0/0.5),0_4px_14px_oklch(0_0_0/0.28)]',
  '[@media(prefers-reduced-transparency:_reduce)]:[backdrop-filter:none] [@media(prefers-reduced-transparency:_reduce)]:[-webkit-backdrop-filter:none]',
);

/**
 * The 52px toolbar row of a unified window. Toolbar capsules are 36px tall, so
 * they sit 8px from the top edge — the same inset the sidebar uses, which keeps
 * every corner in the window concentric. The row is a window drag region.
 */
export const WINDOW_TOOLBAR =
  'relative z-10 h-13 flex-[0_0_52px] flex items-center gap-2 px-2 text-(--label-primary)';

/**
 * A group of toolbar controls sharing one glass capsule — Tahoe's replacement
 * for borderless toolbar icons.
 */
export const GLASS_TOOLBAR_GROUP = cn(
  'relative h-9 flex flex-none items-center gap-0.5 p-0.5 rounded-full [background:oklch(1_0_0/0.8)]',
  '[backdrop-filter:blur(12px)_saturate(1.2)] [-webkit-backdrop-filter:blur(12px)_saturate(1.2)]',
  '[box-shadow:inset_0_1px_0_oklch(1_0_0/0.95),0_0_0_0.5px_oklch(0.25_0.01_250/0.12),0_2px_8px_oklch(0.2_0.02_250/0.08)]',
  '[.desktop--dark_&]:[background:oklch(0.32_0.006_250/0.78)]',
  '[.desktop--dark_&]:[box-shadow:inset_0_1px_0_oklch(1_0_0/0.14),0_0_0_0.5px_oklch(0_0_0/0.5),0_2px_8px_oklch(0_0_0/0.24)]',
);

/** A single icon control inside a toolbar capsule. */
export const TOOLBAR_BUTTON = cn(
  'h-8 min-w-8 grid place-items-center px-1.5 rounded-full border-0 bg-transparent text-(--label-primary)',
  '[transition:background-color_140ms_ease-out]',
  'hover:[background:oklch(0.2_0.01_250/0.07)] active:[background:oklch(0.2_0.01_250/0.13)]',
  'disabled:text-(--label-quaternary) disabled:hover:bg-transparent',
  'aria-expanded:[background:oklch(0.2_0.01_250/0.1)] aria-pressed:[background:oklch(0.2_0.01_250/0.1)]',
  '[.desktop--dark_&]:hover:[background:oklch(1_0_0/0.1)] [.desktop--dark_&]:active:[background:oklch(1_0_0/0.16)]',
  '[.desktop--dark_&]:aria-expanded:[background:oklch(1_0_0/0.14)] [.desktop--dark_&]:aria-pressed:[background:oklch(1_0_0/0.14)]',
);

/** A search or address field drawn as a toolbar capsule. */
export const GLASS_TOOLBAR_FIELD = cn(
  'h-9 flex items-center gap-1.5 px-3 rounded-full text-[13px] text-(--label-secondary) [background:oklch(1_0_0/0.8)]',
  '[box-shadow:inset_0_1px_0_oklch(1_0_0/0.95),0_0_0_0.5px_oklch(0.25_0.01_250/0.12),0_2px_8px_oklch(0.2_0.02_250/0.08)]',
  'focus-within:[box-shadow:inset_0_1px_0_oklch(1_0_0/0.95),0_0_0_0.5px_oklch(0.25_0.01_250/0.12),0_0_0_3px_color-mix(in_oklch,var(--keyboard-focus)_45%,transparent)]',
  '[&_input]:min-w-0 [&_input]:w-full [&_input]:border-0 [&_input]:bg-transparent [&_input]:text-(--label-primary) [&_input]:outline-none! [&_input]:placeholder:text-(--label-tertiary)',
  '[.desktop--dark_&]:[background:oklch(0.32_0.006_250/0.78)]',
  '[.desktop--dark_&]:[box-shadow:inset_0_1px_0_oklch(1_0_0/0.14),0_0_0_0.5px_oklch(0_0_0/0.5),0_2px_8px_oklch(0_0_0/0.24)]',
);

/**
 * A sidebar row. 10px radius keeps it concentric with the 18px sidebar at its
 * 8px inset. Selection is a quiet grey capsule with an accent-tinted icon.
 */
export const SIDEBAR_ROW = cn(
  'w-full h-7.5 flex items-center gap-2 px-2.5 rounded-[10px] border-0 bg-transparent text-left text-[13px] text-(--label-primary)',
  '[&_svg]:flex-none [&_svg]:text-(--system-blue)',
  'hover:[background:oklch(0.2_0.01_250/0.05)]',
  'aria-[current=page]:[background:oklch(0.2_0.01_250/0.09)] aria-[current=page]:font-[560]',
  '[.desktop--dark_&]:hover:[background:oklch(1_0_0/0.06)] [.desktop--dark_&]:aria-[current=page]:[background:oklch(1_0_0/0.12)]',
);

/** Small grey section label above a group of sidebar rows. */
export const SIDEBAR_HEADING =
  'block mx-2.5 mt-3 mb-1 first:mt-1 text-[11px] font-[650] text-(--label-secondary)';

/**
 * A checkbox drawn as a Tahoe switch. The knob is a pair of radial gradients
 * (white disc over a soft shadow ring) so it can slide with
 * `background-position` — no pseudo-elements, which inputs do not reliably own.
 */
export const SYSTEM_SWITCH = cn(
  'appearance-none flex-none w-10 h-6 m-0 rounded-full cursor-default',
  '[background:radial-gradient(circle_at_center,white_0_9.5px,oklch(0_0_0/0.14)_10px,transparent_11.5px)_0_0/24px_24px_no-repeat,oklch(0.2_0.01_250/0.13)]',
  '[transition:background-position_200ms_var(--ease-mac),background-color_200ms_ease-out]',
  'checked:[background:radial-gradient(circle_at_center,white_0_9.5px,oklch(0_0_0/0.14)_10px,transparent_11.5px)_16px_0/24px_24px_no-repeat,var(--system-blue)]',
  '[.desktop--dark_&]:[background:radial-gradient(circle_at_center,white_0_9.5px,oklch(0_0_0/0.3)_10px,transparent_11.5px)_0_0/24px_24px_no-repeat,oklch(1_0_0/0.16)]',
  '[.desktop--dark_&]:checked:[background:radial-gradient(circle_at_center,white_0_9.5px,oklch(0_0_0/0.3)_10px,transparent_11.5px)_16px_0/24px_24px_no-repeat,var(--system-blue)]',
);

/**
 * The small switch used in menu-bar menus and System Settings rows: the same
 * construction as `SYSTEM_SWITCH`, at the 32 × 18 size macOS uses there.
 */
export const MENU_SWITCH = cn(
  'appearance-none flex-none w-8 h-4.5 m-0 rounded-full cursor-default',
  '[background:radial-gradient(circle_at_center,white_0_7px,oklch(0_0_0/0.14)_7.5px,transparent_8.5px)_0_0/18px_18px_no-repeat,oklch(0.2_0.01_250/0.14)]',
  '[transition:background-position_200ms_var(--ease-mac),background-color_200ms_ease-out]',
  'checked:[background:radial-gradient(circle_at_center,white_0_7px,oklch(0_0_0/0.14)_7.5px,transparent_8.5px)_14px_0/18px_18px_no-repeat,var(--system-blue)]',
  '[.desktop--dark_&]:[background:radial-gradient(circle_at_center,white_0_7px,oklch(0_0_0/0.3)_7.5px,transparent_8.5px)_0_0/18px_18px_no-repeat,oklch(1_0_0/0.18)]',
  '[.desktop--dark_&]:checked:[background:radial-gradient(circle_at_center,white_0_7px,oklch(0_0_0/0.3)_7.5px,transparent_8.5px)_14px_0/18px_18px_no-repeat,var(--system-blue)]',
);

/**
 * A native range input drawn as a macOS slider: a 4px rail filled with the
 * accent up to the value, and a white knob with a soft shadow. Set `--fill` to
 * the filled percentage on the input.
 */
export const SYSTEM_SLIDER = cn(
  'h-5 m-0 appearance-none bg-transparent cursor-default',
  '[&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:[background:linear-gradient(90deg,var(--system-blue)_var(--fill,0%),oklch(0.2_0.01_250/0.14)_var(--fill,0%))]',
  '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:-mt-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:[box-shadow:0_0_0_0.5px_oklch(0_0_0/0.14),0_1px_3px_oklch(0_0_0/0.22)]',
  '[&::-moz-range-track]:h-1 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:[background:linear-gradient(90deg,var(--system-blue)_var(--fill,0%),oklch(0.2_0.01_250/0.14)_var(--fill,0%))]',
  '[&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:[box-shadow:0_0_0_0.5px_oklch(0_0_0/0.14),0_1px_3px_oklch(0_0_0/0.22)]',
  '[.desktop--dark_&::-webkit-slider-runnable-track]:[background:linear-gradient(90deg,var(--system-blue)_var(--fill,0%),oklch(1_0_0/0.18)_var(--fill,0%))]',
  '[.desktop--dark_&::-moz-range-track]:[background:linear-gradient(90deg,var(--system-blue)_var(--fill,0%),oklch(1_0_0/0.18)_var(--fill,0%))]',
);

/**
 * A desktop widget: the same lensing backdrop and directional rim as a menu,
 * but more transparent so the wallpaper reads through, as Tahoe's desktop
 * widgets do. Small widgets are 166px squares and medium ones span two columns
 * at the same height; 22px corners match the system widget proportion.
 */
export const GLASS_WIDGET = cn(
  'widget relative min-w-0 h-41.5 overflow-hidden rounded-[22px] text-[13px] text-(--label-primary) pointer-events-auto [background:oklch(1_0_0/0.58)]',
  BACKDROP,
  '[box-shadow:inset_0_1px_0_oklch(1_0_0/0.85),inset_1px_0_0_oklch(1_0_0/0.34),inset_-1px_0_0_oklch(1_0_0/0.26),inset_0_-1px_0_oklch(1_0_0/0.45),0_8px_24px_oklch(0.08_0.03_245/0.16),0_1px_4px_oklch(0.08_0.03_245/0.1)]',
  '[.desktop--dark_&]:[background:oklch(0.2_0.008_250/0.62)]',
  '[.desktop--dark_&]:[box-shadow:inset_0_1px_0_oklch(1_0_0/0.2),inset_1px_0_0_oklch(1_0_0/0.08),inset_-1px_0_0_oklch(1_0_0/0.06),inset_0_-1px_0_oklch(1_0_0/0.12),0_8px_24px_oklch(0.01_0.005_250/0.4)]',
  '[@media(prefers-reduced-transparency:_reduce)]:[backdrop-filter:none] [@media(prefers-reduced-transparency:_reduce)]:[-webkit-backdrop-filter:none] [@media(prefers-reduced-transparency:_reduce)]:[background:var(--window-background)]',
);

/**
 * Apple's round checklist control (Reminders, Notes): an empty ring that fills
 * with the accent and a white check when done.
 */
export const ROUND_CHECKBOX = cn(
  'appearance-none flex-none size-4.5 m-0 grid place-items-center rounded-full cursor-default',
  '[border:1.5px_solid_var(--label-quaternary)] [transition:background-color_140ms_ease-out,border-color_140ms_ease-out]',
  'checked:[border-color:var(--round-checkbox-tint,var(--system-blue))] checked:[background:var(--round-checkbox-tint,var(--system-blue))_url(data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2016%2016%27%3E%3Cpath%20d=%27M4.5%208.2l2.3%202.3%204.7-5%27%20fill=%27none%27%20stroke=%27white%27%20stroke-width=%272%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27/%3E%3C/svg%3E)_center/100%_no-repeat]',
);
