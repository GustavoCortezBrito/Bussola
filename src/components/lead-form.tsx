"use client";

import { useId, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { brand, whatsappLink } from "@/content/brand";
import { ArrowRight, Check, WhatsApp } from "./icons";
import { SunMark } from "./logo";

type Status = "idle" | "sending" | "ok" | "error";

function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const EASE = [0.22, 1, 0.36, 1] as const;
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const FAIXAS = [
  ["", "Prefiro conversar antes"],
  ["ate-500", "Até R$ 500 mil"],
  ["500-800", "R$ 500 mil a R$ 800 mil"],
  ["800-1200", "R$ 800 mil a R$ 1,2 milhão"],
  ["1200+", "Acima de R$ 1,2 milhão"],
] as const;

export function LeadForm({
  source,
  project,
  submitLabel = "Quero receber informações",
}: {
  /** de qual site o lead veio */
  source: "imobiliaria" | "empreendimento";
  project: string;
  submitLabel?: string;
}) {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.get("nome"),
          telefone: form.get("telefone"),
          email: form.get("email"),
          interesse: form.get("interesse"),
          faixa: form.get("faixa"),
          mensagem: form.get("mensagem"),
          corretor: form.get("corretor") === "on",
          consentimento: form.get("consentimento") === "on",
          empresa: form.get("empresa"), // honeypot
          source,
          project,
        }),
      });
      setStatus(res.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  const waText = `Olá! Tenho interesse no ${project} e gostaria de mais informações.`;
  const label = "eyebrow !text-[0.68rem] opacity-70";

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "ok" ? (
        <m.div
          key="ok"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex min-h-[26rem] flex-col justify-center py-6"
          role="status"
        >
          <m.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
            className="mb-6 inline-flex size-14 items-center justify-center rounded-full bg-brass text-white"
          >
            <Check className="size-6" />
          </m.span>
          <h3 className="h-display text-4xl md:text-5xl">
            Recebemos seu contato{name ? `, ${name.split(" ")[0]}` : ""}.
          </h3>
          <p className="mt-4 max-w-md text-lg opacity-75">
            Um consultor vai falar com você em breve. Se preferir, adiante a conversa agora pelo WhatsApp.
          </p>
          <a
            href={whatsappLink(waText)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-brass mt-8 self-start"
          >
            <WhatsApp /> Continuar no WhatsApp
          </a>
        </m.div>
      ) : (
        <m.form
          key="form"
          onSubmit={onSubmit}
          className="grid gap-x-10 gap-y-8 sm:grid-cols-2"
          variants={{ show: { transition: { staggerChildren: 0.07 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        >
          <m.div variants={item} className="flex items-center gap-4 sm:col-span-2">
            <span className="flex size-12 items-center justify-center rounded-full border border-current/25 text-brass">
              <SunMark className="size-7" slats="currentColor" />
            </span>
            <div>
              <p className="h-display text-2xl md:text-3xl">Fale com um consultor</p>
              <p className="mt-1 text-sm opacity-65">Leva menos de um minuto. Sem compromisso.</p>
            </div>
          </m.div>

          <m.div variants={item}>
            <label htmlFor={`${uid}-nome`} className={label}>
              Nome
            </label>
            <input
              id={`${uid}-nome`}
              name="nome"
              required
              minLength={2}
              maxLength={120}
              autoComplete="name"
              placeholder="Seu nome completo"
              className="field !py-4 !text-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </m.div>
          <m.div variants={item}>
            <label htmlFor={`${uid}-tel`} className={label}>
              WhatsApp
            </label>
            <input
              id={`${uid}-tel`}
              name="telefone"
              required
              inputMode="tel"
              autoComplete="tel"
              placeholder="(48) 90000-0000"
              pattern="\(\d{2}\) \d{4,5}-\d{4}"
              title="Informe DDD e número, ex.: (48) 90000-0000"
              className="field !py-4 !text-lg"
              value={phone}
              onChange={(e) => setPhone(maskPhone(e.target.value))}
            />
          </m.div>
          <m.div variants={item} className="sm:col-span-2">
            <label htmlFor={`${uid}-email`} className={label}>
              E-mail
            </label>
            <input
              id={`${uid}-email`}
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="voce@email.com"
              className="field !py-4 !text-lg"
            />
          </m.div>
          <m.div variants={item}>
            <label htmlFor={`${uid}-int`} className={label}>
              Meu objetivo
            </label>
            <select id={`${uid}-int`} name="interesse" className="field !py-4 !text-lg" defaultValue="investir">
              <option value="investir" className="text-ink">Investir</option>
              <option value="morar" className="text-ink">Morar</option>
              <option value="indefinido" className="text-ink">Ainda estou decidindo</option>
            </select>
          </m.div>
          <m.div variants={item}>
            <label htmlFor={`${uid}-faixa`} className={label}>
              Quanto pretende investir
            </label>
            <select id={`${uid}-faixa`} name="faixa" className="field !py-4 !text-lg" defaultValue="">
              {FAIXAS.map(([v, t]) => (
                <option key={v} value={v} className="text-ink">{t}</option>
              ))}
            </select>
          </m.div>
          <m.div variants={item} className="sm:col-span-2">
            <div className="flex items-baseline justify-between">
              <label htmlFor={`${uid}-msg`} className={label}>
                Mensagem (opcional)
              </label>
              <span className="text-xs tabular-nums opacity-50">{msg.length}/500</span>
            </div>
            <textarea
              id={`${uid}-msg`}
              name="mensagem"
              rows={3}
              maxLength={500}
              placeholder="Conte o que procura: tipologia, prazo, dúvidas…"
              className="field !py-4 !text-lg resize-none"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
          </m.div>

          {/* honeypot anti-spam: invisível para pessoas */}
          <input
            type="text"
            name="empresa"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />

          <m.div variants={item} className="space-y-3 sm:col-span-2">
            <label className="flex cursor-pointer items-start gap-3 text-sm opacity-85">
              <input type="checkbox" name="corretor" className="mt-0.5 size-4 accent-[#b3865a]" />
              Sou corretor(a) de imóveis
            </label>
            <label className="flex cursor-pointer items-start gap-3 text-sm opacity-85">
              <input type="checkbox" name="consentimento" required className="mt-0.5 size-4 accent-[#b3865a]" />
              <span>
                Concordo em receber contato sobre este empreendimento e com o tratamento dos
                meus dados conforme a LGPD ({brand.imobiliaria.name}).
              </span>
            </label>
          </m.div>

          <m.div variants={item} className="flex flex-wrap items-center gap-5 sm:col-span-2">
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn btn-brass !px-9 !py-5 !text-base disabled:opacity-60"
            >
              {status === "sending" ? "Enviando…" : submitLabel}
              <ArrowRight />
            </button>
            <a
              href={whatsappLink(waText)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline"
            >
              <WhatsApp className="size-4" /> ou chame no WhatsApp
            </a>
          </m.div>

          {status === "error" && (
            <p className="text-sm text-red-400 sm:col-span-2" role="alert">
              Não conseguimos enviar agora. Tente novamente ou fale direto pelo WhatsApp.
            </p>
          )}
        </m.form>
      )}
    </AnimatePresence>
  );
}
