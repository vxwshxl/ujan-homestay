import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The small "this is what you get" cards that settle around the hero window.
 * Chrome, not content: aria-hidden, no links — everything they say is also
 * said in the page copy.
 */
export function FloatCard({
  icon: Icon,
  title,
  detail,
  className,
  compactOnPhone = false,
}: {
  icon: LucideIcon;
  title: string;
  detail: string;
  className?: string;
  /** Tighter padding and type below `sm`, for a phone-width stage. */
  compactOnPhone?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "flex items-center gap-3 rounded-xl border border-border bg-elevated/90 px-4 py-3 shadow-panel backdrop-blur-xl",
        compactOnPhone && "max-sm:gap-2 max-sm:rounded-lg max-sm:px-3 max-sm:py-2",
        className,
      )}
    >
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent-subtle text-primary",
          compactOnPhone && "max-sm:size-7",
        )}
      >
        <Icon className={cn("size-4", compactOnPhone && "max-sm:size-3")} strokeWidth={2} />
      </span>
      <span className="min-w-0">
        <span
          className={cn(
            "block text-sm font-semibold whitespace-nowrap",
            compactOnPhone && "max-sm:text-xs",
          )}
        >
          {title}
        </span>
        <span
          className={cn(
            "block text-xs whitespace-nowrap text-muted-foreground",
            compactOnPhone && "max-sm:hidden",
          )}
        >
          {detail}
        </span>
      </span>
    </div>
  );
}
