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
    <nav className="flex gap-4 flex-wrap justify-start text-xs border-b border-gray-300 pb-2">
      {postCategories.map((category, index) => {
        return (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className={`hover:bg-secondary border-secondary bg-secondary bg-opacity-30 text-base-content  inline-block px-2.5 py-0.5 text-xs font-medium rounded-md border transition-colors duration-300  `}
          >
            {category.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Category;
