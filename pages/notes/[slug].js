import { useRouter } from "next/router";

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
            }
            notecategory {
              name
              slug
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
  if (router.isFallback) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">{note.title}</h1>
      <p className="text-sm text-gray-400 mb-4">
        {note.notecategory?.map((cat) => cat.name).join(", ")}
      </p>
      <div
        className="prose prose-invert"
        dangerouslySetInnerHTML={{ __html: note.content.html }}
      />
    </div>
  );
}
