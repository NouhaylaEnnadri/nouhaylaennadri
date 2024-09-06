import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import moment from "moment";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

// Dynamic import of SyntaxHighlighter for client-side only
const SyntaxHighlighter = dynamic(() =>
  import("react-syntax-highlighter").then((mod) => mod.Prism)
);

import materialDark from "react-syntax-highlighter/dist/cjs/styles/prism/material-dark";

const calculateReadingTime = (text) => {
  const wordsPerMinute = 200; // Average reading speed
  const words = text.split(/\s/).length;
  const minutes = words / wordsPerMinute;
  const roundedMinutes = Math.ceil(minutes);
  return roundedMinutes;
};

const PostDetail = ({ post }) => {
  // Access category (assuming it's an array and you want to display the first one)
  const category =
    post.category && post.category.length > 0
      ? post.category[0].name
      : "Uncategorized";

  // Calculate reading time
  const readingTime = calculateReadingTime(post.content);

  return (
    <div className="pb-12 mb-8 mx-28 px-4 lg:px-8">
      {/* Post Title */}
      <h1 className="mb-8 mx-24 text-4xl font-bold text-base-content ">
        {post.title}
      </h1>

      {/* Category and Date */}
      <div className="mb-6">
        {/* Category */}
        <div className=" mx-24 text-xs mb-2">
          <Link
            href={`/category/${post.category[0].id}`}
            className="inline-block px-2 py-0.5 text-xs font-medium text-base-content bg-accent bg-opacity-20 border border-accent rounded-md transition-colors duration-300 hover:bg-accent"
          >
            {category}
          </Link>
        </div>
        {/* Post Date and Reading Time */}
        <div className="flex mx-24 text-gray-500 text-sm gap-4">
          <span>Posted at {moment(post.createdAt).format("MMM DD, YYYY")}</span>
          <span>• {readingTime} min Read</span>
        </div>
      </div>

      {/* Featured Image */}
      <div className="mx-24 elative shadow-xlg overflow-hidden mb-12 rounded-lg">
        <Image
          width={800}
          height={400}
          unoptimized
          src={post.featuredImage.url}
          alt={post.title}
          className="object-cover h-full w-full rounded-lg"
        />
      </div>

      {/* Markdown Content with Syntax Highlighting */}
      <ReactMarkdown
        className="prose lg:prose-xl mx-auto p-6"
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
  );
};

export default PostDetail;
