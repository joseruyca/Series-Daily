"use client";

import Link from "next/link";
import PixelDailyMode from "@/src/components/friends/PixelDailyMode";
import { copy } from "@/src/lib/copy";

export default function SeriesPixelPage({ slug, seriesKey, seriesTitle, challenges }) {
  const t = copy.es;
  return (
    <main className="page-shell challenge-shell">
      <div className="backdrop-orb orb-a" />
      <div className="backdrop-orb orb-b" />
      <header className="page-header compact compact-header-v7">
        <Link href={`/${slug}`} className="back-link">← Volver a {seriesTitle}</Link>
      </header>
      <section className="challenge-hero challenge-hero-premium fade-in-up">
        <span className="eyebrow">{seriesTitle} · Modo reveal</span>
        <h1>Modo reveal</h1>
        <p>Descubre la imagen del día. Al acertar, se revela por completo.</p>
      </section>
      <PixelDailyMode series={seriesKey} challenges={challenges} lang="es" t={t} />
    </main>
  );
}
