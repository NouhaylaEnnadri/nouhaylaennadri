import Link from "next/link";
import React, { useState } from "react";

const categories = [
  { name: "All", slug: "slug1" },
  { name: "Dev Web & Mobile", slug: "slug3" },
  { name: "AI Engineering", slug: "slug4" },
  { name: "Data Analytics", slug: "slug5" },
  { name: "Big Data", slug: "slug6" },
];

const Category = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0].slug);

  return (
      <nav className="flex gap-4 flex-wrap justify-start text-sm border-b border-gray-300 pb-2">
        {categories.map((category) => (
          <Link
            key={category.slug}
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
