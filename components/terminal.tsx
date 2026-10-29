"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowRight, Terminal as TerminalIcon, X } from "lucide-react";

type Line = { kind: "input" | "output" | "accent"; text: string };
const email = "koglesh.official@gmail.com";
const helpText = "AVAILABLE COMMANDS\nhelp      list commands\ncontact   show contact route\nprojects  jump to selected builds\nwhoami    identify this build\nsecret    trigger hidden AERO pulse\nclear     clear terminal output";

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [command, setCommand] = useState("");
  const [lines, setLines] = useState<Line[]>([
    { kind: "accent", text: "AERO_OS / interactive shell ready." },
    { kind: "output", text: "Type help to see available commands." }
  ]);
  const [secretActive, setSecretActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "`") { event.preventDefault(); setOpen((value) => !value); }
      if (event.key === "Escape") setOpen(false);
    };
    const burst = () => { setSecretActive(true); window.setTimeout(() => setSecretActive(false), 900); };
    window.addEventListener("keydown", handleShortcut);
    window.addEventListener("aero:burst", burst);
    return () => { window.removeEventListener("keydown", handleShortcut); window.removeEventListener("aero:burst", burst); };
  }, []);
  useEffect(() => { if (open) window.setTimeout(() => inputRef.current?.focus(), 80); }, [open]);
  useEffect(() => { if (historyRef.current) historyRef.current.scrollTop = historyRef.current.scrollHeight; }, [lines]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const raw = command.trim();
    if (!raw) return;
    const cmd = raw.toLowerCase();
    const next: Line[] = [...lines, { kind: "input", text: "› " + raw }];
    const output = (text: string, kind: Line["kind"] = "output") => next.push({ kind, text });
    if (cmd === "help") output(helpText);
    else if (cmd === "whoami") output("KOGLESH R. MURUGAN / STUDENT DEVELOPER / CREATOR / TAEKWONDO COMPETITOR");
    else if (cmd === "projects") { output("JUMPING TO SELECTED BUILDS…", "accent"); document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" }); setOpen(false); }
    else if (cmd === "contact") output("CONTACT ROUTE: " + email + "\nNo message has been sent. Use the email link in the footer.");
    else if (cmd === "secret") {
      output("AERO PULSE UNLOCKED. THE CANVAS IS LISTENING.", "accent");
      window.dispatchEvent(new CustomEvent("aero:burst"));
      document.documentElement.classList.add("aero-secret-flash");
      window.setTimeout(() => document.documentElement.classList.remove("aero-secret-flash"), 900);
    } else if (cmd === "clear") { setLines([{ kind: "accent", text: "Terminal cleared. AERO_OS standing by." }]); setCommand(""); return; }
    else output("Command not found: " + raw + "\nTry help.");
    setLines(next.slice(-40));
    setCommand("");
  };

  return <div className={"terminal-module " + (open ? "is-open " : "") + (secretActive ? "is-pulsing" : "")} id="terminal">
    <button className="terminal-toggle mono" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="terminal-window">
      <span><TerminalIcon size={15}/><b>›_</b> TERMINAL</span><span>CTRL + <code>`</code> <span className="terminal-toggle__indicator"/></span>
    </button>
    {open && <div className="terminal-window" id="terminal-window">
      <div className="terminal-window__bar mono"><span><i/> AERO_OS / COMMAND INTERFACE</span><button onClick={() => setOpen(false)} aria-label="Close terminal"><X size={15}/></button></div>
      <div className="terminal-history mono" ref={historyRef} aria-live="polite">{lines.map((line, index) => <pre key={index + "-" + line.text} className={"terminal-line terminal-line--" + line.kind}>{line.text}</pre>)}</div>
      <form className="terminal-form mono" onSubmit={submit}><label htmlFor="terminal-command">›</label><input id="terminal-command" ref={inputRef} value={command} onChange={(event) => setCommand(event.target.value)} autoComplete="off" spellCheck={false} aria-label="Terminal command" placeholder="type a command..."/><button aria-label="Run command" type="submit"><ArrowRight size={16}/></button></form>
    </div>}
  </div>;
}