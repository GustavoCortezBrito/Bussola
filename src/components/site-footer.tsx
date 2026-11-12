import Link from "next/link";
import { brand } from "@/content/brand";
import { Instagram, WhatsApp } from "./icons";
import { SlatRule } from "./motion";

type Col = { title: string; links: { label: string; href: string }[] };

export function SiteFooter({
  mark,
  blurb,
  columns,
  legal,
}: {
  mark: React.ReactNode;
  blurb: string;
  columns: Col[];
  legal: string[];
}) {
  return (
    <footer className="on-dark bg-ink text-white">
      <div className="container-x py-16 md:py-20">
        <SlatRule className="mb-14 text-brass/70" />
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(2,1fr)]">
          <div className="max-w-sm">
            {mark}
            <p className="mt-6 text-sm leading-relaxed text-white/65">{blurb}</p>
            <div className="mt-6 flex gap-3">
              <a
                href={brand.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/25 transition-colors hover:bg-white/10"
              >
                <Instagram className="size-[1.1rem]" />
              </a>
              <a
                href={`https://wa.me/${brand.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/25 transition-colors hover:bg-white/10"
              >
                <WhatsApp className="size-[1.1rem]" />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="eyebrow text-white/50">{col.title}</h2>
              <ul className="mt-5 space-y-3 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-white/80 transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 space-y-2 border-t hairline pt-8 text-xs leading-relaxed text-white/45">
          {legal.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </footer>
  );
}
