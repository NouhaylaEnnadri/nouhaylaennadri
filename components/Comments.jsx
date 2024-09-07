/**
 * `Comments` Component
 *
 * A React component that displays a list of comments for a specific post.
 * It fetches comments based on the provided slug, and updates the list 
 * when a new comment is added.
 *
 * @param {string} props.slug - The slug of the post for which comments are being fetched.
 * @param {Object} [props.newComment] - The newly added comment to be included in the list.
 * @param {Function} [props.onCommentCountChange] - Callback function to update the parent with the new comment count.
 */
const Comments = ({ slug, newComment, onCommentCountChange }) => {
  // State to store the list of comments
  const [comments, setComments] = useState([]);

  // Effect to fetch comments when the component mounts or the slug changes
  useEffect(() => {
    if (slug) {
      getComments(slug)
        .then((result) => {
          setComments(result);
          if (onCommentCountChange) {
            onCommentCountChange(result.length); // Pass the comment count to the parent
          }
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
        });
    }
  }, [slug, newComment, onCommentCountChange]); // Dependencies

  // Effect to add the new comment to the list
  useEffect(() => {
    if (newComment) {
      setComments((prevComments) => [newComment, ...prevComments]); // Add new comment to the beginning of the list
    }
  }, [newComment]);

  return (
    <>
      {comments.length > 0 && (
        <div className="bg-secondary bg-opacity-15 shadow-lg rounded-lg p-8 pb-12 mb-8">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            {comments.length} Comments
          </h3>
          {comments.map((comment, index) => (
            <div key={index} className="border-b border-gray-100 mb-4 pb-4">
              <p className="mb-4">
                <span className="font-semibold">{comment.name}</span> on{" "}
                {moment(comment.createdAt).format("MMM DD, YYYY")}
              </p>
              <p className="whitespace-pre-line text-gray-600 w-full">
                {parse(comment.comment)}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Comments;
