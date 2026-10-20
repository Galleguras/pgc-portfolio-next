import { notFound } from 'next/navigation';
import { Portfolio } from '@/components/Portfolio';
import { getContent } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';
export const dynamicParams = false;
export function generateStaticParams() {
  return ['es', 'en'].flatMap((locale) =>
    ['editorial', 'clasico'].map((version) => ({ locale, version })),
  );
}
async function validated(params: Promise<{ locale: string; version: string }>) {
  const { locale, version } = await params;
  if ((locale !== 'es' && locale !== 'en') || (version !== 'editorial' && version !== 'clasico'))
    notFound();
  return { locale, version } as const;
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; version: string }>;
}) {
  const { locale, version } = await validated(params);
  return pageMetadata(locale, version);
}
export default async function VersionPage({
  params,
}: {
  params: Promise<{ locale: string; version: string }>;
}) {
  const { locale, version } = await validated(params);
  return <Portfolio locale={locale} version={version} {...getContent(locale)} />;
}
