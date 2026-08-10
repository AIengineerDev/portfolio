export type Role = {
  title: string;
  org: string;
  context?: string;
  period: string;
  current?: boolean;
  highlights: string[];
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
    "I design, train, and ship end-to-end GenAI systems — RAG pipelines, transformer NLP, agentic workflows, and knowledge-graph retrieval — from prototype to production.",
    "At InRhythm I built LLM systems that improved enterprise defect detection by roughly 60% for clients including Fidelity and Wayfair. Independently, I architected uSport.ai: a multimillion-node Neo4j + LLM college athletic recruiting platform, built from the ground up.",
    "Five-plus years of AI/ML engineering sit on top of nine years as an SDET and QA automation lead — which is why I tend to own the whole lifecycle solo, and why I care more about how a system degrades than how it scores on a good day.",
  ],
} as const;

export const experience: Role[] = [
  {
    title: "Senior AI/ML Engineer · Co-Founder & CTO",
    org: "uSport.ai",
    period: "Jan 2023 — Present",
    current: true,
    highlights: [
      "Architected and shipped an end-to-end AI recruiting platform on GCP (Cloud Run, Firestore, Firebase, Neo4j Aura) matching student-athletes to NCAA coaches across a 27.9M-node knowledge graph and 8.4M athlete profiles.",
      "Designed and trained a multi-sport two-tower retrieval model — BGE-large text encoder plus a per-sport athlete tower, bidirectional InfoNCE loss — reaching 0.920 forward MRR and 0.365 reverse, a 3×+ improvement over TF-IDF retrieval.",
      "Built career-projection models (gradient boosting, temporal back-tests) for basketball and lacrosse, with T5-generated explanations so coaches see why a recommendation was made.",
      "Engineered Claudie, a CrewAI in-product agent running outreach, recommendation pipelines, and scrape-enrich-ingest workflows into Neo4j via MCP servers.",
      "Ran QLoRA fine-tuning for athlete/coach entity normalization, and designed the NIL scoring pipeline against the Phyllo API and social metrics.",
      "Owned the full MLOps stack solo — FastAPI microservices, Modal for GPU compute, Stripe billing, Playwright/Scrapy pipelines, React/TypeScript frontend.",
    ],
    tags: ["Neo4j", "PyTorch", "CrewAI", "GCP", "FastAPI", "QLoRA", "React"],
  },
  {
    title: "AI Engineer",
    org: "InRhythm",
    context: "Clients: Fidelity, Wayfair, Admina Health",
    period: "Mar 2021 — Present",
    current: true,
    highlights: [
      "Built transformer-based RAG pipelines (BERT/T5 + vector retrieval) for enterprise defect detection, improving prediction accuracy ~60% over prior rule-based systems across large financial and e-commerce codebases.",
      "Deployed LLM automation that auto-resolved recurring production issues, cutting manual triage effort roughly 20× across client systems.",
      "Engineered NLP anomaly detection and real-time Elasticsearch analytics dashboards, sharply reducing time-to-insight for client analytics teams.",
      "Led a 20-person cross-functional team and standardized MLOps workflows — MLflow, GitHub Actions, Jenkins, Docker — for training, versioning, and deployment.",
    ],
    tags: ["BERT", "T5", "RAG", "Elasticsearch", "MLflow", "Docker"],
  },
  {
    title: "SDET / QA Automation Engineer",
    org: "HHS Tech Group · Walt Disney World · BenefitHub · Kobie Marketing · Accusoft",
    period: "2012 — 2021",
    highlights: [
      "Nine years building end-to-end test automation frameworks (Python, Java, Selenium, RESTAssured, JMeter) for cloud SaaS at scale — healthcare platforms, Disney React apps, and a loyalty platform serving 3M+ users.",
      "Drove CI/CD adoption across GitLab and Jenkins, cutting release cycles ~20%. That automation background is what now shapes how I design MLOps pipelines and reason about AI system reliability.",
    ],
    tags: ["Python", "Java", "Selenium", "JMeter", "CI/CD"],
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
  { value: "~60%", label: "defect-detection accuracy gain" },
];
