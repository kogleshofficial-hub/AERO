"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, GitBranch, Layers3 } from "lucide-react";
import { projects, type Project } from "@/lib/projects";

function Visual({ project }: { project: Project }) {
  return <div className={"project-visual project-visual--" + project.motif} aria-hidden="true">
    <div className="visual-topline mono"><span>A×K / {project.number}</span><span>VISUAL MODEL <i/></span></div>
    <svg viewBox="0 0 460 280" className="visual-svg">
      {Array.from({length: 9}).map((_, i) => <g key={"grid"+i}><line x1={30+i*50} y1="35" x2={30+i*50} y2="235" stroke="currentColor" strokeOpacity=".12"/><line x1="25" y1={35+i*24} x2="435" y2={35+i*24} stroke="currentColor" strokeOpacity=".08"/></g>)}
      {project.motif === "mirror" && <g><circle cx="230" cy="134" r="92" fill="none" stroke="#ffb469" strokeOpacity=".4" strokeDasharray="2 7"/><circle cx="230" cy="134" r="64" fill="none" stroke="#ffb469" strokeOpacity=".7"/><circle cx="230" cy="134" r="38" fill="none" stroke="#ffb469"/><circle cx="230" cy="134" r="8" fill="#fff5e6"/>{Array.from({length:12}).map((_,i)=><line key={i} x1="230" y1="134" x2={230+Math.cos(i*Math.PI/6)*73} y2={134+Math.sin(i*Math.PI/6)*73} stroke="#ffd0a2" strokeOpacity=".35"/>)}</g>}
      {project.motif === "grid" && <g><path d="M32 175 L83 175 L113 126 L151 158 L190 78 L226 121 L264 91 L300 143 L335 99 L370 121 L428 60" fill="none" stroke="#77cefa" strokeWidth="2"/><path d="M32 175 L83 175 L113 126 L151 158 L190 78 L226 121 L264 91 L300 143 L335 99 L370 121 L428 60 L428 230 L32 230 Z" fill="#75c8ed" fillOpacity=".08"/>{[[83,175],[113,126],[190,78],[264,91],[335,99],[428,60]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="4" fill="#a9e2ff"/>)}</g>}
      {project.motif === "pace" && <g>{Array.from({length:7}).map((_,day)=><g key={day}><text x={44+day*56} y="72" textAnchor="middle" fill="#b5a3d8" fontSize="9">{["M","T","W","T","F","S","S"][day]}</text><rect x={30+day*56} y="88" width="28" height="130" rx="4" fill="#a88cff" fillOpacity=".08" stroke="#a88cff" strokeOpacity=".22"/><rect x={35+day*56} y={178-[43,72,54,86,67,38,28][day]} width="18" height={[43,72,54,86,67,38,28][day]} rx="2" fill="#a88cff" fillOpacity={day===3?".95":".55"}/></g>)}</g>}
      {project.motif === "synapse" && <g>{[[230,133],[116,70],[75,173],[156,224],[329,62],[385,155],[310,224],[233,45],[227,230],[150,133],[315,125]].map(([x,y],i)=><g key={i}>{i>0&&<line x1="230" y1="133" x2={x} y2={y} stroke="#8ae5b8" strokeOpacity=".27"/>}<circle cx={x} cy={y} r={i===0?11:(i%3===0?5:3)} fill={i===0?"#d9ffeb":"#63d8a0"}/></g>)}</g>}
      {project.motif === "food" && <g><circle cx="230" cy="139" r="88" fill="none" stroke="#c6ef89" strokeOpacity=".25" strokeDasharray="3 8"/><circle cx="230" cy="139" r="58" fill="none" stroke="#c6ef89" strokeOpacity=".6"/><circle cx="230" cy="139" r="30" fill="#c6ef89" fillOpacity=".12" stroke="#d7ff9c"/><path d="M230 111 C208 95 192 116 206 136 C220 152 230 161 230 161 C230 161 244 149 255 136 C272 115 249 96 230 111 Z" fill="#d7ff9c" fillOpacity=".8"/><path d="M111 78 C152 39 193 45 215 68 M349 203 C310 241 271 234 247 212" fill="none" stroke="#c6ef89" strokeWidth="1.5" strokeDasharray="5 5"/></g>}
      <text x="25" y="260" fill="currentColor" opacity=".5" fontSize="10" letterSpacing="3">{project.category}</text>
    </svg>
    <div className="visual-bottomline mono"><span>FIG_{project.number}</span><span>INTERACTIVE PROXY</span><span>+ OPEN</span></div>
  </div>;
}

function Trace({ project }: { project: Project }) {
  const nodes = project.motif === "mirror" ? ["SCENARIO","MODEL","SIMULATE","METRICS"] : project.motif === "grid" ? ["TELEMETRY","VALIDATE","EVIDENCE","INFERENCE"] : project.motif === "pace" ? ["CAPTURE","PRIORITISE","ALLOCATE","REBALANCE"] : project.motif === "synapse" ? ["TASKS","STATE","SCHEDULE","NEXT MOVE"] : ["LISTING","AVAILABILITY","REQUEST","RESCUE"];
  return <div className="architecture-trace" aria-hidden="true"><div className="architecture-trace__head mono"><span>FLOW / {project.number}</span><span>ARCHITECTURE TRACE</span></div><svg viewBox="0 0 600 88" preserveAspectRatio="none"><path className="trace-path" d="M52 40 H548"/>{nodes.map((node,i)=><g key={node}><circle className="trace-node" cx={52+i*165} cy="40" r="5"/><text x={52+i*165} y="72" textAnchor="middle">{node}</text></g>)}</svg><p className="mono">ILLUSTRATIVE SUMMARY · NOT A RUNTIME TRACE</p></div>;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const x = useMotionValue(0), y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5,0.5], [3.5,-3.5]), { stiffness: 160, damping: 19 });
  const rotateY = useSpring(useTransform(x, [-0.5,0.5], [-4.5,4.5]), { stiffness: 160, damping: 19 });
  const [hovered,setHovered] = useState(false);
  const move = (event: React.MouseEvent<HTMLElement>) => { const r=event.currentTarget.getBoundingClientRect(); x.set((event.clientX-r.left)/r.width-.5); y.set((event.clientY-r.top)/r.height-.5); };
  return <motion.article className={"project-card project-card--"+project.motif+(hovered?" is-hovered":"")} style={{rotateX,rotateY,transformPerspective:1450}} onMouseMove={move} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>{setHovered(false);x.set(0);y.set(0);}} initial={{opacity:0,y:48}} whileInView={{opacity:1,y:0,transition:{duration:.7,delay:index*.07}}} viewport={{once:true,amount:.18}}>
    <div className="project-card__shell">
      <div className="project-card__heading"><div className="project-card__serial mono"><span>{project.number} / 05</span><span className="project-status"><i/>{project.status}</span></div><h3>{project.name}<sup>™</sup></h3><p className="project-card__category mono">{project.category}</p></div>
      <div className="project-card__screen"><Visual project={project}/></div>
      <Trace project={project}/>
      <div className="project-card__copy"><p>{project.description}</p><div className="project-card__principle"><span className="mono">DESIGN RULE</span><strong>{project.principle}</strong></div></div>
      <div className="project-card__footer"><div className="project-stack mono">{project.stack.map(tag=><span key={tag}>{tag}</span>)}</div><div className="project-card__links"><a href={project.href} target="_blank" rel="noreferrer" className="project-link">DETAILS <ArrowUpRight size={14}/></a><a href={project.source} target="_blank" rel="noreferrer" aria-label={"GitHub project index for "+project.name} className="project-link project-link--icon"><GitBranch size={15}/></a></div></div>
    </div>
  </motion.article>;
}

export default function ProjectRail() {
  const rail=useRef<HTMLDivElement>(null);
  const [active,setActive]=useState(0);
  const scrollByCard=(direction:-1|1)=>{const el=rail.current;if(!el)return;const card=el.querySelector<HTMLElement>(".project-card");const step=(card?.getBoundingClientRect().width??520)+24;el.scrollBy({left:step*direction,behavior:"smooth"});setActive((current)=>Math.min(projects.length-1,Math.max(0,current+direction)));};
  return <section className="work-section section-pad" id="work">
    <div className="section-heading"><div className="section-kicker mono"><span>02 / SELECTED SYSTEMS</span><span><Layers3 size={13}/> FIVE FEATURED BUILDS</span></div><div className="section-heading__row"><h2>WORK THAT<br/><em>HAS A PURPOSE.</em></h2><p className="section-description">Real builds, each with a defined problem, an explicit system boundary and a reason to exist. Visual diagrams are presentation aids, not live telemetry.</p></div></div>
    <div className="rail-controls mono"><div className="rail-controls__left"><Layers3 size={15}/><span>PROJECT INDEX / 05</span><span className="rail-controls__muted">DRAG OR USE ARROWS</span></div><div className="rail-controls__right"><span>0{active+1} <b>/</b> 0{projects.length}</span><button onClick={()=>scrollByCard(-1)} aria-label="Previous project" className="rail-arrow"><ArrowLeft size={17}/></button><button onClick={()=>scrollByCard(1)} aria-label="Next project" className="rail-arrow"><ArrowRight size={17}/></button></div></div>
    <div className="project-rail" ref={rail} onScroll={(event)=>{const el=event.currentTarget;const card=el.querySelector<HTMLElement>(".project-card");const step=(card?.getBoundingClientRect().width??520)+24;setActive(Math.min(projects.length-1,Math.round(el.scrollLeft/step)));}}>
      {projects.map((project,index)=><ProjectCard key={project.id} project={project} index={index}/>)}
      <div className="rail-endcap mono"><span>END OF INDEX</span><span>THE NEXT ONE ISN’T BUILT YET.</span><ArrowDownRight size={22}/></div>
    </div>
    <div className="rail-footnote mono"><span>NOTE / DIAGRAMS ARE PRESENTATION VISUALS.</span><span>SCROLL →</span></div>
  </section>;
}