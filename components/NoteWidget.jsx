import React, { useState, useEffect } from "react";
import Link from "next/link";
import moment from "moment";
import { getAllNotes } from "@/services";

const NoteWidget = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const result = await getAllNotes();
        const sorted = result
          .filter((n) => n.createdAt)
          .sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
          .slice(0, 5);
        setNotes(sorted);
      } catch (err) {
        console.error("Failed to fetch notes:", err);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="rounded-lg">
      <h2 className="font-semibold text-base-content mb-4 pb-2 border-b border-secondary">
        Recent Notes
      </h2>
      <ul className="list-none space-y-4">
        {notes.length > 0 ? (
          notes.map((note, index) => (
            <li key={note.slug || index}>
              <Link
                href={`/notes/${note.slug}`}
                passHref
                className="block p-3 rounded-lg bg-secondary bg-opacity-10 hover:bg-secondary hover:bg-opacity-50 transition-transform transform hover:scale-105 hover:shadow-lg"
              >
                <div className="flex flex-col">
                  {/* Note Title */}
                  <h3 className="text-md font-semibold text-base-content mb-1">
                    {note.title}
                  </h3>
                  {/* Note Excerpt */}
                  <p className="text-sm text-gray-400 mb-2">{note.excerpt}</p>

                  <div className="flex flex-wrap gap-1 items-center text-xs text-gray-400">
                    {/* Categories */}
                    {note.notecategory?.map((cat, idx) => (
                      <span
                        key={idx}
                        className="inline-block text-xs font-medium px-2 py-0.5 border border-gray-400 rounded-md"
                      >
                        #{cat.name}
                      </span>
                    ))}

                    {/* Fake Date Fallback (optional) */}
                    {note.createdAt && (
                      <span className="ml-2 text-gray-500">
                        {moment(note.createdAt).format("MMM DD, YYYY")}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </li>
          ))
        ) : (
          <p className="text-sm text-gray-400">No notes available.</p>
        )}
      </ul>
    </div>
  );
};

export default NoteWidget;
