import {
  Author,
  Category,
  Comments,
  CommentsForm,
  PostDetail,
  PostWidget,
} from "@/components";
import { getPosts, getPostsDetails } from "@/services";
import React from "react";

const PostDetails = ({ post }) => {
  return (
    <>
      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            {/* Main Post Content */}
            <PostDetail post={post} />
            <Author author={post.author} />
            <CommentsForm slug={post.slug} />
            <Comments />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <PostWidget />
              <Category />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetails;

// Fetch data at build time
export async function getStaticProps(context) {
  const slug = context.params.slug;
  console.log(slug);
  const data = await getPostsDetails(slug);
  console.log(data);
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
