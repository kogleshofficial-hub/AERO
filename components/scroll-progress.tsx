"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  useEffect(() => {
    const tween = gsap.to(".scroll-progress__fill", {
      scaleX: 1, ease: "none",
      scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.2 }
    });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);
  return <div className="scroll-progress" aria-hidden="true"><span className="scroll-progress__fill" /></div>;
}