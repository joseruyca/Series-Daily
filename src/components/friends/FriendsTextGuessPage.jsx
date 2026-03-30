"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/src/hooks/useLanguage";
import LanguageSwitch from "@/src/components/home/LanguageSwitch";
import FriendsModeTabs from "@/src/components/friends/FriendsModeTabs";
import GuessComposer from "@/src/components/friends/GuessComposer";
import { friendsCharacterNames, getFriendCharacterByName } from "@/src/data/friends-characters";
import { getMadridDateKey, formatMadridLongDate } from "@/src/lib/date";
import { resolveDailyChallenge, buildProgressKey } from "@/src/lib/daily";

export default function FriendsTextGuessPage({ mode, challenges }) {
  const { lang, setLang, t } = useLanguage();
  const todayKey = getMadridDateKey();

  const challenge = useMemo(
    () => resolveDailyChallenge(challenges, todayKey),
    [challenges, todayKey]
  );

  const progressKey = useMemo(
    () =>
      challenge
        ? buildProgressKey("friends", mode, challenge.date)
        : buildProgressKey("friends", mode, todayKey),
    [challenge, mode, todayKey]
  );

  const [inputValue, setInputValue] = useState("");
  const [guesses, setGuesses] = useState([]);

  useEffect(() => {
    if (!challenge) return;

    const saved = window.localStorage.getItem(progressKey);
    if (!saved) {
      setGuesses([]);
      return;
    }

    try {
      const parsed = JSON.parse(saved);
      setGuesses(Array.isArray(parsed.guesses) ? parsed.guesses : []);
    } catch {
      setGuesses([]);
    }
  }, [challenge, progressKey]);

  if (!challenge) return null;

  const modeCopy = mode === "quote" ? t.quote : t.emoji;
  const solved = guesses.includes(challenge.answer);

  function saveGuesses(nextGuesses) {
    setGuesses(nextGuesses);
    window.localStorage.setItem(progressKey, JSON.stringify({ guesses: nextGuesses }));
  }

  function handleSubmit(rawValue) {
    if (solved) return;
    const match = getFriendCharacterByName(rawValue);
    if (!match) return;
    if (guesses.includes(match.name)) return;

    const nextGuesses = [...guesses, match.name];
    saveGuesses(nextGuesses);
  }

  return (
    <main className="page-shell">
      <div className="backdrop-orb orb-a" />
      <div className="backdrop-orb orb-b" />

      <header className="page-header compact">
        <Link href="/friends" className="back-link">
          ← {t.common.backFriends}
        </Link>

        <LanguageSwitch lang={lang} setLang={setLang} />
      </header>

      <section className="game-hero">
        <span className="eyebrow">{modeCopy.eyebrow}</span>
        <h1>{modeCopy.title}</h1>
        <p>{modeCopy.subtitle}</p>
      </section>

      <FriendsModeTabs />

      <section className="game-card">
        <div className="game-topbar">
          <div>
            <span className="mini-label">{t.classic.dateLabel}</span>
            <strong className="mini-value">
              {formatMadridLongDate(challenge.date, lang)}
            </strong>
          </div>

          <span className={`status-chip ${solved ? "is-solved" : "is-live"}`}>
            {solved ? t.status.solved : t.status.available}
          </span>
        </div>

        <div className="prompt-card">
          <span className="mini-label">{modeCopy.promptLabel}</span>
          {mode === "quote" ? (
            <blockquote className="prompt-quote">“{challenge.quote}”</blockquote>
          ) : (
            <div className="prompt-emojis">{challenge.emojis}</div>
          )}
        </div>

        <GuessComposer
          names={friendsCharacterNames}
          value={inputValue}
          setValue={setInputValue}
          onSubmit={handleSubmit}
          placeholder={modeCopy.inputPlaceholder}
          buttonLabel={t.cta.submit}
          disabled={solved}
        />

        {guesses.length > 0 ? (
          <div className="attempt-block">
            <span className="mini-label">{modeCopy.triedLabel}</span>
            <div className="attempt-chip-row">
              {guesses.map((guess) => (
                <span
                  key={guess}
                  className={`attempt-chip ${guess === challenge.answer ? "is-correct" : ""}`}
                >
                  {guess}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {!solved && guesses.length >= 2 ? (
          <div className="hint-card">
            <span className="mini-label">{modeCopy.hintLabel}</span>
            <p>{challenge.hint}</p>
          </div>
        ) : null}

        {solved ? (
          <div className="success-panel">
            <h3>{modeCopy.solvedTitle}</h3>
            <p>{challenge.answer}</p>
            <span>{modeCopy.solvedText}</span>
          </div>
        ) : null}
      </section>
    </main>
  );
}