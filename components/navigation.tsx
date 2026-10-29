"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { href: "#work", label: "WORK" },
  { href: "#signal", label: "SIGNAL" },
  { href: "#method", label: "METHOD" }
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("top");

  useEffect(() => {
    const sections = ["top", "work", "signal", "method", "contact"].map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActive(visible.target.id);
    }, { rootMargin: "-15% 0px -65% 0px", threshold: [0, 0.2, 0.5] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const go = () => setMenuOpen(false);
  return (
    <header className="site-nav">
      <a className="brand-lockup" href="#top" aria-label="AERO by Koglesh home" onClick={go}>
        <span className="brand-symbol"><i/><i/><i/></span>
        <span className="brand-wordmark">AERO <b>×</b> KOGLESH<span className="brand-wordmark__sub mono">INDEPENDENT BUILD UNIT</span></span>
      </a>
      <nav className={`site-nav__links ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
        {links.map((link, index) => <a key={link.href} href={link.href} onClick={go} className={active === link.href.slice(1) ? "is-active" : ""}><span className="mono">0{index + 1}</span>{link.label}</a>)}
        <a href="#contact" className="site-nav__contact" onClick={go}>LET’S TALK <ArrowUpRight size={14}/></a>
      </nav>
      <button className="site-nav__menu" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>{menuOpen ? <X size={19}/> : <Menu size={19}/>}</button>
      <span className="site-nav__status mono"><i className="status-dot"/> SYSTEM ACTIVE</span>
    </header>
  );
}