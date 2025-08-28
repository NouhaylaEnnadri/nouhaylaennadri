"use client";

import { useState } from "react";
import {
  FaCloud,
  FaDatabase,
  FaServer,
  FaCode,
  FaGithub,
  FaBrain,
  FaChartLine,
} from "react-icons/fa";

const skillData = {
  ml: {
    title: "Machine Learning & Data Science",
    description:
      "Core ML stack I use for analysis, modeling and evaluation. Focus on building end-to-end, well-explained workflows.",
    tools: [
      "Python",
      "Pandas",
      "NumPy",
      "scikit-learn",
      "Matplotlib",
      "Seaborn",
      "Plotly",
      "Statsmodels",
      "Model evaluation",
      "Feature engineering",
    ],
  },
  nlp: {
    title: "NLP & Time Series (this year)",
    description:
      "Current focus from my exchange program in ML: NLP foundations and time-series forecasting with best practices & diagnostics.",
    tools: [
      "Text preprocessing",
      "spaCy",
      "Hugging Face (basics)",
      "Classical NLP (TF-IDF, n-grams)",
      "Evaluation (F1, ROC/AUC)",
      "SARIMA",
      "ACF/PACF",
      "Walk-forward validation",
      "Responsible AI",
    ],
  },
  data: {
    title: "Data Engineering",
    description:
      "Collecting, cleaning and moving data with reliability in mind: SQL and ETL fundamentals for analytics pipelines.",
    tools: [
      "SQL",
      "MySQL",
      "T-SQL / PL-SQL",
      "MongoDB",
      "ETL",
      "Data Quality",
      "Schema design",
      "APIs",
    ],
  },
  web: {
    title: "Web Development",
    description:
      "Front-end & basic back-end to ship data products and dashboards.",
    tools: [
      "JavaScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "ASP.NET Core",
      "Figma (UI)",
    ],
  },
  cloud: {
    title: "Cloud & DevOps",
    description: "Lightweight deployment/automation for projects and demos.",
    tools: [
      "Git / GitHub",
      "GitHub Actions (CI/CD)",
      "Vercel",
      "Containers (basics)",
      "Env management",
    ],
  },
};

const Skills = () => {
  const [active, setActive] = useState("ml");

  const tabs = [
    { key: "ml", label: "ML & Data Science", icon: <FaBrain /> },
    { key: "nlp", label: "NLP & Time Series", icon: <FaChartLine /> },
    { key: "data", label: "Data Engineering", icon: <FaServer /> },
    { key: "web", label: "Web Development", icon: <FaCode /> },
    { key: "cloud", label: "Cloud & DevOps", icon: <FaCloud /> },
  ];

  const { title, description, tools } = skillData[active];

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-10">
        Skills & Tooling
      </h2>

      <div className="flex flex-col gap-8 md:flex-row">
        {/* Tabs */}
        <div className="flex flex-wrap md:flex-col gap-3 md:gap-4 w-full md:w-1/3">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-lg w-full text-left text-sm transition-all ${
                active === tab.key
                  ? "bg-secondary text-base-100"
                  : "border-secondary text-base-content hover:bg-secondary/10"
              }`}
            >
              {tab.icon}
              <span className="font-semibold">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="border border-secondary p-6 rounded-xl w-full bg-base-200 backdrop-blur-md space-y-4">
          <h3 className="text-xl font-semibold text-base-content">{title}</h3>
          <p className="text-sm text-base-content/80">{description}</p>

          {/* Text badges so you can list any library/tool */}
          <div className="flex flex-wrap gap-2 pt-2">
            {tools.map((t, i) => (
              <span
                key={i}
                className="text-xs font-medium px-2.5 py-1 rounded-md border border-secondary/50 text-base-content/90"
              >
                {t}
              </span>
            ))}
          </div>

          <a
            href="https://github.com/NouhaylaEnnadri"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center mt-4 text-sm font-medium text-secondary hover:underline"
          >
            <FaGithub className="mr-2" />
            View my Github
          </a>
        </div>
      </div>
    </section>
  );
};

export default Skills;
