"use client";

import { useEffect, useMemo, useState } from "react";
import { getMadridDateKey, formatMadridLongDate } from "@/src/lib/date";
import { resolveDailyChallenge, buildProgressKey } from "@/src/lib/daily";

function pickLocalizedValue(item, baseKey, lang) {
  if (!item) return "";
  if (lang === "en") return item[`${baseKey}En`] ?? item[`${baseKey}Es`] ?? item[baseKey] ?? "";
  return item[`${baseKey}Es`] ?? item[`${baseKey}En`] ?? item[baseKey] ?? "";
}

export default function TriviaDailyMode({ challenges, lang, t }) {
  const todayKey = getMadridDateKey();
  const challenge = useMemo(() => resolveDailyChallenge(challenges, todayKey), [challenges, todayKey]);
  const progressKey = useMemo(
    () => buildProgressKey("friends", "trivia", challenge ? challenge.date : todayKey),
    [challenge, todayKey]
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
  const question = pickLocalizedValue(challenge, "question", lang);
  const options = pickLocalizedValue(challenge, "options", lang);
  const answer = pickLocalizedValue(challenge, "answer", lang);
  const explanation = pickLocalizedValue(challenge, "explanation", lang);

  function handleSelect(option) {
    if (done) return;
    const next = { selected: option, correct: option === answer };
    setResult(next);
    window.localStorage.setItem(progressKey, JSON.stringify(next));
  }

  function getClassName(option) {
    if (!done) return "friends-answer-btn";
    if (option === answer) return "friends-answer-btn is-correct";
    if (result?.selected === option) return "friends-answer-btn is-wrong";
    return "friends-answer-btn is-muted";
  }

  return (
    <section className="friends-play-card friends-mode-trivia">
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
          <div className="friends-prompt-icon" aria-hidden="true">🧠</div>
          <div>
            <span className="friends-mini-label">Trivia</span>
            <h2>{question}</h2>
          </div>
        </div>
      </div>

      <div className="friends-answer-grid">
        {options.map((option) => (
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
              <strong>{answer}</strong>
            </div>
          </div>
          <p className="friends-result-text">{explanation}</p>
          <p className="friends-result-text">{t.challenge.tomorrow}</p>
        </div>
      ) : null}
    </section>
  );
}
