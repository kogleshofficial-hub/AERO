import Hero from "@/components/hero";
import Navigation from "@/components/navigation";
import ProjectRail from "@/components/project-rail";
import Milestones from "@/components/milestones";
import Terminal from "@/components/terminal";
import { ArrowDownRight, Braces, Check, Code2, Github, Mail, MoveUpRight, ScanLine } from "lucide-react";

const principles = [
  { id: "01", icon: Braces, title: "Model the real problem.", body: "Start with the constraints and user need. Code comes after the question is understood." },
  { id: "02", icon: ScanLine, title: "Make state visible.", body: "Separate evidence from inference. Show assumptions, boundaries and what the system cannot claim." },
  { id: "03", icon: Code2, title: "Ship, then learn.", body: "A project becomes useful when it runs, gets examined and improves through real feedback." }
];

export default function HomePage() {
  return <main className="site-shell">
    <div className="ambient-grid" aria-hidden="true"/>
    <Navigation/>
    <Hero/>
    <section className="manifesto-band" aria-label="Portfolio statement">
      <div className="manifesto-band__ticker mono" aria-hidden="true"><span>BUILD / TEST / REPEAT</span><i/><span>NO FAKE SIGNALS</span><i/><span>BUILD / TEST / REPEAT</span><i/><span>NO FAKE SIGNALS</span></div>
      <div className="manifesto-band__inner"><span className="mono manifesto-band__eyebrow">01 / THE OPERATING PRINCIPLE</span><p>Ideas are cheap.<br/><span>Execution leaves a trace.</span></p><div className="manifesto-band__bottom"><span className="mono">CODE IS THE TOOL. IMPACT IS THE TEST.</span><ArrowDownRight size={21}/></div></div>
    </section>
    <ProjectRail/>
    <Milestones/>
    <section className="method-section section-pad" id="method">
      <div className="section-kicker mono"><span>04 / HOW I APPROACH A BUILD</span><span><Check size={13}/> PRINCIPLES OVER HYPE</span></div>
      <div className="method-head"><h2>THE METHOD IS<br/><em>THE DIFFERENCE.</em></h2><p>Different tools for different problems. One consistent standard: a clear boundary between what’s built, what’s simulated, and what’s still to prove.</p></div>
      <div className="principle-grid">{principles.map(({id,icon:Icon,title,body})=><article className="principle-card" key={id}><div className="principle-card__top mono"><span>RULE / {id}</span><Icon size={18}/></div><h3>{title}</h3><p>{body}</p><div className="principle-card__line"><span/><span/></div></article>)}</div>
      <div className="stack-register"><span className="mono">CURRENT TOOLKIT / NOT A LIMITING LIST</span><div className="stack-register__tags mono">{["NEXT.JS","REACT","TYPESCRIPT","TAILWIND","POSTGRESQL","SUPABASE","APPWRITE","THREE.JS","GSAP","GIT / GITHUB","VERCEL","JAVA"].map(tag=><span key={tag}>{tag}</span>)}</div></div>
    </section>
    <section className="contact-section section-pad" id="contact">
      <div className="contact-section__grid" aria-hidden="true"/>
      <div className="section-kicker mono"><span>05 / OPEN CHANNEL</span><span>CONTACT PROTOCOL / READY</span></div>
      <div className="contact-title-wrap"><p className="mono contact-eyebrow"><span className="status-dot"/> GOT A REAL PROBLEM TO SOLVE?</p><h2>LET’S<br/><em>MAKE IT</em><br/>WORK<span className="contact-period">.</span></h2></div>
      <div className="contact-bottom"><p>Thoughtful products, interesting engineering problems, collaborations and opportunities to learn from people building useful things are welcome.</p><a className="contact-email-link" href="mailto:koglesh.official@gmail.com"><span className="contact-email-link__icon"><Mail size={19}/></span><span><small className="mono">DIRECT LINE / EMAIL</small><strong>koglesh.official@gmail.com</strong></span><MoveUpRight size={20}/></a></div>
      <Terminal/>
    </section>
    <footer className="site-footer">
      <div className="site-footer__top"><a className="footer-brand" href="#top"><span className="brand-symbol"><i/><i/><i/></span><span>AERO <b>×</b> KOGLESH</span></a><p className="mono">INDEPENDENT BUILD UNIT<br/>NILAI, MALAYSIA / UTC+08:00</p><a className="back-to-top mono" href="#top">BACK TO TOP ↑</a></div>
      <div className="site-footer__bottom"><span className="mono">© 2026 KOGLESH R. MURUGAN. BUILT WITH INTENT.</span><div className="footer-socials"><a href="https://github.com/kogleshofficial-hub" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17}/></a><a href="https://www.youtube.com/@ItsAero_Official" target="_blank" rel="noreferrer" aria-label="AERO on YouTube"><MoveUpRight size={17}/></a></div><span className="mono footer-status"><i className="status-dot"/> ALL SYSTEMS / ITERATING</span></div>
      <div className="footer-bottom-note mono"><span>NO CLAIMS WITHOUT CONTEXT.</span><span>MADE TO BE USED, NOT JUST LOOKED AT.</span></div>
    </footer>
  </main>;
}