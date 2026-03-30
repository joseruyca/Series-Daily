"use client";

import Link from "next/link";
import { useLanguage } from "@/src/hooks/useLanguage";
import LanguageSwitch from "@/src/components/home/LanguageSwitch";
import CharacterDailyMode from "@/src/components/friends/CharacterDailyMode";

export default function FriendsCharacterPage({ challenges, profiles }) {
  const { lang, setLang, t } = useLanguage();

  return (
    <main className="page-shell challenge-shell">
      <div className="backdrop-orb orb-a" />
      <div className="backdrop-orb orb-b" />

      <header className="page-header compact">
        <Link href="/friends" className="back-link">
          ← {t.common.backFriends}
        </Link>

        <LanguageSwitch lang={lang} setLang={setLang} />
      </header>

      <section className="challenge-hero">
        <span className="eyebrow">{t.classic.eyebrow}</span>
        <h1>{t.classic.title}</h1>
        <p>{t.classic.subtitle}</p>
      </section>

      <CharacterDailyMode
        challenges={challenges}
        profiles={profiles}
        lang={lang}
        t={t}
      />
    </main>
  );
}