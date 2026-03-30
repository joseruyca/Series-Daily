"use client";

import { useMemo } from "react";
import { seriesCards } from "@/src/data/series";
import { useLanguage } from "@/src/hooks/useLanguage";
import LanguageSwitch from "@/src/components/home/LanguageSwitch";
import SeriesCard from "@/src/components/home/SeriesCard";

export default function HomeClient() {
  const { lang, setLang, t } = useLanguage();

  const cards = useMemo(() => {
    return seriesCards.map((card) => ({
      ...card,
      kicker: t.series[card.id].kicker,
      description: t.series[card.id].description,
      statusLabel: card.available ? t.status.available : t.status.comingSoon,
      ctaLabel: card.available ? t.cta.playToday ?? t.cta.play : t.cta.soon,
    }));
  }, [t]);

  return (
    <main className="page-shell home-shell-v3">
      <div className="backdrop-orb orb-a" />
      <div className="backdrop-orb orb-b" />

      <header className="page-header home-header-v3">
        <div className="brand">
          <span className="brand-mark" />
          <div>
            <p className="brand-name">{t.brand}</p>
            <span className="brand-sub">{t.brandSub}</span>
          </div>
        </div>

        <LanguageSwitch lang={lang} setLang={setLang} />
      </header>

      <section className="home-hero-v3">
        <div className="home-hero-v3__badge">{t.home.eyebrow}</div>
        <h1>{t.home.title}</h1>
        <p>{t.home.subtitle}</p>

        <div className="home-hero-v3__row">
          <div className="home-glass-pill">
            <span>{lang === "en" ? "Today" : "Hoy"}</span>
            <strong>Friends · 5 {lang === "en" ? "modes" : "modos"}</strong>
          </div>
          <div className="home-glass-pill is-accent">
            <span>{lang === "en" ? "Active" : "Activo"}</span>
            <strong>Friends</strong>
          </div>
        </div>
      </section>

      <section className="home-feature-strip">
        <div className="home-feature-strip__card">
          <span className="home-feature-strip__label">Friends</span>
          <strong>{lang === "en" ? "Today’s set" : "Set de hoy"}</strong>
          <p>Character · Quote · Emoji · Trivia · Reveal</p>
        </div>
      </section>

      <section className="section-card section-card-home-v3">
        <div className="section-head section-head-home-v3">
          <div>
            <h2>{t.home.chooseSeries}</h2>
            <p>{t.home.chooseSeriesCopy}</p>
          </div>
        </div>

        <div className="series-rail series-rail-home-v3">
          {cards.map((card) => (
            <SeriesCard
              key={card.id}
              title={card.title}
              description={card.description}
              kicker={card.kicker}
              statusLabel={card.statusLabel}
              ctaLabel={card.ctaLabel}
              image={card.image}
              href={card.href}
              available={card.available}
              theme={card.theme}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
