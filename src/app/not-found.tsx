import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LogoMark } from "@/components/brand";
import { WhatsAppIcon } from "@/components/brand-icons";
import { WHATSAPP_HREF } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid mask-fade-y" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-bloom-center" />

      <div className="relative flex flex-col items-center">
        <LogoMark className="size-16 rounded-xl" />
        <p className="mt-8 text-xs font-semibold tracking-[0.2em] text-warm uppercase">Error 404</p>
        <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-balance sm:text-5xl">
          This room doesn&apos;t exist.
        </h1>
        <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
          The page you were looking for has moved or never was. The rooms that
          do exist are one click away.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="press inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <ArrowLeft className="size-4" />
            Back to Ujan
          </Link>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="press inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border-strong bg-elevated px-6 text-sm font-semibold transition-colors hover:bg-subtle"
          >
            <WhatsAppIcon className="size-4 text-whatsapp" />
            Book on WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
