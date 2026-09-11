import { cn } from "@/lib/utils";

/**
 * An endlessly scrolling band of text.
 *
 * The track holds the list exactly twice and travels exactly -50%, so the frame
 * where it loops is pixel-identical to the one before it. Pure CSS, so it keeps
 * full frame rate while GSAP is busy with the pinned hero. Decorative, so the
 * whole band is hidden from assistive tech.
 */
export function Marquee({
  items,
  duration = 40,
  reverse = false,
  className,
  itemClassName,
  separator = "✦",
}: {
  items: readonly string[];
  /** Seconds per full pass. A longer list needs a longer duration. */
  duration?: number;
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
  separator?: string;
}) {
  const half = (
    <ul className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className={cn("flex items-center whitespace-nowrap", itemClassName)}>
          {item}
          <span aria-hidden className="mx-6 text-warm/70">
            {separator}
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn("flex overflow-hidden", className)} aria-hidden>
      <div
        className={cn("flex w-max", reverse ? "animate-marquee-reverse" : "animate-marquee")}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {half}
        {half}
      </div>
    </div>
  );
}
