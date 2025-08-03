import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaLink, FaRegCommentDots } from "react-icons/fa";
import { NoteWidget, Comments, CommentsForm } from "@/components";

const HYGRAPH_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

const NoteDetail = ({ note }) => {
  const [newComment, setNewComment] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [hasRelatedNotes, setHasRelatedNotes] = useState(true);
  const router = useRouter();
  const slug = note.slug;

  useEffect(() => {
    if (!note) return;
  }, [note]);

  const handleNewComment = (comment) => {
    setNewComment(comment);
    setCommentCount((prevCount) => prevCount + 1);
  };

  const handleToggleComments = () => {
    setShowComments((prev) => !prev);
  };

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
      })
      .catch((err) => console.error("Failed to copy the link: ", err));
  };

  if (router.isFallback) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Main Note Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold mb-4 text-left">{note.title}</h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-2">
            {note.notecategory?.map((cat) => (
              <span
                key={cat.id}
                className="bg-transparent border border-secondary text-secondary px-3 py-1 rounded-md text-sm"
              >
                {cat.name}
              </span>
            ))}
          </div>
        </div>

        {/* Note Content */}
        <div className="mb-12 prose prose-invert mx-auto">
          {note.content?.html ? (
            <div dangerouslySetInnerHTML={{ __html: note.content.html }} />
          ) : (
            <p className="text-gray-400 italic">No content available.</p>
          )}
        </div>

        {/* Interaction Navbar */}
        <div className="mx-6 sm:mx-12 border-t flex justify-between items-center p-4 border-b border-secondary border-opacity-30 mb-8 shadow-md">
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

        {/* Copy Link Popup */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-secondary bg-opacity-30 text-white p-4 rounded-lg shadow-lg">
              <p className="text-sm font-medium">Link copied! Feel free to share it.</p>
            </div>
          </div>
        )}

        {/* Related Notes or Comments */}
        <div className="relative mx-2 sm:mx-4 lg:p-12">
          {!showComments && (
            <div className="w-full">
              <div className="flex flex-col gap-4">
                <NoteWidget
                  slug={slug}
                  setHasRelatedNotes={setHasRelatedNotes}
                />
              </div>
            </div>
          )}

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

export async function getStaticPaths() {
  const res = await fetch(HYGRAPH_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{
        note {
          slug
        }
      }`,
    }),
  });

  const { data, errors } = await res.json();

  if (errors) console.error("GraphQL errors:", errors);
  if (!data || !data.note) {
    console.error("Error fetching slugs:", data);
    return { paths: [], fallback: true };
  }

  const paths = data.note.map((note) => ({
    params: { slug: note.slug },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const res = await fetch(HYGRAPH_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query GetNote($slug: String!) {
          note(where: { slug: $slug }) {
            title
            excerpt
            slug
            notecategory {
              ... on NoteCategory {
                id
                name
              }
            }
            content {
              html
              text
            }
          }
        }
      `,
      variables: { slug: params.slug },
    }),
  });

  const { data, errors } = await res.json();

  if (errors) console.error("GraphQL errors:", errors);
  if (!data || !data.note) {
    console.error("Note not found:", data);
    return { notFound: true };
  }

  const matchedNote = Array.isArray(data.note) ? data.note[0] : data.note;

  return {
    props: {
      note: matchedNote,
    },
  };
}

export default NoteDetail;
