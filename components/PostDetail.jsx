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
    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md mb-6">
        <Image
          width={800} // Adjust width as needed
          height={400} // Adjust height as needed
          unoptimized
          src={post.featuredImage.url}
          alt={post.title} // Use the post title for alt text
          className="object-cover h-full w-full rounded-t-lg lg:rounded-lg"
        />
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex items-center mb-8">
          <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8">
            <Image
              unoptimized
              alt={post.author.name}
              width={32}
              height={32}
              className="align-middle rounded-full"
              src={post.author.photo.url}
            />
            <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">
              {post.author.name}
            </p>
          </div>
          <div className="font-medium text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline mr-2 text-pink-500"
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
            <span className="align-middle">
              {moment(post.createdAt).format("MMM DD, YYYY")}
            </span>
          </div>
        </div>
        <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
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
