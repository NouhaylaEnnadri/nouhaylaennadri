import { getNotes } from '@/services';
import Link from 'next/link';
import Category from '@/components/Category';

const colors = [
  'bg-pink-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-red-500',
  'bg-teal-500',
  'bg-indigo-500'
];

export async function getStaticProps() {
  const notes = await getNotes();
  return {
    props: { notes },
  };
}

export default function Notes({ notes }) {
  if (!notes || notes.length === 0) {
    return (
      <div className="text-center text-sm italic mt-20 text-gray-400">
        No content available.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-white mb-10">Notes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note, index) => {
          const color = colors[index % colors.length];

          return (
            <Link key={note.slug} href={`/notes/${note.slug}`}>
              <div
                className={`p-6 rounded-2xl shadow-xl text-white cursor-pointer transform hover:scale-[1.02] transition-all duration-300 ${color}`}
              >
                <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
                <p className="text-sm opacity-90 mb-4">{note.excerpt}</p>
                {note.notecategory && note.notecategory.length > 0 && (
                  <div>
                    <Category category={note.notecategory[0]} />
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
