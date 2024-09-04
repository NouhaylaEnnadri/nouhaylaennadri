import { getCategory } from "@/services";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Category = () => {
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

  const categoryStyles = [
    "bg-blue-100 text-blue-800 border-blue-400",
    "bg-gray-100 text-gray-800 border-gray-500",
    "bg-red-100 text-red-800 border-red-400",
    "bg-green-100 text-green-800 border-green-400",
    "bg-yellow-100 text-yellow-800 border-yellow-300",
    "bg-indigo-100 text-indigo-800 border-indigo-400",
    "bg-purple-100 text-purple-800 border-purple-400",
    "bg-pink-100 text-pink-800 border-pink-400",
  ];

  return (
    <nav className="flex gap-4 flex-wrap justify-start text-xs border-b border-gray-300 pb-2">
      {postCategories.map((category, index) => {
        const colorClasses = categoryStyles[index % categoryStyles.length];
        return (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className={`px-2.5 py-0.5 font-medium rounded border dark:bg-gray-700 dark:text-gray-400 
              hover:${colorClasses} transition-colors duration-300`}
          >
            {category.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Category;
