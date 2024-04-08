"use client";

import Loading from "@/components/common/Loading";
import PostCard from "@/components/home/PostCard";
import { Post } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const Home = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/getallposts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["get all posts"],
    queryFn: fetchPosts,
    staleTime: 0,
  });
  // console.log("data from state", allPosts);
  useEffect(() => {
    if (data) {
      // console.log("data in useEffect", data?.posts);
      setAllPosts(data?.posts);
    }
  }, [data]);

  // console.log("All posts", allPosts);
  return (
    <main className="min-h-screen md:max-w-lg mx-auto md:border-x md:border-gray-500/20 md:mb-1 mb-14">
      {isLoading ? (
        <Loading />
      ) : (
        allPosts?.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </main>
  );
};

export default Home;
