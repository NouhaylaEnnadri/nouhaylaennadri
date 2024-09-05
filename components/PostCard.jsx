import { getCategoryByPost, getPosts } from "@/services";
import moment from "moment";
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
          // Fetch posts by category if category is defined
          result = await getCategoryByPost(category);
        } else {
          // Fetch all posts if category is null
          result = await getPosts();
        }
        console.log(result);
        setPosts(result);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [category]);

  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <Link
          key={post.node.slug}
          href={`/posts/${post.node.slug}`}
          passHref
          className="block"
        >
          <div className="dark-glass-container p-6 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 border border-accent border-opacity-30 cursor-pointer">
            {/* Featured Image */}
            <div className="relative mb-4">
              <Image
                unoptimized
                src={post.node.featuredImage.url}
                alt={post.node.title}
                className="w-full h-60 object-cover rounded-t-lg"
                width={32} // Provide width as required
                height={32} // Provide height as required
              />
            </div>

            {/* Tags */}
            <div className="mb-4 flex flex-wrap gap-2">
              {post.node.category.map((cat) => (
                <span
                  key={cat.slug}
                  className="px-2.5 py-1 text-xs font-medium text-base-content bg-accent bg-opacity-15 rounded-md transition-colors duration-300 hover:bg-accent"
                >
                  {cat.name}
                </span>
              ))}
            </div>

            {/* Content */}
            <div>
              {/* Title */}
              <h1 className="text-2xl font-semibold text-base-content mb-4 hover:text-accent hover:text-opacity-30 transition-colors duration-300">
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
