'use client';
import Link from 'next/link';
import type { Locale, Version, Job, Course } from '@/lib/types';
import { copy } from '@/lib/copy';
import { profile } from '@/lib/content';
import { Header } from './Header';
import { VisualEffects } from './VisualEffects';
import { Hero } from './Hero';
import { About } from './About';
import { Experience } from './Experience';
import { Learning } from './Learning';
import { Contact } from './Contact';
export function Portfolio({
  locale,
  version,
  jobs,
  courses,
  biography,
}: {
  locale: Locale;
  version: Version;
  jobs: Job[];
  courses: Course[];
  biography: string[];
}) {
  const t = copy[locale];
  return (
    <div className={`portfolio theme-${version}`}>
      <a className="skip-link" href="#contenido">
        {t.skip}
      </a>
      <VisualEffects version={version} />
      <Header locale={locale} version={version} />
      <main id="contenido">
        <Hero locale={locale} version={version} />
        <About locale={locale} biography={biography} />
        <Experience locale={locale} jobs={jobs} />
        <Learning locale={locale} courses={courses} />
        <Contact locale={locale} />
      </main>
      <footer className="site-footer section-shell">
        <a className="footer-monogram" href="#inicio">
          pg.
        </a>
        <div>
          <strong>Pablo Gallego Carmona</strong>
          <p>{t.footer}</p>
        </div>
        <nav aria-label={locale === 'es' ? 'Enlaces externos' : 'External links'}>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn ↗
          </a>
          <a
            href="https://github.com/Galleguras/miportafolio"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.source} ↗
          </a>
          <a href={profile.donation} target="_blank" rel="noopener noreferrer">
            {t.support} ↗
          </a>
        </nav>
        <a className="back-top" href="#inicio" aria-label={t.toTop}>
          ↑
        </a>
      </footer>
      <aside className="design-switch" aria-label={t.change}>
        <span>PGC /</span>
        <Link
          href={`/${locale}/clasico/`}
          aria-current={version === 'clasico' ? 'page' : undefined}
        >
          {t.classic}
        </Link>
        <Link
          href={`/${locale}/editorial/`}
          aria-current={version === 'editorial' ? 'page' : undefined}
        >
          {t.editorial}
        </Link>
      </aside>
    </div>
  );
}
