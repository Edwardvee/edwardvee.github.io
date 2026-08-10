import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
  type MutableRefObject,
} from "react";
import type { PerspectiveCamera, Group, DirectionalLight } from "three";

export interface SceneProxy {
  rotY: number;
  camX: number;
  camY: number;
  camZ: number;
  modelX: number;
  modelY: number;
  lookAtX: number;
  lookAtY: number;
  lightX: number;
  lightY: number;
  lightZ: number;
  /** 1 = shown, 0 = hidden (contact) */
  visible: number;
}

/**
 * Statue pinned to the right edge — zoomed-in hero framing.
 * lookAt sits left of the model so it isn't centered by the camera.
 * −50° Y = yaw toward screen-right.
 */
export const HERO_PROXY: SceneProxy = {
  rotY: (-70 * Math.PI) / 180,
  camX: 0.55,
  camY: 1,
  camZ: 2,
  modelX: 2.3,
  modelY: 0.1,
  lookAtX: 1.15,
  lookAtY: 0.55,
  lightX: 7.5,
  lightY: 7,
  lightZ: 8,
  visible: 1,
};

/** Pull-back / mid framing — kept for reference; Work now zooms in instead. */
export const REST_PROXY: Pick<
  SceneProxy,
  "camY" | "camZ" | "lookAtY" | "lightX" | "lightY" | "lightZ" | "visible"
> = {
  camY: 0.85,
  camZ: 5.1,
  lookAtY: 0.55,
  lightX: 7.5,
  lightY: 8,
  lightZ: 5,
  visible: 1,
};

/**
 * Projects / Work: tighter zoom + 45° yaw from hero.
 * Horizontal pin stays on the right rail (relative to HERO_PROXY / Milos).
 */
export const WORK_PROXY: SceneProxy = {
  rotY: HERO_PROXY.rotY - Math.PI / 4, // −70° → −115°
  camX: HERO_PROXY.camX,
  camY: HERO_PROXY.camY + 0.2,
  camZ: Math.max(HERO_PROXY.camZ * 0.62, 1.15),
  modelX: HERO_PROXY.modelX - 0.25,
  modelY: HERO_PROXY.modelY + 0.1,
  lookAtX: HERO_PROXY.lookAtX,
  lookAtY: HERO_PROXY.lookAtY + 0.28,
  lightX: -1,
  lightY: 4,
  lightZ: -10,
  visible: 1,
};

/**
 * Tech Stack: pulled-back ¾ — milder yaw, lower framing toward drapery/torso.
 */
export const TECH_PROXY: SceneProxy = {
  rotY: HERO_PROXY.rotY + Math.PI / 9, // ~−34°
  camX: HERO_PROXY.camX,
  camY: 0.75,
  camZ: 2.85,
  modelX: HERO_PROXY.modelX + 0.2,
  modelY: HERO_PROXY.modelY ,
  lookAtX: HERO_PROXY.lookAtX,
  lookAtY: 0.35,
  lightX: 2,
  lightY: 5,
  lightZ: 2,
  visible: 1,
};

/** Experience: midpoint between Projects (Work) and Tech Stack. */
export const EXPERIENCE_PROXY: SceneProxy = {
  rotY: (WORK_PROXY.rotY + TECH_PROXY.rotY) / 2,
  camX: (WORK_PROXY.camX + TECH_PROXY.camX) / 2,
  camY: (WORK_PROXY.camY + TECH_PROXY.camY) / 2,
  camZ: (WORK_PROXY.camZ + TECH_PROXY.camZ) / 2,
  modelX: (WORK_PROXY.modelX + TECH_PROXY.modelX) / 2,
  modelY: (WORK_PROXY.modelY + TECH_PROXY.modelY) / 2,
  lookAtX: (WORK_PROXY.lookAtX + TECH_PROXY.lookAtX) / 2,
  lookAtY: (WORK_PROXY.lookAtY + TECH_PROXY.lookAtY) / 2,
  lightX: (WORK_PROXY.lightX + TECH_PROXY.lightX) / 2,
  lightY: (WORK_PROXY.lightY + TECH_PROXY.lightY) / 2,
  lightZ: (WORK_PROXY.lightZ + TECH_PROXY.lightZ) / 2,
  visible: 1,
};

export const INTRO_CAMERA = {
  x: 2.4,
  y: 1.15,
  z: 2.25,
} as const;

interface SceneGateContextValue {
  introDone: boolean;
  modelReady: boolean;
  markModelReady: () => void;
  completeIntro: () => void;
  proxy: SceneProxy;
  cameraRef: MutableRefObject<PerspectiveCamera | null>;
  modelRef: MutableRefObject<Group | null>;
  lightRef: MutableRefObject<DirectionalLight | null>;
}

const SceneGateContext = createContext<SceneGateContextValue | null>(null);

interface SceneGateProviderProps {
  children: ReactNode;
  cameraRef: MutableRefObject<PerspectiveCamera | null>;
  modelRef: MutableRefObject<Group | null>;
  lightRef: MutableRefObject<DirectionalLight | null>;
  proxy: SceneProxy;
}

export function SceneGateProvider({
  children,
  cameraRef,
  modelRef,
  lightRef,
  proxy,
}: SceneGateProviderProps) {
  const [introDone, setIntroDone] = useState(false);
  const [modelReady, setModelReady] = useState(false);

  const markModelReady = useCallback(() => {
    setModelReady(true);
  }, []);

  const completeIntro = useCallback(() => {
    setIntroDone(true);
  }, []);

  const value = useMemo(
    () => ({
      introDone,
      modelReady,
      markModelReady,
      completeIntro,
      proxy,
      cameraRef,
      modelRef,
      lightRef,
    }),
    [
      introDone,
      modelReady,
      markModelReady,
      completeIntro,
      proxy,
      cameraRef,
      modelRef,
      lightRef,
    ],
  );

  return (
    <SceneGateContext.Provider value={value}>
      {children}
    </SceneGateContext.Provider>
  );
}

export function useSceneGate() {
  const ctx = useContext(SceneGateContext);
  if (!ctx) {
    throw new Error("useSceneGate must be used within SceneGateProvider");
  }
  return ctx;
}

export function useSceneGateOptional() {
  return useContext(SceneGateContext);
}
