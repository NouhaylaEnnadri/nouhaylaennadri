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
        console.log(result);
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
        <ul className="space-y-4">
          {widgetPosts.map((post) => (
            <li
              key={post.node.slug}
              className="flex items-start space-x-4 p-4 border rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={post.node.featuredImage.url}
                alt={post.node.title}
                className="w-10 h-10 object-cover rounded-md border border-gray-300"
              />
              <div className="flex-1">
                <Link
                  href={`/post/${post.node.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  {post.node.title}
                </Link>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <span> {post.node.category.name}</span>
                  <span className="mx-2">•</span>
                  <span>
                    {moment(post.node.createdAt).format("MMM DD, YYYY")}
                  </span>
                </div>
              </div>
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
