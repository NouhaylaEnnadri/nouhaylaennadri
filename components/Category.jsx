import { getCategory } from "@/services";
import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";

// Define custom colors based on Tailwind CSS theme
const colors = ['primary', 'secondary', 'accent'];

const Category = () => {
  const [postCategories, setPostCategories] = useState([]);

  const fetchCategories = useCallback(async () => {
    try {
      const result = await getCategory();
      setPostCategories(result);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <nav className="flex flex-wrap gap-4 justify-start pb-2 text-xs">
      {postCategories.map(({ slug, name }, index) => {
        const colorClass = colors[index % colors.length]; // Cycle through primary, secondary, and accent
        return (
          <Link
            key={slug}
            href={`/category/${slug}`}
            className={`inline-block px-3 py-1 text-xs font-medium text-${colorClass} bg-${colorClass} bg-opacity-10 border border-${colorClass} border-opacity-30 rounded-lg transition-colors duration-300 hover:bg-${colorClass} hover:bg-opacity-20 hover:text-base-content`}
          >
            {name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Category;
