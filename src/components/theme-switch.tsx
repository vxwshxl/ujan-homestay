"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

// Light → system → dark, so the track reads as a spectrum and the knob's
// direction of travel means something.
const MODES = [
  { value: "light", label: "Light theme", icon: Sun },
  { value: "system", label: "System theme", icon: Monitor },
  { value: "dark", label: "Dark theme", icon: Moon },
] as const;

const subscribeNever = () => () => {};

/**
 * Three-way theme switch with a knob that slides to the active segment.
 *
 * The knob moves with `translate: calc(index * 100%)` — segments are equal
 * width, so its own width is exactly one step and nothing is measured. `theme`
 * (not `resolvedTheme`) is read so System stays selected while the OS is dark:
 * the control shows the user's choice, not its outcome.
 */
export function ThemeSwitch({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  // False through SSR and hydration, true after — without a setState-in-effect.
  // Until then both sides render the same neutral position, so the stored
  // theme cannot cause a hydration mismatch.
  const mounted = useSyncExternalStore(subscribeNever, () => true, () => false);

  const index = mounted
    ? Math.max(0, MODES.findIndex((m) => m.value === (theme ?? "system")))
    : 1;

  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      className={cn(
        "relative inline-flex shrink-0 items-center rounded-full bg-muted p-0.5 ring-1 ring-border",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute top-0.5 left-0.5 size-8 rounded-full bg-elevated shadow-e1 transition-[translate,opacity] duration-200 ease-out-strong motion-reduce:transition-none"
        style={{ translate: `calc(${index} * 100%) 0`, opacity: mounted ? 1 : 0 }}
      />
      {MODES.map(({ value, label, icon: Icon }) => {
        const active = mounted && value === (theme ?? "system");
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            onClick={() => setTheme(value)}
            className={cn(
              // The ::after stretches the hit area to 44px without growing the
              // 32px the control occupies in a dense bar.
              "relative z-10 inline-flex size-8 items-center justify-center rounded-full outline-none",
              "after:absolute after:inset-x-0 after:-inset-y-1.5 after:content-['']",
              "transition-[color,scale] duration-150 ease-out-strong active:scale-(--press-scale)",
              "focus-visible:ring-2 focus-visible:ring-ring",
              active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className="size-4" strokeWidth={1.75} aria-hidden />
          </button>
        );
      })}
    </div>
  );
}
