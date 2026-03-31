"use client";

import Link from "next/link";
import { siteConfig } from "@/src/config/site";

const metaBySlug = {
  friends: { title: "Friends", icon: "📺", intro: "Modos diarios" },
  "the-office": { title: "The Office", icon: "🖨️", intro: "Modos diarios" },
  scrubs: { title: "Scrubs", icon: "🩺", intro: "Modos diarios" },
  anhqv: { title: "Aquí no hay quien viva", icon: "🏢", intro: "Modos diarios" },
};

const cards = [
  { key: "character", title: "Modo personaje", description: "Más pistas, menos obviedad y mejor comparación.", chip: "Personaje", icon: "🎭", tone: "tone-character" },
  { key: "quote", title: "Modo frases", description: "Frases más finas y respuestas más creíbles.", chip: "Frases", icon: "💬", tone: "tone-quote" },
  { key: "emoji", title: "Modo emojis", description: "Pistas visuales pensadas para quien conoce los detalles.", chip: "Emojis", icon: "😄", tone: "tone-emoji" },
  { key: "trivia", title: "Modo trivia", description: "Pregunta diaria con varias opciones y feedback claro.", chip: "Trivia", icon: "🧠", tone: "tone-trivia" },
  { key: "pixel", title: "Modo reveal", description: "Imagen pixelada que se revela por completo al acertar.", chip: "Imagen", icon: "🔎", tone: "tone-pixel" },
];

export default function SeriesHubPage({ slug }) {
  const meta = metaBySlug[slug] || metaBySlug.friends;

  return (
    <main className="page-shell challenge-shell friends-hub-final">
      <div className="backdrop-orb orb-a" />
      <div className="backdrop-orb orb-b" />
      <header className="page-header compact compact-header-v7">
        <Link href="/" className="back-link">← Volver</Link>
      </header>
      <section className="series-hub-head glass-panel fade-in-up">
        <div className="series-hub-head__icon" aria-hidden="true">{meta.icon}</div>
        <div className="series-hub-head__copy">
          <h1>{meta.title}</h1>
          <p>{meta.intro}</p>
        </div>
      </section>
      <section className="series-hub-list">
        {cards.map((card) => (
          <Link key={card.key} href={`/${slug}/${card.key}`} className={`hub-mode-card ${card.tone}`}>
            <div className="hub-mode-card__icon" aria-hidden="true">{card.icon}</div>
            <div className="hub-mode-card__copy">
              <span className="mode-chip">{card.chip}</span>
              <h2>{card.title}</h2>
              <p>{card.description}</p>
            </div>
            <div className="hub-mode-card__arrow" aria-hidden="true">▶</div>
          </Link>
        ))}
      </section>
      <section className="site-note-card compact-note support-card-final support-card-final--series">
        <a className="site-note-card__button site-note-card__button--support" href={siteConfig.supportUrl} target="_blank" rel="noreferrer">Apoyar proyecto</a>
      </section>
    </main>
  );
}
