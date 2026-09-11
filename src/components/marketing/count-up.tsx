"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const format = (prefix: string, v: number) => `${prefix}${Math.round(v).toLocaleString("en-IN")}`;

/**
 * Counts a figure up when it scrolls into view.
 *
 * `power2.out` so the counter lands on its value instead of slamming into it,
 * and `tabular-nums` so the digits don't reflow every frame. The server renders
 * the final value as text — correct with no JS and correct for a crawler — and
 * the tween only ever replaces `textContent`.
 */
export function CountUp({
  to,
  prefix = "",
  duration = 1.6,
  className,
}: {
  to: number;
  /** A plain string rather than a formatter, so a server component can pass it. */
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const counter = { value: 0 };
    const tween = gsap.to(counter, {
      value: to,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = format(prefix, counter.value);
      },
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
      // Held until the trigger fires, so a reader who lands further down never
      // sees the figure flash 0 → final.
      immediateRender: false,
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [to, prefix, duration]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {format(prefix, to)}
    </span>
  );
}
