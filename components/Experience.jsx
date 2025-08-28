const experiences = [
  {
    title: "Data & Impact Analyst (Volunteer) • International Nonprofit",
    date: "JAN 2025 – Present • Remote",
    description:
      "Designed and built a scalable Impact Tracker using Power BI, Power Apps, and Excel to centralize KPIs across domains (healthcare, education, water access) and improve reporting cadence. (Tech: Power BI, Power Apps, Excel)",
  },
  {
    title: "Junior Consultant in Web & Mobile Development • Euromed Junior Enterprise",
    date: "NOV 2023 – NOV 2024 • 1 YR 1 MO • Fès, Morocco",
    description:
      "Delivered client-facing web solutions and internal modules; led the company website revamp to support marketing and streamline content/data updates. (Tech: React, Tailwind, Node.js)",
  },
  {
    title: "Software Engineer Intern • Université Euro-Méditerranéenne de Fès (UEMF)",
    date: "JUN 2024 – AUG 2024 • 3 MOS • Fès, Morocco",
    description:
      "Developed the CREM platforms website with Django and React; integrated RESTful APIs and MariaDB; ensured responsive UI and reliable data flows. (Tech: Django, React, MariaDB, REST APIs)",
  },
  {
    title: "BPM Developer • Triumph Group (Modis Maroc)",
    date: "APR 2023 – MAY 2023 • 2 MOS • Fès, Morocco",
    description:
      "Automated the purchase-request validation workflow with BonitaSoft BPM—modeled processes, approvals, and data inputs—improving traceability and reducing handoffs. (Tech: BonitaSoft BPM, SQL)",
  },
  {
    title: "UX Designer • MONEN Technologies",
    date: "JUN 2022 – JUL 2022 • 2 MOS • Fès, Morocco",
    description:
      "Produced user flows, low-fi wireframes, and interactive mockups to support feature design and usability testing. (Tools: Balsamiq, UX Research)",
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
