/** A round scale for an axis: from `min` to `max` (both included in the data), in about `count` steps of 1, 2, 2.5 or 5. */
export function niceScale(lo: number, hi: number, count = 4): { min: number; max: number; ticks: number[] } {
  if (!Number.isFinite(lo) || !Number.isFinite(hi)) return { min: 0, max: 1, ticks: [0, 1] };
  if (lo === hi) hi = lo === 0 ? 1 : lo + Math.abs(lo);
  const raw = (hi - lo) / count;
  const power = 10 ** Math.floor(Math.log10(raw));
  const step = ([1, 2, 2.5, 5, 10].find((f) => f * power >= raw) ?? 10) * power;
  const min = Math.floor(lo / step) * step;
  const max = Math.ceil(hi / step) * step;
  const ticks: number[] = [];
  for (let t = min; t <= max + step / 2; t += step) ticks.push(Number(t.toPrecision(12)));
  return { min, max, ticks };
}

/** Where `value` falls between `min` and `max`, from 0 to 1. */
export const position = (value: number, min: number, max: number) => (max === min ? 0 : (value - min) / (max - min));
