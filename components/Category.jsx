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

  return (
    <nav className="flex gap-4 flex-wrap justify-start text-sm border-b border-gray-300 pb-2">
      {postCategories.map((category) => (
        <Link
          key={category.slug}
          href={`/category/${category.slug}`}
          className="px-3 py-1 font-medium rounded-full bg-gray-200 text-gray-800 hover:bg-pink-600 hover:text-white transition duration-300 border border-gray-300 hover:border-pink-600"
        >
          {category.name}
        </Link>
      ))}
    </nav>
  );
};

export default Category;
