'use client';
import { useEffect, useRef } from 'react';
import type { Version } from '@/lib/types';
import { NetworkForms } from './NetworkForms';

/** Progressive enhancement: no hidden content without JS or with reduced motion. */
export function VisualEffects({ version }: { version: Version }) {
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = progress.current?.closest('.portfolio');
    if (!root) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) return;
    let frame = 0;
    const nativeTimeline = CSS.supports('animation-timeline', 'scroll()');
    const update = () => {
      frame = 0;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = total > 0 ? Math.max(0, Math.min(1, window.scrollY / total)) : 0;
      if (!nativeTimeline && progress.current)
        progress.current.style.transform = `scaleX(${ratio})`;
      if (version === 'editorial') {
        (root as HTMLElement).style.setProperty('--scene-scroll', `${ratio * 180}px`);
        (root as HTMLElement).style.setProperty('--scene-turn', `${ratio * 12}deg`);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    if (!nativeTimeline || version === 'editorial') {
      window.addEventListener('scroll', onScroll, { passive: true });
      update();
    }
    let observer: IntersectionObserver | undefined;
    const targets: Element[] = [];
    if (version === 'editorial' && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries)
            if (entry.isIntersecting) {
              entry.target.classList.remove('reveal-pending');
              entry.target.classList.add('reveal-visible');
              observer?.unobserve(entry.target);
            }
        },
        { threshold: 0.08, rootMargin: '0px 0px -24px 0px' },
      );
      root
        .querySelectorAll(
          '.about .section-heading, .about-body, .toolkit, .experience > .section-heading, .experience-card, .learning-heading, .course-card, .contact-grid > div',
        )
        .forEach((el, index) => {
          // First viewport content is never concealed, even briefly.
          if (el.getBoundingClientRect().top < window.innerHeight * 0.95) return;
          el.classList.add('reveal-pending');
          (el as HTMLElement).style.setProperty(
            '--reveal-delay',
            `${Math.min(index % 3, 2) * 45}ms`,
          );
          targets.push(el);
          observer?.observe(el);
        });
    }
    const stopMotion = () => {
      if (!reduced.matches) return;
      observer?.disconnect();
      targets.forEach((el) => el.classList.remove('reveal-pending'));
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
      (root as HTMLElement).style.removeProperty('--scene-scroll');
      (root as HTMLElement).style.removeProperty('--scene-turn');
    };
    reduced.addEventListener('change', stopMotion);
    return () => {
      observer?.disconnect();
      targets.forEach((el) => el.classList.remove('reveal-pending'));
      window.removeEventListener('scroll', onScroll);
      reduced.removeEventListener('change', stopMotion);
      cancelAnimationFrame(frame);
      (root as HTMLElement).style.removeProperty('--scene-scroll');
      (root as HTMLElement).style.removeProperty('--scene-turn');
    };
  }, [version]);
  return (
    <>
      <div ref={progress} className="reading-progress" aria-hidden="true" />
      {version === 'editorial' && (
        <div className="abstract-scene" aria-hidden="true">
          <NetworkForms />
          <svg
            className="abstract-form abstract-orbit"
            viewBox="0 0 600 600"
            fill="none"
            focusable="false"
          >
            <g transform="translate(300 300) rotate(-28)">
              {Array.from({ length: 11 }, (_, i) => (
                <ellipse key={i} rx={85 + i * 15} ry={215 - i * 7} transform={`rotate(${i * 9})`} />
              ))}
            </g>
          </svg>
          <svg
            className="abstract-form abstract-ribbon"
            viewBox="0 0 640 640"
            fill="none"
            focusable="false"
          >
            {Array.from({ length: 14 }, (_, i) => (
              <path
                key={i}
                d={`M ${65 + i * 10} 560 C ${520 - i * 10} 540, ${80 + i * 8} 120, ${490 + i * 6} 60`}
              />
            ))}
          </svg>
          <svg
            className="abstract-form abstract-sphere"
            viewBox="0 0 400 400"
            fill="none"
            focusable="false"
          >
            <g transform="translate(200 200) rotate(24)">
              <circle r="165" />
              {[30, 65, 100, 135].map((r) => (
                <ellipse key={r} rx={r} ry="165" />
              ))}
              {[-110, -55, 0, 55, 110].map((y) => (
                <ellipse key={y} cx="0" cy={y} rx={Math.sqrt(165 ** 2 - y ** 2)} ry="22" />
              ))}
            </g>
          </svg>
        </div>
      )}
    </>
  );
}
