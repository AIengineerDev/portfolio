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
  headline: "Senior AI/ML Engineer · Applied AI · Multi-Agent Systems",
  focus: "LLMs · RAG · AI Agents · NLP · Knowledge Graphs · Multi-Agent RL · MLOps",
  location: "Tampa Bay, FL",
  email: "oleksii.lavrenin@gmail.com",
  linkedin: "https://linkedin.com/in/oleksii-lavrenin",
  summary: [
    "I design, train, and ship end-to-end GenAI systems — RAG pipelines, transformer NLP, agentic workflows, knowledge-graph retrieval, and multi-agent reinforcement learning — and I take them all the way from prototype to production.",
    "I hold a Master's in Information and Data Science from UC Berkeley, and I have fourteen years building software: the last several in AI and machine learning, the earlier ones leading test automation for cloud platforms at scale.",
    "That combination is why I tend to own the entire lifecycle myself — data engineering, modeling, fine-tuning, MLOps — and why I care more about how a system degrades than how it scores on a good day. The work below is where that shows.",
  ],
} as const;

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
  { value: "UC Berkeley", label: "M.S. Information & Data Science" },
  { value: "14 yrs", label: "building software, the last several in AI/ML" },
  { value: "27.9M", label: "node knowledge graph in production" },
];
