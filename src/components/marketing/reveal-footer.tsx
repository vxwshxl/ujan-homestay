"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Pins the footer behind the page so the last screenful of scrolling uncovers
 * it rather than arriving at it.
 *
 * The footer goes `fixed` at the bottom, and a transparent spacer of exactly
 * its measured height holds its place in the document. Two safety rails:
 *
 * - The spacer is measured, not guessed — the footer's columns rewrap at
 *   breakpoints and a hardcoded height would clip it or leave a gap.
 * - It gives up above 92% of the viewport height. A bottom-anchored fixed
 *   element taller than the screen has its top cut off with no way to scroll to
 *   it, so on short phones the footer simply stays in normal flow.
 *
 * It starts in flow and only pins after the first measurement, so the footer
 * is reachable with no JS at all.
 */
export function RevealFooter({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [spacer, setSpacer] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const height = el.offsetHeight;
      setSpacer(height > 0 && height <= window.innerHeight * 0.92 ? height : null);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    // A viewport that shrinks around an unchanged footer is invisible to the
    // ResizeObserver, and it is the case that decides whether pinning is safe.
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const revealing = spacer !== null;

  return (
    <>
      {/* While pinned, the visible top edge of the footer is where the page
          ends — the top of this spacer — so the spacer is the header's stop
          line (see SiteNav). */}
      {revealing && <div aria-hidden data-nav-stop style={{ height: spacer }} />}
      <div ref={ref} className={revealing ? "fixed inset-x-0 bottom-0 z-0" : undefined}>
        {children}
      </div>
    </>
  );
}
