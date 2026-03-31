"use client";

import Link from "next/link";
import ChoiceDailyMode from "@/src/components/friends/ChoiceDailyMode";
import { copy } from "@/src/lib/copy";

const meta = {
  quote: { eyebrow: "Modo frases", title: "Modo frases", subtitle: "Lee la frase y elige quién la dijo." },
  emoji: { eyebrow: "Modo emojis", title: "Modo emojis", subtitle: "Descifra el personaje a partir de emojis." },
  trivia: { eyebrow: "Modo trivia", title: "Modo trivia", subtitle: "Pregunta diaria con cuatro opciones." },
};

export default function SeriesChoicePage({ slug, seriesKey, seriesTitle, mode, challenges }) {
  const t = copy.es;
  const pageCopy = meta[mode] || meta.quote;

  return (
    <main className="page-shell challenge-shell">
      <div className="backdrop-orb orb-a" />
      <div className="backdrop-orb orb-b" />

      <header className="page-header compact compact-header-v7">
        <Link href={`/${slug}`} className="back-link">← Volver a {seriesTitle}</Link>
      </header>

      <section className="challenge-hero challenge-hero-premium fade-in-up">
        <span className="eyebrow">{seriesTitle} · {pageCopy.eyebrow}</span>
        <h1>{pageCopy.title}</h1>
        <p>{pageCopy.subtitle}</p>
      </section>

      <ChoiceDailyMode series={seriesKey} mode={mode} challenges={challenges} lang="es" t={t} />
    </main>
  );
}
