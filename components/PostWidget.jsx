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
    <div className=" rounded-lg ">
      <h2 className=" font-semibold text-base-content mb-4 pb-2 border-b border-accent ">
        {slug ? "Related Posts" : "Recent Posts"}
      </h2>
      <ul className="list-none space-y-4">
        {widgetPosts.map((post) => (
          <li key={post.node.slug}>
            <Link
              key={post.node.slug}
              href={`/posts/${post.node.slug}`}
              passHref
              className="block p-3 rounded-lg bg-accent bg-opacity-30 hover:bg-accent hover:bg-opacity-50 transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              <div className="flex flex-col">
                {/* Post Title */}
                <h3 className="text-md font-semibold text-base-content mb-1">
                  {post.node.title}
                </h3>
                {/* Post Description */}
                <p className="text-sm text-gray-400 mb-2">
                  {post.node.shortDescription}
                </p>
                <div className="flex items-center text-xs text-gray-400 space-x-2">
                  {/* Display Category as a Tag */}
                  {post.node.category && post.node.category.length > 0 && (
                    <span className="inline-block text-xs font-medium px-2 py-0.5 text-accent  rounded">
                      {post.node.category[0].name}
                    </span>
                  )}
                  {/* Post Date */}
                  <span className="ml-2 text-gray-500">
                    {moment(post.node.createdAt).format("MMM DD, YYYY")}
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostWidget;
