import { useRouter } from "next/router";

const HYGRAPH_ENDPOINT = process.env.HYGRAPH_ENDPOINT;

export async function getStaticPaths() {
  const res = await fetch(HYGRAPH_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{
        notes {
          slug
        }
      }`,
    }),
  });

  const { data } = await res.json();

  const paths = data.notes.map((note) => ({
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
            content {
              html
            }
            noteCategory {
              name
              slug
            }
          }
        }
      `,
      variables: { slug: params.slug },
    }),
  });

  const { data } = await res.json();

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
      <p className="text-sm text-secondary mb-4">
        {note.noteCategory.map((cat) => cat.name).join(", ")}
      </p>
      <div
        className="prose prose-invert"
        dangerouslySetInnerHTML={{ __html: note.content.html }}
      />
    </div>
  );
}
