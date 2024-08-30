import React from "react";
import Link from "next/link";

// Example data for recent posts
const recentPosts = [
  {
    title: "Understanding React Hooks",
    slug: "understanding-react-hooks",
    author: {
      name: "John Doe",
      image: "https://via.placeholder.com/40", // Placeholder image URL
    },
    date: "August 30, 2024",
  },
  {
    title: "Getting Started with Next.js",
    slug: "getting-started-nextjs",
    author: {
      name: "Jane Smith",
      image: "https://via.placeholder.com/40", // Placeholder image URL
    },
    date: "August 29, 2024",
  },
  {
    title: "Advanced Tailwind CSS Techniques",
    slug: "advanced-tailwind-css",
    author: {
      name: "Alice Johnson",
      image: "https://via.placeholder.com/40", // Placeholder image URL
    },
    date: "August 28, 2024",
  },
  {
    title: "AI in Web Development",
    slug: "ai-web-development",
    author: {
      name: "Bob Brown",
      image: "https://via.placeholder.com/40", // Placeholder image URL
    },
    date: "August 27, 2024",
  },
];

const AdjacentPostCard = () => {
  return (
    <div className="">
      {/* Search Bar */}
      <label className="input input-bordered input-secondary flex items-center gap-2 mb-4">
        <input type="text" className="grow" placeholder="Search" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>

      {/* Recent Posts */}
      <div className="recent-posts">
        <h2 className="text-lg font-semibold mb-2 text-primary">Recent Posts</h2>
        <ul className="space-y-4">
          {recentPosts.map((post) => (
            <li key={post.slug} className="flex items-start space-x-4 p-4 border rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow">
              <img
                src={post.author.image}
                alt={post.author.name}
                className="w-10 h-10 rounded-full border border-gray-300"
              />
              <div className="flex-1">
                <Link href={`/posts/${post.slug}`}>
                  {post.title}
                </Link>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <span>by {post.author.name}</span>
                  <span className="mx-2">•</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdjacentPostCard;
