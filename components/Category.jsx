import Link from "next/link";
import React, { useState } from "react";

const categories = [
  { name: "Category 1 Category 1", slug: "slug1" },
  { name: "Category 3", slug: "slug3" },
  { name: "Category Category 1 4", slug: "slug4" },
  { name: "Category 4", slug: "slug4" },
  { name: "Category 4", slug: "slug4" },
];

const Category = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0].slug);

  return (
    <div>
      <nav className="flex gap-2 flex-wrap justify-center text-base border-b border-gray-300 pb-2">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className={`px-3 py-2 font-semibold rounded-t-md transition duration-300 ${
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
    </div>
  );
};

export default Category;
