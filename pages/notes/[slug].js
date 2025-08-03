import { useRouter } from "next/router";
import { useState } from "react";
import { FaLink } from "react-icons/fa";

// NOTE: Replace this with your actual GraphCMS endpoint
const HYGRAPH_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export async function getStaticPaths() {
  const res = await fetch(HYGRAPH_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        {
          note {
            slug
          }
        }
      `,
    }),
  });

  const { data, errors } = await res.json();

  if (errors) console.error("GraphQL errors:", errors);
  if (!data || !data.note) {
    console.error("Error fetching slugs:", data);
    return { paths: [], fallback: false };
  }

  const paths = data.note.map((note) => ({
    params: { slug: note.slug },
  }));

  return { paths, fallback: false };
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

  return {
    props: {
      note: data.note,
    },
  };
}

export default function NoteDetail({ note }) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  if (router.isFallback) return <p>Loading...</p>;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto bg-base-200 p-6 rounded-xl shadow-lg border border-white/10">
        <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
          {note.title}
        </h1>
        <div className="flex justify-between items-center border-t border-b border-secondary border-opacity-20 py-4 mb-6">
          <p className="text-sm text-white/60">A note by Noyl</p>
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 text-sm text-white/70 hover:text-secondary transition"
          >
            <FaLink />
            {copied ? "Link Copied!" : "Copy Link"}
          </button>
        </div>

        <article className="prose prose-invert max-w-none">
          {note.content?.html ? (
            <div dangerouslySetInnerHTML={{ __html: note.content.html }} />
          ) : (
            <p className="text-gray-400 italic">No content available.</p>
          )}
        </article>
      </div>
    </div>
  );
}
