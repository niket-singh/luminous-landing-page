/**
 * Editorial content. Posts are unpublished — no URLs or dates exist yet, so
 * cards render unlinked with a "Coming soon" marker rather than shipping dead
 * links or invented publication dates. Add `href` and `meta` to a post and it
 * becomes a live, clickable card with no other change required.
 */

export interface Post {
  title: string;
  description: string;
  kicker: string;
  href?: string;
  meta?: string;
  image?: string;
  imageAlt?: string;
}

/** Featured on the homepage research band. */
export const FEATURED_POSTS: readonly Post[] = [
  {
    title: "How We Improved Model Reliability Through Expert Evaluation",
    description:
      "How evaluation signal from domain specialists improved deployment reliability — and what it says about training models.",
    kicker: "Blog",
    image: "/post-1.jpg",
    imageAlt: "A printed page covered in handwritten correction marks",
  },
  {
    title: "Human expertise, reimagined",
    description:
      "Capturing how experts evaluate — turning real-world judgment into infrastructure models can rely on.",
    kicker: "Blog",
    image: "/post-2.jpg",
    imageAlt: "A hand annotating a printed page under hard directional light",
  },
  {
    title: "Building the Infrastructure for Reliable AI",
    description:
      "Encoding domain-specific evaluation into forms machines can learn — so deployments work like real-world experts expect.",
    kicker: "Blog",
    image: "/post-3.jpg",
    imageAlt: "Rows of server racks receding down a narrow aisle",
  },
];

/** Full index on /research. */
export const ALL_POSTS: readonly Post[] = [
  ...FEATURED_POSTS,
  {
    title: "Solving the Deployment Problem",
    description:
      "Where production models break down between benchmark performance and real professional use.",
    kicker: "Blog",
    image: "/post-4.jpg",
    imageAlt: "A close-up of a control panel covered in switches and dials",
  },
  {
    title: "The Adzzat Thesis",
    description:
      "Why model performance is bounded by evaluation quality, and what follows from taking that seriously.",
    kicker: "Blog",
    image: "/post-5.jpg",
    imageAlt: "A single empty desk and chair in a bare, brightly lit room",
  },
  {
    title: "How Expert Evaluation Drives Model Performance",
    description:
      "The measurable link between domain-expert judgment and downstream model reliability.",
    kicker: "Blog",
    image: "/post-6.jpg",
    imageAlt: "Offset sheets of annotated paper under raking light",
  },
];

export const RESEARCH_AREAS = [
  {
    title: "Intelligent Routing",
    description:
      "Research into dynamic model selection, cost optimization, and quality-aware deployment.",
  },
  {
    title: "Human Evaluation",
    description:
      "Research into capturing domain expertise at scale and transforming judgment into training signal.",
  },
  {
    title: "AI Safety & Reliability",
    description:
      "Research into failure mode detection, robustness evaluation, and deployment safety.",
  },
  {
    title: "Data Quality & Curation",
    description:
      "Research into expert sourcing, quality verification, and dataset construction.",
  },
] as const;
