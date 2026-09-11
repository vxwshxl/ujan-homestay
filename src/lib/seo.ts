/**
 * The homestay's search identity, as one linked JSON-LD graph.
 *
 * Search and answer engines resolve a query to an entity before they rank
 * anything, and a local business is the entity type they are best at. One
 * `@graph` with cross-referenced `@id`s tells them the LodgingBusiness, the
 * WebSite, the WebPage and the FAQ are facets of one place — three unrelated
 * blobs would read as three weak entities competing with each other.
 *
 * Deliberately absent, and why:
 * - `geo` coordinates: add them from Ujan's Google Business Profile. A guessed
 *   pin is worse than none, because Maps trusts it.
 * - `aggregateRating` / `review`: Google shows stars verbatim, and inventing
 *   them is a manual-action risk. Add them when there are real reviews.
 * - `checkinTime` / `checkoutTime`: not published yet.
 */

import { FAQS } from "@/lib/faq";
import {
  ADDRESS,
  AMENITIES,
  BRAND,
  INSTAGRAM,
  MAPS_HREF,
  PHONES,
  PRICE_FROM,
  SITE_URL,
  STREET_ADDRESS,
  formatINR,
} from "@/lib/site";

export const SEO_TITLE = `${BRAND.name} · Homestay in Hatigaon, Guwahati`;

export const SEO_DESCRIPTION = `${BRAND.name} is a private, family-run homestay in Hatigaon, Guwahati — clean AC rooms, high-speed Wi-Fi, easy parking and kitchen access from ${formatINR(PRICE_FROM)} a night. Book directly on WhatsApp.`;

export const SEO_KEYWORDS = [
  BRAND.name,
  ...BRAND.alternateNames,
  "homestay in Guwahati",
  "Guwahati homestay",
  "homestay in Hatigaon",
  "Hatigaon homestay",
  "homestay near Hatigaon Police Station",
  "budget stay in Guwahati",
  "AC rooms in Guwahati",
  "couple friendly homestay Guwahati",
  "family homestay Guwahati",
  "homestay with kitchen Guwahati",
  "stay in Guwahati Assam",
];

const LODGING_ID = `${SITE_URL}/#lodging`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const WEBPAGE_ID = `${SITE_URL}/#webpage`;
const FAQ_ID = `${SITE_URL}/#faq`;

const abs = (path: string) => `${SITE_URL}${path}`;

export const PHOTOS = [
  "/images/ujan-house.jpg",
  "/images/ujan-living.jpg",
  "/images/ujan-corner.jpg",
  "/images/ujan-kitchen.jpg",
  "/images/ujan-room.jpg",
];

export function siteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LodgingBusiness",
        "@id": LODGING_ID,
        name: BRAND.name,
        alternateName: [...BRAND.alternateNames],
        slogan: BRAND.tagline,
        description: SEO_DESCRIPTION,
        url: `${SITE_URL}/`,
        image: PHOTOS.map(abs),
        logo: abs("/icon-512.png"),
        telephone: PHONES[0]?.e164,
        contactPoint: PHONES.map((p) => ({
          "@type": "ContactPoint",
          telephone: p.e164,
          contactType: "reservations",
          areaServed: "IN",
        })),
        address: {
          "@type": "PostalAddress",
          streetAddress: STREET_ADDRESS,
          addressLocality: ADDRESS.city,
          addressRegion: ADDRESS.region,
          postalCode: ADDRESS.postalCode,
          addressCountry: ADDRESS.country,
        },
        hasMap: MAPS_HREF,
        priceRange: `From ${formatINR(PRICE_FROM)} per night`,
        currenciesAccepted: "INR",
        amenityFeature: AMENITIES.map((name) => ({
          "@type": "LocationFeatureSpecification",
          name,
          value: true,
        })),
        makesOffer: {
          "@type": "Offer",
          name: "Air-conditioned room, per night",
          url: `${SITE_URL}/#rates`,
          priceCurrency: "INR",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: PRICE_FROM,
            minPrice: PRICE_FROM,
            priceCurrency: "INR",
            unitText: "night",
          },
        },
        sameAs: [INSTAGRAM.href],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: `${SITE_URL}/`,
        name: BRAND.name,
        alternateName: [...BRAND.alternateNames],
        inLanguage: "en-IN",
        publisher: { "@id": LODGING_ID },
      },
      {
        "@type": "WebPage",
        "@id": WEBPAGE_ID,
        url: `${SITE_URL}/`,
        name: SEO_TITLE,
        description: SEO_DESCRIPTION,
        inLanguage: "en-IN",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": LODGING_ID },
        primaryImageOfPage: abs("/images/ujan-house.jpg"),
      },
      {
        "@type": "FAQPage",
        "@id": FAQ_ID,
        isPartOf: { "@id": WEBPAGE_ID },
        mainEntity: FAQS.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };
}
