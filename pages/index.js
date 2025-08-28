"use client";

import { Experience, Footer, Skills, Home_PostWidget } from "@/components";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaEnvelope, FaFilePdf } from "react-icons/fa";

export default function AboutTerminal() {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Nouhayla En-nadri";
  const [index, setIndex] = useState(0);

  const socials = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/nouhayla-en-nadri-845778231/", icon: <FaLinkedin /> },
    { label: "GitHub", href: "https://github.com/NouhaylaEnnadri", icon: <FaGithub /> },
    { label: "Email", href: "mailto:nouhaylaennadri@gmail.com", icon: <FaEnvelope /> },
    { label: "Resume", href: "/Nouhayla_EnNadri_CV.pdf", icon: <FaFilePdf /> }, // put your PDF in /public
  ];

  useEffect(() => {
    const t = setTimeout(() => {
      setDisplayText(fullText.slice(0, index));
      if (index < fullText.length) setIndex(index + 1);
    }, 120);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-base-100 via-transparent to-base-300 text-base-content">
      {/* HERO */}
      <main className="px-4 sm:px-6 lg:px-12 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left block: socials (icons only) + terminal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-auto"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-mono mb-6">
              <span className="text-secondary">&gt; </span>
              <span className="bg-gradient-to-r text-secondary bg-clip-text">{displayText}</span>
              <span className="animate-pulse text-secondary">|</span>
            </h1>

            {/* Socials on the LEFT (md+) / below on mobile */}
            <div className="flex flex-col md:flex-row md:items-stretch md:gap-4">
              {/* Social icons column */}
              <div className="order-2 md:order-1 mt-3 md:mt-0 md:self-stretch flex md:flex-col gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex items-center justify-center p-2 rounded-lg border border-secondary/40 text-secondary hover:bg-secondary/10 hover:shadow transition"
                    title={s.label}
                  >
                    <span className="text-lg">{s.icon}</span>
                  </a>
                ))}
              </div>

              {/* Terminal */}
              <motion.div
                whileHover={{ scale: 1.015 }}
                className="order-1 md:order-2 bg-gray-800 rounded-md shadow-xl font-mono text-sm text-white overflow-hidden border border-white/10 transition-transform duration-300 md:max-w-xl"
              >
                <div className="bg-gray-700 p-2 flex gap-1">
                  <span className="w-3 h-3 bg-red-500 rounded-full" />
                  <span className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <span className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
                <div className="p-4 space-y-3 leading-relaxed">
                  <p>
                    <span className="text-blue-400">&gt; Nouhayla.About</span>{" "}
                    <span className="text-teal-400">Engineering student in Big Data Analytics & Machine Learning</span>
                  </p>
                  <p>
                    <span className="text-blue-400">&gt; Nouhayla.location</span>{" "}
                    <span className="text-yellow-300">Montpellier, France 🇫🇷</span>
                  </p>
                  <p>
                    <span className="text-blue-400">&gt; status</span>{" "}
                    <span className="text-green-400">Learning, building, exploring...</span>
                  </p>
                  <p>
                    <span className="text-blue-400">&gt; lookingFor</span>{" "}
                    <span className="text-pink-400">Data Science / Machine Learning Internship (2025)</span>
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Image */}
          <div className="hidden md:block">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }}>
              <Image
                src="/about-me.png"
                alt="Nouhayla pixel portrait"
                width={320}
                height={320}
                className="rounded-xl"
                priority
              />
            </motion.div>
          </div>
        </div>
      </main>

      {/* DIVIDER */}
      <hr className="border-t border-white/10 mx-4 sm:mx-6 lg:mx-12" />

      {/* LATEST POSTS */}
      <section className="px-4 sm:px-6 lg:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          <Home_PostWidget />
          <div className="mt-4">
            <Link href="/posts" className="text-secondary font-medium hover:underline">
              → View all posts
            </Link>
          </div>
        </div>
      </section>

      <hr className="border-t border-white/10 mx-4 sm:mx-6 lg:mx-12" />

      {/* SKILLS */}
      <section className="px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <Skills />
        </div>
      </section>

      <hr className="border-t border-white/10 mx-4 sm:mx-6 lg:mx-12" />

      {/* EXPERIENCE */}
      <section className="px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <Experience />
        </div>
      </section>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}
