"use client";

import PostCard from "@/components/home/PostCard";
import { Post } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const Home = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/getallposts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["get all posts"],
    queryFn: fetchPosts,
  });

  useEffect(() => {
    if (data) {
      // console.log("data", data?.posts);
      setAllPosts(data?.posts);
    }
  }, [data]);

  // console.log("All posts", allPosts);
  return (
    <main className="min-h-screen md:max-w-lg mx-auto md:border-x md:border-gray-500/20 md:mb-1 mb-14">
      {allPosts?.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </main>
  );
};

export default Home;
