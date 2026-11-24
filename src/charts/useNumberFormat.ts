import { useMemo } from 'react';

/** Writes a figure the Spanish way ("1.234,5"), with a fixed number of decimals and a unit after it. */
export function useNumberFormat(decimals: number, unit = '') {
  return useMemo(() => {
    const format = new Intl.NumberFormat('es-ES', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    return (value: number) => `${format.format(value)}${unit}`;
  }, [decimals, unit]);
}
