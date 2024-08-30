import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="relative bg-secondary bg-opacity-25">
      <div className="absolute inset-0 bg-tech-pattern opacity-10"></div>
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 py-12 lg:px-8 lg:py-20">
        <div className="text-left">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl mb-6">
            <span className="relative inline-block">
             
              <span className="relative text-secondary">N</span>
            </span>
            <span className="relative"> OYL's BLOG</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Hero;
