import {
  AirVent,
  ArrowUpRight,
  BedDouble,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CalendarHeart,
  Check,
  ChevronDown,
  CookingPot,
  Heart,
  HeartHandshake,
  Info,
  IndianRupee,
  KeyRound,
  MapPin,
  MessageCircle,
  MoonStar,
  Navigation,
  Phone,
  ShieldCheck,
  Sparkles,
  SquareParking,
  Users,
  Wifi,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/brand-icons";
import { ContactCard } from "@/components/marketing/contact-actions";
import { CountUp } from "@/components/marketing/count-up";
import { GalleryStrip } from "@/components/marketing/gallery-strip";
import { Reveal } from "@/components/marketing/reveal";
import { StayTimeline } from "@/components/marketing/stay-timeline";
import { FAQS } from "@/lib/faq";
import {
  ADDRESS,
  BOOKING_PHONE,
  MAPS_EMBED,
  MAPS_HREF,
  PRICE_FROM,
  WHATSAPP_HREF,
  formatINR,
} from "@/lib/site";
import { cn } from "@/lib/utils";

/*
 * The landing's server-rendered sections, in page order. Everything here is
 * static copy shipped as HTML; the only client code is the Reveal/CountUp
 * islands and the two interactive pieces (timeline, gallery) they import.
 */

const EYEBROW = "text-xs font-semibold tracking-[0.2em] text-warm uppercase";
const H2 = "mt-5 font-display text-4xl leading-[1.08] font-medium tracking-tight text-balance sm:text-5xl";
const LEAD = "mt-6 text-lg leading-relaxed text-balance text-muted-foreground";
// Sections sit under a fixed header that is two rows tall below md.
const SECTION = "scroll-mt-36 px-6 py-24 sm:py-32 md:scroll-mt-28";

/* -------------------------------------------------------------------------
 * Stay — the argument: a home, not a hotel room.
 * ---------------------------------------------------------------------- */

const SMALL = [
  { icon: IndianRupee, value: PRICE_FROM, prefix: "₹", label: "A night, from — confirmed for your dates" },
  { icon: AirVent, text: "AC", label: "Cool, comfortable rooms through Guwahati summers" },
  { icon: Wifi, text: "Wi-Fi", label: "High-speed, for work calls and maps" },
  { icon: SquareParking, text: "Parking", label: "Easy to park, easy to find" },
];

export function HomeBand() {
  return (
    <section id="stay" aria-labelledby="stay-title" className={cn(SECTION, "relative mx-auto w-full max-w-6xl")}>
      <Reveal className="mx-auto max-w-3xl text-center">
        <span className={EYEBROW}>A homestay, not a hotel</span>
        <h2 id="stay-title" className={H2}>
          A home in the city —
          <br />
          <span className="text-muted-foreground italic">not a room in a hotel.</span>
        </h2>
        <p className={cn(LEAD, "mx-auto max-w-2xl")}>
          Ujan is a family home in Hatigaon with rooms kept for guests. You get
          the privacy of your own room, the comfort of a real house, and people
          who pick up when you call.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-4 sm:grid-cols-2">
        <Reveal>
          <article className="h-full rounded-2xl border border-primary/20 bg-accent-subtle p-8">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <KeyRound className="size-5" strokeWidth={2} />
            </span>
            <h3 className="mt-8 font-display text-2xl font-medium tracking-tight">Your room, and only yours</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              No sharing with strangers. The room you book is yours for the
              length of your stay — clean, air-conditioned and made up before
              you arrive.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {["Air-conditioned rooms", "Clean and hygienic, every stay", "Couple and family friendly"].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={2.5} />
                  <span className="leading-relaxed">{t}</span>
                </li>
              ))}
            </ul>
          </article>
        </Reveal>

        <Reveal delay={80}>
          <article className="h-full rounded-2xl border border-warm/25 bg-warm/[0.06] p-8">
            <span className="flex size-11 items-center justify-center rounded-xl bg-warm text-background">
              <HeartHandshake className="size-5" strokeWidth={2} />
            </span>
            <h3 className="mt-8 font-display text-2xl font-medium tracking-tight">Looked after like family</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Assamese hospitality, the way it is meant to be. You deal with the
              people who run the house, from your first WhatsApp message to the
              morning you leave.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {["Book directly — no booking site in between", "Kitchen access for longer stays", "Two numbers to reach us, call or WhatsApp"].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-warm" strokeWidth={2.5} />
                  <span className="leading-relaxed">{t}</span>
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SMALL.map((s, i) => (
          <Reveal key={s.label} delay={i * 60}>
            <div className="h-full rounded-xl border border-border bg-elevated p-6">
              <s.icon className="size-5 text-muted-foreground" strokeWidth={1.75} />
              <p className="mt-6 font-display text-4xl font-medium tracking-tight">
                {"value" in s && s.value ? <CountUp to={s.value} prefix={s.prefix} /> : s.text}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
 * Journey — the stay, step by step.
 * ---------------------------------------------------------------------- */

export function StayTimelineSection() {
  return (
    <section id="journey" aria-labelledby="journey-title" className={cn(SECTION, "mx-auto w-full max-w-6xl")}>
      <Reveal className="mx-auto max-w-3xl text-center">
        <span className={EYEBROW}>Your stay, step by step</span>
        <h2 id="journey-title" className={H2}>
          From the first message
          <br />
          to the last good night
        </h2>
        <p className={cn(LEAD, "mx-auto max-w-2xl")}>
          No booking engine and no front desk — just a family, a phone, and a
          room that is ready for you. This is how a stay at Ujan goes.
        </p>
      </Reveal>

      <StayTimeline />
    </section>
  );
}

/* -------------------------------------------------------------------------
 * Amenities — the hairline sheet.
 * ---------------------------------------------------------------------- */

const AMENITY_CELLS = [
  { icon: AirVent, title: "AC rooms", body: `Cool, comfortable rooms from ${formatINR(PRICE_FROM)} a night.` },
  { icon: Wifi, title: "High-speed Wi-Fi", body: "For work calls, maps and the evening's reels." },
  { icon: SquareParking, title: "Easy parking", body: "Simple to pull in, opposite Hatigaon Police Station." },
  { icon: CookingPot, title: "Kitchen access", body: "Cook a home meal on a longer stay or a family trip." },
  { icon: Sparkles, title: "Clean & hygienic", body: "Rooms kept fresh, tidy and guest-ready." },
  { icon: KeyRound, title: "No sharing", body: "Your room is only yours for the whole stay." },
  { icon: Heart, title: "Couple friendly", body: "A relaxed, respectful stay for couples." },
  { icon: Users, title: "Family friendly", body: "Room for the family, and a kitchen to share." },
  { icon: BriefcaseBusiness, title: "Business ready", body: "Wi-Fi and a calm room for a work trip." },
  { icon: HeartHandshake, title: "Assamese hospitality", body: "Looked after by a family, like a guest at home." },
  { icon: MapPin, title: "Easy to find", body: "House No. 38, Mother Teresa Path, Hatigaon." },
  { icon: MessageCircle, title: "Book on WhatsApp", body: "Message, confirm, done — directly with us." },
];

/**
 * One ruled sheet rather than twelve separated cards: separate cards read as
 * twelve things to weigh up, a single sheet reads as one stay that happens to
 * have twelve parts. Rows reveal per row, not per card, so a row arrives the
 * way a line of text would.
 */
export function AmenityGrid() {
  return (
    <section id="amenities" aria-labelledby="amenities-title" className={cn(SECTION, "mx-auto w-full max-w-6xl")}>
      <Reveal className="max-w-2xl">
        <span className={EYEBROW}>Everything in the stay</span>
        <h2 id="amenities-title" className={H2}>
          Everything you need,
          <br />
          <span className="text-muted-foreground italic">nothing you don&apos;t.</span>
        </h2>
        <p className={LEAD}>
          The essentials for a good night and an easy stay, in a home that is
          kept the way you would keep your own.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {AMENITY_CELLS.map((f, i) => (
          <Reveal key={f.title} delay={(i % 3) * 70} className="h-full">
            <div className="group relative h-full bg-elevated p-6 transition-colors duration-200 hover:bg-subtle sm:p-8">
              {/* Draws in from the left on hover — clip-path, not scaleX, so
                  the rounded cap is not squashed on the way. */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-0.5 bg-warm [clip-path:inset(0_100%_0_0)] transition-[clip-path] duration-300 ease-out-strong group-hover:[clip-path:inset(0_0_0_0)]"
              />
              <span className="flex size-11 items-center justify-center rounded-xl border border-border bg-background transition-colors duration-200 group-hover:border-primary/30 group-hover:bg-accent-subtle">
                <f.icon
                  className="size-5 text-primary transition-transform duration-300 ease-out-strong group-hover:scale-110"
                  strokeWidth={1.75}
                />
              </span>
              <h3 className="mt-5 text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
 * Rooms — the photo strip.
 * ---------------------------------------------------------------------- */

export function GalleryBand() {
  return (
    <section id="rooms" aria-labelledby="rooms-title" className="scroll-mt-36 py-24 sm:py-32 md:scroll-mt-28">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <span className={EYEBROW}>Rooms & corners</span>
          <h2 id="rooms-title" className={H2}>
            Real rooms. Real photos.
          </h2>
          <p className={LEAD}>
            Straight from our own posts — the turquoise rooms, the little
            details and the house after dark. What you see is where you stay.
          </p>
        </Reveal>
      </div>
      <Reveal className="mt-12">
        <GalleryStrip />
      </Reveal>
    </section>
  );
}

/* -------------------------------------------------------------------------
 * Rates — the model, not a rate card.
 * ---------------------------------------------------------------------- */

type Row = { what: string; how: string; included?: boolean; note?: string };

const INCLUDED: Row[] = [
  { what: "Air-conditioned room", how: "Included", included: true },
  { what: "High-speed Wi-Fi", how: "Included", included: true },
  { what: "Parking", how: "Included", included: true },
  { what: "Kitchen access", how: "Included", included: true },
  { what: "Booking", how: "Direct with us", included: true, note: "No booking-site commission, no platform fee" },
];

const ASK: Row[] = [
  { what: "Longer stays", how: "Ask on WhatsApp", note: "Tell us how long you are in Guwahati" },
  { what: "Extra guests", how: "Ask on WhatsApp" },
  { what: "Check-in & check-out times", how: "Confirmed when you book" },
];

const FACTORS = [
  { icon: CalendarDays, title: "Your dates", body: "Rates can move with the season and the days you travel." },
  { icon: BedDouble, title: "The room", body: "Tell us who is coming and we will suggest the right room." },
  { icon: MoonStar, title: "How long you stay", body: "Staying a while? Ask — the kitchen makes long stays easy." },
];

export function RatesBand() {
  return (
    <section id="rates" aria-labelledby="rates-title" className={cn(SECTION, "relative overflow-hidden")}>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid mask-fade-y" />

      <div className="relative mx-auto w-full max-w-6xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className={EYEBROW}>Rates</span>
          <h2 id="rates-title" className={H2}>
            You pay per night.
            <br />
            <span className="text-muted-foreground italic">That is the whole deal.</span>
          </h2>
          <p className={cn(LEAD, "mx-auto max-w-2xl")}>
            No booking-site commission, no platform fee, and nothing extra for
            the Wi-Fi or the parking. Tell us your dates and we will confirm
            your rate on WhatsApp.
          </p>
        </Reveal>

        <Reveal className="mt-16" delay={60}>
          <div className="overflow-hidden rounded-2xl border border-border bg-elevated shadow-panel">
            <div className="flex flex-col gap-6 border-b border-border bg-subtle p-8 sm:flex-row sm:items-end sm:justify-between sm:p-10">
              <div>
                <p className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                  Per room, per night
                </p>
                <p className="mt-3 font-display text-5xl font-medium tracking-tight sm:text-6xl">
                  <span className="text-2xl text-muted-foreground sm:text-3xl">from </span>
                  <CountUp to={PRICE_FROM} prefix="₹" />
                </p>
                <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
                  The exact rate depends on your dates and the room. We confirm
                  it with you before you travel.
                </p>
              </div>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="press group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Check your dates
                <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* One table, reflowed below sm rather than duplicated — a second
                mobile block would read the price list twice to a screen reader. */}
            <table className="w-full text-left max-sm:block">
              <caption className="sr-only">What a night at Ujan Homestay includes</caption>
              <thead className="max-sm:hidden">
                <tr className="border-b border-border">
                  <th scope="col" className="px-6 py-4 text-xs font-semibold tracking-wide text-muted-foreground uppercase sm:px-10">
                    What
                  </th>
                  <th scope="col" className="px-6 py-4 text-xs font-semibold tracking-wide text-muted-foreground uppercase sm:px-10">
                    How it works
                  </th>
                </tr>
              </thead>
              {[
                { label: "Included in your nightly rate", rows: INCLUDED },
                { label: "Just ask", rows: ASK },
              ].map((group, gi) => (
                <tbody key={group.label} className="divide-y divide-border max-sm:block">
                  <tr className="max-sm:block">
                    <th
                      scope="colgroup"
                      colSpan={2}
                      className={cn(
                        "bg-muted/50 px-6 py-3 text-left text-xs font-bold tracking-[0.14em] uppercase max-sm:block sm:px-10",
                        gi === 0 ? "text-primary" : "text-muted-foreground",
                      )}
                    >
                      {group.label}
                    </th>
                  </tr>
                  {group.rows.map((r) => (
                    <tr key={r.what} className="max-sm:block max-sm:px-6 max-sm:py-4">
                      <th scope="row" className="text-left font-medium max-sm:block max-sm:pb-1 sm:px-10 sm:py-4">
                        {r.what}
                      </th>
                      <td className="max-sm:block sm:px-10 sm:py-4">
                        <span className={cn("flex items-center gap-2 font-semibold", r.included && "text-primary")}>
                          {r.included && <Check className="size-4 shrink-0" strokeWidth={3} />}
                          {r.how}
                        </span>
                        {r.note && <span className="mt-1 block text-sm text-muted-foreground">{r.note}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>

            <div className="flex items-start gap-3 border-t border-border bg-muted/40 px-6 py-5 sm:px-10">
              <Info className="mt-0.5 size-4 shrink-0 text-muted-foreground" strokeWidth={1.75} />
              <p className="text-sm leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">Rates can change with dates and season.</span>{" "}
                We confirm the figure for your dates on WhatsApp before you
                travel, so you know exactly what the stay costs.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full gap-4 rounded-xl border border-primary/25 bg-accent-subtle p-6 sm:p-8">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <ShieldCheck className="size-5" strokeWidth={1.9} />
              </span>
              <div>
                <h3 className="text-lg font-bold tracking-tight">Book with a person, not a platform.</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Your questions are answered by someone who knows the rooms,
                  and your booking is confirmed by the people who will{" "}
                  <span className="font-medium text-foreground">welcome you at the door</span>.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <div className="flex h-full gap-4 rounded-xl border border-warm/25 bg-warm/[0.06] p-6 sm:p-8">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-warm text-background">
                <CalendarHeart className="size-5" strokeWidth={1.9} />
              </span>
              <div>
                <h3 className="text-lg font-bold tracking-tight">Staying a while? Ask us.</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Kitchen access makes a longer stay easy. Tell us how long you
                  are in Guwahati and we will{" "}
                  <span className="font-medium text-foreground">work out the rate for your dates</span>.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {FACTORS.map((f, i) => (
            <Reveal key={f.title} delay={i * 60}>
              <div className="h-full rounded-xl border border-border bg-elevated p-6">
                <span className="flex size-10 items-center justify-center rounded-lg bg-accent-subtle text-primary">
                  <f.icon className="size-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
 * Location — address, landmark and the real map.
 * ---------------------------------------------------------------------- */

export function LocationBand() {
  return (
    <section id="location" aria-labelledby="location-title" className={cn(SECTION, "mx-auto w-full max-w-6xl")}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
        <Reveal className="flex flex-col">
          <span className={EYEBROW}>Location</span>
          <h2 id="location-title" className={H2}>
            Opposite Hatigaon
            <br />
            Police Station.
          </h2>
          <p className={LEAD}>
            A landmark every cab and auto driver can find, in the middle of
            Hatigaon — so the last part of a long journey is the easy part.
          </p>

          <address className="mt-8 not-italic">
            <ul className="divide-y divide-border rounded-xl border border-border bg-elevated">
              <li className="flex gap-4 p-5">
                <MapPin className="mt-0.5 size-5 shrink-0 text-primary" strokeWidth={1.75} />
                <span className="leading-relaxed">
                  <span className="block font-semibold">
                    {ADDRESS.house}, {ADDRESS.street}
                  </span>
                  <span className="block text-muted-foreground">
                    {ADDRESS.locality}, {ADDRESS.city}, {ADDRESS.region} {ADDRESS.postalCode}
                  </span>
                </span>
              </li>
              <li className="flex gap-4 p-5">
                <Building2 className="mt-0.5 size-5 shrink-0 text-primary" strokeWidth={1.75} />
                <span className="leading-relaxed">
                  <span className="block font-semibold">Landmark</span>
                  <span className="block text-muted-foreground">Directly opposite Hatigaon Police Station</span>
                </span>
              </li>
              <li className="flex gap-4 p-5">
                <Phone className="mt-0.5 size-5 shrink-0 text-primary" strokeWidth={1.75} />
                <span className="leading-relaxed">
                  <span className="block font-semibold">Lost on the way?</span>
                  <a href={BOOKING_PHONE.tel} className="block text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                    Call {BOOKING_PHONE.label}
                  </a>
                </span>
              </li>
            </ul>
          </address>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={MAPS_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="press inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Navigation className="size-4" />
              Open in Google Maps
            </a>
            <a
              href={BOOKING_PHONE.tel}
              className="press inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border-strong bg-elevated px-6 text-sm font-semibold transition-colors hover:bg-subtle"
            >
              <Phone className="size-4" />
              Call for directions
            </a>
          </div>
        </Reveal>

        <Reveal delay={80} className="min-h-96">
          <div className="relative h-full min-h-96 overflow-hidden rounded-2xl border border-border bg-muted shadow-panel">
            <iframe
              title="Map showing Ujan Homestay on Mother Teresa Path, Hatigaon, Guwahati"
              src={MAPS_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full border-0 dark:[filter:invert(0.9)_hue-rotate(180deg)_saturate(0.7)]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
 * FAQ — one list feeds this and the FAQPage structured data.
 * ---------------------------------------------------------------------- */

export function FaqBand() {
  return (
    <section id="faq" aria-labelledby="faq-title" className={cn(SECTION, "mx-auto w-full max-w-6xl")}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <span className={EYEBROW}>Good to know</span>
          <h2 id="faq-title" className={H2}>
            Questions, answered.
          </h2>
          <p className={LEAD}>
            Anything else, just ask — the fastest answer is a WhatsApp message
            away.
          </p>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="press mt-8 inline-flex h-12 items-center gap-2 rounded-full border border-border-strong bg-elevated px-6 text-sm font-semibold transition-colors hover:bg-subtle"
          >
            <WhatsAppIcon className="size-4 text-whatsapp" />
            Ask on WhatsApp
          </a>
        </Reveal>

        <Reveal delay={60}>
          <div className="divide-y divide-border rounded-2xl border border-border bg-elevated">
            {FAQS.map(({ q, a }, i) => (
              <details key={q} name="faq" open={i === 0} className="faq-item group">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-6 py-5 font-semibold transition-colors hover:text-primary sm:px-8">
                  {q}
                  <ChevronDown
                    aria-hidden
                    className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 ease-out-strong group-open:rotate-180"
                  />
                </summary>
                <p className="px-6 pb-6 leading-relaxed text-muted-foreground sm:px-8">{a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
 * CTA — one action: reach a person.
 * ---------------------------------------------------------------------- */

export function CtaBand() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden px-6 py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid mask-fade-y" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-bloom-center" />

      <Reveal className="relative mx-auto max-w-3xl text-center">
        <span className={EYEBROW}>Ready when you are</span>
        <h2 id="cta-title" className="mt-6 font-display text-5xl leading-[1.04] font-medium tracking-tight text-balance sm:text-6xl">
          Your room in Guwahati
          <br />
          <span className="relative inline-block text-primary italic">
            is one message away.
            <span aria-hidden className="glow-rule absolute -bottom-1 left-0 h-[0.07em] w-full rounded-full sm:-bottom-2" />
          </span>
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-balance text-muted-foreground">
          Tell us your dates and how many of you are coming. We will confirm
          your room and your rate — and have it ready when you arrive.
        </p>
        <div className="mt-10 flex justify-center">
          <ContactCard />
        </div>
      </Reveal>
    </section>
  );
}
