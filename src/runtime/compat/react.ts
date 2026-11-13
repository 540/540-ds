import * as compat from 'preact/compat';

// @ts-expect-error preact/compat types use `export =`; the bundler re-exports it fine and callers type against react
export * from 'preact/compat';
export { default } from 'preact/compat';

/** Prefix for the ids of one island, so two islands never share an id (React's identifierPrefix). */
export const IdPrefix = compat.createContext('');

export function useId(): string {
  return compat.useContext(IdPrefix) + compat.useId();
}

let hydrating = false;

/** Runs a hydrate call; components rendered inside it read the server snapshot of external stores. */
export function whileHydrating<T>(run: () => T): T {
  hydrating = true;
  try {
    return run();
  } finally {
    hydrating = false;
  }
}

/**
 * React's contract, which preact/compat skips: on the server and while hydrating, read the server
 * snapshot, so the first client render matches the HTML; switch to the live one after mounting.
 */
export function useSyncExternalStore<T>(subscribe: (onChange: () => void) => () => void, getSnapshot: () => T, getServerSnapshot?: () => T): T {
  const fromServer = compat.useRef(getServerSnapshot !== undefined && (typeof window === 'undefined' || hydrating));
  const [, mounted] = compat.useState(false);
  compat.useEffect(() => {
    if (!fromServer.current) return;
    fromServer.current = false;
    mounted(true);
  }, []);
  return compat.useSyncExternalStore(subscribe, fromServer.current && getServerSnapshot ? getServerSnapshot : getSnapshot);
}
