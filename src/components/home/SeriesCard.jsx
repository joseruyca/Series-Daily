"use client";

import Link from "next/link";
import { useState } from "react";

const RESET = {
  rotateX: 0,
  rotateY: 0,
  moveX: 0,
  moveY: 0,
};

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
  const [active, setActive] = useState(false);

  function updateTilt(clientX, clientY, currentTarget) {
    const rect = currentTarget.getBoundingClientRect();
    const px = (clientX - rect.left) / rect.width - 0.5;
    const py = (clientY - rect.top) / rect.height - 0.5;

    setTilt({
      rotateX: py * -8,
      rotateY: px * 12,
      moveX: px * -16,
      moveY: py * -16,
    });
  }

  function handleMouseMove(event) {
    setActive(true);
    updateTilt(event.clientX, event.clientY, event.currentTarget);
  }

  function handleLeave() {
    setActive(false);
    setTilt(RESET);
  }

  const content = (
    <article
      className={`series-card theme-${theme} ${active ? "is-active" : ""} ${available ? "is-available" : "is-locked"}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      onMouseEnter={() => setActive(true)}
      onTouchStart={() => setActive(true)}
      onTouchEnd={handleLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
      }}
    >
      <div
        className="series-card__bg"
        style={{
          backgroundImage: `url(${image})`,
          transform: `translate3d(${tilt.moveX}px, ${tilt.moveY}px, 0) scale(1.08)`,
        }}
      />
      <div className="series-card__overlay" />
      <div className="series-card__glow" />

      <div className="series-card__body">
        <div className="chip-row">
          <span className="kicker-chip">{kicker}</span>
          <span className={`status-chip ${available ? "is-live" : "is-soon"}`}>
            {statusLabel}
          </span>
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

  return (
    <div className="series-card-link is-disabled" aria-disabled="true">
      {content}
    </div>
  );
}