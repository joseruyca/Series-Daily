
"use client";

import { useEffect, useMemo, useState } from "react";
import { getMadridDateKey, formatMadridLongDate } from "@/src/lib/date";
import { resolveDailyChallenge, buildProgressKey } from "@/src/lib/daily";

export default function DailyChoiceGame({ series, mode, challenges, lang, t }) {
  const todayKey = getMadridDateKey();

  const challenge = useMemo(() => resolveDailyChallenge(challenges, todayKey), [challenges, todayKey]);

  const progressKey = useMemo(
    () => (challenge ? buildProgressKey(series, mode, challenge.date) : buildProgressKey(series, mode, todayKey)),
    [challenge, mode, series, todayKey]
  );

  const [result, setResult] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
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

  const isAnswered = Boolean(result);
  const dateLabel = formatMadridLongDate(challenge.date, lang);

  function handleSelect(option) {
    if (isAnswered) return;
    const nextResult = { selected: option, correct: option === challenge.answer };
    setResult(nextResult);
    window.localStorage.setItem(progressKey, JSON.stringify(nextResult));
  }

  function getOptionClass(option) {
    if (!isAnswered) return "option-button animated-choice";
    if (option === challenge.answer) return "option-button animated-choice is-correct success-pop";
    if (result?.selected === option && option !== challenge.answer) return "option-button animated-choice is-wrong wrong-shake";
    return "option-button animated-choice is-muted";
  }

  return (
    <section className="challenge-card glass-panel fade-in-up">
      <div className="challenge-topbar challenge-topbar--minimal">
        <span className="topbar-chip topbar-chip--date">{dateLabel}</span>
        <span className={`status-tag ${hydrated && isAnswered ? "is-complete" : "is-live"}`}>
          {hydrated && isAnswered ? t.challenge.completed : t.status.available}
        </span>
      </div>

      <div className="challenge-panel challenge-panel--series">
        <h2>{challenge.prompt}</h2>

        {mode === "quote" ? (
          <div className="content-box quote-box quote-box--hero">
            <span className="content-box__label">{t.challenge.quoteLabel}</span>
            <blockquote>“{challenge.quote}”</blockquote>
          </div>
        ) : null}

        {mode === "emoji" ? (
          <div className="content-box emoji-box emoji-box--hero">
            <span className="content-box__label">{t.challenge.emojiLabel}</span>
            <div className="emoji-line">{challenge.emojis}</div>
          </div>
        ) : null}
      </div>

      <div className="answers-block answers-block--series">
        <p className="answers-block__title">{t.challenge.chooseLabel}</p>
        <div className="option-grid option-grid--series">
          {challenge.options.map((option) => (
            <button key={option} type="button" className={getOptionClass(option)} onClick={() => handleSelect(option)} disabled={isAnswered}>
              {option}
            </button>
          ))}
        </div>
      </div>

      {isAnswered ? (
        <div className="result-card feedback-panel feedback-panel--animated fade-in-up">
          <div className={`result-badge ${result.correct ? "is-correct" : "is-wrong"}`}>
            {result.correct ? t.challenge.correct : t.challenge.incorrect}
          </div>
          <div className="result-rows">
            <div className="result-row">
              <span>{t.challenge.yourAnswer}</span>
              <strong>{result.selected}</strong>
            </div>
            <div className="result-row">
              <span>{t.challenge.correctAnswer}</span>
              <strong>{challenge.answer}</strong>
            </div>
          </div>
          <p className="result-text">{challenge.explanation}</p>
          <p className="result-next">{t.challenge.tomorrow}</p>
        </div>
      ) : null}
    </section>
  );
}
