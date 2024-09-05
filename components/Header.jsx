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
      <nav className="border border-white/10 rounded-lg mt-4 mx-4 sm:mx-6 backdrop-blur-md bg-white/10 dark:bg-gray-900/10 shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
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
              />
            </svg>
            <span className="text-xl font-semibold">NOYL</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link
              href="#"
              className="text-base-content hover:text-primary transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="#"
              className="text-base-content hover:text-primary transition-colors duration-200"
            >
              Reading List
            </Link>
            <button
              onClick={toggleCategories}
              className="text-base-content hover:text-primary transition-colors duration-200 focus:outline-none"
            >
              Categories
            </button>
            <DarkLight className="w-6 h-6" />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
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

      {/* Mobile Menu Content */}
      {isOpen && (
        <div className="md:hidden mx-4 rounded-2xl my-3 bg-base-300 backdrop-blur-lg py-6">
          <div className="max-w-7xl mx-auto px-6 space-y-2">
            <Link
              href="#"
              className="block text-base-content hover:bg-secondary hover:bg-opacity-30 hover:text-secondary transition-colors duration-200 rounded-md px-3 py-2"
            >
              Home
            </Link>
            <Link
              href="#"
              className="block text-base-content hover:bg-secondary hover:bg-opacity-30 hover:text-secondary transition-colors duration-200 rounded-md px-3 py-2"
            >
              Reading List
            </Link>
            <button
              onClick={toggleCategories}
              className="w-full text-left text-base-content hover:bg-secondary hover:bg-opacity-30 hover:text-secondary transition-colors duration-200 rounded-md px-3 py-2"
            >
              Categories
            </button>
            {isCategoriesOpen && (
              <div className="bg-base bg-opacity-70 mt-2 p-4 rounded-lg backdrop-blur-md">
                <nav className="flex flex-wrap gap-2">
                  {postCategories.length > 0 ? (
                    postCategories.map((category, index) => {
                      return (
                        <Link
                          key={category.slug}
                          href={`/category/${category.slug}`}
                          className={` border-secondary bg-secondary bg-opacity-30 text-base-content  inline-block px-2.5 py-0.5 text-xs font-medium rounded-md border transition-colors duration-300  `}
                        >
                          {category.name}
                        </Link>
                      );
                    })
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
      )}

      {/* Overlay below header (for desktop) */}
      {isCategoriesOpen && !isOpen && (
        <div className="relative z-40 py-6 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white/10 dark:bg-gray-900/10 p-6 rounded-lg shadow-lg backdrop-blur-md border border-white/10">
              <nav className="flex flex-wrap gap-4">
                {postCategories.length > 0 ? (
                  postCategories.map((category, index) => {
                  
                    return (
                      <Link
                        key={category.slug}
                        href={`/category/${category.slug}`}
                        className={` border-secondary bg-secondary bg-opacity-30 text-base-content  inline-block px-2.5 py-0.5 text-xs font-medium rounded-md border transition-colors duration-300  `}
                        >
                        {category.name}
                      </Link>
                    );
                  })
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
