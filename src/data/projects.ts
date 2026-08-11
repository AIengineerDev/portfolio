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
  /** Intrinsic pixel size. Defaults suit a 4:3 screenshot. */
  width?: number;
  height?: number;
};

/** One horizontal tier of the system-architecture diagram. */
export type ArchTier = {
  label: string;
  accent: string;
  blocks: { title: string; items: string[] }[];
};

export type Architecture = {
  caption: string;
  tiers: ArchTier[];
};

/** A plain results table. `highlight` bolds a column index. */
export type ResultsTable = {
  heading: string;
  caption?: string;
  columns: string[];
  rows: string[][];
  highlight?: number;
  footnote?: string;
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
  specsHeading?: string;
  dropout?: DropoutPoint[];
  architecture?: Architecture;
  tables?: ResultsTable[];
  gallery?: Gallery[];
  team?: string[];
  links?: { label: string; href: string }[];
};

const omniSearch: Project = {
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
      "BenchMARL",
      "MAPPO",
      "IPPO",
      "DAgger",
      "YOLOv8",
      "OpenCV",
      "USGS 3DEP",
      "OpenStreetMap",
      "LANDFIRE",
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
    architecture: {
      caption:
        "Real terrain feeds a 12,600-line MARL simulator; rollouts are scored through a calibrated perception model.",
      tiers: [
        {
          label: "Data sources",
          accent: "#35e0d0",
          blocks: [
            { title: "USGS 3DEP", items: ["elevation", "slope", "altitude"] },
            { title: "OpenStreetMap", items: ["roads", "water", "buildings"] },
            { title: "LANDFIRE", items: ["fuel model", "canopy cover"] },
          ],
        },
        {
          label: "Simulation platform — VMAS WildfireSearchScenario",
          accent: "#ff7a2f",
          blocks: [
            {
              title: "Simulation core",
              items: [
                "Cellular-automata fire + smoke",
                "6 land-cover types",
                "128² / 256² grid",
                "1 km², calibrated m/s, 2 s step",
                "3–4 UAVs (10 m/s, 20–50 m AGL)",
                "2–3 UGVs (1.6 m/s, terrain cost)",
              ],
            },
            {
              title: "Coordination (MARL)",
              items: [
                "HAPPO (HARL) — primary",
                "BC warm-start + RL fine-tune",
                "DAgger imitation learning",
                "MAPPO / IPPO (BenchMARL)",
                "6 hand-coded baselines",
                "Centralized critic, dec. execution",
              ],
            },
            {
              title: "Perception model",
              items: [
                "Probabilistic detection proxy",
                "Altitude-dependent footprint",
                "Smoke attenuation (Beer–Lambert)",
                "RGB + thermal fusion",
                "Per-agent comms dropout (0–80%)",
                "Decoy false-positive landmarks",
              ],
            },
          ],
        },
        {
          label: "Evaluation & output",
          accent: "#8b6bff",
          blocks: [
            {
              title: "6 mission metrics",
              items: ["recall", "verification time", "FP trips", "hazard", "travel cost", "DRR"],
            },
            {
              title: "Experiment harness",
              items: ["3 algos × 4 dropouts × N seeds", "Mann–Whitney U", "510-run EDA"],
            },
            {
              title: "Three.js 3D viewer",
              items: ["trajectory replay", "per-agent comms", "strategy comparison"],
            },
          ],
        },
      ],
    },
    links: [
      {
        label: "UC Berkeley I School project page",
        href: "https://www.ischool.berkeley.edu/programs/mids/capstone/2026b-summer/omnisearch-simulation-platform-test-coordinated-drone-and",
      },
    ],
};

const careerProjection: Project = {
  slug: "career-projection",
  title: "Career Projection",
  tagline:
    "Predicting whether a high-school athlete reaches the next level — across eight sports, with the model's own limits shipped alongside its numbers.",
  year: "2026",
  role: "uSport.ai · ML design, pipelines, validation",
  status: "shipped",
  domain: "Applied ML · Sports Analytics",
  accent: ["#a488ff", "#4ce9d9"],
  summary:
    "Recruiting runs on confident guesses about teenagers. Career Projection replaces some of that with measured probability: given a high-school athlete's box scores, recruiting overlays, and profile signals, how likely are they to reach a D1 roster, or a professional league? It ships across eight sports — and it is built so that a coach reading a percentage can also read exactly how much to trust it.",
  stack: [
    "Python",
    "scikit-learn",
    "Gradient boosting",
    "Logistic regression",
    "Pandas / NumPy",
    "Neo4j",
    "Next.js",
    "TypeScript",
    "Playwright / Scrapy",
  ],
  metrics: [
    { label: "Sports in production", value: "8", detail: "basketball through beach volleyball" },
    {
      label: "Athletes in the training set",
      value: "30.5K",
      detail: "lacrosse HS→D1 alone; 18.3K D1 / 12.3K non-D1",
    },
    {
      label: "Top-200 precision",
      value: "99.5%",
      detail: "temporal holdout, 1.64× the 60.8% base rate",
    },
    {
      label: "Calibration error",
      value: "0.6 pp",
      detail: "HS→Pro men — displayed percentages mean what they say",
    },
  ],
  specs: [
    { label: "Sports", value: "Basketball, lacrosse, football, soccer, tennis, golf, volleyball, beach VB" },
    { label: "Prediction tasks", value: "HS→D1, HS→Pro, College→Pro, career longevity" },
    { label: "Model shape", value: "Pipeline(median impute → scale → LogReg | GBM)" },
    { label: "Validation", value: "5-fold stratified CV + forward-in-time temporal holdout" },
    { label: "Calibration", value: "10-bucket out-of-fold ECE, reported per model" },
    { label: "Serving", value: "LogReg coefficients exported to JSON, scored in-browser" },
  ],
  sections: [
    {
      heading: "The problem",
      body: [
        "A recruiting platform that tells a family their child has a 90% chance of playing Division I has made a promise. If that number is decorative — if it came from a model validated by shuffling rows at random — the promise is worthless and the family cannot tell.",
        "So the interesting engineering problem was never 'train a classifier'. It was: produce a probability a coach can act on, and make the uncertainty as visible as the estimate.",
      ],
    },
    {
      heading: "Eight pipelines, one shape",
      body: [
        "Each sport gets its own pipeline — scrape, ETL into the Neo4j graph, feature build, train, export — but they all share a structure: a scikit-learn pipeline of median imputation, scaling, and either logistic regression or gradient boosting, with features defined once in a module shared by trainer and scorer so the two cannot drift apart.",
        "Basketball alone carries six distinct prediction problems: HS→D1 for men and women, HS→NBA, HS→WNBA, College→NBA/WNBA, and a regression for NBA career length. Features combine box scores from MaxPreps with recruiting overlays — McDonald's All-American, ESPN-100, 247Sports, On3 consensus — all sourced before the moment of prediction so there is no temporal leakage.",
        "Lacrosse pulls from a different signal set entirely: 30,585 committed athletes with ranking, star rating, profile completeness, Hudl engagement, position, and state, exported nightly from the recruiting graph.",
      ],
    },
    {
      heading: "Where the honest number came from",
      body: [
        "Random k-fold cross-validation is the wrong tool here. Shuffling athletes across graduating classes lets the model learn from cohorts that, in production, have not happened yet. It reliably reports a number better than the one you will get.",
        "So every sport with a class year gets a forward-in-time split: train on athletes graduating on or before a cutoff, test on everyone after. The drift is not small. Lacrosse HS→Pro for men scored 0.869 ROC-AUC under random folds and 0.706 under temporal holdout — a 16-point drop, and the 0.706 is what the product displays.",
        "For basketball the back-test harness ships but the labelled scrape data is not committed, so on a fresh clone it reports the missing files and exits rather than writing fabricated numbers. The interface reports random-fold AUC and the documentation says plainly that it is doing so.",
      ],
    },
    {
      heading: "Ranking well is not the same as being right",
      body: [
        "ROC-AUC measures whether the model orders athletes correctly. It says nothing about whether '80%' means eighty percent. Those come apart badly in practice, so every model also reports 10-bucket out-of-fold Expected Calibration Error.",
        "The men's HS→Pro model originally trained with balanced class weights and scored 24 percentage points of calibration error — predicting above 90% where the real rate was 5%. Class balancing optimizes ranking as though the positive class were half the population; it is fine for sorting and it lies about probability. Retrained without balancing, ECE came down to 0.6 pp at a 1.7% base rate. That is the version that shipped.",
        "Ranking quality survives where it matters most: in the temporal test cohort of 18,755 athletes at a 60.8% base rate, the model's top 200 predictions were 199 correct — 99.5% precision, 1.64× lift. The top of the list is genuinely elite; the middle is approximate, and the interface says so.",
      ],
    },
    {
      heading: "Caveats as a shipped artifact",
      body: [
        "Every metrics file carries a `caveat` field written against that specific model's weakness, and the interface renders it verbatim next to the number rather than in documentation nobody opens.",
        "The sharpest one belongs to the best-looking result. College→NBA scores 0.91 AUC, but its negatives are random NCAA players rather than quality-matched prospects — so the model is mostly proving that NBA players outproduced the average college athlete, not that it can separate good players who make it from good players who don't. The caveat says exactly that. A 0.91 with no context would have been the most misleading number in the system.",
        "Others are simply honest about scale: HS→D1 for men has only 65 negative examples against 705 positives, which makes its confidence intervals wide and its ceiling artificial until more D2/D3/NAIA rosters are scraped.",
      ],
    },
    {
      heading: "Serving it",
      body: [
        "Logistic-regression coefficients are exported to JSON so the calculator scores new inputs directly in the browser — no model server, no cold start, instant feedback as an athlete edits their profile. Gradient-boosted models stay server-side for batch scoring of full cohorts.",
        "The class-2027 cohort pulled from the graph is 75,336 boys' basketball athletes, of whom 40 were committed at the time of the pull — which is a useful reminder of what the base rate actually looks like at the top of the funnel.",
      ],
    },
  ],
  tables: [
    {
      heading: "Random folds vs. forward-in-time holdout",
      caption:
        "Lacrosse, the sport where the temporal back-test has real measured numbers. The right column is what the product reports.",
      columns: ["Model", "Random CV (GBM)", "Temporal (GBM)", "Drift"],
      rows: [
        ["HS → D1", "0.653", "0.609", "−4.4 pp"],
        ["HS → Pro (men)", "0.869", "0.706", "−16.3 pp"],
      ],
      highlight: 2,
      footnote:
        "ROC-AUC. Train on class ≤ cutoff, test on every class after it — the split production actually faces.",
    },
    {
      heading: "Calibration — out-of-fold ECE",
      caption:
        "Whether a displayed percentage means what it claims, measured across 10 probability buckets.",
      columns: ["Model", "OOF ROC-AUC", "ECE", "Reading"],
      rows: [
        ["HS → D1 (GBM)", "0.651", "8.9 pp", "Top decile reliable, middle approximate"],
        ["HS → Pro men (GBM)", "0.877", "0.6 pp", "Essentially honest at a 1.7% base rate"],
        ["HS → Pro women (GBM)", "0.702", "0.2 pp", "Essentially honest at a 0.4% base rate"],
      ],
      highlight: 2,
    },
  ],
  architecture: {
    caption:
      "One shape per sport: scrape and resolve, train and validate, then export for scoring.",
    tiers: [
      {
        label: "Sources",
        accent: "#4ce9d9",
        blocks: [
          {
            title: "Performance data",
            items: [
              "MaxPreps HS box scores",
              "Basketball-Reference NCAA + NBA",
              "Sports-Reference cbb",
              "SIDEARM D2/D3 rosters",
            ],
          },
          {
            title: "Recruiting overlays",
            items: [
              "247Sports rankings",
              "On3 consensus",
              "ESPN-100",
              "McDonald's All-American",
            ],
          },
          {
            title: "Platform graph",
            items: [
              "Neo4j athlete + commitment nodes",
              "Nightly recruiting export",
              "Hudl engagement signals",
              "Profile completeness",
            ],
          },
        ],
      },
      {
        label: "Modeling — eight sport pipelines",
        accent: "#a488ff",
        blocks: [
          {
            title: "Tasks",
            items: [
              "HS → D1 (men & women)",
              "HS → Pro / NBA / WNBA",
              "College → Pro",
              "Career-longevity regression",
            ],
          },
          {
            title: "Pipeline",
            items: [
              "Median imputation (sparse HS stats)",
              "StandardScaler for logreg",
              "LogisticRegression + GBM, compared",
              "Features shared trainer ↔ scorer",
            ],
          },
          {
            title: "Leakage control",
            items: [
              "Overlays predate the prediction moment",
              "Games-played excluded (season-length artifact)",
              "Era-asymmetric stats dropped",
              "Exclusion list recorded in metrics JSON",
            ],
          },
        ],
      },
      {
        label: "Validation & serving",
        accent: "#ff8a42",
        blocks: [
          {
            title: "Measured",
            items: [
              "5-fold stratified CV",
              "Forward-in-time temporal holdout",
              "10-bucket out-of-fold ECE",
              "Top-N hit tables",
            ],
          },
          {
            title: "Published",
            items: [
              "Per-model caveat field",
              "Confusion matrices at 0.5",
              "Metrics JSON committed",
              "UI renders caveats verbatim",
            ],
          },
          {
            title: "Served",
            items: [
              "LogReg coefficients → JSON",
              "Scored in-browser, no model server",
              "GBM batch scoring server-side",
              "Cohort projections into the app",
            ],
          },
        ],
      },
    ],
  },
};

const onpace: Project = {
  slug: "onpace",
  title: "Onpace",
  tagline:
    "A swim-coaching iOS app where AI writes training plans out of a knowledge graph — and is never allowed to overrule the coach.",
  year: "2026",
  role: "Solo — product, mobile, backend, ML",
  status: "shipped",
  domain: "Mobile · Applied LLM",
  accent: ["#4aa8ff", "#4ce9d9"],
  summary:
    "Onpace is a swim training app on the iOS App Store: swimmers get structured plans and video technique review, coaches get a roster and an assistant that drafts work for them to edit. The interesting constraint is architectural — every generative feature is scoped so the model proposes and the coach disposes. Built and shipped solo, from the Cypher queries to the App Store listing.",
  stack: [
    "React Native",
    "Expo 54",
    "TypeScript",
    "Firebase Auth",
    "Firestore",
    "Cloud Functions",
    "Claude Sonnet",
    "Neo4j Aura",
    "Vector RAG",
    "RevenueCat",
    "Stripe",
    "EAS Build",
  ],
  metrics: [
    {
      label: "On the App Store",
      value: "v1.0.4",
      detail: "Health & Fitness — free, with an Onpace Pro subscription",
    },
    {
      label: "100 m pace, six weeks",
      value: "−7 s",
      detail: "1:45 → 1:38, swimmer-reported in a review",
    },
    {
      label: "Beginner to continuous",
      value: "400 m",
      detail: "from not managing a single length, swimmer-reported",
    },
    {
      label: "Plan generation",
      value: "Hybrid RAG",
      detail: "graph retrieval plus vector search over swim research",
    },
  ],
  specsHeading: "Technical setup",
  specs: [
    { label: "Client", value: "React Native / Expo 54, TypeScript, iOS" },
    { label: "Data", value: "Firestore with onSnapshot subscriptions, role-scoped" },
    { label: "Generation", value: "Callable Cloud Function, Claude Sonnet" },
    { label: "Retrieval", value: "Neo4j Aura swim graph + text-embedding-3-small (1536-d)" },
    { label: "Billing", value: "RevenueCat web checkout, Stripe-backed" },
    { label: "Auth", value: "Email/password, Google OAuth, passwordless magic link" },
  ],
  sections: [
    {
      heading: "The product",
      body: [
        "A swimmer signs up, completes onboarding — level, goals, sessions per week, pool length, available equipment, weekly mileage, physical limitations — and waits on a plan. A coach sees them arrive in a roster, generates a draft plan, edits it, and assigns it. From there the swimmer gets a daily workout, logs RPE and mood on completion, tracks progress, and can send technique video for review.",
        "Both sides of that are one Expo app with a role-aware navigator. Firestore is the single source of truth, subscribed through onSnapshot so a coach's edit appears on the swimmer's phone without a refresh, and scoped by role — coaches subscribe to their whole roster, swimmers only to their own documents.",
      ],
    },
    {
      heading: "Plans come out of a knowledge graph, not a blank prompt",
      body: [
        "Plan generation runs server-side in a callable Cloud Function, so the Anthropic key and the Neo4j credentials never reach a phone. The model is Claude Sonnet, but the interesting part is what it is given to work with.",
        "Retrieval is hybrid. A Neo4j Aura swim knowledge graph supplies real drills — execution descriptions, coaching cues, required equipment, skill levels — matched to the athlete's actual constraints. On top of that, vector search over reference plans and swim-research passages, embedded with text-embedding-3-small at 1536 dimensions, pulls in relevant precedent. The model composes from retrieved material rather than inventing sets from its own priors.",
        "The Cypher queries and prompts are shared verbatim with the uSport.ai web product, so a plan generated on the phone is identical to one generated on the web. The vector half degrades gracefully: without an embeddings key those two queries no-op and graph retrieval still carries the generation.",
      ],
    },
    {
      heading: "Giving the model a memory so it stops repeating itself",
      body: [
        "A language model generating a training plan has no idea what it produced for the same athlete last week. Left alone it converges — similar sets, similar distances, the same drills in a slightly different order. For a swimmer following a plan for months, that is the difference between coaching and a random set generator.",
        "So each athlete carries a short rolling history in Firestore. The four most recent generated sessions go back into the prompt as explicit context, and the three newest are persisted for next time. The model can see its own output and is asked to move away from it. Small mechanism, and it is the difference between a plan that progresses and one that loops.",
      ],
    },
    {
      heading: "The model proposes, the coach disposes",
      body: [
        "Every generative surface in the app is deliberately bounded, because a swim plan is a physical prescription and a wrong one injures a shoulder.",
        "AI-generated plans arrive as drafts, tagged as drafts, into a coach's editor — never straight to a swimmer. The in-app workout adjustment cannot author a workout at all: given 'I only have 30 minutes' it modifies the coach's existing session, preserving its focus, its plan, and its authorship, and it honors safety constraints — a swimmer reporting shoulder pain gets paddles dropped and intensity downgraded rather than a cheerful substitution.",
        "The video review tool follows the same rule in a stronger form: it never grades the swimmer. The coach narrates while watching the clip, and the tool turns their own words into timestamped marks against a closed vocabulary of stroke faults — crossover, dropped elbow, hip drop, late breakout — each with an editable cue. The coach accepts or rewrites every mark. The app structures the coach's judgment; it does not substitute for it.",
        "That last feature currently ships as a deterministic keyword-and-sentiment extractor rather than a live speech-to-text and LLM pipeline. It works offline, it is predictable, and the taxonomy it emits is the same one the model path will emit — so the upgrade is a swap, not a redesign.",
      ],
    },
    {
      heading: "Shipping it alone",
      body: [
        "Everything between the idea and the App Store listing was mine: the Expo client and its EAS builds, Firestore rules and indexes, roughly twenty Cloud Functions covering plan generation, PDF export, invites, email verification, and subscription webhooks, plus the App Store submission itself.",
        "Billing goes through RevenueCat web checkout over Stripe, with two surfaces chosen automatically — the native SDK paywall in a real build, and a hosted paywall link as fallback where the native module cannot load. Authentication offers email and password, Google OAuth, and passwordless magic links.",
        "The reviews are what a coaching product is actually judged on: one swimmer took a 100 m pace from 1:45 to 1:38 in six weeks; another went from being unable to complete a single length to swimming 400 m continuously.",
      ],
    },
  ],
  architecture: {
    caption:
      "The client never sees a credential and never receives an unreviewed plan — generation and retrieval both live server-side.",
    tiers: [
      {
        label: "Client — Expo / React Native",
        accent: "#4aa8ff",
        blocks: [
          {
            title: "Swimmer",
            items: [
              "6-step onboarding",
              "Daily workout + RPE/mood log",
              "Progress and streaks",
              "Technique video upload",
            ],
          },
          {
            title: "Coach",
            items: [
              "Roster and pending members",
              "Plan editor with AI draft",
              "Narrated video review",
              "Inbox and session booking",
            ],
          },
          {
            title: "Shared",
            items: [
              "Role-aware navigator",
              "Firestore onSnapshot state",
              "Role-scoped subscriptions",
              "RevenueCat paywall",
            ],
          },
        ],
      },
      {
        label: "Generation — callable Cloud Function",
        accent: "#4ce9d9",
        blocks: [
          {
            title: "Model",
            items: [
              "Claude Sonnet",
              "Prompts shared with the web product",
              "Draft output only, never assigned",
              "Safety constraints honored",
            ],
          },
          {
            title: "Retrieval",
            items: [
              "Neo4j swim knowledge graph",
              "Drills matched to equipment & level",
              "Vector search over research",
              "text-embedding-3-small, 1536-d",
            ],
          },
          {
            title: "Anti-repetition",
            items: [
              "Rolling per-athlete history",
              "4 recent sessions into the prompt",
              "3 newest persisted forward",
              "Model sees its own prior output",
            ],
          },
        ],
      },
      {
        label: "Platform",
        accent: "#a488ff",
        blocks: [
          {
            title: "Firebase",
            items: [
              "Auth: password, Google, magic link",
              "Firestore rules + indexes",
              "Storage for video clips",
              "~20 Cloud Functions",
            ],
          },
          {
            title: "Commerce",
            items: [
              "RevenueCat web checkout",
              "Stripe-backed subscriptions",
              "Entitlement webhooks",
              "Billing portal",
            ],
          },
          {
            title: "Release",
            items: [
              "EAS Build",
              "App Store submission",
              "Bundle ai.usport.onpace",
              "Shipped v1.0.4",
            ],
          },
        ],
      },
    ],
  },
  links: [
    {
      label: "Onpace on the App Store",
      href: "https://apps.apple.com/us/app/onpace-swim-training/id6782388637",
    },
  ],
};

const twoTowers: Project = {
  slug: "two-tower-retrieval",
  title: "Two-Tower Retrieval",
  tagline:
    "Bidirectional coach–athlete matching for college swimming recruiting, built on a knowledge graph and contrastive fine-tuning.",
  year: "2026",
  role: "UC Berkeley DATASCI 266 — NLP with Deep Learning",
  status: "research",
  domain: "NLP · Dense Retrieval",
  accent: ["#4ce9d9", "#a488ff"],
  summary:
    "College recruiting is a matching problem disguised as an inbox problem. Athletes email hundreds of coaches who run programs that do not fit them; coaches read thousands of profiles to find a handful of viable recruits. This project encodes both sides into one embedding space so the search runs in either direction — and tests what actually drives retrieval quality: contrastive fine-tuning with hard negatives, or LLM normalization of the inputs.",
  stack: [
    "Python",
    "PyTorch",
    "sentence-transformers",
    "BGE-large-en-v1.5",
    "T5-small",
    "Neo4j",
    "scikit-learn",
    "Hugging Face",
    "Jupyter",
  ],
  metrics: [
    {
      label: "Forward MRR",
      value: "0.909",
      detail: "up from 0.304 pre-trained — swimmer → coach",
    },
    { label: "Top-1 hit rate", value: "83.6%", detail: "184 of 220 held-out swimmers, perfect MRR" },
    { label: "Reverse MRR gain", value: "4.5×", detail: "0.045 → 0.202 — the harder direction" },
    { label: "Knowledge graph", value: "150K", detail: "swimmer profiles, 19,369 coaches, 295 benchmarks" },
  ],
  specsHeading: "Experimental setup",
  specs: [
    { label: "Encoder", value: "BAAI/bge-large-en-v1.5 — 1024-d, 512 tokens" },
    { label: "Loss", value: "MultipleNegativesRankingLoss, 3 epochs" },
    { label: "Training triplets", value: "1,196, built from train swimmers only" },
    { label: "Split", value: "70/30 by swimmer — 511 train / 220 test, disjoint" },
    { label: "Ground truth", value: "22,974 benchmark-derived pairs, 731 swimmers × 72 coaches" },
    { label: "Explanations", value: "T5-small, 6 training pairs, 2 held out" },
  ],
  sections: [
    {
      heading: "Why embeddings alone fail here",
      body: [
        "A swimmer profile reads “100 free 51.2, looking for D1.” A general-purpose NLP system does not know that is a 100-yard freestyle in 51.2 seconds, or that it implies a competitive tier. The vocabulary is compressed, numeric, and domain-specific in a way that pre-trained sentence embeddings simply do not encode.",
        "Worse, the relationships that decide a match — conference affiliation, division eligibility, event-specific time standards per school — are structural. They live in a graph, not in prose, and no amount of text similarity recovers them.",
        "So the system draws on a Neo4j subgraph from the uSport.ai platform: 150,000 synthetic swimmer profiles, 19,369 coaches, and 295 per-school event benchmarks across 39 schools and 28 events. A universal event normalizer reconciles the formats — “200 Butterfly” and “200 fly” resolve to the same event — and times are parsed to seconds so they can be compared numerically.",
      ],
    },
    {
      heading: "Ground truth from benchmarks, not from clicks",
      body: [
        "There is no click log for recruiting, so positives are constructed from competitive reality: a swimmer matches a coach if their best time in any event falls inside that school's competitive range — at or below the school's slowest benchmark, or within 5% of the median. That yields 22,974 positive pairs across 731 swimmers and 72 coaches.",
        "The same benchmarks generate the hard negatives, which is where the signal is. A random negative is a coach at a school that swims different events entirely — trivially separable. A hard negative is a coach whose school swims exactly the swimmer's events, but where the swimmer is not competitive. Same vocabulary, same domain, wrong answer.",
        "Splitting is by swimmer, 70/30, with a fixed seed: 511 train and 220 test, fully disjoint. Triplets come only from train swimmers, every metric is computed only on test swimmers, and no swimmer appears on both sides.",
      ],
    },
    {
      heading: "What the experiment was actually testing",
      body: [
        "Both towers share one encoder — BGE-large-en-v1.5, chosen off the MTEB leaderboard for top-10 English retrieval at a workable 1024 dimensions. One tower serializes the swimmer; the other serializes the coach enriched with their school's benchmarks. Cosine similarity at inference gives a ranked list in either direction.",
        "The experimental question was whether a decoder LLM normalizing both sides into semi-structured JSON before embedding beats embedding the text directly. This is a deliberate departure from HyDE and Query2Doc, which expand the query side; here both sides get normalized into one consistent schema.",
        "The answer: normalization helps, but it is not what matters. Contrastive fine-tuning lifted forward MRR from 0.304 to 0.883 — a 2.9× gain. Normalization on top of that added 0.026, reaching 0.909, with bootstrap confidence intervals that overlap the fine-tuned baseline. Trending, not conclusive. The fine-tuning is the whole story; the normalization is a rounding error dressed as a treatment.",
      ],
    },
    {
      heading: "The direction that did not work",
      body: [
        "Reverse retrieval — coach searching for swimmers — improved 4.5×, from 0.045 to 0.202 MRR, and 0.202 is still bad. Pre-trained P@1 was exactly zero.",
        "The reason is informational, not architectural: a coach profile is a name, a title, a school, and a team gender. There is very little distinctive text to embed. A swimmer profile carries events, times, a power index, and a bio. Symmetric architecture, deeply asymmetric information — and no amount of contrastive training manufactures signal that was never in the input.",
        "The one place normalization earned its keep was here: at P@10 the treatment reached 0.106 against the baseline's 0.085, suggesting cleaner representations help surface relevant swimmers further down the ranking even when the top of it stays noisy.",
      ],
    },
    {
      heading: "Where it breaks",
      body: [
        "Of 220 test swimmers, 184 — 83.6% — retrieve a correct coach at rank one. The failures are informative: swimmers with only a single relevant coach in the entire candidate set, and swimmers from underrepresented countries such as Estonia and Luxembourg, whose profiles sit outside the US-centric training distribution.",
        "Negative-pair rejection is honest about its own weakness. Fine-tuning widened the similarity gap between positives and negatives 5.7× — 0.015 to 0.086 — but AUC-ROC only reaches 0.633–0.666. That ceiling reflects the coarseness of the negative signal: two swimming profiles with zero event overlap still share a great deal of swimming language.",
        "The T5 explanation generator is labelled a proof of concept because it is one. Six hand-written training pairs, two held out, ROUGE around 0.53 on n=2 — illustrative and nothing more. It produces fluent, correctly grounded output (“Carleton College develops distance swimmers… your sprint freestyle times fit their team needs”) and it occasionally conflates stroke specializations. A production version needs hundreds of procedurally generated examples.",
      ],
    },
  ],
  tables: [
    {
      heading: "Forward retrieval — swimmer → coach",
      caption: "Held-out test set of 220 swimmers, disjoint from the 511 used for training.",
      columns: ["Approach", "P@1", "P@10", "MRR", "nDCG@10"],
      rows: [
        ["Baseline (pre-trained)", "0.173", "0.110", "0.304", "0.120"],
        ["Baseline (fine-tuned)", "0.836", "0.605", "0.883", "0.664"],
        ["Treatment (LLM-norm)", "0.873", "0.596", "0.909", "0.659"],
      ],
      highlight: 3,
      footnote:
        "Bootstrap 95% CI: treatment [0.872–0.940] overlaps fine-tuned baseline [0.846–0.918] — a trend, not a conclusive win.",
    },
    {
      heading: "Reverse retrieval — coach → swimmer",
      caption:
        "The same models, 72 held-out coaches. Everything improves; nothing gets good. Coach profiles carry too little distinctive text.",
      columns: ["Approach", "P@1", "P@10", "MRR"],
      rows: [
        ["Baseline (pre-trained)", "0.000", "0.007", "0.045"],
        ["Baseline (fine-tuned)", "0.083", "0.085", "0.202"],
        ["Treatment (LLM-norm)", "0.069", "0.106", "0.203"],
      ],
      highlight: 3,
    },
    {
      heading: "Negative-pair rejection",
      caption:
        "Can the model tell a genuine mismatch from a match? Separation improves 5.7×, but the ceiling is low.",
      columns: ["Approach", "Positive sim", "Negative sim", "Separation", "AUC-ROC"],
      rows: [
        ["Pre-trained", "0.552", "0.537", "0.015", "0.633"],
        ["Fine-tuned", "0.458", "0.371", "0.086", "0.654"],
        ["Treatment", "0.470", "0.384", "0.086", "0.666"],
      ],
      highlight: 3,
    },
  ],
  links: [
    {
      label: "Source and notebook on GitHub",
      href: "https://github.com/olavrenin-data-scientist/coach_athlete_two_towers",
    },
  ],
};

const usport: Project = {
  slug: "usport-ai",
  title: "uSport.ai",
  tagline:
    "An AI recruiting platform built on a knowledge graph — ten agent surfaces, seven vector indexes, and a founding engineer.",
  year: "2023 — present",
  role: "Co-Founder & CTO — architecture, ML, full stack",
  status: "shipped",
  domain: "Knowledge Graph · Agents · RAG",
  accent: ["#ff8a42", "#4ce9d9"],
  cover: {
    src: "/projects/usport-architecture.png",
    alt: "uSport.ai system architecture: UI surfaces, API routes, Firebase, Neo4j knowledge graph, vector DB, and the LLM layer",
    caption:
      "The system as it stands: ten product surfaces over four service layers, every agent grounded in the graph.",
    width: 3488,
    height: 1580,
  },
  summary:
    "uSport.ai matches student-athletes to college coaches. The hard part was never the chat interface — it was building a substrate factual enough that an agent could answer recruiting questions without inventing schools, times, or eligibility rules. That substrate is a Neo4j knowledge graph with 8M+ athletes, 51K coaches, 176K schools, and 15M+ swim results, with seven native vector indexes layered on top for retrieval. I architected and built it from an empty repository.",
  stack: [
    "Next.js",
    "TypeScript",
    "Neo4j Aura",
    "Cypher",
    "Claude",
    "GPT-4o",
    "text-embedding-3-small",
    "Firebase",
    "Firestore",
    "Cloud Run",
    "Cloud Functions",
    "Stripe",
    "Playwright / Scrapy",
    "CrewAI",
  ],
  metrics: [
    { label: "Athletes in the graph", value: "8M+", detail: "51K coaches · 176K schools" },
    { label: "Swim results", value: "15M+", detail: "plus 350K D1 basketball games over 50 years" },
    { label: "Vector indexes", value: "7", detail: "native to Neo4j — no separate vector store" },
    { label: "Agent tools", value: "15+", detail: "across 6 RAG chains and 10 product surfaces" },
  ],
  specsHeading: "Platform at a glance",
  specs: [
    { label: "Graph", value: "Neo4j Aura — COACHES_AT, ATTENDS, COMMITTED_TO, PLAYS_SPORT" },
    { label: "Embeddings", value: "text-embedding-3-small, 1536-d, indexed natively in Neo4j" },
    { label: "Models", value: "Claude for every agent; GPT-4o for re-ranking, email, scoring" },
    { label: "App", value: "Next.js on Firebase — Auth, Firestore, Storage, Cloud Functions" },
    { label: "Domain graphs", value: "Swim technique, lacrosse, deaf sports, 1,400+ NCAA rules" },
    { label: "Ingestion", value: "Swimcloud, Hudl, ON3, SportsRecruits, golf scrapers" },
  ],
  sections: [
    {
      heading: "Why a graph and not a vector store",
      body: [
        "Recruiting questions are relational. “Which D2 programs in my conference recruit 51-second 100 freestylers, and am I still eligible after transferring?” is four joins and a rules lookup, not a similarity search. Embeddings retrieve things that read alike; they cannot tell you that a school's slowest benchmark is faster than your best time, or that a contact period has closed.",
        "So the ground truth is a Neo4j graph — 8M+ athletes, 51K coaches, 176K schools, 15M+ swim results, 350K D1 basketball games across fifty years, 120 years of Olympic history, and 1,400+ NCAA rules — traversed with Cypher. Agents call it as a tool and get facts back.",
        "Retrieval sits on the same database rather than beside it. Seven vector indexes live natively in Neo4j — episodes, news, RSS, conversation memory, swim research, and generated swim and lacrosse plans — all embedded with text-embedding-3-small at 1536 dimensions. One store, so a retrieved passage and the entity it describes are one hop apart instead of one network call and a join key.",
      ],
    },
    {
      heading: "Ten surfaces, one substrate",
      body: [
        "The platform is not a single chatbot. Scout is the athlete's portal for discovering programs; Draft is the coach's for scouting and outreach; the Assistant is the general agent with 15+ tools and full RAG. Around those sit NIL valuation, career projection, drill planning, a teams hub, an NCAA compliance checker, and transfer-portal tracking.",
        "Each has its own API route and its own tool set, but they all resolve to the same graph and the same indexes. Adding a surface means composing existing retrieval rather than standing up new infrastructure — which is the entire argument for putting the effort into the substrate first.",
        "A representative flow: a coach asks Draft for prospects, Claude calls search_athletes against indexed Neo4j queries over 8M+ records, pulls a roster with get_school_roster, drafts outreach that goes out through Resend and gets logged to Firestore, and emits a report block that renders to PDF. The conversation turn is then embedded into the memory index so the next session starts informed.",
      ],
    },
    {
      heading: "Agent Gym — training data from simulation",
      body: [
        "Recruiting conversations are scarce, private, and slow to accumulate. Agent Gym generates them instead: Claude simulates both sides of a recruiting exchange and then judges the result, and every episode is embedded into a dedicated index.",
        "Those episodes come back as in-context examples for Scout and Draft, so the production agents retrieve prior situations that resemble the one in front of them. It is a closed loop — simulation produces episodes, episodes ground the live agents, live behavior suggests what to simulate next — and it meant the agents were not starting cold on day one.",
      ],
    },
    {
      heading: "What the substrate makes cheap",
      body: [
        "Compliance is a good example of the payoff. NCAA rules are in the graph as data, so an eligibility check is a traversal that cross-references the athlete's own record against division-specific rules and contact periods, with the model interpreting rather than recalling. The failure mode of an LLM confidently misremembering an eligibility rule is designed out rather than prompt-engineered around.",
        "Drill planning composes three retrievals at once — the swim technique graph for drills, faults, and biomechanics; a research index of PDF chunks; and a plan index of prior generations — which is why the same generator could later be lifted wholesale into the Onpace mobile app and produce identical plans.",
        "Transfer-portal tracking ingests RSS, embeds it, writes entries as graph nodes, and surfaces relevant moves by similarity — the same four moves as everything else, which is the point.",
      ],
    },
    {
      heading: "Founding-engineer scope",
      body: [
        "Solo, from data to production: the scrapers and ETL that fill the graph, the Cypher and schema, the embedding pipelines behind all seven indexes, the agent tool definitions and RAG orchestration, the Next.js application, Firebase Auth and Firestore, Cloud Functions for credits and sync, Stripe billing, Gmail sequences, and PDF and Excel generation.",
        "Some pieces are documented separately here: the two-tower retrieval model that ranks coach–athlete matches, and the multi-sport career-projection models that predict whether an athlete reaches the next level.",
      ],
    },
  ],
  links: [
    { label: "uSport.ai", href: "https://app.usport.ai" },
  ],
};

export const projects: Project[] = [usport, omniSearch, twoTowers, careerProjection, onpace];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
