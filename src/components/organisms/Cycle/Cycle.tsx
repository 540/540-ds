import styles from './Cycle.module.css';
import type { CycleProps } from './types';

const CX = 440;
const CY = 320;
const R = 215;
const NODE_R = 34;
const LENGTH = 2 * Math.PI * R;

/**
 * Cycle is a ring of phases with an arc of progress. The phases before the active one are done;
 * marks paint a node red, green or yellow.
 */
export function Cycle({ phases, active = -1, all = false, highlightFirst = false, marks = {}, label, className }: CycleProps) {
  const n = phases.length;
  const progress = all ? 1 : Math.max(0, active) / n;
  return (
    <svg className={[styles.cycle, className ?? ''].filter(Boolean).join(' ')} viewBox="0 0 880 640" role="img" aria-label={label}>
      <circle className={styles.ring} cx={CX} cy={CY} r={R} />
      <circle className={styles.arc} cx={CX} cy={CY} r={R} transform={`rotate(-90 ${CX} ${CY})`} strokeDasharray={LENGTH} strokeDashoffset={LENGTH * (1 - progress)} />
      {phases.map((phase, i) => {
        const angle = -Math.PI / 2 + (i / n) * 2 * Math.PI;
        const x = CX + R * Math.cos(angle);
        const y = CY + R * Math.sin(angle);
        const lx = CX + (R + 85) * Math.cos(angle);
        const ly = CY + (R + 85) * Math.sin(angle);
        const anchor = Math.abs(Math.cos(angle)) < 0.2 ? 'middle' : Math.cos(angle) > 0 ? 'start' : 'end';
        let state: 'idle' | 'done' | 'active' = all || i < active ? 'done' : i === active ? 'active' : 'idle';
        if (all && highlightFirst && i === 0) state = 'active';
        return (
          <g key={phase} className={styles.node} data-state={state} data-mark={marks[i]}>
            <circle cx={x} cy={y} r={NODE_R} />
            <text className={styles.number} x={x} y={y} textAnchor="middle" dominantBaseline="central">
              {i + 1}
            </text>
            <text className={styles.label} x={lx} y={ly} textAnchor={anchor} dominantBaseline="central">
              {phase}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
