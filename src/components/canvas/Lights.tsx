import { forwardRef } from "react";
import type { DirectionalLight } from "three";

/**
 * High-contrast key; soft AA-like penumbra via VSM + shadow.radius blur.
 * Single caster — no post-process FXAA.
 */
export const Lights = forwardRef<DirectionalLight>(function Lights(_props, ref) {
  return (
    <>
      <ambientLight intensity={0.06} color="#ffffff" />
      <hemisphereLight
        args={["#fafafa", "#b8b4ac", 0.1]}
        position={[0, 4, 0]}
      />
      <directionalLight
        ref={ref}
        castShadow
        intensity={2.05}
        color="#ffffff"
        position={[6.5, 9.5, 3.5]}
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.00025}
        shadow-normalBias={0.04}
        shadow-radius={5}
        shadow-blurSamples={4}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-4.5, 4.5, 4.5, -4.5, 0.5, 28]}
        />
      </directionalLight>
      <directionalLight
        intensity={0.22}
        color="#ffffff"
        position={[-5, 3, -4]}
      />
    </>
  );
});
