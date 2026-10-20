import type { CSSProperties } from 'react';
export function Arrow({
  diagonal = false,
  className = '',
}: {
  diagonal?: boolean;
  className?: string;
}) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={`icon ${className}`}>
      <path
        d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h15m-6-6 6 6-6 6'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function Mark({
  value,
  className = '',
  style,
}: {
  value: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span className={`lettermark ${className}`} style={style} aria-hidden="true">
      {value}
    </span>
  );
}
