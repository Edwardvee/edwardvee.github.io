import type { ReactNode } from "react";
import { LenisProvider } from "@/context/LenisContext";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  return <LenisProvider startStopped>{children}</LenisProvider>;
}
