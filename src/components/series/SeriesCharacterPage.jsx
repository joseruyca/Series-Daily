"use client";

import Link from "next/link";
import CharacterDailyMode from "@/src/components/friends/CharacterDailyMode";
import { copy } from "@/src/lib/copy";

export default function SeriesCharacterPage({ slug, seriesKey, seriesTitle, challenges, profiles }) {
  const t = copy.es;
  return (
    <main className="page-shell challenge-shell">
      <div className="backdrop-orb orb-a" />
      <div className="backdrop-orb orb-b" />
      <header className="page-header compact compact-header-v7">
        <Link href={`/${slug}`} className="back-link">← Volver a {seriesTitle}</Link>
      </header>
      <section className="challenge-hero challenge-hero-premium fade-in-up">
        <span className="eyebrow">{seriesTitle} · {t.classic.eyebrow}</span>
        <h1>{t.classic.title}</h1>
        <p>{t.classic.subtitle}</p>
      </section>
      <CharacterDailyMode series={seriesKey} challenges={challenges} profiles={profiles} lang="es" t={t} />
    </main>
  );
}
