import React from "react";
import { Category, PostCard, PostWidget } from "@/components";

export default function Home() {
  return (
    <div className="rounded-lg  mb-8 p-12 sm:mx-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Section */}

        <div className="border-r lg:col-span-2 col-span-1 border-gray-300 lg:sticky lg:top-16">
          <div className=" rounded-lg p-2 lg:sticky lg:top-16 backdrop-blur-md">
            <h2 className="text-base hidden lg:block font-semibold border-b border-secondary pb-2 mb-2">
              Topics
            </h2>
            <Category />
          </div>
        </div>

        {/* Main Content and Right Section */}

        <div className="lg:col-span-10 col-span-1 flex flex-col lg:flex-row gap-4">
          {/* Main Posts Section */}

          <div className="lg:w-3/5 p-2 sm:p-4 space-y-4">
            {/* Search Bar for Smaller Screens */}
            {/* <div className="lg:hidden mb-2">
              <label className="input input-bordered input-secondary flex items-center gap-1">
                <input
                  type="text"
                  className="grow text-sm"
                  placeholder="Search"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div> */}

            {/* Post Cards */}
            <PostCard />
          </div>

          {/* Right Section */}
          <div className="bg-base-100 lg:w-2/5 hidden lg:block flex-col ">
            {/* Sticky Search Bar */}

            <div className="p-2 lg:sticky lg:top-16 rounded-lg mb-4">
              <PostWidget />
            </div>

            {/* <div className="p-2 bg-opacity-20 rounded-lg mt-4 bg-accent">
              <PostWidget />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
