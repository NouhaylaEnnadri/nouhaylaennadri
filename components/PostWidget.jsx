import React, { useState, useEffect } from "react";
import Link from "next/link";
import moment from "moment";
import { getRecentPosts, getRelatedPosts } from "@/services";

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
    <div>
      {/* Recent or Related Posts Section */}
      <div className="recent-posts">
        <h2 className="text-lg font-semibold mb-4 text-primary">
          {slug ? "Related Posts" : "Recent Posts"}
        </h2>
        {/* List of posts */}
        <ul className="list-none space-y-4 p-0 m-0">
          {widgetPosts.map((post) => (
            <li key={post.node.slug}>
              <Link
                href={`/post/${post.node.slug}`}
                className="flex items-start space-x-4 p-4 border rounded-lg transition-shadow hover:shadow-lg"
              >
                {/* Post Image */}
                <img
                  src={post.node.featuredImage.url}
                  alt={post.node.title}
                  className="w-10 h-10 object-cover rounded-md border border-gray-300"
                />
                <div className="flex-1">
                  {/* Post Title */}
                  <div className="text-blue-800 font-semibold">
                    {post.node.title}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {/* Display Category as a Tag */}
                    {post.node.category && post.node.category.length > 0 && (
                      <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
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
            className="text-blue-600 hover:underline font-semibold"
          >
            See More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostWidget;
