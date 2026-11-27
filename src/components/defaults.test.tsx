import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Button } from './atoms/Button';
import { BUTTON_DEFAULTS, BUTTON_SIZES, BUTTON_VARIANTS } from './atoms/Button/types';
import { Text } from './atoms/Text';
import { TEXT_DEFAULTS, TEXT_ELEMENTS, TEXT_MEASURES, TEXT_TONES, TEXT_VARIANTS, TEXT_WRAPS } from './atoms/Text/types';

type TypesModule = Record<string, unknown>;

const typesModules = import.meta.glob<TypesModule>('./*/*/types.ts', { eager: true });

const EMPTY_DEFAULTS = ['DIALOG_DEFAULTS', 'BLOCK_TITLE_DEFAULTS', 'CYCLE_DEFAULTS', 'SHEET_DEFAULTS', 'STEPS_DEFAULTS', 'TIMELINE_DEFAULTS'];

const WITHOUT_DEFAULTS = ['Question', 'Lists', 'Screenshot', 'Blobs', 'CardList', 'Metric', 'Schema', 'Heartbeat', 'Spotlight'];

describe('component prop vocabularies', () => {
  it('every UPPER_SNAKE array a types.ts exports is a non-empty list of distinct values', () => {
    for (const [file, mod] of Object.entries(typesModules)) {
      for (const [name, value] of Object.entries(mod)) {
        if (!/^[A-Z][A-Z0-9_]+$/.test(name) || !Array.isArray(value)) continue;
        expect(value.length, `${file} ${name}`).toBeGreaterThan(0);
        expect(new Set(value).size, `${file} ${name}`).toBe(value.length);
      }
    }
  });

  it('a types.ts exports at most one <NAME>_DEFAULTS, a plain object, and nine components export none', () => {
    const without: string[] = [];
    for (const [file, mod] of Object.entries(typesModules)) {
      const defaults = Object.keys(mod).filter((name) => name.endsWith('_DEFAULTS'));
      expect(defaults.length, file).toBeLessThanOrEqual(1);
      if (defaults.length === 0) without.push(file.split('/')[2]);
      for (const name of defaults) {
        const value = mod[name];
        expect(typeof value === 'object' && value !== null && !Array.isArray(value), `${file} ${name}`).toBe(true);
        if (EMPTY_DEFAULTS.includes(name)) expect(value, name).toEqual({});
        else expect(Object.keys(value as object).length, name).toBeGreaterThan(0);
      }
    }
    expect(without.sort()).toEqual([...WITHOUT_DEFAULTS].sort());
  });

  it('every Text and Button default is one of the values its prop allows', () => {
    expect(TEXT_VARIANTS).toContain(TEXT_DEFAULTS.variant);
    expect(TEXT_TONES).toContain(TEXT_DEFAULTS.tone);
    expect(TEXT_ELEMENTS).toContain(TEXT_DEFAULTS.as);
    expect(TEXT_WRAPS).toContain(TEXT_DEFAULTS.wrap);
    expect(TEXT_MEASURES).toContain(TEXT_DEFAULTS.measure);
    expect(BUTTON_VARIANTS).toContain(BUTTON_DEFAULTS.variant);
    expect(BUTTON_SIZES).toContain(BUTTON_DEFAULTS.size);
  });

  it('TEXT_DEFAULTS and BUTTON_DEFAULTS hold the documented defaults', () => {
    expect(TEXT_DEFAULTS).toEqual({ variant: 'body-m', tone: 'primary', as: 'p', wrap: 'auto', measure: 'none' });
    expect(BUTTON_DEFAULTS).toEqual({ variant: 'primary', size: 'md', iconOnly: false });
  });

  it('a component given no value for a prop renders as if given its default', () => {
    expect(renderToString(<Text>Hola</Text>)).toBe(renderToString(<Text {...TEXT_DEFAULTS}>Hola</Text>));
    expect(renderToString(<Text>Hola</Text>)).toMatch(/^<p /);
    expect(renderToString(<Button>Enviar</Button>)).toBe(renderToString(<Button {...BUTTON_DEFAULTS}>Enviar</Button>));
  });
});
