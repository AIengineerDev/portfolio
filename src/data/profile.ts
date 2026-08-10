export type Role = {
  title: string;
  org: string;
  context?: string;
  period: string;
  current?: boolean;
  /** Free-form prose. Each string is a paragraph, not a bullet. */
  body: string[];
  tags: string[];
};

export type Education = {
  degree: string;
  school: string;
  period: string;
  detail?: string;
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export const profile = {
  name: "Oleksii (Alex) Lavrenin",
  headline: "Senior AI/ML Engineer · Founding Engineer · Applied AI",
  focus: "LLMs · RAG · AI Agents · NLP · Knowledge Graphs · Multi-Agent RL · MLOps",
  location: "Tampa Bay, FL",
  email: "oleksii.lavrenin@gmail.com",
  linkedin: "https://linkedin.com/in/oleksii-lavrenin",
  summary: [
    "I design, train, and ship end-to-end GenAI systems — RAG pipelines, transformer NLP, agentic workflows, and knowledge-graph retrieval — and I take them all the way from prototype to production.",
    "Most of my recent work has been as co-founder and CTO of uSport.ai, where I built a multimillion-node Neo4j and LLM platform from nothing, and as a UC Berkeley MIDS candidate researching multi-agent reinforcement learning for search-and-rescue robotics.",
    "Five-plus years of AI/ML engineering sit on top of nine years leading QA automation. That combination is why I tend to own the entire lifecycle myself — data engineering, modeling, fine-tuning, MLOps — and why I care more about how a system degrades than how it scores on a good day.",
  ],
} as const;

export const experience: Role[] = [
  {
    title: "Senior AI/ML Engineer · Co-Founder & CTO",
    org: "uSport.ai",
    period: "Jan 2023 — Present",
    current: true,
    body: [
      "I built uSport.ai from an empty repository into a production AI recruiting platform that matches student-athletes to NCAA coaches. It runs on GCP — Cloud Run, Firestore, Firebase, Neo4j Aura — over a knowledge graph of 27.9 million nodes and 8.4 million athlete profiles.",
      "The core of it is a multi-sport two-tower retrieval model in PyTorch: a BGE-large text encoder paired with a per-sport athlete tower, trained with bidirectional InfoNCE loss. Contrastive fine-tuning with hard negatives took forward MRR from 0.304 to 0.920 — more than a 3× improvement over the TF-IDF retrieval it replaced. Around it sit gradient-boosted career-projection models with temporal back-tests, and T5-generated explanations so a coach can see why the system recommended someone rather than just being told to trust it.",
      "The platform runs its own agent, Claudie, built on CrewAI — it handles outreach, recommendation pipelines, and the scrape-enrich-ingest workflows that feed Neo4j through MCP servers. I also ran QLoRA fine-tuning experiments for athlete and coach entity normalization, and designed the NIL scoring pipeline against the Phyllo API and social metrics.",
      "Everything underneath it is mine too: FastAPI microservices, Modal for GPU compute, Stripe billing, Playwright and Scrapy data pipelines, and a React/TypeScript frontend. Solo, from raw data to production.",
    ],
    tags: ["Neo4j", "PyTorch", "CrewAI", "GCP", "FastAPI", "QLoRA", "React", "MCP"],
  },
  {
    title: "MIDS Capstone Researcher",
    org: "UC Berkeley, School of Information",
    period: "2026",
    current: true,
    body: [
      "OmniSearch, my capstone, asks whether learned coordination beats hand-written strategy when drones and ground robots have to search burning terrain together. I built the simulation side — a wildfire environment on VMAS scaled in real physical units, over cached USGS elevation and OpenStreetMap terrain — and trained heterogeneous policies with HAPPO against six scripted baselines.",
      "The learned policies reached 80% mission success against 72% for the strongest baseline, but the result I care about is what happened under degraded communication: the scripted strategies lost roughly 14 points the moment comms became unreliable, while the trained swarm held near its ceiling through 70% dropout.",
    ],
    tags: ["HAPPO", "VMAS", "PyTorch", "YOLOv8", "BenchMARL", "Python"],
  },
  {
    title: "SDET / QA Automation Engineer",
    org: "HHS Tech Group · Walt Disney World · BenefitHub · Kobie Marketing · Accusoft",
    period: "2012 — 2021",
    body: [
      "Nine years building end-to-end test automation frameworks in Python, Java, Selenium, RESTAssured, and JMeter for cloud SaaS at scale — healthcare platforms, Disney React applications, and a loyalty platform serving more than three million users.",
      "I drove CI/CD adoption across GitLab and Jenkins and cut release cycles by about 20%. That decade of thinking about how software fails, and how to catch it automatically, is exactly what I now bring to MLOps pipeline design and AI system reliability.",
    ],
    tags: ["Python", "Java", "Selenium", "JMeter", "CI/CD", "Jenkins"],
  },
];

export const education: Education[] = [
  {
    degree: "M.S. Information & Data Science (MIDS)",
    school: "UC Berkeley, School of Information",
    period: "Expected 2026",
    detail:
      "Machine Learning · NLP with Deep Learning · Statistics · Data Engineering · Data Visualization · Research Design",
  },
  {
    degree: "B.A. Economics",
    school: "National Technical University, Kharkiv, Ukraine",
    period: "2008",
  },
];

export const certifications: string[] = [
  "Multi-AI-Agent Systems with CrewAI — DeepLearning.AI",
  "AI Agents with LangChain & LangGraph — Udacity",
  "Build AI Apps with MCP Server — DeepLearning.AI",
  "AI Strategy — Augment.org",
  "IBM Python for Data Science & AI",
];

export const skills: SkillGroup[] = [
  {
    label: "Machine learning",
    items: [
      "Transformers (BERT, T5, GPT)",
      "CNNs & DNNs",
      "Gradient boosting (XGBoost, LightGBM)",
      "Random forests",
      "Contrastive learning",
      "Embeddings",
      "Anomaly detection",
      "Multi-agent RL (HAPPO, MAPPO)",
    ],
  },
  {
    label: "GenAI & LLMs",
    items: [
      "RAG pipelines",
      "Vector databases",
      "Knowledge graphs (Neo4j)",
      "Fine-tuning (QLoRA)",
      "Prompt engineering",
      "AI agents (CrewAI, LangChain)",
      "Sentence-BERT, BGE-large",
      "Multimodal LLMs (LLaVA)",
    ],
  },
  {
    label: "NLP",
    items: [
      "NER",
      "Text classification",
      "Semantic search",
      "Information retrieval",
      "Two-tower retrieval",
      "T5 seq2seq",
      "spaCy, NLTK",
      "Hugging Face Transformers",
    ],
  },
  {
    label: "Languages & frameworks",
    items: [
      "Python",
      "SQL",
      "TypeScript",
      "JavaScript",
      "R",
      "Java",
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "FastAPI",
      "React",
      "D3.js",
    ],
  },
  {
    label: "Data, cloud & MLOps",
    items: [
      "Neo4j",
      "MongoDB",
      "PostgreSQL",
      "Redis",
      "Elasticsearch",
      "GCP (Cloud Run, Firestore)",
      "AWS",
      "Azure",
      "Docker",
      "Kubernetes",
      "MLflow",
      "GitHub Actions",
    ],
  },
];

/** Headline numbers worth stating once, up front. */
export const stats = [
  { value: "14+", label: "years shipping software" },
  { value: "5+", label: "years in AI/ML" },
  { value: "27.9M", label: "node knowledge graph in production" },
  { value: "0.920", label: "retrieval MRR, 3× over baseline" },
];
