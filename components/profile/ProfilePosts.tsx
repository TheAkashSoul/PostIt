"use client";

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../home/PostCard";

const ProfilePosts = ({ postUploads, username }: any) => {
  // console.log("posts array", postUploads);

  const fetchPost = async (postIds: any) => {
    try {
      const response = await fetch("/api/getpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postIds }),
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["post"],
    queryFn: () => fetchPost(postUploads),
  });

  useEffect(() => {
    refetch();
  }, [postUploads, refetch]);

  const postDetails = data?.postDetailsArray;
  //   console.log("postDetails", postDetails);

  return (
    <div>
      {isLoading && <p>Loading</p>}
      {postDetails &&
        postDetails.map((post: any) => (
          <PostCard key={post?._id} post={post} username={username} />
        ))}
    </div>
  );
};

export default ProfilePosts;
