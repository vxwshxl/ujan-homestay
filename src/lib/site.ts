/**
 * Everything the site states about the homestay, in one place.
 *
 * The page, the footer, the structured data, the FAQ and the sitemap all read
 * from here, so a phone number or a price cannot end up written three ways in
 * three files. Every fact below comes from Ujan's own listing and posts — if one
 * stops being true, change it here and it changes everywhere.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ujan-homestay.vercel.app"
).replace(/\/$/, "");

export const BRAND = {
  name: "Ujan Homestay",
  shortName: "Ujan",
  tagline: "Feel at home, away from home",
  alternateNames: [
    "Ujan Home Stay",
    "Ujan Homestay Guwahati",
    "Ujan Homestay Hatigaon",
    "Ujan Guwahati",
  ],
} as const;

export const ADDRESS = {
  house: "House No. 38",
  street: "Mother Teresa Path",
  landmark: "Opposite Hatigaon Police Station",
  locality: "Hatigaon",
  city: "Guwahati",
  region: "Assam",
  postalCode: "781038",
  country: "IN",
} as const;

export const STREET_ADDRESS = `${ADDRESS.house}, ${ADDRESS.street}, ${ADDRESS.landmark}`;
export const FULL_ADDRESS = `${STREET_ADDRESS}, ${ADDRESS.locality}, ${ADDRESS.city}, ${ADDRESS.region} ${ADDRESS.postalCode}`;

/** Lowest nightly rate, in rupees. The exact figure is confirmed per booking. */
export const PRICE_FROM = 1500;

export const formatINR = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

export type Phone = {
  /** As people read it aloud: "98649 16371". */
  label: string;
  /** E.164, as schema.org and tel: expect. */
  e164: string;
  tel: string;
  /** Only set for numbers that are on WhatsApp. */
  whatsapp?: string;
};

const phone = (tenDigits: string, onWhatsApp: boolean): Phone => ({
  label: `${tenDigits.slice(0, 5)} ${tenDigits.slice(5)}`,
  e164: `+91${tenDigits}`,
  tel: `tel:+91${tenDigits}`,
  ...(onWhatsApp ? { whatsapp: `https://wa.me/91${tenDigits}` } : {}),
});

export const BOOKING_PHONE = phone("9864916371", true);
export const PHONES: Phone[] = [BOOKING_PHONE, phone("8876633455", false)];

const BOOKING_MESSAGE = "Hi Ujan Homestay, I'd like to book a stay.";
export const WHATSAPP_HREF = `${BOOKING_PHONE.whatsapp}?text=${encodeURIComponent(BOOKING_MESSAGE)}`;

export const INSTAGRAM = {
  handle: "ujanhomestay",
  href: "https://www.instagram.com/ujanhomestay/",
} as const;

const MAPS_QUERY = `${BRAND.name}, ${ADDRESS.street}, ${ADDRESS.locality}, ${ADDRESS.city}, ${ADDRESS.region} ${ADDRESS.postalCode}`;
export const MAPS_HREF = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`;
export const MAPS_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&z=16&output=embed`;

/**
 * Header links. `sections` are every page section that counts as "in" that
 * link, so the active pill does not blink off while you read a section that
 * sits between two nav targets.
 */
export const NAV = [
  { id: "stay", label: "Stay", sections: ["stay", "journey", "amenities"] },
  { id: "rooms", label: "Rooms", sections: ["rooms"] },
  { id: "rates", label: "Rates", sections: ["rates"] },
  { id: "location", label: "Location", sections: ["location"] },
  { id: "faq", label: "FAQ", sections: ["faq", "contact"] },
] as const;

/** The claims Ujan makes about itself, used by the page and the structured data. */
export const AMENITIES = [
  "Air-conditioned rooms",
  "High-speed Wi-Fi",
  "Easy parking",
  "Kitchen access",
  "Clean and hygienic",
  "No sharing with strangers",
  "Couple friendly",
  "Family friendly",
  "Business ready",
] as const;
