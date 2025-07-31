import React from "react";
import Link from "next/link";
import { getAllNotes } from "@/services/getNotes";

const pastelColors = [
  "bg-pastel-blue",
  "bg-pastel-green",
  "bg-pastel-yellow",
  "bg-pastel-pink",
  "bg-pastel-purple",
];

export async function getStaticProps() {
  const notes = await getAllNotes();
  return {
    props: { notes },
    revalidate: 60, // optional ISR
  };
}

export default function NotesPage({ notes }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6 border-b border-secondary pb-2">Notes</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {notes.map((note, i) => (
          <Link key={note.slug} href={`/notes/${note.slug}`}>
            <div
              className={`rounded-xl p-5 shadow text-base-content transition hover:scale-[1.02] cursor-pointer ${
                pastelColors[i % pastelColors.length]
              }`}
            >
              <p className="text-xs font-semibold text-secondary mb-1">
                {note.noteCategory?.map((cat) => cat.name).join(", ")}
              </p>
              <h2 className="text-lg font-bold mb-1">{note.title}</h2>
              <p className="text-sm opacity-80">{note.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
