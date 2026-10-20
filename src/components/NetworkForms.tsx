/* Deterministic SVG geometry keeps server output and hydration identical. */
const constellation = Array.from({ length: 27 }, (_, i) => ({
  x: 40 + ((i * 137 + (i % 3) * 29) % 510),
  y: 45 + ((i * 89 + (i % 4) * 37) % 400),
}));
const layers = [3, 5, 4, 3].map((count, column) =>
  Array.from({ length: count }, (_, row) => ({
    x: 55 + column * 125,
    y: 250 + (row - (count - 1) / 2) * 73,
  })),
);

export function NetworkForms() {
  return (
    <>
      <svg
        className="abstract-form abstract-network"
        viewBox="0 0 600 500"
        fill="none"
        focusable="false"
      >
        {constellation.flatMap((a, i) =>
          constellation.slice(i + 1).map((b, j) => {
            const distance = Math.hypot(a.x - b.x, a.y - b.y);
            return distance < 155 ? (
              <line
                key={`${i}-${j}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                opacity={1 - distance / 230}
              />
            ) : null;
          }),
        )}
        {constellation.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={i % 5 === 0 ? 5 : 2.7} fill="currentColor" stroke="none" />
            {i % 5 === 0 && <circle className="network-halo" cx={p.x} cy={p.y} r="12" />}
          </g>
        ))}
        <path className="network-signal" d="M 40 45 L 206 171 L 343 260 L 509 386" />
      </svg>
      <svg
        className="abstract-form abstract-neurons"
        viewBox="0 0 500 500"
        fill="none"
        focusable="false"
      >
        {layers
          .slice(0, -1)
          .flatMap((layer, i) =>
            layer.flatMap((a, j) =>
              layers[i + 1].map((b, k) => (
                <path
                  key={`${i}-${j}-${k}`}
                  d={`M ${a.x} ${a.y} C ${a.x + 65} ${a.y}, ${b.x - 65} ${b.y}, ${b.x} ${b.y}`}
                  opacity="0.55"
                />
              )),
            ),
          )}
        {layers.flatMap((layer, i) =>
          layer.map((p, j) => (
            <g key={`${i}-${j}`}>
              <circle cx={p.x} cy={p.y} r="9" fill="var(--paper)" />
              <circle cx={p.x} cy={p.y} r="2.5" fill="currentColor" stroke="none" />
            </g>
          )),
        )}
        <path
          className="network-signal"
          d="M 55 250 C 120 250 115 177 180 177 S 240 213.5 305 213.5 S 365 250 430 250"
        />
      </svg>
      <svg
        className="abstract-form abstract-mesh"
        viewBox="0 0 500 400"
        fill="none"
        focusable="false"
      >
        {Array.from({ length: 8 }, (_, row) => (
          <polyline
            key={`r${row}`}
            points={Array.from(
              { length: 9 },
              (_, col) =>
                `${40 + col * 52},${65 + row * 36 + Math.sin(col * 0.65 + row * 0.5) * 30}`,
            ).join(' ')}
          />
        ))}
        {Array.from({ length: 9 }, (_, col) => (
          <polyline
            key={`c${col}`}
            points={Array.from(
              { length: 8 },
              (_, row) =>
                `${40 + col * 52},${65 + row * 36 + Math.sin(col * 0.65 + row * 0.5) * 30}`,
            ).join(' ')}
          />
        ))}
        {Array.from({ length: 12 }, (_, i) => {
          const col = (i * 3) % 9,
            row = Math.floor(i / 3) * 2;
          return (
            <circle
              key={i}
              cx={40 + col * 52}
              cy={65 + row * 36 + Math.sin(col * 0.65 + row * 0.5) * 30}
              r="3"
              fill="currentColor"
            />
          );
        })}
      </svg>
      <svg
        className="abstract-form abstract-hub"
        viewBox="0 0 400 400"
        fill="none"
        focusable="false"
      >
        {[64, 120, 170].map((r) => (
          <circle
            key={r}
            cx="200"
            cy="200"
            r={r}
            strokeDasharray={r === 120 ? '3 9' : undefined}
            opacity="0.6"
          />
        ))}
        {Array.from({ length: 10 }, (_, i) => {
          const angle = (i * Math.PI) / 5;
          const x = 200 + Math.cos(angle) * (i % 2 ? 120 : 170);
          const y = 200 + Math.sin(angle) * (i % 2 ? 120 : 170);
          return (
            <g key={i}>
              <path
                d={`M 200 200 Q ${200 + Math.cos(angle + 0.4) * 80} ${200 + Math.sin(angle + 0.4) * 80} ${x} ${y}`}
              />
              <circle cx={x} cy={y} r="5" fill="var(--paper)" />
            </g>
          );
        })}
        <circle cx="200" cy="200" r="12" />
        <circle cx="200" cy="200" r="4" fill="currentColor" />
      </svg>
    </>
  );
}
