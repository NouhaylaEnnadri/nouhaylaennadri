import React from "react";
import { getNoteDetails, getAllNoteSlugs } from "@/services/noteService";

const NoteDetails = ({ note }) => {
  if (!note) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">{note.title}</h1>
      <p className="text-sm text-secondary mb-2">{note.category?.name}</p>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: note.content?.html }}
      />
    </div>
  );
};

export async function getStaticPaths() {
  const slugs = await getAllNoteSlugs(); // Fetch all note slugs from Hygraph

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const note = await getNoteDetails(params.slug);

  return {
    props: { note },
    revalidate: 60, // ISR
  };
}

export default NoteDetails;
