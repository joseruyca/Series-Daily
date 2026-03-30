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
    <main className="page-shell">
      <div className="backdrop-orb orb-a" />
      <div className="backdrop-orb orb-b" />

      <header className="page-header">
        <div className="brand">
          <span className="brand-mark" />
          <div>
            <p className="brand-name">{t.brand}</p>
            <span className="brand-sub">{t.brandSub}</span>
          </div>
        </div>

        <LanguageSwitch lang={lang} setLang={setLang} />
      </header>

      <section className="hero">
        <span className="eyebrow">{t.home.eyebrow}</span>
        <h1>{t.home.title}</h1>
        <p>{t.home.subtitle}</p>

        <div className="hero-inline">
          <div className="info-pill">
            <span className="info-pill__label">{t.home.infoPrimaryLabel}</span>
            <strong className="info-pill__value">{t.home.infoPrimaryValue}</strong>
          </div>

          <div className="info-pill">
            <span className="info-pill__label">{t.home.infoSecondaryLabel}</span>
            <strong className="info-pill__value">{t.home.infoSecondaryValue}</strong>
          </div>
        </div>
      </section>

      <section className="section-card">
        <div className="section-head">
          <div>
            <h2>{t.home.chooseSeries}</h2>
            <p>{t.home.chooseSeriesCopy}</p>
          </div>
        </div>

        <div className="series-rail">
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