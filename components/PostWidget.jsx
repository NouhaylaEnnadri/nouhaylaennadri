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
        const result = slug
          ? await getRelatedPosts(category, slug)
          : await getRecentPosts();
        setWidgetPosts(result);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [slug, category]); // Fetch posts when slug or category changes

  const categoryStyles = [
    "bg-blue-200 text-blue-800 border-blue-400",
    "bg-gray-200 text-gray-800 border-gray-500",
    "bg-red-200 text-red-800 border-red-400",
    "bg-green-200 text-green-800 border-green-400",
    "bg-yellow-200 text-yellow-800 border-yellow-300",
    "bg-indigo-200 text-indigo-800 border-indigo-400",
    "bg-purple-200 text-purple-800 border-purple-400",
    "bg-pink-200 text-pink-800 border-pink-400",
  ];

  return (
    <div className="p-6 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-5 text-blue-500">
        {slug ? "Related Posts" : "Recent Posts"}
      </h2>
      <ul className="space-y-4">
        {widgetPosts.map((post) => (
          <li key={post.node.slug}>
            <Link
              href={`/post/${post.node.slug}`}
              className="flex items-start p-4 bg-gray-800 bg-opacity-30 rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <Image
                width={60} // Adjust size as needed
                height={60} // Adjust size as needed
                unoptimized
                src={post.node.featuredImage.url}
                alt={post.node.title}
                className="w-16 h-16 object-cover rounded-lg border border-gray-600"
              />
              <div className="ml-4 flex-1">
                <div className="text-white font-medium text-lg">
                  {post.node.title}
                </div>
                <div className="flex items-center text-sm text-gray-300 mt-1">
                  {post.node.category && post.node.category.length > 0 && (
                    <span
                      className={`inline-block ${categoryStyles[
                        post.node.category[0].name.length % categoryStyles.length
                      ]} px-3 py-1 font-medium rounded-lg border dark:bg-gray-700 dark:text-gray-400`}
                    >
                      {post.node.category[0].name}
                    </span>
                  )}
                  <span className="mx-2">•</span>
                  <span>
                    {moment(post.node.createdAt).format("MMM DD, YYYY")}
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-5 text-center">
        <Link
          href="/posts"
          className="text-blue-500 hover:underline font-semibold"
        >
          See More
        </Link>
      </div>
    </div>
  );
};

export default PostWidget;
