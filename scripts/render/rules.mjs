/** Plain HTML a tag document may use inside text, with the attributes each one takes. */
export const PHRASING = {
  strong: [],
  em: [],
  b: [],
  i: [],
  code: [],
  small: [],
  sub: [],
  sup: [],
  br: [],
  a: ['href'],
};

/** SVG a Schema may draw with. Classes come from the Schema vocabulary (manifest `svg.classes`); no colors or styles. */
export const SVG = {
  elements: ['g', 'defs', 'marker', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon', 'path', 'text', 'tspan'],
  attributes: [
    'class',
    'id',
    'x',
    'y',
    'dx',
    'dy',
    'x1',
    'y1',
    'x2',
    'y2',
    'cx',
    'cy',
    'r',
    'rx',
    'ry',
    'width',
    'height',
    'd',
    'points',
    'transform',
    'text-anchor',
    'dominant-baseline',
    'marker-start',
    'marker-mid',
    'marker-end',
    'viewBox',
    'refX',
    'refY',
    'markerWidth',
    'markerHeight',
    'markerUnits',
    'orient',
    'pathLength',
  ],
};

export const VOID = new Set(['br']);

export const IMAGE = /\.(png|jpe?g|gif|webp|avif|svg)$/i;

export const MIME = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', webp: 'image/webp', avif: 'image/avif', svg: 'image/svg+xml' };

/** The tags whose content is SVG. */
export const SVG_CONTAINERS = ['rev-schema', 'rev-schema-layer'];
