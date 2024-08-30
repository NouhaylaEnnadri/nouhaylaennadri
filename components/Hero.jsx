import Link from "next/link";
import React from "react";
;
const Hero = () => {
  return (
    <div>
      <div className="bg-secondary bg-opacity-25">
        <div className=" px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="max-w-2xl mx-auto sm:max-w-xl md:max-w-2xl">
            <div className="text-center">
              <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                  <span className="relative inline-block">
                    <svg
                      viewBox="0 0 52 24"
                      fill="currentColor"
                      className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-secondary lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                    >
                      <defs>
                        <pattern
                          id="b039bae0-fdd5-4311-b198-8557b064fce0"
                          x="0"
                          y="0"
                          width=".135"
                          height=".30"
                        >
                          <circle cx="1" cy="1" r=".7" />
                        </pattern>
                      </defs>
                      <rect
                        fill="url(#b039bae0-fdd5-4311-b198-8557b064fce0)"
                        width="52"
                        height="24"
                      />
                    </svg>
                    <span className="relative text-secondary">N</span>
                  </span>
                  <span className="relative "> OYL's BLOG</span>
                </h2>
              </div>
             
            </div>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default Hero;
