import { Experience, Footer, Skills } from "@/components";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AboutTerminal() {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Nouhayla En-nadri";
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayText(fullText.slice(0, index));
      if (index < fullText.length) {
        setIndex(index + 1);
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-base-100 via-transparent to-base-300 text-base-content relative">
      {/* Light Background Image on Mobile */}
      <div className="md:hidden absolute inset-0 z-0 opacity-10">
        <Image
          src="/about-me.png"
          alt="Nouhayla background"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-white/20" />
      </div>

      {/* Hero Section */}
      <main className="relative z-10 px-4 sm:px-6 lg:px-12 py-12 flex flex-col md:flex-row gap-10 items-center justify-center">
        {/* Terminal Info */}
        <div className="space-y-6 max-w-xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-mono">
            <span className="text-secondary">&gt; </span>
            {displayText}
            <span className="animate-pulse text-secondary">|</span>
          </h1>

          <div className="bg-gray-800 rounded-md shadow-xl font-mono text-sm text-white overflow-hidden border border-white/10">
            <div className="bg-gray-700 p-2 flex gap-1">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            </div>
            <div className="p-4 space-y-3">
              <p>
                <span className="text-blue-400">&gt; Nouhayla.About</span>{" "}
                <span className="text-yellow-300">
                  a curious mind ✨ passionate about machine learning, coding
                  cool stuff and sipping coffee while solving puzzles.
                </span>
              </p>
              <p>
                <span className="text-blue-400">&gt; Nouhayla.location</span>{" "}
                <span className="text-yellow-300">&quot;France 🇫🇷&quot;</span>
              </p>
              <p>
                <span className="text-blue-400">&gt; status</span>{" "}
                <span className="text-green-400">
                  Learning, building, exploring…
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Image - Desktop Only */}
        <div className="hidden md:block">
          <Image
            src="/about-me.png"
            alt="Nouhayla pixel portrait"
            width={300}
            height={300}
            className="rounded-xl shadow-lg"
            priority
          />
        </div>
      </main>

      {/* Section Separator */}
      <hr className="border-t border-white/10 mx-6 sm:mx-8 lg:mx-12" />

      {/* Experience Section */}
      <section className="px-4 sm:px-6 lg:px-12">
        <Experience />
      </section>

      <hr className="border-t border-white/10 mx-6 sm:mx-8 lg:mx-12" />

      {/* Skills Section */}
      <section className="px-4 sm:px-6 lg:px-12">
        <Skills />
      </section>

      {/* Sticky Footer */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}
