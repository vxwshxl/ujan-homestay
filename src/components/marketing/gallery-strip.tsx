"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { INSTAGRAM } from "@/lib/site";
import { cn } from "@/lib/utils";

type Photo = {
  src: string;
  alt: string;
  ratio: string;
  title: string;
  meta: string;
  position?: string;
  /** Reel stills carry Instagram's play button, so they open the reel's home. */
  reel?: boolean;
};

const PHOTOS: Photo[] = [
  {
    src: "/images/ujan-corner.jpg",
    alt: "Ujan Homestay AC room with a double bed, patterned bedspread and turquoise walls",
    ratio: "9 / 16",
    title: "The AC room",
    meta: "Watch on Instagram",
    reel: true,
  },
  {
    src: "/images/ujan-living.jpg",
    alt: "Collage of Ujan Homestay's bright turquoise guest room with the Ujan logo",
    ratio: "1 / 1",
    title: "Rooms & corners",
    meta: "Bright, tidy and guest-ready",
  },
  {
    src: "/images/ujan-kitchen.jpg",
    alt: "Ujan Homestay guest room seen from the doorway, with a ceiling fan and a double bed",
    ratio: "9 / 16",
    title: "Room to unwind",
    meta: "Watch on Instagram",
    reel: true,
  },
  {
    src: "/images/ujan-room.jpg",
    alt: "A framed flower print and a woven mirror on a turquoise wall at Ujan Homestay",
    ratio: "1 / 1",
    title: "Little details",
    meta: "The touches that make it home",
  },
  {
    src: "/images/ujan-house.jpg",
    alt: "Ujan Homestay at night, with lit bedroom and kitchen windows",
    ratio: "3 / 4",
    title: "Ujan after dark",
    meta: "Feel at home, away from home",
    position: "left",
  },
];

/**
 * A horizontal strip of photos with native scroll-snap.
 *
 * Native scrolling rather than a scroll-jacked pin: the hero already pins, and
 * a second hijacked section is where a page stops feeling smooth and starts
 * feeling slow. Touch swipes it, trackpads scroll it, and the arrow buttons
 * cover a mouse wheel — each disabled at its own end.
 */
export function GalleryStrip() {
  const scroller = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const update = () =>
      setEdge({
        start: el.scrollLeft <= 4,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
      });
    // The ResizeObserver fires once on observe, which covers the first read.
    const ro = new ResizeObserver(update);
    ro.observe(el);
    el.addEventListener("scroll", update, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", update);
    };
  }, []);

  const go = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.75, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="[--gutter:max(1.5rem,calc((100%-72rem)/2+1.5rem))]">
      <ul
        ref={scroller}
        tabIndex={0}
        aria-label="Photos of Ujan Homestay"
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-(--gutter) px-(--gutter) pb-2 [scrollbar-width:none] focus-visible:outline-offset-[-2px] [&::-webkit-scrollbar]:hidden"
      >
        {PHOTOS.map((p) => {
          const body = (
            <>
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 1024px) 448px, 384px"
                className="object-cover transition-transform duration-500 ease-out-strong group-hover:scale-105"
                style={p.position ? { objectPosition: p.position } : undefined}
              />
              <div aria-hidden className="absolute inset-0 bg-linear-to-t from-scrim via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-night-fg">
                <p className="font-display text-xl font-medium">{p.title}</p>
                <p className="mt-1 flex items-center gap-1 text-sm opacity-80">
                  {p.meta}
                  {p.reel && <ArrowUpRight className="size-3.5" />}
                </p>
              </div>
            </>
          );
          return (
            <li
              key={p.src}
              className="group relative h-96 shrink-0 snap-start overflow-hidden rounded-2xl bg-muted lg:h-112"
              style={{ aspectRatio: p.ratio }}
            >
              {p.reel ? (
                <a
                  href={INSTAGRAM.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.title} — watch on Instagram`}
                  className="absolute inset-0 rounded-2xl focus-visible:outline-offset-[-4px]"
                >
                  {body}
                </a>
              ) : (
                body
              )}
            </li>
          );
        })}
      </ul>

      <div className="mx-auto mt-6 flex max-w-6xl items-center justify-between gap-4 px-6">
        <a
          href={INSTAGRAM.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          More on @{INSTAGRAM.handle}
          <ArrowUpRight className="size-4" />
        </a>
        <div className="flex gap-2">
          {([-1, 1] as const).map((dir) => {
            const disabled = dir === -1 ? edge.start : edge.end;
            const Icon = dir === -1 ? ArrowLeft : ArrowRight;
            return (
              <button
                key={dir}
                type="button"
                onClick={() => go(dir)}
                disabled={disabled}
                aria-label={dir === -1 ? "Previous photos" : "Next photos"}
                className={cn(
                  "press flex size-11 items-center justify-center rounded-full border border-border-strong bg-elevated transition-colors",
                  "hover:bg-subtle disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-elevated",
                )}
              >
                <Icon className="size-4" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
