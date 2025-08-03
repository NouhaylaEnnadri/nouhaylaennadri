import { Experience, Footer } from "@/components";
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
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-base-100 via-transparent to-base-300">
      <main className="flex-grow px-6 mx-4 sm:mx-6 md:mx-8 lg:mx-12 text-base-content flex items-center justify-center mt-0 pt-0 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text & Terminal Section */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold font-mono">
              <span className="text-secondary">&gt; </span>
              {displayText}
              <span className="animate-pulse text-secondary">|</span>
            </h1>

            {/* Terminal Box */}
            <div className="bg-gray-800 rounded-md shadow-xl font-mono text-sm text-left text-white overflow-hidden w-full max-w-xl border border-white/10">
              <div className="bg-gray-700 p-2 flex items-center gap-1">
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

          {/* Image Section */}
          <div className="flex justify-center">
            <Image
              src="/about-me.png"
              alt="Nouhayla pixel portrait"
              width={400}
              height={400}
              className="rounded-xl"
              priority
            />
          </div>
        </div>
      </main>

      {/* Experience Section */}
      <Experience />

      {/* Sticky Footer */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}
