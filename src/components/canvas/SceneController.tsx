import { useFrame, useThree } from "@react-three/fiber";
import { useRef, type MutableRefObject } from "react";
import type {
  DirectionalLight,
  Group,
  PerspectiveCamera,
} from "three";
import type { SceneProxy } from "@/context/SceneGateContext";

interface SceneControllerProps {
  proxy: SceneProxy;
  cameraRef: MutableRefObject<PerspectiveCamera | null>;
  modelRef: MutableRefObject<Group | null>;
  lightRef: MutableRefObject<DirectionalLight | null>;
}

/**
 * Applies GSAP-driven proxy values into the R3F render loop.
 *
 * Fade uses CSS opacity on the canvas host (compositor blend) instead of
 * per-material opacity — transparent multi-mesh models produce sorting /
 * dither artifacts when depthWrite + opacity fight.
 */
export function SceneController({
  proxy,
  cameraRef,
  modelRef,
  lightRef,
}: SceneControllerProps) {
  const { camera, scene, gl } = useThree();
  const lastVisible = useRef<number>(-1);

  useFrame(() => {
    if (cameraRef.current !== camera && camera.type === "PerspectiveCamera") {
      cameraRef.current = camera as PerspectiveCamera;
    }

    camera.position.set(proxy.camX, proxy.camY, proxy.camZ);
    camera.lookAt(proxy.lookAtX, proxy.lookAtY, 0);

    const v = Math.max(0, Math.min(1, proxy.visible ?? 1));

    if (v !== lastVisible.current) {
      lastVisible.current = v;
      const host = gl.domElement.parentElement;
      if (host) {
        host.style.opacity = v >= 0.995 ? "1" : v.toFixed(3);
        host.style.visibility = v > 0.02 ? "visible" : "hidden";
      }
    }

    if (modelRef.current) {
      modelRef.current.rotation.y = proxy.rotY;
      modelRef.current.position.x = proxy.modelX;
      modelRef.current.position.y = proxy.modelY;
      modelRef.current.visible = v > 0.02;
    }

    if (lightRef.current) {
      const light = lightRef.current;
      if (light.target.parent !== scene) {
        scene.add(light.target);
      }
      light.position.set(proxy.lightX, proxy.lightY, proxy.lightZ);
      light.target.position.set(proxy.modelX, proxy.modelY + 0.4, 0);
      light.target.updateMatrixWorld();
      light.intensity = 2.05;
    }
  });

  return null;
}
