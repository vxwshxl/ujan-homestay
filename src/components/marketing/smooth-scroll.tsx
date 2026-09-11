"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Momentum scrolling, and the single place Lenis and GSAP are wired together.
 *
 * They share one clock: Lenis is driven from GSAP's ticker and every Lenis
 * scroll pushes `ScrollTrigger.update`. Two independent rAF loops would lay the
 * pinned hero out against a one-frame-stale position — a 1px shimmer on every
 * wheel tick. `lagSmoothing(0)` for the same reason: GSAP's catch-up would
 * invent a scroll position the page is not at.
 *
 * Under reduced motion Lenis is never constructed; native scrolling is both
 * cheaper and closer to what the setting asks for.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Touch already has momentum in hardware; overriding it feels detached.
      syncTouch: false,
      // In-page links glide instead of teleporting. Lenis honours each
      // section's scroll-margin-top, so the fixed header never covers a heading.
      anchors: true,
    });

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, []);

  return null;
}
