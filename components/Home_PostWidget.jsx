"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import moment from "moment";
import { getRecentPosts, getRelatedPosts } from "@/services";

const Home_PostWidget = ({ category, slug }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRelated, setShowRelated] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        let result;

        if (slug) {
          const categorySlugs = (category || []).map((cat) => cat.slug);
          result = await getRelatedPosts(categorySlugs, slug);

          if (!result || result.length === 0) {
            setShowRelated(false);
            result = await getRecentPosts();
          }
        } else {
          result = await getRecentPosts();
          setShowRelated(false);
        }

        if (result && result.length) {
          setPosts(result.map((edge) => edge.node || edge));
        }
      } catch (err) {
        setError(err);
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [slug, category]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts: {error.message}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 ">
     <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-10">
       See What I Have to Say
      </h2>
      {/* ← switch from vertical list to a simple grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <Link
              key={post.slug || index}
              href={`/posts/${post.slug}`}
              className="block p-4 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-transform hover:scale-[1.01] hover:shadow-lg border border-white/10 h-full"
            >
              <div className="flex flex-col h-full">
                {/* Title */}
                <h3 className="text-md font-semibold text-base-content mb-1">
                  {post.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400 mb-3">
                  {post.shortDescription}
                </p>

                {/* Tags + Date pinned to bottom for equal heights */}
                <div className="mt-auto flex flex-wrap gap-1 items-center text-xs text-gray-400">
                  {post.category?.length > 0 &&
                    post.category.map((cat, idx) => (
                      <span
                        key={idx}
                        className="inline-block text-xs font-medium px-2 py-0.5 border border-gray-400 rounded-md"
                      >
                        #{cat.name}
                      </span>
                    ))}
                  <span className="ml-2 text-gray-500">
                    {moment(post.createdAt).format("MMM DD, YYYY")}
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default Home_PostWidget;
