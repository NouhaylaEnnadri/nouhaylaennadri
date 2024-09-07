/**
 * `PostDetail` Component
 *
 * A React component that displays the detailed view of a blog post. It includes the post's title, categories, date, reading time, featured image, and content formatted with Markdown. Syntax highlighting is provided for code blocks within the content.
 *
 * @param {Object} props - The properties object.
 * @param {Object} props.post - The blog post data.
 * @param {string} props.post.title - The title of the post.
 * @param {Array<Object>} props.post.category - An array of category objects associated with the post.
 * @param {string} props.post.category.id - The unique identifier of the category.
 * @param {string} props.post.category.name - The name of the category.
 * @param {string} props.post.createdAt - The creation date of the post in ISO format.
 * @param {Object} props.post.featuredImage - The featured image of the post.
 * @param {string} props.post.featuredImage.url - The URL of the featured image.
 * @param {string} props.post.content - The Markdown content of the post.
 *
 * @returns {JSX.Element} The rendered `PostDetail` component displaying the post details.
 */
const PostDetail = ({ post }) => {
  // Calculate reading time
  const readingTime = calculateReadingTime(post.content);

  return (
    <div className="pb-12 mb-8 mx-6 sm:mx-6 lg:mx-28 px-0 sm:px-0 lg:px-4">
      {/* Post Title */}
      <h1 className="mb-8 mx-6 sm:mx-6 lg:mx-24 text-4xl font-bold text-base-content">
        {post.title}
      </h1>

      {/* Categories and Date */}
      <div className="mb-6">
        {/* Categories */}
        <div className="mx-6 sm:mx-6 lg:mx-24 text-xs mb-2">
          {post.category && post.category.length > 0 ? (
            post.category.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.id}`}
                className="inline-block px-2 py-0.5 text-xs font-medium text-base-content bg-secondary bg-opacity-20 border border-secondary rounded-md transition-colors duration-300 hover:bg-secondary mr-2 mb-2"
              >
                {cat.name}
              </Link>
            ))
          ) : (
            <span>Uncategorized</span>
          )}
        </div>
        {/* Post Date and Reading Time */}
        <div className="flex mx-6 sm:mx-6 lg:mx-24 text-gray-500 text-sm gap-4">
          <span>Posted at {moment(post.createdAt).format("MMM DD, YYYY")}</span>
          <span>• {readingTime} min Read</span>
        </div>
      </div>

      {/* Featured Image */}
      <div className="mx-6 sm:mx-6 lg:mx-24 relative shadow-xlg overflow-hidden mb-12 rounded-lg">
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
        className="prose lg:prose-xl mx-auto p-6 sm:p-6 lg:p-6"
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
