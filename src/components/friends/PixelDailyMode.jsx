"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getMadridDateKey, formatMadridLongDate } from "@/src/lib/date";
import { resolveDailyChallenge, buildProgressKey } from "@/src/lib/daily";

function normalizeValue(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export default function PixelDailyMode({ challenges, lang, t }) {
  const todayKey = getMadridDateKey();
  const challenge = useMemo(() => resolveDailyChallenge(challenges, todayKey), [challenges, todayKey]);
  const progressKey = useMemo(
    () => buildProgressKey("friends", "pixel", challenge ? challenge.date : todayKey),
    [challenge, todayKey]
  );

  const canvasRef = useRef(null);
  const [guess, setGuess] = useState("");
  const [imageReady, setImageReady] = useState(true);
  const [progress, setProgress] = useState({
    attempts: 0,
    finished: false,
    solved: false,
    lastGuess: ""
  });

  useEffect(() => {
    if (!challenge) return;
    const saved = window.localStorage.getItem(progressKey);

    if (!saved) {
      setProgress({
        attempts: 0,
        finished: false,
        solved: false,
        lastGuess: ""
      });
      return;
    }

    try {
      setProgress(JSON.parse(saved));
    } catch {
      setProgress({
        attempts: 0,
        finished: false,
        solved: false,
        lastGuess: ""
      });
    }
  }, [challenge, progressKey]);

  useEffect(() => {
    if (!challenge || !canvasRef.current) return;

    const image = new Image();
    image.src = challenge.image;

    image.onload = () => {
      setImageReady(true);

      const stage = Math.max(0, Math.min(progress.attempts, 5));
      const sampleSteps = [10, 16, 28, 44, 72, 700];
      const sampleWidth = sampleSteps[stage];

      const displayWidth = 720;
      const displayHeight = Math.round((image.height / image.width) * displayWidth);

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = displayWidth;
      canvas.height = displayHeight;

      const offscreen = document.createElement("canvas");
      const offCtx = offscreen.getContext("2d");

      offscreen.width = sampleWidth;
      offscreen.height = Math.max(1, Math.round((image.height / image.width) * sampleWidth));

      offCtx.drawImage(image, 0, 0, offscreen.width, offscreen.height);
      ctx.clearRect(0, 0, displayWidth, displayHeight);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(offscreen, 0, 0, offscreen.width, offscreen.height, 0, 0, displayWidth, displayHeight);
    };

    image.onerror = () => {
      setImageReady(false);
    };
  }, [challenge, progress.attempts]);

  if (!challenge) return null;

  const dateLabel = formatMadridLongDate(challenge.date, lang);
  const remaining = Math.max(0, 5 - progress.attempts);

  function handleSubmit(event) {
    event.preventDefault();
    if (progress.finished) return;

    const normalized = normalizeValue(guess);
    if (!normalized) return;

    const validAnswers = [challenge.answer, ...(challenge.aliases || [])].map(normalizeValue);
    const solved = validAnswers.includes(normalized);
    const nextAttempts = Math.min(progress.attempts + 1, 5);
    const finished = solved || nextAttempts >= 5;

    const next = {
      attempts: nextAttempts,
      finished,
      solved,
      lastGuess: guess.trim()
    };

    setProgress(next);
    window.localStorage.setItem(progressKey, JSON.stringify(next));
    setGuess("");
  }

  return (
    <section className="game-wrap">
      <div className="game-frame">
        <div className="game-toolbar">
          <div className="date-badge">
            <span>{t.challenge.dateLabel}</span>
            <strong>{dateLabel}</strong>
          </div>

          <div className="date-badge">
            <span>{t.challenge.remainingLabel}</span>
            <strong>{remaining}</strong>
          </div>

          <div className={`state-badge ${progress.finished ? "is-complete" : "is-live"}`}>
            {progress.finished ? t.challenge.completed : t.status.available}
          </div>
        </div>

        <div className="pixel-image-shell">
          {imageReady ? (
            <canvas ref={canvasRef} className="pixel-canvas" />
          ) : (
            <div className="pixel-missing">{t.challenge.imageMissing}</div>
          )}
        </div>

        <div className="pixel-meta-grid">
          <div className="pixel-meta-card">
            <span>{t.challenge.attemptsLabel}</span>
            <strong>{progress.attempts} / 5</strong>
          </div>
          <div className="pixel-meta-card">
            <span>{t.challenge.hintLabel}</span>
            <strong>{challenge.hint}</strong>
          </div>
        </div>

        <form className="pixel-input-row" onSubmit={handleSubmit}>
          <input
            type="text"
            className="classic-input"
            placeholder={t.challenge.inputPlaceholder}
            value={guess}
            onChange={(event) => setGuess(event.target.value)}
            disabled={progress.finished}
            autoComplete="off"
            spellCheck="false"
          />
          <button type="submit" className="classic-submit" disabled={progress.finished}>
            {t.challenge.submit}
          </button>
        </form>

        {progress.finished ? (
          <div className="feedback-panel">
            <div className={`feedback-state ${progress.solved ? "is-correct" : "is-wrong"}`}>
              {progress.solved ? t.challenge.correct : t.challenge.incorrect}
            </div>

            <div className="meta-table">
              <div className="meta-row">
                <span>{t.challenge.yourAnswer}</span>
                <strong>{progress.lastGuess || "-"}</strong>
              </div>
              <div className="meta-row">
                <span>{t.challenge.correctAnswer}</span>
                <strong>{challenge.answer}</strong>
              </div>
            </div>

            <p className="result-note">{challenge.explanation}</p>
            <p className="result-note">{t.challenge.tomorrow}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}