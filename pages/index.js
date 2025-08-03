import { Experience, Footer, Skills } from "@/components";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AboutTerminal() {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Nouhayla En-nadri";
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayText(fullText.slice(0, index));
      if (index < fullText.length) setIndex(index + 1);
    }, 120);
    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-base-100 via-transparent to-base-300 text-base-content">
      <main className="flex-grow px-4 sm:px-6 lg:px-12 py-12 flex flex-col md:flex-row gap-10 items-center justify-center relative z-10">
        {/* Typing & Terminal Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 max-w-xl"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-mono">
            <span className="text-secondary">&gt; </span>
            <span className="bg-gradient-to-r text-secondary bg-clip-text ">
              {displayText}
            </span>
            <span className="animate-pulse text-secondary">|</span>
          </h1>

          {/* Terminal Box */}
          <motion.div
            whileHover={{ scale: 1.015 }}
            className="bg-gray-800 rounded-md shadow-xl font-mono text-sm text-white overflow-hidden border border-white/10 transition-transform duration-300"
          >
            <div className="bg-gray-700 p-2 flex gap-1">
              <span className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="w-3 h-3 bg-yellow-500 rounded-full" />
              <span className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
            <div className="p-4 space-y-3 leading-relaxed">
              <p>
                <span className="text-blue-400">&gt; Nouhayla.About</span>{" "}
                <span className="text-yellow-300">BLAB BLA BLA BLA </span>
              </p>
              <p>
                <span className="text-blue-400">&gt; Nouhayla.location</span>{" "}
                <span className="text-yellow-300">France 🇫🇷</span>
              </p>
              <p>
                <span className="text-blue-400">&gt; status</span>{" "}
                <span className="text-green-400">
                  Learning, building, exploring...
                </span>
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Image - only on md+ */}
        <div className="ml-12 hidden md:flex justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/about-me.png"
              alt="Nouhayla pixel portrait"
              width={300}
              height={300}
              className="rounded-xl "
              priority
            />
          </motion.div>
        </div>
      </main>

      {/* Section Separator */}
      <hr className="border-t border-white/10 mx-6 sm:mx-8 lg:mx-12" />

      <section className="px-4 sm:px-6 lg:px-12">
        <Experience />
      </section>

      <hr className="border-t border-white/10 mx-6 sm:mx-8 lg:mx-12" />

      <section className="px-4 sm:px-6 lg:px-12">
        <Skills />
      </section>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}
