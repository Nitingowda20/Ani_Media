import React from "react";
import { HiBookmark } from "react-icons/hi"; // Importing the bookmark icon

export default function DashSavelist({ postId, userId }) {
  const savePost = async (postId, userId) => {
    try {
      const res = await fetch("/api/savelist/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, userId }),
      });

      const data = await res.json();
      if (res.ok) {
        console.log("Post saved:", data);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error("Error saving post:", err);
    }
  };

  return (
    <div>
      <button onClick={() => savePost(postId, userId)} className="save-button">
        <HiBookmark size={24} color="blue" /> {/* Save icon */}
      </button>
    </div>
  );
}
