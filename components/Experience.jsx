"use client";

const experiences = [
  {
    title: "Data & Impact Analyst (Volunteer) • International Nonprofit",
    date: "JAN 2025 – Present • Remote",
    description:
      "Built a scalable Impact Tracker to centralize KPIs across initiatives and improve reporting cadence.",
    skills: ["Power BI", "Power Apps", "Excel", "KPI Design", "Data Modeling"],
  },
  {
    title: "Junior Consultant in Web & Mobile • Euromed Junior Enterprise",
    date: "NOV 2023 – NOV 2024 • Fès, Morocco",
    description:
      "Delivered client solutions and internal modules; led the company website revamp to support marketing and streamline updates.",
    skills: ["React", "Tailwind", "Node.js", "Client Communication","scrum"],
  },
  {
    title: "Software Engineer Intern • UEMF",
    date: "JUN 2024 – AUG 2024 • Fès, Morocco",
    description:
      "Developed CREM platform website; integrated RESTful APIs and MariaDB; ensured responsive UI and reliable data flows.",
    skills: ["Django", "React", "MariaDB", "REST APIs", "Responsive Design"],
  },
  {
    title: "BPM Developer • Triumph Group (Modis Maroc)",
    date: "APR 2023 – MAY 2023 • Fès, Morocco",
    description:
      "Automated purchase-request validation with BonitaSoft BPM—process models, approvals, data inputs—improving traceability.",
    skills: ["BonitaSoft BPM", "SQL", "Workflow Design", "Process Modeling"],
  },
  {
    title: "UX Designer • MONEN Technologies",
    date: "JUN 2022 – JUL 2022 • Fès, Morocco",
    description:
      "Created user flows, low-fi wireframes and interactive mockups to support feature design and usability tests.",
    skills: ["Balsamiq", "UX Research", "Wireframing"],
  },
];

export default function Experience() {
  return (
    <section className="mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold text-secondary mb-16 relative">
        My Experience
        <span className="block w-20 h-1 bg-secondary mt-2 rounded" />
      </h2>

      <div className="flex flex-col relative border-l border-secondary/30 pl-6">
        {experiences.map((item, idx) => (
          <div key={idx} className="relative pl-8 pb-12">
            {/* dot */}
            <div className="absolute left-0 top-1.5">
              <div className="h-4 w-4 bg-secondary rounded-full ring-4 ring-base-100" />
            </div>
            {/* line */}
            {idx !== experiences.length - 1 && (
              <div className="absolute left-1.5 top-6 w-0.5 h-full bg-secondary/30 z-0" />
            )}

            <p className="text-sm text-base-content/60 font-semibold mb-1">
              {item.date}
            </p>
            <h3 className="text-lg sm:text-xl font-bold mb-2 text-base-content">
              {item.title}
            </h3>
            <p className="text-sm text-base-content/80 leading-relaxed mb-3">
              {item.description}
            </p>

            {/* skills / tags */}
            <div className="flex flex-wrap gap-2">
              {item.skills?.map((s, i) => (
                <span
                  key={i}
                  className="text-xs font-medium px-2.5 py-1 rounded-md border border-secondary/40 text-base-content/90"
                >
                  #{s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
