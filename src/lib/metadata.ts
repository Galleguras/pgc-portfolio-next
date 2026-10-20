import type { Metadata } from 'next';
import type { Locale, Version } from './types';
export function pageMetadata(locale: Locale, version: Version): Metadata {
  const title = `Pablo Gallego Carmona — ${locale === 'es' ? 'Desarrollo y diseño web' : 'Web development & design'}`;
  const description =
    locale === 'es'
      ? 'Portafolio de Pablo Gallego Carmona. Experiencia en desarrollo web, React, Java y soluciones para banca, administración pública y seguros. Granada, España.'
      : 'Pablo Gallego Carmona’s portfolio. Web development, React, Java and solutions for banking, public administration and insurance. Granada, Spain.';
  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || 'https://pgc-portfolio-lab.galleguras.chatgpt.site',
    ),
    title,
    description,
    applicationName: 'PGC Portfolio',
    authors: [{ name: 'Pablo Gallego Carmona' }],
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'es' ? 'es_ES' : 'en_GB',
      images: [
        { url: '/media/pablo.webp', width: 900, height: 1100, alt: 'Pablo Gallego Carmona' },
      ],
    },
    robots: { index: true, follow: true },
    icons: { icon: version === 'editorial' ? '/favicon-mono.svg' : '/favicon.svg' },
  };
}
