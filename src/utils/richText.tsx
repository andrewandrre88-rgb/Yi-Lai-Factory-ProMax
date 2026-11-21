import { ClipboardEvent, Fragment, ReactNode } from 'react';

function normalizeNewlines(text: string): string {
  return text.replace(/\r\n?/g, '\n');
}

function escapePipeCell(cell: string): string {
  return cell
    .replace(/\u00a0/g, ' ')
    .replace(/\s*\n+\s*/g, ' ')
    .replace(/\|/g, '\\|')
    .trim();
}

function serializeInlineNode(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) {
    return (node.textContent || '').replace(/\u00a0/g, ' ');
  }
  if (node.nodeType !== Node.ELEMENT_NODE) {
    return '';
  }

  const el = node as HTMLElement;
  const tag = el.tagName.toLowerCase();

  if (tag === 'br') return '\n';
  if (tag === 'script' || tag === 'style' || tag === 'meta' || tag === 'link') return '';

  const inner = Array.from(el.childNodes).map(serializeInlineNode).join('');

  if (tag === 'strong' || tag === 'b') {
    const fw = el.style?.fontWeight;
    if (fw === 'normal' || fw === '400') {
      return inner;
    }
    const trimmed = inner.trim();
    return trimmed ? `**${trimmed}**` : '';
  }
  if (tag === 'em' || tag === 'i') {
    const trimmed = inner.trim();
    return trimmed ? `*${trimmed}*` : '';
  }
  if (tag === 'span') {
    const fw = el.style?.fontWeight;
    const isBold = fw === 'bold' || (fw !== '' && Number(fw) >= 600);
    const isItalic = el.style?.fontStyle === 'italic';
    const trimmed = inner.trim();
    if (!trimmed) return '';
    let formatted = trimmed;
    if (isItalic) formatted = `*${formatted}*`;
    if (isBold) formatted = `**${formatted}**`;
    return formatted;
  }
  if (tag === 'code' && el.parentElement?.tagName.toLowerCase() !== 'pre') {
    const trimmed = inner.trim();
    return trimmed ? `\`${trimmed}\`` : '';
  }
  if (tag === 'a') {
    const href = (el.getAttribute('href') || '').trim();
    const label = inner.trim() || href;
    if (/^(https?:\/\/|mailto:)/i.test(href) && label !== href) {
      return `[${label}](${href})`;
    }
    return label;
  }
  if (tag === 'p' || tag === 'div' || tag === 'li') {
    return inner ? `${inner}\n` : '';
  }

  return inner;
}

function extractPreText(el: Node): string {
  if (el.nodeType === Node.TEXT_NODE) {
    return el.textContent || '';
  }
  if (el.nodeType !== Node.ELEMENT_NODE) return '';
  const htmlEl = el as HTMLElement;
  const tag = htmlEl.tagName.toLowerCase();
  if (tag === 'br') return '\n';
  const childText = Array.from(htmlEl.childNodes).map(extractPreText).join('');
  if (tag === 'div' || tag === 'p') {
    return childText.endsWith('\n') ? childText : `${childText}\n`;
  }
  return childText;
}

function serializeTableElement(table: HTMLElement): string {
  const rowEls = Array.from(table.querySelectorAll('tr'));
  if (rowEls.length === 0) return '';

  const matrix: string[][] = [];
  let hasExplicitHeader = false;

  rowEls.forEach((tr, rowIdx) => {
    const cells = Array.from(tr.children).filter(
      (c) => c.tagName.toLowerCase() === 'th' || c.tagName.toLowerCase() === 'td'
    ) as HTMLElement[];
    if (cells.length === 0) return;

    if (
      rowIdx === 0 &&
      (tr.closest('thead') !== null || cells.every((c) => c.tagName.toLowerCase() === 'th'))
    ) {
      hasExplicitHeader = true;
    }

    const rowValues: string[] = [];
    for (const cell of cells) {
      const text = escapePipeCell(serializeInlineNode(cell));
      const colspan = Math.max(1, Number.parseInt(cell.getAttribute('colspan') || '1', 10) || 1);
      rowValues.push(text);
      for (let i = 1; i < colspan; i++) {
        rowValues.push('');
      }
    }
    matrix.push(rowValues);
  });

  if (matrix.length === 0) return '';

  const maxCols = Math.max(...matrix.map((r) => r.length), 1);
  const padded = matrix.map((r) => {
    const next = [...r];
    while (next.length < maxCols) next.push('');
    return next;
  });

  // Always promote the first row as the Markdown table header so pasted Word/Excel tables render properly
  const header = padded[0];
  const separator = Array.from({ length: maxCols }, () => '---');
  const body = padded.slice(1);

  if (!hasExplicitHeader && body.length === 0) {
    return `| ${header.join(' | ')} |\n| ${separator.join(' | ')} |`;
  }

  const lines = [
    `| ${header.join(' | ')} |`,
    `| ${separator.join(' | ')} |`,
    ...body.map((r) => `| ${r.join(' | ')} |`),
  ];
  return lines.join('\n');
}

function serializeListElement(listEl: HTMLElement, ordered: boolean, depth = 0): string {
  const indent = '  '.repeat(depth);
  const items = Array.from(listEl.children).filter((c) => c.tagName.toLowerCase() === 'li');
  const lines: string[] = [];

  items.forEach((li, idx) => {
    const prefix = ordered ? `${idx + 1}. ` : '- ';
    const inlineParts: string[] = [];
    const nestedLists: string[] = [];

    Array.from(li.childNodes).forEach((child) => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        const cEl = child as HTMLElement;
        const cTag = cEl.tagName.toLowerCase();
        if (cTag === 'ul' || cTag === 'ol') {
          nestedLists.push(serializeListElement(cEl, cTag === 'ol', depth + 1));
          return;
        }
      }
      inlineParts.push(serializeInlineNode(child));
    });

    const text = inlineParts.join('').replace(/\s*\n+\s*/g, ' ').trim();
    if (text) {
      lines.push(`${indent}${prefix}${text}`);
    }
    nestedLists.forEach((nested) => {
      if (nested) lines.push(nested);
    });
  });

  return lines.join('\n');
}

function serializeBlockNodes(nodes: NodeListOf<ChildNode> | Node[]): string {
  const blocks: string[] = [];

  Array.from(nodes).forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const txt = (node.textContent || '').replace(/\u00a0/g, ' ');
      if (txt.trim()) {
        blocks.push(txt.trimEnd());
      }
      return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return;

    const el = node as HTMLElement;
    const tag = el.tagName.toLowerCase();

    if (tag === 'script' || tag === 'style' || tag === 'meta' || tag === 'link') return;

    if (tag === 'table') {
      const tbl = serializeTableElement(el);
      if (tbl) blocks.push(tbl);
      return;
    }

    if (tag === 'ul' || tag === 'ol') {
      const listStr = serializeListElement(el, tag === 'ol');
      if (listStr) blocks.push(listStr);
      return;
    }

    if (tag === 'pre') {
      const codeText = normalizeNewlines(extractPreText(el)).trimEnd();
      if (codeText) blocks.push(`\`\`\`\n${codeText}\n\`\`\``);
      return;
    }

    if (tag === 'blockquote') {
      const inner = serializeBlockNodes(el.childNodes).trim();
      if (inner) {
        blocks.push(
          inner
            .split('\n')
            .map((line) => (line.trim() ? `> ${line}` : '>'))
            .join('\n')
        );
      }
      return;
    }

    if (/^h[1-6]$/.test(tag)) {
      const level = Math.min(4, Number.parseInt(tag.slice(1), 10) || 2);
      const headingText = serializeInlineNode(el).replace(/\s*\n+\s*/g, ' ').trim();
      if (headingText) {
        blocks.push(`${'#'.repeat(level)} ${headingText}`);
      }
      return;
    }

    if (tag === 'hr') {
      blocks.push('---');
      return;
    }

    // If a container (div/section/article/body) contains block children (tables/lists/p/headings/divs), recurse
    const hasBlockChildren = Array.from(el.children).some((c) =>
      /^(table|ul|ol|p|div|section|article|blockquote|pre|h[1-6]|hr)$/i.test(c.tagName)
    );
    if (hasBlockChildren) {
      const nested = serializeBlockNodes(el.childNodes);
      if (nested) blocks.push(nested);
      return;
    }

    const inline = serializeInlineNode(el).replace(/\u00a0/g, ' ').trimEnd();
    if (inline.trim()) {
      blocks.push(inline);
    }
  });

  return blocks.join('\n\n');
}

export function extractPreservedClipboardText(e: ClipboardEvent<HTMLTextAreaElement>): string | null {
  const html = e.clipboardData?.getData('text/html') || '';
  const plain = normalizeNewlines(e.clipboardData?.getData('text/plain') || '');

  const hasHtmlTable = /<table\b/i.test(html);
  const plainLooksLikeMarkdownTableOrTsv =
    /(^|\n)\s*\|.+\|/.test(plain) || /(^|\n)[^\n]*\t[^\n]*\n[^\n]*\t/.test(plain);

  // If plain text already contains Markdown pipe tables or TSV columns and clipboard HTML has no <table>,
  // keep plain text verbatim so copied Markdown/code tables are never altered.
  if (plainLooksLikeMarkdownTableOrTsv && !hasHtmlTable) {
    return plain;
  }

  const hasRichStructure = /<(table|tr|td|th|thead|tbody|ul|ol|li|h[1-6]|blockquote|pre|strong|b|em|i|p|div)\b/i.test(
    html
  );

  if (html && hasRichStructure && typeof DOMParser !== 'undefined') {
    try {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const serialized = normalizeNewlines(serializeBlockNodes(doc.body.childNodes)).trim();
      if (serialized) {
        return serialized;
      }
    } catch {
      // Fall back to plain text below
    }
  }

  return plain || null;
}

export function applyTextareaPaste(
  e: ClipboardEvent<HTMLTextAreaElement>,
  currentValue: string,
  onChangeValue: (nextVal: string) => void
): void {
  const preserved = extractPreservedClipboardText(e);
  if (preserved === null) return;

  e.preventDefault();
  const target = e.currentTarget;
  const start = target.selectionStart ?? currentValue.length;
  const end = target.selectionEnd ?? currentValue.length;
  const nextValue = currentValue.slice(0, start) + preserved + currentValue.slice(end);
  const nextCursor = start + preserved.length;

  onChangeValue(nextValue);

  window.requestAnimationFrame(() => {
    target.focus();
    target.setSelectionRange(nextCursor, nextCursor);
  });
}

function renderInlineFormatted(text: string): ReactNode[] {
  const tokens = text.split(/(\*\*[^*]+\*\*|\*[^*\n]+\*|`[^`\n]+`|\[[^\]]+\]\([^)]+\))/g);
  return tokens.map((part, idx) => {
    if (!part) return null;
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={idx} className="font-bold text-[#0B1B3E]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return (
        <em key={idx} className="italic">
          {part.slice(1, -1)}
        </em>
      );
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code
          key={idx}
          className="px-1.5 py-0.5 rounded bg-slate-100 text-[#0B1B3E] font-mono text-[0.9em]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      if (/^(https?:\/\/|mailto:)/i.test(href.trim())) {
        return (
          <a
            key={idx}
            href={href.trim()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#155EEF] underline hover:text-[#0B1B3E]"
          >
            {label}
          </a>
        );
      }
      return <Fragment key={idx}>{label}</Fragment>;
    }
    return <Fragment key={idx}>{part}</Fragment>;
  });
}

function splitPipeRow(line: string): string[] {
  const trimmed = line.trim();
  const stripped = trimmed.replace(/^\|/, '').replace(/\|$/, '');
  const cells: string[] = [];
  let current = '';
  for (let i = 0; i < stripped.length; i++) {
    if (stripped[i] === '\\' && stripped[i + 1] === '|') {
      current += '|';
      i += 1;
    } else if (stripped[i] === '|') {
      cells.push(current.trim());
      current = '';
    } else {
      current += stripped[i];
    }
  }
  cells.push(current.trim());
  return cells;
}

function isPipeSeparatorLine(line: string): boolean {
  const trimmed = line.trim();
  return /^\|?(\s*:?-{2,}:?\s*\|)+\s*:?-{2,}:?\s*\|?$/.test(trimmed) || /^\|(\s*:?-{2,}:?\s*\|)+$/.test(trimmed);
}

function isPipeTableLine(line: string): boolean {
  const t = line.trim();
  return t.includes('|') && (t.startsWith('|') || t.endsWith('|') || (t.match(/\|/g)?.length ?? 0) >= 2);
}

function renderStyledTable(headers: string[] | null, rows: string[][], key: number): ReactNode {
  const colCount = Math.max(
    headers?.length ?? 0,
    ...rows.map((r) => r.length),
    1
  );

  return (
    <div
      key={key}
      className="my-2 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs"
    >
      <table className="w-full min-w-[420px] border-collapse text-start text-xs sm:text-sm">
        {headers && headers.length > 0 && (
          <thead className="bg-[#F4F8FE] border-b border-slate-200">
            <tr>
              {Array.from({ length: colCount }, (_, cIdx) => (
                <th
                  key={cIdx}
                  className="px-4 py-3 text-start font-display font-bold text-[#0B1B3E] border-e last:border-e-0 border-slate-200/80 whitespace-nowrap"
                >
                  {renderInlineFormatted(headers[cIdx] ?? '')}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className="divide-y divide-slate-200/80">
          {rows.map((row, rIdx) => (
            <tr key={rIdx} className={rIdx % 2 === 1 ? 'bg-[#FAFBFD]' : 'bg-white'}>
              {Array.from({ length: colCount }, (_, cIdx) => (
                <td
                  key={cIdx}
                  className="px-4 py-2.5 text-slate-700 border-e last:border-e-0 border-slate-100 align-top whitespace-pre-wrap"
                >
                  {renderInlineFormatted(row[cIdx] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function FormattedRichContent({
  text,
  variant = 'article',
  middleSlot,
}: {
  text: string;
  variant?: 'article' | 'excerpt';
  middleSlot?: ReactNode;
}) {
  const lines = normalizeNewlines(text).split('\n');
  const elements: ReactNode[] = [];
  const headingIndices = new Set<number>();
  let i = 0;
  let blockKey = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i += 1;
      continue;
    }

    // Fenced code block
    if (trimmed.startsWith('```')) {
      const codeLines: string[] = [];
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i += 1;
      }
      if (i < lines.length) i += 1;
      elements.push(
        <pre
          key={blockKey++}
          className="overflow-x-auto rounded-2xl bg-[#0B1B3E] text-slate-100 p-4 font-mono text-xs sm:text-sm leading-relaxed"
        >
          <code>{codeLines.join('\n')}</code>
        </pre>
      );
      continue;
    }

    // Markdown pipe table (requires separator line OR at least 2 consecutive pipe rows)
    if (
      isPipeTableLine(line) &&
      ((i + 1 < lines.length && isPipeSeparatorLine(lines[i + 1])) ||
        (i + 1 < lines.length && isPipeTableLine(lines[i + 1])))
    ) {
      const tableLines: string[] = [];
      while (i < lines.length && isPipeTableLine(lines[i])) {
        tableLines.push(lines[i]);
        i += 1;
      }

      if (tableLines.length >= 2 && isPipeSeparatorLine(tableLines[1])) {
        const headers = splitPipeRow(tableLines[0]);
        const bodyRows = tableLines
          .slice(2)
          .filter((l) => !isPipeSeparatorLine(l))
          .map(splitPipeRow);
        elements.push(renderStyledTable(headers, bodyRows, blockKey++));
      } else {
        const allRows = tableLines.filter((l) => !isPipeSeparatorLine(l)).map(splitPipeRow);
        elements.push(renderStyledTable(allRows[0] ?? null, allRows.slice(1), blockKey++));
      }
      continue;
    }

    // Tab-separated (TSV) table (2+ consecutive lines containing tabs)
    if (line.includes('\t') && i + 1 < lines.length && lines[i + 1].includes('\t')) {
      const tsvRows: string[][] = [];
      while (i < lines.length && lines[i].includes('\t')) {
        tsvRows.push(lines[i].split('\t').map((cell) => cell.trim()));
        i += 1;
      }
      elements.push(renderStyledTable(tsvRows[0] ?? null, tsvRows.slice(1), blockKey++));
      continue;
    }

    // Horizontal rule
    if (/^---+$/.test(trimmed)) {
      elements.push(<hr key={blockKey++} className="border-slate-200 my-2" />);
      i += 1;
      continue;
    }

    // Headings
    const headingMatch = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const content = headingMatch[2];
      const headingClass =
        level === 1
          ? 'font-display font-extrabold text-2xl sm:text-3xl text-[#0B1B3E] pt-2'
          : level === 2
          ? 'font-display font-extrabold text-xl sm:text-2xl text-[#0B1B3E] pt-2'
          : 'font-display font-bold text-lg text-[#0B1B3E] pt-1';
      headingIndices.add(elements.length);
      elements.push(
        <h2 key={blockKey++} className={headingClass}>
          {renderInlineFormatted(content)}
        </h2>
      );
      i += 1;
      continue;
    }

    // Blockquote
    if (trimmed.startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i += 1;
      }
      elements.push(
        <blockquote
          key={blockKey++}
          className="border-s-4 border-[#155EEF] bg-[#F8FAFE] px-4 py-3 rounded-e-xl text-sm sm:text-base text-slate-700 italic whitespace-pre-wrap"
        >
          {renderInlineFormatted(quoteLines.join('\n'))}
        </blockquote>
      );
      continue;
    }

    // Unordered list
    if (/^\s*[-*•]\s+/.test(line)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\s*[-*•]\s+/.test(lines[i])) {
        listItems.push(lines[i].replace(/^\s*[-*•]\s+/, ''));
        i += 1;
      }
      elements.push(
        <ul
          key={blockKey++}
          className="list-disc ps-6 space-y-1.5 text-sm sm:text-base text-slate-700 leading-relaxed"
        >
          {listItems.map((item, idx) => (
            <li key={idx}>{renderInlineFormatted(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        listItems.push(lines[i].replace(/^\s*\d+\.\s+/, ''));
        i += 1;
      }
      elements.push(
        <ol
          key={blockKey++}
          className="list-decimal ps-6 space-y-1.5 text-sm sm:text-base text-slate-700 leading-relaxed"
        >
          {listItems.map((item, idx) => (
            <li key={idx}>{renderInlineFormatted(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // Standard paragraph block (preserves single line breaks & spacing inside paragraph)
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].trim().startsWith('```') &&
      !lines[i].trim().startsWith('>') &&
      !/^#{1,4}\s+/.test(lines[i].trim()) &&
      !/^\s*[-*•]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i]) &&
      !(isPipeTableLine(lines[i]) && i + 1 < lines.length && (isPipeSeparatorLine(lines[i + 1]) || isPipeTableLine(lines[i + 1]))) &&
      !(lines[i].includes('\t') && i + 1 < lines.length && lines[i + 1].includes('\t'))
    ) {
      paraLines.push(lines[i]);
      i += 1;
    }

    const pClass =
      variant === 'excerpt'
        ? 'text-base sm:text-lg text-slate-600 leading-relaxed whitespace-pre-wrap'
        : 'text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-wrap';

    elements.push(
      <p key={blockKey++} className={pClass}>
        {renderInlineFormatted(paraLines.join('\n'))}
      </p>
    );
  }

  let finalNodes = elements;
  if (middleSlot) {
    if (elements.length === 0) {
      finalNodes = [<Fragment key="middle-slot">{middleSlot}</Fragment>];
    } else if (elements.length === 1) {
      finalNodes = [elements[0], <Fragment key="middle-slot">{middleSlot}</Fragment>];
    } else {
      let splitIdx = Math.ceil(elements.length / 2);
      if (headingIndices.has(splitIdx - 1) && splitIdx < elements.length) {
        splitIdx += 1;
      }
      finalNodes = [
        ...elements.slice(0, splitIdx),
        <Fragment key="middle-slot">{middleSlot}</Fragment>,
        ...elements.slice(splitIdx),
      ];
    }
  }

  return <div className={variant === 'excerpt' ? 'space-y-3' : 'space-y-5'}>{finalNodes}</div>;
}

export function toPlainSummary(text: string): string {
  return normalizeNewlines(text)
    .replace(/\|/g, ' ')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*`>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
