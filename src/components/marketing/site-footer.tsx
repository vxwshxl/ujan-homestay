import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { LogoMark } from "@/components/brand";
import { InstagramIcon, WhatsAppIcon } from "@/components/brand-icons";
import {
  ADDRESS,
  BOOKING_PHONE,
  INSTAGRAM,
  MAPS_HREF,
  NAV,
  PHONES,
  PRICE_FROM,
  WHATSAPP_HREF,
  formatINR,
} from "@/lib/site";

const STAY = [`From ${formatINR(PRICE_FROM)} a night`, "AC rooms", "High-speed Wi-Fi", "Easy parking", "Kitchen access"];

const H3 = "text-base font-semibold text-night-fg sm:text-lg";
const CIRCLE = "flex size-9 shrink-0 items-center justify-center rounded-full border border-night-border sm:size-10";

/**
 * The footer: a night-time card in both themes, echoing Ujan's own banner.
 *
 * Phone sizing is deliberately compact. RevealFooter only pins a footer that
 * fits in 92% of the viewport, so two-up columns and tighter spacing below
 * `sm` are what let the reveal work on a phone at all; shorter screens keep an
 * ordinary scroll, which is RevealFooter protecting the footer's top edge.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      data-nav-stop
      aria-labelledby="footer-title"
      className="scroll-mt-24 bg-background px-4 pb-4 sm:px-6 sm:pb-8"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="relative isolate overflow-hidden rounded-2xl bg-night p-6 text-night-muted sm:p-12">
          <div aria-hidden className="pointer-events-none absolute -top-48 -right-48 -z-10 size-160 bg-bloom-center" />

          <div className="flex items-start justify-between gap-4 sm:gap-6">
            <h2
              id="footer-title"
              className="font-display text-3xl leading-[1.05] font-medium tracking-tight text-night-fg sm:text-6xl"
            >
              Feel at home,
              <br />
              <span className="text-night-accent italic">away from home.</span>
            </h2>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book on WhatsApp"
              className="press flex size-12 shrink-0 items-center justify-center rounded-full border border-night-border text-night-fg transition-colors hover:bg-night-fg hover:text-night sm:size-20"
            >
              <ArrowUpRight className="size-5 sm:size-8" strokeWidth={1.5} />
            </a>
          </div>

          <div className="mt-6 h-px w-full bg-night-border sm:mt-10" />

          <div className="mt-6 grid grid-cols-2 gap-6 sm:mt-10 sm:gap-10 lg:grid-cols-4">
            <nav aria-label="Footer">
              <h3 className={H3}>Explore</h3>
              <ul className="mt-3 space-y-2 text-sm sm:mt-5 sm:space-y-3">
                {NAV.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="transition-colors hover:text-night-fg">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h3 className={H3}>The stay</h3>
              <ul className="mt-3 space-y-2 text-sm sm:mt-5 sm:space-y-3">
                {STAY.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 grid grid-cols-2 gap-6 sm:gap-10">
              <div>
                <h3 className={H3}>Follow</h3>
                <a
                  href={INSTAGRAM.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-3 inline-flex items-center gap-3 text-sm sm:mt-5"
                >
                  <span className={`${CIRCLE} text-night-fg transition-colors group-hover:bg-night-fg group-hover:text-night`}>
                    <InstagramIcon className="size-4" />
                  </span>
                  <span className="font-medium text-night-fg">@{INSTAGRAM.handle}</span>
                </a>
              </div>

              <div>
                <h3 className={H3}>Book</h3>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-3 inline-flex items-center gap-3 text-sm sm:mt-5"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-whatsapp text-whatsapp-fg sm:size-10">
                    <WhatsAppIcon className="size-4" />
                  </span>
                  <span className="font-medium text-night-fg group-hover:underline">On WhatsApp</span>
                </a>
              </div>

              <div className="col-span-2">
                <h3 className={H3}>Contact</h3>
                <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-4 text-sm sm:mt-5 sm:gap-5">
                  <li className="flex items-start gap-3">
                    <span className={`${CIRCLE} text-night-fg`}>
                      <Phone className="size-4" />
                    </span>
                    <span>
                      <span className="block text-xs">Call us</span>
                      {PHONES.map((p) => (
                        <a key={p.tel} href={p.tel} className="block text-night-fg tabular-nums hover:underline">
                          {p.label}
                        </a>
                      ))}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className={`${CIRCLE} text-night-fg`}>
                      <WhatsAppIcon className="size-4" />
                    </span>
                    <span>
                      <span className="block text-xs">WhatsApp us</span>
                      <a
                        href={WHATSAPP_HREF}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-night-fg tabular-nums hover:underline"
                      >
                        {BOOKING_PHONE.label}
                      </a>
                    </span>
                  </li>
                  <li className="col-span-2 flex items-start gap-3">
                    <span className={`${CIRCLE} text-night-fg`}>
                      <MapPin className="size-4" />
                    </span>
                    <address className="not-italic">
                      <span className="block text-night-fg">
                        {ADDRESS.house}, {ADDRESS.street}, {ADDRESS.landmark}, {ADDRESS.city} {ADDRESS.postalCode}
                      </span>
                      <a
                        href={MAPS_HREF}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-block font-medium text-night-accent underline underline-offset-4"
                      >
                        View on Google Maps
                      </a>
                    </address>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 h-px w-full bg-night-border sm:mt-12" />

          <div className="mt-4 flex flex-col items-center justify-between gap-2 text-xs sm:mt-6 sm:flex-row sm:gap-4">
            <span className="flex items-center gap-3">
              <LogoMark className="size-8" />
              <span>
                <span className="font-semibold text-night-fg">Ujan Homestay</span> · Hatigaon, Guwahati
              </span>
            </span>
            <span className="max-sm:text-center">© {year} Ujan Homestay. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
