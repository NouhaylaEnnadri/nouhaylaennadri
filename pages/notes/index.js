import React from "react";
import Link from "next/link";

const notes = [
  {
    slug: "how-to-stay-focused",
    title: "How to Stay Focused",
    description: "Notes on staying focused when you're overwhelmed with tasks.",
    category: "Mindset",
  },
  {
    slug: "eda-with-pandas",
    title: "EDA with Pandas",
    description: "My step-by-step guide to Exploratory Data Analysis using pandas.",
    category: "Data Analytics",
  },
  {
    slug: "atomic-habits-summary",
    title: "Atomic Habits Summary",
    description: "Key ideas and frameworks from Atomic Habits by James Clear.",
    category: "Productivity",
  },
  {
    slug: "ml-foundations",
    title: "ML Foundations",
    description: "Fundamental notes on Machine Learning algorithms and their intuition.",
    category: "Machine Learning",
  },
];

const pastelColors = [
  "bg-pastel-pink",
  "bg-pastel-blue",
  "bg-pastel-green",
  "bg-pastel-yellow",
  "bg-pastel-purple",
  "bg-pastel-teal",
];

const Notes = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 border-b border-secondary pb-2">Notes</h1>

      {/* Categories (optional UI filter or static view) */}
      <div className="mb-8 flex flex-wrap gap-2">
        {["Mindset", "Productivity", "Data Analytics", "Machine Learning"].map((tag) => (
          <span
            key={tag}
            className="bg-base-200 text-sm font-medium px-3 py-1 rounded-full hover:bg-secondary hover:text-white transition"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Bento Grid Layout */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {notes.map((note, i) => (
          <Link key={note.slug} href={`/notes/${note.slug}`}>
            <div
              className={`rounded-xl p-5 shadow-md text-base-content cursor-pointer transition-transform duration-300 hover:scale-[1.01] ${
                pastelColors[i % pastelColors.length]
              }`}
            >
              <p className="text-xs font-medium mb-1 text-secondary">{note.category}</p>
              <h3 className="text-lg font-bold mb-2">{note.title}</h3>
              <p className="text-sm opacity-80">{note.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Notes;
