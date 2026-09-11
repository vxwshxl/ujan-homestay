import { ArrowUpRight, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/brand-icons";
import { BOOKING_PHONE, PHONES, WHATSAPP_HREF } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Contact, split by *how* you want to get in touch rather than by number:
 * someone who wants to type a question at 10pm and someone who wants to talk
 * now are two different guests, and each card answers exactly one of them.
 * WhatsApp comes first and wears WhatsApp's colour so it is recognised at a
 * glance.
 */
function ContactPanel({
  whatsapp = false,
  title,
  note,
  icon,
  links,
}: {
  whatsapp?: boolean;
  title: string;
  note: string;
  icon: React.ReactNode;
  links: { label: string; href: string; external?: boolean }[];
}) {
  return (
    <div className="flex w-full max-w-xs flex-col overflow-hidden rounded-xl border border-border bg-elevated text-left shadow-e2">
      <div
        className={cn(
          "flex items-center gap-3 px-5 py-4",
          whatsapp ? "bg-whatsapp text-whatsapp-fg" : "border-b border-border",
        )}
      >
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-lg",
            whatsapp ? "bg-whatsapp-fg/20" : "bg-accent-subtle text-primary",
          )}
        >
          {icon}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-bold tracking-tight">{title}</p>
          <p className={cn("text-xs", whatsapp ? "opacity-85" : "text-muted-foreground")}>{note}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center p-2">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-subtle"
          >
            <span className="text-sm font-semibold tabular-nums">{l.label}</span>
            <ArrowUpRight className="ml-auto size-4 shrink-0 text-muted-foreground" strokeWidth={2.25} />
          </a>
        ))}
      </div>
    </div>
  );
}

export function ContactCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:items-stretch",
        className,
      )}
    >
      <ContactPanel
        whatsapp
        title="WhatsApp us"
        note="The quickest way to book"
        icon={<WhatsAppIcon className="size-4" />}
        links={[{ label: BOOKING_PHONE.label, href: WHATSAPP_HREF, external: true }]}
      />
      <ContactPanel
        title="Call us"
        note="Talk to the family directly"
        icon={<Phone className="size-4" strokeWidth={2} />}
        links={PHONES.map((p) => ({ label: p.label, href: p.tel }))}
      />
    </div>
  );
}
