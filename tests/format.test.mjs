import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalized,
  parseCourseDate,
  period,
  invalidPeriod,
  uniqueDescription,
  courseCategory,
  dateLabel,
} from '../src/lib/format.ts';
import { readFileSync } from 'node:fs';
const jobs = JSON.parse(readFileSync(new URL('../src/data/trabajos.json', import.meta.url)));
const courses = JSON.parse(readFileSync(new URL('../src/data/formacion.json', import.meta.url)));
test('Search is accent and case insensitive', () =>
  assert.equal(normalized('  Formación JAVASCRIPT '), 'formacion javascript'));
test('European source dates are parsed as day-month-year', () => {
  assert.equal(parseCourseDate('02-01-2023'), Date.UTC(2023, 0, 2));
  assert.ok(parseCourseDate('01-03-2023') > parseCourseDate('02-01-2023'));
});
test('Impossible source chronology is identified without inventing replacement dates', () => {
  assert.equal(invalidPeriod('2011-02-01', '2001-01-01'), true);
  assert.match(period('2011-02-01', '2001-01-01', 'es'), /fin por revisar/);
});
test('Missing end date does not claim current employment', () => {
  assert.match(period('2018-11-19', null, 'es'), /fin no indicado/);
  assert.doesNotMatch(period('2018-11-19', null, 'es'), /Actualidad/);
});
test('Exact duplicated course text is presented once', () =>
  assert.equal(uniqueDescription('React Jest. React Jest.'), 'React Jest.'));
test('Course categories cover original training', () => {
  assert.equal(courseCategory('React'), 'web');
  assert.equal(courseCategory('Procesos ETL'), 'enterprise');
  assert.equal(courseCategory('Comercio exterior'), 'other');
});
test('Seven experiences and 22 courses are preserved in each language', () => {
  for (const locale of ['es', 'en']) {
    assert.equal(jobs.filter((j) => j.locale === locale).length, 7);
    assert.equal(courses.filter((c) => c.locale === locale).length, 22);
  }
});
test('All job details and course descriptions remain present', () => {
  for (const j of jobs) {
    assert.ok(j.funcion.trim().length > 20);
    assert.ok(j.eht.trim());
    assert.ok(j.clientes.trim());
  }
  for (const c of courses) assert.ok(c.descripcion.trim());
});

test('Confirmed year-only end dates have no invented day or month', () => {
  assert.equal(dateLabel('2013', 'es'), '2013');
  assert.equal(dateLabel('2023', 'en'), '2023');
  for (const locale of ['es', 'en']) {
    assert.equal(jobs.find((j) => j.locale === locale && j.empresa === 'MENSOFT').fechaFin, '2013');
    assert.equal(
      jobs.find((j) => j.locale === locale && j.empresa === 'T-SYSTEMS').fechaFin,
      '2023',
    );
  }
});
