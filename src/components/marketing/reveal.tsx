"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Fades a block in the first time it reaches the viewport.
 *
 * The animation is CSS (`.reveal` in globals.css); this only flips a
 * `data-shown` attribute. GSAP already owns the main thread for the pinned
 * hero, so dozens of section reveals are handed to the compositor instead, and
 * an IntersectionObserver needs no per-frame work at all.
 *
 * It reveals once. Content that fades back out on the way up reads as broken
 * on the way back down.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  /** Stagger offset in ms. Keep siblings 40–80ms apart. */
  delay?: number;
  as?: "div" | "section" | "li" | "span" | "p";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Already on screen at mount (a reload mid-page): don't animate what the
    // reader is already looking at.
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.dataset.shown = "";
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        el.dataset.shown = "";
        io.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={cn("reveal", className)}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
