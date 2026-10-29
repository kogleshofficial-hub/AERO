"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Crosshair, MoveUpRight } from "lucide-react";

const AeroCore = dynamic(() => import("@/components/aero-core"), {
  ssr: false,
  loading: () => <div className="core-fallback" aria-hidden="true"><span /></div>
});

const rise = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

export default function Hero() {
  return <section className="hero" id="top" aria-labelledby="hero-title">
    <div className="hero__mesh" aria-hidden="true" />
    <div className="hero__topline mono">
      <span><i className="status-dot" /> INDEPENDENT BUILD UNIT / MY</span>
      <span className="hero__topline-center"><Crosshair size={12} /> AERO × KOGLESH</span>
      <span>UTC+08:00 <b>·</b> ASIA/KL</span>
    </div>
    <div className="hero__core-wrap" aria-hidden="true">
      <AeroCore />
      <div className="core-orbit-label core-orbit-label--one mono">01 / SIGNAL FOUND</div>
      <div className="core-orbit-label core-orbit-label--two mono">MOTION ≠ NOISE</div>
      <div className="core-orbit-label core-orbit-label--three mono">INPUT → RESPONSE</div>
    </div>
    <div className="hero__body">
      <motion.div className="hero__eyebrow mono" variants={rise} initial="hidden" animate="visible"><span className="eyebrow-line" /> DEVELOPER / CREATOR / COMPETITOR</motion.div>
      <motion.h1 id="hero-title" initial="hidden" animate="visible" variants={rise}>
        BUILT THROUGH
        <span className="hero__title-line"><span className="hero__outline">CODE.</span><span className="hero__asterisk">✳</span></span>
        <span className="hero__title-line hero__title-line--last">PROVEN THROUGH <em>ACTION.</em></span>
      </motion.h1>
      <motion.div className="hero__lower" initial="hidden" animate="visible" variants={rise} transition={{ delay: 0.15 }}>
        <p className="hero__intro">I’m <strong>Koglesh R. Murugan</strong> — an independent student builder turning ideas into working systems, and documenting the process through AERO.</p>
        <div className="hero__actions">
          <a className="button button--primary" href="#work"><span>EXPLORE THE WORK</span><MoveUpRight size={16} /></a>
          <a className="button button--quiet" href="#contact"><span>START A CONVERSATION</span><ArrowUpRight size={15} /></a>
        </div>
      </motion.div>
    </div>
    <div className="hero__index mono"><span>FIG. 001</span><span>A LIVING INDEX OF BUILDS</span><span>SCROLL TO INTERACT <ArrowDown size={12} /></span></div>
    <div className="hero__side-mark mono">KM / 26</div>
  </section>;
}