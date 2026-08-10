import { useLayoutEffect, useRef, type DependencyList, type RefObject } from "react";
import gsap from "gsap";

export function useGsapContext<T extends HTMLElement>(
  scope: RefObject<T | null>,
  factory: () => void,
  deps: DependencyList = [],
) {
  const factoryRef = useRef(factory);
  factoryRef.current = factory;

  useLayoutEffect(() => {
    if (!scope.current) return;

    const ctx = gsap.context(() => {
      factoryRef.current();
    }, scope);

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- caller controls deps
  }, deps);
}
