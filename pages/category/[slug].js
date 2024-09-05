import { PostCard } from "@/components";
import { getCategoryByPost } from "@/services";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const CategoryPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  // State to store the fetched category data
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    if (slug) {
      console.log("Slug:", slug);

      // Fetch category by post using the slug
      getCategoryByPost(slug)
        .then((data) => {
          console.log("Fetched Category by Post:", data);
          setCategoryData(data); // Store the fetched data in state
        })
        .catch((error) => {
          console.error("Error fetching category by post:", error);
        });
    }
  }, [slug]); // Add 'slug' as a dependency

  return (
    <div className="rounded-lg mb-8 p-12 sm:mx-4">
      <PostCard category={slug} />
    </div>
  );
};

export default CategoryPage;
