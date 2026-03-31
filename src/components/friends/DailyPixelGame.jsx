
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getMadridDateKey, formatMadridLongDate } from "@/src/lib/date";
import { resolveDailyChallenge, buildProgressKey } from "@/src/lib/daily";

function normalizeValue(value) {
  return value.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();
}

export default function DailyPixelGame({ series, mode, challenges, lang, t }) {
  const todayKey = getMadridDateKey();
  const challenge = useMemo(() => resolveDailyChallenge(challenges, todayKey), [challenges, todayKey]);
  const progressKey = useMemo(() => challenge ? buildProgressKey(series, mode, challenge.date) : buildProgressKey(series, mode, todayKey), [challenge, mode, series, todayKey]);

  const canvasRef = useRef(null);
  const [guess, setGuess] = useState("");
  const [progress, setProgress] = useState({ attempts: 0, finished: false, solved: false, lastGuess: "" });
  const [imageReady, setImageReady] = useState(true);

  useEffect(() => {
    if (!challenge) return;
    const saved = window.localStorage.getItem(progressKey);
    if (!saved) {
      setProgress({ attempts: 0, finished: false, solved: false, lastGuess: "" });
      return;
    }
    try {
      setProgress(JSON.parse(saved));
    } catch {
      setProgress({ attempts: 0, finished: false, solved: false, lastGuess: "" });
    }
  }, [challenge, progressKey]);

  useEffect(() => {
    if (!challenge || !canvasRef.current) return;
    const image = new Image();
    image.src = challenge.image;
    image.onload = () => {
      setImageReady(true);
      const stage = progress.solved ? 5 : Math.max(0, Math.min(progress.attempts, 5));
      const sampleSteps = [10, 16, 26, 42, 72, 700];
      const sampleWidth = sampleSteps[stage];
      const displayWidth = 700;
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
    image.onerror = () => setImageReady(false);
  }, [challenge, progress.attempts, progress.solved]);

  if (!challenge) return null;

  const dateLabel = formatMadridLongDate(challenge.date, lang);
  const remaining = Math.max(0, 5 - progress.attempts);

  function handleSubmit(event) {
    event.preventDefault();
    if (progress.finished) return;
    const cleanedGuess = normalizeValue(guess);
    if (!cleanedGuess) return;
    const validAnswers = [challenge.answer, ...(challenge.aliases || [])].map(normalizeValue);
    const solved = validAnswers.includes(cleanedGuess);
    const nextAttempts = Math.min(progress.attempts + 1, 5);
    const finished = solved || nextAttempts >= 5;
    const nextProgress = { attempts: nextAttempts, finished, solved, lastGuess: guess.trim() };
    setProgress(nextProgress);
    window.localStorage.setItem(progressKey, JSON.stringify(nextProgress));
    setGuess("");
  }

  return (
    <section className="challenge-card glass-panel fade-in-up">
      <div className="challenge-topbar challenge-topbar--minimal">
        <span className="topbar-chip topbar-chip--date">{dateLabel}</span>
        <span className="topbar-chip topbar-chip--attempts">{t.challenge.attemptsLabel}: {progress.attempts} / 5</span>
        <span className={`status-tag ${progress.finished ? "is-complete" : "is-live"}`}>{progress.finished ? t.challenge.completed : t.status.available}</span>
      </div>

      <div className="reveal-card reveal-card--animated">
        {imageReady ? <canvas ref={canvasRef} className={`reveal-canvas ${progress.solved ? "reveal-canvas--clear" : ""}`} /> : <div className="reveal-missing">{t.challenge.imageMissing}</div>}
      </div>

      <div className="pixel-meta pixel-meta--compact">
        <div className="pixel-pill"><span>{t.challenge.remainingLabel}</span><strong>{remaining}</strong></div>
      </div>

      <form className="pixel-form" onSubmit={handleSubmit}>
        <input type="text" value={guess} onChange={(event) => setGuess(event.target.value)} placeholder={t.challenge.inputPlaceholder} className="pixel-input" disabled={progress.finished} autoComplete="off" spellCheck="false" />
        <button type="submit" className="pixel-submit pressable" disabled={progress.finished}>{t.challenge.submit}</button>
      </form>

      {progress.finished ? (
        <div className="result-card feedback-panel feedback-panel--animated fade-in-up">
          <div className={`result-badge ${progress.solved ? "is-correct success-pop" : "is-wrong wrong-shake"}`}>{progress.solved ? t.challenge.correct : t.challenge.incorrect}</div>
          <div className="result-rows">
            <div className="result-row"><span>{t.challenge.yourAnswer}</span><strong>{progress.lastGuess || "-"}</strong></div>
            <div className="result-row"><span>{t.challenge.correctAnswer}</span><strong>{challenge.answer}</strong></div>
          </div>
          <p className="result-text">{challenge.explanation}</p>
          <p className="result-next">{t.challenge.tomorrow}</p>
        </div>
      ) : null}
    </section>
  );
}
