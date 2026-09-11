import Image from "next/image";
import { cn } from "@/lib/utils";

/** Ujan's own logo (the leaf-and-U seal), in a small cream chip. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative block size-10 shrink-0 overflow-hidden rounded-lg bg-elevated shadow-e1",
        className,
      )}
    >
      <Image
        src="/images/ujan-profile.jpg"
        alt=""
        fill
        sizes="48px"
        className="object-cover"
      />
    </span>
  );
}

/**
 * Mark + name. The name drops "Homestay" below `sm` so the header's first row
 * fits a 360px phone next to the theme switch and the booking button.
 */
export function Wordmark({
  className,
  taglineClassName,
}: {
  className?: string;
  /** Lets the header hide the tagline once the bar contracts. */
  taglineClassName?: string;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-semibold tracking-tight">
          Ujan<span className="max-sm:hidden"> Homestay</span>
        </span>
        <span className={cn("mt-1 text-xs font-medium text-muted-foreground", taglineClassName)}>
          Hatigaon · Guwahati
        </span>
      </span>
    </span>
  );
}
