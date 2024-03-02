"use client";
import Link from "next/link";
import { useState } from "react";

const UserCard = () => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const followToggle = () => {
    setIsFollowing(!isFollowing);
  };
  return (
    <div className="flex flex-row items-center justify-between py-4 px-4 border-b border-gray-500/20">
      <Link href="/" className="flex flex-row gap-2 items-center w-full">
        <div className="h-10 w-10 overflow-hidden rounded-full flex items-center justify-center">
          <img
            src="https://cdn.pixabay.com/photo/2023/10/22/21/24/ai-generated-8334858_640.jpg"
            alt="img"
            className="h-10 w-10 object-cover"
          />
        </div>
        <div className="flex flex-col">
          <p className="font-semibold leading-tight text-md">Name</p>
          <p className="font-light text-xs leading-none">username</p>
        </div>
      </Link>
      <div className="flex items-center justify-center rounded-sm overflow-hidden">
        <button
          onClick={followToggle}
          className="bg-blue-500 hover:bg-blue-500/90 w-24 h-7 text-xs font-semibold px-2 py-1 text-background text-center"
        >
          {isFollowing ? "Following" : "Follow"}
        </button>
      </div>
    </div>
  );
};

export default UserCard;
