"use client";

import { useEffect, useMemo, useState } from "react";
import { getMadridDateKey, formatMadridLongDate } from "@/src/lib/date";
import { resolveDailyChallenge, buildProgressKey } from "@/src/lib/daily";

function pickLocalizedValue(item, baseKey, lang) {
  if (!item) return "";
  if (lang === "en") return item[`${baseKey}En`] ?? item[baseKey] ?? "";
  return item[`${baseKey}Es`] ?? item[baseKey] ?? item[`${baseKey}En`] ?? "";
}

function getLocalizedOptions(item, lang) {
  if (lang === "en") {
    if (item.optionsEn?.length) return item.optionsEn;
    if (item.optionsEs?.length) return item.optionsEs;
  }
  return item.optionsEs ?? item.options ?? [];
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

  const dateLabel = formatMadridLongDate(challenge.date, lang);
  const done = Boolean(result);
  const questionText = pickLocalizedValue(challenge, "question", lang);
  const explanationText = pickLocalizedValue(challenge, "explanation", lang);
  const answerText = pickLocalizedValue(challenge, "answer", lang);
  const options = getLocalizedOptions(challenge, lang);

  function handleSelect(option) {
    if (done) return;
    const next = { selected: option, correct: option === answerText };
    setResult(next);
    window.localStorage.setItem(progressKey, JSON.stringify(next));
  }

  function getClassName(option) {
    if (!done) return "friends-answer-btn";
    if (option === answerText) return "friends-answer-btn is-correct";
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
            <h2>{questionText}</h2>
          </div>
        </div>
      </div>

      <div className="friends-answer-grid">
        {options.map((option) => (
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
              <strong>{answerText}</strong>
            </div>
          </div>
          <p className="friends-result-text">{explanationText}</p>
          <p className="friends-result-text">{t.challenge.tomorrow}</p>
        </div>
      ) : null}
    </section>
  );
}
