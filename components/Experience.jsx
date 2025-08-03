// components/Experience.jsx
export default function Experience() {
  const experiences = [
    {
      role: "BPM Developer • Modis Maroc - Triumph",
      duration: "JUN 2023 - SEP 2023",
      length: "3 MOS",
      description:
        "Developed an automated, data-driven workflow for purchase request validation using BonitaSoft BPM, optimizing data flow and enhancing process accuracy.",
    },
    {
      role: "Junior Web Consultant • Euromed Junior Enterprise",
      duration: "FEB 2023 - MAY 2023",
      length: "3 MOS",
      description:
        "Collaborated in delivering client solutions with integrated data and web systems. Led the company website’s development as a tool for marketing and internal operations.",
    },
    {
      role: "Information Systems Intern • UEMF Research Center",
      duration: "JUL 2022 - SEP 2022",
      length: "3 MOS",
      description:
        "Built a comprehensive research management platform centralizing dashboards and research data to support academic initiatives.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-12">
        My Experience
      </h2>

      <div className="border-l-2 border-secondary/50 pl-6 space-y-12">
        {experiences.map((exp, idx) => (
          <div key={idx} className="relative">
            <div className="absolute left-[-11px] top-1 w-5 h-5 rounded-full bg-secondary border-4 border-base-100"></div>
            <p className="text-sm text-base-content/60 font-semibold mb-1">
              {exp.duration} • {exp.length}
            </p>
            <h3 className="text-lg font-semibold text-base-content mb-2">
              {exp.role}
            </h3>
            <p className="text-base text-base-content/80">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
