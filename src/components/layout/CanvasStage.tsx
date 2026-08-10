import { useMemo, useRef, type MutableRefObject } from "react";
import type { DirectionalLight, Group, PerspectiveCamera } from "three";
import { Scene } from "@/components/canvas/Scene";
import { IntroSplash } from "@/components/intro/IntroSplash";
import { WebsiteLeadModal } from "@/components/ui/WebsiteLeadModal";
import {
  HERO_PROXY,
  INTRO_CAMERA,
  SceneGateProvider,
  useSceneGate,
  type SceneProxy,
} from "@/context/SceneGateContext";
import { site } from "@/constants/site";

function createProxy(): SceneProxy {
  return {
    rotY: HERO_PROXY.rotY,
    camX: INTRO_CAMERA.x,
    camY: INTRO_CAMERA.y,
    camZ: INTRO_CAMERA.z,
    modelX: HERO_PROXY.modelX,
    modelY: HERO_PROXY.modelY,
    lookAtX: HERO_PROXY.lookAtX,
    lookAtY: HERO_PROXY.lookAtY,
    lightX: HERO_PROXY.lightX,
    lightY: HERO_PROXY.lightY,
    lightZ: HERO_PROXY.lightZ,
    visible: 1,
  };
}

function SceneBridge({
  proxy,
  cameraRef,
  modelRef,
  lightRef,
}: {
  proxy: SceneProxy;
  cameraRef: MutableRefObject<PerspectiveCamera | null>;
  modelRef: MutableRefObject<Group | null>;
  lightRef: MutableRefObject<DirectionalLight | null>;
}) {
  const { introDone } = useSceneGate();

  return (
    <Scene
      proxy={proxy}
      cameraRef={cameraRef}
      modelRef={modelRef}
      lightRef={lightRef}
      introDone={introDone}
    />
  );
}

/**
 * WebGL / R3F stage — fixed, full-bleed, pointer-events-none under the UI.
 */
export function CanvasStage() {
  const proxy = useMemo(() => createProxy(), []);
  const cameraRef = useRef<PerspectiveCamera | null>(null);
  const modelRef = useRef<Group | null>(null);
  const lightRef = useRef<DirectionalLight | null>(null);

  return (
    <SceneGateProvider
      proxy={proxy}
      cameraRef={cameraRef}
      modelRef={modelRef}
      lightRef={lightRef}
    >
      <div
        id="webgl-root"
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{ willChange: "opacity" }}
      >
        <SceneBridge
          proxy={proxy}
          cameraRef={cameraRef}
          modelRef={modelRef}
          lightRef={lightRef}
        />
      </div>
      <IntroSplash name={site.name} />
      <WebsiteLeadModal copy={site.websiteLead} />
    </SceneGateProvider>
  );
}
