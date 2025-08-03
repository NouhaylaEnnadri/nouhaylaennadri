import Image from "next/image";
import yourImage from "@/public/about-me.png"; // replace with your actual image
import MouseParticles from "./MouseParticles";

export default function TerminalHero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-base-100 relative px-4">
      <MouseParticles />
      <div className="max-w-6xl w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        
        {/* Code Terminal */}
        <div className="bg-gray-900 text-green-400 font-mono rounded-lg shadow-xl p-6 w-full lg:w-1/2">
          <div className="text-lg">
            <p><span className="text-purple-400">&gt;</span> Nouhayla.name</p>
            <p className="ml-4 text-white">"Nouhayla Ennadri"</p>
            <br />
            <p><span className="text-purple-400">&gt;</span> Nouhayla.education</p>
            <p className="ml-4 text-white">"B.Sc. Data Science & AI"</p>
            <br />
            <p><span className="text-purple-400">&gt;</span> Nouhayla.languages</p>
            <p className="ml-4 text-white">["Python", "JavaScript", "React", "Tailwind", "Next.js"]</p>
            <br />
            <p><span className="text-purple-400">&gt;</span> Nouhayla.interests</p>
            <p className="ml-4 text-white">["Creative coding", "Design", "ML", "Tech 💡"]</p>
          </div>
        </div>

        {/* Pixel Art Image */}
        <div className="w-full lg:w-1/2 flex justify-center relative">
          <Image
            src={yourImage}
            alt="Nouhayla pixel art"
            width={300}
            height={300}
            className="rounded-xl shadow-lg"
            priority
          />
        </div>
      </div>
    </section>
  );
}
    