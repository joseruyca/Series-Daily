"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getMadridDateKey, formatMadridLongDate } from "@/src/lib/date";
import { resolveDailyChallenge, buildProgressKey } from "@/src/lib/daily";

function normalizeValue(value) {
  return value.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();
}

function pickLocalizedValue(item, baseKey, lang) {
  if (!item) return "";
  if (lang === "en") return item[`${baseKey}En`] ?? item[baseKey] ?? "";
  return item[`${baseKey}Es`] ?? item[baseKey] ?? item[`${baseKey}En`] ?? "";
}

function loadFirstAvailableImage(candidates) {
  return new Promise((resolve, reject) => {
    if (!candidates?.length) return reject(new Error("no-image"));
    let index = 0;
    function tryNext() {
      if (index >= candidates.length) return reject(new Error("not-found"));
      const image = new Image();
      image.src = candidates[index];
      image.onload = () => resolve(image);
      image.onerror = () => {
        index += 1;
        tryNext();
      };
    }
    tryNext();
  });
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
  const [progress, setProgress] = useState({ attempts: 0, finished: false, solved: false, lastGuess: "" });

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
    loadFirstAvailableImage(challenge.imageCandidates)
      .then((image) => {
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
      })
      .catch(() => setImageReady(false));
  }, [challenge, progress.attempts]);

  if (!challenge) return null;

  const dateLabel = formatMadridLongDate(challenge.date, lang);
  const remaining = Math.max(0, 5 - progress.attempts);
  const promptText = pickLocalizedValue(challenge, "prompt", lang);
  const explanationText = pickLocalizedValue(challenge, "explanation", lang);
  const suggestions = ["Chandler Bing", "Rachel Green", "Ross Geller", "Joey Tribbiani", "Monica Geller", "Phoebe Buffay"];

  function handleSubmit(event) {
    event.preventDefault();
    if (progress.finished) return;
    const normalized = normalizeValue(guess);
    if (!normalized) return;
    const validAnswers = [challenge.answer, ...(challenge.aliases || [])].map(normalizeValue);
    const solved = validAnswers.includes(normalized);
    const nextAttempts = Math.min(progress.attempts + 1, 5);
    const finished = solved || nextAttempts >= 5;
    const next = { attempts: nextAttempts, finished, solved, lastGuess: guess.trim() };
    setProgress(next);
    window.localStorage.setItem(progressKey, JSON.stringify(next));
    setGuess("");
  }

  return (
    <section className="friends-play-card friends-mode-reveal">
      <div className="friends-play-top">
        <div className="friends-play-pill">
          <span>{t.challenge.dateLabel}</span>
          <strong>{dateLabel}</strong>
        </div>
        <div className="friends-play-pill">
          <span>{t.challenge.remainingLabel}</span>
          <strong>{remaining}</strong>
        </div>
      </div>

      <div className="friends-prompt-box">
        <div className="friends-prompt-head">
          <div className="friends-prompt-icon" aria-hidden="true">🖼️</div>
          <div>
            <span className="friends-mini-label">Reveal</span>
            <h2>{promptText}</h2>
          </div>
        </div>
      </div>

      <div className="friends-reveal-frame">
        {imageReady ? <canvas ref={canvasRef} className="friends-reveal-canvas" /> : <div className="friends-reveal-missing">{t.challenge.imageMissing}</div>}
      </div>

      <div className="friends-reveal-meta">
        <div className="friends-play-pill">
          <span>{t.challenge.attemptsLabel}</span>
          <strong>{progress.attempts} / 5</strong>
        </div>
      </div>

      <form className="friends-reveal-form" onSubmit={handleSubmit}>
        <input type="text" className="friends-reveal-input" placeholder={t.challenge.inputPlaceholder} value={guess} onChange={(event) => setGuess(event.target.value)} disabled={progress.finished} autoComplete="off" spellCheck="false" list="friends-reveal-list" />
        <datalist id="friends-reveal-list">
          {suggestions.map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
        <button type="submit" className="friends-reveal-submit" disabled={progress.finished}>{t.challenge.submit}</button>
      </form>

      <div className="friends-quick-picks">
        <span className="friends-mini-label">{lang === "en" ? "Suggestions" : "Sugerencias"}</span>
        <div className="friends-quick-picks__row">
          {suggestions.map((name) => (
            <button
              key={name}
              type="button"
              className="friends-quick-pick"
              onClick={() => !progress.finished && setGuess(name)}
              disabled={progress.finished}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {progress.finished ? (
        <div className="friends-result-card">
          <div className={`friends-result-badge ${progress.solved ? "is-correct" : "is-wrong"}`}>{progress.solved ? t.challenge.correct : t.challenge.incorrect}</div>
          <div className="friends-result-rows">
            <div className="friends-result-row"><span>{t.challenge.yourAnswer}</span><strong>{progress.lastGuess || "-"}</strong></div>
            <div className="friends-result-row"><span>{t.challenge.correctAnswer}</span><strong>{challenge.answer}</strong></div>
          </div>
          <p className="friends-result-text">{explanationText}</p>
          <p className="friends-result-text">{t.challenge.tomorrow}</p>
        </div>
      ) : null}
    </section>
  );
}
