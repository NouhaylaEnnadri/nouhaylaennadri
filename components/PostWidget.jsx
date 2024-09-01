import { getRecentPosts, getRelatedPosts } from "@/services";
import React from "react";
import React, { useState, useEffect } from "react";

const PostWidget = ({ category, slug }) => {
  const [widgetPosts, setWidgetPosts] = useState([]);
  useEffect(() => {
    if (slug) {
      getRelatedPosts(category, slug).then((result) => {
        setWidgetPosts(result);
      });
    } else {
      getRecentPosts().then((result) => {
        setWidgetPosts(result);
      });
    }
  }, [slug]);
  return <div></div>;
};

export default PostWidget;
