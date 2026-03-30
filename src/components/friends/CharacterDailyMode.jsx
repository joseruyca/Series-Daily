"use client";

import { useEffect, useMemo, useState } from "react";
import { getMadridDateKey, formatMadridLongDate } from "@/src/lib/date";
import { resolveDailyChallenge, buildProgressKey } from "@/src/lib/daily";

function normalizeValue(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export default function CharacterDailyMode({ challenges, profiles, lang, t }) {
  const todayKey = getMadridDateKey();

  const challenge = useMemo(() => resolveDailyChallenge(challenges, todayKey), [challenges, todayKey]);
  const answer = useMemo(() => {
    if (!challenge) return null;
    return profiles.find((item) => item.id === challenge.answerId) || null;
  }, [challenge, profiles]);

  const progressKey = useMemo(
    () => buildProgressKey("friends", "character", challenge ? challenge.date : todayKey),
    [challenge, todayKey]
  );

  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState({
    guesses: [],
    finished: false,
    solved: false
  });

  useEffect(() => {
    if (!challenge) return;
    const saved = window.localStorage.getItem(progressKey);

    if (!saved) {
      setProgress({
        guesses: [],
        finished: false,
        solved: false
      });
      return;
    }

    try {
      setProgress(JSON.parse(saved));
    } catch {
      setProgress({
        guesses: [],
        finished: false,
        solved: false
      });
    }
  }, [challenge, progressKey]);

  if (!challenge || !answer) return null;

  const labels = t.classic.values;
  const headers = t.classic.headers;
  const guessedProfiles = progress.guesses
    .map((id) => profiles.find((item) => item.id === id))
    .filter(Boolean);

  const dateLabel = formatMadridLongDate(challenge.date, lang);
  const attributes = ["group", "job", "home", "romance", "vibe"];
  const quickNames = profiles.slice(0, 6).map((item) => item.name);

  function labelFor(type, value) {
    return labels[type][value] || value;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (progress.finished) return;

    const value = normalizeValue(input);
    if (!value) return;

    const candidate = profiles.find((item) => normalizeValue(item.name) === value);

    if (!candidate) {
      setError(t.classic.notFound);
      return;
    }

    if (progress.guesses.includes(candidate.id)) {
      setError(t.classic.repeated);
      return;
    }

    const nextGuesses = [...progress.guesses, candidate.id];
    const solved = candidate.id === answer.id;
    const finished = solved || nextGuesses.length >= 6;

    const next = {
      guesses: nextGuesses,
      solved,
      finished
    };

    setProgress(next);
    window.localStorage.setItem(progressKey, JSON.stringify(next));
    setInput("");
    setError("");
  }

  function cellClass(value, answerValue) {
    return value === answerValue ? "guess-cell is-exact" : "guess-cell is-wrong";
  }

  return (
    <section className="classic-shell">
      <div className="game-toolbar">
        <div className="date-badge">
          <span>{t.challenge.dateLabel}</span>
          <strong>{dateLabel}</strong>
        </div>

        <div className="date-badge">
          <span>{t.classic.attempts}</span>
          <strong>{progress.guesses.length} / 6</strong>
        </div>

        <div className={`state-badge ${progress.finished ? "is-complete" : "is-live"}`}>
          {progress.finished ? t.challenge.completed : t.status.available}
        </div>
      </div>

      <form className="classic-form" onSubmit={handleSubmit}>
        <input
          list="friends-character-list"
          type="text"
          className="classic-input"
          placeholder={t.classic.inputPlaceholder}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          disabled={progress.finished}
          autoComplete="off"
          spellCheck="false"
        />
        <datalist id="friends-character-list">
          {profiles.map((item) => (
            <option key={item.id} value={item.name} />
          ))}
        </datalist>

        <button type="submit" className="classic-submit" disabled={progress.finished}>
          {t.classic.submit}
        </button>
      </form>

      {error ? <p className="classic-error">{error}</p> : null}

      <div className="quick-picks">
        <span className="quick-picks__label">{lang === "en" ? "Suggestions" : "Sugerencias"}</span>
        <div className="quick-picks__grid">
          {quickNames.map((name) => (
            <button key={name} type="button" className="quick-pick" disabled={progress.finished} onClick={() => setInput(name)}>{name}</button>
          ))}
        </div>
      </div>

      <div className="legend-row">
        <span className="legend-pill is-match">{t.classic.legendMatch}</span>
        <span className="legend-pill is-miss">{t.classic.legendMiss}</span>
      </div>

      {progress.guesses.length >= 3 && !progress.finished ? (
        <div className="classic-hint">
          <span>{t.classic.hint}</span>
          <strong>{challenge.hint}</strong>
        </div>
      ) : null}

      {guessedProfiles.length === 0 ? (
        <div className="empty-panel">
          <p>{t.classic.emptyState}</p>
        </div>
      ) : (
        <>
          <div className="classic-table-wrap desktop-only">
            <div className="classic-table">
              <div className="guess-row guess-head">
                <div className="guess-name">{headers.name}</div>
                <div className="guess-cell">{headers.group}</div>
                <div className="guess-cell">{headers.job}</div>
                <div className="guess-cell">{headers.home}</div>
                <div className="guess-cell">{headers.romance}</div>
                <div className="guess-cell">{headers.vibe}</div>
              </div>

              {guessedProfiles.map((item) => (
                <div key={item.id} className="guess-row">
                  <div className="guess-name">{item.name}</div>
                  <div className={cellClass(item.group, answer.group)}>{labelFor("group", item.group)}</div>
                  <div className={cellClass(item.job, answer.job)}>{labelFor("job", item.job)}</div>
                  <div className={cellClass(item.home, answer.home)}>{labelFor("home", item.home)}</div>
                  <div className={cellClass(item.romance, answer.romance)}>{labelFor("romance", item.romance)}</div>
                  <div className={cellClass(item.vibe, answer.vibe)}>{labelFor("vibe", item.vibe)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mobile-guess-stack mobile-only">
            {guessedProfiles.map((item) => (
              <article key={item.id} className="guess-card-mobile">
                <div className="guess-card-mobile__title">{item.name}</div>
                <div className="guess-card-mobile__grid">
                  {attributes.map((key) => (
                    <div key={key} className={cellClass(item[key], answer[key])}>
                      <span className="guess-card-mobile__label">{headers[key]}</span>
                      <strong>{labelFor(key, item[key])}</strong>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      {progress.finished ? (
        <div className="feedback-panel">
          <div className={`feedback-state ${progress.solved ? "is-correct" : "is-wrong"}`}>
            {progress.solved ? t.classic.solved : t.classic.failed}
          </div>

          <div className="meta-table">
            <div className="meta-row">
              <span>{t.classic.answer}</span>
              <strong>{answer.name}</strong>
            </div>
          </div>

          <p className="result-note">{t.challenge.tomorrow}</p>
        </div>
      ) : null}
    </section>
  );
}