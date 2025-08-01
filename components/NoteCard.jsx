// components/NoteCard.jsx
import Link from "next/link";

const NoteCard = ({ note }) => {
  return (
    <div className="bg-base-200 p-6 rounded-xl shadow-md hover:scale-[1.01] transition-all">
      <Link href={`/notes/${note.slug}`}>
        <div className="cursor-pointer">
          {note.notecategory?.[0]?.name && (
            <span className="text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1 rounded-full inline-block mb-3">
              {note.notecategory[0].name}
            </span>
          )}
          <h2 className="text-xl font-bold mb-2">{note.title}</h2>
          <p className="text-sm opacity-70">{note.excerpt}</p>
          <div className="text-xs opacity-50 mt-4">by Noyl</div>
        </div>
      </Link>
    </div>
  );
};

export default NoteCard;
