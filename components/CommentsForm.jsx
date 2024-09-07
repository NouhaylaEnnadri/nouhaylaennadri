/**
 * `CommentsForm` Component
 *
 * A React component that provides a form for users to submit comments on a post.
 * It handles user input, validation, and manages local storage for form data.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.slug - The slug of the post to associate with the comment.
 * @param {Function} props.onNewComment - Callback function to notify the parent component of a new comment.
 *
 * @returns {JSX.Element} The rendered `CommentsForm` component.
 */
const CommentsForm = ({ slug, onNewComment }) => {
  // State to manage form data and UI states
  const [error, setError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
    storeData: false,
  });

  // Effect to initialize form data from local storage when the component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const initialFormData = {
        name: window.localStorage.getItem("name") || "",
        email: window.localStorage.getItem("email") || "",
        storeData:
          window.localStorage.getItem("name") ||
          window.localStorage.getItem("email"),
      };
      setFormData(initialFormData);
    }
  }, []);

  // Handler for input field changes
  const onInputChange = (e) => {
    const { target } = e;
    if (target.type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  };

  // Handler for form submission
  const handlePostSubmission = () => {
    setError(false);
    const { name, email, comment, storeData } = formData;

    // Validate input fields
    if (!name || !email || !comment) {
      setError(true);
      return;
    }

    const commentObj = { name, email, comment, slug };

    // Manage local storage based on checkbox value
    if (storeData) {
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("name");
      localStorage.removeItem("email");
    }

    // Submit the comment
    submitComment(commentObj).then((res) => {
      if (res.createComment) {
        // Notify parent component with the new comment
        onNewComment(commentObj);

        // Reset form data and show success message
        setFormData({
          name: storeData ? name : "",
          email: storeData ? email : "",
          comment: "",
          storeData,
        });
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      }
    });
  };

  return (
    <div className="bg-secondary bg-opacity-15 shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Leave a Reply
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          value={formData.comment}
          onChange={onInputChange}
          className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          name="comment"
          placeholder="Comment"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          value={formData.name}
          onChange={onInputChange}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Name"
          name="name"
        />
        <input
          type="email"
          value={formData.email}
          onChange={onInputChange}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Email"
          name="email"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            checked={formData.storeData}
            onChange={onInputChange}
            type="checkbox"
            id="storeData"
            name="storeData"
            value="true"
          />
          <label className="text-gray-500 cursor-pointer" htmlFor="storeData">
            Save my name, email in this browser for the next time I comment.
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500">All fields are mandatory</p>
      )}
      <div className="mt-8">
        <button
          type="button"
          onClick={handlePostSubmission}
          className="transition duration-500 ease hover:bg-accent inline-block bg-secondary text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
        >
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className="text-xl float-right font-semibold mt-3 text-green-500">
            Comment submitted for review
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
