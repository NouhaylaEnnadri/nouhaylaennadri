import React from "react";

const Preloader = () => {
  return (
    <div>
      {" "}
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center justify-center loader w-24 h-24">
          <svg height="0" width="0" viewBox="0 0 64 64" className="absolute">
            <defs xmlns="http://www.w3.org/2000/svg">
              <linearGradient
                id="b"
                gradientUnits="userSpaceOnUse"
                y2="2"
                x2="0"
                y1="62"
                x1="0"
              >
                <stop stopColor="#973BED"></stop>
                <stop stopColor="#007CFF" offset="1"></stop>
              </linearGradient>
              <linearGradient
                id="c"
                gradientUnits="userSpaceOnUse"
                y2="0"
                x2="0"
                y1="64"
                x1="0"
              >
                <stop stopColor="#FFC800"></stop>
                <stop stopColor="#F0F" offset="1"></stop>
                <animateTransform
                  repeatCount="indefinite"
                  keySplines=".42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1"
                  keyTimes="0; 0.125; 0.25; 0.375; 0.5; 0.625; 0.75; 0.875; 1"
                  dur="10s"
                  values="0 32 32;-270 32 32;-270 32 32;-540 32 32;-540 32 32;-810 32 32;-810 32 32;-1080 32 32;-1080 32 32"
                  type="rotate"
                  attributeName="gradientTransform"
                />
              </linearGradient>
              <linearGradient
                id="d"
                gradientUnits="userSpaceOnUse"
                y2="2"
                x2="0"
                y1="62"
                x1="0"
              >
                <stop stopColor="#00E0ED"></stop>
                <stop stopColor="#00DA72" offset="1"></stop>
              </linearGradient>
              <linearGradient
                id="gradientL"
                gradientUnits="userSpaceOnUse"
                y2="0"
                x2="0"
                y1="64"
                x1="0"
              >
                <stop stopColor="#FFC800"></stop>
                <stop stopColor="#F0F" offset="1"></stop>
                <animateTransform
                  attributeName="gradientTransform"
                  type="rotate"
                  from="0 32 32"
                  to="360 32 32"
                  dur="10s"
                  repeatCount="indefinite"
                />
              </linearGradient>
            </defs>
          </svg>

          {/* N */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 64 64"
            height="32"
            width="32"
            className="inline-block"
          >
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="8"
              stroke="url(#b)"
              d="M 10 4 V 60 H 20 V 22 L 40 60 H 50 V 4 H 40 V 42 L 20 4 Z"
              className="dash"
              id="n"
              pathLength="360"
            />
          </svg>

          {/* O */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            style={{
              "--rotation-duration": "0ms",
              "--rotation-direction": "normal",
            }}
            viewBox="0 0 64 64"
            height="32"
            width="32"
            className="inline-block"
          >
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="10"
              stroke="url(#c)"
              d="M 32 32 m 0 -27 a 27 27 0 1 1 0 54 a 27 27 0 1 1 0 -54"
              className="spin"
              id="o"
              pathLength="360"
            />
          </svg>

          {/* Y */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 64 64"
            height="32"
            width="32"
            className="inline-block"
          >
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="8"
              stroke="url(#b)"
              d="M 54.722656,3.9726563 A 2.0002,2.0002 0 0 0 54.941406,4 h 5.007813 C 58.955121,17.046124 49.099667,27.677057 36.121094,29.580078 a 2.0002,2.0002 0 0 0 -1.708985,1.978516 V 60 H 29.587891 V 31.558594 A 2.0002,2.0002 0 0 0 27.878906,29.580078 C 14.900333,27.677057 5.0448787,17.046124 4.0507812,4 H 9.28125 c 1.231666,11.63657 10.984383,20.554048 22.6875,20.734375 a 2.0002,2.0002 0 0 0 0.02344,0 c 11.806958,0.04283 21.70649,-9.003371 22.730469,-20.7617187 z"
              className="dash"
              id="y"
              pathLength="360"
            />
          </svg>

          {/* L */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 64 64"
            height="32"
            width="32"
            className="inline-block"
          >
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="8"
              stroke="url(#gradientL)"
              d="M 20 4 V 60 H 44"
              className="dash"
              pathLength="360"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
