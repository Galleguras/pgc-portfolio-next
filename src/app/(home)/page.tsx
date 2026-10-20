import { Portfolio } from '@/components/Portfolio';
import { getContent } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata('es', 'editorial');
export default function Home() {
  return <Portfolio locale="es" version="editorial" {...getContent('es')} />;
}
