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

const PostDetails = ({ post }) => {
  const [newComment, setNewComment] = useState(null);

  const handleNewComment = (comment) => {
    setNewComment(comment);
  };

  const slug = post.slug;
  const category = post.category;

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Categories */}
        <Category />

        {/* Main Post Content */}
        <div className="mb-12 w-full shadow-lg rounded-lg p-8 ">
          <PostDetail post={post} />
        </div>

        {/* Flex Container for Comments and Related Posts */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Comments Section */}
          <div className="flex-1  p-6 rounded-lg shadow-md">
            <CommentsForm slug={slug} onNewComment={handleNewComment} />
            <Comments slug={slug} newComment={newComment} />
          </div>

          {/* Related Posts Section */}
          <div className="w-full lg:w-1/3">
            <h3 className="text-2xl font-bold mb-6">Related Posts</h3>
            <div className="flex flex-col gap-4">
              {/* Render related posts */}
              <PostWidget slug={post.slug} category={category} />
            </div>
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
