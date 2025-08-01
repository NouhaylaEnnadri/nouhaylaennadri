import { getAllNotes } from "@/services";
import Footer from "@/components/Footer";
import NoteCard from "@/components/NoteCard";
import NoteWidget from "@/components/NoteWidget";
import { useState } from "react";

export async function getStaticProps() {
  const notes = await getAllNotes();

  // Extract unique categories
  const categories = [
    ...new Set(
      notes.flatMap((note) =>
        note.notecategory?.map((cat) => JSON.stringify({ name: cat.name, slug: cat.slug }))
      )
    ),
  ].map((str) => JSON.parse(str));

  return {
    props: { notes, categories },
    revalidate: 60,
  };
}

export default function NotesPage({ notes, categories }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredNotes = selectedCategory
    ? notes.filter((note) =>
        note.notecategory?.some((cat) => cat.slug === selectedCategory)
      )
    : notes;

  return (
    <>
      <div className="rounded-lg mb-8 p-4 sm:p-2 sm:mx-2 lg:p-12 lg:mx-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Sidebar - Topics */}
          <div className="lg:col-span-2 col-span-1 border-gray-300 lg:sticky lg:top-16">
            <div className="rounded-lg p-2 lg:sticky lg:top-16 backdrop-blur-md">
              <h2 className="text-base hidden lg:block font-semibold border-b border-secondary pb-2 mb-6">
                Topics
              </h2>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-3 py-1 text-xs font-medium border rounded-lg transition ${
                    selectedCategory === null
                      ? "bg-secondary text-white"
                      : "border-secondary/30 text-secondary hover:bg-secondary/10"
                  }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-3 py-1 text-xs font-medium border rounded-lg transition ${
                      selectedCategory === cat.slug
                        ? "bg-secondary text-white"
                        : "border-secondary/30 text-secondary hover:bg-secondary/10"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Notes and Recent Notes */}
          <div className="lg:col-span-10 col-span-1 flex flex-col lg:flex-row gap-4">
            {/* Main Notes Section */}
            <div className="lg:w-3/5 p-2 sm:p-4 space-y-4">
              {filteredNotes.length > 0 ? (
                filteredNotes.map((note) => (
                  <NoteCard key={note.slug} note={note} />
                ))
              ) : (
                <p className="text-sm text-gray-500">No notes found.</p>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="bg-base-100 lg:w-2/5 hidden lg:block flex-col">
              <div className="p-2 lg:sticky lg:top-16 rounded-lg mb-4">
                <NoteWidget max={3} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
