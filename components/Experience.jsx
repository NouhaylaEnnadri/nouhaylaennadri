const experiences = [
  {
    title: "BPM Developer • Modis Maroc - Triumph",
    date: "JUN 2023 - SEP 2023 • 3 MOS",
    description:
      "Developed an automated, data-driven workflow for purchase request validation using BonitaSoft BPM, optimizing data flow and enhancing process accuracy.",
  },
  {
    title: "Junior Web Consultant • Euromed Junior Enterprise",
    date: "FEB 2023 - MAY 2023 • 3 MOS",
    description:
      "Collaborated in delivering client solutions with integrated data and web systems. Led the company website’s development as a tool for marketing and internal operations.",
  },
  {
    title: "Information Systems Intern • UEMF Research Center",
    date: "JUL 2022 - SEP 2022 • 3 MOS",
    description:
      "Built a comprehensive research management platform centralizing dashboards and research data to support academic initiatives.",
  },
  {
    title: "Information Systems Intern • UEMF Research Center",
    date: "JUL 2022 - SEP 2022 • 3 MOS",
    description:
      "Built a comprehensive research management platform centralizing dashboards and research data to support academic initiatives.",
  },
];

export default function Experience() {
  return (
    <section className=" mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold text-secondary mb-16 relative">
        My Experience
        <span className="block w-20 h-1 bg-secondary mt-2 rounded" />
      </h2>
      <div className="flex flex-col relative border-l border-secondary/30 pl-6">
        {experiences.map((item, idx) => (
          <div key={idx} className="relative pl-8 pb-12">
            {/* Dot */}
            <div className="absolute left-0 top-1.5">
              <div className="h-4 w-4 bg-secondary rounded-full ring-4 ring-base-100" />
            </div>

            {/* Line (only if not last) */}
            {idx !== experiences.length - 1 && (
              <div className="absolute left-1.5 top-6 w-0.5 h-full bg-secondary/30 z-0" />
            )}

            {/* Content */}
            <p className="text-sm text-base-content/60 font-semibold mb-1">
              {item.date}
            </p>
            <h3 className="text-lg sm:text-xl font-bold mb-2 text-base-content">
              {item.title}
            </h3>
            <p className="text-sm text-base-content/80 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
