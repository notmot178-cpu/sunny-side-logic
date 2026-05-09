import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";
import { useServerFn } from "@tanstack/react-start";
import { chatWithSatAI } from "@/lib/chat.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Satyajit Parida — AI/ML Engineer & Researcher" },
      { name: "description", content: "Final-year CSE student. IEEE-published researcher. Agentic RAG · Real-time MLOps · Edge CV." },
      { name: "keywords", content: "Satyajit Parida, AI Engineer, ML Engineer, MLOps, RAG, LangGraph, Computer Vision, IEEE, Bhubaneswar" },
      { property: "og:title", content: "Satyajit Parida — AI/ML Engineer & Researcher" },
      { property: "og:description", content: "Agentic RAG · Real-time MLOps · Edge CV. IEEE published." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const RESUME_URL = "https://drive.google.com/file/d/1O8GtodpCw8eYG4C0WQmRVM3PpsrBvKwL/view?usp=sharing";
const GITHUB_URL = "https://github.com/sat1828";
const LINKEDIN_URL = "https://www.linkedin.com/in/satyajit-parida-48a34230a";
const LEETCODE_URL = "https://leetcode.com/u/Satyajit1828/";
const KAGGLE_URL = "https://www.kaggle.com/satyajit1828";
const EMAIL = "satyajitparida294@gmail.com";
const PHONE = "+918260743307";

function HomePage() {
  useTheme();
  useReveal();
  useScrollProgress();
  useEasterEgg();

  return (
    <>
      <ThemeBootScript />
      <PersonSchema />
      <ScrollProgressBar />
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Work />
        <Skills />
        <SoftSkills />
        <Experience />
        <Recognition />
        <Certifications />
        <Profiles />
        <Writing />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}

/* ---------------- THEME ---------------- */
function ThemeBootScript() {
  return (
    <script
      // runs inline before hydration to avoid theme flash
      dangerouslySetInnerHTML={{
        __html: `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`,
      }}
    />
  );
}
function useTheme() {
  useEffect(() => {
    const t = document.documentElement.getAttribute("data-theme") || "light";
    document.documentElement.setAttribute("data-theme", t);
  }, []);
}
function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    setTheme((document.documentElement.getAttribute("data-theme") as "light" | "dark") || "light");
  }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch {}
  };
  const dark = theme === "dark";
  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
      style={{
        width: 44, height: 24, borderRadius: 999,
        border: "1.5px solid var(--border)",
        background: dark ? "var(--coral)" : "var(--bg)",
        position: "relative", padding: 0,
        transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
      }}
    >
      <span style={{
        position: "absolute", top: 2, left: dark ? 22 : 2,
        width: 18, height: 18, borderRadius: "50%",
        background: "var(--surface)",
        boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 10, transition: "left 0.3s cubic-bezier(0.34,1.56,0.64,1)",
      }}>{dark ? "☾" : "☀"}</span>
    </button>
  );
}

/* ---------------- SCROLL PROGRESS ---------------- */
function ScrollProgressBar() {
  return (
    <div id="scroll-progress" style={{
      position: "fixed", top: 0, left: 0, height: 3, width: "0%", zIndex: 9999,
      background: "linear-gradient(90deg, #FF5B2E 0%, #1A4DFF 50%, #0A8754 100%)",
      transition: "width 80ms linear",
    }} />
  );
}
function useScrollProgress() {
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)) * 100;
      const el = document.getElementById("scroll-progress");
      if (el) el.style.width = pct + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

/* ---------------- REVEAL OBSERVER ---------------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------------- NAV ---------------- */
const NAV_LINKS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header style={{
      position: "fixed", top: scrolled ? 16 : 0, left: scrolled ? "50%" : 0, right: scrolled ? "auto" : 0,
      transform: scrolled ? "translateX(-50%)" : "none",
      zIndex: 100,
      transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
      width: scrolled ? "auto" : "100%",
    }}>
      <div className="glass" style={{
        display: "flex", alignItems: "center", gap: 16,
        padding: scrolled ? "8px 14px" : "16px 32px",
        borderRadius: scrolled ? 999 : 0,
        boxShadow: scrolled ? "0 8px 32px rgba(14,14,16,0.12)" : "0 1px 20px rgba(14,14,16,0.06)",
      }}>
        <a href="#main" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "linear-gradient(135deg, #FF5B2E, #FF8C42)",
            color: "white", fontWeight: 800, fontSize: 13,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 12px rgba(255,91,46,0.4)",
          }}>SP</span>
          {!scrolled && <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 18 }}>Satyajit</span>}
        </a>
        <nav style={{ display: "flex", gap: 4, marginLeft: "auto", marginRight: "auto" }} className="hide-mobile">
          {NAV_LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} style={{
              padding: "8px 14px", borderRadius: 999,
              fontSize: 14, fontWeight: 500, color: "var(--muted)",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--coral)"; (e.currentTarget as HTMLElement).style.background = "var(--coral-tint)"; }}
            onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--muted)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
              {l.label}
            </a>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <ThemeToggle />
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" style={{
            padding: "10px 18px", borderRadius: 999,
            background: "var(--coral)", color: "white",
            fontSize: 13, fontWeight: 700,
            boxShadow: "0 4px 14px rgba(255,91,46,0.35)",
            transition: "all 0.2s ease",
          }}
          onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--coral-deep)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
          onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--coral)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
            Resume ↗
          </a>
          <button className="show-mobile" onClick={() => setOpen(!open)} aria-label="Menu" style={{
            background: "transparent", border: "none", padding: 8, color: "var(--ink)",
          }}>
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
      {open && (
        <div className="show-mobile glass" style={{
          marginTop: 8, padding: 14, borderRadius: 20,
          display: "flex", flexDirection: "column", gap: 4,
        }}>
          {NAV_LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)} style={{ padding: "12px 14px", borderRadius: 12, fontWeight: 500 }}>
              {l.label}
            </a>
          ))}
        </div>
      )}
      <style>{`
        @media (max-width: 768px) { .hide-mobile { display: none !important; } }
        @media (min-width: 769px) { .show-mobile { display: none !important; } }
      `}</style>
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section style={{
      minHeight: "100vh",
      padding: "140px 48px 80px",
      background: `radial-gradient(ellipse at 65% 50%, rgba(255,91,46,0.08) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(26,77,255,0.05) 0%, transparent 55%), var(--bg)`,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        display: "grid", gridTemplateColumns: "1.2fr 1fr",
        gap: 64, alignItems: "center",
      }} className="hero-grid">
        <div className="reveal">
          <div className="eyebrow" style={{ marginBottom: 24 }}>Bhubaneswar, India</div>
          <h1 className="h1">
            Satyajit Parida —<br />
            <em className="italic-coral">building</em> AI systems<br />
            that <em className="italic-coral">actually ship.</em>
          </h1>
          <p style={{ marginTop: 32, fontSize: 17, color: "var(--muted)", maxWidth: 480, lineHeight: 1.7 }}>
            Final-year CSE student. IEEE-published researcher. I design agentic RAG pipelines, real-time MLOps loops, and edge-deployed computer-vision systems.
          </p>
          <div style={{ marginTop: 32, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href="#work" className="btn-clay">View Work →</a>
            <a href={`mailto:${EMAIL}`} className="btn-neu">Get in touch</a>
          </div>
          <div style={{
            marginTop: 28, display: "inline-flex", alignItems: "center", gap: 10,
            padding: "9px 18px", borderRadius: 999,
            background: "var(--forest-tint)", border: "1px solid rgba(10,135,84,0.2)",
            fontSize: 13, fontWeight: 500, color: "var(--forest)",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--forest)", animation: "pulse-dot 2s infinite" }} />
            Open to AI/ML & Computer Vision roles
          </div>
        </div>
        <div className="reveal">
          <OrbitalVisual />
        </div>
      </div>
      <StatsStrip />
      <div style={{
        marginTop: 48, display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
      }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, textTransform: "uppercase", color: "var(--muted)", opacity: 0.5 }}>scroll</span>
        <div style={{ width: 22, height: 36, border: "2px solid var(--muted)", borderRadius: 11, opacity: 0.4 }}>
          <div style={{ width: 4, height: 8, background: "var(--coral)", borderRadius: 2, margin: "6px auto 0", animation: "scroll-bounce 2s ease-in-out infinite" }} />
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .hero-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function OrbitalVisual() {
  return (
    <div style={{
      position: "relative", width: "100%", aspectRatio: "1",
      maxWidth: 480, margin: "0 auto",
      borderRadius: 32, overflow: "hidden",
      background: "linear-gradient(135deg, var(--coral-tint) 0%, var(--indigo-tint) 60%, var(--forest-tint) 100%)",
      border: "1px solid var(--border)",
      boxShadow: "var(--clay-shadow)",
    }}>
      {/* IEEE badge */}
      <div className="glass" style={{
        position: "absolute", top: 16, right: 16, zIndex: 5,
        padding: "5px 12px", borderRadius: 999,
        fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, color: "var(--coral)",
        border: "1px solid rgba(255,91,46,0.2)",
      }}>
        IEEE Member #101009704
      </div>
      {/* Rings */}
      {[
        { size: "55%", border: "2px dashed rgba(255,91,46,0.35)", anim: "spin-cw 20s linear infinite" },
        { size: "72%", border: "1.5px solid rgba(26,77,255,0.25)", anim: "spin-ccw 16s linear infinite" },
        { size: "90%", border: "1px dotted rgba(10,135,84,0.2)", anim: "spin-cw 28s linear infinite" },
      ].map((r, i) => (
        <div key={i} style={{
          position: "absolute", top: "50%", left: "50%",
          width: r.size, height: r.size,
          marginTop: `calc(-1 * ${r.size} / 2)`, marginLeft: `calc(-1 * ${r.size} / 2)`,
          borderRadius: "50%", border: r.border, animation: r.anim,
        }} />
      ))}
      {/* Orbiting nodes - on the middle ring */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * 60 * Math.PI) / 180;
        const r = 36; // % from center
        return (
          <div key={i} style={{
            position: "absolute", top: `calc(50% + ${Math.sin(angle) * r}% - 6px)`,
            left: `calc(50% + ${Math.cos(angle) * r}% - 6px)`,
            width: 12, height: 12, borderRadius: "50%",
            background: i % 2 === 0 ? "var(--coral)" : "var(--indigo)",
            boxShadow: `0 0 12px ${i % 2 === 0 ? "rgba(255,91,46,0.6)" : "rgba(26,77,255,0.5)"}`,
          }} />
        );
      })}
      {/* Center SP */}
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: 120, height: 120, borderRadius: "50%",
        background: "var(--surface)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 44,
        color: "var(--coral)", fontWeight: 600,
        boxShadow: "0 8px 32px rgba(255,91,46,0.25)",
      }}>SP</div>
    </div>
  );
}

function StatsStrip() {
  const stats = [
    { v: "9.75", suf: "/10", l: "SGPA" },
    { v: "9", suf: "", l: "Production Projects" },
    { v: "1", suf: "", l: "IEEE Paper" },
    { v: "6", suf: "", l: "Job Simulations" },
    { v: "50", suf: "-day", l: "LeetCode Streak" },
  ];
  return (
    <div className="reveal" style={{
      maxWidth: 1280, margin: "80px auto 0",
      borderRadius: 24,
      background: "linear-gradient(145deg, var(--surface), var(--surface-2))",
      border: "1px solid var(--border)",
      boxShadow: "var(--clay-shadow)",
      display: "flex", flexWrap: "wrap",
    }}>
      {stats.map((s, i) => (
        <div key={i} style={{
          flex: 1, minWidth: 140, padding: "22px 16px", textAlign: "center",
          borderRight: i < stats.length - 1 ? "1px solid var(--border)" : "none",
        }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 700, color: "var(--coral)" }}>
            {s.v}<span style={{ fontSize: 18 }}>{s.suf}</span>
          </div>
          <div style={{ marginTop: 4, fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)" }}>
            {s.l}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- MARQUEE ---------------- */
function Marquee() {
  const items = [
    "IEEE Published",
    "SGPA 9.75/10",
    "TechNova Grand Finalist",
    "LeetCode 50-Day Streak",
    "Top-25 GeeksforGeeks Hackathon",
    "OCI Generative AI Professional",
  ];
  const all = [...items, ...items, ...items, ...items];
  return (
    <div style={{
      padding: "16px 0", overflow: "hidden",
      background: "var(--surface)",
      borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)",
    }}>
      <div style={{ display: "flex", whiteSpace: "nowrap", animation: "marquee 38s linear infinite" }}>
        {all.map((t, i) => (
          <span key={i} style={{
            display: "inline-flex", alignItems: "center", gap: 16, padding: "0 20px",
            fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 500,
            color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase",
          }}>
            {t} <span style={{ color: "var(--coral)", fontSize: 10 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- ABOUT ---------------- */
function About() {
  return (
    <section id="about" className="section">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="about-grid">
        <div className="reveal">
          <OrbitalVisual />
        </div>
        <div className="reveal">
          <div className="eyebrow">About</div>
          <h2 className="h2" style={{ marginTop: 12 }}>
            The person behind<br />
            <em className="italic-coral">the systems.</em>
          </h2>
          <div style={{ marginTop: 24, color: "var(--muted)", fontSize: 15, lineHeight: 1.75, display: "flex", flexDirection: "column", gap: 16 }}>
            <p>Final-year B.Tech CSE student at Centurion University, Bhubaneswar (2022–2026), maintaining a <strong style={{ color: "var(--ink)" }}>SGPA of 9.75/10</strong>. I sit at the intersection of applied research and production engineering.</p>
            <p>I build production-grade agentic RAG pipelines, real-time MLOps loops, multi-agent LLM applications, and edge-deployed computer vision systems. <strong style={{ color: "var(--ink)" }}>Published at IEEE CCPIS 2025.</strong></p>
            <p>I care about systems that survive contact with the real world. Clean code, reproducible pipelines, honest metrics.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 28 }}>
            {[
              ["Location", "Bhubaneswar, Odisha"],
              ["Education", "B.Tech CSE, 2026"],
              ["Focus", "AI/ML · CV · MLOps"],
              ["Status", "Open to roles"],
            ].map(([l, v]) => (
              <div key={l} className="neu" style={{ padding: "14px 16px" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)" }}>{l}</div>
                <div style={{ marginTop: 4, fontWeight: 700, fontSize: 14, color: "var(--ink)" }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="btn-clay">LinkedIn</a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn-neu">GitHub ↗</a>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 900px) { .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>
    </section>
  );
}

/* ---------------- WORK ---------------- */
type Project = {
  id: string;
  num: string;
  period: string;
  title: string;
  tagline: string;
  accent: string;
  metrics: string[];
  stack: string[];
  description: string;
  why: string;
  demo: string;
  ieee?: boolean;
  Visual: React.ComponentType;
};

const PROJECTS: Project[] = [
  {
    id: "fraud", num: "01/06", period: "2025", accent: "#FF5B2E",
    title: "Fraud-Stream",
    tagline: "Real-time fraud detection at 20 TPS with drift monitoring.",
    metrics: ["AUC 0.96 · 42ms p95", "20 TPS sustained", "Drift alerts via Evidently"],
    stack: ["XGBoost", "Feast", "Redpanda", "FastAPI", "MLflow", "Evidently", "Docker", "Prometheus"],
    description: "Streaming feature pipeline (Redpanda → Feast online store) feeding XGBoost at <50ms p95. Drift detection with Evidently triggers retrain via MLflow registry. Hot-swap zero-downtime deploys.",
    why: "Latency and explainability mattered more than raw accuracy — XGBoost over deep learning was a deliberate trade-off.",
    demo: "https://fraud-stream.satyajitparida.dev",
    Visual: FraudVisual,
  },
  {
    id: "doc", num: "02/06", period: "2025", accent: "#1A4DFF",
    title: "Doc-Agent",
    tagline: "Agentic RAG over enterprise docs with cross-encoder rerank.",
    metrics: ["0.92 faithfulness", "2.5% hallucination rate", "85ms retrieval p95"],
    stack: ["LangGraph", "pgvector", "IBM Docling", "sentence-transformers", "Cross-encoder", "FastAPI", "PostgreSQL"],
    description: "Multi-stage retrieval: BM25 + dense pgvector search → cross-encoder rerank → faithfulness verifier node. LangGraph orchestrates the loop with explicit state.",
    why: "Most RAG demos hide their hallucination rate. This one measures it.",
    demo: "https://doc-agent.satyajitparida.dev",
    Visual: DocVisual,
  },
  {
    id: "support", num: "03/06", period: "2025", accent: "#0A8754",
    title: "SupportForge",
    tagline: "Multi-agent customer support with 7-node LangGraph state machine.",
    metrics: ["0 crashes / 130 edge-cases", "<200ms median", "7-node graph"],
    stack: ["LangGraph", "FastAPI", "Redis", "PostgreSQL", "WebSockets", "Docker"],
    description: "Router → classifier → tool-using agents → verifier → escalation. Every node is observable; every transition is logged.",
    why: "The point of multi-agent isn't more agents — it's clear ownership of each step.",
    demo: "https://support-forge.satyajitparida.dev",
    Visual: SupportVisual,
  },
  {
    id: "shield", num: "04/06", period: "IEEE 2025", accent: "#8B5CF6", ieee: true,
    title: "Invisible-Shield",
    tagline: "Behavioral bot detection via keystroke + mouse dynamics. IEEE published.",
    metrics: ["IEEE CCPIS 2025", "Real-time scoring", "Bot score 0.82+ on synthetic traffic"],
    stack: ["Python", "scikit-learn", "FastAPI", "Redis", "Feature Engineering", "SHAP"],
    description: "Behavioral biometrics fingerprint each visitor. Feature engineering on keystroke timing + mouse trajectory curvature, scored online.",
    why: "Captchas are hostile UX. Invisible passive scoring is the right answer.",
    demo: "https://invisible-shield.satyajitparida.dev",
    Visual: ShieldVisual,
  },
  {
    id: "lingo", num: "05/06", period: "2024", accent: "#D97706",
    title: "Lingo-Bot",
    tagline: "CNN-LSTM sign language to speech, deployed on a $35 Raspberry Pi.",
    metrics: ["Sub-second inference", "Edge AI offline", "Raspberry Pi 4"],
    stack: ["PyTorch", "CNN-LSTM", "OpenCV", "TFLite", "Python", "Raspberry Pi"],
    description: "CNN extracts spatial features per frame; LSTM handles temporal sequence. Quantized to int8 for edge.",
    why: "Cloud isn't a luxury for users with intermittent connectivity. Offline-first was the requirement.",
    demo: GITHUB_URL,
    Visual: LingoVisual,
  },
  {
    id: "sidecar", num: "06/06", period: "2024", accent: "#0EA5E9",
    title: "Side-Car",
    tagline: "Real-time ride matching with OSRM routing and live ETAs.",
    metrics: ["OSRM routing", "Real-time matching", "Live driver tracking"],
    stack: ["Spring Boot", "OSRM", "Leaflet.js", "MySQL", "WebSockets", "Java"],
    description: "Match riders to drivers using OSRM road-network distance, not haversine. Driver positions stream over WebSockets.",
    why: "Distance on a map ≠ distance on roads. Routing matters.",
    demo: GITHUB_URL,
    Visual: SidecarVisual,
  },
];

function Work() {
  const [active, setActive] = useState<Project | null>(null);
  return (
    <section id="work" className="section">
      <div className="reveal" style={{ marginBottom: 48 }}>
        <div className="eyebrow">Selected Work</div>
        <h2 className="h2" style={{ marginTop: 12 }}>
          Six systems I've <em className="italic-coral">built and shipped.</em>
        </h2>
        <p style={{ marginTop: 12, color: "var(--muted)", maxWidth: 560 }}>Click any card for the full architecture and deep-dive.</p>
      </div>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: 28,
      }}>
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} p={p} delay={i * 90} onClick={() => setActive(p)} />
        ))}
      </div>
      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </section>
  );
}

function ProjectCard({ p, delay, onClick }: { p: Project; delay: number; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateZ(6px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0)"; };

  return (
    <div ref={ref} className="reveal clay" onClick={onClick} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{
        cursor: "pointer", overflow: "hidden",
        transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease",
        animationDelay: `${delay}ms`,
      }}>
      <div style={{
        position: "relative", height: 200, overflow: "hidden",
        background: `linear-gradient(135deg, ${p.accent}14, ${p.accent}04)`,
      }}>
        <div style={{ position: "absolute", top: 10, left: 10, display: "flex", gap: 6, zIndex: 2 }}>
          <span className="chip">{p.num}</span>
          <span className="chip">{p.period}</span>
          {p.ieee && <span className="chip" style={{ color: "var(--coral)", borderColor: "rgba(255,91,46,0.3)" }}>IEEE</span>}
        </div>
        <p.Visual />
      </div>
      <div style={{ padding: "20px 22px 22px" }}>
        <h3 className="h3" style={{ fontSize: 22 }}>{p.title}</h3>
        <p style={{ marginTop: 4, fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>{p.tagline}</p>
        <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 4 }}>
          {p.metrics.slice(0, 3).map((m, i) => (
            <div key={i} style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--ink)" }}>
              <span style={{ color: p.accent, marginRight: 6 }}>→</span>{m}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 5 }}>
          {p.stack.slice(0, 5).map((s) => (
            <span key={s} className="chip">{s}</span>
          ))}
          {p.stack.length > 5 && <span className="chip">+{p.stack.length - 5}</span>}
        </div>
        <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700 }}>
          <span style={{ color: p.accent }}>Case Study →</span>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ color: "var(--muted)", fontWeight: 600 }}>GitHub ↗</a>
        </div>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  return (
    <div role="dialog" aria-modal="true" onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 2000,
      background: "rgba(11,11,15,0.85)", backdropFilter: "blur(16px)",
      overflowY: "auto", padding: "32px 16px 60px",
      display: "flex", justifyContent: "center", alignItems: "flex-start",
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        maxWidth: 900, width: "100%",
        background: "var(--surface)", borderRadius: 28,
        border: "1px solid var(--border)",
        boxShadow: `0 60px 120px rgba(0,0,0,0.4), 0 0 0 1px ${project.accent}22`,
        overflow: "hidden", animation: "panel-in 0.45s cubic-bezier(0.34,1.56,0.64,1)",
      }}>
        <div style={{
          padding: "28px 32px",
          background: `linear-gradient(135deg, ${project.accent}14, ${project.accent}04)`,
          borderBottom: `1px solid ${project.accent}22`, position: "relative",
        }}>
          <button onClick={onClose} aria-label="Close" style={{
            position: "absolute", top: 16, right: 16,
            width: 36, height: 36, borderRadius: "50%",
            border: "1px solid var(--border)", background: "var(--surface)",
            fontSize: 18, color: "var(--ink)",
          }}>✕</button>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <span className="chip">{project.num}</span>
            <span className="chip">{project.period}</span>
            {project.ieee && <span className="chip" style={{ color: "var(--coral)" }}>IEEE CCPIS 2025</span>}
          </div>
          <h2 className="h2" style={{ fontSize: "clamp(24px,4vw,40px)", marginTop: 12 }}>{project.title}</h2>
          <p style={{ marginTop: 8, color: "var(--muted)", fontSize: 15 }}>{project.tagline}</p>
        </div>
        <div style={{ padding: 32 }}>
          <div style={{
            height: 240, marginBottom: 28, borderRadius: 16, overflow: "hidden",
            background: `linear-gradient(135deg, ${project.accent}14, ${project.accent}04)`,
          }}>
            <project.Visual />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12, marginBottom: 24 }}>
            {project.metrics.map((m, i) => (
              <div key={i} style={{
                padding: 16, borderRadius: 12,
                background: `${project.accent}0C`, border: `1px solid ${project.accent}22`,
                fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink)",
              }}>{m}</div>
            ))}
          </div>
          <h4 style={{ fontFamily: "var(--font-display)", fontSize: 20, marginBottom: 8 }}>Technical deep-dive</h4>
          <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.75, padding: 20, borderRadius: 12, background: "var(--bg)", border: "1px solid var(--border)" }}>{project.description}</p>
          <div style={{ marginTop: 24, padding: "16px 20px", borderLeft: `3px solid ${project.accent}` }}>
            <div className="eyebrow" style={{ color: project.accent }}>Why It Matters</div>
            <p style={{ marginTop: 8, fontStyle: "italic", color: "var(--ink)" }}>{project.why}</p>
          </div>
          <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 6 }}>
            {project.stack.map((s) => <span key={s} className="chip">{s}</span>)}
          </div>
          <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href={project.demo} target="_blank" rel="noopener noreferrer" style={{
              padding: "12px 24px", borderRadius: 999,
              background: project.accent, color: "white", fontWeight: 700, fontSize: 14,
            }}>Live Demo ↗</a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" style={{
              padding: "12px 24px", borderRadius: 999,
              border: `1px solid ${project.accent}`, color: project.accent, fontWeight: 700, fontSize: 14,
            }}>GitHub ↗</a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- PROJECT VISUALS (SVGs) ---------------- */
function FraudVisual() {
  return (
    <svg viewBox="0 0 400 220" width="100%" height="100%">
      {[40, 70, 100, 130, 160, 190].map((y) => <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="#FF5B2E" strokeOpacity="0.06" />)}
      <polyline points="0,160 40,140 80,155 120,100 160,120 200,80 240,110 280,60 320,90 360,50 400,70"
        fill="none" stroke="#FF5B2E" strokeWidth="2.5" strokeLinecap="round" opacity="0.85"
        strokeDasharray="800" style={{ animation: "draw-line 8s linear infinite" }} />
      <polyline points="0,180 60,170 120,175 180,160 240,165 300,150 360,155 400,148" fill="none" stroke="#FF5B2E" strokeOpacity="0.2" />
      <polyline points="0,130 80,125 160,140 240,120 320,130 400,110" fill="none" stroke="#1A4DFF" strokeOpacity="0.25" />
      <circle cx="200" cy="80" r="14" fill="#FF5B2E" opacity="0.15" />
      <circle cx="200" cy="80" r="5" fill="#FF5B2E" style={{ animation: "alert-pulse 1.8s infinite" }} />
      {["Feast", "XGB", "API", "Drift", "MLflow"].map((t, i) => (
        <g key={t}>
          <rect x={10 + i * 78} y="200" width="68" height="14" rx="4" fill="#FF5B2E" opacity="0.12" />
          <text x={44 + i * 78} y="210" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fill="#FF5B2E" fontWeight="600">{t}</text>
        </g>
      ))}
      <text x="10" y="20" fontFamily="JetBrains Mono" fontSize="10" fontWeight="600" fill="#FF5B2E">AUC 0.96 · 42ms · 20 TPS</text>
    </svg>
  );
}
function DocVisual() {
  return (
    <svg viewBox="0 0 400 220" width="100%" height="100%">
      {[30, 100, 170].map((x) => (
        <g key={x}>
          <rect x={x} y="60" width="50" height="68" rx="5" fill="#1A4DFF" opacity="0.12" stroke="#1A4DFF" strokeOpacity="0.4" />
          {[72, 84, 96, 108].map((y) => <rect key={y} x={x + 6} y={y} width="38" height="3" rx="1" fill="#1A4DFF" opacity="0.4" />)}
        </g>
      ))}
      {[
        { x: 230, c: "#1A4DFF", t: "vec" },
        { x: 290, c: "#8B5CF6", t: "rerank" },
        { x: 350, c: "#0A8754", t: "verify" },
      ].map((s) => (
        <g key={s.t}>
          <rect x={s.x} y="74" width="44" height="36" rx="8" fill={s.c} opacity="0.15" stroke={s.c} strokeOpacity="0.5" />
          <text x={s.x + 22} y="96" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fill={s.c} fontWeight="600">{s.t}</text>
        </g>
      ))}
      {[220, 280, 340].map((x) => (
        <line key={x} x1={x} x2={x + 12} y1="92" y2="92" stroke="#1A4DFF" strokeWidth="1.5" strokeDasharray="4 3" style={{ animation: "flow-dash 1.2s linear infinite" }} />
      ))}
      <g transform="translate(230, 140)">
        {Array.from({ length: 30 }).map((_, i) => (
          <rect key={i} x={(i % 6) * 22} y={Math.floor(i / 6) * 12} width="20" height="10" fill="#1A4DFF" opacity={0.15 + (i % 5) * 0.12} />
        ))}
      </g>
      <text x="10" y="20" fontFamily="JetBrains Mono" fontSize="10" fontWeight="600" fill="#1A4DFF">0.92 faithful · 2.5% halluc · 85ms</text>
    </svg>
  );
}
function SupportVisual() {
  const nodes: { cx: number; cy: number; r: number; l: string; d: number }[] = [
    { cx: 200, cy: 50, r: 18, l: "A", d: 0 },
    { cx: 110, cy: 105, r: 13, l: "B", d: 280 },
    { cx: 290, cy: 105, r: 13, l: "C", d: 560 },
    { cx: 60, cy: 165, r: 11, l: "D", d: 840 },
    { cx: 155, cy: 165, r: 11, l: "E", d: 1120 },
    { cx: 245, cy: 165, r: 11, l: "F", d: 1400 },
    { cx: 340, cy: 165, r: 11, l: "G", d: 1680 },
  ];
  const edges = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]] as const;
  return (
    <svg viewBox="0 0 400 220" width="100%" height="100%">
      {edges.map(([a, b], i) => (
        <line key={i} x1={nodes[a].cx} y1={nodes[a].cy} x2={nodes[b].cx} y2={nodes[b].cy} stroke="#0A8754" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="4 3" />
      ))}
      {nodes.map((n) => (
        <g key={n.l} style={{ animation: `node-glow 2s infinite`, animationDelay: `${n.d}ms` }}>
          <circle cx={n.cx} cy={n.cy} r={n.r + 5} fill="#0A8754" opacity="0.1" />
          <circle cx={n.cx} cy={n.cy} r={n.r} fill="var(--surface)" stroke="#0A8754" strokeOpacity="0.7" strokeWidth="2" />
          <text x={n.cx} y={n.cy + 4} textAnchor="middle" fontSize="11" fontFamily="JetBrains Mono" fontWeight="700" fill="#0A8754">{n.l}</text>
        </g>
      ))}
      <text x="10" y="20" fontFamily="JetBrains Mono" fontSize="10" fontWeight="600" fill="#0A8754">0 crashes · 130 edge-cases · &lt;200ms</text>
    </svg>
  );
}
function ShieldVisual() {
  return (
    <svg viewBox="0 0 400 220" width="100%" height="100%">
      <path d="M 30,190 Q 80,150 115,105 T 190,88" stroke="#EC4899" strokeOpacity="0.5" strokeWidth="2" fill="none" strokeDasharray="3 4" />
      <circle cx="190" cy="88" r="5" fill="#EC4899" opacity="0.85" />
      <g transform="translate(220, 50)">
        {Array.from({ length: 28 }).map((_, i) => (
          <rect key={i} x={(i % 7) * 22} y={Math.floor(i / 7) * 24} width="20" height="22" rx="4" fill="#8B5CF6"
            opacity={0.3 + (i % 5) * 0.1}
            style={{ animation: `heat-pulse 2s infinite`, animationDelay: `${i * 60}ms` }} />
        ))}
      </g>
      <g transform="translate(290, 170)">
        <path d="M 0,30 A 30,30 0 0 1 60,30" stroke="#8B5CF6" strokeOpacity="0.15" strokeWidth="6" fill="none" />
        <path d="M 0,30 A 30,30 0 0 1 50,12" stroke="#8B5CF6" strokeOpacity="0.65" strokeWidth="6" fill="none" />
        <text x="30" y="20" textAnchor="middle" fontSize="14" fontFamily="JetBrains Mono" fontWeight="700" fill="#8B5CF6">0.82</text>
        <text x="30" y="42" textAnchor="middle" fontSize="8" fontFamily="JetBrains Mono" fill="#8B5CF6" opacity="0.7">bot score</text>
      </g>
      <text x="10" y="20" fontFamily="JetBrains Mono" fontSize="10" fontWeight="600" fill="#8B5CF6">IEEE CCPIS 2025 · Real-time scoring</text>
    </svg>
  );
}
function LingoVisual() {
  return (
    <svg viewBox="0 0 400 220" width="100%" height="100%">
      <g>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={30 + i * 20} y="50" width="14" height="80" rx="7" fill="#D97706" opacity="0.3" stroke="#D97706" strokeOpacity="0.6" />
        ))}
        <rect x="115" y="70" width="14" height="60" rx="7" fill="#D97706" opacity="0.3" stroke="#D97706" strokeOpacity="0.6" />
        <rect x="22" y="125" width="115" height="32" rx="9" fill="#D97706" opacity="0.18" />
      </g>
      {[
        { x: 175, c: "#FF5B2E", t: "CNN" },
        { x: 235, c: "#1A4DFF", t: "LSTM" },
        { x: 295, c: "#0A8754", t: "TTS" },
      ].map((n) => (
        <g key={n.t}>
          <rect x={n.x} y="80" width="40" height="32" rx="7" fill={n.c} opacity="0.18" stroke={n.c} strokeOpacity="0.6" />
          <text x={n.x + 20} y="100" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fontWeight="700" fill={n.c}>{n.t}</text>
        </g>
      ))}
      {[14, 22, 32, 40, 34, 22, 12].map((h, i) => (
        <rect key={i} x={345 + i * 7} y={120 - h / 2} width="5" height={h} rx="2" fill="#D97706"
          style={{ animation: "wave-bar 0.9s infinite", animationDelay: `${i * 90}ms`, transformOrigin: `${347 + i * 7}px ${120}px` }} />
      ))}
      <rect x="155" y="135" width="170" height="22" rx="5" stroke="#D97706" strokeOpacity="0.5" strokeDasharray="4 3" fill="none" />
      <text x="240" y="150" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fill="#D97706" fontWeight="600">Raspberry Pi · Offline Edge</text>
      <text x="10" y="20" fontFamily="JetBrains Mono" fontSize="10" fontWeight="600" fill="#D97706">CNN-LSTM · Sub-second · Edge AI</text>
    </svg>
  );
}
function SidecarVisual() {
  return (
    <svg viewBox="0 0 400 220" width="100%" height="100%">
      {[40, 80, 120, 160, 200].map((y) => <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="#0EA5E9" strokeOpacity="0.07" />)}
      {[80, 140, 200, 260, 320].map((x) => <line key={x} x1={x} x2={x} y1="20" y2="220" stroke="#0EA5E9" strokeOpacity="0.07" />)}
      <polyline points="40,190 80,165 130,145 180,120 230,100 280,75 330,55 380,42"
        fill="none" stroke="#0EA5E9" strokeWidth="3" strokeLinecap="round"
        strokeDasharray="600" style={{ animation: "draw-route 5s linear infinite" }} />
      <circle cx="40" cy="190" r="7" stroke="#0EA5E9" strokeWidth="2" fill="var(--surface)" />
      <circle cx="40" cy="190" r="3.5" fill="#0EA5E9" />
      <circle cx="380" cy="42" r="7" stroke="#FF5B2E" strokeWidth="2" fill="var(--surface)" />
      <circle cx="380" cy="42" r="3.5" fill="#FF5B2E" />
      <g transform="translate(195, 102)">
        <rect x="0" y="4" width="22" height="10" rx="2" fill="#0EA5E9" opacity="0.7" />
        <rect x="3" y="0" width="14" height="6" rx="1" fill="#0EA5E9" opacity="0.5" />
        <circle cx="6" cy="16" r="2.5" fill="#0E0E10" />
        <circle cx="16" cy="16" r="2.5" fill="#0E0E10" />
      </g>
      <text x="10" y="20" fontFamily="JetBrains Mono" fontSize="10" fontWeight="600" fill="#0EA5E9">OSRM routing · Real-time matching</text>
    </svg>
  );
}

/* ---------------- SKILLS ---------------- */
const SKILL_CATS = [
  { key: "lang", label: "Languages", accent: "#FF5B2E", tint: "#FFE9DF", icon: "{ }",
    skills: ["Python", "Java", "SQL", "TypeScript", "JavaScript", "HTML", "CSS"] },
  { key: "ai", label: "AI / ML", accent: "#1A4DFF", tint: "#E6ECFF", icon: "⚡",
    skills: ["PyTorch", "XGBoost", "scikit-learn", "CNN-LSTM", "SHAP", "Feature Engineering", "TensorFlow"] },
  { key: "agents", label: "Agents & RAG", accent: "#0A8754", tint: "#DCF2E7", icon: "◈",
    skills: ["LangGraph", "pgvector", "IBM Docling", "sentence-transformers", "SigLIP", "BM25", "Cross-encoder"] },
  { key: "ops", label: "MLOps / DevOps", accent: "#8B5CF6", tint: "#F3E8FF", icon: "⬡",
    skills: ["MLflow", "Feast", "Evidently", "Docker", "GitHub Actions", "Celery", "Prometheus", "Grafana"] },
  { key: "web", label: "Backend / Web", accent: "#D97706", tint: "#FEF3C7", icon: "◎",
    skills: ["FastAPI", "Next.js", "Spring Boot", "React", "Streamlit", "WebSockets", "JWT/RBAC", "Flask"] },
  { key: "cloud", label: "Data & Cloud", accent: "#0EA5E9", tint: "#E0F2FE", icon: "◷",
    skills: ["PostgreSQL", "Redis", "MySQL", "Redpanda", "AWS Lambda", "AWS EC2", "AWS S3", "Tableau"] },
];

function Skills() {
  const [active, setActive] = useState<{ skill: string; cat: typeof SKILL_CATS[number] } | null>(null);
  return (
    <section id="skills" className="section">
      <div className="reveal" style={{ marginBottom: 48 }}>
        <div className="eyebrow">Toolbox</div>
        <h2 className="h2" style={{ marginTop: 12 }}>What I reach for, <em className="italic-coral">organised by intent.</em></h2>
        <p style={{ marginTop: 12, color: "var(--muted)", fontFamily: "var(--font-mono)", fontSize: 13 }}>Click any skill to see what was built with it.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 22 }}>
        {SKILL_CATS.map((c) => (
          <div key={c.key} className="reveal clay" style={{ padding: 22 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: c.tint, color: c.accent,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 16,
              }}>{c.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "var(--ink)" }}>{c.label}</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {c.skills.map((s) => (
                <button key={s} onClick={() => setActive({ skill: s, cat: c })} style={{
                  display: "inline-flex", alignItems: "center",
                  padding: "5px 13px", borderRadius: 20,
                  fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 500,
                  background: c.tint, color: c.accent,
                  border: `1px solid ${c.accent}22`,
                  transition: "all 0.18s ease",
                }}
                onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.background = c.accent; (e.currentTarget as HTMLElement).style.color = "white"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.background = c.tint; (e.currentTarget as HTMLElement).style.color = c.accent; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {active && <SkillModal {...active} onClose={() => setActive(null)} />}
    </section>
  );
}

function SkillModal({ skill, cat, onClose }: { skill: string; cat: typeof SKILL_CATS[number]; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", k); };
  }, [onClose]);
  return (
    <div role="dialog" aria-modal="true" onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(14,14,16,0.5)", backdropFilter: "blur(10px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
    }}>
      <div onClick={(e) => e.stopPropagation()} className="glass" style={{
        maxWidth: 560, width: "100%", borderRadius: 28, padding: 40,
        boxShadow: "0 40px 80px rgba(14,14,16,0.15)",
        animation: "panel-in 0.35s cubic-bezier(0.34,1.56,0.64,1)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: cat.tint, color: cat.accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 18 }}>{cat.icon}</div>
          <div>
            <div className="eyebrow" style={{ color: cat.accent }}>{cat.label}</div>
            <h3 className="h3" style={{ fontStyle: "italic", marginTop: 4, fontSize: 28 }}>{skill}</h3>
          </div>
        </div>
        <p style={{ marginTop: 16, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--coral)" }}>What Satyajit built with {skill}</p>
        <p style={{ marginTop: 12, color: "var(--muted)", fontSize: 15, lineHeight: 1.7 }}>
          {SKILL_PROOFS[skill] || `Used in production across multiple flagship projects, including agentic RAG pipelines, real-time MLOps loops, and edge-deployed CV systems. Real metrics, real users.`}
        </p>
        <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 6 }}>
          {PROJECTS.filter((p) => p.stack.some((s) => s.toLowerCase().includes(skill.toLowerCase()))).slice(0, 4).map((p) => (
            <span key={p.id} className="chip" style={{ background: cat.tint, color: cat.accent, borderColor: `${cat.accent}33` }}>{p.title}</span>
          ))}
        </div>
        <button onClick={onClose} style={{
          marginTop: 24, padding: "10px 22px", borderRadius: 999,
          background: cat.accent, color: "white", border: "none", fontWeight: 700, fontSize: 13,
        }}>Close</button>
      </div>
    </div>
  );
}

const SKILL_PROOFS: Record<string, string> = {
  Python: "Primary language across all 6 flagship projects — FastAPI services, ML training, data pipelines, edge deployment.",
  PyTorch: "Trained CNN-LSTM for Lingo-Bot sign-language recognition, quantized to int8 for Raspberry Pi deployment.",
  XGBoost: "Powered Fraud-Stream's real-time scorer at 42ms p95 latency. Chosen over deep learning for explainability and speed.",
  LangGraph: "Built 7-node state machine for SupportForge and the multi-stage RAG loop in Doc-Agent. Explicit state, clear ownership.",
  pgvector: "Postgres-native vector store powering Doc-Agent's hybrid retrieval (BM25 + dense) at 85ms p95.",
  FastAPI: "Service layer for every project — Fraud-Stream scoring API, Doc-Agent RAG endpoint, Invisible-Shield bot scoring.",
  MLflow: "Model registry + experiment tracking across Fraud-Stream and Invisible-Shield. Reproducible runs, no notebook chaos.",
  Feast: "Online feature store for Fraud-Stream — sub-millisecond feature lookups feeding XGBoost at 20 TPS.",
  Evidently: "Drift detection on Fraud-Stream — alerts on feature drift, prediction drift, target drift. Triggers retrain.",
  Docker: "Containerised every service. Compose stacks for Fraud-Stream (Redpanda + Postgres + scorer + Evidently).",
  Redis: "Session cache + rate limiting in SupportForge and Invisible-Shield. Sub-ms reads.",
  PostgreSQL: "Backbone for Doc-Agent (with pgvector), SupportForge tickets, and Side-Car ride history.",
  "Spring Boot": "Side-Car backend — real-time ride matching with OSRM routing and Leaflet front-end.",
  TypeScript: "Next.js portfolios, dashboards, and chat UIs across multiple projects.",
  React: "Front-ends for Doc-Agent search UI, Fraud-Stream operator dashboard, this portfolio.",
  "scikit-learn": "Feature pipelines and classical ML baselines — including Invisible-Shield's bot scorer ensemble.",
  "Cross-encoder": "Final reranking stage in Doc-Agent — turned recall into precision.",
  "AWS Lambda": "Webhook handlers and async ingestion for Fraud-Stream upstream events.",
  "GitHub Actions": "CI/CD across all repos — lint, test, build, deploy pipelines on every PR.",
};

/* ---------------- SOFT SKILLS ---------------- */
const SOFT = [
  ["Problem Solving", "◈", "Debugged a zero-downtime hot-swap race condition in Fraud-Stream at 2 AM. Found in Celery task queue. Fixed in 40 minutes."],
  ["Critical Thinking", "⟐", "Chose XGBoost over deep learning in Fraud-Stream for explainability and 42ms latency — a deliberate trade-off, not a default."],
  ["Teamwork", "⬡", "Coordinated across IEEE paper reviews, university project groups, and remote intern tasks simultaneously without dropping any ball."],
  ["Communication", "◎", "Wrote an IEEE-published paper at 21 explaining complex behavioral fingerprinting to an international peer-review audience."],
  ["Adaptability", "⟳", "Learned LangGraph, pgvector, and IBM Docling from scratch in 6 weeks to ship Doc-Agent — zero prior experience with any of them."],
  ["Independence", "◷", "All 6 flagship projects built solo, end-to-end. Architecture, backend, ML, frontend, deployment — every layer owned personally."],
  ["Org. Skills", "⊞", "Shipped 3 production-grade projects in Q1 2026 while maintaining 9.75 SGPA and clearing multiple certifications."],
  ["Conscientiousness", "✦", "1,996 GitHub contributions in a year. Every feature tested. Every model evaluated. No shortcuts on metrics."],
  ["Practical Intel", "◬", "Deployed CNN-LSTM on a $35 Raspberry Pi instead of cloud — because offline-first was the actual user requirement."],
] as const;

function SoftSkills() {
  return (
    <section className="section" style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", maxWidth: "100%", padding: "var(--section-gap) 48px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: 48 }}>
          <div className="eyebrow font-mono">&lt; Soft_Skills /&gt;</div>
          <h2 className="h2" style={{ marginTop: 12 }}>Beyond <em className="italic-coral">the code.</em></h2>
          <p style={{ marginTop: 12, color: "var(--muted)" }}>Hover each tile to see the proof.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
          {SOFT.map(([name, icon, proof]) => (
            <div key={name} className="reveal flip-card" style={{ perspective: 1000, height: 170 }}>
              <div className="flip-inner" style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d", transition: "transform 0.65s cubic-bezier(0.4,0.2,0.2,1)" }}>
                <div className="neu" style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", borderRadius: 16, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20, textAlign: "center" }}>
                  <div style={{ fontSize: 36, color: "var(--coral)" }}>{icon}</div>
                  <div style={{ marginTop: 10, fontWeight: 700, fontSize: 14 }}>{name}</div>
                  <div style={{ marginTop: 6, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)" }}>hover to reveal →</div>
                </div>
                <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)", borderRadius: 16, background: "var(--ink)", color: "var(--bg)", padding: 20, display: "flex", flexDirection: "column", justifyContent: "center", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}>
                  <div style={{ fontWeight: 700, color: "var(--coral)", fontSize: 13 }}>{name}</div>
                  <p style={{ marginTop: 8, fontSize: 12, lineHeight: 1.5 }}>{proof}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`.flip-card:hover .flip-inner { transform: rotateY(180deg); }`}</style>
    </section>
  );
}

/* ---------------- EXPERIENCE ---------------- */
function Experience() {
  const [open, setOpen] = useState(false);
  const sims = [
    ["JPMorgan Chase", "Software Engineering"],
    ["Accenture", "Data Analytics"],
    ["Deloitte", "Cyber"],
    ["AWS", "Solutions Architecture"],
    ["Tata", "Cybersecurity"],
    ["Lloyds Banking Group", "Software Engineering"],
  ];
  return (
    <section id="experience" className="section">
      <div className="reveal" style={{ marginBottom: 40 }}>
        <div className="eyebrow">Experience</div>
        <h2 className="h2" style={{ marginTop: 12 }}>Where I've <em className="italic-coral">put it to work.</em></h2>
      </div>
      <div style={{ position: "relative", paddingLeft: 32 }}>
        <div style={{ position: "absolute", left: 8, top: 8, bottom: 8, width: 1, background: "var(--border)" }} />
        <div style={{ position: "absolute", left: 4, top: 16, width: 11, height: 11, borderRadius: "50%", background: "var(--coral)", boxShadow: "0 0 0 4px var(--coral-tint)" }} />
        <div className="reveal clay" style={{ padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <div style={{ fontWeight: 700, fontSize: 16 }}>ML/AI Intern · <span style={{ color: "var(--coral)" }}>Uptoskills</span></div>
            <div style={{ display: "flex", gap: 6 }}>
              <span className="chip">Remote</span>
              <span className="chip">Jan – Apr 2025</span>
            </div>
          </div>
          <ul style={{ marginTop: 14, padding: 0, listStyle: "none", color: "var(--muted)", fontSize: 14, display: "flex", flexDirection: "column", gap: 8 }}>
            <li>→ Built MCQ generation system in FastAPI (1,000+ questions delivered).</li>
            <li>→ Raised endpoint test coverage from 0% to 80%.</li>
            <li>→ Delivered content evaluation module for full-stack assessment platform.</li>
          </ul>
        </div>
        <div className="reveal clay" style={{ marginTop: 20, padding: 24 }}>
          <button onClick={() => setOpen(!open)} aria-expanded={open} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", padding: 0, color: "var(--ink)" }}>
            <span style={{ fontWeight: 700, fontSize: 16 }}>Virtual Job Simulations <span style={{ color: "var(--muted)", fontWeight: 400 }}>· 6 completed</span></span>
            <span style={{ color: "var(--coral)", fontSize: 20 }}>{open ? "−" : "+"}</span>
          </button>
          {open && (
            <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
              {sims.map(([co, track]) => (
                <div key={co} style={{ padding: 14, borderRadius: 12, background: "var(--bg)", border: "1px solid var(--border)" }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{co}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--coral)", marginTop: 4 }}>{track}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------- RECOGNITION ---------------- */
function Recognition() {
  const tiles = [
    { c: "var(--coral)", t: "var(--coral-tint)", icon: "🏆", title: "IEEE CCPIS 2025", sub: "Published — Behavioral Bot Detection", det: "Real-time scoring" },
    { c: "var(--forest)", t: "var(--forest-tint)", icon: "🎓", title: "SGPA 9.75 / 10", sub: "B.Tech CSE · Centurion University", det: "Top of cohort" },
    { c: "var(--indigo)", t: "var(--indigo-tint)", icon: "◆", title: "TechNova Finalist", sub: "Grand finalist · 2024", det: "Multi-team event" },
    { c: "var(--purple)", t: "var(--purple-tint)", icon: "★", title: "Top-25 GfG Hackathon", sub: "Out of hundreds of teams", det: "GeeksforGeeks" },
    { c: "var(--amber)", t: "var(--amber-tint)", icon: "🔥", title: "50-Day LeetCode Streak", sub: "708 problems solved", det: "Rank 86,819" },
  ];
  return (
    <section id="recognition" className="section">
      <div className="reveal" style={{ marginBottom: 40 }}>
        <div className="eyebrow">Recognition</div>
        <h2 className="h2" style={{ marginTop: 12 }}>Receipts, <em className="italic-coral">not vibes.</em></h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 18 }}>
        {tiles.map((t, i) => (
          <div key={i} className="reveal clay" style={{ padding: 22, borderTop: `3px solid ${t.c}` }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: t.t, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{t.icon}</div>
            <div style={{ marginTop: 14, fontWeight: 700, fontSize: 14 }}>{t.title}</div>
            <div style={{ marginTop: 4, fontSize: 12, color: "var(--muted)" }}>{t.sub}</div>
            <div style={{ marginTop: 8, fontFamily: "var(--font-mono)", fontSize: 10, color: t.c }}>{t.det}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- CERTIFICATIONS ---------------- */
const CERTS = [
  { iss: "Oracle", code: "OR", c: "#C74634", title: "OCI Certified Generative AI Professional", date: "Aug 2025", id: "102317656OCI25GAIOCP" },
  { iss: "Oracle", code: "OR", c: "#C74634", title: "OCI Certified AI Foundations Associate", date: "2025" },
  { iss: "Google Cloud", code: "GC", c: "#4285F4", title: "GenAI Leader Learning Path · 5 courses", date: "2025" },
  { iss: "AWS", code: "AW", c: "#FF9900", title: "AWS Cloud Practitioner", date: "2024" },
  { iss: "AWS", code: "AW", c: "#FF9900", title: "Generative AI – Art of the Possible", date: "Oct 2025" },
  { iss: "AWS", code: "AW", c: "#FF9900", title: "Getting Started with DevOps on AWS", date: "Oct 2025" },
  { iss: "AWS", code: "AW", c: "#FF9900", title: "Exam Prep ML Specialty MLS-C01", date: "Oct 2025" },
  { iss: "HackerRank", code: "HR", c: "#00EA64", title: "Certified Software Engineer", date: "2026" },
  { iss: "Kaggle", code: "KG", c: "#20BEFF", title: "Python for Data Science & AI", date: "2025" },
  { iss: "GeeksforGeeks", code: "GfG", c: "#2F8D46", title: "Basic to Advanced DSA", date: "Centurion University" },
];
function Certifications() {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="reveal" style={{ marginBottom: 32 }}>
        <div className="eyebrow">Certifications</div>
        <h2 className="h3" style={{ marginTop: 8, fontSize: 24 }}>Ten and counting.</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {CERTS.map((c, i) => (
          <div key={i} className="reveal clay" style={{ padding: 18, display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: c.c, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{c.code}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: c.c, fontWeight: 600 }}>{c.iss}</div>
              <div style={{ marginTop: 4, fontWeight: 600, fontSize: 13, lineHeight: 1.4 }}>{c.title}</div>
              <div style={{ marginTop: 6, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)" }}>{c.date}{c.id ? ` · ${c.id}` : ""}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- LIVE PROFILES ---------------- */
function Profiles() {
  return (
    <section className="section">
      <div className="reveal" style={{ marginBottom: 40 }}>
        <div className="eyebrow">Live Profiles</div>
        <h2 className="h2" style={{ marginTop: 12 }}>Always <em className="italic-coral">on the grind.</em></h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
        <GitHubCard />
        <LeetCodeCard />
        <KaggleCard />
      </div>
    </section>
  );
}

function GitHubCard() {
  return (
    <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="reveal clay" style={{ padding: 24, display: "block" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 700 }}>GitHub · sat1828</div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--forest)", display: "inline-flex", gap: 6, alignItems: "center" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--forest)", animation: "pulse-dot 2s infinite" }} />LIVE
        </span>
      </div>
      <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        {[["9", "REPOS"], ["1.9K", "CONTRIB"], ["Solo", "OWNER"]].map(([v, l]) => (
          <div key={l} className="neu" style={{ padding: "12px 8px", textAlign: "center", borderRadius: 12 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "var(--coral)" }}>{v}</div>
            <div style={{ marginTop: 2, fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted)", letterSpacing: "0.1em" }}>{l}</div>
          </div>
        ))}
      </div>
      <svg viewBox="0 0 288 82" width="100%" style={{ marginTop: 18, display: "block" }}>
        {Array.from({ length: 26 * 7 }).map((_, i) => {
          const w = i % 26, d = Math.floor(i / 26);
          const seed = (w * 7 + d * 13 + 1) % 17;
          const lvl = seed > 12 ? 4 : seed > 9 ? 3 : seed > 6 ? 2 : seed > 3 ? 1 : 0;
          const colors = ["var(--border)", "#FFD4C4", "#FFB3A0", "#FF7A5A", "#FF5B2E"];
          return <rect key={i} x={w * 11} y={d * 12} width="10" height="10" rx="2" fill={colors[lvl]} />;
        })}
      </svg>
      <div style={{ marginTop: 14, display: "flex", gap: 6, flexWrap: "wrap", fontSize: 11 }}>
        {[["Python", "#3776AB"], ["TypeScript", "#3178C6"], ["Java", "#B07219"]].map(([l, c]) => (
          <span key={l} className="chip" style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />{l}
          </span>
        ))}
      </div>
    </a>
  );
}
function LeetCodeCard() {
  return (
    <a href={LEETCODE_URL} target="_blank" rel="noopener noreferrer" className="reveal clay" style={{ padding: 24, display: "block" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 700 }}>LeetCode · Satyajit1828</div>
        <span className="chip" style={{ color: "var(--amber)", borderColor: "rgba(217,119,6,0.3)" }}>RANK #86,819</span>
      </div>
      <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <div style={{ padding: 16, borderRadius: 12, background: "var(--amber-tint)", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: "var(--amber)" }}>708</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", marginTop: 2 }}>SOLVED</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[["Easy", 239, 941, "var(--forest)"], ["Med", 360, 2050, "var(--amber)"], ["Hard", 109, 929, "#E11D48"]].map(([l, n, t, c]) => (
            <div key={String(l)}>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)" }}>
                <span>{l as string}</span><span>{n as number}/{t as number}</span>
              </div>
              <div style={{ marginTop: 3, height: 5, borderRadius: 3, background: "var(--border)" }}>
                <div style={{ width: `${((n as number) / (t as number)) * 100}%`, height: "100%", borderRadius: 3, background: c as string }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 16, padding: 12, borderRadius: 12, background: "var(--amber-tint)", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 16 }}>🔥</span>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--amber)", fontWeight: 700 }}>50-DAY STREAK</div>
      </div>
    </a>
  );
}
function KaggleCard() {
  return (
    <a href={KAGGLE_URL} target="_blank" rel="noopener noreferrer" className="reveal clay" style={{ padding: 24, display: "block" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 700 }}>Kaggle · satyajit1828</div>
        <span className="chip" style={{ color: "#20BEFF", borderColor: "rgba(32,190,255,0.3)" }}>NOTEBOOKS</span>
      </div>
      <div style={{ marginTop: 16, fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>
        Active across Python for Data Science, ML competitions, and EDA notebooks. Cert: <strong style={{ color: "var(--ink)" }}>Python for Data Science & AI (2025)</strong>.
      </div>
      <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
        {[["Notebooks", 70, "#20BEFF"], ["Datasets", 35, "#20BEFF"], ["Competitions", 20, "#20BEFF"]].map(([l, p, c]) => (
          <div key={String(l)}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)" }}>
              <span>{l as string}</span><span>{p as number}%</span>
            </div>
            <div style={{ marginTop: 3, height: 6, borderRadius: 3, background: "var(--border)" }}>
              <div style={{ width: `${p}%`, height: "100%", borderRadius: 3, background: c as string }} />
            </div>
          </div>
        ))}
      </div>
    </a>
  );
}

/* ---------------- WRITING ---------------- */
function Writing() {
  return (
    <section className="section">
      <div className="reveal" style={{ marginBottom: 40 }}>
        <div className="eyebrow">Writing & Research</div>
        <h2 className="h2" style={{ marginTop: 12 }}>Words on <em className="italic-coral">paper.</em></h2>
      </div>
      <div className="reveal" style={{
        background: "var(--glass-bg)", backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,91,46,0.15)", borderRadius: 24, padding: 32,
      }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span className="chip" style={{ color: "var(--coral)", borderColor: "rgba(255,91,46,0.3)" }}>IEEE CCPIS 2025</span>
          <span className="chip">Member #101009704</span>
        </div>
        <h3 className="h3" style={{ marginTop: 14, fontSize: 26 }}>Invisible-Shield: Behavioral Bot Detection via Keystroke and Mouse Dynamics</h3>
        <p style={{ marginTop: 12, color: "var(--muted)", lineHeight: 1.7 }}>
          Peer-reviewed paper at IEEE CCPIS 2025. Real-time behavioral biometrics replace hostile captcha flows with passive, accurate bot scoring.
        </p>
        <a href="https://ieeexplore.ieee.org" target="_blank" rel="noopener noreferrer" className="btn-clay" style={{ marginTop: 20 }}>Read on IEEE Xplore ↗</a>
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */
function Contact() {
  const [copied, setCopied] = useState<string>("");
  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => { setCopied(key); setTimeout(() => setCopied(""), 2000); });
  };
  return (
    <section id="contact" className="section" style={{
      background: "radial-gradient(ellipse at 50% 0%, rgba(255,91,46,0.07) 0%, transparent 65%), var(--bg)",
      maxWidth: "100%", padding: "var(--section-gap) 48px",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <h2 className="h2 reveal" style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>
          Let's build <em className="italic-coral">something</em><br /> worth shipping.
        </h2>
        <p className="reveal" style={{ marginTop: 16, color: "var(--muted)", maxWidth: 520, margin: "16px auto 0" }}>
          Open to junior AI/ML, Computer Vision, Perception, and MLOps roles. Internships and full-time.
        </p>
        <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18, textAlign: "left" }}>
          {/* Email */}
          <div className="reveal clay" style={{ padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--coral-tint)", color: "var(--coral)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>✉</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Email</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)" }}>{EMAIL}</div>
              </div>
            </div>
            <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
              <a href={`mailto:${EMAIL}`} className="btn-clay" style={{ padding: "10px 18px", fontSize: 13 }}>Send email</a>
              <button className="btn-neu" onClick={() => copy(EMAIL, "email")} style={{ padding: "10px 18px", fontSize: 13 }}>{copied === "email" ? "✓ Copied" : "⎘ Copy"}</button>
            </div>
          </div>
          {/* Phone */}
          <div className="reveal clay" style={{ padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--forest-tint)", color: "var(--forest)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>☏</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Phone</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)" }}>{PHONE}</div>
              </div>
            </div>
            <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
              <a href={`tel:${PHONE}`} className="btn-neu" style={{ padding: "10px 18px", fontSize: 13, background: "var(--forest)", color: "white", boxShadow: "0 4px 14px rgba(10,135,84,0.3)" }}>Call</a>
              <button className="btn-neu" onClick={() => copy(PHONE, "phone")} style={{ padding: "10px 18px", fontSize: 13 }}>{copied === "phone" ? "✓ Copied" : "⎘ Copy"}</button>
            </div>
          </div>
          {/* Schedule */}
          <div className="reveal clay" style={{ padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--indigo-tint)", color: "var(--indigo)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>◷</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Schedule</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)" }}>Quick intro call, no pressure</div>
              </div>
            </div>
            <div style={{ marginTop: 16 }}>
              <a href={`mailto:${EMAIL}?subject=Quick%20chat%20—%20Satyajit`} className="btn-neu" style={{ padding: "10px 18px", fontSize: 13, background: "var(--indigo)", color: "white", boxShadow: "0 4px 14px rgba(26,77,255,0.3)" }}>Schedule →</a>
            </div>
          </div>
        </div>
        {/* Social row */}
        <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
          {[
            { l: "LinkedIn", h: LINKEDIN_URL, c: "#0A66C2", bg: "#E8F0FE" },
            { l: "GitHub", h: GITHUB_URL, c: "#24292e", bg: "#F0F0F0" },
            { l: "LeetCode", h: LEETCODE_URL, c: "#FFA116", bg: "#FFF8E6" },
            { l: "Kaggle", h: KAGGLE_URL, c: "#20BEFF", bg: "#E0F4FF" },
            { l: "Resume", h: RESUME_URL, c: "var(--coral)", bg: "var(--coral-tint)" },
          ].map((s) => (
            <a key={s.l} href={s.h} target="_blank" rel="noopener noreferrer" className="glass" style={{
              padding: "10px 20px", borderRadius: 999, fontSize: 13, fontWeight: 600,
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.background = s.bg; (e.currentTarget as HTMLElement).style.color = s.c; }}
            onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.background = ""; (e.currentTarget as HTMLElement).style.color = ""; }}>
              {s.l} ↗
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer style={{
      padding: "40px 48px", background: "var(--surface)",
      borderTop: "1px solid var(--border)",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 24, alignItems: "center" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)" }}>
          Designed & built by Satyajit Parida · Bhubaneswar, India
        </div>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top" style={{
          width: 40, height: 40, borderRadius: "50%",
          background: "linear-gradient(135deg, #FF5B2E, #FF8C42)", color: "white",
          fontWeight: 800, fontSize: 13, border: "none",
          boxShadow: "0 4px 12px rgba(255,91,46,0.4)",
        }}>SP</button>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)", opacity: 0.6, textAlign: "right" }}>
          Crafted with care. No templates.
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: 24, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", opacity: 0.22 }}>
        // type 'sp' anywhere for a surprise
      </div>
    </footer>
  );
}

/* ---------------- EASTER EGG ---------------- */
function useEasterEgg() {
  useEffect(() => {
    let buf = "";
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      buf = (buf + e.key).slice(-2);
      if (buf === "sp") { fireConfetti(); buf = ""; }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}
function fireConfetti() {
  const colors = ["#FF5B2E", "#1A4DFF", "#0A8754", "#D97706", "#8B5CF6"];
  for (let i = 0; i < 32; i++) {
    const d = document.createElement("div");
    d.style.cssText = `position:fixed;left:${Math.random() * 100}vw;top:${Math.random() * 100}vh;width:10px;height:10px;border-radius:50%;background:${colors[i % colors.length]};z-index:9998;pointer-events:none;animation:confetti-fall 1.4s cubic-bezier(0.4,0,0.2,1) ${i * 30}ms forwards;`;
    document.body.appendChild(d);
    setTimeout(() => d.remove(), 2000);
  }
}

/* ---------------- CHAT WIDGET ---------------- */
type Msg = { role: "user" | "assistant"; content: string };
function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const send = useServerFn(chatWithSatAI);
  const scrollRef = useRef<HTMLDivElement>(null);

  const submit = useCallback(async (text: string) => {
    if (!text.trim() || busy) return;
    const newMsgs: Msg[] = [...msgs, { role: "user", content: text }];
    setMsgs(newMsgs);
    setInput("");
    setBusy(true);
    try {
      const res = await send({ data: { messages: newMsgs } });
      setMsgs([...newMsgs, { role: "assistant", content: res.reply }]);
    } catch {
      setMsgs([...newMsgs, { role: "assistant", content: "Couldn't reach the model — try again shortly." }]);
    } finally { setBusy(false); }
  }, [msgs, busy, send]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs, busy]);

  const quickQs = [
    "What are his flagship projects?",
    "Tell me about the IEEE paper",
    "Is he open to internships?",
    "What's his SGPA?",
    "Which AI stacks does he use?",
  ];

  return (
    <>
      {!open && (
        <button onClick={() => setOpen(true)} aria-label="Open chat" style={{
          position: "fixed", bottom: 28, right: 28, zIndex: 1200,
          width: 58, height: 58, borderRadius: "50%",
          background: "linear-gradient(135deg, #FF5B2E 0%, #FF6B3D 40%, #1A4DFF 100%)",
          border: "none", color: "white", fontSize: 22,
          boxShadow: "0 8px 28px rgba(255,91,46,0.45), 0 4px 12px rgba(26,77,255,0.2)",
          overflow: "hidden", cursor: "pointer",
        }}>
          <span style={{ position: "absolute", inset: "-50%", background: "conic-gradient(transparent 0deg, rgba(255,255,255,0.18) 60deg, transparent 120deg)", animation: "orb-rotate 3s linear infinite", pointerEvents: "none" }} />
          <span style={{ position: "absolute", top: 5, right: 5, width: 10, height: 10, borderRadius: "50%", background: "#0A8754", border: "2px solid white" }} />
          <span style={{ position: "relative" }}>✦</span>
        </button>
      )}
      {open && (
        <div className="clay" style={{
          position: "fixed", bottom: 28, right: 28, zIndex: 1200,
          width: "min(420px, calc(100vw - 36px))", height: "min(580px, calc(100vh - 80px))",
          display: "flex", flexDirection: "column", overflow: "hidden",
          animation: "panel-in 0.42s cubic-bezier(0.34,1.56,0.64,1)",
        }}>
          <div style={{
            padding: "16px 20px", display: "flex", alignItems: "center", gap: 12,
            background: "linear-gradient(135deg, rgba(255,91,46,0.07), rgba(26,77,255,0.04))",
            borderBottom: "1px solid var(--border)",
          }}>
            <div style={{ position: "relative", width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #FF5B2E, #1A4DFF)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14 }}>
              SP
              <span style={{ position: "absolute", bottom: 0, right: 0, width: 9, height: 9, borderRadius: "50%", background: "var(--forest)", border: "2px solid var(--surface)", animation: "pulse-dot 2s infinite" }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Sat-AI</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>Satyajit's digital twin · Any language</div>
            </div>
            <button onClick={() => setMsgs([])} aria-label="Clear" style={{ background: "none", border: "none", color: "var(--muted)", fontSize: 14 }}>↺</button>
            <button onClick={() => setOpen(false)} aria-label="Close" style={{ background: "none", border: "none", color: "var(--muted)", fontSize: 18 }}>✕</button>
          </div>
          <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
            {msgs.length === 0 && (
              <>
                <div style={{ background: "var(--bg)", padding: 14, borderRadius: 16, fontSize: 14, color: "var(--ink)", animation: "msg-in 0.3s ease" }}>
                  Hey — I'm Satyajit's digital twin. Ask me about projects, the IEEE paper, my stack, or whether I'm available. I'll keep it real.
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {quickQs.map((q) => (
                    <button key={q} onClick={() => submit(q)} style={{
                      padding: "6px 12px", borderRadius: 999,
                      background: "var(--coral-tint)", color: "var(--coral)",
                      border: "1px solid rgba(255,91,46,0.2)", fontSize: 11,
                    }}>{q}</button>
                  ))}
                </div>
              </>
            )}
            {msgs.map((m, i) => (
              <div key={i} style={{
                alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                maxWidth: "85%",
                padding: "10px 14px", borderRadius: m.role === "user" ? "16px 16px 3px 16px" : "16px 16px 16px 3px",
                background: m.role === "user" ? "linear-gradient(135deg, #FF5B2E, #FF7043)" : "var(--bg)",
                color: m.role === "user" ? "white" : "var(--ink)",
                fontSize: 14, lineHeight: 1.5,
                animation: "msg-in 0.3s ease",
                whiteSpace: "pre-wrap",
              }}>{m.content}</div>
            ))}
            {busy && (
              <div style={{ alignSelf: "flex-start", padding: "12px 16px", background: "var(--bg)", borderRadius: "16px 16px 16px 3px", display: "flex", gap: 4 }}>
                {[0, 1, 2].map((i) => (
                  <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--coral)", animation: "typing-dot 1.2s infinite", animationDelay: `${i * 0.18}s` }} />
                ))}
              </div>
            )}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); submit(input); }} style={{ padding: 12, borderTop: "1px solid var(--border)", display: "flex", gap: 8 }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything…" style={{
              flex: 1, padding: "10px 14px", borderRadius: 999,
              border: "1px solid var(--border)", background: "var(--bg)",
              fontSize: 14, color: "var(--ink)", outline: "none",
            }} onFocus={(e) => { e.target.style.borderColor = "var(--coral)"; }} onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }} />
            <button type="submit" disabled={!input.trim() || busy} aria-label="Send" style={{
              width: 40, height: 40, borderRadius: "50%", border: "none",
              background: input.trim() ? "linear-gradient(135deg, #FF5B2E, #FF7043)" : "var(--border)",
              color: "white", fontSize: 16,
              cursor: input.trim() ? "pointer" : "not-allowed",
            }}>→</button>
          </form>
          <div style={{ padding: "0 14px 10px", fontFamily: "var(--font-mono)", fontSize: 9, textAlign: "center", color: "var(--muted)", opacity: 0.6 }}>
            Powered by Satyajit's Brain · Multilingual
          </div>
        </div>
      )}
    </>
  );
}

/* ---------------- JSON-LD ---------------- */
function PersonSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Satyajit Parida",
    jobTitle: "AI/ML Engineer & Researcher",
    url: "https://satyajitparida.dev",
    alumniOf: { "@type": "CollegeOrUniversity", name: "Centurion University" },
    address: { "@type": "PostalAddress", addressLocality: "Bhubaneswar", addressCountry: "IN" },
    email: EMAIL,
    sameAs: [LINKEDIN_URL, GITHUB_URL, LEETCODE_URL, KAGGLE_URL],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
