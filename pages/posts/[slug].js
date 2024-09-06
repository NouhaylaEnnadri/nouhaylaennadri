import React, { useState } from "react";
import {
  Author,
  Comments,
  CommentsForm,
  PostDetail,
  PostWidget,
} from "@/components";
import { getPosts, getPostsDetails } from "@/services";
import Category from "@/components/Category"; // Import the Category component
import { FaShareAlt, FaCommentAlt } from "react-icons/fa"; // Import icons from react-icons

const PostDetails = ({ post }) => {
  const [newComment, setNewComment] = useState(null);
  const [showComments, setShowComments] = useState(false);

  const handleNewComment = (comment) => {
    setNewComment(comment);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const slug = post.slug;
  const category = post.category;
  const comments = post.comments || []; // Provide default empty array
  const commentsCount = comments.length; // Now it's safe to use length

  // Function to calculate reading time
  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200; // Average reading speed
    const textLength = content.split(/\s+/).length;
    const minutes = Math.ceil(textLength / wordsPerMinute);
    return minutes;
  };

  const readingTime = calculateReadingTime(post.content);

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Categories */}
        <div className="text-center mb-8">
          <Category />
        </div>

        {/* Main Post Content */}
        <div className="mb-12 w-full bg-white shadow-lg rounded-lg p-8">
          <PostDetail post={post} />
          <div className="text-right text-gray-500 text-sm mt-4">
            {readingTime} min read
          </div>
        </div>

        {/* Action Buttons and Comments Section */}
        <div className="flex flex-col items-center mt-12">
          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            <button 
              className="flex items-center px-4 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50" 
              disabled
            >
              <FaShareAlt className="mr-2" />
              Share
            </button>
            <button 
              className="flex items-center px-4 py-2 text-gray-500 hover:text-gray-700" 
              onClick={toggleComments}
            >
              <FaCommentAlt className="mr-2" />
              {commentsCount}
            </button>
          </div>

          {/* Comments Section */}
          {showComments && (
            <div className="w-full lg:w-2/3 p-6 rounded-lg shadow-md bg-white mb-12">
              <CommentsForm slug={slug} onNewComment={handleNewComment} />
              <Comments slug={slug} newComment={newComment} />
            </div>
          )}

          {/* Author Section */}
          <Author author={post.author} />
        </div>

        {/* Related Posts Section */}
        <div className="w-full lg:w-1/3 bg-white shadow-md rounded-lg p-6 mt-12">
          <h3 className="text-2xl font-bold mb-6">Related Posts</h3>
          <div className="flex flex-col gap-4">
            {/* Render related posts */}
            <PostWidget slug={post.slug} category={category} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;

// Fetch data at build time
export async function getStaticProps(context) {
  const slug = context.params.slug;
  const data = await getPostsDetails(slug);

  return {
    props: { post: data },
  };
}

export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}
