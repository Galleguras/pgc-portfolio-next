'use client';
import { useMemo, useState } from 'react';
import type { Course, Locale } from '@/lib/types';
import { copy } from '@/lib/copy';
import {
  courseCategory,
  dateLabel,
  normalized,
  parseCourseDate,
  uniqueDescription,
} from '@/lib/format';
export function Learning({ locale, courses }: { locale: Locale; courses: Course[] }) {
  const t = copy[locale];
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [all, setAll] = useState(false);
  const [sort, setSort] = useState('new');
  const results = useMemo(
    () =>
      courses
        .filter(
          (c) =>
            (!search || normalized(c.descripcion).includes(normalized(search))) &&
            (category === 'all' || courseCategory(c.descripcion) === category),
        )
        .sort(
          (a, b) =>
            (sort === 'new' ? -1 : 1) *
            (parseCourseDate(a.fechaRealizacion) - parseCourseDate(b.fechaRealizacion)),
        ),
    [courses, search, category, sort],
  );
  const shown = all || search || category !== 'all' ? results : results.slice(0, 6);
  return (
    <section className="learning section-pad" id="formacion" aria-labelledby="learning-title">
      <div className="section-shell">
        <div className="learning-heading">
          <div className="section-heading">
            <p className="eyebrow">{t.learnTag}</p>
            <h2 id="learning-title">{t.learnTitle}</h2>
          </div>
          <p className="section-description">{t.learnIntro}</p>
        </div>
        <div className="learning-controls">
          <label className="search-field">
            <span className="sr-only">{t.search}</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
              <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="m16 16 5 5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <input
              type="search"
              placeholder={t.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <label className="sort-select">
            <span className="sr-only">{locale === 'es' ? 'Ordenar cursos' : 'Sort courses'}</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="new">
                {locale === 'es' ? 'Más recientes primero' : 'Newest first'}
              </option>
              <option value="old">
                {locale === 'es' ? 'Más antiguos primero' : 'Oldest first'}
              </option>
            </select>
          </label>
        </div>
        <div className="section-toolbar">
          <div
            className="filter-group"
            role="group"
            aria-label={locale === 'es' ? 'Categoría de formación' : 'Learning category'}
          >
            {[
              ['all', t.all],
              ['web', t.web],
              ['enterprise', t.enterprise],
              ['other', t.other],
            ].map(([id, label]) => (
              <button key={id} aria-pressed={category === id} onClick={() => setCategory(id)}>
                {label}
              </button>
            ))}
          </div>
          <span className="result-label" role="status">
            {results.length} {t.results}
          </span>
        </div>
        <div className="course-grid">
          {shown.map((course) => (
            <article
              className="course-card"
              key={`${course.fechaRealizacion}-${course.descripcion}`}
            >
              <div className="course-meta">
                <time
                  dateTime={new Date(parseCourseDate(course.fechaRealizacion))
                    .toISOString()
                    .slice(0, 10)}
                >
                  {dateLabel(course.fechaRealizacion, locale, true)}
                </time>
                <span>
                  {course.horas} {t.hours}
                </span>
              </div>
              <span className="course-symbol" aria-hidden="true">
                {courseCategory(course.descripcion) === 'web'
                  ? '</>'
                  : courseCategory(course.descripcion) === 'enterprise'
                    ? '{ }'
                    : '↗'}
              </span>
              <h3>{uniqueDescription(course.descripcion)}</h3>
              <span className="course-category">
                {courseCategory(course.descripcion) === 'web'
                  ? t.web
                  : courseCategory(course.descripcion) === 'enterprise'
                    ? t.enterprise
                    : t.other}
              </span>
            </article>
          ))}
        </div>
        {!results.length && (
          <div className="empty-state">
            <p>{t.noResults}</p>
            <button
              className="text-link"
              onClick={() => {
                setSearch('');
                setCategory('all');
              }}
            >
              {t.reset} ↗
            </button>
          </div>
        )}
        {!search && category === 'all' && (
          <button className="button show-courses" onClick={() => setAll(!all)} aria-expanded={all}>
            {all
              ? locale === 'es'
                ? 'Mostrar menos'
                : 'Show less'
              : locale === 'es'
                ? `Explorar los ${courses.length} cursos`
                : `Explore all ${courses.length} courses`}
            <span aria-hidden="true">{all ? '−' : '+'}</span>
          </button>
        )}
      </div>
    </section>
  );
}
