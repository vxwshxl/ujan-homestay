"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, BedDouble, KeyRound, MapPin } from "lucide-react";
import { WhatsAppIcon } from "@/components/brand-icons";
import { FloatCard } from "@/components/marketing/float-card";
import { PRICE_FROM, WHATSAPP_HREF, formatINR } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

const COPY_TITLE = "No sharing with strangers.";
const COPY_BODY =
  "Your room is yours for the whole stay — clean, cool and private, in a family-run home, with the kitchen, Wi-Fi and parking there when you need them.";

const CARDS = {
  price: { icon: BedDouble, title: `AC room · from ${formatINR(PRICE_FROM)}`, detail: "a night, booked direct" },
  private: { icon: KeyRound, title: "A private stay", detail: "Your room is only yours" },
  place: { icon: MapPin, title: "Hatigaon, Guwahati", detail: "Opposite the police station" },
};

/**
 * The pinned hero.
 *
 * The stage holds still for a few viewport heights while the scroll drives one
 * timeline: the headline hands off to a lit window of the house, the lights
 * warm up behind it, and the reasons to stay settle around it. One continuous
 * gesture reads as one story — "step inside" — rather than sections that
 * happen to follow each other.
 *
 * `scrub: 1`, not `true`, so a trackpad flick lets the window arrive under its
 * own momentum instead of snapping. The headline leaves on blur as well as
 * opacity, so the handoff reads as one transition rather than two layers
 * crossfading. `gsap.matchMedia` owns every breakpoint and the reduced-motion
 * case and reverts each one when its query stops matching.
 */
export function HeroScroll() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Reduced motion: no pin, no scrub. The stage is an ordinary stacked
      // hero (see the motion-reduce classes below) and everything is visible
      // from the first frame. Explicit values, not clearProps — clearing would
      // drop elements back to their opacity-0 starting classes.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".hero-intro, .hero-window, .hero-copy, .hero-copy-m, .hero-glow", {
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          filter: "none",
        });
      });

      mm.add(
        {
          isDesktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          isPhone: "(max-width: 639px) and (prefers-reduced-motion: no-preference)",
          isTablet:
            "(min-width: 640px) and (max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const { isDesktop, isPhone } = ctx.conditions as Record<string, boolean>;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: isPhone ? "+=170%" : "+=260%",
              pin: ".hero-stage",
              pinSpacing: true,
              scrub: 1,
              // The mobile URL bar resizes the viewport mid-pin.
              invalidateOnRefresh: true,
              // Measure this pin before the walkthrough's step triggers, or a
              // breakpoint change rebuilds it after them and they sit a screen
              // too high.
              refreshPriority: 1,
            },
          });

          // 1 — the headline hands off.
          tl.to(
            ".hero-intro",
            {
              opacity: 0,
              scale: 0.94,
              y: isPhone ? -96 : -64,
              filter: "blur(10px)",
              ease: "power2.in",
              duration: 0.9,
            },
            0,
          );

          // 2 — the window arrives.
          tl.fromTo(
            ".hero-window",
            { opacity: 0, scale: 0.72, y: 120, filter: "blur(8px)" },
            { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", ease: "power2.out", duration: 1.4 },
            0.25,
          );

          // …and the lights come on behind it.
          tl.fromTo(".hero-glow", { opacity: 0 }, { opacity: 1, ease: "power1.out", duration: 1.2 }, 0.7);

          // The photo drifts inside its frame the whole way through: the slow
          // layer inside a fast one is what sells the depth.
          tl.fromTo(".hero-photo", { yPercent: -5 }, { yPercent: 5, ease: "none", duration: 3.2 }, 0.25);

          if (isDesktop) {
            // 3 — the window gives up the centre so the copy has room.
            tl.to(
              ".hero-window",
              {
                x: () => Math.min(window.innerWidth * 0.17, 280),
                scale: 0.92,
                ease: "power2.inOut",
                duration: 1,
              },
              1.7,
            );
            tl.fromTo(
              ".hero-copy",
              { opacity: 0, x: -48, filter: "blur(8px)" },
              { opacity: 1, x: 0, filter: "blur(0px)", ease: "power2.out", duration: 1 },
              1.9,
            );
          } else {
            // No side column below lg: the copy sits under the window and rises.
            tl.fromTo(
              ".hero-copy-m",
              { opacity: 0, y: 24, filter: "blur(8px)" },
              { opacity: 1, y: 0, filter: "blur(0px)", ease: "power2.out", duration: 1 },
              1.7,
            );
          }

          // 4 — the reasons to stay settle around the window, one at a time.
          tl.fromTo(
            ".hero-float",
            { opacity: 0, scale: 0.9, y: 28 },
            { opacity: 1, scale: 1, y: 0, ease: "back.out(1.4)", duration: 0.8, stagger: 0.18 },
            isDesktop ? 2.1 : 1.9,
          );

          // 5 — the wordmark drifts behind everything, slowest layer on stage.
          tl.fromTo(
            ".hero-wordmark",
            { xPercent: 8, opacity: 0 },
            { xPercent: -8, opacity: 1, ease: "none", duration: 3 },
            0.6,
          );

          // 6 — dissolve just before the pin lets go, so it releases something
          // already gone rather than dragging a still tableau off the screen.
          tl.to(".hero-stage", { opacity: 0, ease: "power1.in", duration: 0.5 }, 3.5);
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} id="top" className="relative">
      {/* Reduced motion is a different layout, not a disabled one: without the
          pin, absolutely-positioned layers would collapse into a pile, so the
          motion-reduce classes give that case real document flow. */}
      <div className="hero-stage relative motion-safe:h-svh motion-safe:overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid mask-fade-b" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-bloom" />

        <span
          aria-hidden
          className="hero-wordmark pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[28vw] leading-none font-semibold tracking-tighter text-foreground/[0.04] italic select-none motion-reduce:hidden"
        >
          Ujan
        </span>

        {/* 1 — headline */}
        <div className="hero-intro z-20 flex flex-col items-center justify-center px-6 text-center max-md:pt-24 motion-safe:absolute motion-safe:inset-0 motion-reduce:static motion-reduce:pt-40 motion-reduce:pb-16">
          <span className="flex items-center gap-4 text-xs font-semibold tracking-[0.2em] text-warm uppercase">
            <span aria-hidden className="h-px w-8 bg-warm/40 max-sm:hidden" />
            Homestay · Hatigaon, Guwahati
            <span aria-hidden className="h-px w-8 bg-warm/40 max-sm:hidden" />
          </span>

          {/* Authored line breaks, so no text-balance: the balancer re-wraps
              around an explicit <br/> and turns two lines into a ragged three. */}
          <h1 className="mt-6 max-w-5xl font-display text-[2.5rem] leading-[1.04] font-medium tracking-tight sm:mt-8 sm:text-6xl lg:text-[5.5rem]">
            Your home in Guwahati,
            <br />
            <span className="relative inline-block text-primary italic">
              away from home.
              <span
                aria-hidden
                className="glow-rule absolute -bottom-1 left-0 h-[0.07em] w-full rounded-full sm:-bottom-2"
              />
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-balance text-muted-foreground sm:mt-8 sm:text-lg">
            Ujan is a private, family-run homestay opposite Hatigaon Police
            Station — clean AC rooms, high-speed Wi-Fi, easy parking and a
            kitchen, from {formatINR(PRICE_FROM)} a night.
          </p>

          <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:items-center">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="press group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-e2 transition-colors hover:bg-primary/90"
            >
              <WhatsAppIcon className="size-4" />
              Book on WhatsApp
            </a>
            <a
              href="#rooms"
              className="press inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border-strong bg-elevated/70 px-6 text-sm font-semibold backdrop-blur-sm transition-colors hover:bg-elevated"
            >
              See the rooms
            </a>
          </div>

          <span
            aria-hidden
            className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase motion-reduce:hidden max-sm:hidden"
          >
            Scroll to step inside
            <ArrowDown className="size-4 motion-safe:animate-bounce" />
          </span>
        </div>

        {/* 2 — the window */}
        <div className="z-10 flex items-center justify-center px-6 max-lg:flex-col max-lg:gap-8 max-lg:pt-24 motion-safe:absolute motion-safe:inset-0 motion-reduce:static motion-reduce:pb-16">
          {/* Layout lives on this wrapper, which GSAP never touches; the
              animated element inside is GSAP's alone. GSAP folds any CSS
              translate on an element it takes over into its own matrix, so a
              resting offset on the animated node would be overwritten. The
              width is capped by height too, so the window never pushes the
              copy under it off a short phone screen. */}
          <div className="relative w-full max-w-[min(22rem,calc((100svh-24rem)*0.75))] sm:max-w-[min(24rem,calc((100svh-20rem)*0.75))] lg:max-w-[min(26rem,calc((100svh-9rem)*0.75))]">
            {/* Starting opacity in the markup, not only in the timeline, so the
                server-rendered first paint is already the timeline's first
                frame instead of flashing the window over the headline. */}
            <div className="hero-window relative motion-safe:opacity-0">
              <div
                aria-hidden
                className="hero-glow pointer-events-none absolute -inset-24 bg-bloom-center motion-safe:opacity-0"
              />
              <ArchWindow />

              <FloatCard
                {...CARDS.price}
                compactOnPhone
                className="hero-float absolute -top-4 -right-2 z-30 motion-safe:opacity-0 motion-reduce:hidden sm:-right-12 lg:top-12 lg:-right-24"
              />
              <FloatCard
                {...CARDS.private}
                compactOnPhone
                className="hero-float absolute top-[46%] -left-2 z-30 motion-safe:opacity-0 motion-reduce:hidden sm:-left-12 lg:-left-24"
              />
              <FloatCard
                {...CARDS.place}
                compactOnPhone
                className="hero-float absolute -right-2 -bottom-6 z-30 motion-safe:opacity-0 motion-reduce:hidden sm:-right-8 lg:-right-16 lg:bottom-16"
              />
            </div>
          </div>

          <div className="hero-copy-m pointer-events-none max-w-md text-center lg:hidden motion-safe:opacity-0">
            <h2 className="font-display text-2xl leading-tight font-medium tracking-tight text-balance sm:text-3xl">
              {COPY_TITLE}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{COPY_BODY}</p>
          </div>
        </div>

        {/* 3 — supporting copy, desktop */}
        <div className="hero-copy pointer-events-none z-20 hidden flex-col justify-center lg:flex motion-safe:absolute motion-safe:inset-y-0 motion-safe:left-0 motion-safe:w-[36%] motion-safe:pl-12 motion-safe:opacity-0 xl:motion-safe:pl-16 motion-reduce:mx-auto motion-reduce:max-w-3xl motion-reduce:px-6 motion-reduce:pb-24 motion-reduce:text-center">
          <span className="text-xs font-semibold tracking-[0.2em] text-warm uppercase">Only yours</span>
          <h2 className="mt-4 font-display text-5xl leading-[1.05] font-medium tracking-tight text-balance">
            {COPY_TITLE}
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">{COPY_BODY}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * An arched window onto the house. The source is Ujan's own night-time banner,
 * which carries its headline baked into the right third; a 3:4 frame anchored
 * left shows the logo and the lit rooms and never reaches that text.
 */
function ArchWindow() {
  return (
    <div className="relative">
      <div className="relative aspect-[3/4] overflow-hidden rounded-t-full rounded-b-2xl border-8 border-elevated bg-muted shadow-panel ring-1 ring-border">
        <Image
          src="/images/ujan-house.jpg"
          alt="Ujan Homestay at night, with warm light in the bedroom and kitchen windows under the Ujan roofline"
          fill
          preload
          sizes="(min-width: 1024px) 26rem, (min-width: 640px) 24rem, 90vw"
          className="hero-photo scale-110 object-cover object-left"
        />
        {/* A soft inner shade at the arch, as if the frame were deep. */}
        <div aria-hidden className="absolute inset-0 bg-linear-to-b from-scrim/30 to-transparent to-25%" />
      </div>
      {/* The sill. */}
      <div aria-hidden className="absolute -bottom-3 left-1/2 h-4 w-[112%] -translate-x-1/2 rounded-full bg-elevated shadow-e2 ring-1 ring-border" />
    </div>
  );
}
