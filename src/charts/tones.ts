/** The colors a chart series can take: ink for the story, gray for context and yellow for the one series that
 * matters. So a chart tells three series apart at most. */
export const CHART_TONES = ['ink', 'context', 'accent'] as const;
export type ChartTone = (typeof CHART_TONES)[number];

/** The tone of the i-th series when it has none: the first in ink, the rest in gray. */
export const defaultTone = (i: number): ChartTone => (i === 0 ? 'ink' : 'context');
