import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLenisControls } from "@/context/LenisContext";
import {
  HERO_PROXY,
  INTRO_CAMERA,
  useSceneGate,
} from "@/context/SceneGateContext";

interface IntroSplashProps {
  name: string;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function IntroSplash({ name }: IntroSplashProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const cueRef = useRef<HTMLParagraphElement>(null);
  const { start, stop } = useLenisControls();
  const { modelReady, completeIntro, proxy, introDone } = useSceneGate();
  const [visible, setVisible] = useState(true);
  const playedRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      Object.assign(proxy, HERO_PROXY);
      start();
      completeIntro();
      setVisible(false);
      return;
    }
    stop();
  }, [completeIntro, proxy, start, stop]);

  useEffect(() => {
    if (!visible || playedRef.current || prefersReducedMotion()) return;

    const playIntro = () => {
      if (playedRef.current) return;
      playedRef.current = true;

      const overlay = overlayRef.current;
      if (!overlay) return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          start();
          completeIntro();
          setVisible(false);
        },
      });

      tl.to([nameRef.current, cueRef.current], {
        opacity: 0,
        y: -24,
        duration: 0.7,
        stagger: 0.05,
      })
        .to(
          proxy,
          {
            camX: HERO_PROXY.camX,
            camY: HERO_PROXY.camY,
            camZ: HERO_PROXY.camZ,
            rotY: HERO_PROXY.rotY,
            modelX: HERO_PROXY.modelX,
            modelY: HERO_PROXY.modelY,
            lookAtX: HERO_PROXY.lookAtX,
            lookAtY: HERO_PROXY.lookAtY,
            lightX: HERO_PROXY.lightX,
            lightY: HERO_PROXY.lightY,
            lightZ: HERO_PROXY.lightZ,
            visible: 1,
            duration: 1.35,
            ease: "power2.inOut",
          },
          0.15,
        )
        .to(
          overlay,
          {
            opacity: 0,
            duration: 0.55,
          },
          0.55,
        );
    };

    // Auto-play shortly after model ready; also allow early dismiss.
    let autoTimer: number | undefined;
    if (modelReady) {
      autoTimer = window.setTimeout(playIntro, 900);
    }

    const onIntent = (event: Event) => {
      if (!modelReady && event.type === "wheel") {
        // Wait for geometry so camera settle has a subject.
        return;
      }
      playIntro();
    };

    window.addEventListener("wheel", onIntent, { passive: true });
    window.addEventListener("touchstart", onIntent, { passive: true });
    window.addEventListener("keydown", onIntent);

    return () => {
      if (autoTimer) window.clearTimeout(autoTimer);
      window.removeEventListener("wheel", onIntent);
      window.removeEventListener("touchstart", onIntent);
      window.removeEventListener("keydown", onIntent);
    };
  }, [completeIntro, modelReady, proxy, start, visible]);

  useEffect(() => {
    if (introDone) return;
    proxy.camX = INTRO_CAMERA.x;
    proxy.camY = INTRO_CAMERA.y;
    proxy.camZ = INTRO_CAMERA.z;
    proxy.modelX = HERO_PROXY.modelX;
    proxy.lookAtX = HERO_PROXY.modelX;
    proxy.lookAtY = HERO_PROXY.lookAtY;
  }, [introDone, proxy]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-paper text-ink"
      aria-hidden={introDone}
    >
      <p
        ref={nameRef}
        className="max-w-[18ch] px-24 text-center font-display text-[clamp(3.5rem,14vw,11rem)] leading-[0.88] tracking-tight"
      >
        {name}
      </p>
      <p
        ref={cueRef}
        className="mt-48 text-label uppercase tracking-[0.18em] text-ink"
      >
        Scroll to enter
      </p>
    </div>
  );
}
