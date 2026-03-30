"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useLanguage } from "@/src/hooks/useLanguage";
import LanguageSwitch from "@/src/components/home/LanguageSwitch";
import DailyChoiceGame from "@/src/components/friends/DailyChoiceGame";

export default function FriendsClassicPage({ mode = "character", challenges = [] }) {
  const { lang, setLang, t } = useLanguage();

  const pageCopy = useMemo(() => {
    const fallback = {
      eyebrow: "Friends · Character",
      title: "Modo personaje",
      subtitle: "Adivina el personaje del día.",
    };

    return t?.challenge?.modes?.[mode] || fallback;
  }, [t, mode]);

  return (
    <main className="page-shell challenge-shell">
      <div className="backdrop-orb orb-a" />
      <div className="backdrop-orb orb-b" />

      <header className="page-header compact">
        <Link href="/friends" className="back-link">
          ← {t?.common?.backFriends || "Volver a Friends"}
        </Link>

        <LanguageSwitch lang={lang} setLang={setLang} />
      </header>

      <section className="challenge-hero">
        <span className="eyebrow">{pageCopy.eyebrow}</span>
        <h1>{pageCopy.title}</h1>
        <p>{pageCopy.subtitle}</p>
      </section>

      <DailyChoiceGame
        series="friends"
        mode={mode}
        challenges={challenges}
        lang={lang}
        t={t}
      />
    </main>
  );
}