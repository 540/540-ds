/**
 * Screen breakpoints — the only two raw numbers the system allows.
 * They are NOT CSS variables on purpose: a @media condition cannot read var().
 * Mobile first, always min-width:
 *   - mobile:  up to 599px   (designed at 375)
 *   - tablet:  600 – 1023px  (designed at 768)
 *   - desktop: from 1024px   (designed at 1440)
 */
export const BREAKPOINTS = {
  tablet: 600,
  desktop: 1024,
} as const;

/** Reference widths each range is designed and reviewed at. */
export const DESIGN_WIDTHS = {
  mobile: 375,
  tablet: 768,
  desktop: 1440,
} as const;

export const MEDIA = {
  tablet: `(min-width: ${BREAKPOINTS.tablet}px)`,
  desktop: `(min-width: ${BREAKPOINTS.desktop}px)`,
} as const;
