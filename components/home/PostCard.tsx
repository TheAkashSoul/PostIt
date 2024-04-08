"use client";

import Link from "next/link";
import PostEvents from "./PostEvents";
import { useEffect, useState } from "react";
import { Post, User } from "@/types/type";

type Props = {
  post: Post;
  username?: string;
};
const PostCard = ({ post, username }: Props) => {
  const [userDetails, setUserDetails] = useState<User | null>(null);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("/api/userbypost", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: post?.user }),
        });
        const data = await response.json();
        setUserDetails(data?.userData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserDetails();
  }, [post?.user]);

  return (
    <div className="flex flex-row gap-2 w-full items-start border-b border-gray-600/20 md:p-4 p-4">
      <div>
        {/* profile photo */}
        <Link
          href={`/${userDetails?.username}`}
          className="h-10 w-10 bg-black overflow-hidden rounded-full flex items-center justify-center"
        >
          <img
            src={userDetails?.displaypic}
            alt={userDetails?.name}
            className="object-cover"
          />
        </Link>
      </div>
      <div className="flex flex-col">
        {/* profile name */}
        <Link
          href={`/${userDetails?.username}`}
          className="flex flex-col items-start"
        >
          <p className="font-semibold text-md leading-tight">
            {userDetails?.name}
          </p>
          <p className="font-light text-xs leading-tight text-gray-400">
            {userDetails?.username}
          </p>
        </Link>
        {/* description */}
        <div>
          <p className="font-medium text-sm">{post?.description}</p>
        </div>
        {/* image */}
        <div className="my-3 overflow-hidden w-fit h-fit rounded-xl">
          <img
            src={post?.imageUrl}
            alt="image"
            className="h-auto max-h-96 w-auto max-w-full object-contain"
          />
        </div>

        {/* post events */}
        <div className="mt-3">
          <PostEvents
            username={username}
            likes={post?.likes}
            comments={post?.comments}
            postId={post?._id}
          />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
