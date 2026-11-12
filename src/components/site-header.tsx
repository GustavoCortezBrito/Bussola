"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { Close, Menu } from "./icons";

type NavLink = { label: string; href: string };

/**
 * Cabeçalho fixo: transparente sobre a capa e sólido (vidro fosco) depois do
 * scroll. No mobile abre um menu em tela cheia.
 */
export function SiteHeader({
  brand,
  brandHref = "/",
  links,
  cta,
}: {
  brand: React.ReactNode;
  brandHref?: string;
  links: NavLink[];
  cta: NavLink;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const light = !scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow] duration-500 ${
          open
            ? "text-white"
            : scrolled
              ? "bg-paper/85 text-ink shadow-[0_1px_0_rgb(14_27_25/0.08)] backdrop-blur-md"
              : "text-white"
        }`}
      >
        <div className="container-x flex h-[4.5rem] items-center justify-between gap-6">
          <Link href={brandHref} className="relative z-50" onClick={() => setOpen(false)}>
            {brand}
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative py-2 text-sm font-medium opacity-90 transition-opacity hover:opacity-100"
              >
                {l.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={cta.href}
              className={`btn hidden !px-5 !py-2.5 !text-[0.82rem] sm:inline-flex ${
                light ? "btn-ghost-light" : "btn-ink"
              }`}
            >
              {cta.label}
            </a>
            <button
              type="button"
              className="relative z-50 -mr-2 p-2 lg:hidden"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <Close /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            className="on-dark fixed inset-0 z-40 flex flex-col bg-ink px-6 pb-10 pt-28 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-1 flex-col justify-center gap-1" aria-label="Menu móvel">
              {links.map((l, i) => (
                <m.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="h-display border-b hairline py-4 text-4xl"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.5 }}
                >
                  {l.label}
                </m.a>
              ))}
            </nav>
            <a href={cta.href} onClick={() => setOpen(false)} className="btn btn-brass w-full">
              {cta.label}
            </a>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
