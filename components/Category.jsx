import { getCategory } from "@/services";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Category = () => {
  const [activeCategory, setActiveCategory] = useState("slug1"); // Default slug
  const [postCategories, setPostCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getCategory();
        console.log("Categories:", result);
        
        // Extract categories from the nested structure
        const categories = result.map((item) => item.node.category[0]);
        setPostCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array to fetch categories only once

  return (
    <nav className="flex gap-4 flex-wrap justify-start text-sm border-b border-gray-300 pb-2">
      {postCategories.length > 0 && postCategories.map((category, index) => (
        <Link
          key={index}
          href={`/category/${category.slug}`}
          className={`px-4 py-2 font-semibold rounded-t-md transition duration-300 ${
            activeCategory === category.slug
              ? "border-b-2 border-pink-600 text-pink-600"
              : "text-gray-700 hover:text-pink-600"
          }`}
          onClick={() => setActiveCategory(category.slug)}
        >
          {category.name}
        </Link>
      ))}
    </nav>
  );
};

export default Category;
