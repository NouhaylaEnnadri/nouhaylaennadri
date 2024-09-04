import React, { useState } from "react";
import Link from "next/link";
import DarkLight from "./DarkLight";

const categories = [
  { name: "Technology", slug: "technology" },
  { name: "Science", slug: "science" },
  { name: "Health", slug: "health" },
  { name: "Education", slug: "education" },
  { name: "Entertainment", slug: "entertainment" },
  { name: "Sports", slug: "sports" },
  { name: "Health", slug: "health" },
  { name: "Education", slug: "education" },
  { name: "Entertainment", slug: "entertainment" },
  { name: "Sports", slug: "sports" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) setIsCategoriesOpen(false); // Close categories if menu is opened
  };

  const toggleCategories = () => {
    setIsCategoriesOpen((prev) => !prev);
  };

  return (
    <>
      <nav className="border border-secondary backdrop-blur-2xl sticky top-0 z-50 shadow-md mx-6 my-2 rounded-xl">
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

            {/* Burger Menu */}
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
              onClick={toggleCategories}
              className="w-full text-left text-primary dark:text-secondary hover:bg-secondary dark:hover:bg-primary rounded-md px-3 py-2"
            >
              Categories
            </button>
            {isCategoriesOpen && (
              <div className="bg-gray-800 bg-opacity-90 py-6 mt-2">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="bg-primary dark:bg-secondary p-6 rounded-lg shadow-lg">
                    <ul className="flex flex-wrap gap-4">
                      {categories.map((category) => (
                        <li
                          key={category.slug}
                          className="bg-gray-700 hover:bg-gray-600 text-white text-center py-2 px-4 rounded-full cursor-pointer"
                        >
                          <Link href={`/category/${category.slug}`}>
                            {category.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Overlay below header (for desktop) */}
      {isCategoriesOpen && !isOpen && (
        <div className="relative bg-gray-800 bg-opacity-90 z-40 py-6">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-primary dark:bg-secondary p-6 rounded-lg shadow-lg">
              <ul className="flex flex-wrap gap-4">
                {categories.map((category) => (
                  <li
                    key={category.slug}
                    className="bg-gray-700 hover:bg-gray-600 text-white text-center py-2 px-4 rounded-full cursor-pointer"
                  >
                    <Link href={`/category/${category.slug}`}>
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
