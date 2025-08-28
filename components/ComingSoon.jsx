import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";

const ComingSoon = () => {
  return (
    <div>
      <div class="min-h-screen  flex flex-col items-center justify-center">
        <h1 class="text-5xl text-secondary font-bold mb-8 animate-pulse">
          Coming Soon
        </h1>
        <p class="text-base-content text-lg mb-8">
          Working on it! \n you can check my github Tho:
        </p>
        <a
          href="https://github.com/NouhaylaEnnadri"
          target="_blank"
          rel="noopener noreferrer"
        >
        <FaGithub size={60} className="text-secondary hover:scale-110 transition-transform" />
        </a>
      </div>
    </div>
  );
};

export default ComingSoon;
