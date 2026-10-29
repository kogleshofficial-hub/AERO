"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Award, CirclePlay, ExternalLink, ShieldCheck, Swords } from "lucide-react";

export default function Milestones() {
  return <section className="milestones-section section-pad" id="signal">
    <div className="section-kicker mono"><span>03 / OUTSIDE THE SCREEN</span><span><ShieldCheck size={13}/> DISCIPLINE IS PORTABLE</span></div>
    <div className="section-heading__row milestones-title-row">
      <h2>DIFFERENT ARENAS.<br/><em>SAME MINDSET.</em></h2>
      <p className="section-description">Software asks for patience with systems. Competition asks for composure under pressure. Creating asks for the courage to publish the attempt. I’m learning all three.</p>
    </div>
    <div className="duality-grid">
      <motion.article className="duality-panel fighter-panel" initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .65 }}>
        <div className="duality-panel__top mono"><span>DISCIPLINE / 001</span><span>THE FIGHTER <Swords size={14}/></span></div>
        <div className="fighter-art" aria-hidden="true">
          <div className="fighter-art__ring fighter-art__ring--one"/><div className="fighter-art__ring fighter-art__ring--two"/>
          <svg viewBox="0 0 420 330" className="fighter-svg">
            <defs><linearGradient id="fighter-stroke" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffc278"/><stop offset="1" stopColor="#fb6838" stopOpacity=".25"/></linearGradient></defs>
            <g fill="none" stroke="url(#fighter-stroke)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="205" cy="62" r="25"/><path d="M184 91 L155 141 L190 170 L225 128 L257 153 M155 141 L113 165 L87 142 M190 170 L160 219 L114 250 M190 170 L244 197 L303 188 M225 128 L273 111 L301 84 M257 153 L302 185 L335 181"/>
              <path d="M78 286 H342 M210 26 V300 M58 166 H362" strokeOpacity=".16" strokeDasharray="2 8"/>
            </g>
            <g fill="#ffc278"><circle cx="205" cy="62" r="3"/><circle cx="155" cy="141" r="3"/><circle cx="190" cy="170" r="3"/><circle cx="244" cy="197" r="3"/><circle cx="273" cy="111" r="3"/></g>
            <text x="28" y="306" fill="#d4b18a" fontSize="9" letterSpacing="3">FORM / BALANCE / CONTROL</text>
          </svg>
          <span className="fighter-art__label mono">POSE TRACE / ILLUSTRATIVE</span>
        </div>
        <div className="duality-panel__main"><p className="duality-label mono">INTERNATIONAL TAEKWONDO</p><h3>Earned<br/><em>under pressure.</em></h3><p className="duality-copy">Two international competition results. The medal matters; the routine behind it matters more.</p></div>
        <div className="achievement-list">
          <div className="achievement-item"><div className="achievement-medal"><Award size={20}/></div><div><span className="mono">28–29 SEP 2024 / MAPUSA, GOA</span><strong>VIFA Gewinn India Open</strong><p>International Taekwondo Championship · Gold medal</p></div><b className="achievement-tag">GOLD</b></div>
          <div className="achievement-item"><div className="achievement-medal achievement-medal--bronze"><Award size={20}/></div><div><span className="mono">2025 / KOREA</span><strong>10th MBC Cup Open</strong><p>International Taekwondo Championship · Bronze medal</p></div><b className="achievement-tag achievement-tag--bronze">BRONZE</b></div>
        </div>
        <div className="duality-panel__bottom mono"><span>DISCIPLINE / TAEKWONDO</span><span>RESULTS / PERSONAL RECORD</span></div>
      </motion.article>
      <motion.article className="duality-panel creator-panel" initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .65, delay: .08 }}>
        <div className="duality-panel__top mono"><span>EXPERIMENT / 002</span><span>THE CREATOR <CirclePlay size={14}/></span></div>
        <div className="creator-visual" aria-label="Abstract AERO creator visual"><div className="creator-visual__scanlines"/><div className="creator-visual__orb creator-visual__orb--a"/><div className="creator-visual__orb creator-visual__orb--b"/><div className="creator-visual__wordmark">AERO<span>®</span></div><div className="creator-visual__corner mono"><span>REC ●</span><span>FIELD NOTES / 026</span></div><div className="creator-visual__bottom mono"><span>CHALLENGE</span><span>ATTEMPT</span><span>PROGRESS</span><span>REPEAT ↗</span></div></div>
        <div className="duality-panel__main"><p className="duality-label mono">AERO / REAL ATTEMPTS, REAL PROGRESS</p><h3>Make the<br/><em>attempt the story.</em></h3><p className="duality-copy">A challenge-driven creator project about trying difficult things, learning in public and making each edit stronger than the last.</p></div>
        <div className="creator-metrics mono"><div><span>VIEWS</span><strong>35,550</strong><small>28-DAY WINDOW</small></div><div><span>WATCH HOURS</span><strong>125.3</strong><small>RECORDED TOTAL</small></div><div><span>SUBSCRIBERS</span><strong>+42</strong><small>NET CHANGE</small></div></div>
        <p className="metrics-disclaimer mono">YOUTUBE STUDIO SNAPSHOT · 12 SEP–09 OCT 2026. HISTORICAL ANALYTICS, NOT LIVE COUNTERS.</p>
        <div className="duality-panel__bottom mono"><span>FORMAT / SHORT-FORM VIDEO</span><a href="https://www.youtube.com/@ItsAero_Official" target="_blank" rel="noreferrer">OPEN AERO <ExternalLink size={12}/></a></div>
      </motion.article>
    </div>
    <div className="signal-statement"><span className="mono">THE COMMON THREAD</span><p>Repeat the work.<br/><em>Improve the system.</em><br/>Show what actually happened.</p><ArrowUpRight size={22}/></div>
  </section>;
}