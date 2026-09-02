import React from 'react';

type InlineNode = { type: 'text'; text: string } | { type: 'code'; text: string } | { type: 'bold'; children: InlineNode[] } | { type: 'italic'; children: InlineNode[] } | { type: 'link'; href: string; children: InlineNode[] } | { type: 'image'; src: string; alt: string };

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function parseInline(text: string): InlineNode[] {
  const nodes: InlineNode[] = [];
  const pattern = /(`[^`]+`)|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(!\[([^\]]*)\]\(([^)\s]+)\))|(\[([^\]]+)\]\(([^)\s]+)\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push({ type: 'text', text: escapeHtml(text.slice(lastIndex, match.index)) });
    }
    if (match[1] !== undefined) {
      nodes.push({ type: 'code', text: escapeHtml(match[1].slice(1, -1)) });
    } else if (match[3] !== undefined) {
      nodes.push({ type: 'bold', children: parseInline(match[3]) });
    } else if (match[5] !== undefined) {
      nodes.push({ type: 'italic', children: parseInline(match[5]) });
    } else if (match[6] !== undefined) {
      nodes.push({ type: 'image', src: match[8], alt: match[7] });
    } else if (match[9] !== undefined) {
      nodes.push({ type: 'link', href: match[11], children: parseInline(match[10]) });
    }
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < text.length) {
    nodes.push({ type: 'text', text: escapeHtml(text.slice(lastIndex)) });
  }
  return nodes;
}

function renderInline(nodes: InlineNode[], keyBase: string): React.ReactNode[] {
  return nodes.map((node, i) => {
    const key = `${keyBase}-${i}`;
    switch (node.type) {
      case 'text': return <span key={key}>{node.text}</span>;
      case 'code': return <code key={key} className="rounded bg-secondary px-1 py-0.5 font-mono text-[0.85em]">{node.text}</code>;
      case 'bold': return <strong key={key}>{renderInline(node.children, key)}</strong>;
      case 'italic': return <em key={key}>{renderInline(node.children, key)}</em>;
      case 'link': return (
        <a key={key} href={node.href} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">
          {renderInline(node.children, key)}
        </a>
      );
      case 'image': return <img key={key} src={node.src} alt={node.alt} className="my-2 rounded-md border border-border" />;
      default: return null;
    }
  });
}

type Block =
  | { type: 'h'; level: number; text: string }
  | { type: 'p'; text: string }
  | { type: 'code'; lang: string; code: string }
  | { type: 'quote'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'hr' };

function splitTableRow(line: string): string[] {
  const trimmed = line.trim();
  const inner = trimmed.replace(/^\|/, '').replace(/\|$/, '');
  return inner.split('|').map((cell) => cell.trim());
}

function isTableSeparator(line: string): boolean {
  return /^\s*\|?[\s:|-]+\|?\s*$/.test(line) && line.includes('-');
}

function parseBlocks(content: string): Block[] {
  const lines = content.split('\n');
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === '') {
      i += 1;
      continue;
    }

    if (line.trim() === '---' || line.trim() === '***' || line.trim() === '___') {
      blocks.push({ type: 'hr' });
      i += 1;
      continue;
    }

    const fenced = /^```(\w*)\s*$/.exec(line.trim());
    if (fenced) {
      const lang = fenced[1] ?? '';
      const codeLines: string[] = [];
      i += 1;
      while (i < lines.length && !/^```\s*$/.test(lines[i].trim())) {
        codeLines.push(lines[i]);
        i += 1;
      }
      i += 1;
      blocks.push({ type: 'code', lang, code: codeLines.join('\n') });
      continue;
    }

    const heading = /^(#{1,6})\s+(.*)$/.exec(line);
    if (heading) {
      blocks.push({ type: 'h', level: heading[1].length, text: heading[2] });
      i += 1;
      continue;
    }

    if (line.trim().startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i += 1;
      }
      blocks.push({ type: 'quote', text: quoteLines.join(' ') });
      continue;
    }

    const ulMatch = /^\s*[-*+]\s+(.*)$/.exec(line);
    if (ulMatch) {
      const items: string[] = [ulMatch[1]];
      i += 1;
      while (i < lines.length) {
        const m = /^\s*[-*+]\s+(.*)$/.exec(lines[i]);
        if (m) { items.push(m[1]); i += 1; } else break;
      }
      blocks.push({ type: 'ul', items });
      continue;
    }

    const olMatch = /^\s*\d+\.\s+(.*)$/.exec(line);
    if (olMatch) {
      const items: string[] = [olMatch[1]];
      i += 1;
      while (i < lines.length) {
        const m = /^\s*\d+\.\s+(.*)$/.exec(lines[i]);
        if (m) { items.push(m[1]); i += 1; } else break;
      }
      blocks.push({ type: 'ol', items });
      continue;
    }

    if (line.trim().startsWith('|') && i + 1 < lines.length && isTableSeparator(lines[i + 1])) {
      const headers = splitTableRow(line);
      const rows: string[][] = [];
      i += 2;
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        rows.push(splitTableRow(lines[i]));
        i += 1;
      }
      blocks.push({ type: 'table', headers, rows });
      continue;
    }

    const paraLines: string[] = [line];
    i += 1;
    while (i < lines.length && lines[i].trim() !== '' && !lines[i].trim().startsWith('#') && !/^```/.test(lines[i].trim()) && !lines[i].trim().startsWith('>')) {
      paraLines.push(lines[i]);
      i += 1;
    }
    blocks.push({ type: 'p', text: paraLines.join(' ') });
  }

  return blocks;
}

export function Markdown({ content }: { content: string }) {
  const blocks = parseBlocks(content);
  return (
    <div className="space-y-3 text-sm leading-relaxed">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h':
            if (block.level === 1) return <h1 key={i} className="text-2xl font-bold">{renderInline(parseInline(block.text), `h-${i}`)}</h1>;
            if (block.level === 2) return <h2 key={i} className="mt-4 text-xl font-bold">{renderInline(parseInline(block.text), `h-${i}`)}</h2>;
            if (block.level === 3) return <h3 key={i} className="mt-3 text-lg font-semibold">{renderInline(parseInline(block.text), `h-${i}`)}</h3>;
            return <h4 key={i} className="mt-2 font-semibold">{renderInline(parseInline(block.text), `h-${i}`)}</h4>;
          case 'p':
            return <p key={i}>{renderInline(parseInline(block.text), `p-${i}`)}</p>;
          case 'code':
            return (
              <pre key={i} className="overflow-x-auto rounded-md bg-secondary p-3 font-mono text-xs" data-lang={block.lang}>
                {escapeHtml(block.code)}
              </pre>
            );
          case 'quote':
            return <blockquote key={i} className="border-l-2 border-primary pl-3 text-muted-foreground">{renderInline(parseInline(block.text), `q-${i}`)}</blockquote>;
          case 'ul':
            return (
              <ul key={i} className="list-disc space-y-1 pl-5">
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(parseInline(item), `ul-${i}-${j}`)}</li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={i} className="list-decimal space-y-1 pl-5">
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(parseInline(item), `ol-${i}-${j}`)}</li>
                ))}
              </ol>
            );
          case 'table':
            return (
              <div key={i} className="overflow-x-auto rounded-md border border-border">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-secondary">
                      {block.headers.map((h, j) => (
                        <th key={j} className="border-b border-border px-3 py-2 text-left font-medium">{escapeHtml(h)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j} className="border-b border-border last:border-0">
                        {row.map((cell, k) => (
                          <td key={k} className="px-3 py-2">{renderInline(parseInline(cell), `t-${i}-${j}-${k}`)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case 'hr':
            return <hr key={i} className="border-border" />;
        }
      })}
    </div>
  );
}