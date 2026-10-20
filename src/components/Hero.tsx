'use client';
import { useState } from 'react';
import type { Locale, Version } from '@/lib/types';
import { copy } from '@/lib/copy';
import { Arrow } from './Icon';
export function Hero({ locale, version }: { locale: Locale; version: Version }) {
  const t = copy[locale];
  const [playing, setPlaying] = useState(false);
  return (
    <section className="hero section-shell" id="inicio" aria-labelledby="hero-title">
      {version === 'clasico' && (
        <div className="classic-film" aria-hidden="true">
          <img src="/media/background.webp" alt="" />
          <div />
          {playing && <video src="/media/cover.mp4" autoPlay muted loop playsInline />}
        </div>
      )}
      <div className="hero-main">
        <p className="eyebrow hero-eyebrow">
          <span className="status-dot" />
          {t.eyebrow}
        </p>
        <h1 id="hero-title">
          {version === 'editorial' ? (
            <>
              {t.heroA}
              <br />
              <span>{t.heroB}</span>
            </>
          ) : (
            <>
              Pablo Gallego
              <br />
              <span>Carmona</span>
            </>
          )}
        </h1>
        <p className="hero-role">{t.role}</p>
        <p className="hero-description">{t.intro}</p>
        <div className="hero-ctas">
          <a className="button primary" href="#experiencia">
            {t.explore}
            <Arrow diagonal />
          </a>
          <a className="text-link" href="/media/pablo-gallego-cv.pdf" download>
            {t.cv}
            <span aria-hidden="true">↓</span>
          </a>
        </div>
        {version === 'clasico' && (
          <button
            className="video-control"
            onClick={() => setPlaying(!playing)}
            aria-pressed={playing}
          >
            {playing
              ? locale === 'es'
                ? 'Pausar fondo animado'
                : 'Pause animated background'
              : locale === 'es'
                ? 'Ver fondo animado original'
                : 'Play original animated background'}
          </button>
        )}
      </div>
      <div className="hero-visual">
        <div className="portrait-topline">
          <span>PGC / PERSONAL PORTFOLIO</span>
          <span>01—07</span>
        </div>
        <div className="portrait-frame">
          <img
            src="/media/pablo.webp"
            alt="Pablo Gallego Carmona"
            width="900"
            height="1100"
            fetchPriority="high"
          />
          <span className="portrait-word" aria-hidden="true">
            CREAR<span>BUILD</span>
          </span>
          <span className="portrait-cross" aria-hidden="true">
            +
          </span>
        </div>
        <div className="portrait-caption">
          <span>{t.based}</span>
          <span>37°10′ N · 3°36′ W</span>
        </div>
        <div className="floating-note">
          <span aria-hidden="true">↗</span>
          <p>
            Code meets
            <br />
            <strong>human experience.</strong>
          </p>
        </div>
      </div>
      <div className="hero-bottom">
        <p>{t.historic}</p>
        <a href="#sobre-mi">
          {t.scroll}
          <span aria-hidden="true">↓</span>
        </a>
        <span className="hero-index">DESIGN / DEVELOP / CONNECT</span>
      </div>
    </section>
  );
}
