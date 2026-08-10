import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SceneProxy } from "@/context/SceneGateContext";
import {
  EXPERIENCE_PROXY,
  HERO_PROXY,
  TECH_PROXY,
  WORK_PROXY,
} from "@/context/SceneGateContext";

gsap.registerPlugin(ScrollTrigger);

interface Use3DScrollAnimationOptions {
  proxy: SceneProxy;
  enabled: boolean;
}

/** Camera / model fields only — `visible` is owned by the contact fade. */
type TransformProxy = Omit<SceneProxy, "visible">;

function transformsOf(state: SceneProxy): TransformProxy {
  return {
    rotY: state.rotY,
    camX: state.camX,
    camY: state.camY,
    camZ: state.camZ,
    modelX: state.modelX,
    modelY: state.modelY,
    lookAtX: state.lookAtX,
    lookAtY: state.lookAtY,
    lightX: state.lightX,
    lightY: state.lightY,
    lightZ: state.lightZ,
  };
}

/**
 * Section-anchored scrub (not whole-page progress):
 * - One timeline for hero → work → experience → tech (no overlapping tweens)
 * - Contact fades the canvas via `visible` only
 *
 * Uses `scrub: true` (not a lag number) because Lenis already smooths scroll —
 * double-smoothing feels sticky / stuttery.
 */
export function use3DScrollAnimation({
  proxy,
  enabled,
}: Use3DScrollAnimationOptions) {
  useEffect(() => {
    if (!enabled) return;

    const work = document.querySelector("#work");
    const tech = document.querySelector("#tech");
    const contact = document.querySelector("#contact");
    if (!work || !tech || !contact) return;

    Object.assign(proxy, HERO_PROXY);

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: work,
        endTrigger: tech,
        start: "top 80%",
        end: "center center",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    tl.fromTo(proxy, transformsOf(HERO_PROXY), {
      ...transformsOf(WORK_PROXY),
      duration: 1,
    })
      .to(proxy, { ...transformsOf(EXPERIENCE_PROXY), duration: 1 })
      .to(proxy, { ...transformsOf(TECH_PROXY), duration: 1 });

    const contactTween = gsap.fromTo(
      proxy,
      { visible: 1 },
      {
        visible: 0,
        ease: "none",
        scrollTrigger: {
          trigger: contact,
          start: "top 80%",
          end: "top 35%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      },
    );

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      contactTween.scrollTrigger?.kill();
      contactTween.kill();
    };
  }, [proxy, enabled]);
}
