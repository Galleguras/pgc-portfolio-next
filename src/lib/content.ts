import jobs from '@/data/trabajos.json';
import courses from '@/data/formacion.json';
import es from '@/data/es.json';
import en from '@/data/en.json';
import type { Locale, Job, Course } from './types';
import { parseCourseDate } from './format';
export const profile = {
  name: 'Pablo Gallego Carmona',
  email: 'pablogallegocarmona@gmail.com',
  phone: '+34 607 42 56 19',
  phoneHref: '+34607425619',
  github: 'https://github.com/Galleguras',
  linkedin: 'https://es.linkedin.com/in/pablo-gallego-carmona-327847a9',
  address: 'Av. del Conocimiento, 41, 18016 · Granada, España',
  maps: 'https://www.google.com/maps/search/?api=1&query=Av.+del+Conocimiento+41+Granada',
  donation: 'https://www.paypal.com/donate/?hosted_button_id=EMX9TV2ZRCGZQ',
};
export const stack = [
  'React',
  'Next.js',
  'Gatsby',
  'JavaScript',
  'Java',
  'Spring Boot',
  'GraphQL',
  'Redux',
  'Material UI',
  'Styled Components',
  'Jest',
  'Git',
  'Scrum',
];
export function getContent(locale: Locale) {
  const translation = locale === 'es' ? es : en;
  return {
    jobs: (jobs as Job[])
      .filter((j) => j.locale === locale)
      .sort((a, b) => b.fechaInicio.localeCompare(a.fechaInicio)),
    courses: (courses as Course[])
      .filter((c) => c.locale === locale)
      .sort((a, b) => parseCourseDate(b.fechaRealizacion) - parseCourseDate(a.fechaRealizacion)),
    biography: [translation.p1, translation.p2, translation.p3, translation.p4, translation.p5],
  };
}
