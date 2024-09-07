/**
 * `CategoryPage` Component
 *
 * A Next.js page component that displays a category page. It includes a sidebar with categories, a main section that shows posts from the selected category, and a right sidebar widget displaying recent or related posts. The component uses `useRouter` to fetch the category slug from the URL query parameters.
 *
 * @returns {JSX.Element} The rendered `CategoryPage` component, including a grid layout with a sticky sidebar for categories, a main content area for posts, and a right sidebar for additional widgets.
 */
const CategoryPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div className="rounded-lg mb-8 p-12 sm:mx-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Section: Categories Sidebar */}
        <div className="lg:col-span-2 col-span-1 border-gray-300 lg:sticky lg:top-16">
          <div className="rounded-lg p-2 lg:sticky lg:top-16 backdrop-blur-md">
            <h2 className="text-base hidden lg:block font-semibold border-b border-secondary pb-2 mb-6">
              Topics
            </h2>
            <Category />
          </div>
        </div>

        {/* Main Content and Right Section */}
        <div className="lg:col-span-10 col-span-1 flex flex-col lg:flex-row gap-4">
          {/* Main Posts Section */}
          <div className="lg:w-3/5 p-2 sm:p-4 space-y-4">
            {/* Post Cards */}
            <PostCard category={slug} />
          </div>

          {/* Right Section: Post Widget */}
          <div className="bg-base-100 lg:w-2/5 hidden lg:block flex-col ">
            <div className="p-2 lg:sticky lg:top-16 rounded-lg mb-4">
              <PostWidget />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
