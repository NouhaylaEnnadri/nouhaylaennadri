import React, { useState, useEffect } from "react";
import Link from "next/link"; // Import Link if you're using Next.js
import moment from "moment"; // Ensure moment is installed and imported
import { getRecentPosts, getRelatedPosts } from "@/services";

const PostWidget = ({ category, slug }) => {
  const [widgetPosts, setWidgetPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let result;
        if (slug) {
          result = await getRelatedPosts(category, slug);
        } else {
          result = await getRecentPosts();
        }
        console.log("Fetched posts:", result); // Log the result to see the fetched data
        setWidgetPosts(result);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [slug, category]); // Add category as a dependency if it's changing

  return (
    <div>
      {/* Recent Posts */}
      <div className="recent-posts">
        <h2 className="text-lg font-semibold mb-4 text-primary">
          {slug ? "Related Posts" : "Recent Posts"}
        </h2>
      </div>
    </div>
  );
};

export default PostWidget;
