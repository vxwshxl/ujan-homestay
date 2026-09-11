import { cn } from "@/lib/utils";

/** The phone is designed at one size and scaled as a whole, bezel included. */
export const PHONE_W = 304;
export const PHONE_H = 640;

/**
 * A phone, drawn at a fixed 304×640 and scaled by `--s`.
 *
 * Scaling the whole device (rather than letting it reflow) keeps the bezel,
 * the corner radius and the type inside the screen in proportion at any size,
 * so a 150px phone on a small screen is the same object as the 304px one on a
 * desktop. The scale is a CSS variable set per breakpoint by the caller
 * (`[--s:0.5] lg:[--s:1]`) rather than measured, so the first paint is already
 * the right size — no ResizeObserver and no snap on hydration.
 */
export function PhoneFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("relative shrink-0", className)}
      style={{
        width: `calc(${PHONE_W}px * var(--s, 1))`,
        height: `calc(${PHONE_H}px * var(--s, 1))`,
      }}
    >
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{ width: PHONE_W, height: PHONE_H, scale: "var(--s, 1)" }}
      >
        <div className="relative size-full rounded-phone bg-bezel p-2 shadow-panel ring-1 ring-bezel-edge">
          <div className="relative size-full overflow-hidden rounded-screen bg-background">
            {children}
            <span
              aria-hidden
              className="absolute top-2 left-1/2 z-30 h-6 w-24 -translate-x-1/2 rounded-full bg-bezel"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
