"use client";

import { useEffect, useMemo, useState } from "react";
import { getMadridDateKey, formatMadridLongDate } from "@/src/lib/date";
import { resolveDailyChallenge, buildProgressKey } from "@/src/lib/daily";

function pickLocalizedValue(item, baseKey, lang) {
  if (!item) return "";

  if (lang === "en") {
    return item[`${baseKey}En`] ?? item[baseKey] ?? "";
  }

  return item[`${baseKey}Es`] ?? item[baseKey] ?? item[`${baseKey}En`] ?? "";
}

export default function ChoiceDailyMode({ series = "friends", mode, challenges, lang, t }) {
  const todayKey = getMadridDateKey();

  const challenge = useMemo(
    () => resolveDailyChallenge(challenges, todayKey),
    [challenges, todayKey]
  );

  const progressKey = useMemo(
    () => buildProgressKey(series, mode, challenge ? challenge.date : todayKey),
    [challenge, mode, series, todayKey]
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

  const dateLabel = formatMadridLongDate(challenge.date, lang);
  const done = Boolean(result);

  const promptText = pickLocalizedValue(challenge, "prompt", lang);
  const explanationText = pickLocalizedValue(challenge, "explanation", lang);
  const quoteText = pickLocalizedValue(challenge, "quote", lang);

  function handleSelect(option) {
    if (done) return;

    const next = {
      selected: option,
      correct: option === challenge.answer,
    };

    setResult(next);
    window.localStorage.setItem(progressKey, JSON.stringify(next));
  }

  function getClassName(option) {
    if (!done) return "pick-button";
    if (option === challenge.answer) return "pick-button is-correct";
    if (result?.selected === option) return "pick-button is-wrong";
    return "pick-button is-muted";
  }

  return (
    <section className="game-wrap">
      <div className={`game-frame game-frame--compact game-frame--${mode}`}>
        <div className="game-toolbar game-toolbar--compact">
          <div className="date-badge">
            <span>{t.challenge.dateLabel}</span>
            <strong>{dateLabel}</strong>
          </div>

          <div className={`state-badge ${done ? "is-complete" : "is-live"}`}>
            {done ? t.challenge.completed : t.status.available}
          </div>
        </div>

        <div className={`prompt-card prompt-card--compact prompt-card--${mode}`}>
          <h2>{promptText}</h2>

          {mode === "quote" ? (
            <div className="quote-card quote-card--compact">
              <span className="subheadline">Quote</span>
              <p className="quote-value">“{quoteText}”</p>
            </div>
          ) : null}

          {mode === "emoji" ? (
            <div className="emoji-card emoji-card--compact">
              <span className="subheadline">Emoji</span>
              <div className="emoji-value">{challenge.emojis}</div>
            </div>
          ) : null}
        </div>

        <div className="pick-grid pick-grid--compact">
          {challenge.options.map((option) => (
            <button
              key={option}
              type="button"
              className={getClassName(option)}
              onClick={() => handleSelect(option)}
              disabled={done}
            >
              {option}
            </button>
          ))}
        </div>

        {done ? (
          <div className="feedback-panel">
            <div className={`feedback-state ${result.correct ? "is-correct" : "is-wrong"}`}>
              {result.correct ? t.challenge.correct : t.challenge.incorrect}
            </div>

            <div className="meta-table">
              <div className="meta-row">
                <span>{t.challenge.yourAnswer}</span>
                <strong>{result.selected}</strong>
              </div>
              <div className="meta-row">
                <span>{t.challenge.correctAnswer}</span>
                <strong>{challenge.answer}</strong>
              </div>
            </div>

            <p className="result-note">{explanationText}</p>
            <p className="result-note">{t.challenge.tomorrow}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}