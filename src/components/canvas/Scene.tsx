import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import type { MutableRefObject } from "react";
import {
  VSMShadowMap,
  type DirectionalLight,
  type Group,
  type PerspectiveCamera,
} from "three";
import { ACTIVE_MODEL } from "@/constants/models";
import {
  HERO_PROXY,
  INTRO_CAMERA,
  type SceneProxy,
} from "@/context/SceneGateContext";
import {
  AphroditeModel,
  FallbackStatue,
} from "@/components/canvas/AphroditeModel";
import { Lights } from "@/components/canvas/Lights";
import { SceneController } from "@/components/canvas/SceneController";
import { ModelErrorBoundary } from "@/components/canvas/ModelErrorBoundary";
import { use3DScrollAnimation } from "@/hooks/use3DScrollAnimation";

interface SceneProps {
  proxy: SceneProxy;
  cameraRef: MutableRefObject<PerspectiveCamera | null>;
  modelRef: MutableRefObject<Group | null>;
  lightRef: MutableRefObject<DirectionalLight | null>;
  introDone: boolean;
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function ModelWithFallback({
  modelRef,
}: {
  modelRef: MutableRefObject<Group | null>;
}) {
  useEffect(() => {
    useGLTF.preload(ACTIVE_MODEL.url);
  }, []);

  return (
    <ModelErrorBoundary
      fallback={
        <group ref={modelRef}>
          <FallbackStatue />
        </group>
      }
    >
      <AphroditeModel ref={modelRef} model={ACTIVE_MODEL} />
    </ModelErrorBoundary>
  );
}

export function Scene({
  proxy,
  cameraRef,
  modelRef,
  lightRef,
  introDone,
}: SceneProps) {
  const reduced = prefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      Object.assign(proxy, HERO_PROXY);
      return;
    }
    if (!introDone) {
      proxy.camX = INTRO_CAMERA.x;
      proxy.camY = INTRO_CAMERA.y;
      proxy.camZ = INTRO_CAMERA.z;
      proxy.modelX = HERO_PROXY.modelX;
      proxy.modelY = HERO_PROXY.modelY;
      proxy.lookAtX = HERO_PROXY.lookAtX;
      proxy.lookAtY = HERO_PROXY.lookAtY;
    }
  }, [proxy, reduced, introDone]);

  use3DScrollAnimation({
    proxy,
    enabled: introDone && !reduced,
  });

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{
        fov: 35,
        near: 0.1,
        far: 80,
        position: [INTRO_CAMERA.x, INTRO_CAMERA.y, INTRO_CAMERA.z],
      }}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
      onCreated={({ gl, scene: threeScene }) => {
        gl.setClearColor(0x000000, 0);
        gl.toneMappingExposure = 1.12;
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = VSMShadowMap;
        threeScene.background = null;
      }}
    >
      <SceneController
        proxy={proxy}
        cameraRef={cameraRef}
        modelRef={modelRef}
        lightRef={lightRef}
      />
      <Lights ref={lightRef} />
      <Suspense
        fallback={
          <group ref={modelRef}>
            <FallbackStatue />
          </group>
        }
      >
        <ModelWithFallback modelRef={modelRef} />
      </Suspense>
    </Canvas>
  );
}
