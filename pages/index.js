import { AdjacentPostCard, Category, Hero, PostCard } from "@/components";
import { getPosts } from "@/services";

export default function Home({ posts }) {
  // Divide posts into two for the main section and one for the adjacent section
  const mainPosts = posts.slice(0, 3);
  const adjacentPost = posts.slice(3, 4)[0]; // Get the fourth post for the adjacent section

  return (
    <>
      <Hero />

      <div className="border-t border-gray-300 mt-4 mb-8 mx-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Category Section */}
          <div className="lg:col-span-2 col-span-1 border-r border-gray-300 pr-4">
            <div className="sticky top-16 h-screen p-4 bg-white">
              <div className="border-b border-gray-300 pb-4 mb-4">
                <h2 className="text-lg font-semibold">Topics</h2>
              </div>
              <Category />
            </div>
          </div>

          {/* Main Posts Section */}
          <div className="lg:col-span-6 col-span-1 border-r border-gray-300 p-6">
            {/* Post Cards */}
            {mainPosts.map((post) => (
              <PostCard key={post.node.id} post={post.node} />
            ))}
          </div>

          {/* Adjacent Post Card Section */}
          <div className="lg:col-span-4 col-span-1">
            <div className="sticky top-16 h-screen p-6 bg-white border-l border-gray-300">
              <div className="border-b border-gray-300 pb-4 mb-4">
                <h2 className="text-lg font-semibold"></h2>
              </div>
              <div className="space-y-6">
                <AdjacentPostCard post={adjacentPost?.node} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  return {
    props: { posts },
  };
}
