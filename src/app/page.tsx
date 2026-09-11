import Image from "next/image";
import {
  BedDouble,
  Camera,
  Car,
  Check,
  ChevronRight,
  CookingPot,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Sparkles,
  Wifi,
} from "lucide-react";

const whatsappLink =
  "https://wa.me/919864916371?text=Hi%20Ujan%20Homestay%2C%20I%20want%20to%20book%20a%20stay.";

const gallery = [
  {
    src: "/images/ujan-living.jpg",
    alt: "Ujan Homestay turquoise room with bed and branded collage",
    title: "Clean AC Rooms",
    meta: "Fresh rooms for couples, families, and work trips.",
    size: "lg:row-span-2",
  },
  {
    src: "/images/ujan-kitchen.jpg",
    alt: "Ujan Homestay room reel preview with bed and fan",
    title: "Calm Interiors",
    meta: "Simple, tidy, and guest-ready.",
    size: "",
  },
  {
    src: "/images/ujan-corner.jpg",
    alt: "Ujan Homestay vertical room preview with bed",
    title: "Private Corners",
    meta: "A peaceful room to reset after Guwahati days.",
    size: "",
  },
  {
    src: "/images/ujan-room.jpg",
    alt: "Ujan Homestay room wall and mirror detail",
    title: "Home Details",
    meta: "Little touches that keep the stay warm.",
    size: "",
  },
];

const amenities = [
  { icon: BedDouble, label: "AC rooms", detail: "Comfortable rooms from Rs 1,500/night." },
  { icon: Wifi, label: "High-speed Wi-Fi", detail: "Stay connected for work, reels, and maps." },
  { icon: Car, label: "Easy parking", detail: "Convenient access near Hatigaon Police Station." },
  { icon: CookingPot, label: "Kitchen access", detail: "Useful for longer stays and family travel." },
  { icon: ShieldCheck, label: "Safe stay", detail: "Clean, hygienic, and family-friendly setup." },
  { icon: HeartHandshake, label: "Assamese hospitality", detail: "A little home in Guwahati, not a cold hotel room." },
];

const highlights = [
  "House No. 38",
  "Mother Teresa Path",
  "Opposite Hatigaon Police Station",
  "Guwahati - 781038",
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7fbf8] text-[#10201d]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/35 bg-[#f7fbf8]/86 px-4 backdrop-blur-xl">
        <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between">
          <nav className="hidden items-center gap-2 text-sm font-medium text-[#40524d] md:flex">
            <a className="nav-link" href="#stay">
              Stay
            </a>
            <a className="nav-link" href="#rooms">
              Rooms
            </a>
            <a className="nav-link" href="#location">
              Location
            </a>
          </nav>

          <a
            className="absolute left-1/2 flex -translate-x-1/2 items-center gap-3"
            href="#top"
            aria-label="Ujan Homestay home"
          >
            <span className="relative h-11 w-11 overflow-hidden rounded-[8px] bg-white shadow-[0_18px_45px_rgba(12,45,40,0.22)]">
              <Image
                src="/images/ujan-profile.jpg"
                alt=""
                fill
                sizes="44px"
                className="object-cover"
              />
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="text-[11px] font-semibold uppercase text-[#f97316]">
                Hatigaon
              </span>
              <span className="text-base font-semibold text-[#10201d]">
                Ujan Homestay
              </span>
            </span>
          </a>

          <a
            className="pressable ml-auto inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-[#128c7e] px-4 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(18,140,126,0.28)] transition-[background-color,box-shadow,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#0f766c] focus:outline-none focus:ring-2 focus:ring-[#128c7e]/30 focus:ring-offset-2"
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Book</span>
            <span className="hidden sm:inline">on WhatsApp</span>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </header>

      <section id="top" className="relative isolate min-h-[88vh] overflow-hidden pt-20">
        <Image
          src="/images/ujan-house.jpg"
          alt="Ujan Homestay branded room and kitchen graphic"
          fill
          priority
          sizes="100vw"
          className="object-cover object-left md:object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,21,18,0.88),rgba(6,21,18,0.54)_42%,rgba(6,21,18,0.18))]" />

        <div className="relative mx-auto flex min-h-[calc(88vh-5rem)] max-w-7xl items-end px-4 py-10 sm:px-6 lg:px-8">
          <div className="reveal max-w-3xl pb-8 text-white">
            <div className="mb-5 inline-flex items-center gap-2 rounded-[8px] border border-white/18 bg-white/10 px-3 py-2 text-sm font-medium text-white/86 backdrop-blur-md">
              <MapPin className="h-4 w-4 text-[#7dd3c7]" aria-hidden="true" />
              Mother Teresa Path, Hatigaon
            </div>
            <h1 className="max-w-2xl text-5xl font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              A clean, calm homestay in Guwahati.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/78">
              Comfortable AC rooms, Wi-Fi, parking, kitchen access, and a stay
              that feels personal from the moment you arrive.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                className="pressable inline-flex h-12 items-center justify-center gap-2 rounded-[8px] bg-[#f97316] px-5 text-sm font-semibold text-white shadow-[0_16px_42px_rgba(249,115,22,0.34)] transition-[background-color,box-shadow,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#ea580c] focus:outline-none focus:ring-2 focus:ring-[#f97316]/40 focus:ring-offset-2 focus:ring-offset-[#10201d]"
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book from Rs 1,500/night
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                className="pressable inline-flex h-12 items-center justify-center gap-2 rounded-[8px] border border-white/22 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur-md transition-[background-color,border-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-white/36 hover:bg-white/16"
                href="https://www.instagram.com/ujanhomestay/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Camera className="h-4 w-4" aria-hidden="true" />
                View Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#d9ece5] bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-[#d9ece5] md:grid-cols-4">
          {highlights.map((item) => (
            <div key={item} className="bg-white px-4 py-5 text-center">
              <p className="text-sm font-semibold text-[#10201d]">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="stay" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
          <div>
            <p className="section-kicker">Why Ujan</p>
            <h2 className="mt-3 max-w-xl text-4xl font-semibold leading-tight text-[#10201d] sm:text-5xl">
              Built for easy city stays without losing the homely part.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {["Couple friendly", "Family friendly", "Business ready"].map((item) => (
              <div
                className="rounded-[8px] border border-[#d9ece5] bg-white p-4 shadow-[0_18px_55px_rgba(16,32,29,0.06)]"
                key={item}
              >
                <Check className="mb-5 h-5 w-5 text-[#128c7e]" aria-hidden="true" />
                <p className="text-sm font-semibold text-[#10201d]">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-10 grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-3">
          {amenities.map(({ icon: Icon, label, detail }) => (
            <article
              className="group rounded-[8px] border border-[#d9ece5] bg-white p-6 shadow-[0_18px_55px_rgba(16,32,29,0.06)] transition-[border-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-[#8dd8cc] hover:shadow-[0_22px_70px_rgba(16,32,29,0.1)]"
              key={label}
            >
              <div className="mb-6 grid h-11 w-11 place-items-center rounded-[8px] bg-[#ecfbf7] text-[#128c7e] transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:bg-[#d8f5ee]">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-[#10201d]">{label}</h3>
              <p className="mt-2 text-sm leading-6 text-[#5d6f69]">{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="rooms" className="bg-[#10201d] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="section-kicker text-[#7dd3c7]">Rooms & Corners</p>
              <h2 className="mt-3 max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl">
                Real spaces from Ujan&apos;s public posts.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-white/62">
              A visual pass through the stay: bedrooms, home details, and
              simple comfort-first amenities.
            </p>
          </div>

          <div className="grid auto-rows-[260px] gap-4 lg:grid-cols-4">
            {gallery.map((item) => (
              <article
                className={`group relative overflow-hidden rounded-[8px] bg-white/6 ${item.size}`}
                key={item.src}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 100vw"
                  className="object-cover transition-transform duration-[260ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,32,29,0.02),rgba(16,32,29,0.78))]" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-white/70">{item.meta}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="location" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="section-kicker">Location</p>
            <h2 className="mt-3 max-w-2xl text-4xl font-semibold leading-tight text-[#10201d] sm:text-5xl">
              Stay near Hatigaon Police Station with quick city access.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#5d6f69]">
              The homestay is listed at House No. 38, Mother Teresa Path,
              Opposite Hatigaon Police Station, Guwahati - 781038.
            </p>
          </div>
          <div className="rounded-[8px] border border-[#d9ece5] bg-white p-6 shadow-[0_18px_55px_rgba(16,32,29,0.06)]">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-[8px] bg-[#fff4eb] text-[#f97316]">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#10201d]">Booking line</p>
                <p className="text-sm text-[#5d6f69]">98649-16371 / 88766-33455</p>
              </div>
            </div>
            <a
              className="pressable mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[8px] bg-[#128c7e] px-5 text-sm font-semibold text-white transition-[background-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#0f766c]"
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Confirm on WhatsApp
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
