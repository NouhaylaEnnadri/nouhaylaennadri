// pages/notes/index.jsx
import { getAllNotes } from "@/services";
import { Footer } from "@/components";
import NoteCard from "@/components/NoteCard";
import Category from "@/components/Category"; // reuse but make sure it fetches note categories
import PostWidget from "@/components/PostWidget"; // optional

export async function getStaticProps() {
  const notes = await getAllNotes();
  return { props: { notes } };
}

export default function NotesPage({ notes }) {
  return (
    <>
      <div className="rounded-lg mb-8 p-4 sm:p-2 sm:mx-2 lg:p-12 lg:mx-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Sidebar */}
          <div className="lg:col-span-2 col-span-1 lg:sticky lg:top-16">
            <div className="rounded-lg p-2 lg:sticky lg:top-16 backdrop-blur-md">
              <h2 className="text-base hidden lg:block font-semibold border-b border-secondary pb-2 mb-6">
                Topics
              </h2>
              <Category /> {/* ✅ Show note categories */}
            </div>
          </div>

          {/* Notes Section */}
          <div className="lg:col-span-10 col-span-1 flex flex-col lg:flex-row gap-4">
            {/* Main Notes Section */}
            <div className="lg:w-3/5 p-2 sm:p-4 space-y-4">
              {notes.map((note) => (
                <NoteCard key={note.slug} note={note} />
              ))}
            </div>

            {/* Optional Right Sidebar */}
            <div className="bg-base-100 lg:w-2/5 hidden lg:block flex-col">
              <div className="p-2 lg:sticky lg:top-16 rounded-lg mb-4">
                <PostWidget /> {/* optional – can be reused */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
