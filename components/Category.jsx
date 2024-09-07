import { getCategory } from "@/services";
import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";

const Category = () => {
  // State to hold the list of post categories
  const [postCategories, setPostCategories] = useState([]);

  // Function to fetch categories from the API
  const fetchCategories = useCallback(async () => {
    try {
      const result = await getCategory();
      setPostCategories(result);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  // Fetch categories when the component mounts
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    // Navigation bar for displaying category links
    <nav className="flex flex-wrap gap-4 justify-start pb-2 text-xs">
      {postCategories.map(({ slug, name }) => (
        <Link
          key={slug}
          href={`/category/${slug}`} 
          className="inline-block px-3 py-1 text-xs font-medium border border-secondary border-opacity-30 rounded-lg transition-all duration-300 ease-in-out hover:bg-secondary hover:bg-opacity-10"
        >
          {name} 
        </Link>
      ))}
    </nav>
  );
};

export default Category;
