'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Locale, Version } from '@/lib/types';
import { copy } from '@/lib/copy';
import { Arrow } from './Icon';
export function Header({ locale, version }: { locale: Locale; version: Version }) {
  const [open, setOpen] = useState(false);
  const t = copy[locale];
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, []);
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="wordmark" href="#inicio" aria-label="Pablo Gallego Carmona — inicio">
          <span className="monogram">
            pg<span>.</span>
          </span>
          <span className="wordmark-name">
            Pablo Gallego<span>Developer & designer</span>
          </span>
        </a>
        <nav
          id="primary-nav"
          className={open ? 'navigation is-open' : 'navigation'}
          aria-label={locale === 'es' ? 'Navegación principal' : 'Main navigation'}
        >
          {t.nav.map((label, i) => (
            <a key={label} href={`#${t.navIds[i]}`} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a className="mobile-cv" href="/media/pablo-gallego-cv.pdf" download>
            {t.cv}
          </a>
        </nav>
        <div className="header-actions">
          <Link
            className="language"
            href={`/${locale === 'es' ? 'en' : 'es'}/${version}/`}
            lang={locale === 'es' ? 'en' : 'es'}
            aria-label={t.language}
          >
            {locale === 'es' ? 'EN' : 'ES'}
          </Link>
          <a className="header-contact" href="#contacto">
            {t.contact}
            <Arrow diagonal />
          </a>
          <button
            className="menu-button"
            aria-controls="primary-nav"
            aria-expanded={open}
            aria-label={open ? t.close : t.menu}
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
