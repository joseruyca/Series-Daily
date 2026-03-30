"use client";

import Link from "next/link";
import { useState } from "react";

const RESET = { rotateX: 0, rotateY: 0 };

export default function SeriesCard({
  title,
  description,
  kicker,
  statusLabel,
  ctaLabel,
  image,
  href,
  available,
  theme,
}) {
  const [tilt, setTilt] = useState(RESET);

  function updateTilt(clientX, clientY, currentTarget) {
    if (typeof window !== "undefined" && window.innerWidth < 760) return;
    const rect = currentTarget.getBoundingClientRect();
    const px = (clientX - rect.left) / rect.width - 0.5;
    const py = (clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: py * -4, rotateY: px * 6 });
  }

  function resetTilt() {
    setTilt(RESET);
  }

  const content = (
    <article
      className={`series-card series-card-v3 theme-${theme} ${available ? "is-available" : "is-locked"}`}
      onMouseMove={(event) => updateTilt(event.clientX, event.clientY, event.currentTarget)}
      onMouseLeave={resetTilt}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
      }}
    >
      <div className="series-card__bg" style={{ backgroundImage: `url(${image})` }} />
      <div className="series-card__overlay" />
      <div className="series-card__glow" />

      <div className="series-card__body">
        <div className="chip-row">
          <span className="kicker-chip">{kicker}</span>
          <span className={`status-chip ${available ? "is-live" : "is-soon"}`}>{statusLabel}</span>
        </div>

        <div className="series-card__content">
          <h3 className="series-card__title">{title}</h3>
          <p className="series-card__desc">{description}</p>
        </div>

        <span className="series-card__cta">
          {ctaLabel}
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </article>
  );

  if (available) {
    return (
      <Link href={href} className="series-card-link" aria-label={`Open ${title}`}>
        {content}
      </Link>
    );
  }

  return <div className="series-card-link is-disabled">{content}</div>;
}
