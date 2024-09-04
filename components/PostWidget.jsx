import React, { useState, useEffect } from "react";
import Link from "next/link";
import moment from "moment";
import { getRecentPosts, getRelatedPosts } from "@/services";
import Image from "next/image";

/**
 * PostWidget Component
 * Displays a list of recent or related posts with clickable cards based on the slug.
 *
 * @param {string} [props.category] - Category to filter related posts (optional)
 * @param {string} [props.slug] - Slug of the current post to find related posts (optional)
 */
const PostWidget = ({ category, slug }) => {
  const [widgetPosts, setWidgetPosts] = useState([]);

  useEffect(() => {
    /**
     * Fetch posts based on the provided category or slug.
     * Sets the state with fetched posts.
     */
    const fetchPosts = async () => {
      try {
        let result;
        if (slug) {
          result = await getRelatedPosts(category, slug);
        } else {
          result = await getRecentPosts();
        }
        setWidgetPosts(result);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [slug, category]); // Fetch posts when slug or category changes

  return (
    <div className="p-4  rounded-lg backdrop-blur-md  ">
      {/* Recent or Related Posts Section */}
      <h2 className="text-xl font-bold mb-4 text-blue-400">
        {slug ? "Related Posts" : "Recent Posts"}
      </h2>
      {/* List of posts */}
      <ul className="list-none space-y-4 p-0 m-0">
        {widgetPosts.map((post) => (
          <li key={post.node.slug}>
            <Link
              href={`/post/${post.node.slug}`}
              className="flex items-start space-x-4 p-4 b rounded-lg transition-shadow hover:shadow-xl  "
            >
              {/* Post Image */}
              <Image
                width={48} // Adjust size as needed
                height={48} // Adjust size as needed
                unoptimized
                src={post.node.featuredImage.url}
                alt={post.node.title}
                className="w-12 h-12 object-cover rounded-md border border-gray-600"
              />
              <div className="flex-1">
                {/* Post Title */}
                <div className="text-white font-semibold text-lg">
                  {post.node.title}
                </div>
                <div className="flex items-center text-sm text-gray-400 mt-1">
                  {/* Display Category as a Tag */}
                  {post.node.category && post.node.category.length > 0 && (
                    <span
                      className={`inline-block ${getCategoryStyles(
                        post.node.category[0].name
                      )} text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700`}
                    >
                      {post.node.category[0].name}
                    </span>
                  )}
                  <span className="mx-2">•</span>
                  {/* Post Date */}
                  <span>
                    {moment(post.node.createdAt).format("MMM DD, YYYY")}
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {/* Link to See More Posts */}
      <div className="mt-4 text-center">
        <Link
          href="/posts"
          className="text-blue-400 hover:underline font-semibold dark:text-blue-300"
        >
          See More
        </Link>
      </div>
    </div>
  );
};

// Function to get category styles based on the category name
const getCategoryStyles = (category) => {
  switch (category.toLowerCase()) {
    case "default":
      return "bg-blue-100 text-blue-800 border-blue-400 dark:text-blue-400";
    case "dark":
      return "bg-gray-100 text-gray-800 border-gray-500 dark:text-gray-400";
    case "red":
      return "bg-red-100 text-red-800 border-red-400 dark:text-red-400";
    case "green":
      return "bg-green-100 text-green-800 border-green-400 dark:text-green-400";
    case "yellow":
      return "bg-yellow-100 text-yellow-800 border-yellow-300 dark:text-yellow-300";
    case "indigo":
      return "bg-indigo-100 text-indigo-800 border-indigo-400 dark:text-indigo-400";
    case "purple":
      return "bg-purple-100 text-purple-800 border-purple-400 dark:text-purple-400";
    case "pink":
      return "bg-pink-100 text-pink-800 border-pink-400 dark:text-pink-400";
    default:
      return "bg-gray-100 text-gray-800 border-gray-500 dark:text-gray-400";
  }
};

export default PostWidget;
