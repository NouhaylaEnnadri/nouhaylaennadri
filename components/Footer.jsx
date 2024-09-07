import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="px-12 footer bg-secondary bg-opacity-15 text-neutral-content items-center p-6">
        <aside className="px-6 grid-flow-col items-center">
          <Link href="/" passHref>
            <h1 className="mx-6 text-2xl font-bold font-[Orbitron] text-transparent bg-clip-text bg-secondary cursor-pointer">
              <span className="text-secondary">N</span>OYL
            </h1>
          </Link>
        </aside>
        <nav className="px-12 grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          {/* GitHub Icon */}
          <a
            href="https://github.com/NouhaylaEnnadri"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full transition duration-300 ease-in-out hover:bg-secondary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.02c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.24 1.838 1.24 1.07 1.834 2.809 1.305 3.495.998.107-.775.418-1.305.763-1.605-2.665-.303-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.235-3.221-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.51 11.51 0 0 1 3-.405c1.02.004 2.045.137 3 .405 2.292-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.873.118 3.176.769.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.625-5.475 5.921.43.37.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
          {/* Gmail Icon */}
          <a
            href="mailto:nouhaylaennadri@gmail.com"
            className="p-2 rounded-full transition duration-300 ease-in-out hover:bg-secondary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M20 4h-16c-1.104 0-2 .896-2 2v12c0 1.104.896 2 2 2h16c1.104 0 2-.896 2-2v-12c0-1.104-.896-2-2-2zm-8 7l-8-5h16l-8 5zm8 7h-16v-10l8 5 8-5v10z" />
            </svg>
          </a>
          {/* LinkedIn Icon */}
          <a
            href="https://www.linkedin.com/in/nouhayla-en-nadri-845778231/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full transition duration-300 ease-in-out hover:bg-secondary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.7 20h-2.7v-11.75h2.7v11.75zm-1.35-13.348c-.957 0-1.548-.656-1.548-1.482 0-.83.597-1.482 1.564-1.482.967 0 1.549.652 1.56 1.482 0 .826-.594 1.482-1.576 1.482zm13.35 13.348h-2.7v-5.413c0-1.29-.028-2.955-1.805-2.955-1.804 0-2.08 1.408-2.08 2.86v5.508h-2.7v-11.75h2.588v1.608h.037c.361-.684 1.248-1.41 2.569-1.41 2.745 0 3.252 1.805 3.252 4.153v7.4z" />
            </svg>
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
