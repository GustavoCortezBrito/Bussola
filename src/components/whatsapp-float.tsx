"use client";

import { m } from "framer-motion";
import { whatsappLink } from "@/content/brand";
import { WhatsApp } from "./icons";

/** Botão simples de WhatsApp: só o ícone, com um pulso leve. */
export function WhatsAppFloat({ message }: { message: string }) {
  return (
    <m.a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-[#1fa855] text-white shadow-lg md:bottom-7 md:right-7"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#1fa855] opacity-30 [animation-duration:2.4s]" />
      <WhatsApp className="relative size-7" />
    </m.a>
  );
}
