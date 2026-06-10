"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const viewport = { once: true, margin: "0px 0px -60px 0px" };

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const drawPath = {
  hidden: { pathLength: 0 },
  show: { pathLength: 1, transition: { duration: 1.8, ease: EASE } },
};

const CONTACT_HREF = "/contact";

export function KlarveLandingPage() {
  return (
    <div className="klarve-revamp">
      <MotionConfig reducedMotion="user">
        <Nav />
        <main>
          <Hero />
          <Marquee />
          <Wall />
          <Capabilities />
          <Layers />
          <Human />
          <Compliance />
          <Integration />
          <Team />
          <Cta />
          <RevampFooter />
        </main>
      </MotionConfig>
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const links = [
    ["#capabilities", "Capabilities"],
    ["#layers", "Stack"],
    ["#human", "Approach"],
    ["#team", "Team"],
  ] as const;

  return (
    <>
      <motion.div className="progress" style={{ scaleX: scrollYProgress }} />
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="revamp-container nav-inner">
          <a href="#top" className="logo" aria-label="Klarve home">
            <LogoMark />
          </a>
          <div className="nav-links">
            {links.map(([href, label]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
            <a href={CONTACT_HREF} className="btn btn-primary btn-sm">
              Book a consultation <ArrowIcon />
            </a>
          </div>
          <button
            className={`menu-btn${open ? " open" : ""}`}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {[...links, [CONTACT_HREF, "Contact"]].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const HERO_WORDS = ["Powering", "Frontier AI", "with", "Imperative", "Data."];

function Hero() {
  const finePointer = useFinePointer();

  useEffect(() => {
    document.documentElement.dataset.klarveHeroReady = "true";
    window.dispatchEvent(new CustomEvent("klarve-hero-ready"));
  }, []);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const tx = useTransform(sx, [0, 1], [-9, 9]);
  const ty = useTransform(sy, [0, 1], [-7, 7]);

  return (
    <header
      className="hero"
      id="top"
      onPointerMove={(event) => {
        if (!finePointer) return;
        mx.set(event.clientX / window.innerWidth);
        my.set(event.clientY / window.innerHeight);
      }}
    >
      <div className="hero-glow" />
      <div className="hero-glow-2" />
      <HeroBg />
      <motion.div
        className="hero-core-bg"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: EASE, delay: 0.3 }}
      >
        <CoreMark />
      </motion.div>
      <div className="revamp-container hero-inner">
        <div>
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="dot" /> Expert-curated &middot; Pipeline-ready
          </motion.div>
          <h1>
            {HERO_WORDS.map((word, index) => (
              <span
                key={word}
                className="hero-word"
                style={{ marginRight: "0.24em" }}
              >
                <motion.span
                  className={index >= 3 ? "grad-text" : undefined}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.9,
                    ease: EASE,
                    delay: 0.08 + index * 0.1,
                  }}
                >
                  {word}
                </motion.span>
                {index === 1 && <br />}
              </span>
            ))}
          </h1>
          <motion.p
            className="sub"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
          >
            Expert-curated data for reasoning and agentic workflows: the human
            signal synthetic data cannot replicate.
          </motion.p>
          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
          >
            <a className="btn btn-primary" href={CONTACT_HREF}>
              Schedule a consultation <ArrowIcon />
            </a>
            <a className="btn btn-ghost" href="#capabilities">
              Explore capabilities
            </a>
          </motion.div>
          <motion.div
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.95 }}
          >
            <HeroStat value={1} suffix="%" label="Expert acceptance rate" />
            <HeroStat value={13} suffix="+" label="Capability areas" />
            <HeroStat value={100} suffix="%" label="Human-verified" />
          </motion.div>
        </div>
        <motion.div
          className="hero-vis"
          aria-hidden="true"
          style={{ x: tx, y: ty }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.4 }}
        >
          <EngineVis finePointer={finePointer} />
        </motion.div>
      </div>
    </header>
  );
}

function useFinePointer() {
  const [finePointer, setFinePointer] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    const update = () => setFinePointer(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  return finePointer;
}

function HeroStat({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  return (
    <div className="hero-stat">
      <div className="v">
        <Counter to={value} />
        {suffix}
      </div>
      <div className="l">{label}</div>
    </div>
  );
}

function HeroBg() {
  const packets = [
    {
      path: "#hp1",
      dur: "11s",
      begin: "0s",
      color: "#c084fc",
      label: "agentic-traces.jsonl",
    },
    {
      path: "#hp2",
      dur: "13s",
      begin: "-5s",
      color: "#818cf8",
      label: "preference-pairs.parquet",
    },
    {
      path: "#hp3",
      dur: "12s",
      begin: "-8s",
      color: "#e9d5ff",
      label: "eval-suite.db",
    },
  ];

  return (
    <div className="hero-bg" aria-hidden="true">
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="dots" width="36" height="36" patternUnits="userSpaceOnUse">
            <circle cx="1.2" cy="1.2" r="1.2" fill="rgba(255,255,255,.05)" />
          </pattern>
          <linearGradient id="flow1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#818cf8" stopOpacity="0" />
            <stop offset=".5" stopColor="#818cf8" stopOpacity=".5" />
            <stop offset="1" stopColor="#c084fc" stopOpacity=".9" />
          </linearGradient>
        </defs>
        <rect width="1440" height="900" fill="url(#dots)" />
        <g fill="none" stroke="url(#flow1)" strokeWidth="1.3" opacity=".5">
          <path id="hp1" d="M-60,170 C300,150 520,320 780,330 S1240,250 1520,290" />
          <path id="hp2" d="M-60,460 C340,470 560,400 820,430 S1260,520 1520,470" />
          <path id="hp3" d="M-60,720 C320,740 580,620 860,640 S1280,710 1520,650" />
        </g>
        {packets.map((packet) => (
          <g key={packet.path}>
            <circle r="3" fill={packet.color} />
            <text
              x="10"
              y="4"
              fontFamily="var(--font-klarve-mono), monospace"
              fontSize="11"
              fill="rgba(235,238,248,.4)"
            >
              {packet.label}
            </text>
            <animateMotion dur={packet.dur} begin={packet.begin} repeatCount="indefinite">
              <mpath href={packet.path} />
            </animateMotion>
          </g>
        ))}
      </svg>
    </div>
  );
}
function CoreMark() {
  return (
    <svg viewBox="0 0 400 400">
      <defs>
        <linearGradient id="coreMarkGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a855f7" />
          <stop offset="1" stopColor="#6366f1" />
        </linearGradient>
        <radialGradient id="coreMarkGlow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#c084fc" stopOpacity=".3" />
          <stop offset="1" stopColor="#c084fc" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="180" fill="url(#coreMarkGlow)" />
      <g className="spin-slow">
        <circle cx="200" cy="200" r="160" fill="none" stroke="rgba(192,132,252,.22)" strokeWidth="1" strokeDasharray="3 8" />
      </g>
      <g className="spin-rev">
        <circle cx="200" cy="200" r="120" fill="none" stroke="rgba(129,140,248,.25)" strokeWidth="1" strokeDasharray="2 7" />
      </g>
      <path id="orbitA" d="M200,40 A160,160 0 1 1 199.9,40" fill="none" />
      <path id="orbitB" d="M200,80 A120,120 0 1 0 199.9,80" fill="none" />
      <g fontFamily="var(--font-klarve-mono), monospace" fontSize="11" fill="rgba(235,238,248,.5)">
        <g>
          <circle r="3.5" fill="#c084fc" />
          <text x="9" y="4">traces</text>
          <animateMotion dur="18s" repeatCount="indefinite">
            <mpath href="#orbitA" />
          </animateMotion>
        </g>
        <g>
          <circle r="3.5" fill="#818cf8" />
          <text x="9" y="4">prefs</text>
          <animateMotion dur="18s" begin="-9s" repeatCount="indefinite">
            <mpath href="#orbitA" />
          </animateMotion>
        </g>
        <g>
          <circle r="3" fill="#e9d5ff" />
          <text x="9" y="4">evals</text>
          <animateMotion dur="13s" begin="-4s" repeatCount="indefinite">
            <mpath href="#orbitB" />
          </animateMotion>
        </g>
      </g>
      <g transform="translate(200 200)">
        <path d="M0,-72 L72,0 L0,72 L-72,0 Z" fill="rgba(168,85,247,.07)" stroke="url(#coreMarkGrad)" strokeWidth="1.8" />
        <path d="M0,-72 L0,72 M-72,0 L72,0" stroke="rgba(192,132,252,.3)" strokeWidth="1" />
        <circle cx="0" cy="-72" r="6.5" fill="url(#coreMarkGrad)" />
        <circle cx="72" cy="0" r="6.5" fill="url(#coreMarkGrad)" />
        <circle cx="0" cy="72" r="6.5" fill="url(#coreMarkGrad)" />
        <circle cx="-72" cy="0" r="6.5" fill="url(#coreMarkGrad)" />
        <circle r="12" fill="#c084fc">
          <animate attributeName="r" values="10;13;10" dur="2.6s" repeatCount="indefinite" />
        </circle>
        <circle r="22" fill="none" stroke="#c084fc" strokeOpacity=".5">
          <animate attributeName="r" values="16;40" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values=".5;0" dur="2.6s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}

const INPUTS = [
  {
    id: 0,
    label: "RLHF",
    sub: "preference pairs",
    color: "#818cf8",
    y: 58,
    wire: "M70,80 C200,80 240,180 350,205",
    dur: "3.2s",
    begin: "0s",
    tip: "Preference pairs -> reward modeling",
  },
  {
    id: 1,
    label: "SFT traces",
    sub: "reasoning paths",
    color: "#c084fc",
    y: 218,
    wire: "M50,240 C170,240 230,240 340,240",
    dur: "2.7s",
    begin: "-1s",
    tip: "Step-by-step reasoning -> fine-tuning",
  },
  {
    id: 2,
    label: "Agentic",
    sub: "IDE telemetry",
    color: "#a5b4fc",
    y: 378,
    wire: "M70,400 C200,400 240,300 350,275",
    dur: "3.6s",
    begin: "-2s",
    tip: "Keystroke telemetry -> software agents",
  },
] as const;

function EngineVis({ finePointer }: { finePointer: boolean }) {
  const [hover, setHover] = useState<number | null>(null);
  const tip = hover === null
    ? finePointer
      ? "hover an input to trace its route"
      : "tap an input to trace its route"
    : INPUTS[hover].tip;

  return (
    <svg viewBox="0 0 560 540">
      <defs>
        <linearGradient id="nodeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a855f7" />
          <stop offset="1" stopColor="#6366f1" />
        </linearGradient>
        <radialGradient id="coreGlow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#c084fc" stopOpacity=".35" />
          <stop offset="1" stopColor="#c084fc" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="wire" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#818cf8" stopOpacity=".15" />
          <stop offset="1" stopColor="#c084fc" stopOpacity=".7" />
        </linearGradient>
      </defs>
      <circle cx="395" cy="240" r="160" fill="url(#coreGlow)" />

      {INPUTS.map((input, index) => (
        <g key={input.id}>
          <path
            id={`w${index}`}
            d={input.wire}
            fill="none"
            stroke={hover === index ? input.color : "url(#wire)"}
            strokeWidth={hover === index ? 2.6 : 1.4}
            opacity={hover === null || hover === index ? 1 : 0.25}
            style={{ transition: "opacity .3s, stroke-width .3s" }}
          />
          <g opacity={hover === null || hover === index ? 1 : 0.25} style={{ transition: "opacity .3s" }}>
            <circle r={hover === index ? 4.5 : 3.4} fill={input.color}>
              <animateMotion dur={input.dur} begin={input.begin} repeatCount="indefinite">
                <mpath href={`#w${index}`} />
              </animateMotion>
            </circle>
          </g>
        </g>
      ))}

      {INPUTS.map((input, index) => (
        <g
          key={`n${input.id}`}
          onMouseEnter={() => finePointer && setHover(index)}
          onMouseLeave={() => finePointer && setHover(null)}
          onClick={() => setHover(hover === index ? null : index)}
          style={{ cursor: "pointer" }}
          opacity={hover === null || hover === index ? 1 : 0.35}
        >
          <rect
            x="6"
            y={input.y}
            width="138"
            height="44"
            rx="10"
            fill={hover === index ? "rgba(192,132,252,.08)" : "rgba(255,255,255,.03)"}
            stroke={hover === index ? input.color : "rgba(255,255,255,.12)"}
            style={{ transition: "fill .3s, stroke .3s" }}
          />
          <circle cx="28" cy={input.y + 22} r="4" fill={input.color} />
          <text x="42" y={input.y + 19} fontFamily="var(--font-klarve-mono), monospace" fontSize="11" fill="rgba(235,238,248,.8)">
            {input.label}
          </text>
          <text x="42" y={input.y + 34} fontFamily="var(--font-klarve-mono), monospace" fontSize="9" fill="rgba(235,238,248,.38)">
            {input.sub}
          </text>
        </g>
      ))}

      <g transform="translate(395 240)">
        <g className="spin-slow">
          <circle r="118" fill="none" stroke="rgba(192,132,252,.18)" strokeWidth="1" strokeDasharray="3 7" />
        </g>
        <g className="spin-rev">
          <circle r="86" fill="none" stroke="rgba(129,140,248,.22)" strokeWidth="1" strokeDasharray="2 6" />
        </g>
        <path d="M0,-58 L58,0 L0,58 L-58,0 Z" fill="rgba(168,85,247,.08)" stroke="url(#nodeGrad)" strokeWidth="1.8" />
        <path d="M0,-58 L0,58 M-58,0 L58,0" stroke="rgba(192,132,252,.35)" strokeWidth="1" />
        <circle cx="0" cy="-58" r="6" fill="url(#nodeGrad)" />
        <circle cx="58" cy="0" r="6" fill="url(#nodeGrad)" />
        <circle cx="0" cy="58" r="6" fill="url(#nodeGrad)" />
        <circle cx="-58" cy="0" r="6" fill="url(#nodeGrad)" />
        <circle r="11" fill="#c084fc">
          <animate attributeName="r" values="9;12;9" dur="2.6s" repeatCount="indefinite" />
        </circle>
        <circle r="20" fill="none" stroke="#c084fc" strokeOpacity=".5">
          <animate attributeName="r" values="14;34" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values=".5;0" dur="2.6s" repeatCount="indefinite" />
        </circle>
      </g>

      <g>
        <path id="wout" d="M450,240 C490,240 500,240 540,240" fill="none" stroke="url(#wire)" strokeWidth="1.4" />
        <g>
          <circle r="3.4" fill="#e9d5ff" />
          <animateMotion dur="1.8s" repeatCount="indefinite">
            <mpath href="#wout" />
          </animateMotion>
        </g>
        <text x="495" y="222" textAnchor="middle" fontFamily="var(--font-klarve-mono), monospace" fontSize="9" fill="rgba(235,238,248,.45)">
          model-ready
        </text>
        <text x="495" y="234" textAnchor="middle" fontFamily="var(--font-klarve-mono), monospace" fontSize="9" fill="rgba(235,238,248,.45)">
          batches
        </text>
      </g>

      <text x="395" y="392" textAnchor="middle" fontFamily="var(--font-klarve-mono), monospace" fontSize="11.5" letterSpacing="3" fill="rgba(235,238,248,.4)">
        KLARVE DATA ENGINE
      </text>
      <text
        x="395"
        y="418"
        textAnchor="middle"
        fontFamily="var(--font-klarve-mono), monospace"
        fontSize="10"
        fill={hover === null ? "rgba(235,238,248,.3)" : "#c084fc"}
        style={{ transition: "fill .3s" }}
      >
        {tip}
      </text>
    </svg>
  );
}

const MARQUEE_ITEMS = [
  ["OpenAI", "/logo/openAI.svg"],
  ["Meta Llama", "/logo/meta.svg"],
  ["Hugging Face", "/logo/huggingFace.svg"],
  ["LangChain", "/logo/langChain.svg"],
  ["Databricks", "/logo/databricks.svg"],
  ["Ollama", "/logo/ollama.svg"],
] as const;

function Marquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="marquee-section">
      <div className="marquee-label">Pipeline-native for the frontier stack</div>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {doubled.map(([name, src], index) => (
            <span className="marquee-item" key={`${name}-${index}`}>
              <Image src={src} width={26} height={26} alt="" aria-hidden="true" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const WALL_LINES = [
  <>
    Scaled compute and scraped web data <strong>built the baseline</strong>: they will
    not cross into autonomous reasoning.
  </>,
  <>
    Pure synthetic loops end in <strong>model collapse</strong>.
  </>,
  <>
    The bottleneck is not GPUs. It is <strong>human-verified logic</strong>.
  </>,
];

function Wall() {
  return (
    <section id="wall">
      <div className="section-num">02</div>
      <div className="revamp-container">
        <Eyebrow num="02">The Synthetic Wall</Eyebrow>
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
          Models have hit the <span className="grad-text">Synthetic&nbsp;Wall.</span>
        </motion.h2>
        <div className="wall-grid">
          <div>
            <motion.div className="wall-lines" variants={stagger} initial="hidden" whileInView="show" viewport={viewport}>
              {WALL_LINES.map((line, index) => (
                <motion.div className="wall-line" key={index} variants={fadeUp}>
                  <span className="wl-num">0{index + 1}</span>
                  <span>{line}</span>
                </motion.div>
              ))}
            </motion.div>
            <motion.p
              className="punch"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
            >
              Frontier intelligence needs frontier human data.
            </motion.p>
          </div>
          <motion.div
            className="wall-chart"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <Chart />
            <div className="chart-legend">
              <span>
                <i style={{ background: "linear-gradient(90deg,#818cf8,#c084fc)" }} />
                Human-verified data
              </span>
              <span>
                <i style={{ background: "rgba(148,163,196,.7)" }} />
                Synthetic loops
              </span>
              <span className="chart-hint">move cursor to compare</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const SYN_D = "M40,285 C120,255 180,205 240,185 C285,170 310,168 330,170 C380,176 430,200 495,232";
const HUM_D = "M40,285 C130,262 200,215 260,170 C320,125 390,85 495,52";
const yToPct = (y: number) => Math.round(((290 - y) / 250) * 100);

function Chart() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const synRef = useRef<SVGPathElement | null>(null);
  const humRef = useRef<SVGPathElement | null>(null);
  const samples = useRef<{ syn: [number, number][]; hum: [number, number][] } | null>(null);
  const [cx, setCx] = useState<number | null>(null);

  useEffect(() => {
    if (!synRef.current || !humRef.current) return;

    const sample = (el: SVGPathElement) => {
      const len = el.getTotalLength();
      const pts: [number, number][] = [];
      for (let index = 0; index <= 120; index += 1) {
        const point = el.getPointAtLength((len * index) / 120);
        pts.push([point.x, point.y]);
      }
      return pts;
    };

    samples.current = { syn: sample(synRef.current), hum: sample(humRef.current) };
  }, []);

  const lookup = (pts: [number, number][], x: number) => {
    let best = pts[0];
    for (const point of pts) {
      if (Math.abs(point[0] - x) < Math.abs(best[0] - x)) best = point;
    }
    return best[1];
  };

  const onMove = (event: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 520;
    setCx(Math.max(48, Math.min(492, x)));
  };

  const synY = cx !== null && samples.current ? lookup(samples.current.syn, cx) : null;
  const humY = cx !== null && samples.current ? lookup(samples.current.hum, cx) : null;

  return (
    <svg viewBox="0 0 520 340" ref={svgRef} onMouseMove={onMove} onMouseLeave={() => setCx(null)} className="chart-svg">
      <defs>
        <linearGradient id="riseGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#818cf8" />
          <stop offset="1" stopColor="#c084fc" />
        </linearGradient>
        <linearGradient id="riseFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c084fc" stopOpacity=".22" />
          <stop offset="1" stopColor="#c084fc" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g stroke="rgba(255,255,255,.06)" strokeWidth="1">
        <line x1="40" y1="40" x2="40" y2="290" />
        <line x1="40" y1="290" x2="500" y2="290" />
        <line x1="40" y1="227.5" x2="500" y2="227.5" strokeDasharray="3 6" />
        <line x1="40" y1="165" x2="500" y2="165" strokeDasharray="3 6" />
        <line x1="40" y1="102.5" x2="500" y2="102.5" strokeDasharray="3 6" />
        <line x1="40" y1="40" x2="500" y2="40" strokeDasharray="3 6" />
      </g>
      <g fontFamily="var(--font-klarve-mono), monospace" fontSize="10" fill="rgba(235,238,248,.35)">
        <text x="36" y="294" textAnchor="end">
          0
        </text>
        <text x="36" y="46" textAnchor="end">
          100
        </text>
        <text x="14" y="170" transform="rotate(-90 14 170)" textAnchor="middle">
          capability
        </text>
        <text x="500" y="312" textAnchor="end">
          data scale -&gt;
        </text>
      </g>
      <motion.line
        x1="330"
        y1="46"
        x2="330"
        y2="290"
        stroke="rgba(255,90,90,.45)"
        strokeWidth="1.6"
        strokeDasharray="5 6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewport}
        transition={{ duration: 0.8, delay: 1.2 }}
      />
      <text x="338" y="60" fontFamily="var(--font-klarve-mono), monospace" fontSize="10.5" fill="rgba(255,120,120,.8)" letterSpacing="1.5">
        SYNTHETIC WALL
      </text>

      <motion.path ref={synRef} d={SYN_D} fill="none" stroke="rgba(148,163,196,.7)" strokeWidth="2.4" strokeLinecap="round" variants={drawPath} initial="hidden" whileInView="show" viewport={viewport} />
      <motion.path ref={humRef} d={HUM_D} fill="none" stroke="url(#riseGrad)" strokeWidth="3" strokeLinecap="round" variants={drawPath} initial="hidden" whileInView="show" viewport={viewport} />
      <motion.path d={`${HUM_D} L495,290 L40,290 Z`} fill="url(#riseFill)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewport} transition={{ duration: 1.2, delay: 1.4 }} />

      <motion.g fontFamily="var(--font-klarve-mono), monospace" fontSize="10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewport} transition={{ delay: 1.6 }}>
        <circle cx="495" cy="52" r="5" fill="#c084fc">
          <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
        </circle>
        <text x="488" y="44" textAnchor="end" fill="#e9d5ff">
          human-verified keeps climbing
        </text>
        <text x="488" y="226" textAnchor="end" fill="rgba(148,163,196,.85)">
          synthetic collapses
        </text>
      </motion.g>

      {cx !== null && synY !== null && humY !== null && (
        <g fontFamily="var(--font-klarve-mono), monospace" fontSize="10.5">
          <line x1={cx} y1="40" x2={cx} y2="290" stroke="rgba(255,255,255,.18)" strokeWidth="1" />
          <circle cx={cx} cy={humY} r="4.5" fill="#c084fc" stroke="#04060f" strokeWidth="1.5" />
          <circle cx={cx} cy={synY} r="4.5" fill="rgb(148,163,196)" stroke="#04060f" strokeWidth="1.5" />
          <g transform={`translate(${cx > 380 ? cx - 128 : cx + 10},${Math.min(humY, synY) - 6})`}>
            <rect width="118" height="44" rx="8" fill="rgba(7,9,18,.92)" stroke="rgba(255,255,255,.14)" />
            <text x="10" y="18" fill="#e9d5ff">
              human {yToPct(humY)}%
            </text>
            <text x="10" y="34" fill="rgba(148,163,196,.9)">
              synthetic {yToPct(synY)}%
            </text>
          </g>
        </g>
      )}
    </svg>
  );
}

const PILLARS = [
  {
    id: "traces",
    title: "Agentic Workflow Traces",
    desc: "Keystroke-level telemetry from custom IDEs. Train agents on how real engineers actually work.",
    pills: ["File navigation", "Terminal commands", "Thought processes"],
    icon: <PathIcon path="M4 17l5-5-5-5M11 19h9" />,
  },
  {
    id: "rlhf",
    title: "RLHF & Alignment",
    desc: "Nuanced human preference judgments that shape model behavior, safety, and instruction following.",
    pills: ["Reward modeling", "AI safety", "Enterprise logic"],
    icon: <PathIcon path="M12 3l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L4.2 8.7l5.4-.8L12 3z" />,
  },
  {
    id: "sft",
    title: "SFT & Reasoning",
    desc: "Verified reasoning paths crafted step-by-step by elite engineers. Built to surpass benchmark plateaus.",
    pills: ["Algorithms", "System design", "Hard problem sets"],
    icon: <PathIcon path="M9 18l-5-6 5-6M15 6l5 6-5 6" />,
  },
  {
    id: "sim",
    title: "Simulation & RL Environments",
    desc: "Dockerized repos with robust testing harnesses for repository-wide agent evaluation.",
    pills: ["Secure sandboxes", "Test harnesses", "Agent verification"],
    icon: <PathIcon path="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.3 7l8.7 5 8.7-5M12 22V12" />,
  },
] as const;

const CHIPS = [
  ["Multi-Modal Annotations", "Text, code, image, and video labeling.", <GridIcon key="1" />],
  ["Code-Gen & Debugging", "Write, analyze, and repair production software.", <PathIcon key="2" path="M8 9l-4 3 4 3M16 9l4 3-4 3M13 5l-2 14" />],
  ["Domain-Specific SFT", "Finance, healthcare, legal, enterprise SaaS.", <PathIcon key="3" path="M12 7v5l3 3" circle />],
  ["Advanced Reasoning", "Multi-step logic beyond benchmark plateaus.", <PathIcon key="4" path="M4 19l5-7 4 4 7-10" />],
  ["Multi-Turn Conversation", "Memory, safety, and persona over long chats.", <PathIcon key="5" path="M21 12a8 8 0 1 1-3-6.2M21 4v5h-5" />],
  ["Text-to-SQL", "Structured outputs for BI copilots and agents.", <DatabaseIcon key="6" />],
  ["RAG Training & Eval", "Human-verified retrieval traces and judgments.", <PathIcon key="7" path="M21 21l-4.3-4.3" circle />],
  ["Model Evaluation", "Correctness, safety, and production fitness.", <PathIcon key="8" path="M9 11l3 3 8-8M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" />],
  ["Indic & Multilingual", "Under-resourced locales your models must support.", <GlobeIcon key="9" />],
] as const;

function Capabilities() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (paused || reduceMotion) return;
    timer.current = setTimeout(() => setActive((current) => (current + 1) % PILLARS.length), 6000);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [active, paused, reduceMotion]);

  const pillar = PILLARS[active];

  return (
    <section id="capabilities" className="tight-section">
      <div className="section-num">03</div>
      <div className="revamp-container">
        <Eyebrow num="03">What we deliver</Eyebrow>
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
          Core capabilities
        </motion.h2>

        <motion.div className="tabs" variants={stagger} initial="hidden" whileInView="show" viewport={viewport} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {PILLARS.map((item, index) => (
            <motion.button key={item.id} variants={fadeUp} className={`tab${index === active ? " active" : ""}`} onClick={() => setActive(index)}>
              {item.icon}
              {item.title}
              {index === active && !paused && <motion.span className="progress-ring" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 6, ease: "linear" }} />}
            </motion.button>
          ))}
        </motion.div>

        <div className="tab-panel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <AnimatePresence mode="wait">
            <motion.div key={pillar.id} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.45, ease: EASE }}>
              <div className="tp-icon">{pillar.icon}</div>
              <h3>{pillar.title}</h3>
              <p>{pillar.desc}</p>
              <div className="tp-pills">
                {pillar.pills.map((pill) => (
                  <span key={pill}>{pill}</span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div key={`${pillar.id}-vis`} className="tp-vis" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.45, ease: EASE }}>
              <PillarVis index={active} />
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div className="more-caps" variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
          <div className="more-caps-label">Additional capabilities: hover or tap to expand</div>
          <motion.div className="chip-grid" variants={stagger} initial="hidden" whileInView="show" viewport={viewport}>
            {CHIPS.map(([title, desc, icon]) => (
              <Chip key={title} title={title} desc={desc} icon={icon} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Chip({ title, desc, icon }: { title: string; desc: string; icon: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.button
      type="button"
      className={`chip${open ? " open" : ""}`}
      variants={fadeUp}
      aria-expanded={open}
      onClick={() => setOpen(!open)}
    >
      <div className="chip-head">
        {icon}
        <span className="t">{title}</span>
      </div>
      <div className="d">{desc}</div>
    </motion.button>
  );
}

function PillarVis({ index }: { index: number }) {
  const visuals = [
    <svg viewBox="0 0 380 240" key="traces">
      <g fontFamily="var(--font-klarve-mono), monospace" fontSize="10" fill="rgba(235,238,248,.4)">
        {["cd src/", "vim agent.py", "pytest -q", "git commit"].map((cmd, itemIndex) => (
          <g key={cmd}>
            <rect x="20" y={28 + itemIndex * 50} width="340" height="34" rx="8" fill="rgba(255,255,255,.025)" stroke="rgba(255,255,255,.1)" />
            <circle cx="40" cy={45 + itemIndex * 50} r="3.5" fill={["#818cf8", "#a78bfa", "#c084fc", "#e9d5ff"][itemIndex]} />
            <text x="56" y={49 + itemIndex * 50} fill="#dde3f0">
              {cmd}
            </text>
            <text x="340" y={49 + itemIndex * 50} textAnchor="end">
              +{(itemIndex + 1) * 312}ms
            </text>
          </g>
        ))}
        <path d="M40,45 L40,178" stroke="rgba(192,132,252,.3)" strokeWidth="1" strokeDasharray="3 4" fill="none" />
      </g>
    </svg>,
    <svg viewBox="0 0 380 240" key="rlhf">
      <rect x="24" y="40" width="150" height="120" rx="10" fill="rgba(129,140,248,.06)" stroke="rgba(129,140,248,.4)" />
      <rect x="206" y="40" width="150" height="120" rx="10" fill="rgba(192,132,252,.1)" stroke="#c084fc" strokeWidth="1.6" />
      <g fontFamily="var(--font-klarve-mono), monospace" fontSize="11" fill="rgba(235,238,248,.5)">
        <text x="99" y="66" textAnchor="middle">
          RESPONSE A
        </text>
        <text x="281" y="66" textAnchor="middle" fill="#e9d5ff">
          RESPONSE B
        </text>
      </g>
      {[0, 1, 2].map((itemIndex) => (
        <g key={itemIndex}>
          <rect x="40" y={84 + itemIndex * 20} width={itemIndex === 1 ? 80 : 116} height="7" rx="3.5" fill="rgba(255,255,255,.12)" />
          <rect x="222" y={84 + itemIndex * 20} width={itemIndex === 2 ? 90 : 118} height="7" rx="3.5" fill="rgba(192,132,252,.4)" />
        </g>
      ))}
      <circle cx="281" cy="186" r="16" fill="rgba(192,132,252,.15)" stroke="#c084fc" />
      <path d="M274 186l5 5 9-10" stroke="#c084fc" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="99" y="191" textAnchor="middle" fontFamily="var(--font-klarve-mono), monospace" fontSize="10" fill="rgba(235,238,248,.35)">
        rejected
      </text>
    </svg>,
    <svg viewBox="0 0 380 240" key="sft">
      {["Parse the problem constraints", "Select data structures", "Derive the algorithm", "Verify edge cases"].map((step, itemIndex) => (
        <g key={step}>
          <circle cx="50" cy={40 + itemIndex * 54} r="13" fill="rgba(192,132,252,.12)" stroke="#c084fc" />
          <text x="50" y={44 + itemIndex * 54} textAnchor="middle" fontFamily="var(--font-klarve-mono), monospace" fontSize="11" fill="#e9d5ff">
            {itemIndex + 1}
          </text>
          {itemIndex < 3 && <path d={`M50,${53 + itemIndex * 54} L50,${27 + (itemIndex + 1) * 54}`} stroke="rgba(192,132,252,.4)" strokeWidth="1.4" />}
          <rect x="84" y={26 + itemIndex * 54} width="264" height="28" rx="8" fill="rgba(255,255,255,.025)" stroke="rgba(255,255,255,.1)" />
          <text x="98" y={44 + itemIndex * 54} fontFamily="var(--font-klarve-mono), monospace" fontSize="11" fill={itemIndex === 3 ? "#4ade80" : "rgba(235,238,248,.6)"}>
            {step}
          </text>
        </g>
      ))}
    </svg>,
    <svg viewBox="0 0 380 240" key="sim">
      <rect x="40" y="30" width="300" height="180" rx="14" fill="rgba(255,255,255,.02)" stroke="rgba(255,255,255,.12)" />
      <g fontFamily="var(--font-klarve-mono), monospace" fontSize="10.5">
        <rect x="64" y="56" width="120" height="56" rx="9" fill="rgba(129,140,248,.08)" stroke="rgba(129,140,248,.45)" />
        <text x="124" y="80" textAnchor="middle" fill="#a5b4fc">
          repo.git
        </text>
        <text x="124" y="98" textAnchor="middle" fill="rgba(235,238,248,.35)">
          dockerized
        </text>
        <rect x="200" y="56" width="116" height="56" rx="9" fill="rgba(192,132,252,.08)" stroke="rgba(192,132,252,.45)" />
        <text x="258" y="80" textAnchor="middle" fill="#e9d5ff">
          agent
        </text>
        <text x="258" y="98" textAnchor="middle" fill="rgba(235,238,248,.35)">
          under test
        </text>
        <path d="M184,84 L200,84" stroke="#c084fc" strokeWidth="1.5" />
        <rect x="64" y="136" width="252" height="48" rx="9" fill="rgba(74,222,128,.05)" stroke="rgba(74,222,128,.35)" />
        <text x="84" y="164" fill="#4ade80">
          412 / 412 tests passing
        </text>
      </g>
    </svg>,
  ];

  return visuals[index];
}

const LAYERS = [
  ["Inputs", "what goes in", ["Raw unstructured data", "User prompts", "System logs", "API parameters"]],
  ["Domains", "where it applies", ["Healthcare & pharma", "Financial services", "Legal", "Retail & e-commerce"]],
  ["Expertise", "how we shape it", ["Fine-tuning", "Prompt engineering", "RLHF training", "Knowledge graphs"]],
  ["Use cases", "what you ship", ["Conversational agents", "Predictive analytics", "Content generation", "Code synthesis"]],
] as const;

const NODE_Y = [110, 310, 510, 710];
const NODE_COLORS = ["#818cf8", "#919cf8", "#a98cfa", "#c084fc"];

function Layers() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="layers" className="tight-section">
      <div className="section-num">04</div>
      <div className="revamp-container">
        <Eyebrow num="04">Customization layers</Eyebrow>
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
          Configure your stack, <span className="grad-text">layer by layer.</span>
        </motion.h2>
        <motion.p className="sub" variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
          Compose each layer independently, or deploy the full stack end-to-end.
        </motion.p>
        <div className="layers-wrap">
          <div className="layers-rail" aria-hidden="true">
            <svg viewBox="0 0 60 800" preserveAspectRatio="none">
              <defs>
                <linearGradient id="railGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#818cf8" />
                  <stop offset="1" stopColor="#c084fc" />
                </linearGradient>
              </defs>
              <motion.path id="railPath" d="M30,10 L30,790" stroke="url(#railGrad)" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2, ease: EASE }} />
              <circle r="4.5" fill="#e9d5ff">
                <animateMotion dur="5s" repeatCount="indefinite">
                  <mpath href="#railPath" />
                </animateMotion>
              </circle>
              {NODE_Y.map((y, index) => (
                <g key={y}>
                  <circle cx="30" cy={y} r={active === index ? 9 : 5} fill={NODE_COLORS[index]} style={{ transition: "r .3s" }} />
                  {active === index && <circle cx="30" cy={y} r="15" fill="none" stroke={NODE_COLORS[index]} strokeOpacity=".4" />}
                </g>
              ))}
            </svg>
          </div>
          <div onMouseLeave={() => setActive(null)}>
            {LAYERS.map(([title, hint, items], index) => (
              <motion.div className="layer-card" key={title} onMouseEnter={() => setActive(index)} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={viewport} transition={{ duration: 0.7, ease: EASE, delay: index * 0.12 }}>
                <div className="layer-meta">
                  <div className="ln">
                    LAYER 0{index + 1}: {hint.toUpperCase()}
                  </div>
                  <h3>{title}</h3>
                </div>
                <div className="layer-items">
                  {items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const HUMAN_POINTS = [
  ["Elite vetting", "Top 1% of applicants pass technical benchmarking.", <PathIcon key="a" path="M20 6L9 17l-5-5" />],
  ["Bounty-based incentives", "Paid for solved problems, not logged hours.", <TargetIcon key="b" />],
  ["Embedded QA", "Multi-step verification inside the workflow.", <ShieldIcon key="c" />],
] as const;

function Human() {
  return (
    <section className="human" id="human">
      <div className="section-num">05</div>
      <div className="revamp-container">
        <div className="human-grid">
          <div>
            <Eyebrow num="05">Beyond crowdsourcing</Eyebrow>
            <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
              Intelligence cannot be crowdsourced. It is <span className="grad-text">engineered.</span>
            </motion.h2>
            <motion.div className="human-points" variants={stagger} initial="hidden" whileInView="show" viewport={viewport}>
              {HUMAN_POINTS.map(([title, desc, icon]) => (
                <motion.div className="point" key={title} variants={fadeUp}>
                  <div className="pt-ic">{icon}</div>
                  <div>
                    <div className="pt-t">{title}</div>
                    <div className="pt-d">{desc}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <motion.div className="funnel-box" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ duration: 0.9, ease: EASE }}>
            <Funnel />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Funnel() {
  const stages = [
    {
      d: "M30,40 L410,40 L330,130 L110,130 Z",
      fill: "rgba(129,140,248,.05)",
      stroke: "rgba(129,140,248,.5)",
      t1: "100,000+ APPLICANTS",
      t2: "GLOBAL EXPERT POOL",
      y: 80,
      fs: 12,
      ls: 1,
    },
    {
      d: "M100,150 L340,150 L295,240 L145,240 Z",
      fill: "rgba(154,120,250,.07)",
      stroke: "rgba(154,120,250,.55)",
      t1: "TECHNICAL BENCHMARKING",
      t2: "SCREENS / LIVE TASKS",
      y: 190,
      fs: 11,
      ls: 0.4,
    },
    {
      d: "M145,260 L295,260 L260,350 L180,350 Z",
      fill: "rgba(192,132,252,.1)",
      stroke: "#c084fc",
      t1: "TOP 1%",
      t2: "KLARVE EXPERTS",
      y: 298,
      fs: 12,
      ls: 0.4,
    },
  ];

  return (
    <svg viewBox="0 0 440 420">
      <g fontFamily="var(--font-klarve-mono), monospace">
        {stages.map((stage, index) => (
          <motion.g key={stage.t1} initial={{ opacity: 0, y: -16 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.04 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE, delay: 0.3 + index * 0.35 }} style={{ transformBox: "fill-box", transformOrigin: "center", cursor: "default" }}>
            <path d={stage.d} fill={stage.fill} stroke={stage.stroke} strokeWidth={index === 2 ? 1.6 : 1.4} />
            <text x="220" y={stage.y} textAnchor="middle" fontSize={stage.fs} letterSpacing={stage.ls} fill={index === 2 ? "#e9d5ff" : "rgba(235,238,248,.75)"}>
              {stage.t1}
            </text>
            <text x="220" y={stage.y + 20} textAnchor="middle" fontSize="9" letterSpacing={stage.ls} fill="rgba(235,238,248,.38)">
              {stage.t2}
            </text>
          </motion.g>
        ))}
        <motion.text x="220" y="395" textAnchor="middle" fontSize="11" fill="#c084fc" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.5 }}>
          FRONTIER-GRADE DATA
        </motion.text>
      </g>
    </svg>
  );
}

const COMPLIANCE_CARDS = [
  {
    badge: "Audited",
    title: "SOC 2 Type II",
    desc: "Independently audited security and processing integrity.",
    icon: <ShieldCheckIcon key="soc" />,
  },
  {
    badge: "Certified",
    title: "ISO 27001",
    desc: "Global standard for information security management.",
    icon: <ClockIcon key="iso" />,
  },
  {
    badge: "Compliant",
    title: "GDPR",
    desc: "EU-grade privacy for user and project data.",
    icon: <LockIcon key="gdpr" />,
  },
  {
    badge: "Certified",
    title: "HIPAA",
    desc: "Safeguards for protected health information.",
    icon: <PulseIcon key="hipaa" />,
  },
] as const;

function Compliance() {
  return (
    <section id="compliance">
      <div className="section-num">06</div>
      <div className="revamp-container">
        <Eyebrow num="06">Enterprise certifications</Eyebrow>
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
          Compliance, built into delivery.
        </motion.h2>
        <motion.div className="comp-grid" variants={stagger} initial="hidden" whileInView="show" viewport={viewport}>
          {COMPLIANCE_CARDS.map((card) => (
            <motion.div className="comp-card" key={card.title} variants={fadeUp}>
              {card.icon}
              <div className="badge">{card.badge}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const CODE_LINES: readonly (readonly [string, string][])[] = [
  [["cm", "# Pipeline-ready: your schema, zero cleaning"]],
  [
    ["kw", "from"],
    ["pl", " klarve "],
    ["kw", "import"],
    ["pl", " load_dataset"],
  ],
  [["pl", ""]],
  [
    ["pl", "ds = "],
    ["fn", "load_dataset"],
    ["pl", "("],
    ["st", '"agentic-traces"'],
    ["pl", ", "],
    ["st", '"train"'],
    ["pl", ")"],
  ],
  [
    ["kw", "for"],
    ["pl", " batch "],
    ["kw", "in"],
    ["pl", " ds."],
    ["fn", "iter_batches"],
    ["pl", "():"],
  ],
  [
    ["pl", "    "],
    ["fn", "train_step"],
    ["pl", "(batch)"],
  ],
  [["pl", ""]],
  [["cm", "# delivered to your schema, zero cleaning"]],
];

function Integration() {
  const [run, setRun] = useState(0);

  return (
    <section id="integration" className="tight-section">
      <div className="section-num">07</div>
      <div className="revamp-container">
        <div className="integ-grid">
          <div>
            <Eyebrow num="07">Zero-friction integration</Eyebrow>
            <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
              Native to the <span className="grad-text">frontier stack.</span>
            </motion.h2>
            <motion.p className="sub" variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
              Datasets arrive strictly formatted to your schema. No cleaning, no conversion.
            </motion.p>
            <motion.div className="integ-formats" variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
              {["JSONL", "Parquet", "HF Datasets", "WebDataset", "TFRecord", "Custom schema"].map((format) => (
                <span key={format}>{format}</span>
              ))}
            </motion.div>
          </div>
          <motion.div className="terminal" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ duration: 0.9, ease: EASE }}>
            <div className="term-head">
              <i />
              <i />
              <i />
              <span className="fname">load_dataset.py</span>
              <button className="term-replay" onClick={() => setRun((current) => current + 1)} title="Replay code animation">
                play replay
              </button>
            </div>
            <TypedCode key={run} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TypedCode() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState({ line: 0, char: 0 });
  const done = reduceMotion || progress.line >= CODE_LINES.length;

  useEffect(() => {
    if (reduceMotion || !inView || done) return;
    const lineText = CODE_LINES[progress.line].map((segment) => segment[1]).join("");
    const timeout = setTimeout(
      () => {
        if (progress.char >= lineText.length) {
          setProgress({ line: progress.line + 1, char: 0 });
        } else {
          setProgress({ ...progress, char: progress.char + 1 + Math.floor(Math.random() * 2) });
        }
      },
      progress.char >= lineText.length ? (lineText.length ? 160 : 60) : 18 + Math.random() * 30,
    );
    return () => clearTimeout(timeout);
  }, [inView, progress, done, reduceMotion]);

  return (
    <div className="term-body" ref={ref}>
      {CODE_LINES.slice(0, done ? CODE_LINES.length : progress.line + 1).map((line, lineIndex) => (
        <div key={lineIndex}>
          {renderLine(line, lineIndex < progress.line || done ? Infinity : progress.char)}
          {lineIndex === progress.line && !done && <span className="cursor" />}
          {line.every(([, text]) => !text) && " "}
        </div>
      ))}
      {done && <span className="cursor" />}
    </div>
  );
}

function renderLine(line: readonly (readonly [string, string])[], upTo: number) {
  let position = 0;
  return line.map(([cls, text], index) => {
    const take = Math.max(0, Math.min(text.length, upTo - position));
    position += text.length;
    return take > 0 ? (
      <span className={cls} key={index}>
        {text.slice(0, take)}
      </span>
    ) : null;
  });
}

const TEAM = [
  {
    name: "Aryan Honawar",
    role: "CEO & Co-Founder",
    email: "aryanhonawar@klarve.ai",
    photo: "https://www.klarve.ai/aryan.jpeg",
  },
  {
    name: "Nabeel",
    role: "COO & Co-Founder",
    email: "nabeel@klarve.ai",
    photo: "https://www.klarve.ai/nabeel.jpeg",
  },
  {
    name: "Eshu",
    role: "CTO",
    email: "eshu@klarve.ai",
    photo: "https://www.klarve.ai/eshu.jpg",
  },
] as const;

function Team() {
  return (
    <section id="team" className="tight-section">
      <div className="section-num">08</div>
      <div className="revamp-container">
        <Eyebrow num="08">The team</Eyebrow>
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
          The operating layer behind the data.
        </motion.h2>
        <motion.div className="team-grid" variants={stagger} initial="hidden" whileInView="show" viewport={viewport}>
          {TEAM.map((member) => (
            <motion.div className="team-card" key={member.name} variants={fadeUp}>
              <Image
                className="team-avatar"
                src={member.photo}
                alt={`${member.name}, ${member.role} at Klarve`}
                width={128}
                height={128}
                sizes="64px"
                loading="lazy"
              />
              <div className="team-info">
                <h3>{member.name}</h3>
                <div className="role">{member.role}</div>
                <a className="mail" href={`mailto:${member.email}`}>
                  <MailIcon />
                  {member.email}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Cta() {
  const packets = [
    ["#cw1", "8s", "0s", "#c084fc", "custom-pilot.jsonl"],
    ["#cw2", "10s", "-3s", "#a5b4fc", "benchmark-suite.db"],
    ["#cw3", "9s", "-6s", "#e9d5ff", "eval-judgments.parquet"],
  ] as const;

  return (
    <section className="cta" id="contact">
      <div className="revamp-container">
        <motion.div className="cta-box" initial={{ opacity: 0, y: 40, scale: 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={viewport} transition={{ duration: 1, ease: EASE }}>
          <svg className="cta-svg" viewBox="0 0 1200 460" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <linearGradient id="ctaWire" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#818cf8" stopOpacity="0" />
                <stop offset=".5" stopColor="#a78bfa" stopOpacity=".5" />
                <stop offset="1" stopColor="#c084fc" stopOpacity="0" />
              </linearGradient>
            </defs>
            <g fill="none" stroke="url(#ctaWire)" strokeWidth="1.2">
              <path id="cw1" d="M-40,80 C300,40 900,130 1240,70" />
              <path id="cw2" d="M-40,230 C320,270 880,190 1240,240" />
              <path id="cw3" d="M-40,390 C300,430 900,350 1240,400" />
            </g>
            {packets.map(([path, dur, begin, color, label]) => (
              <g key={path}>
                <circle r="2.8" fill={color} />
                <text x="9" y="4" fontFamily="var(--font-klarve-mono), monospace" fontSize="10" fill="rgba(235,238,248,.35)">
                  {label}
                </text>
                <animateMotion dur={dur} begin={begin} repeatCount="indefinite">
                  <mpath href={path} />
                </animateMotion>
              </g>
            ))}
          </svg>
          <div className="cta-content">
            <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
              Ready to train <span className="grad-text">past the plateau?</span>
            </motion.h2>
            <motion.p className="sub" variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
              Custom data pipelines, tuned to your evaluation benchmarks.
            </motion.p>
            <motion.div className="cta-ctas" variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
              <a className="btn btn-primary" href={CONTACT_HREF}>
                Request a data pilot <ArrowIcon />
              </a>
              <a className="btn btn-ghost" href={CONTACT_HREF}>
                Private benchmarking
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function RevampFooter() {
  return (
    <footer>
      <div className="revamp-container">
        <div className="foot-grid">
          <div className="foot-brand">
            <a href="#top" className="logo" aria-label="Klarve home">
              <LogoMark />
            </a>
            <p>Expert-curated evaluation and training data for foundation models.</p>
            <div className="loc">BAY AREA / MUMBAI</div>
          </div>
          <div className="foot-col">
            <h4>Navigation</h4>
            <a href="#top">Home</a>
            <a href="#capabilities">Capabilities</a>
            <a href="#layers">Stack</a>
            <a href="#team">Team</a>
            <a href={CONTACT_HREF}>Contact</a>
          </div>
          <div className="foot-col">
            <h4>Company</h4>
            <a href="https://www.linkedin.com/company/klarve/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="mailto:contact@klarve.ai">contact@klarve.ai</a>
            <a href="/privacy">Privacy policy</a>
            <a href="/terms">Terms &amp; conditions</a>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Klarve. All rights reserved.</span>
          <span>Built for frontier AI teams that need high-signal human data.</span>
        </div>
      </div>
    </footer>
  );
}

function LogoMark() {
  return (
    <Image
      src="/nobg.png"
      alt="Klarve"
      width={170}
      height={52}
      priority
      unoptimized
      className="logo-img"
    />
  );
}

function ArrowIcon() {
  return (
    <svg
      className="arr"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.75 8h10.5M9 3.75 13.25 8 9 12.25"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Eyebrow({ num, children }: { num: string; children: ReactNode }) {
  return (
    <motion.div className="eyebrow" variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
      <span className="num">{num}</span>
      <span className="line" />
      {children}
    </motion.div>
  );
}

function Counter({ to, duration = 1600 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setVal(to);
      return;
    }

    if (!inView) return;
    let raf = 0;
    let t0 = 0;
    const step = (time: number) => {
      if (!t0) t0 = time;
      const progress = Math.min((time - t0) / duration, 1);
      setVal(Math.round(to * (1 - (1 - progress) ** 3)));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduceMotion]);

  return <em ref={ref}>{val}</em>;
}

function PathIcon({ path, circle = false }: { path: string; circle?: boolean }) {
  return (
    <svg viewBox="0 0 24 24">
      {circle && <circle cx="12" cy="12" r="9" />}
      <path d={path} />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
      <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 4 5.7 4 9s-1.5 6.4-4 9c-2.5-2.6-4-5.7-4-9s1.5-6.4 4-9z" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M12 3l8 4v5c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V7l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg viewBox="0 0 48 48">
      <motion.path variants={drawIcon(0.2)} d="M24 5l16 7v10c0 9.5-6.6 17-16 19.5C14.6 39 8 31.5 8 22V12l16-7z" fill="none" stroke="#c084fc" strokeWidth="1.8" />
      <motion.path variants={drawIcon(0.7)} d="M17 24l5 5 9-10" fill="none" stroke="#818cf8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 48 48">
      <motion.circle variants={drawIcon(0.3)} cx="24" cy="24" r="18" fill="none" stroke="#c084fc" strokeWidth="1.8" />
      <motion.path variants={drawIcon(0.8)} d="M24 14v10l7 5" fill="none" stroke="#818cf8" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 48 48">
      <motion.rect variants={drawIcon(0.4)} x="9" y="20" width="30" height="21" rx="4" fill="none" stroke="#c084fc" strokeWidth="1.8" />
      <motion.path variants={drawIcon(0.9)} d="M16 20v-5a8 8 0 0 1 16 0v5" fill="none" stroke="#818cf8" strokeWidth="2" />
      <circle cx="24" cy="30" r="2.6" fill="#c084fc" />
    </svg>
  );
}

function PulseIcon() {
  return (
    <svg viewBox="0 0 48 48">
      <motion.path variants={drawIcon(0.5)} d="M24 41s-15-8.6-15-19a8.6 8.6 0 0 1 15-5.8A8.6 8.6 0 0 1 39 22c0 10.4-15 19-15 19z" fill="none" stroke="#c084fc" strokeWidth="1.8" />
      <motion.path variants={drawIcon(1)} d="M16 24h5l3-6 4 11 3-5h5" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function drawIcon(delay: number) {
  return {
    hidden: { pathLength: 0 },
    show: { pathLength: 1, transition: { duration: 1.4, ease: EASE, delay } },
  };
}
