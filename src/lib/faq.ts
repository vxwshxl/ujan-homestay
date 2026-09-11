import { BOOKING_PHONE, FULL_ADDRESS, PHONES, PRICE_FROM, formatINR } from "@/lib/site";

/**
 * The questions a guest actually asks before booking, answered in plain text.
 *
 * One list feeds both the visible FAQ and the FAQPage structured data. Google
 * requires the two to match word for word, and answer engines quote these
 * almost verbatim, so each answer is written to stand on its own.
 */
export const FAQS: { q: string; a: string }[] = [
  {
    q: "Where is Ujan Homestay?",
    a: `${FULL_ADDRESS}. The homestay is directly opposite Hatigaon Police Station, a well-known landmark, so it is easy to find by cab or auto.`,
  },
  {
    q: "How much does a night at Ujan cost?",
    a: `Rooms start from ${formatINR(PRICE_FROM)} a night. The exact rate depends on your dates and the room, and we confirm it with you on WhatsApp before you travel.`,
  },
  {
    q: "How do I book a room?",
    a: `Message us on WhatsApp at ${BOOKING_PHONE.label}, or call ${PHONES.map((p) => p.label).join(" or ")}. You book directly with the family who runs Ujan — there is no booking site in between.`,
  },
  {
    q: "What is included in the stay?",
    a: "An air-conditioned room, high-speed Wi-Fi, easy parking and access to the kitchen.",
  },
  {
    q: "Will I share my room with other guests?",
    a: "No. There is no sharing with strangers — your room is yours for the whole stay.",
  },
  {
    q: "Is Ujan couple friendly and family friendly?",
    a: "Yes. Ujan is couple friendly and family friendly, and it works well for business trips too.",
  },
  {
    q: "Can I cook during my stay?",
    a: "Yes. Guests have kitchen access, which is especially handy on longer stays or when you are travelling with family.",
  },
  {
    q: "What are the check-in and check-out times?",
    a: "Check-in and check-out times are confirmed when you book. Tell us your arrival time when you message and we will plan around it.",
  },
];
