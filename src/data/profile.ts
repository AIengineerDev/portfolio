export type Role = {
  title: string;
  org: string;
  context?: string;
  period: string;
  current?: boolean;
  /** One line. The detail lives in the career summary above the list. */
  blurb: string;
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
    "Most of my recent work has been as co-founder and CTO of uSport.ai, which I built from an empty repository into a production AI recruiting platform matching student-athletes to NCAA coaches. It runs on GCP over a knowledge graph of 27.9 million nodes and 8.4 million athlete profiles. At its core is a multi-sport two-tower retrieval model in PyTorch — a BGE-large text encoder paired with a per-sport athlete tower, trained with bidirectional InfoNCE loss — where contrastive fine-tuning on hard negatives lifted forward MRR from 0.304 to 0.920, more than 3× the TF-IDF retrieval it replaced.",
    "Around that sit gradient-boosted career-projection models, T5-generated match explanations so coaches see the reasoning rather than being told to trust it, and Claudie — a CrewAI agent running outreach and the scrape-enrich-ingest pipelines that feed Neo4j through MCP servers. The infrastructure is mine too: FastAPI microservices, Modal for GPU compute, Stripe billing, Playwright and Scrapy pipelines, and a React/TypeScript frontend. Solo, from raw data to production.",
    "In parallel I'm a UC Berkeley MIDS candidate researching multi-agent reinforcement learning for search-and-rescue robotics. My capstone, OmniSearch, trains heterogeneous drone and ground-robot policies with HAPPO in a physically scaled wildfire simulator — reaching 80% mission success against 72% for the strongest scripted baseline, and holding near that ceiling through 70% communication dropout where the scripted strategies collapse.",
    "Five-plus years of AI/ML engineering sit on top of nine years leading QA automation for cloud SaaS at scale — healthcare platforms, Disney applications, a loyalty platform serving three million users. That decade of thinking about how software fails, and how to catch it automatically, is why I tend to own the entire lifecycle myself and why I care more about how a system degrades than how it scores on a good day.",
  ],
} as const;

export const experience: Role[] = [
  {
    title: "Senior AI/ML Engineer · Co-Founder & CTO",
    org: "uSport.ai",
    period: "Jan 2023 — Present",
    current: true,
    blurb:
      "Built and run an AI recruiting platform on GCP — 27.9M-node Neo4j graph, two-tower retrieval, CrewAI agents, full stack solo.",
    tags: ["Neo4j", "PyTorch", "CrewAI", "GCP", "FastAPI", "QLoRA", "React", "MCP"],
  },
  {
    title: "MIDS Capstone Researcher",
    org: "UC Berkeley, School of Information",
    period: "2026",
    current: true,
    blurb:
      "OmniSearch — heterogeneous multi-agent RL for wildfire search-and-rescue, trained with HAPPO in a physically scaled simulator.",
    tags: ["HAPPO", "VMAS", "PyTorch", "YOLOv8", "BenchMARL", "Python"],
  },
  {
    title: "SDET / QA Automation Engineer",
    org: "HHS Tech Group · Walt Disney World · BenefitHub · Kobie Marketing · Accusoft",
    period: "2012 — 2021",
    blurb:
      "Nine years of end-to-end test automation for cloud SaaS at scale, driving CI/CD adoption that cut release cycles ~20%.",
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
