"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";

const PostComments = ({ postId }: { postId: string }) => {
  const [comment, setComment] = useState("");
  const { data: session, status } = useSession();

  const userId = session?.user.id;
  //   console.log("postId", userId);

  const addComment = async () => {
    try {
      if (!comment) return;
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId, userId, text: comment }),
      });
      if (res.ok) {
        setComment("");
      }
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full flex flex-row items-center gap-1">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full px-4 py-1 border-y border-gray-500/20 rounded-full focus-visible:outline-none focus-visible:border-blue-500 resize-none overflow-hidden"
        placeholder="Add a comment"
      />
      <button
        onClick={addComment}
        className="w-fit text-sm font-bold text-blue-500 outline-none"
      >
        Post
      </button>
    </div>
  );
};

export default PostComments;
