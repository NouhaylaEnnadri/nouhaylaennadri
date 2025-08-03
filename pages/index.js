// pages/about.jsx
import { useEffect, useState } from "react";
import Image from "next/image";
import { Footer } from "@/components";

export default function AboutPage() {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Nouhayla En-nadri";
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayText(fullText.slice(0, index));
      if (index < fullText.length) {
        setIndex(index + 1);
      }
    }, 120);
    return () => clearTimeout(timeout);
  }, [index]);

  const experienceData = [
    {
      date: "JUN 2023 - SEP 2023",
      duration: "3 MOS",
      title: "BPM Developer • Modis Maroc - Triumph",
      description:
        "Developed an automated, data-driven workflow for purchase request validation using BonitaSoft BPM, optimizing data flow and enhancing process accuracy.",
    },
    {
      date: "FEB 2023 - MAY 2023",
      duration: "3 MOS",
      title: "Junior Web Consultant • Euromed Junior Enterprise",
      description:
        "Collaborated in delivering client solutions with integrated data and web systems. Led the company website&apos;s development as a tool for marketing and internal operations.",
    },
    {
      date: "JUL 2022 - SEP 2022",
      duration: "3 MOS",
      title: "Information Systems Intern • UEMF Research Center",
      description:
        "Built a comprehensive research management platform centralizing dashboards and research data to support academic initiatives.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-base-100 text-base-content">
      <main className="px-4 sm:px-8 md:px-16 py-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          {/* Text Section */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold font-mono">
              <span className="text-primary">&gt; </span>
              {displayText}
              <span className="animate-pulse text-primary">|</span>
            </h1>

            <div className="bg-gray-800 text-white text-sm font-mono rounded-md shadow-lg border border-white/10">
              <div className="bg-gray-700 p-2 flex gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              </div>
              <div className="p-4 space-y-2">
                <p>
                  <span className="text-blue-400">&gt; About</span>{" "}
                  <span className="text-yellow-300">
                    a curious mind ✨ passionate about machine learning, coding
                    cool stuff 💻 and sipping coffee ☕ while solving puzzles
                    🧹.
                  </span>
                </p>
                <p>
                  <span className="text-blue-400">&gt; Location</span>{" "}
                  <span className="text-yellow-300">"France 🇫🇷"</span>
                </p>
                <p>
                  <span className="text-blue-400">&gt; Status</span>{" "}
                  <span className="text-green-400">
                    Learning, building, exploring...
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <Image
              src="/about-me.png"
              alt="Nouhayla pixel portrait"
              width={360}
              height={360}
              className="rounded-xl shadow-xl border border-white/10"
              priority
            />
          </div>
        </div>

        {/* Experience Section */}
        <section>
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-10">
            My Experience
          </h2>
          <ul className="space-y-12 relative border-l border-white/10 pl-6">
            {experienceData.map((exp, index) => (
              <li key={index} className="relative">
                <div className="absolute left-[-8px] top-1 w-3 h-3 bg-secondary rounded-full"></div>
                <p className="text-sm uppercase text-white/60">
                  {exp.date} • {exp.duration}
                </p>
                <h3 className="font-semibold text-lg text-white mt-1">
                  {exp.title}
                </h3>
                <p className="text-white/80 mt-2 text-sm leading-relaxed">
                  {exp.description}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
