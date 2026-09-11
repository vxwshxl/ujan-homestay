import Image from "next/image";
import {
  AirVent,
  CheckCheck,
  ChevronLeft,
  CookingPot,
  Heart,
  Landmark,
  Menu,
  MessageCircle,
  Navigation,
  Phone,
  Search,
  Send,
  SendHorizontal,
  SquareParking,
  Wifi,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/brand-icons";
import { ADDRESS, INSTAGRAM, PRICE_FROM, formatINR } from "@/lib/site";
import { cn } from "@/lib/utils";

/*
 * In-DOM recreations of the phone screens a guest actually sees along the way —
 * Instagram, WhatsApp, Maps — rather than screenshots. They follow the theme,
 * stay sharp at any scale, and cost nothing to download. All of them sit inside
 * an aria-hidden preview: every fact they show is also in the step copy.
 *
 * Designed at 288×624 (the PhoneFrame's screen) and never reflowed.
 */

function Avatar({ className }: { className?: string }) {
  return (
    <span className={cn("relative block shrink-0 overflow-hidden rounded-full bg-elevated", className)}>
      <Image src="/images/ujan-profile.jpg" alt="" fill sizes="64px" className="object-cover" />
    </span>
  );
}

/* 1 — Instagram profile ------------------------------------------------- */

const GRID = [
  { src: "/images/ujan-living.jpg", position: "center" },
  { src: "/images/ujan-corner.jpg", position: "center" },
  { src: "/images/ujan-room.jpg", position: "center" },
  { src: "/images/ujan-house.jpg", position: "left" },
  { src: "/images/ujan-kitchen.jpg", position: "center" },
  { src: "/images/ujan-living.jpg", position: "right" },
];

export function ProfileScreen() {
  return (
    <div className="flex size-full flex-col bg-elevated pt-12">
      <div className="flex items-center justify-between px-4">
        <span className="text-base font-semibold">{INSTAGRAM.handle}</span>
        <Menu className="size-5" />
      </div>
      <div className="flex items-center gap-4 px-4 pt-4">
        <span className="rounded-full bg-linear-to-tr from-warm to-primary p-0.5">
          <Avatar className="size-16 border-2 border-elevated" />
        </span>
        <div>
          <p className="text-sm font-semibold">Ujan Homestay</p>
          <p className="text-xs text-muted-foreground">Homestay · {ADDRESS.city}</p>
        </div>
      </div>
      <p className="px-4 pt-3 text-xs leading-relaxed">
        Feel at home, away from home 🏡
        <br />
        AC rooms · Wi-Fi · Parking · Kitchen
        <br />
        📍 {ADDRESS.landmark}
      </p>
      <div className="flex gap-2 px-4 pt-3">
        <span className="flex h-8 flex-1 items-center justify-center rounded-lg bg-primary text-xs font-semibold text-primary-foreground">
          Follow
        </span>
        <span className="flex h-8 flex-1 items-center justify-center rounded-lg bg-muted text-xs font-semibold">
          Message
        </span>
      </div>
      <div className="stagger mt-4 grid grid-cols-3 gap-0.5">
        {GRID.map((tile, i) => (
          <span key={i} className="relative aspect-square bg-muted">
            <Image
              src={tile.src}
              alt=""
              fill
              sizes="96px"
              className="object-cover"
              style={{ objectPosition: tile.position }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

/* 2 — WhatsApp chat ------------------------------------------------------ */

function Bubble({ out = false, time, children }: { out?: boolean; time: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "max-w-[82%] rounded-lg px-3 py-2 shadow-e0",
        out ? "self-end rounded-tr-sm bg-chat-out" : "self-start rounded-tl-sm bg-chat-in",
      )}
    >
      <p className="text-sm leading-snug">{children}</p>
      <p className="mt-1 flex items-center justify-end gap-1 text-xs text-muted-foreground">
        {time}
        {out && <CheckCheck className="size-3 text-primary" />}
      </p>
    </div>
  );
}

export function ChatScreen() {
  return (
    <div className="flex size-full flex-col bg-chat-wall">
      <div className="bg-whatsapp pt-10 text-whatsapp-fg">
        <div className="flex items-center gap-2 px-3 pb-3">
          <ChevronLeft className="size-5" />
          <Avatar className="size-8" />
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold">Ujan Homestay</span>
            <span className="block text-xs opacity-80">online</span>
          </span>
          <Phone className="size-4" />
        </div>
      </div>
      <div className="stagger flex flex-1 flex-col justify-end gap-2 px-3 py-4">
        <Bubble out time="10:02">Hi! Is a room free this Friday for two of us?</Bubble>
        <Bubble time="10:04">Hello 🙏 Yes, an AC room is free on Friday.</Bubble>
        <Bubble time="10:04">Rooms start at {formatINR(PRICE_FROM)} a night. Shall we keep it for you?</Bubble>
        <Bubble out time="10:05">Yes please! 🙌</Bubble>
        <Bubble time="10:06">Done — see you Friday. We&apos;re opposite Hatigaon Police Station 📍</Bubble>
      </div>
      <div className="flex items-center gap-2 px-2 pb-6">
        <span className="flex h-10 flex-1 items-center rounded-full bg-chat-in px-4 text-sm text-faint">
          Message
        </span>
        <span className="flex size-10 items-center justify-center rounded-full bg-whatsapp text-whatsapp-fg">
          <SendHorizontal className="size-4" />
        </span>
      </div>
    </div>
  );
}

/* 3 — Map ---------------------------------------------------------------- */

// Schematic city blocks, as [top%, left%, width%, height%]. Not a real map —
// the real one is in the Location section.
const BLOCKS: [number, number, number, number][] = [
  [14, 4, 14, 16], [14, 32, 26, 12], [14, 64, 30, 22], [34, 4, 14, 14],
  [30, 32, 22, 18], [40, 64, 12, 10], [62, 4, 14, 22], [62, 32, 30, 10],
  [62, 70, 24, 16], [76, 32, 16, 10],
];

export function MapScreen() {
  return (
    <div className="relative size-full overflow-hidden bg-subtle">
      {BLOCKS.map(([top, left, width, height], i) => (
        <span
          key={i}
          className="absolute rounded-md bg-muted"
          style={{ top: `${top}%`, left: `${left}%`, width: `${width}%`, height: `${height}%` }}
        />
      ))}

      <div className="absolute inset-x-0 top-[52%] h-8 bg-elevated shadow-e0">
        <span className="absolute top-1/2 right-4 -translate-y-1/2 text-xs font-medium text-muted-foreground">
          {ADDRESS.street}
        </span>
      </div>
      <div className="absolute inset-y-0 left-[22%] w-6 bg-elevated shadow-e0" />
      <div className="absolute inset-y-0 right-[20%] w-4 bg-elevated shadow-e0" />

      <svg className="absolute inset-0 size-full text-primary" viewBox="0 0 288 624" preserveAspectRatio="none" fill="none" aria-hidden>
        <path d="M75 624V340h75" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 9" />
      </svg>

      <div className="absolute top-[42%] left-[40%] flex items-center gap-1 rounded-md bg-elevated px-2 py-1 text-xs font-medium shadow-e2">
        <Landmark className="size-3 text-muted-foreground" />
        Hatigaon P.S.
      </div>

      <div className="absolute top-[62%] left-[52%] flex -translate-x-1/2 -translate-y-full flex-col items-center">
        <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold whitespace-nowrap text-primary-foreground shadow-e2">
          Ujan Homestay
        </span>
        <span className="relative mt-1 flex size-4 items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-primary/40 motion-safe:animate-ping" />
          <span className="relative size-3 rounded-full border-2 border-elevated bg-primary" />
        </span>
      </div>

      <div className="absolute inset-x-3 top-12 flex h-10 items-center gap-2 rounded-full bg-elevated px-4 text-sm shadow-e2">
        <Search className="size-4 text-muted-foreground" />
        Ujan Homestay, {ADDRESS.locality}
      </div>

      <div className="absolute inset-x-2 bottom-2 rounded-2xl bg-elevated p-4 shadow-e3">
        <span className="mx-auto mb-3 block h-1 w-10 rounded-full bg-border-strong" />
        <p className="font-display text-lg font-semibold">Ujan Homestay</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {ADDRESS.house}, {ADDRESS.street}
          <br />
          {ADDRESS.landmark}
        </p>
        <div className="mt-3 flex gap-2">
          <span className="flex h-9 flex-1 items-center justify-center gap-1 rounded-full bg-primary text-xs font-semibold text-primary-foreground">
            <Navigation className="size-3" />
            Directions
          </span>
          <span className="flex h-9 flex-1 items-center justify-center gap-1 rounded-full border border-border-strong text-xs font-semibold">
            <Phone className="size-3" />
            Call
          </span>
        </div>
      </div>
    </div>
  );
}

/* 4 — Reel --------------------------------------------------------------- */

export function ReelScreen() {
  return (
    <div className="relative size-full bg-bezel">
      <Image src="/images/ujan-corner.jpg" alt="" fill sizes="304px" className="object-cover" />
      <div className="absolute inset-0 bg-linear-to-t from-scrim via-transparent to-scrim/40" />
      <p className="absolute top-12 left-4 text-lg font-semibold text-night-fg">Reels</p>
      <div className="absolute right-3 bottom-32 flex flex-col items-center gap-5 text-night-fg">
        <Heart className="size-6" />
        <MessageCircle className="size-6" />
        <Send className="size-6" />
      </div>
      <div className="absolute inset-x-4 bottom-8 text-night-fg">
        <div className="flex items-center gap-2">
          <Avatar className="size-8 ring-2 ring-night-fg" />
          <span className="text-sm font-semibold">{INSTAGRAM.handle}</span>
          <span className="rounded-md border border-night-fg/60 px-2 py-0.5 text-xs font-semibold">Follow</span>
        </div>
        <p className="mt-2 text-sm leading-snug">Your AC room at Ujan — clean, cool and only yours ✨</p>
      </div>
    </div>
  );
}

/* 5 — Stay --------------------------------------------------------------- */

const STAY_ROWS = [
  { icon: AirVent, title: "Air conditioning", detail: "Set to your comfort", on: true },
  { icon: Wifi, title: "Wi-Fi", detail: "Connected", on: true },
  { icon: CookingPot, title: "Kitchen", detail: "Open to guests", on: true },
  { icon: SquareParking, title: "Parking", detail: "Easy parking", on: true },
];

export function StayScreen() {
  return (
    <div className="flex size-full flex-col bg-subtle">
      <div className="relative h-56 shrink-0">
        <Image src="/images/ujan-room.jpg" alt="" fill sizes="304px" className="object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-scrim to-transparent to-60%" />
        <div className="absolute inset-x-4 bottom-4 text-night-fg">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase opacity-80">Your stay</p>
          <p className="font-display text-2xl font-medium">A room at Ujan</p>
        </div>
      </div>
      <ul className="stagger flex flex-col gap-2 p-3">
        {STAY_ROWS.map(({ icon: Icon, title, detail, on }) => (
          <li key={title} className="flex items-center gap-3 rounded-xl bg-elevated p-3 shadow-e1">
            <span className="flex size-9 items-center justify-center rounded-lg bg-accent-subtle text-primary">
              <Icon className="size-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold">{title}</span>
              <span className="block text-xs text-muted-foreground">{detail}</span>
            </span>
            <span className={cn("flex h-6 w-10 items-center rounded-full p-0.5", on ? "justify-end bg-primary" : "bg-muted")}>
              <span className="size-5 rounded-full bg-elevated shadow-e1" />
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-auto p-3 pb-6">
        <span className="flex h-11 items-center justify-center gap-2 rounded-full bg-whatsapp text-sm font-semibold text-whatsapp-fg">
          <WhatsAppIcon className="size-4" />
          Need anything? Message us
        </span>
      </div>
    </div>
  );
}
