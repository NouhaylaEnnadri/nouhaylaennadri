import { Category, PostCard, PostWidget } from "@/components";

const posts = [
  { title: "test", excerpt: "test" },
  { title: "test2", excerpt: "test2" },
];
export default function Home() {
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post) => (
            <PostCard key={post.index} post={post} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Category />
          </div>
        </div>
      </div>
    </div>
  );
}
