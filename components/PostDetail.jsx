import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import moment from "moment";
import dynamic from "next/dynamic";
import Image from "next/image";

// Dynamic import of SyntaxHighlighter for client-side only
const SyntaxHighlighter = dynamic(() =>
  import("react-syntax-highlighter").then((mod) => mod.Prism)
);

import materialDark from "react-syntax-highlighter/dist/cjs/styles/prism/material-dark";

const PostDetail = ({ post }) => {
  return (
    <div className="shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
      {/* Featured Image */}
      <div className="relative overflow-hidden shadow-md mb-6 rounded-t-lg">
        <Image
          width={800} 
          height={400} 
          unoptimized
          src={post.featuredImage.url}
          alt={post.title}
          className="object-cover h-full w-full rounded-t-lg lg:rounded-lg"
        />
      </div>

      {/* Post Meta and Author Info */}
      <div className="px-4 lg:px-0">
        <div className="flex items-center mb-8">
          {/* Author Information */}
          <div className="flex items-center">
            <Image
              unoptimized
              alt={post.author.name}
              width={40}
              height={40}
              className="rounded-full mr-4"
              src={post.author.photo.url}
            />
            <p className="text-gray-700 font-medium text-lg">{post.author.name}</p>
          </div>
          {/* Post Date */}
          <div className="ml-auto text-gray-500 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1 text-blue-500"
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

        {/* Post Title */}
        <h1 className="mb-8 text-4xl font-bold text-gray-800">{post.title}</h1>

        {/* Markdown Content with Syntax Highlighting */}
        <ReactMarkdown
          className="prose lg:prose-xl"
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  style={materialDark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default PostDetail;
