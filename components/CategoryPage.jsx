import { getCategory } from "@/services";
import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";

const CategoriesPage = () => {
  // State to store fetched categories
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

  // Fetch categories when component mounts
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    // Navigation bar displaying category links
    <nav className="flex flex-wrap gap-4 justify-start pb-2 text-xs">
      {postCategories.map(({ slug, name }) => (
        <Link
          key={slug} // Unique key for each category
          href={`/category/${slug}`} // Dynamic route for category pages
          className="inline-block px-2.5 py-1 text-xs font-medium text-base-content bg-accent bg-opacity-30 border border-accent rounded-md transition-colors duration-300 hover:bg-accent"
          // Styling for category links
        >
          {name} // Category name displayed as link text
        </Link>
      ))}
    </nav>
  );
};

export default CategoriesPage;
