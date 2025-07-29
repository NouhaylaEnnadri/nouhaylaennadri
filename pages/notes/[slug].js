import React from "react";
import { Layout } from "@/components";

const NotesPage = () => {
  const topics = [
    "Mindset",
    "Productivity",
    "Data Analytics",
    "Machine Learning",
  ];

  const notes = [
    {
      title: "How to Stay Focused",
      summary: "Notes on staying focused when you're overwhelmed with tasks.",
      tag: "Mindset",
    },
    {
      title: "EDA with Pandas",
      summary:
        "My step-by-step guide to Exploratory Data Analysis using pandas.",
      tag: "Data Analytics",
      span: "row-span-2",
    },
    {
      title: "Atomic Habits Summary",
      summary: "Key ideas and frameworks from Atomic Habits by James Clear.",
      tag: "Productivity",
    },
    // Add more notes...
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-3">
          <h2 className="text-lg font-semibold mb-4">Topics</h2>
          <div className="flex flex-wrap gap-2">
            {topics.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm rounded-full bg-base-300 hover:bg-base-100 cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </aside>

        {/* Bento Grid */}
        <section className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
          {notes.map((note, idx) => (
            <div
              key={idx}
              className={`rounded-xl bg-base-200 p-4 shadow hover:shadow-xl transition-all duration-300 ${
                note.span || ""
              }`}
            >
              <div className="mb-2 text-sm text-secondary">📌 {note.tag}</div>
              <h2 className="text-xl font-bold">{note.title}</h2>
              <p className="text-sm text-gray-400 mt-2">{note.summary}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default NotesPage;

// Optional layout wrapper if you use custom Layout.jsx
NotesPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
