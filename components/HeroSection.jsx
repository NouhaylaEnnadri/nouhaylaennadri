import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamically import background animation so SSR doesn't break
const AnimatedBackground = dynamic(() => import("./MouseParticles"), {
  ssr: false,
});

export default function HeroSection() {
  return (
    <section className="relative bg-base-100 text-base-content min-h-screen overflow-hidden flex items-center justify-center px-4">
      {/* Interactive Background */}
      <AnimatedBackground />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left: Intro Text */}
        <div className="lg:w-1/3 space-y-4 text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Hi, I'm <span className="text-secondary">Nouhayla</span>
          </h1>
          <p className="text-lg text-base-content/70">
            A creative technologist passionate about ML, design & ideas that matter.  
          </p>
          <Link href="#projects" className="btn btn-secondary mt-4">
            See My Work
          </Link>
        </div>

        {/* Center: Avatar Image */}
        <div className="lg:w-1/3 flex justify-center">
          <div className="relative w-[280px] h-[280px] md:w-[340px] md:h-[340px]">
            <Image
              src="/about-me.png" // Place the image in /public as 'about-me.png'
              alt="Nouhayla Pixel Portrait"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Right: Quote or Skills */}
        <div className="lg:w-1/3 space-y-4 text-right">
          <p className="text-md text-base-content/70">
            <span className="italic">"Forever learning. Never settling."</span>
          </p>
          <div className="text-sm opacity-70">
            Coding | Machine Learning | Design | 🍵
          </div>
        </div>
      </div>
    </section>
  );
}
