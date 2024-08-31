import moment from "moment";
import Link from "next/link";
import React from "react";

const PostCard = ({ post }) => {
  return (
    <div className="dark-glass-container p-6 shadow-lg rounded-lg overflow-hidden mb-8 transition-transform transform hover:scale-105 border border-gray-700">
      {/* Featured Image */}
      <div className="relative mb-4">
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className="w-full h-60 object-cover rounded-t-lg"
        />
      </div>

      {/* Tags */}
      <div className="mb-4 flex flex-wrap gap-2">
        <span className="bg-gray-800 text-teal-300 text-sm font-medium rounded-full px-3 py-1">
          Tech
        </span>
        <span className="bg-gray-800 text-teal-300 text-sm font-medium rounded-full px-3 py-1">
          AI
        </span>
        <span className="bg-gray-800 text-teal-300 text-sm font-medium rounded-full px-3 py-1">
          Development
        </span>
      </div>

      {/* Content */}
      <div>
        {/* Title */}
        <h1 className="text-2xl font-semibold text-white mb-4 hover:text-teal-400 transition-colors duration-300">
          <Link href={`/post/${post.slug}`} passHref>
            {post.title}
          </Link>
        </h1>

        {/* Excerpt styled like a quote */}
        <blockquote className="border-l-4 border-teal-400 pl-4 italic text-gray-300 mb-6">
          {post.excerpt}
        </blockquote>

        {/* Author and Date */}
        <div className="flex items-center mb-4 text-gray-400 text-sm">
          <div className="flex items-center">
            <img
              src={post.author.photo.url}
              alt={post.author.name}
              className="w-8 h-8 rounded-full object-cover mr-2"
            />
            <div className="flex flex-col">
              <p className="font-medium">{post.author.name}</p>
              <span>{moment(post.createdAt).format("MMM DD, YYYY")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
