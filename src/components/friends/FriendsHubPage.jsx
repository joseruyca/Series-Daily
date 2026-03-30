"use client";

import Link from "next/link";
import { useLanguage } from "@/src/hooks/useLanguage";
import LanguageSwitch from "@/src/components/home/LanguageSwitch";

export default function FriendsHubPage() {
  const { lang, setLang, t } = useLanguage();

  const cards = [
    { href: "/friends/character", title: t.friends.cards.characterTitle, description: t.friends.cards.characterDesc, chip: "Character", icon: "🧩", number: "01", tone: "tone-character" },
    { href: "/friends/quote", title: t.friends.cards.quoteTitle, description: t.friends.cards.quoteDesc, chip: "Quote", icon: "💬", number: "02", tone: "tone-quote" },
    { href: "/friends/emoji", title: t.friends.cards.emojiTitle, description: t.friends.cards.emojiDesc, chip: "Emoji", icon: "😄", number: "03", tone: "tone-emoji" },
    { href: "/friends/trivia", title: t.friends.cards.triviaTitle, description: t.friends.cards.triviaDesc, chip: "Trivia", icon: "🧠", number: "04", tone: "tone-trivia" },
    { href: "/friends/pixel", title: t.friends.cards.pixelTitle, description: t.friends.cards.pixelDesc, chip: "Reveal", icon: "🖼️", number: "05", tone: "tone-pixel" },
  ];

  return (
    <main className="page-shell challenge-shell friends-hub-shell-v3">
      <div className="backdrop-orb orb-a" />
      <div className="backdrop-orb orb-b" />

      <header className="page-header compact">
        <Link href="/" className="back-link">← {t.common.backHome}</Link>
        <LanguageSwitch lang={lang} setLang={setLang} />
      </header>

      <section className="friends-stage friends-stage-v3">
        <div className="friends-stage-v3__badge">{t.friends.eyebrow}</div>
        <h1>{t.friends.title}</h1>
        <p>{t.friends.subtitle}</p>

        <div className="friends-summary friends-summary-v3">
          <div className="friends-summary__item compact-glass">
            <span>{lang === "en" ? "Today" : "Hoy"}</span>
            <strong>{t.friends.statusValue}</strong>
          </div>
        </div>
      </section>

      <section className="friends-grid friends-grid-v3">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className={`mode-tile mode-tile-v3 ${card.tone}`}>
            <div className="mode-tile__top">
              <span className="mode-chip">{card.chip}</span>
              <span className="mode-number">{card.number}</span>
            </div>
            <div className="mode-tile__body">
              <div className="mode-tile__icon" aria-hidden="true">{card.icon}</div>
              <h2>{card.title}</h2>
              <p>{card.description}</p>
            </div>
            <div className="mode-tile__footer">
              <span className="mode-inline-cta">{t.cta.open}<span aria-hidden="true">↗</span></span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
