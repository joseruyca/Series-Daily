"use client";

import { useMemo } from "react";
import { seriesCards } from "@/src/data/series";
import { useLanguage } from "@/src/hooks/useLanguage";
import SeriesCard from "@/src/components/home/SeriesCard";
import { siteConfig } from "@/src/config/site";

export default function HomeClient() {
  const { t } = useLanguage();

  const cards = useMemo(() => {
    return seriesCards.map((card) => ({
      ...card,
      kicker: t.series[card.id].kicker,
      description: t.series[card.id].description,
      statusLabel: card.available ? t.status.available : t.status.comingSoon,
      ctaLabel: card.available ? t.cta.play : t.cta.soon,
    }));
  }, [t]);

  return (
    <main className="page-shell home-shell-final">
      <div className="backdrop-orb orb-a" />
      <div className="backdrop-orb orb-b" />

      <header className="page-header compact compact-header-v7">
        <div className="brand brand-final">
          <span className="brand-mark" />
          <div>
            <p className="brand-name">{t.brand}</p>
            <span className="brand-sub">{t.brandSub}</span>
          </div>
        </div>
      </header>

      <section className="home-hero-final glass-panel fade-in-up">
        <span className="hero-badge">{t.home.eyebrow}</span>
        <h1>{t.home.title}</h1>
        <p>{t.home.subtitle}</p>
      </section>

      <section className="home-series-final">
        <div className="section-head section-head-home-final">
          <div><h2>{t.home.chooseSeries}</h2></div>
        </div>
        <div className="series-rail series-rail-home-final">
          {cards.map((card) => <SeriesCard key={card.id} {...card} />)}
        </div>
      </section>

      <section className="site-note-card compact-note support-card-final">
        <a className="site-note-card__button site-note-card__button--support" href={siteConfig.supportUrl} target="_blank" rel="noreferrer" aria-label="Apoyar el proyecto">
          Apoyar proyecto
        </a>
      </section>

      <section className="site-note-card compact-note disclaimer-card-final">
        <p className="site-note-card__text">{siteConfig.disclaimer}</p>
      </section>
    </main>
  );
}
