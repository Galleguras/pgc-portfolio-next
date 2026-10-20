import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import '../../globals.css';
import '../../editorial.css';
export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'es' && locale !== 'en') notFound();
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
