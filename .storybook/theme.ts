import { create } from 'storybook/theming';

/* 540 brand for Storybook's own interface (sidebar, toolbar, panels).
   Values come from the primitive palette; the manager cannot read CSS variables. */
const INK = '#1a1a18'; // --540-neutral-950
const PAPER = '#f5f5f3'; // --540-neutral-50
const WHITE = '#ffffff';
const BORDER = '#e8e8e6'; // --540-neutral-100
const MUTED = '#555553'; // --540-neutral-600
const YELLOW = '#fef401'; // --540-accent-yellow
const FONT = "'DM Sans', system-ui, -apple-system, 'Segoe UI', sans-serif";
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const brandImage = 'logo-540.svg'; // served from public/ (staticDirs)

export const theme540 = create({
  base: 'light',

  brandTitle: '540 Design System',
  brandUrl: '/',
  brandImage,
  brandTarget: '_self',

  colorPrimary: YELLOW,
  colorSecondary: INK,

  appBg: PAPER,
  appContentBg: WHITE,
  appPreviewBg: PAPER,
  appBorderColor: BORDER,
  appBorderRadius: 10,

  fontBase: FONT,
  fontCode: MONO,

  textColor: INK,
  textInverseColor: WHITE,
  textMutedColor: MUTED,

  barTextColor: MUTED,
  barSelectedColor: INK,
  barHoverColor: INK,
  barBg: WHITE,

  buttonBg: PAPER,
  buttonBorder: BORDER,
  booleanBg: PAPER,
  booleanSelectedBg: INK,

  inputBg: WHITE,
  inputBorder: BORDER,
  inputTextColor: INK,
  inputBorderRadius: 10,
});
