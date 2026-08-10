import { forwardRef, useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import {
  Box3,
  Color,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Vector2,
  Vector3,
  type Group,
  type Material,
  type Mesh,
  type Object3D,
  type Texture,
} from "three";
import type { ModelEntry } from "@/constants/models";
import { useSceneGateOptional } from "@/context/SceneGateContext";

useGLTF.setDecoderPath(
  "https://www.gstatic.com/draco/versioned/decoders/1.5.6/",
);

const IVORY = new Color("#f3f0e8");
const MAX_ANISOTROPY = 8;

function tuneTexture(tex: Texture | null | undefined) {
  if (!tex) return;
  // Sharper close-ups without raising texture resolution / download size
  tex.anisotropy = Math.max(tex.anisotropy, MAX_ANISOTROPY);
  tex.needsUpdate = true;
}

/**
 * Keep geometry + detail maps from the GLB; restyle toward monochrome marble.
 * Avoids wiping normal/AO/roughness (that was flattening the statue).
 */
function stylizeMarbleMaterial(source: Material): MeshStandardMaterial {
  let mat: MeshStandardMaterial;

  if (
    source instanceof MeshStandardMaterial ||
    source instanceof MeshPhysicalMaterial
  ) {
    mat = source.clone();
  } else {
    mat = new MeshStandardMaterial();
    const anySrc = source as Material & { map?: Texture; name?: string };
    if (anySrc.map) mat.map = anySrc.map;
    mat.name = anySrc.name ?? "marble";
  }

  // Monochrome plaster cast — keep albedo if present (often carries baked AO)
  mat.color.copy(IVORY);
  mat.metalness = Math.min(mat.metalness, 0.06);
  if (!mat.roughnessMap) {
    // Slightly higher roughness reads as stone, not plastic
    mat.roughness = 0.42;
  } else {
    mat.roughness = Math.min(Math.max(mat.roughness, 0.28), 0.65);
  }

  // Micro-relief: preserve and gently boost normals
  if (mat.normalMap) {
    const s = mat.normalScale ?? new Vector2(1, 1);
    mat.normalScale = s.set(
      Math.min(s.x * 1.2, 1.35),
      Math.min(s.y * 1.2, 1.35),
    );
  }

  if (mat.aoMap) {
    mat.aoMapIntensity = Math.max(mat.aoMapIntensity, 0.85);
  }

  // Displacement is expensive at runtime — keep map data unused
  if (mat.displacementMap) {
    mat.displacementScale = 0;
  }

  if (mat instanceof MeshPhysicalMaterial) {
    mat.clearcoat = Math.min(mat.clearcoat, 0.12);
    mat.clearcoatRoughness = Math.max(mat.clearcoatRoughness, 0.55);
  }

  tuneTexture(mat.map);
  tuneTexture(mat.normalMap);
  tuneTexture(mat.roughnessMap);
  tuneTexture(mat.aoMap);
  tuneTexture(mat.metalnessMap);
  tuneTexture(mat.bumpMap);

  // Opaque path — fade is done via CSS opacity on #webgl-root (SceneController)
  mat.transparent = false;
  mat.opacity = 1;
  mat.depthWrite = true;
  mat.needsUpdate = true;

  return mat;
}

function applyMarbleStyle(root: Object3D) {
  const styled: Material[] = [];

  root.traverse((child) => {
    const mesh = child as Mesh;
    if (!mesh.isMesh) return;

    mesh.castShadow = true;
    mesh.receiveShadow = true;
    // Static statue — skip expensive updates
    mesh.matrixAutoUpdate = false;

    const input = Array.isArray(mesh.material)
      ? mesh.material
      : [mesh.material];
    const output = input.map((m) => stylizeMarbleMaterial(m));
    mesh.material = output.length === 1 ? output[0] : output;
    styled.push(...output);

    mesh.updateMatrix();
  });

  root.userData.styledMaterials = styled;
}

function fitModel(root: Object3D, scale: number, yOffset: number) {
  root.position.set(0, 0, 0);
  root.rotation.set(0, 0, 0);
  root.scale.set(1, 1, 1);
  root.updateMatrixWorld(true);

  const box = new Box3().setFromObject(root);
  const size = new Vector3();
  const center = new Vector3();
  box.getSize(size);
  box.getCenter(center);

  root.position.sub(center);

  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const fit = (2.4 / maxDim) * scale;
  root.scale.setScalar(fit);
  root.position.multiplyScalar(fit);
  root.position.y += yOffset;
  root.updateMatrixWorld(true);
}

function prepareModel(source: Object3D, scale: number, yOffset: number) {
  // Clone hierarchy; materials are re-cloned in stylize so the GLTF cache stays clean
  const root = source.clone(true);
  applyMarbleStyle(root);
  fitModel(root, scale, yOffset);
  return root;
}

interface AphroditeModelProps {
  model: ModelEntry;
}

export const AphroditeModel = forwardRef<Group, AphroditeModelProps>(
  function AphroditeModel({ model }, ref) {
    const { scene } = useGLTF(model.url);
    const gate = useSceneGateOptional();

    const prepared = useMemo(
      () => prepareModel(scene, model.scale, model.yOffset),
      [scene, model.scale, model.yOffset],
    );

    useEffect(() => {
      gate?.markModelReady();
    }, [gate, model.url]);

    return (
      <group ref={ref} dispose={null}>
        <primitive object={prepared} />
      </group>
    );
  },
);

interface FallbackStatueProps {
  onReady?: () => void;
}

/** Ivory procedural stand-in while / if GLB is unavailable. */
export function FallbackStatue({ onReady }: FallbackStatueProps) {
  const gate = useSceneGateOptional();

  useEffect(() => {
    onReady?.();
    gate?.markModelReady();
  }, [onReady, gate]);

  return (
    <mesh castShadow receiveShadow>
      <torusKnotGeometry args={[0.85, 0.28, 180, 24]} />
      <meshStandardMaterial
        color="#f3f0e8"
        roughness={0.42}
        metalness={0.05}
      />
    </mesh>
  );
}

useGLTF.preload("/aphrodite_of_milos_a_plaster_cast.glb");
