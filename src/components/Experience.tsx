'use client';
import { useEffect, useRef, useState } from 'react';
import type { Job, Locale } from '@/lib/types';
import { copy } from '@/lib/copy';
import { initials, invalidPeriod, normalized, period } from '@/lib/format';
import { Arrow, Mark } from './Icon';
import { RichText } from './RichText';
export function Experience({ locale, jobs }: { locale: Locale; jobs: Job[] }) {
  const t = copy[locale];
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (selected !== null) {
      if (!el.open) el.showModal();
      const before = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = before;
      };
    }
    if (el.open) el.close();
  }, [selected]);
  const filtered = jobs.filter(
    (j) =>
      filter === 'all' ||
      (filter === 'frontend'
        ? /react|angular|css|javascript/.test(normalized(j.eht))
        : /java|sql|spring|oracle/.test(normalized(j.eht))),
  );
  const selectedJob = selected === null ? null : jobs[selected];
  return (
    <section
      className="experience section-shell section-pad"
      id="experiencia"
      aria-labelledby="experience-title"
    >
      <div className="section-heading">
        <p className="eyebrow">{t.workTag}</p>
        <h2 id="experience-title">{t.workTitle}</h2>
        <p className="section-description">{t.workIntro}</p>
      </div>
      <div className="experience-main">
        <div className="section-toolbar">
          <div
            className="filter-group"
            role="group"
            aria-label={locale === 'es' ? 'Filtrar experiencia' : 'Filter experience'}
          >
            {[
              ['all', t.all],
              ['frontend', t.frontend],
              ['backend', t.backend],
            ].map(([id, label]) => (
              <button key={id} onClick={() => setFilter(id)} aria-pressed={filter === id}>
                {label}
              </button>
            ))}
          </div>
          <span className="result-label" aria-live="polite">
            {String(filtered.length).padStart(2, '0')} / 07
          </span>
        </div>
        <div className="experience-list">
          {filtered.map((job, index) => (
            <article className={`experience-card job-${job.slug}`} key={job.slug}>
              <div className="job-identity">
                <span className="job-count">{String(index + 1).padStart(2, '0')}</span>
                <Mark value={initials(job.empresa)} />
                <span className="job-date">{period(job.fechaInicio, job.fechaFin, locale)}</span>
              </div>
              <div className="job-content">
                <h3>{job.empresa.trim()}</h3>
                <p className="job-role">{job.puesto}</p>
                <p className="job-clients">{job.clientes.trim()}</p>
                <div className="job-tech">
                  {job.eht
                    .split(',')
                    .slice(0, 4)
                    .map((tech, i) => (
                      <span key={i}>{tech.trim()}</span>
                    ))}
                </div>
              </div>
              <button
                className="job-action"
                onClick={() => setSelected(jobs.indexOf(job))}
                aria-label={`${t.details}: ${job.empresa}`}
              >
                <span>{t.details}</span>
                <Arrow diagonal />
              </button>
            </article>
          ))}
        </div>
      </div>
      <dialog
        ref={dialog}
        className="job-dialog"
        aria-labelledby="job-dialog-title"
        onCancel={() => setSelected(null)}
        onClose={() => setSelected(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            const r = e.currentTarget.getBoundingClientRect();
            if (
              e.clientX < r.left ||
              e.clientX > r.right ||
              e.clientY < r.top ||
              e.clientY > r.bottom
            )
              setSelected(null);
          }
        }}
      >
        {selectedJob && (
          <div className="dialog-content">
            <div className="dialog-topline">
              <span className="eyebrow">{t.workTag}</span>
              <button
                autoFocus
                className="close-button"
                onClick={() => setSelected(null)}
                aria-label={t.close}
              >
                ×
              </button>
            </div>
            <p className="dialog-date">
              {period(selectedJob.fechaInicio, selectedJob.fechaFin, locale)}
            </p>
            <h3 id="job-dialog-title">{selectedJob.empresa}</h3>
            <p className="dialog-role">{selectedJob.puesto}</p>
            {(invalidPeriod(selectedJob.fechaInicio, selectedJob.fechaFin) ||
              !selectedJob.fechaFin) && (
              <p className="date-note">{!selectedJob.fechaFin ? t.noEnd : t.dateIssue}</p>
            )}
            <dl>
              <div>
                <dt>{t.clients}</dt>
                <dd>{selectedJob.clientes}</dd>
              </div>
              <div>
                <dt>{t.tools}</dt>
                <dd>{selectedJob.eht}</dd>
              </div>
            </dl>
            <h4 className="detail-heading">{t.functions}</h4>
            <RichText text={selectedJob.funcion} />
            <div className="dialog-pagination">
              <button
                onClick={() =>
                  setSelected((i) => (i === null ? 0 : (i - 1 + jobs.length) % jobs.length))
                }
              >
                ← {t.previous}
              </button>
              <span>
                {(selected ?? 0) + 1} / {jobs.length}
              </span>
              <button onClick={() => setSelected((i) => (i === null ? 0 : (i + 1) % jobs.length))}>
                {t.next} →
              </button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
