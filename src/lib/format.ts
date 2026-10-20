import type { Locale } from './types';
export function normalized(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}
export function parseCourseDate(value: string): number {
  const [day, month, year] = value.split('-').map(Number);
  return Date.UTC(year, month - 1, day);
}
export function dateLabel(value: string, locale: Locale, course = false): string {
  if (!course && /^\d{4}$/.test(value)) return value;
  const time = course ? parseCourseDate(value) : Date.parse(value + 'T00:00:00Z');
  if (!Number.isFinite(time)) return locale === 'es' ? 'Fecha por revisar' : 'Date to review';
  return new Intl.DateTimeFormat(locale === 'es' ? 'es-ES' : 'en-GB', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(time);
}
export function invalidPeriod(start: string, end?: string | null): boolean {
  return Boolean(end && Date.parse(end) < Date.parse(start));
}
export function period(start: string, end: string | null | undefined, locale: Locale): string {
  const beginning = dateLabel(start, locale);
  if (invalidPeriod(start, end))
    return beginning + (locale === 'es' ? ' · fin por revisar' : ' · end date to review');
  return (
    beginning +
    ' — ' +
    (end ? dateLabel(end, locale) : locale === 'es' ? 'fin no indicado' : 'end not provided')
  );
}
export function uniqueDescription(value: string): string {
  const text = value.trim();
  // One source description repeats the same sentence twice; keep the raw JSON intact.
  if (
    text.length % 2 === 0 &&
    text.slice(0, text.length / 2).trim() === text.slice(text.length / 2).trim()
  )
    return text.slice(0, text.length / 2).trim();
  const middle = Math.floor(text.length / 2);
  for (let i = middle - 2; i <= middle + 2; i++) {
    if (text.slice(0, i).trim() === text.slice(i).trim()) return text.slice(0, i).trim();
  }
  return text;
}
export function courseCategory(description: string): 'web' | 'enterprise' | 'other' {
  const v = normalized(description);
  if (/react|angular|graphql|gatsby|git|web|php|javascript|java script|html/.test(v)) return 'web';
  if (/java|uipath|etl|iso27001|birt|prosa|jasper|nacar/.test(v)) return 'enterprise';
  return 'other';
}
export function initials(value: string): string {
  return value
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0])
    .join('')
    .toUpperCase();
}
