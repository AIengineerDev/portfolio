export type Metric = {
  label: string;
  value: string;
  detail?: string;
};

export type Section = {
  heading: string;
  body: string[];
};

export type SpecRow = {
  label: string;
  value: string;
};

/** One point on the communication-dropout robustness chart. */
export type DropoutPoint = {
  dropout: number;
  happo: number;
  antColony: number;
  lawnmower: number;
};

export type Gallery = {
  src: string;
  alt: string;
  caption: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  role: string;
  status: "shipped" | "in-progress" | "research";
  domain: string;
  summary: string;
  accent: [string, string];
  cover?: Gallery;
  stack: string[];
  metrics: Metric[];
  sections: Section[];
  specs?: SpecRow[];
  dropout?: DropoutPoint[];
  gallery?: Gallery[];
  team?: string[];
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "omnisearch",
    title: "OmniSearch",
    tagline:
      "A simulation platform for testing coordinated drone and ground-robot swarms in wildfire search-and-rescue.",
    year: "2026",
    role: "UC Berkeley MIDS Capstone · Simulation & MARL",
    status: "shipped",
    domain: "Multi-Agent Reinforcement Learning",
    accent: ["#ff7a2f", "#35e0d0"],
    cover: {
      src: "/projects/omnisearch-viewer.png",
      alt: "OmniSearch 3D strategy viewer: drones and ground robots searching burning terrain",
      caption:
        "The browser trajectory viewer — 4 UAVs, 3 UGVs, 10 survivors on 1 km² of real Malibu Creek terrain.",
    },
    summary:
      "Wildfire search-and-rescue teams cannot afford to discover coordination failures in the field. OmniSearch pairs a physically scaled wildfire simulator with heterogeneous multi-agent RL so drone + ground-robot deployments can be designed, stress-tested, and tuned before anyone flies.",
    stack: [
      "Python",
      "PyTorch",
      "VMAS",
      "HARL / HAPPO",
      "MAPPO",
      "IPPO",
      "YOLOv8",
      "OpenCV",
      "USGS Terrain",
      "OpenStreetMap",
      "Three.js",
    ],
    team: ["Ann-Kathrin Schuetz", "Jefferson-Stanley Jules", "Oleksii Lavrenin"],
    metrics: [
      {
        label: "Mission success",
        value: "80%",
        detail: "vs. 72% ant-colony and 68% lawnmower, 100 seeds each",
      },
      {
        label: "Time to confirm a survivor",
        value: "10.1 min",
        detail: "down from 11.8 min — roughly 10% faster",
      },
      {
        label: "Comms loss tolerated",
        value: "90%",
        detail: "policies stay functional under near-total dropout",
      },
      {
        label: "Cost avoided",
        value: "~$200k",
        detail: "per multi-day ground search that never has to happen",
      },
    ],
    specs: [
      { label: "Search area", value: "1 km² of real terrain (Malibu Creek)" },
      { label: "Fleet", value: "4 UAVs · 3 UGVs · 5–10 survivors" },
      { label: "Raster grid", value: "256 × 256 (≈3.9 m cells)" },
      { label: "Episode", value: "900 steps @ 2 s = 30 min simulated" },
      { label: "Evaluation", value: "100 held-out seeds per configuration" },
      { label: "Perception", value: "RGB + thermal stack, altitude-conditioned" },
    ],
    dropout: [
      { dropout: 0, happo: 80, antColony: 72, lawnmower: 68 },
      { dropout: 30, happo: 82, antColony: 58, lawnmower: 62 },
      { dropout: 50, happo: 76, antColony: 57, lawnmower: 67 },
      { dropout: 70, happo: 76, antColony: 59, lawnmower: 56 },
      { dropout: 90, happo: 50, antColony: 53, lawnmower: 58 },
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "Wildfires claim hundreds of lives every year, and the link between air and ground assets falls apart exactly when conditions get worst — smoke, heat, terrain, and radio dropout all peak at the same moment.",
          "Existing simulators do not model realistic terrain, fire dynamics, and rescue mission parameters together. That pushes robotics companies into expensive field trials, where a coordination failure is not a failed test run — it is a life at risk.",
        ],
      },
      {
        heading: "The simulator",
        body: [
          "OmniSearch is a 2.5D mission simulator built on VMAS. Robots move continuously in the plane; fire, smoke, land cover, elevation, slope, fuel, and inspection confidence live on raster layers; UAV altitude is tracked as an above-ground scalar with a terrain-following controller.",
          "Terrain comes from cached USGS elevation and OpenStreetMap features, and every quantity is expressed in physical units — meters, meters per second, minutes — so results map onto real hardware envelopes instead of arbitrary grid steps.",
          "It is deliberately not a digital twin. The goal is to preserve the mission-relevant structure of wildfire SAR while staying fast enough to actually train on.",
        ],
      },
      {
        heading: "Learned coordination",
        body: [
          "UAVs scout from above; UGVs traverse terrain to confirm on the ground. The research question is whether a learned policy can manage that handoff better than a strong hand-written strategy.",
          "Training uses HAPPO, where each agent type learns its own policy with sequential trust-region updates rather than sharing one homogeneous network. Aerial agents optimize for coverage and detection probability; ground agents optimize for reachability and confirmation. MAPPO and IPPO are kept as controlled comparisons.",
          "Perception during training is a probabilistic detection model — the chance a survivor at a given location would be seen, conditioned on altitude, camera footprint, range, land cover, smoke, and fire. The same probability drives both survivor scouting and the confidence map, so a policy is rewarded for real expected information gain rather than for touching new cells.",
          "Baselines are not strawmen: lawnmower, ant-colony, highest-confidence targeting, and random walk, each with a matched planner-aware ground controller.",
        ],
      },
      {
        heading: "What we found",
        body: [
          "Learned heterogeneous coordination beat every scripted baseline — 80% full-confirmation success against 72% for ant-colony and 68% for lawnmower over 100 held-out seeds, with survivors confirmed roughly 10% faster.",
          "The more interesting result was robustness. The scripted baselines lose ~14 points of success the moment communication becomes unreliable at all; the trained policy holds near its ceiling through 70% dropout and only degrades at 90%. Each role had learned behavior that stays coherent without a live picture of its teammates.",
          "The learned advantage is in the handoff, not in raw coverage — lawnmower achieves 100% area coverage and still loses, because covering ground is not the same as getting a ground robot to the right person in time.",
        ],
      },
      {
        heading: "Perception, validated on real imagery",
        body: [
          "The detection stack was trained on synthetic composites and then evaluated against real datasets rather than only its own validation split — HERIDAL aerial SAR imagery, HIT-UAV thermal, and ground-level footage from Malibu.",
          "On HERIDAL the fine-tuned detector reaches 0.86 recall at 0.50 precision, and the small-target breakdown is reported honestly by pixel bucket: survivors under 8 px are where recall falls off, which is exactly the regime that sets a usable flight altitude.",
        ],
      },
      {
        heading: "Ethics and scope",
        body: [
          "The reward function treats all survivors equally, with no demographic weighting. The detection model recognizes presence only — it does not identify or track individuals, and it is trained on synthetic imagery.",
          "OmniSearch is advisory. Incident commanders retain decision authority; the platform's job is to make failure modes visible in simulation, not to direct a live response.",
        ],
      },
    ],
    gallery: [
      {
        src: "/projects/omnisearch-architecture.png",
        alt: "OmniSearch system architecture diagram",
        caption:
          "System architecture: terrain and fire layers feed the VMAS scenario, which feeds perception, policies, and the evaluation harness.",
      },
    ],
    links: [
      {
        label: "UC Berkeley I School project page",
        href: "https://www.ischool.berkeley.edu/programs/mids/capstone/2026b-summer/omnisearch-simulation-platform-test-coordinated-drone-and",
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
