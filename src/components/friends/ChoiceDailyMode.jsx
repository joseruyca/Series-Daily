"use client";

import { useEffect, useMemo, useState } from "react";
import { getMadridDateKey, formatMadridLongDate } from "@/src/lib/date";
import { resolveDailyChallenge, buildProgressKey } from "@/src/lib/daily";

function pickLocalizedValue(item, baseKey, lang) {
  if (!item) return "";
  if (lang === "en") return item[`${baseKey}En`] ?? item[baseKey] ?? "";
  return item[`${baseKey}Es`] ?? item[baseKey] ?? item[`${baseKey}En`] ?? "";
}

const MODE_META = {
  quote: { icon: "💬", label: "Quote", frameClass: "friends-mode-quote" },
  emoji: { icon: "😄", label: "Emoji", frameClass: "friends-mode-emoji" },
};

export default function ChoiceDailyMode({ mode, challenges, lang, t }) {
  const todayKey = getMadridDateKey();
  const challenge = useMemo(() => resolveDailyChallenge(challenges, todayKey), [challenges, todayKey]);
  const progressKey = useMemo(
    () => buildProgressKey("friends", mode, challenge ? challenge.date : todayKey),
    [challenge, mode, todayKey]
  );

  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!challenge) return;
    const saved = window.localStorage.getItem(progressKey);
    if (!saved) {
      setResult(null);
      return;
    }
    try {
      setResult(JSON.parse(saved));
    } catch {
      setResult(null);
    }
  }, [challenge, progressKey]);

  if (!challenge) return null;

  const done = Boolean(result);
  const dateLabel = formatMadridLongDate(challenge.date, lang);
  const promptText = pickLocalizedValue(challenge, "prompt", lang);
  const explanationText = pickLocalizedValue(challenge, "explanation", lang);
  const quoteText = pickLocalizedValue(challenge, "quote", lang);
  const meta = MODE_META[mode];

  function handleSelect(option) {
    if (done) return;
    const next = { selected: option, correct: option === challenge.answer };
    setResult(next);
    window.localStorage.setItem(progressKey, JSON.stringify(next));
  }

  function getClassName(option) {
    if (!done) return "friends-answer-btn";
    if (option === challenge.answer) return "friends-answer-btn is-correct";
    if (result?.selected === option) return "friends-answer-btn is-wrong";
    return "friends-answer-btn is-muted";
  }

  return (
    <section className={`friends-play-card ${meta?.frameClass ?? ""}`}>
      <div className="friends-play-top">
        <div className="friends-play-pill">
          <span>{t.challenge.dateLabel}</span>
          <strong>{dateLabel}</strong>
        </div>

        <div className={`friends-status-pill ${done ? "is-complete" : "is-live"}`}>
          {done ? t.challenge.completed : t.status.available}
        </div>
      </div>

      <div className="friends-prompt-box">
        <div className="friends-prompt-head">
          <div className="friends-prompt-icon" aria-hidden="true">{meta?.icon}</div>
          <div>
            <span className="friends-mini-label">{meta?.label}</span>
            <h2>{promptText}</h2>
          </div>
        </div>

        {mode === "quote" ? (
          <div className="friends-quote-bubble">
            <p>“{quoteText}”</p>
          </div>
        ) : null}

        {mode === "emoji" ? (
          <div className="friends-emoji-panel">
            <div className="friends-emoji-line">{challenge.emojis}</div>
          </div>
        ) : null}
      </div>

      <div className="friends-answer-grid">
        {challenge.options.map((option) => (
          <button key={option} type="button" className={getClassName(option)} onClick={() => handleSelect(option)} disabled={done}>
            {option}
          </button>
        ))}
      </div>

      {done ? (
        <div className="friends-result-card">
          <div className={`friends-result-badge ${result.correct ? "is-correct" : "is-wrong"}`}>
            {result.correct ? t.challenge.correct : t.challenge.incorrect}
          </div>
          <div className="friends-result-rows">
            <div className="friends-result-row">
              <span>{t.challenge.yourAnswer}</span>
              <strong>{result.selected}</strong>
            </div>
            <div className="friends-result-row">
              <span>{t.challenge.correctAnswer}</span>
              <strong>{challenge.answer}</strong>
            </div>
          </div>
          <p className="friends-result-text">{explanationText}</p>
          <p className="friends-result-text">{t.challenge.tomorrow}</p>
        </div>
      ) : null}
    </section>
  );
}
