"use client";

import { useCallback, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BedDouble, Camera, CookingPot, MapPin, MessageCircle } from "lucide-react";
import { PhoneFrame } from "@/components/marketing/phone-frame";
import {
  ChatScreen,
  MapScreen,
  ProfileScreen,
  ReelScreen,
  StayScreen,
} from "@/components/marketing/screens";
import { INSTAGRAM } from "@/lib/site";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    id: "look",
    icon: Camera,
    label: "Look around",
    title: "See the rooms before you book",
    body: "Every room and corner is on our Instagram — real photos of the spaces you will stay in, posted by us, not stock images.",
    points: [`@${INSTAGRAM.handle}`, "Real photos", "Message us from there too"],
    Screen: ProfileScreen,
  },
  {
    id: "book",
    icon: MessageCircle,
    label: "Book",
    title: "Say hello on WhatsApp",
    body: "Tell us your dates and how many of you are coming. You talk to the family who runs Ujan — no call centre, no booking site — and your rate is confirmed before you travel.",
    points: ["Direct, no commission", "Rate confirmed for your dates", "Call or message"],
    Screen: ChatScreen,
  },
  {
    id: "arrive",
    icon: MapPin,
    label: "Arrive",
    title: "Easy to find, easy to park",
    body: "House No. 38, Mother Teresa Path — directly opposite Hatigaon Police Station, a landmark that is easy to give any cab or auto driver. Pull in, park, and you are home.",
    points: ["Opposite Hatigaon Police Station", "Easy parking", "One tap to Google Maps"],
    Screen: MapScreen,
  },
  {
    id: "settle",
    icon: BedDouble,
    label: "Settle in",
    title: "A clean, cool room that's only yours",
    body: "An air-conditioned room, clean and made up for you. No sharing with strangers — it is yours for as long as you stay.",
    points: ["AC rooms", "No sharing with strangers", "Couple & family friendly"],
    Screen: ReelScreen,
  },
  {
    id: "home",
    icon: CookingPot,
    label: "Feel at home",
    title: "Cook, work, unwind",
    body: "Make a home-cooked meal in the kitchen, get through your calls on the Wi-Fi, and come back each evening to a room that feels like yours.",
    points: ["Kitchen access", "High-speed Wi-Fi", "Good for work trips"],
    Screen: StayScreen,
  },
] as const;

/**
 * The stay, step by step: a rail of steps and one sticky phone that follows
 * whichever step you are reading.
 *
 * One sticky preview rather than a preview per step: five phones inlined down
 * the page would be five times the DOM, and each would scroll past before it
 * finished arriving. Here the phone stays put and its screen changes under
 * your reading position.
 *
 * Screens mount on first visit and stay mounted, so their entrances (the chat
 * arriving bubble by bubble) play once, and later passes are clean crossfades.
 */
export function StayTimeline() {
  const [active, setActive] = useState(0);
  const [visited, setVisited] = useState<number[]>([0]);
  const root = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

  const select = useCallback((i: number) => {
    setActive(i);
    setVisited((v) => (v.includes(i) ? v : [...v, i]));
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Reduced motion keeps a working walkthrough — the steps are buttons —
      // it just does not track the scroll.
      mm.add(
        {
          isDesktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          isCompact: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
        const { isDesktop } = ctx.conditions as Record<string, boolean>;
        const triggers = gsap.utils.toArray<HTMLElement>("[data-step]").map((el, i) =>
          ScrollTrigger.create({
            trigger: el,
            // Desktop: 65%–35% of the viewport is roughly where the eye sits
            // while reading, so the phone changes as you reach the words that
            // explain it. Below lg the sticky phone covers the top half of the
            // screen and you read underneath it, so the band moves down to
            // the part you can actually see.
            start: isDesktop ? "top 65%" : "top 80%",
            end: isDesktop ? "bottom 35%" : "bottom 55%",
            onToggle: ({ isActive }) => {
              if (isActive) select(i);
            },
          }),
        );

        const line = progress.current;
        const fill =
          line &&
          ScrollTrigger.create({
            trigger: root.current,
            start: "top 60%",
            end: "bottom 60%",
            scrub: 0.4,
            onUpdate: ({ progress: p }) => {
              line.style.transform = `scaleY(${p})`;
            },
          });

        return () => {
          triggers.forEach((t) => t.kill());
          fill?.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="mt-16 flex flex-col gap-12 lg:grid lg:grid-cols-[minmax(0,30rem)_1fr] lg:gap-16"
    >
      {/*
        The phone. First on a phone-sized screen (sticky under the two-row
        header) and second on desktop (sticky beside the rail). Sticky is
        bounded by the parent's box, so below lg the column itself sticks —
        bounded by the flex container that spans the whole walkthrough — while
        at lg the inner element sticks inside its grid cell.
      */}
      <div className="order-1 max-lg:sticky max-lg:top-36 max-lg:z-10 lg:order-2">
        <div className="relative flex flex-col items-center lg:sticky lg:top-28">
          {/* Opaque bleed so the rail scrolls *under* the phone on small
              screens, reaching up past the translucent header. */}
          <span aria-hidden className="pointer-events-none absolute -inset-x-6 -top-40 bottom-0 -z-10 bg-background lg:hidden" />
          <span aria-hidden className="pointer-events-none absolute inset-x-0 top-full -z-10 h-8 bg-linear-to-b from-background to-transparent lg:hidden" />

          <div aria-hidden className="relative">
            <div className="pointer-events-none absolute -inset-16 -z-10 bg-bloom-center max-lg:hidden" />
            <PhoneFrame className="[--s:0.5] sm:[--s:0.6] lg:[--s:1]">
              <div className="grid size-full *:[grid-area:1/1]">
                {STEPS.map(({ id, Screen }, i) =>
                  visited.includes(i) ? (
                    <div
                      key={id}
                      data-off={i === active ? undefined : ""}
                      className="size-full transition-[opacity,filter] duration-300 ease-out-strong data-off:pointer-events-none data-off:opacity-0 data-off:blur-[6px]"
                    >
                      <Screen />
                    </div>
                  ) : null,
                )}
              </div>
            </PhoneFrame>
          </div>

          <p className="mt-6 text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase max-lg:hidden">
            Step {active + 1} of {STEPS.length} · {STEPS[active]?.label}
          </p>
        </div>
      </div>

      {/* Rail */}
      <ol className="relative order-2 lg:order-1">
        <span aria-hidden className="absolute top-2 bottom-2 left-4 w-px -translate-x-1/2 bg-border" />
        <span
          ref={progress}
          aria-hidden
          // The resting scale is written as `transform`, the property GSAP
          // drives. Tailwind's `scale-y-0` sets the separate `scale` property,
          // which would multiply with GSAP's value and pin the line at zero.
          className="absolute top-2 bottom-2 left-4 w-px origin-top -translate-x-1/2 bg-primary [transform:scaleY(0)]"
        />

        {STEPS.map((step, i) => {
          const isActive = i === active;
          return (
            <li key={step.id} data-step className="relative pb-16 pl-16 last:pb-0">
              <button
                type="button"
                onClick={() => select(i)}
                aria-current={isActive ? "step" : undefined}
                className="block w-full cursor-pointer rounded-lg text-left focus-visible:outline-offset-4"
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-0 left-0 flex size-8 items-center justify-center rounded-full border transition-colors duration-300 ease-out-strong",
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-elevated text-muted-foreground",
                  )}
                >
                  <step.icon className="size-4" strokeWidth={2} />
                </span>

                <span className="text-xs font-semibold tracking-[0.16em] text-warm uppercase">
                  {String(i + 1).padStart(2, "0")} · {step.label}
                </span>

                <h3
                  className={cn(
                    "mt-2 font-display text-2xl font-medium tracking-tight transition-colors duration-300 ease-out-strong sm:text-3xl",
                    isActive ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {step.title}
                </h3>

                <p className="mt-3 leading-relaxed text-muted-foreground">{step.body}</p>

                <span className="mt-4 flex flex-wrap gap-2">
                  {step.points.map((p) => (
                    <span
                      key={p}
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-300 ease-out-strong",
                        isActive
                          ? "border-primary/30 bg-accent-subtle text-foreground"
                          : "border-border text-muted-foreground",
                      )}
                    >
                      {p}
                    </span>
                  ))}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
