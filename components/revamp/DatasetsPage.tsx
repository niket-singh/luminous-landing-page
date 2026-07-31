"use client";

import { useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Nav, RevampFooter } from "./AdzzatLabsLandingPage";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

type DatasetCategory = "Egocentric" | "Teleoperation" | "Glove & Tactile" | "Annotated";

interface Dataset {
  code: string;
  title: string;
  category: DatasetCategory;
  setting: string;
  geography: string;
  workers: string;
  videos: string;
  otsHours: string;
  camera: string;
  resolution: string;
  imu: boolean;
  sampleUrl: string;
  customCollection?: boolean;
  note?: string;
}

const DATASETS: Dataset[] = [
  {
    code: "AZL-EGO-01",
    title: "Mono Egocentric Data",
    category: "Egocentric",
    setting: "Residential",
    geography: "South Asia",
    workers: "800",
    videos: "20,000",
    otsHours: "10,000",
    camera: "iPhone 13 or newer",
    resolution: "4K / 1080p",
    imu: false,
    sampleUrl: "https://drive.google.com/drive/folders/1Ec5f7yUlYdcbOOHZK04UTAWAL3CvYCjE?usp=drive_link",
  },
  {
    code: "AZL-EGO-02",
    title: "Mono Egocentric Data",
    category: "Egocentric",
    setting: "Commercial",
    geography: "South Asia",
    workers: "500",
    videos: "18,000",
    otsHours: "15,000",
    camera: "iPhone 13 or newer",
    resolution: "4K / 1080p",
    imu: false,
    sampleUrl: "https://drive.google.com/drive/folders/1FD5Nh7BeS9Yod8GYOGBxzQSMq_CD8-9E?usp=drive_link",
  },
  {
    code: "AZL-EGO-03",
    title: "Mono Egocentric Data",
    category: "Egocentric",
    setting: "Residential",
    geography: "Latin America",
    workers: "100",
    videos: "15,000",
    otsHours: "8,000",
    camera: "GoPro or any device",
    resolution: "4K / 1080p",
    imu: false,
    sampleUrl: "https://drive.google.com/file/d/1AK0CBaNGnzDmtehGRtDKvcRYTePsnzgY/view?usp=drive_link",
  },
  {
    code: "AZL-EGO-04",
    title: "Ego with IMU",
    category: "Egocentric",
    setting: "Residential",
    geography: "Asia",
    workers: "800",
    videos: "20,000",
    otsHours: "10,000",
    camera: "GoPro or any device",
    resolution: "720p",
    imu: true,
    sampleUrl: "https://drive.google.com/drive/folders/1WZdQWFRVAGoik_V-FpQsQw7i6AblWObg?usp=drive_link",
  },
  {
    code: "AZL-EGO-05",
    title: "Stereo Egocentric Data",
    category: "Egocentric",
    setting: "Residential",
    geography: "South Asia",
    workers: "10",
    videos: "12",
    otsHours: "100",
    camera: "GoPro or any device",
    resolution: "4K / 1080p",
    imu: false,
    sampleUrl: "https://drive.google.com/file/d/1Y8Mc6LjRr9FY0Ewg3CksvQAG2W0KIgoD/view?usp=drive_link",
    note: "Full dataset captured with left and right wrist views.",
  },
  {
    code: "AZL-EGO-06",
    title: "Stereo Ego",
    category: "Egocentric",
    setting: "Industrial 60% / Residential 40%",
    geography: "Asia",
    workers: "50",
    videos: "500",
    otsHours: "5,000",
    camera: "GoPro or any device",
    resolution: "4K / 1080p",
    imu: true,
    sampleUrl: "https://drive.google.com/drive/folders/1L3eNdyRaVpiNQCUYrmG-FZIGdZSCJwCQ?usp=drive_link",
    note: "Full stereo calibration included — depth and disparity can be computed downstream via standard stereo matching.",
  },
  {
    code: "AZL-UMI-01",
    title: "UMI Gripper Data",
    category: "Egocentric",
    setting: "Residential / Commercial",
    geography: "Asia",
    workers: "800",
    videos: "20,000",
    otsHours: "10,000",
    camera: "GoPro or any device",
    resolution: "4K / 1080p",
    imu: false,
    sampleUrl: "https://drive.google.com/file/d/1F8EtlRMGGY9KiHTsdkvAZLsRm8oCgzAg/view?usp=sharing",
  },
  {
    code: "AZL-TEL-01",
    title: "Teleoperation",
    category: "Teleoperation",
    setting: "Residential",
    geography: "Asia",
    workers: "20",
    videos: "100",
    otsHours: "600",
    camera: "GoPro or any device",
    resolution: "4K / 1080p",
    imu: false,
    sampleUrl: "https://drive.google.com/file/d/1gwDVyiwqWXGzjvzs3l5soE_saa1PnHnl/view?usp=drive_link",
  },
  {
    code: "AZL-TEL-02",
    title: "Teleoperation — High Fidelity",
    category: "Teleoperation",
    setting: "Residential",
    geography: "Asia",
    workers: "20",
    videos: "8,000",
    otsHours: "5,000",
    camera: "GoPro or any device",
    resolution: "4K / 1080p",
    imu: false,
    sampleUrl: "https://drive.google.com/file/d/1vcTQ7va_znrgjSGv0IaokBtBoNKJzpAe/view?usp=drive_link",
  },
  {
    code: "AZL-GLV-01",
    title: "Optical Glove Data",
    category: "Glove & Tactile",
    setting: "Residential / Commercial",
    geography: "Asia",
    workers: "Custom",
    videos: "Custom",
    otsHours: "Custom",
    camera: "GoPro or any device",
    resolution: "4K / 1080p",
    imu: true,
    sampleUrl: "https://drive.google.com/file/d/1yLbrBjzl1EFi_fauGH5HY1Ij9PT5sPYx/view?usp=drive_link",
    customCollection: true,
  },
  {
    code: "AZL-GLV-02",
    title: "Tactile Glove Data",
    category: "Glove & Tactile",
    setting: "Industrial 60% / Household 40%",
    geography: "Asia",
    workers: "50",
    videos: "500",
    otsHours: "5,000",
    camera: "GoPro or any device",
    resolution: "4K / 1080p",
    imu: true,
    sampleUrl: "https://drive.google.com/drive/folders/1zVjtYr27iy8GxP1H2BOUe1uBguJqvfii?usp=sharing",
    note: "Hand pose plus contact data for dexterous manipulation.",
  },
  {
    code: "AZL-ANN-01",
    title: "Annotated Data",
    category: "Annotated",
    setting: "Commercial",
    geography: "South Asia",
    workers: "500",
    videos: "18,000",
    otsHours: "15,000",
    camera: "iPhone 13 or newer",
    resolution: "4K / 1080p",
    imu: false,
    sampleUrl: "https://drive.google.com/drive/folders/1GlCVd4Yg31b-ndurhYmNmq9q92Vj15uZ?usp=drive_link",
  },
  {
    code: "AZL-ANN-02",
    title: "Annotated Data",
    category: "Annotated",
    setting: "Residential / Commercial",
    geography: "Asia",
    workers: "800",
    videos: "20,000",
    otsHours: "10,000",
    camera: "GoPro or any device",
    resolution: "4K / 1080p",
    imu: false,
    sampleUrl: "https://drive.google.com/file/d/1hwL29bQ1zqSsbMWcrihXyuUt_1xU2aXX/view?usp=drive_link",
  },
];

const FILTERS = ["All", "Egocentric", "Teleoperation", "Glove & Tactile", "Annotated"] as const;

type Filter = (typeof FILTERS)[number];

const CATEGORY_GLYPHS: Record<DatasetCategory, string> = {
  Egocentric: "EGO",
  Teleoperation: "TEL",
  "Glove & Tactile": "GLV",
  Annotated: "ANN",
};

export function DatasetsPage() {
  return (
    <div className="adzzatlabs-revamp">
      <MotionConfig reducedMotion="user">
        <Nav />
        <main id="top">
          <DatasetsHero />
          <Catalogue />
          <MethodStrip />
          <DatasetsCta />
          <RevampFooter />
        </main>
      </MotionConfig>
    </div>
  );
}

function DatasetsHero() {
  return (
    <section className="ds-head tight-section">
      <div className="revamp-container">
        <motion.div variants={fadeUp} initial="hidden" animate="show">
          <div className="eyebrow">
            <span className="num">01</span>
            <span className="line" />
            <span>PHYSICAL INTELLIGENCE — DATASET CATALOGUE</span>
          </div>
          <h1>
            Robotics data, <span className="grad-text">captured in the real world.</span>
          </h1>
          <p className="sub">
            Egocentric video, teleoperation traces, tactile glove streams, and annotated
            manipulation data — collected by trained workers across residential, commercial,
            and industrial environments. Off-the-shelf packs ship today; custom collections
            are scoped to your embodiment.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Catalogue() {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = DATASETS.filter((d) => filter === "All" || d.category === filter);

  return (
    <section className="tight-section">
      <div className="revamp-container">
        <div className="ds-filters" role="tablist" aria-label="Dataset categories">
          {FILTERS.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              className={`ds-filter${filter === f ? " active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
              <span className="count">
                {f === "All" ? DATASETS.length : DATASETS.filter((d) => d.category === f).length}
              </span>
            </button>
          ))}
        </div>
        <motion.div layout className="ds-grid">
          <AnimatePresence mode="popLayout">
            {visible.map((d) => (
              <motion.article
                layout
                key={d.code}
                className="ds-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <div className="ds-preview" data-cat={CATEGORY_GLYPHS[d.category]}>
                  <span className="ds-code">{d.code}</span>
                  <span className="ds-glyph">{CATEGORY_GLYPHS[d.category]}</span>
                  {d.customCollection && <span className="ds-flag">CUSTOM COLLECTION</span>}
                </div>
                <div className="ds-body">
                  <h3>{d.title}</h3>
                  <div className="ds-badges">
                    <span>{d.setting}</span>
                    <span>{d.geography}</span>
                    {d.imu && <span className="imu">IMU</span>}
                  </div>
                  <dl className="ds-specs">
                    <div>
                      <dt>Workers</dt>
                      <dd>{d.workers}</dd>
                    </div>
                    <div>
                      <dt>Videos</dt>
                      <dd>{d.videos}</dd>
                    </div>
                    <div>
                      <dt>OTS hours</dt>
                      <dd>{d.otsHours}</dd>
                    </div>
                    <div>
                      <dt>Capture</dt>
                      <dd>{d.camera}</dd>
                    </div>
                  </dl>
                  <div className="ds-meta">
                    {d.resolution} &middot; 30/60 fps &middot; H.264/H.265
                  </div>
                  {d.note && <p className="ds-note">{d.note}</p>}
                  <a
                    className="btn btn-ghost btn-sm ds-sample"
                    href={d.sampleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View sample
                    <svg className="arr" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H8M17 7v9" />
                    </svg>
                  </a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
        <p className="ds-footnote">
          Streaming previews are compressed by Drive — download samples for full fidelity.
          North America collections are opening soon.
        </p>
      </div>
    </section>
  );
}

const METHOD_POINTS = [
  {
    t: "Trained collection network",
    d: "Every contributor is onboarded, briefed per taxonomy, and monitored for capture quality across households, shops, and factory floors.",
  },
  {
    t: "Verified at every step",
    d: "Multi-stage QA on framing, lighting, task completion, and metadata before a single clip enters a delivery batch.",
  },
  {
    t: "Consented & anonymized",
    d: "All footage is collected with informed consent, PII-scrubbed, and referenced by anonymized codes end to end.",
  },
] as const;

function MethodStrip() {
  return (
    <section className="tight-section">
      <div className="revamp-container">
        <div className="eyebrow">
          <span className="num">02</span>
          <span className="line" />
          <span>HOW IT&apos;S BUILT</span>
        </div>
        <div className="ds-method">
          {METHOD_POINTS.map((p) => (
            <motion.div
              key={p.t}
              className="ds-method-card"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "0px 0px -40px 0px" }}
            >
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DatasetsCta() {
  return (
    <section className="tight-section">
      <div className="revamp-container ds-cta">
        <h2>
          Need a different embodiment, <span className="grad-text">geography, or sensor rig?</span>
        </h2>
        <p className="sub">
          We scope custom collections — stereo rigs, tactile gloves, IMU-fused capture, task
          taxonomies of your choice — and deliver first samples within days.
        </p>
        <a href="/contact" className="btn btn-primary">
          Request a custom collection
          <svg className="arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </section>
  );
}
