import React, { useEffect, useState } from "react";
import Link from "next/link";
import DarkLight from "./DarkLight";
import { getCategory } from "@/services";

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
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const toggleMobileMenu = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      setIsCategoriesOpen(false); // Close categories if menu is opened
    }
  };

  const toggleCategories = () => {
    setIsCategoriesOpen((prev) => !prev);
  };

  return (
    <>
      {/* Navigation bar */}
      <nav className="border border-secondary backdrop-blur-md bg-white/30 dark:bg-gray-800/30 sticky top-0 z-50 shadow-lg mx-6 my-2 rounded-xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-secondary">NOYL</h1>

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
              <button
                onClick={toggleCategories}
                className="text-primary dark:text-secondary hover:text-secondary focus:outline-none"
              >
                Categories
              </button>
              <DarkLight className="w-6 h-6" />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
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
      </nav>

      {/* Mobile Menu Content */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 bg-opacity-90 py-6">
          <div className="max-w-7xl mx-auto px-6">
            <div className="space-y-1">
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
                onClick={toggleCategories}
                className="w-full text-left text-primary dark:text-secondary hover:bg-secondary dark:hover:bg-primary rounded-md px-3 py-2"
              >
                Categories
              </button>
              {isCategoriesOpen && (
                <div className="bg-gray-800 bg-opacity-90 mt-2 p-4 rounded-lg">
                  <nav className="flex flex-wrap gap-2">
                    {postCategories.length > 0 ? (
                      postCategories.map((category) => (
                        <Link
                          key={category.slug}
                          href={`/category/${category.slug}`}
                          className="inline-block px-3 py-1 font-medium rounded-full bg-gray-200 text-gray-800 hover:bg-pink-600 hover:text-white transition duration-300 border border-gray-300 hover:border-pink-600"
                        >
                          {category.name}
                        </Link>
                      ))
                    ) : (
                      <p className="text-center text-gray-400">
                        No Categories Available
                      </p>
                    )}
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Overlay below header (for desktop) */}
      {isCategoriesOpen && !isOpen && (
        <div className="relative bg-gray-800 bg-opacity-90 z-40 py-6">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-primary dark:bg-secondary p-6 rounded-lg shadow-lg">
              <nav className="flex flex-wrap gap-4">
                {postCategories.length > 0 ? (
                  postCategories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/category/${category.slug}`}
                      className="px-3 py-1 font-medium rounded-full bg-gray-200 text-gray-800 hover:bg-pink-600 hover:text-white transition duration-300 border border-gray-300 hover:border-pink-600"
                    >
                      {category.name}
                    </Link>
                  ))
                ) : (
                  <p className="text-center text-gray-400">
                    No Categories Available
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
