'use client';
import { useState } from 'react';
import type { Locale } from '@/lib/types';
import { copy } from '@/lib/copy';
import { profile } from '@/lib/content';
import { Arrow } from './Icon';
export function Contact({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [status, setStatus] = useState('');
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setStatus(t.copied);
    } catch {
      setStatus(t.copyFailed);
    }
  }
  return (
    <section className="contact-section" id="contacto" aria-labelledby="contact-title">
      <div className="section-shell contact-grid">
        <div>
          <p className="eyebrow">{t.contactTag}</p>
          <h2 id="contact-title">{t.contactTitle}</h2>
          <p className="contact-intro">{t.contactIntro}</p>
          <a
            className="contact-main-link"
            href={`mailto:${profile.email}?subject=${encodeURIComponent(locale === 'es' ? 'Contacto desde tu portafolio' : 'Hello from your portfolio')}`}
          >
            {t.email}
            <Arrow diagonal />
          </a>
        </div>
        <div className="contact-details">
          <div className="contact-orbit" aria-hidden="true">
            <span>↗</span>
          </div>
          <a className="email-address" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <button className="copy-email" onClick={copyEmail}>
            {t.copy}
            <span aria-hidden="true">⧉</span>
          </button>
          <p className="copy-status" role="status">
            {status}
          </p>
          <div className="contact-channels">
            <a href={`tel:${profile.phoneHref}`}>
              {profile.phone}
              <Arrow diagonal />
            </a>
            <a href="https://wa.me/34607425619" target="_blank" rel="noopener noreferrer">
              {t.whatsapp}
              <Arrow diagonal />
            </a>
          </div>
          <div className="location-block">
            <span className="tiny-label">GRANADA / ESPAÑA</span>
            <p>{profile.address}</p>
            <a href={profile.maps} target="_blank" rel="noopener noreferrer">
              {t.map} ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
