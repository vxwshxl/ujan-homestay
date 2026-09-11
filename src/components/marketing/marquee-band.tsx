import { Marquee } from "@/components/marketing/marquee";

const TOP = [
  "AC rooms",
  "High-speed Wi-Fi",
  "Easy parking",
  "Kitchen access",
  "Couple friendly",
  "Family friendly",
  "Business ready",
  "Hatigaon, Guwahati",
];

const BOTTOM = [
  "Feel at home, away from home",
  "No sharing with strangers",
  "Assamese hospitality",
  "Book direct on WhatsApp",
  "Clean & hygienic",
];

/**
 * Two counter-rotating tilted bands between the hero and the first section.
 * Opposite directions and different speeds: matched marquees drift into
 * lockstep within seconds, and the pattern that emerges is more distracting
 * than either row alone.
 */
export function MarqueeBand() {
  return (
    <div aria-hidden className="relative isolate -my-6 overflow-hidden py-16">
      <div className="-rotate-2">
        <Marquee
          items={TOP}
          duration={44}
          className="mask-fade-x border-y border-border bg-elevated/70 py-4"
          itemClassName="font-display text-xl font-medium tracking-tight sm:text-2xl"
        />
      </div>
      <div className="mt-4 rotate-1">
        <Marquee
          items={BOTTOM}
          duration={58}
          reverse
          className="mask-fade-x border-y border-border bg-accent-subtle py-3"
          itemClassName="text-sm font-medium tracking-[0.12em] text-muted-foreground uppercase sm:text-base"
        />
      </div>
    </div>
  );
}
