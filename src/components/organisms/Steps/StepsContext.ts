import { createContext, useContext } from 'react';

export type StepsState = { current: number; total: number; guided: boolean };

export const StepsContext = createContext<StepsState>({ current: Infinity, total: 0, guided: false });

/** The current step of the surrounding Steps block (Infinity outside one: everything visible). */
export function useSteps(): StepsState {
  return useContext(StepsContext);
}

export const StepOnContext = createContext<boolean>(true);

/** Whether the surrounding Step is on (true outside any Step). */
export function useStepOn(): boolean {
  return useContext(StepOnContext);
}
