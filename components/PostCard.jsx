import { getCategoryByPost, getPosts } from "@/services";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const PostCard = ({ category }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let result;
        if (category) {
          result = await getCategoryByPost(category);
        } else {
          result = await getPosts();
        }
        setPosts(result);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [category]);

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Link
          key={post.node.slug}
          href={`/posts/${post.node.slug}`}
          passHref
          className="block"
        >
          <div className="p-4 border border-neutral-200 dark:border-neutral-700 bg-opacity-10 rounded-lg transition-transform transform hover:scale-105 hover:bg-opacity-20 cursor-pointer">
            {/* Featured Image */}
            <div className="relative mb-4">
              <Image
                unoptimized
                src={post.node.featuredImage.url}
                alt={post.node.title}
                className="w-full h-60 object-cover rounded-t-lg"
                width={600}
                height={400}
              />
            </div>

            {/* Tags */}
            <div className="mb-4 flex flex-wrap gap-2">
              {post.node.category.map((cat) => (
                <span
                  key={cat.slug}
                  className="px-3 py-1 text-xs font-medium text-primary bg-accent bg-opacity-10 rounded-md transition-colors duration-300 hover:bg-accent hover:text-neutral-content"
                >
                  {cat.name}
                </span>
              ))}
            </div>

            {/* Content */}
            <div>
              {/* Title */}
              <h1 className="text-2xl font-semibold text-neutral-content mb-4 hover:text-accent hover:text-opacity-70 transition-colors duration-300">
                {post.node.title}
              </h1>

              {/* Excerpt styled like a quote */}
              <blockquote className="border-l-4 border-accent pl-4 italic text-neutral mb-6">
                {post.node.excerpt}
              </blockquote>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostCard;
