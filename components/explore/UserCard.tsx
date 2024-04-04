"use client";
import { User } from "@/types/type";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const UserCard = ({ user }: { user: User }) => {
  const { data: session, status } = useSession();
  const followerId = session?.user.id ?? "";
  const followingId = user?._id;

  const [following, setFollowing] = useState<boolean>(
    user?.followers.includes(followerId)
  );

  useEffect(() => {
    if (session) {
      setFollowing(user?.followers.includes(followerId));
    }
  }, [session, user, followerId, followingId]);

  const followToggle = async () => {
    try {
      const res = await fetch("/api/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ followerId, followingId }),
      });
      if (res.ok) {
        if (following) {
          setFollowing((prev) => !prev);
        } else {
          setFollowing((prev) => !prev);
        }
      }
    } catch (error) {
      console.log(error);
    }
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
          className={`bg-blue-500 hover:bg-blue-500/90 w-24 h-7 text-xs font-semibold px-2 py-1 text-white text-center ${
            session?.user.id === user?._id ? "hidden" : ""
          }`}
        >
          {following ? "Following" : "Follow"}
        </button>
      </div>
    </div>
  );
};

export default UserCard;
