import type { Locale } from '@/lib/types';
import { copy } from '@/lib/copy';
import { stack } from '@/lib/content';
export function About({ locale, biography }: { locale: Locale; biography: string[] }) {
  const t = copy[locale];
  return (
    <>
      <section
        className="about section-shell section-pad"
        id="sobre-mi"
        aria-labelledby="about-title"
      >
        <div className="section-heading">
          <p className="eyebrow">{t.aboutTag}</p>
          <h2 id="about-title">{t.aboutTitle}</h2>
          <img
            className="about-portrait"
            src="/media/pablo.webp"
            alt="Pablo Gallego Carmona"
            width="900"
            height="1100"
            loading="lazy"
          />
        </div>
        <div className="about-body">
          <p className="about-lead">{t.aboutLead}</p>
          <p>{biography[1]}</p>
          <details className="biography">
            <summary>
              {t.original}
              <span aria-hidden="true">+</span>
            </summary>
            <div>
              {biography
                .filter((_, i) => i !== 1)
                .map((text, i) => (
                  <p key={i} className={i === 2 ? 'quote' : ''}>
                    {text}
                  </p>
                ))}
            </div>
          </details>
          <p className="source-note">{t.originalNote}</p>
        </div>
        <div className="about-aside">
          <span className="tiny-label">EXPERIENCE / LEARNING</span>
          <div className="stat">
            <span>07</span>
            <p>{t.journey}</p>
          </div>
          <div className="stat">
            <span>22</span>
            <p>{t.learning}</p>
          </div>
          <div className="about-symbol" aria-hidden="true">
            ✳
          </div>
        </div>
      </section>
      <section className="toolkit section-shell" aria-labelledby="toolkit-title">
        <div>
          <p className="eyebrow">{t.techTag}</p>
          <h2 id="toolkit-title">{t.techTitle}</h2>
          <p>{t.techIntro}</p>
        </div>
        <ul className="tech-list">
          {stack.map((name, i) => (
            <li key={name}>
              <span className="tech-number">{String(i + 1).padStart(2, '0')}</span>
              {name}
              <span aria-hidden="true">↗</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
