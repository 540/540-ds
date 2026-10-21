import type { ReactNode } from 'react';
import type { DocsContainerProps } from '@storybook/addon-docs/blocks';
import logo from '../src/assets/logo-540.svg?raw';

/* Level label shown above the title of every docs page, as in the design file. */
const KICKERS: Record<string, string> = {
  introducción: 'INTRODUCCIÓN',
  fundamentos: 'FUNDAMENTO',
  átomos: 'ÁTOMO',
  moléculas: 'MOLÉCULA',
  organismos: 'ORGANISMO',
};

function kickerFromTitle(title: string): string {
  const parts = title.split('/');
  const level = (parts[0] ?? '').trim().toLowerCase();
  const name = (parts[parts.length - 1] ?? '').trim();
  return `${KICKERS[level] ?? level.toUpperCase()} · ${name.toUpperCase()}`;
}

/** Reads the page title: from the attached stories, or from the docs entry itself for MDX-only pages. */
function titleFor(context: DocsContainerProps['context']): string {
  try {
    const fromStories = context.componentStories()[0]?.title;
    if (fromStories) return fromStories;
  } catch {
    /* unattached MDX page */
  }
  try {
    const id = new URLSearchParams(window.location.search).get('id') ?? '';
    const entry = (context as unknown as { storyIdToCSFFile?: never; store?: { storyIndex?: { entries?: Record<string, { title?: string }> } } })?.store?.storyIndex?.entries?.[id];
    if (entry?.title) return entry.title;
  } catch {
    /* ignore */
  }
  return '';
}

/** Cover of every docs page: level kicker on the left, 540 logo on the right. Inline styles on purpose. */
export function DocsCover({ context }: { context: DocsContainerProps['context'] }): ReactNode {
  const title = titleFor(context);
  if (!title) return null;

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
        marginBottom: 32,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--text-micro-bold-size)',
          fontWeight: 'var(--text-micro-bold-weight)' as unknown as number,
          letterSpacing: '0.08em',
          color: 'var(--color-text-secondary)',
        }}
      >
        {kickerFromTitle(title)}
      </span>
      <span
        aria-label="540"
        role="img"
        style={{ display: 'block', height: 'var(--size-logo-xs)', width: 'auto', marginLeft: 'auto', flex: '0 0 auto', color: 'var(--color-text-primary)' }}
        // The logo is our own static SVG, not user content
        dangerouslySetInnerHTML={{ __html: logo.replace('<svg ', '<svg style="height:100%;width:auto;display:block" ') }}
      />
    </div>
  );
}
