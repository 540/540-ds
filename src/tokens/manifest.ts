/**
 * Token manifest — names, aliases and descriptions used by the "Fundamentos"
 * documentation pages. Values are NOT duplicated here: the pages read the real
 * computed value from the CSS at runtime, so the docs can never drift from the code.
 */

export type ColorPrimitive = { name: string; label: string };
export type ColorPrimitiveGroup = { title: string; description: string; items: ColorPrimitive[] };

export const colorPrimitives: ColorPrimitiveGroup[] = [
  {
    title: 'Acento',
    description: 'El amarillo de marca y sus dos derivados.',
    items: [
      { name: '--540-accent-yellow', label: 'Accent / Yellow' },
      { name: '--540-accent-yellow-subtle', label: 'Accent / Yellow Subtle' },
      { name: '--540-accent-gold', label: 'Accent / Gold' },
    ],
  },
  {
    title: 'Neutros',
    description: 'Del blanco al negro, con los grises cálidos del sistema.',
    items: [
      { name: '--540-neutral-white', label: 'Neutral / White' },
      { name: '--540-neutral-50', label: 'Neutral / 50' },
      { name: '--540-neutral-100', label: 'Neutral / 100' },
      { name: '--540-neutral-200', label: 'Neutral / 200' },
      { name: '--540-neutral-300', label: 'Neutral / 300' },
      { name: '--540-neutral-450', label: 'Neutral / 450' },
      { name: '--540-neutral-600', label: 'Neutral / 600' },
      { name: '--540-neutral-800', label: 'Neutral / 800' },
      { name: '--540-neutral-875', label: 'Neutral / 875' },
      { name: '--540-neutral-900', label: 'Neutral / 900' },
      { name: '--540-neutral-925', label: 'Neutral / 925' },
      { name: '--540-neutral-950', label: 'Neutral / 950' },
      { name: '--540-neutral-black', label: 'Neutral / Black' },
    ],
  },
  {
    title: 'Velos',
    description: 'Neutros translúcidos (70 %) para superponer sobre contenido.',
    items: [
      { name: '--540-neutral-50-veil', label: 'Neutral / 50 Veil' },
      { name: '--540-neutral-950-veil', label: 'Neutral / 950 Veil' },
      { name: '--540-neutral-black-veil', label: 'Neutral / Black Veil' },
    ],
  },
  {
    title: 'Estado',
    description: 'Error y éxito. El sistema no tiene aviso ni info: no aparecen en Figma.',
    items: [
      { name: '--540-status-red', label: 'Status / Red' },
      { name: '--540-status-red-soft', label: 'Status / Red Soft' },
      { name: '--540-status-red-subtle', label: 'Status / Red Subtle' },
      { name: '--540-status-green', label: 'Status / Green' },
      { name: '--540-status-green-soft', label: 'Status / Green Soft' },
      { name: '--540-status-green-subtle', label: 'Status / Green Subtle' },
    ],
  },
];

export type SemanticColor = { name: string; label: string; light: string; dark: string; usage: string };
export type SemanticColorGroup = { title: string; items: SemanticColor[] };

export const semanticColors: SemanticColorGroup[] = [
  {
    title: 'Fondo',
    items: [
      { name: '--color-bg-default', label: 'Background / Default', light: '--540-neutral-50', dark: '--540-neutral-black', usage: 'Fondo de página.' },
      { name: '--color-bg-inverse', label: 'Background / Inverse', light: '--540-neutral-950', dark: '--540-neutral-50', usage: 'Bloques invertidos: botón principal, pie.' },
      { name: '--color-bg-surface', label: 'Background / Surface', light: '--540-neutral-50', dark: '--540-neutral-925', usage: 'Superficie de tarjeta o panel.' },
      { name: '--color-bg-subtle', label: 'Background / Subtle', light: '--540-neutral-100', dark: '--540-neutral-925', usage: 'Fondo ligeramente destacado.' },
      { name: '--color-bg-accent', label: 'Background / Accent', light: '--540-accent-yellow', dark: '--540-accent-yellow', usage: 'Fondo de acento (amarillo).' },
      { name: '--color-bg-accent-subtle', label: 'Background / Accent Subtle', light: '--540-accent-yellow-subtle', dark: '--540-accent-yellow-subtle', usage: 'Acento al 10 %: resaltados suaves.' },
      { name: '--color-bg-inverse-active', label: 'Background / Inverse Active', light: '--540-neutral-800', dark: '--540-neutral-200', usage: 'Estado activo sobre fondo invertido.' },
      { name: '--color-bg-neutral-hover', label: 'Background / Neutral Hover', light: '--540-neutral-100', dark: '--540-neutral-925', usage: 'Hover de elementos neutros.' },
      { name: '--color-bg-row-active', label: 'Background / Row Active', light: '--540-neutral-100', dark: '--540-neutral-875', usage: 'Fila o ítem seleccionado.' },
      { name: '--color-bg-neutral-active', label: 'Background / Neutral Active', light: '--540-neutral-200', dark: '--540-neutral-875', usage: 'Pulsación de elementos neutros.' },
      { name: '--color-bg-disabled', label: 'Background / Disabled', light: '--540-neutral-100', dark: '--540-neutral-875', usage: 'Controles desactivados.' },
      { name: '--color-bg-error', label: 'Background / Error', light: '--540-status-red-subtle', dark: '--540-status-red-subtle', usage: 'Fondo de mensajes de error.' },
      { name: '--color-bg-success', label: 'Background / Success', light: '--540-status-green-subtle', dark: '--540-status-green-subtle', usage: 'Fondo de mensajes de éxito.' },
      { name: '--color-bg-overlay', label: 'Background / Overlay', light: '--540-neutral-950-veil', dark: '--540-neutral-950-veil', usage: 'Velo detrás de diálogos.' },
      { name: '--color-bg-nav', label: 'Background / Barra', light: '--540-neutral-50-veil', dark: '--540-neutral-black-veil', usage: 'Barra de navegación translúcida.' },
    ],
  },
  {
    title: 'Texto',
    items: [
      { name: '--color-text-primary', label: 'Text / Primary', light: '--540-neutral-950', dark: '--540-neutral-white', usage: 'Texto principal.' },
      { name: '--color-text-secondary', label: 'Text / Secondary', light: '--540-neutral-600', dark: '--540-neutral-200', usage: 'Texto de apoyo.' },
      { name: '--color-text-tertiary', label: 'Text / Tertiary', light: '--540-neutral-450', dark: '--540-neutral-300', usage: 'Metadatos, pies.' },
      { name: '--color-text-disabled', label: 'Text / Disabled', light: '--540-neutral-300', dark: '--540-neutral-600', usage: 'Texto desactivado.' },
      { name: '--color-text-inverse', label: 'Text / Inverse', light: '--540-neutral-white', dark: '--540-neutral-950', usage: 'Texto sobre fondo invertido.' },
      { name: '--color-text-inverse-secondary', label: 'Text / Inverse Secondary', light: '--540-neutral-200', dark: '--540-neutral-600', usage: 'Texto secundario sobre fondo invertido.' },
      { name: '--color-text-accent', label: 'Text / Accent', light: '--540-accent-yellow', dark: '--540-accent-yellow', usage: 'Texto amarillo sobre fondos oscuros.' },
      { name: '--color-text-accent-inverse', label: 'Text / Accent Inverse', light: '--540-accent-gold', dark: '--540-accent-gold', usage: 'Acento legible sobre fondos claros (dorado).' },
      { name: '--color-text-on-media', label: 'Text / On Media', light: '--540-neutral-white', dark: '--540-neutral-white', usage: 'Texto sobre fotografía o vídeo.' },
      { name: '--color-text-error', label: 'Text / Error', light: '--540-status-red', dark: '--540-status-red-soft', usage: 'Mensajes de error.' },
      { name: '--color-text-success', label: 'Text / Success', light: '--540-status-green', dark: '--540-status-green-soft', usage: 'Mensajes de éxito.' },
    ],
  },
  {
    title: 'Borde',
    items: [
      { name: '--color-border-default', label: 'Border / Default', light: '--540-neutral-100', dark: '--540-neutral-875', usage: 'Separadores y bordes suaves.' },
      { name: '--color-border-strong', label: 'Border / Strong', light: '--540-neutral-900', dark: '--540-neutral-white', usage: 'Bordes marcados: botón secundario, campo.' },
      { name: '--color-border-default-inverse', label: 'Border / Default Inverse', light: '--540-neutral-900', dark: '--540-neutral-100', usage: 'Borde suave sobre fondo invertido.' },
      { name: '--color-border-strong-inverse', label: 'Border / Strong Inverse', light: '--540-neutral-white', dark: '--540-neutral-950', usage: 'Borde marcado sobre fondo invertido.' },
      { name: '--color-border-focus', label: 'Border / Focus', light: '--540-neutral-950', dark: '--540-neutral-white', usage: 'El halo de foco de teclado.' },
    ],
  },
];

export type TextStyle = {
  key: string;
  label: string;
  tokenPrefix: string;
  sizeMobile: number;
  sizeDesktop: number;
  weight: number;
  weightName: string;
  lineHeight: number;
  letterSpacing: string;
  usage: string;
  note?: string;
};

export const textStyles: TextStyle[] = [
  { key: 'statement', label: 'Statement', tokenPrefix: '--text-statement', sizeMobile: 48, sizeDesktop: 64, weight: 800, weightName: 'ExtraBold', lineHeight: 0.9, letterSpacing: '-3 %', usage: 'La frase de una parada del recorrido, la que cruza el centro de la pantalla.' },
  { key: 'title-l', label: 'Título / L', tokenPrefix: '--text-title-l', sizeMobile: 28, sizeDesktop: 36, weight: 400, weightName: 'Regular', lineHeight: 1, letterSpacing: '0', usage: 'Subtítulo de sección.' },
  { key: 'title-m', label: 'Título / M', tokenPrefix: '--text-title-m', sizeMobile: 26, sizeDesktop: 32, weight: 400, weightName: 'Regular', lineHeight: 1, letterSpacing: '0', usage: 'Título de bloque.' },
  { key: 'title-s', label: 'Título / S', tokenPrefix: '--text-title-s', sizeMobile: 22, sizeDesktop: 26, weight: 400, weightName: 'Regular', lineHeight: 1, letterSpacing: '0', usage: 'Título de tarjeta.' },
  { key: 'title-xs', label: 'Título / XS', tokenPrefix: '--text-title-xs', sizeMobile: 20, sizeDesktop: 22, weight: 400, weightName: 'Regular', lineHeight: 1, letterSpacing: '0', usage: 'Título menor.' },
  { key: 'body-l', label: 'Body / L', tokenPrefix: '--text-body-l', sizeMobile: 18, sizeDesktop: 18, weight: 400, weightName: 'Regular', lineHeight: 1, letterSpacing: '0', usage: 'Entradilla y texto destacado.' },
  { key: 'body-m', label: 'Body / M', tokenPrefix: '--text-body-m', sizeMobile: 16, sizeDesktop: 16, weight: 400, weightName: 'Regular', lineHeight: 1, letterSpacing: '0', usage: 'Texto corrido.' },
  { key: 'body-s', label: 'Body / S', tokenPrefix: '--text-body-s', sizeMobile: 14, sizeDesktop: 14, weight: 400, weightName: 'Regular', lineHeight: 1, letterSpacing: '0', usage: 'Texto de interfaz.' },
  { key: 'body-s-light', label: 'Body / S Light', tokenPrefix: '--text-body-s-light', sizeMobile: 14, sizeDesktop: 14, weight: 350, weightName: 'Light (350)', lineHeight: 1, letterSpacing: '0', usage: 'Texto secundario.', note: 'En Figma se ve con peso 300 porque solo tiene instancias estáticas; el código usa 350, que a 14 px no se rompe.' },
  { key: 'body-s-bold', label: 'Body / S Bold', tokenPrefix: '--text-body-s-bold', sizeMobile: 14, sizeDesktop: 14, weight: 700, weightName: 'Bold', lineHeight: 1, letterSpacing: '0', usage: 'Texto de interfaz enfatizado.' },
  { key: 'micro', label: 'Body / Micro', tokenPrefix: '--text-micro', sizeMobile: 12, sizeDesktop: 12, weight: 400, weightName: 'Regular', lineHeight: 1, letterSpacing: '0', usage: 'Letra pequeña que se lee sola: el ordinal de una banda.' },
  { key: 'micro-light', label: 'Body / Micro Light', tokenPrefix: '--text-micro-light', sizeMobile: 12, sizeDesktop: 12, weight: 350, weightName: 'Light (350)', lineHeight: 1, letterSpacing: '0', usage: 'Letra pequeña de apoyo: etiquetas de dato, pies.', note: 'Mismo caso que Body / S Light: 350 en código, 300 en Figma.' },
  { key: 'micro-bold', label: 'Body / Micro Bold', tokenPrefix: '--text-micro-bold', sizeMobile: 12, sizeDesktop: 12, weight: 700, weightName: 'Bold', lineHeight: 1, letterSpacing: '0', usage: 'Etiquetas en mayúsculas.' },
];

export type MeasureToken = { name: string; label: string; usage?: string; mobile?: number; desktop?: number; provisional?: boolean };

export const spacingTokens: MeasureToken[] = [
  { name: '--space-xs', label: 'XS' },
  { name: '--space-s', label: 'S' },
  { name: '--space-m', label: 'M' },
  { name: '--space-l', label: 'L' },
  { name: '--space-xl', label: 'XL' },
  { name: '--space-2xl', label: '2XL' },
  { name: '--space-3xl', label: '3XL' },
];

export const paddingTokens: MeasureToken[] = [
  { name: '--padding-page', label: 'Page', usage: 'Margen lateral de página.', mobile: 20, desktop: 28, provisional: true },
  { name: '--padding-section', label: 'Section', usage: 'Relleno interno de sección.', mobile: 24, desktop: 36, provisional: true },
  { name: '--padding-section-block', label: 'Section Block', usage: 'Aire vertical entre bloques de sección.', mobile: 64, desktop: 120, provisional: true },
  { name: '--padding-card', label: 'Card', usage: 'Relleno de tarjeta.' },
];

export const gridTokens: MeasureToken[] = [
  { name: '--grid-columns', label: 'Columnas', usage: 'Doce en los tres tramos.' },
  { name: '--grid-gutter', label: 'Gutter', usage: 'Canal entre columnas.', mobile: 16, desktop: 24, provisional: true },
  { name: '--grid-gutter-wide', label: 'Gutter Wide', usage: 'Canal ancho entre bloques.', mobile: 48, desktop: 120, provisional: true },
];

export const sizeTokens: MeasureToken[] = [
  { name: '--size-control-xs', label: 'Control XS', usage: 'Alto de control pequeño.' },
  { name: '--size-control-sm', label: 'Control SM', usage: 'Alto de control mediano.' },
  { name: '--size-control-md', label: 'Control MD', usage: 'Alto de control por defecto (botón, campo).' },
  { name: '--size-icon-sm', label: 'Icon SM', usage: 'Icono pequeño.' },
  { name: '--size-icon-md', label: 'Icon MD', usage: 'Icono por defecto.' },
  { name: '--size-logo-xs', label: 'Logo XS' },
  { name: '--size-logo-sm', label: 'Logo SM' },
  { name: '--size-logo-md', label: 'Logo MD' },
  { name: '--size-logo-client', label: 'Logo Cliente', usage: 'Logotipos de cliente en el carrusel.' },
  { name: '--size-container', label: 'Container', usage: 'Ancho máximo de la columna de contenido.' },
];

export const radiusTokens: MeasureToken[] = [
  { name: '--radius-default', label: 'Default', usage: 'El de una tarjeta, un botón o un campo.' },
  { name: '--radius-pill', label: 'Pill', usage: 'El de una cápsula: etiquetas y botones redondos.' },
];
