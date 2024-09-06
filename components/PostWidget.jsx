import React, { useState, useEffect } from "react";
import Link from "next/link";
import moment from "moment";
import { getRecentPosts, getRelatedPosts } from "@/services";

const PostWidget = ({ category, slug }) => {
  const [widgetPosts, setWidgetPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        let result;
        if (slug) {
          const categorySlugs = category.map(cat => cat.slug);
          result = await getRelatedPosts(categorySlugs, slug);
          console.log("Related Posts Result:", result);
        } else {
          result = await getRecentPosts();
          console.log("Recent Posts Result:", result);
        }

        // Check if result is an array and map it accordingly
        if (result && result.length) {
          setWidgetPosts(result.map(edge => edge.node || edge));
        } else {
          console.error("Unexpected result format:", result);
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [slug, category]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts: {error.message}</p>;

  return (
    <div className="rounded-lg">
      <h2 className="font-semibold text-base-content mb-4 pb-2 border-b border-accent">
        {slug ? "Related Posts" : "Recent Posts"}
      </h2>
      <ul className="list-none space-y-4">
        {widgetPosts.length > 0 ? (
          widgetPosts.map((post, index) => (
            <li key={post.slug || index}>
              <Link
                href={`/posts/${post.slug}`}
                passHref
                className="block p-3 rounded-lg bg-accent bg-opacity-30 hover:bg-accent hover:bg-opacity-50 transition-transform transform hover:scale-105 hover:shadow-lg"
              >
                <div className="flex flex-col">
                  {/* Post Title */}
                  <h3 className="text-md font-semibold text-base-content mb-1">
                    {post.title}
                  </h3>
                  {/* Post Description */}
                  <p className="text-sm text-gray-400 mb-2">
                    {post.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-1 items-center text-xs text-gray-400">
                    {/* Display Categories as Tags */}
                    {post.category && post.category.length > 0 && (
                      post.category.map((cat, idx) => (
                        <span
                          key={idx}
                          className="inline-block text-xs font-medium px-2 py-0.5 text-accent rounded"
                        >
                          {cat.name}
                        </span>
                      ))
                    )}
                    {/* Post Date */}
                    <span className="ml-2 text-gray-500">
                      {moment(post.createdAt).format("MMM DD, YYYY")}
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </ul>
    </div>
  );
};

export default PostWidget;
