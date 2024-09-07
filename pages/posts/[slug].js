/**
 * `PostDetails` Component
 *
 * A Next.js page component that displays the details of a single post, along with related posts, comments, and comment functionality. It also provides options to copy the post's URL and toggle the comments section. The component manages local state for new comments, comment visibility, and comment count, and includes functionality for copying the link to the clipboard with a popup notification.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.post - The post object containing details like slug, category, and content.
 * @param {number} props.initialCommentCount - The initial number of comments for the post.
 *
 * @returns {JSX.Element} The rendered `PostDetails` component, including the post content, interaction buttons, related posts or comments section, and a popup notification for copying the post link.
 */
const PostDetails = ({ post, initialCommentCount }) => {
  const [newComment, setNewComment] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [commentCount, setCommentCount] = useState(initialCommentCount);
  const [showPopup, setShowPopup] = useState(false);
  const [hasRelatedPosts, setHasRelatedPosts] = useState(true);

  /**
   * Handles adding a new comment and updates the comment count.
   *
   * @param {Object} comment - The new comment object.
   */
  const handleNewComment = (comment) => {
    setNewComment(comment);
    setCommentCount((prevCount) => prevCount + 1); // Update comment count
  };

  /**
   * Toggles the visibility of the comments section.
   */
  const handleToggleComments = () => {
    setShowComments((prev) => !prev);
  };

  /**
   * Copies the current post URL to the clipboard and displays a popup notification.
   */
  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 2000); // Popup duration
      })
      .catch((err) => {
        console.error("Failed to copy the link: ", err);
      });
  };

  const slug = post.slug;
  const category = post.category;

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Main Post Content */}
        <div className="mb-12">
          <PostDetail post={post} />
        </div>

        {/* Interaction Navbar at the Bottom */}
        <div className="mx-6 sm:mx-12 lg:mx-48 border-t flex justify-between items-center p-4 border-b border-secondary border-opacity-30 mb-8 shadow-md">
          <button
            className="flex items-center hover:text-secondary transition duration-300"
            onClick={handleToggleComments}
          >
            <FaRegCommentDots size={24} className="mr-2" />
            <span className="hidden sm:inline">Comment ({commentCount})</span>
          </button>
          <button
            className="flex items-center hover:text-secondary transition duration-300"
            onClick={handleCopyLink}
          >
            <FaLink size={24} className="mr-2" />
            <span className="hidden sm:inline">Copy Link</span>
          </button>
        </div>

        {/* Popup for Copy Link */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-secondary bg-opacity-30 text-white p-4 rounded-lg shadow-lg">
              <p className="text-sm font-medium">
                Link copied! Feel free to share it.
              </p>
            </div>
          </div>
        )}

        {/* Flex Container for Related Posts and Comments Form */}
        <div className="relative mx-2 sm:mx-4 lg:mx-44 lg:p-12">
          {/* Related Posts or Recent Posts Section */}
          {!showComments && (
            <div className="w-full">
              <div className="flex flex-col gap-4">
                <PostWidget
                  slug={slug}
                  category={category}
                  setHasRelatedPosts={setHasRelatedPosts}
                />
              </div>
            </div>
          )}

          {/* Conditional Rendering for Comments Form and Comments Section */}
          {showComments && (
            <div className="w-full shadow-md rounded-lg p-2 sm:p-6 mb-4">
              <CommentsForm slug={slug} onNewComment={handleNewComment} />
            </div>
          )}
          {showComments && (
            <div className="w-full shadow-md rounded-lg p-2 sm:p-6">
              <Comments
                slug={slug}
                newComment={newComment}
                onCommentCountChange={setCommentCount}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Fetches the static props for the `PostDetails` component, including post details and comments.
 *
 * @param {Object} context - The context object containing query parameters.
 * @param {Object} context.params - The query parameters, including the post slug.
 *
 * @returns {Promise<Object>} The static props including the post details and initial comment count.
 */
export async function getStaticProps(context) {
  const slug = context.params.slug;
  const data = await getPostsDetails(slug);
  const comments = await getComments(slug);

  return {
    props: {
      post: data,
      initialCommentCount: comments.length,
    },
  };
}

/**
 * Generates the static paths for the `PostDetails` component based on available posts.
 *
 * @returns {Promise<Object>} The static paths including the post slugs for dynamic routing.
 */
export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}

export default PostDetails;
