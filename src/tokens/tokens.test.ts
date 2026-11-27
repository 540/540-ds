import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { BREAKPOINTS, DESIGN_WIDTHS, MEDIA } from './breakpoints';
import {
  colorPrimitives,
  effectTokens,
  gridTokens,
  paddingTokens,
  radiusTokens,
  semanticColors,
  sizeTokens,
  spacingTokens,
  textStyles,
} from './manifest';

const TOKEN_FILES = ['primitives.css', 'semantic-color.css', 'semantic-typography.css', 'semantic-measure.css'];
const css = TOKEN_FILES.map((file) => readFileSync(path.join(import.meta.dirname, file), 'utf8')).join('\n');

/** Custom properties the token CSS declares (`--name:`), not the ones it only reads. */
const declared = new Set(Array.from(css.matchAll(/(--[a-z0-9-]+)\s*:/gi), (m) => m[1]));

describe('breakpoints', () => {
  it('sets the tablet and desktop breakpoints at 600 and 1024 px', () => {
    expect(BREAKPOINTS).toEqual({ tablet: 600, desktop: 1024 });
  });

  it('designs each range at 375, 768 and 1440 px', () => {
    expect(DESIGN_WIDTHS).toEqual({ mobile: 375, tablet: 768, desktop: 1440 });
  });

  it('builds each media query as min-width of its breakpoint', () => {
    expect(MEDIA).toEqual({ tablet: '(min-width: 600px)', desktop: '(min-width: 1024px)' });
  });
});

describe('token manifest', () => {
  it('names only color primitives the CSS declares', () => {
    const names = colorPrimitives.flatMap((group) => group.items.map((item) => item.name));
    expect(names.length).toBeGreaterThan(0);
    expect(names.filter((name) => !declared.has(name))).toEqual([]);
  });

  it('names semantic colors and their light and dark aliases the CSS declares', () => {
    const names = semanticColors.flatMap((group) => group.items.flatMap((item) => [item.name, item.light, item.dark]));
    expect(names.filter((name) => !declared.has(name))).toEqual([]);
  });

  it('gives every text style the size, weight, line-height and letter-spacing tokens', () => {
    const names = textStyles.flatMap((style) =>
      ['size', 'weight', 'line-height', 'letter-spacing'].map((part) => `${style.tokenPrefix}-${part}`),
    );
    expect(names.filter((name) => !declared.has(name))).toEqual([]);
  });

  it('names effect tokens and their light and dark aliases the CSS declares', () => {
    const names = effectTokens.flatMap((token) => [token.name, token.light, token.dark]);
    expect(names.filter((name) => !declared.has(name))).toEqual([]);
  });

  it('names only measure tokens the CSS declares', () => {
    const names = [...spacingTokens, ...paddingTokens, ...gridTokens, ...sizeTokens, ...radiusTokens].map((t) => t.name);
    expect(names.filter((name) => !declared.has(name))).toEqual([]);
  });
});
