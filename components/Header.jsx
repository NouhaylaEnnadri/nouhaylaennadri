import React, { useState } from "react";
import Link from "next/link"; // Ensure you are importing Link for Next.js routing
import DarkLight from "./DarkLight"; // Importing DarkLight component

const categories = [
  { name: "category 1", slug: "slug1" },
  { name: "category 2", slug: "slug2" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTopicsOpen, setIsTopicsOpen] = useState(false);

  return (
    <nav className=" backdrop-blur-2xl sticky top-0 z-50 shadow-md mx-6 my-2 rounded-xl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {/* Title Logo */}
            <h1 className="text-2xl font-bold text-secondary">NOYL</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link
              href="#"
              className="text-primary dark:text-secondary hover:text-secondary"
            >
              Home
            </Link>
            <Link
              href="#"
              className="text-primary dark:text-secondary hover:text-secondary"
            >
              Reading List
            </Link>
            <div className="relative">
              <button
                onClick={() => setIsTopicsOpen(!isTopicsOpen)}
                className="text-primary dark:text-secondary hover:text-secondary focus:outline-none"
              >
                Categories
              </button>
              {isTopicsOpen && (
                <ul className="absolute bg-primary/90 dark:bg-secondary/90 backdrop-blur-md shadow-lg rounded-lg mt-2 py-2 w-40">
                  {categories.map((category) => (
                    <li
                      key={category.slug}
                      className="px-4 py-2 hover:bg-secondary dark:hover:bg-primary rounded-md"
                    >
                      <Link href={`/category/${category.slug}`}>
                        <span className="text-primary dark:text-secondary hover:text-secondary">
                          {category.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex-none">
              <DarkLight className="w-6 h-6" />
            </div>
          </div>

          {/* Burger Menu */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary dark:text-secondary focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-6 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="#"
              className="block text-primary dark:text-secondary hover:bg-secondary dark:hover:bg-primary rounded-md px-3 py-2"
            >
              Home
            </Link>
            <Link
              href="#"
              className="block text-primary dark:text-secondary hover:bg-secondary dark:hover:bg-primary rounded-md px-3 py-2"
            >
              Reading List
            </Link>
            <button
              onClick={() => setIsTopicsOpen(!isTopicsOpen)}
              className="w-full text-left text-primary dark:text-secondary hover:bg-secondary dark:hover:bg-primary rounded-md px-3 py-2"
            >
              Categories
            </button>
            {isTopicsOpen && (
              <ul className="bg-primary dark:bg-secondary shadow-lg rounded-lg mt-2 py-2">
                {categories.map((category) => (
                  <li
                    key={category.slug}
                    className="px-4 py-2 hover:bg-secondary dark:hover:bg-primary rounded-md"
                  >
                    <Link href={`/category/${category.slug}`}>
                      <span className="text-primary dark:text-secondary hover:text-secondary">
                        {category.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
