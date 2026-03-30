"use client";

import Link from "next/link";
import { useLanguage } from "@/src/hooks/useLanguage";
import LanguageSwitch from "@/src/components/home/LanguageSwitch";

export default function FriendsLandingClient() {
  const { lang, setLang, t } = useLanguage();

  const cards = [
    {
      href: "/friends/character",
      title: t.friends.cards.characterTitle,
      description: t.friends.cards.characterDesc,
      badge: "Classic"
    },
    {
      href: "/friends/quote",
      title: t.friends.cards.quoteTitle,
      description: t.friends.cards.quoteDesc,
      badge: "Quotes"
    },
    {
      href: "/friends/emoji",
      title: t.friends.cards.emojiTitle,
      description: t.friends.cards.emojiDesc,
      badge: "Emoji"
    },
    {
      href: "/friends/pixel",
      title: t.friends.cards.pixelTitle,
      description: t.friends.cards.pixelDesc,
      badge: "Reveal"
    }
  ];

  return (
    <main className="page-shell">
      <div className="backdrop-orb orb-a" />
      <div className="backdrop-orb orb-b" />

      <header className="page-header compact">
        <Link href="/" className="back-link">
          ← {t.common.backHome}
        </Link>

        <LanguageSwitch lang={lang} setLang={setLang} />
      </header>

      <section className="friends-spotlight">
        <div className="friends-spotlight__inner">
          <span className="eyebrow">{t.friends.eyebrow}</span>
          <h1>{t.friends.title}</h1>
          <p>{t.friends.subtitle}</p>

          <div className="spotlight-meta">
            <div className="spotlight-pill">
              <span>{t.friends.statusLabel}</span>
              <strong>{t.friends.statusValue}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="mode-grid">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="mode-card">
            <div className="mode-card__top">
              <span className="mode-card__badge">{card.badge}</span>
              <span className="mode-card__arrow">↗</span>
            </div>
            <h2>{card.title}</h2>
            <p>{card.description}</p>
            <span className="mode-card__cta">{t.friends.cards.action}</span>
          </Link>
        ))}
      </section>
    </main>
  );
}