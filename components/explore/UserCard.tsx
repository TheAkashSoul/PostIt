"use client";
import { User } from "@/types/type";
import Link from "next/link";
import { useState } from "react";

const UserCard = ({ user }: { user: User }) => {
  // console.log("user card", user);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const followToggle = () => {
    setIsFollowing(!isFollowing);
  };
  return (
    <div className="flex flex-row items-center justify-between p-4 border-b border-gray-500/20">
      <Link
        href={`/${user.username}`}
        className="flex flex-row gap-2 items-center w-full"
      >
        <div className="h-10 w-10 overflow-hidden rounded-full flex items-center justify-center">
          <img
            src={user.displaypic}
            alt="img"
            className="h-10 w-10 object-cover"
          />
        </div>
        <div className="flex flex-col">
          <p className="font-semibold leading-tight text-md">{user.name}</p>
          <p className="font-light text-xs leading-none">{user.username}</p>
        </div>
      </Link>
      <div className="flex items-center justify-center rounded-sm overflow-hidden">
        <button
          onClick={followToggle}
          className="bg-blue-500 hover:bg-blue-500/90 w-24 h-7 text-xs font-semibold px-2 py-1 text-white text-center"
        >
          {isFollowing ? "Following" : "Follow"}
        </button>
      </div>
    </div>
  );
};

export default UserCard;
