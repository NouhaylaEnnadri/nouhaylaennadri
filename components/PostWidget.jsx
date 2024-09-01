import React, { useState, useEffect } from "react";
import Link from "next/link";
import moment from "moment";
import { getRecentPosts, getRelatedPosts } from "@/services";

const PostWidget = ({ category, slug }) => {
  const [widgetPosts, setWidgetPosts] = useState([]);

  useEffect(() => {
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
  }, [slug, category]);

  return (
    <div>
      {/* Recent Posts */}
      <div className="recent-posts">
        <h2 className="text-lg font-semibold mb-4 text-primary">
          {slug ? "Related Posts" : "Recent Posts"}
        </h2>
        {/* Remove default list styling */}
        <ul className="list-none space-y-4 p-0 m-0">
          {widgetPosts.map((post) => (
            <li key={post.node.slug}>
              <Link
                href={`/post/${post.node.slug}`}
                className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-100 transition-shadow"
              >
                <img
                  src={post.node.featuredImage.url}
                  alt={post.node.title}
                  className="w-10 h-10 object-cover rounded-md border border-gray-300"
                />
                <div className="flex-1">
                  <div className="text-blue-800 font-semibold">
                    {post.node.title}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {/* Display Category as a Smaller Tag in Green */}
                    {post.node.category && post.node.category.length > 0 && (
                      <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
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
