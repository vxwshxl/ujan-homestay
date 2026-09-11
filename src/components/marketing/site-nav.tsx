"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Wordmark } from "@/components/brand";
import { WhatsAppIcon } from "@/components/brand-icons";
import { ThemeSwitch } from "@/components/theme-switch";
import { NAV, WHATSAPP_HREF } from "@/lib/site";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type NavId = (typeof NAV)[number]["id"];

/** Space kept between the bottom of the island and the footer's top edge. */
const FOOTER_GAP = 12;

/**
 * The header: a floating island that contracts once the hero is behind you.
 *
 * ScrollTrigger decides *when* (one callback at one threshold, no per-frame
 * work) and CSS decides *how*, so the morph runs on the compositor even while
 * the pinned hero keeps GSAP busy.
 *
 * Below `md` it is two rows — brand and actions, then the section links — so
 * every link stays reachable on a 360px phone instead of hiding behind a menu.
 * A pill slides under whichever section you are reading.
 */
export function SiteNav() {
  const header = useRef<HTMLElement>(null);
  const island = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState<NavId | null>(null);

  // The bar yields to the footer: once the footer's top edge reaches the
  // island, the header is pushed up by the same amount, one-to-one with the
  // scroll, so it never floats over the footer heading.
  useEffect(() => {
    const el = header.current;
    if (!el) return;
    let frame = 0;
    let shift = 0;

    const update = () => {
      frame = 0;
      const stop = document.querySelector("[data-nav-stop]");
      const edge = stop ? stop.getBoundingClientRect().top : Infinity;
      const next = Math.min(0, edge - el.offsetHeight - FOOTER_GAP);
      if (next === shift) return;
      shift = next;
      el.style.transform = shift ? `translate3d(0, ${shift}px, 0)` : "";
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  // Contract once the bar has cleared roughly its own height of scroll.
  useGSAP(() => {
    const st = ScrollTrigger.create({
      start: "top -88",
      end: 99999,
      onToggle: ({ isActive }) => {
        const el = island.current;
        if (!el) return;
        if (isActive) el.dataset.stuck = "";
        else delete el.dataset.stuck;
      },
    });
    return () => st.kill();
  });

  // Scroll-spy: a thin band just above the middle of the viewport decides which
  // section you are "in".
  useEffect(() => {
    const owner = new Map<string, NavId>();
    for (const item of NAV) for (const id of item.sections) owner.set(id, item.id);

    const inBand = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) inBand.add(e.target.id);
          else inBand.delete(e.target.id);
        }
        const hit = [...inBand][0];
        setActive(hit ? (owner.get(hit) ?? null) : null);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const id of owner.keys()) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  // Slide the pill under the active link. Measured, because the links size to
  // their labels. When the pill has been hidden it appears in place rather
  // than sliding in from the left edge.
  useEffect(() => {
    const el = pill.current;
    const bar = track.current;
    if (!el || !bar) return;

    const place = () => {
      const link = active ? bar.querySelector<HTMLElement>(`[data-nav="${active}"]`) : null;
      if (!link) {
        el.style.opacity = "0";
        return;
      }
      const wasHidden = el.style.opacity !== "1";
      if (wasHidden) el.style.transition = "none";
      el.style.width = `${link.offsetWidth}px`;
      el.style.transform = `translateX(${link.offsetLeft}px)`;
      el.style.opacity = "1";
      if (wasHidden) {
        void el.offsetWidth;
        el.style.transition = "";
      }
    };

    place();
    const ro = new ResizeObserver(place);
    ro.observe(bar);
    return () => ro.disconnect();
  }, [active]);

  return (
    <header ref={header} className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div
        ref={island}
        className={cn(
          "group/nav pointer-events-auto mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-3 gap-y-2 border border-transparent px-3 py-2",
          "rounded-2xl md:flex-nowrap md:rounded-full",
          "transition-[max-width,background-color,border-color,box-shadow] duration-[400ms] ease-out-strong",
          "data-stuck:max-w-4xl data-stuck:border-border data-stuck:bg-elevated/80 data-stuck:shadow-e3 data-stuck:backdrop-blur-xl",
          // On a phone the island sits right on the headline from the first
          // frame, so it needs its own ground immediately.
          "max-md:border-border max-md:bg-elevated/85 max-md:shadow-e3 max-md:backdrop-blur-xl",
        )}
      >
        <a
          href="#top"
          aria-label="Ujan Homestay — back to top"
          className="press order-1 shrink-0 rounded-lg focus-visible:outline-offset-4"
        >
          <Wordmark taglineClassName="max-lg:hidden group-data-stuck/nav:hidden" />
        </a>

        <nav aria-label="Sections" className="order-3 w-full min-w-0 md:order-2 md:mx-auto md:w-auto">
          <div
            ref={track}
            className="relative flex items-center rounded-full border border-border bg-elevated p-1 shadow-e1"
          >
            <span
              ref={pill}
              aria-hidden
              className="pointer-events-none absolute top-1 bottom-1 left-0 rounded-full bg-primary opacity-0 transition-[transform,width,opacity] duration-300 ease-out-strong motion-reduce:transition-none"
            />
            {NAV.map((item) => {
              const isActive = active === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  data-nav={item.id}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative z-10 flex h-9 flex-auto items-center justify-center rounded-full px-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 md:flex-none md:px-3 lg:px-4",
                    "after:absolute after:inset-x-0 after:-inset-y-1 after:content-['']",
                    isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </nav>

        <div className="order-2 ml-auto flex shrink-0 items-center gap-2 md:order-3 md:ml-0">
          <ThemeSwitch />
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="press relative inline-flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 after:absolute after:inset-x-0 after:-inset-y-0.5 after:content-['']"
          >
            <WhatsAppIcon className="size-4" />
            <span>
              Book<span className="max-xl:hidden"> on WhatsApp</span>
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
