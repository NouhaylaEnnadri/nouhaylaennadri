import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import DarkLight from "./DarkLight";
import { getCategory } from "@/services";

import "@fontsource/orbitron";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [postCategories, setPostCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getCategory();
        setPostCategories(result);
      } catch (error) {
        console.error("Error fetchingTopics:", error);
      }
    };

    fetchCategories();
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      setIsCategoriesOpen(false);
    }
  }, [isOpen]);

  const toggleCategories = useCallback(() => {
    setIsCategoriesOpen((prev) => !prev);
  }, []);

  return (
    <>
      <nav className="border border-white/10 rounded-lg mt-4 mx-4 sm:mx-6 md:mx-8 lg:mx-12 backdrop-blur-md bg-white/10 dark:bg-gray-900/10 shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
          <Link href="/" passHref>
            <h1 className="mx-6 text-2xl font-bold font-[Orbitron] text-transparent bg-clip-text bg-secondary cursor-pointer">
              <span className="text-secondary">N</span>OYL
            </h1>
          </Link>

          <div className="mx-6 hidden md:flex space-x-4 items-center">
            <Link
              href="/posts"
              passHref
              className="text-base-content hover:text-secondary transition-colors duration-200"
            >
              Posts
            </Link>
            <Link
              href="/notes"
              passHref
              className="text-base-content hover:text-secondary transition-colors duration-200"
            >
              notes
            </Link>
            <Link
              href="/soon/comingsoon"
              passHref
              className="text-base-content hover:text-secondary transition-colors duration-200"
            >
              Projects
            </Link>

            <DarkLight className="w-2 h-2" />
          </div>

          <div className="md:hidden flex items-center">
            <DarkLight className="w-3 h-3 ml-2" />
            <button
              onClick={toggleMobileMenu}
              className="text-base-content focus:outline-none"
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
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden mx-4 rounded-2xl my-3 bg-base-300 backdrop-blur-lg py-6">
          <div className="max-w-7xl mx-auto px-6 space-y-2">
            <Link
              href="/posts"
              passHref
              className="block text-base-content hover:bg-secondary hover:bg-opacity-30 hover:text-secondary transition-colors duration-200 rounded-md px-3 py-2"
            >
              Posts
            </Link>
            {/* <Link
              href="/notes"
              passHref
              className="block text-base-content hover:bg-secondary hover:bg-opacity-30 hover:text-secondary transition-colors duration-200 rounded-md px-3 py-2"
            >
              Notes
            </Link> */}
            <Link
              href="/soon/comingsoon"
              passHref
              className="block text-base-content hover:bg-secondary hover:bg-opacity-30 hover:text-secondary transition-colors duration-200 rounded-md px-3 py-2"
            >
              Projects
            </Link>
            {isCategoriesOpen && (
              <div className="bg-base bg-opacity-70 mt-2 p-4 rounded-lg backdrop-blur-md">
                <nav className="flex flex-wrap gap-2">
                  {postCategories.length > 0 ? (
                    postCategories.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/category/${category.slug}`}
                        className="border-secondary bg-secondary bg-opacity-30 text-base-content inline-block px-2.5 py-0.5 text-xs font-medium rounded-md border transition-colors duration-300"
                      >
                        {category.name}
                      </Link>
                    ))
                  ) : (
                    <p className="text-center text-gray-400">
                      No Topics Available
                    </p>
                  )}
                </nav>
              </div>
            )}
          </div>
        </div>
      )}

      {isCategoriesOpen && !isOpen && (
        <div className="relative z-40 py-6 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white/10 dark:bg-gray-900/10 p-6 rounded-lg shadow-lg backdrop-blur-md border border-white/10">
              <nav className="flex flex-wrap gap-4">
                {postCategories.length > 0 ? (
                  postCategories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/category/${category.slug}`}
                      className="border-secondary bg-secondary bg-opacity-30 text-base-content inline-block px-2.5 py-0.5 text-xs font-medium rounded-md border transition-colors duration-300"
                    >
                      {category.name}
                    </Link>
                  ))
                ) : (
                  <p className="text-center text-gray-400">
                    No Topics Available
                  </p>
                )}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
