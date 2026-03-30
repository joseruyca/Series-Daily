"use client";

import Link from "next/link";
import { useLanguage } from "@/src/hooks/useLanguage";
import LanguageSwitch from "@/src/components/home/LanguageSwitch";
import PixelDailyMode from "@/src/components/friends/PixelDailyMode";

export default function FriendsPixelPage({ challenges }) {
  const { lang, setLang, t } = useLanguage();
  const pageCopy = t.challenge.modes.pixel;

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
        <span className="eyebrow">{pageCopy.eyebrow}</span>
        <h1>{pageCopy.title}</h1>
        <p>{pageCopy.subtitle}</p>
      </section>

      <PixelDailyMode
        challenges={challenges}
        lang={lang}
        t={t}
      />
    </main>
  );
}