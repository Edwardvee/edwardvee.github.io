import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
  type RefObject,
} from "react";
import type Lenis from "lenis";
import { useLenis } from "@/hooks/useLenis";

interface LenisContextValue {
  lenisRef: RefObject<Lenis | null>;
  stop: () => void;
  start: () => void;
}

const LenisContext = createContext<LenisContextValue | null>(null);

interface LenisProviderProps {
  children: ReactNode;
  /** When true, Lenis starts stopped (intro lock). */
  startStopped?: boolean;
}

export function LenisProvider({
  children,
  startStopped = false,
}: LenisProviderProps) {
  const lenisRef = useLenis({ startStopped });

  const stop = useCallback(() => {
    lenisRef.current?.stop();
  }, [lenisRef]);

  const start = useCallback(() => {
    lenisRef.current?.start();
  }, [lenisRef]);

  const value = useMemo(
    () => ({ lenisRef, stop, start }),
    [lenisRef, stop, start],
  );

  return (
    <LenisContext.Provider value={value}>{children}</LenisContext.Provider>
  );
}

export function useLenisControls() {
  const ctx = useContext(LenisContext);
  if (!ctx) {
    throw new Error("useLenisControls must be used within LenisProvider");
  }
  return ctx;
}
