import moment from "moment";
import Link from "next/link";
import React from "react";

const PostCard = ({ post }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8 transition-transform transform hover:scale-105 border border-gray-200">
      {/* Featured Image */}
      <div className="relative">
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className="w-full h-60 object-cover rounded-t-lg"
        />
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-4 hover:text-pink-600 transition-colors duration-300">
          <Link href={`/post/${post.slug}`} passHref>
            {post.title}
          </Link>
        </h1>
        
        {/* Author and Date */}
        <div className="flex items-center justify-between mb-4 text-gray-600 text-sm">
          <div className="flex items-center">
            <img
              src={post.author.photo.url}
              alt={post.author.name}
              className="w-8 h-8 rounded-full object-cover mr-2"
            />
            <p className="font-medium">{post.author.name}</p>
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-pink-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{moment(post.createdAt).format("MMM DD, YYYY")}</span>
          </div>
        </div>
        
        {/* Excerpt */}
        <p className="text-gray-700 mb-6">{post.excerpt}</p>
        
        {/* Read More Button */}
        <div className="text-center">
          <Link href={`/post/${post.slug}`} passHref>
            <span className="inline-block bg-pink-600 text-white text-lg font-medium rounded-full px-6 py-3 transition-transform transform hover:scale-105 cursor-pointer">
              Continue Reading
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
