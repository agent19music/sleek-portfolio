'use client'

import { ReactNode } from 'react'
import { CaretLeftIcon as ChevronLeft, SunIcon as Sun, MoonIcon as Moon, DeviceMobileCameraIcon as Smartphone, MonitorIcon as Monitor } from '@phosphor-icons/react'


export type PreviewMode = 'desktop' | 'mobile'
export type Theme = 'dark' | 'light'

interface LornaShellProps {
  /** Title shown in the top bar (e.g. "Booked Therapists" or "Component gallery"). */
  title?: string
  /** Optional sub-label rendered in monospace next to the title. */
  subtitle?: string
  /** Current preview mode. When undefined, the mode toggle is hidden. */
  mode?: PreviewMode
  onModeChange?: (mode: PreviewMode) => void
  onBack?: () => void
  /** When true the back button is rendered visibly disabled and does nothing. */
  backDisabled?: boolean
  theme: Theme
  onThemeChange: (theme: Theme) => void
  children: ReactNode
}

/**
 * Shared chrome for the /lorna gallery. Scopes the Linear design tokens to
 * `.lorna-root` so they never leak into the rest of the site's theme.
 *
 * Theme switching works by re-mapping the semantic token *values* under
 * `[data-theme="light"]` — every class keeps referencing the same variable
 * names (`--color-pitch-black`, `--color-graphite`, ...) but those names
 * resolve to inverted surfaces in light mode. The Neon Lime accent is the
 * one identity-bearing color and stays identical across both themes.
 */
export function LornaShell({
  title,
  subtitle,
  mode,
  onModeChange,
  onBack,
  backDisabled,
  theme,
  onThemeChange,
  children,
}: LornaShellProps) {
  return (
    <div className="lorna-root min-h-screen w-full" data-theme={theme}>
      {/* Scoped design tokens — only apply inside .lorna-root. */}
      <style>{lornaTokens}</style>

      {/* Top bar */}
      <header
        className="
          sticky top-0 z-20
          flex items-center justify-between
          bg-[var(--color-pitch-black)]/85
          backdrop-blur
          px-4 sm:px-6 py-2.5
        "
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            disabled={backDisabled || !onBack}
            aria-label="Go back"
            className="
              inline-flex items-center justify-center
              h-8 w-8
              rounded-full
              border border-[var(--color-charcoal-grey)]
              bg-[var(--color-graphite)]
              text-[var(--color-light-steel)]
              hover:text-[var(--color-porcelain)]
              hover:border-[var(--color-muted-ash)]
              active:bg-[var(--color-deep-slate)]
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors
            "
          >
            <ChevronLeft className="w-3.5 h-3.5" aria-hidden />
          </button>

          {title && (
            <div className="flex items-baseline gap-2 min-w-0">
              <h2
                className="text-[14px] text-[var(--color-porcelain)] truncate"
                style={{ fontWeight: 510, letterSpacing: '-0.13px' }}
              >
                {title}
              </h2>
              {subtitle ? (
                <span
                  className="lorna-mono hidden sm:inline text-[12px] text-[var(--color-storm-cloud)]"
                  style={{ letterSpacing: '-0.15px' }}
                >
                  {subtitle}
                </span>
              ) : null}
            </div>
          )}
        </div>

        {}
        <div className="flex items-center gap-2">
          {/* Mode toggle */}
          {mode && onModeChange ? (
            <div
              role="group"
              aria-label="Preview mode"
              className="
                hidden sm:inline-flex items-center gap-0.5
                border border-[var(--color-charcoal-grey)]
                rounded-[10px] p-1
                bg-[var(--color-graphite)]
              "
            >
              <ModeButton
                active={mode === 'desktop'}
                onClick={() => onModeChange('desktop')}
                icon={<Monitor className="w-3.5 h-3.5" aria-hidden />}
                label="Desktop"
              />
              <ModeButton
                active={mode === 'mobile'}
                onClick={() => onModeChange('mobile')}
                icon={<Smartphone className="w-3.5 h-3.5" aria-hidden />}
                label="Mobile"
              />
            </div>
          ) : null}

          {/* Theme toggle — always at the far right */}
          <button
            type="button"
            onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            aria-pressed={theme === 'light'}
            className="
              inline-flex items-center justify-center
              h-8 w-8
              rounded-full
              border border-[var(--color-charcoal-grey)]
              bg-[var(--color-graphite)]
              text-[var(--color-light-steel)]
              hover:text-[var(--color-porcelain)]
              hover:border-[var(--color-muted-ash)]
              active:bg-[var(--color-deep-slate)]
              transition-colors
            "
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5" aria-hidden />
            ) : (
              <Moon className="w-3.5 h-3.5" aria-hidden />
            )}
          </button>
        </div>
      </header>

      {/* Body */}
      <main className="px-4 sm:px-8 py-10 sm:py-14">{children}</main>
    </div>
  )
}

function ModeButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: ReactNode
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        active
          ? 'inline-flex items-center gap-1.5 rounded-[8px] px-2.5 py-1 text-[12px] bg-[var(--color-deep-slate)] text-[var(--color-porcelain)] [box-shadow:var(--shadow-subtle-6)] transition'
          : 'inline-flex items-center gap-1.5 rounded-[8px] px-2.5 py-1 text-[12px] text-[var(--color-storm-cloud)] hover:text-[var(--color-porcelain)] transition'
      }
      style={{ letterSpacing: '-0.11px' }}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

/**
 * Renders the mockup framed by the requested device (desktop card vs iPhone 15 Pro).
 * The mockup itself is responsive — the frame just defines its width.
 */
export function PreviewFrame({
  mode,
  children,
}: {
  mode: PreviewMode
  children: ReactNode
}) {
  if (mode === 'mobile') {
    return (
      <div className="flex justify-center">
        <div
          className="
            relative
            w-[393px] h-[852px]
            rounded-[44px]
            border-[10px] border-[var(--color-charcoal-grey)]
            overflow-hidden
            [box-shadow:var(--shadow-xl)]
            bg-[var(--color-pitch-black)]
          "
          aria-label="iPhone 15 Pro preview"
        >
          {/* Dynamic Island — always reads as a dark cutout regardless of theme */}
          <div
            aria-hidden
            className="absolute top-2 left-1/2 -translate-x-1/2 z-10 h-[28px] w-[110px] rounded-full bg-[var(--color-ink)]"
          />
          <div className="h-full w-full overflow-y-auto" style={{ containerType: 'inline-size' }}>{children}</div>
        </div>
      </div>
    )
  }

  // Desktop: a contained card that mimics an app window.
  return (
    <div className="mx-auto max-w-5xl">
      <div
        className="
          rounded-[12px]
          overflow-hidden
          [box-shadow:var(--shadow-xl)]
          border border-[var(--color-charcoal-grey)]
          bg-[var(--color-graphite)]
        "
        aria-label="Desktop preview"
      >
        {/* Faux titlebar */}
        <div className="flex items-center gap-1.5 border-b border-[var(--color-charcoal-grey)] bg-[var(--color-deep-slate)] px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-muted-ash)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-muted-ash)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-muted-ash)]" />
          <span
            className="lorna-mono ml-3 text-[11px] text-[var(--color-fog-grey)]"
            style={{ letterSpacing: '-0.15px' }}
          >
            therapy.app / sessions
          </span>
        </div>
        <div style={{ containerType: 'inline-size' }}>{children}</div>
      </div>
    </div>
  )
}

/**
 * Linear "Midnight Command Center" tokens. Scoped to `.lorna-root` only so the
 * rest of the site's theme is untouched. Fonts use `ui-sans-serif` / `ui-monospace`
 * as documented substitutes for Inter Variable / Berkeley Mono.
 *
 * Light mode keeps the same *token names* but remaps them to a clean
 * light-Linear palette (white canvas, near-black text, neutral surfaces).
 * Neon Lime is identity — it does NOT change between themes. `--color-ink`
 * is a constant "always-dark" foreground used for content sitting on lime.
 */
const lornaTokens = `
.lorna-root {
  /* Dark (default) — Midnight Command Center */
  --color-pitch-black: #08090a;
  --color-graphite: #0f1011;
  --color-deep-slate: #161718;
  --color-charcoal-grey: #23252a;
  --color-muted-ash: #323334;
  --color-gunmetal: #383b3f;
  --color-porcelain: #f7f8f8;
  --color-light-steel: #d0d6e0;
  --color-storm-cloud: #8a8f98;
  --color-fog-grey: #62666d;
  --color-neon-lime: #e4f222;
  --color-ink: #08090a;

  /* Soft, present-but-unobtrusive shadows. If you notice the shadow before
     the content, it's too strong — these prioritize blur over opacity. */
  --shadow-sm: rgba(0, 0, 0, 0.25) 0px 4px 12px 0px;
  --shadow-subtle: rgb(35, 37, 42) 0px 0px 0px 1px inset;
  --shadow-subtle-2: rgba(0, 0, 0, 0.18) 0px 0px 0px 1px;
  --shadow-subtle-6: rgba(255, 255, 255, 0.04) 0px 0px 0px 1px inset, rgba(255, 255, 255, 0.05) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.4) 0px 0px 0px 1px, rgba(0, 0, 0, 0.08) 0px 4px 8px 0px;
  --shadow-xl: rgba(0, 0, 0, 0.35) 0px 12px 48px -8px, rgba(0, 0, 0, 0.2) 0px 4px 16px -4px;
  --shadow-card: 0 8px 24px rgba(0, 0, 0, 0.28);
  --shadow-card-hover: 0 12px 32px rgba(0, 0, 0, 0.4);

  background: var(--color-pitch-black);
  color: var(--color-porcelain);
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-feature-settings: "cv01", "ss03";
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  transition: background-color 160ms ease, color 160ms ease;
}

.lorna-root[data-theme="light"] {
  /* Inverted: surfaces stack from #ffffff up to subtle warm greys. */
  --color-pitch-black: #ffffff;
  --color-graphite: #fafafa;
  --color-deep-slate: #f3f4f5;
  --color-charcoal-grey: #e4e6ea;
  --color-muted-ash: #d4d7dc;
  --color-gunmetal: #e8eaee;
  --color-porcelain: #0a0b0d;
  --color-light-steel: #2a2c31;
  --color-storm-cloud: #5e6068;
  --color-fog-grey: #8a8d94;
  /* Neon Lime stays identical — single accent across both themes */
  --color-neon-lime: #e4f222;
  --color-ink: #08090a;

  --shadow-sm: rgba(15, 17, 21, 0.04) 0px 4px 12px 0px;
  --shadow-subtle: rgb(228, 230, 234) 0px 0px 0px 1px inset;
  --shadow-subtle-2: rgba(15, 17, 21, 0.06) 0px 0px 0px 1px;
  --shadow-subtle-6: rgba(15, 17, 21, 0.03) 0px 0px 0px 1px inset, rgba(15, 17, 21, 0.04) 0px 1px 0px 0px inset, rgba(15, 17, 21, 0.05) 0px 0px 0px 1px, rgba(15, 17, 21, 0.03) 0px 4px 8px 0px;
  --shadow-xl: rgba(15, 17, 21, 0.08) 0px 12px 48px -8px, rgba(15, 17, 21, 0.04) 0px 4px 16px -4px;
  --shadow-card: 0 8px 24px rgba(0, 0, 0, 0.03);
  --shadow-card-hover: 0 12px 32px rgba(0, 0, 0, 0.06);
}

.lorna-root .lorna-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  font-feature-settings: "tnum";
}
`
