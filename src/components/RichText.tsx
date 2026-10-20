import { Fragment } from 'react';
export function RichText({ text }: { text: string }) {
  return (
    <div className="rich-text">
      {text
        .trim()
        .split(/\n\s*\n/)
        .map((block, index) => {
          const trimmed = block.trim();
          if (/^\*\*[^*]+\*\*$/.test(trimmed)) return <h4 key={index}>{trimmed.slice(2, -2)}</h4>;
          return (
            <p key={index}>
              {trimmed
                .split(/(\*\*[^*]+\*\*)/g)
                .map((part, i) =>
                  part.startsWith('**') ? (
                    <strong key={i}>{part.slice(2, -2)}</strong>
                  ) : (
                    <Fragment key={i}>{part}</Fragment>
                  ),
                )}
            </p>
          );
        })}
    </div>
  );
}
