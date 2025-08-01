import { getAllNotes } from "@/services";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useState } from "react";

export async function getStaticProps() {
  const notes = await getAllNotes();

  const categories = [
    ...new Set(
      notes.flatMap((note) => note.notecategory?.map((cat) => cat.name))
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
    <>
      <div className="rounded-lg mb-12 px-6 py-12 sm:px-10 lg:px-20 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          {/* Topics Section Under Title */}
          <div className="lg:col-span-12 mb-8">
            <h1 className="text-5xl font-bold mb-8">Notes</h1>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`text-xs px-4 py-2 rounded-full border transition-all ${
                  selectedCategory === null
                    ? "bg-secondary text-white border-secondary"
                    : "text-base-content border-base-content/10 hover:bg-base-200"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-4 py-2 rounded-full border transition-all ${
                    selectedCategory === cat
                      ? "bg-secondary text-white border-secondary"
                      : "text-base-content border-base-content/10 hover:bg-base-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Notes Section */}
          <div className="lg:col-span-12">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNotes.map((note) => (
                <Link key={note.slug} href={`/notes/${note.slug}`}>
                  <div className="rounded-2xl p-8 border bg-base-200 border-base-300 hover:scale-[1.01] transition transform cursor-pointer flex flex-col justify-between h-full shadow-lg">
                    <div>
                      {note.notecategory?.[0]?.name && (
                        <span className="inline-block mb-4 text-xs font-semibold px-4 py-1 rounded-full bg-secondary/10 text-secondary">
                          {note.notecategory[0].name}
                        </span>
                      )}
                      <h2 className="text-2xl font-semibold mb-3">
                        {note.title}
                      </h2>
                      <p className="text-sm opacity-70 leading-relaxed">
                        {note.excerpt}
                      </p>
                    </div>
                    <div className="text-xs opacity-50 mt-6">by Noyl</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
