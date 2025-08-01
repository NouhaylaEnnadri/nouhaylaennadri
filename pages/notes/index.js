import { getAllNotes } from "@/services";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useState } from "react";

export async function getStaticProps() {
  const notes = await getAllNotes();

  // Get unique note categories
  const categories = [
    ...new Set(
      notes.flatMap((note) =>
        note.notecategory?.map((cat) => cat.name) || []
      )
    ),
  ];

  return { props: { notes, categories } };
}

export default function Notes({ notes, categories }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredNotes = selectedCategory
    ? notes.filter((note) =>
        note.notecategory?.some((cat) => cat.name === selectedCategory)
      )
    : notes;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0f0f1a] text-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">
              Topics
            </h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`text-xs px-3 py-1 rounded-lg border border-white/10 ${
                  selectedCategory === null
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:bg-white/10"
                } transition`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-3 py-1 rounded-lg border border-white/10 ${
                    selectedCategory === cat
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:bg-white/10"
                  } transition`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </aside>

          {/* Notes Grid */}
          <section className="lg:col-span-10">
            <h1 className="text-4xl font-bold mb-8">Notes</h1>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => (
                <Link key={note.slug} href={`/notes/${note.slug}`}>
                  <div className="rounded-2xl p-6 border border-white/10 bg-white/5 backdrop-blur-md hover:scale-[1.01] transition transform cursor-pointer flex flex-col justify-between h-full">
                    <div>
                      {note.notecategory?.[0]?.name && (
                        <span className="inline-block mb-3 text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/20 text-purple-300">
                          {note.notecategory[0].name}
                        </span>
                      )}
                      <h2 className="text-xl font-semibold text-white mb-2">
                        {note.title}
                      </h2>
                      <p className="text-sm text-white/70">{note.excerpt}</p>
                    </div>
                    <div className="text-xs text-white/50 mt-4">by Noyl</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
