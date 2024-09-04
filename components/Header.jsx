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
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-white">NOYL</h1>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-4 items-center">
              <Link
                href="#"
                className="text-white hover:text-primary transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                href="#"
                className="text-white hover:text-primary transition-colors duration-200"
              >
                Reading List
              </Link>
              <button
                onClick={toggleCategories}
                className="text-white hover:text-primary transition-colors duration-200 focus:outline-none"
              >
                Categories
              </button>
              <DarkLight className="w-6 h-6" />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="text-white focus:outline-none"
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
        <div className="md:hidden backdrop-blur-lg bg-white/10 dark:bg-gray-900/10 py-6">
          <div className="max-w-7xl mx-auto px-6">
            <div className="space-y-1">
              <Link
                href="#"
                className="block text-white hover:bg-primary hover:text-white transition-colors duration-200 rounded-md px-3 py-2"
              >
                Home
              </Link>
              <Link
                href="#"
                className="block text-white hover:bg-primary hover:text-white transition-colors duration-200 rounded-md px-3 py-2"
              >
                Reading List
              </Link>
              <button
                onClick={toggleCategories}
                className="w-full text-left text-white hover:bg-primary hover:text-white transition-colors duration-200 rounded-md px-3 py-2"
              >
                Categories
              </button>
              {isCategoriesOpen && (
                <div className="bg-gray-800 bg-opacity-70 mt-2 p-4 rounded-lg backdrop-blur-md">
                  <nav className="flex flex-wrap gap-2">
                    {postCategories.length > 0 ? (
                      postCategories.map((category, index) => {
                        const colorClasses = [
                          "bg-blue-100 text-blue-800 border-blue-400",
                          "bg-gray-100 text-gray-800 border-gray-500",
                          "bg-red-100 text-red-800 border-red-400",
                          "bg-green-100 text-green-800 border-green-400",
                          "bg-yellow-100 text-yellow-800 border-yellow-300",
                          "bg-indigo-100 text-indigo-800 border-indigo-400",
                          "bg-purple-100 text-purple-800 border-purple-400",
                          "bg-pink-100 text-pink-800 border-pink-400",
                        ];
                        const colorClass =
                          colorClasses[index % colorClasses.length];
                        return (
                          <Link
                            key={category.slug}
                            href={`/category/${category.slug}`}
                            className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-md border transition-colors duration-300 ${colorClass} hover:${colorClass}`}
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
        </div>
      )}

      {/* Overlay below header (for desktop) */}
      {isCategoriesOpen && !isOpen && (
        <div className="relative bg-gray-800 bg-opacity-70 z-40 py-6 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white/10 dark:bg-gray-900/10 p-6 rounded-lg shadow-lg backdrop-blur-md border border-white/10">
              <nav className="flex flex-wrap gap-4">
                {postCategories.length > 0 ? (
                  postCategories.map((category, index) => {
                    const colorClasses = [
                      "bg-blue-100 text-blue-800 border-blue-400",
                      "bg-gray-100 text-gray-800 border-gray-500",
                      "bg-red-100 text-red-800 border-red-400",
                      "bg-green-100 text-green-800 border-green-400",
                      "bg-yellow-100 text-yellow-800 border-yellow-300",
                      "bg-indigo-100 text-indigo-800 border-indigo-400",
                      "bg-purple-100 text-purple-800 border-purple-400",
                      "bg-pink-100 text-pink-800 border-pink-400",
                    ];
                    const colorClass =
                      colorClasses[index % colorClasses.length];
                    return (
                      <Link
                        key={category.slug}
                        href={`/category/${category.slug}`}
                        className={`px-2.5 py-0.5 text-xs font-medium rounded-md border transition-colors duration-300 ${colorClass} hover:${colorClass}`}
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
