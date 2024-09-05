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
    <div className="p-2 rounded-lg shadow-md">
      {/* Recent or Related Posts Section */}
      <h2 className="text-lg font-semibold text-base-content mb-3">
        {slug ? "Related Posts" : "Recent Posts"}
      </h2>
      {/* List of posts */}
      <ul className="list-none space-y-3 p-0">
        {widgetPosts.map((post) => (
          <li key={post.node.slug}>
            <Link
              href={`/post/${post.node.slug}`}
              className="flex items-start space-x-3 p-3 rounded-lg bg-secondary bg-opacity-20 transition-transform transform hover:scale-105 hover:shadow-md"
            >
              {/* Post Image */}
              <Image
                width={60} // Adjust width as needed
                height={45} // Adjust height as needed
                unoptimized
                src={post.node.featuredImage.url}
                alt={post.node.title}
                className="w-16 h-12 object-cover rounded-md border border-gray-600"
              />
              <div className="flex-1">
                {/* Post Title */}
                <h3 className="text-sm font-semibold text-white mb-1">
                  {post.node.title}
                </h3>
                {/* Post Description */}
                <p className="text-xs text-gray-300 mb-1">
                  {post.node.excerpt}
                </p>
                <div className="flex items-center text-xs text-gray-500">
                  {/* Display Category as a Tag */}
                  {post.node.category && post.node.category.length > 0 && (
                    <span className="inline-block text-xs font-medium px-2 py-0.5 bg-blue-600 text-white rounded">
                      {post.node.category[0].name}
                    </span>
                  )}
                  <span className="mx-1">•</span>
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
    </div>
  );
};

export default PostWidget;
