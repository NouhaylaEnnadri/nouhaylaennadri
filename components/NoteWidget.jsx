// components/NoteWidget.jsx
import { getAllNotes } from "@/services";
import Link from "next/link";
import { useEffect, useState } from "react";

const NoteWidget = ({ max = 3 }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function fetchNotes() {
      const result = await getAllNotes();

      const sorted = [...result].sort((a, b) =>
        new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );

      setNotes(sorted.slice(0, max));
    }

    fetchNotes();
  }, [max]);

  return (
    <div className="rounded-lg">
      <h2 className="font-semibold text-base-content mb-4 pb-2 border-b border-secondary">
        Recent Notes
      </h2>
      {notes.length === 0 ? (
        <p className="text-sm text-gray-500">No notes available.</p>
      ) : (
        <ul className="list-none space-y-4">
          {notes.map((note) => (
            <li key={note.slug}>
              <Link
                href={`/notes/${note.slug}`}
                className="block p-3 rounded-lg bg-secondary bg-opacity-10 hover:bg-secondary hover:bg-opacity-50 transition-transform transform hover:scale-105 hover:shadow-lg"
              >
                <div className="flex flex-col">
                  <h3 className="text-md font-semibold text-base-content mb-1">
                    {note.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-1">{note.excerpt}</p>
                  {note.notecategory?.[0]?.name && (
                    <span className="text-xs border px-2 py-0.5 rounded-md text-gray-400 border-gray-400 inline-block w-fit">
                      #{note.notecategory[0].name}
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NoteWidget;
