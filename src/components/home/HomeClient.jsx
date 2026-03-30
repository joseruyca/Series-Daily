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
      ctaLabel: card.available ? t.cta.play : t.cta.soon,
    }));
  }, [t]);

  return (
    <main className="page-shell home-shell-pro">
      <div className="backdrop-orb orb-a" />
      <div className="backdrop-orb orb-b" />

      <header className="page-header home-header-pro">
        <div className="brand">
          <span className="brand-mark" />
          <div>
            <p className="brand-name">{t.brand}</p>
            <span className="brand-sub">{t.brandSub}</span>
          </div>
        </div>

        <LanguageSwitch lang={lang} setLang={setLang} />
      </header>

      <section className="hero hero-pro">
        <div className="hero-pro__content">
          <span className="eyebrow">{t.home.eyebrow}</span>
          <h1>{t.home.title}</h1>
          <p>{t.home.subtitle}</p>

          <div className="hero-pro__stats">
            <div className="hero-stat">
              <span>{t.home.infoPrimaryLabel}</span>
              <strong>{t.home.infoPrimaryValue}</strong>
            </div>
            <div className="hero-stat">
              <span>{t.home.infoSecondaryLabel}</span>
              <strong>{t.home.infoSecondaryValue}</strong>
            </div>
          </div>
        </div>

        <div className="hero-spotlight">
          <div className="hero-spotlight__card">
            <span className="hero-spotlight__label">Today</span>
            <h2>Friends</h2>
            <p>Character · Quote · Emoji · Reveal · Trivia</p>
          </div>
        </div>
      </section>

      <section className="section-card section-card-pro">
        <div className="section-head section-head-pro">
          <div>
            <h2>{t.home.chooseSeries}</h2>
            <p>{t.home.chooseSeriesCopy}</p>
          </div>
        </div>

        <div className="series-rail series-rail-pro">
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
