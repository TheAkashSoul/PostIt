"use client";

import React, { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import PostCard from "@/components/home/PostCard";
import PostComments from "@/components/home/PostComments";
import CommentsList from "@/components/home/CommentsList";

type Props = {
  params: {
    posts: string;
  };
};

type PostDetailsType = {
  postDetails?: any;
  user?: any;
};
const View = ({ params }: Props) => {
  const { posts } = params;
  // console.log(posts);
  const [postDetails, setPostDetails] = useState<PostDetailsType>({});
  const router = useRouter();

  const fetchPost = async () => {
    try {
      const response = await fetch("/api/postdetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post: posts }),
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["post details"],
    queryFn: fetchPost,
  });

  useEffect(() => {
    if (data) {
      //   console.log("data", data);
      setPostDetails(data);
    }
    refetch();
  }, [data, refetch, posts, postDetails]);
  //   console.log("post details", postDetails?.postDetails.likes);

  return (
    <main className="min-h-screen md:max-w-lg mx-auto md:border-x md:border-gray-500/20 md:mb-1 mb-14">
      <div className="py-2 sticky top-0 z-30 border-b border-gray-500/20 bg-background flex flex-row gap-3 items-center">
        <button onClick={() => router.back()} className="ml-2 block md:hidden">
          <IoMdArrowBack size={20} />
        </button>
        <h2 className="md:ml-4 text-lg font-semibold">Post</h2>
      </div>
      <div>
        <PostCard
          post={postDetails?.postDetails}
          username={postDetails?.user?.username}
        />
      </div>
      <div className="px-4 py-2 bg-[#edecec]/30 dark:bg-[#201f1f]/30">
        <PostComments postId={posts} />
      </div>
      <div className="px-4 py-2 bg-[#edecec]/30 dark:bg-[#201f1f]/30">
        <CommentsList postId={posts} />
      </div>
    </main>
  );
};

export default View;
