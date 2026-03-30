"use client";

import Link from "next/link";
import { useLanguage } from "@/src/hooks/useLanguage";
import LanguageSwitch from "@/src/components/home/LanguageSwitch";

export default function ChallengeStubClient({ mode }) {
  const { lang, setLang, t } = useLanguage();
  const pageCopy = t.challenge.modes[mode];

  return (
    <main className="page-shell challenge-page">
      <div className="backdrop-orb orb-a" />
      <div className="backdrop-orb orb-b" />

      <header className="page-header compact">
        <Link href="/friends" className="back-link">
          ← {t.common.backFriends}
        </Link>

        <LanguageSwitch lang={lang} setLang={setLang} />
      </header>

      <section className="challenge-card-shell">
        <div className="challenge-card-shell__inner">
          <span className="eyebrow">{pageCopy.eyebrow}</span>
          <h1>{pageCopy.title}</h1>
          <p>{pageCopy.subtitle}</p>

          <div className="challenge-chip-row">
            <div className="challenge-chip">Daily-ready layout</div>
            <div className="challenge-chip">Minimal mobile UI</div>
          </div>

          <div className="challenge-note">
            <strong>{t.challenge.noteTitle}</strong>
            <p>{t.challenge.noteText}</p>
          </div>
        </div>
      </section>
    </main>
  );
}