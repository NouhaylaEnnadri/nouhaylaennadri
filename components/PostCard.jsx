import { getPosts } from "@/services";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const PostCard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await getPosts();
        setPosts(result);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="dark-glass-container p-6 shadow-lg rounded-lg overflow-hidden mb-8 transition-transform transform hover:scale-105 border border-gray-700">
      {posts.map((post) => (
        <div key={post.node.slug} className="mb-8">
          {/* Featured Image */}
          <div className="relative mb-4">
            <img
              src={post.node.featuredImage.url}
              alt={post.node.title}
              className="w-full h-60 object-cover rounded-t-lg"
            />
          </div>

          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            {post.node.category.map((cat) => (
              <span
                key={cat.slug}
                className="bg-gray-800 text-teal-300 text-sm font-medium rounded-full px-3 py-1"
              >
                {cat.name}
              </span>
            ))}
          </div>

          {/* Content */}
          <div>
            {/* Title */}
            <h1 className="text-2xl font-semibold text-white mb-4 hover:text-teal-400 transition-colors duration-300">
              <Link href={`/post/${post.node.slug}`} passHref>
                {post.node.title}
              </Link>
            </h1>

            {/* Excerpt styled like a quote */}
            <blockquote className="border-l-4 border-teal-400 pl-4 italic text-gray-300 mb-6">
              {post.node.excerpt}
            </blockquote>

            {/* Author and Date */}
            <div className="flex items-center mb-4 text-gray-400 text-sm">
              <div className="flex items-center">
                <img
                  src={post.node.author.photo.url}
                  alt={post.node.author.name}
                  className="w-8 h-8 rounded-full object-cover mr-2"
                />
                <div className="flex flex-col">
                  <p className="font-medium">{post.node.author.name}</p>
                  <span>{moment(post.node.createdAt).format("MMM DD, YYYY")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostCard;
