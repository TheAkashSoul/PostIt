"use client";

import { User } from "@/types/type";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type Props = {
  details: User;
  loading?: boolean;
};
const ProfileDetails = ({ details, loading }: Props) => {
  const { data: session, status } = useSession();
  const userName = session?.user.username;
  const followerId = session?.user.id ?? "";
  const followingId = details?._id;

  const isAdmin = userName === details?.username ? true : false;
  const [following, setFollowing] = useState<boolean>(false);
  const [followersCount, setFollowersCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);

  useEffect(() => {
    if (session) {
      const isFollowing = details?.followers.includes(followerId);
      setFollowing(isFollowing);
    }
  }, [session, details, followerId]);

  useEffect(() => {
    if (details) {
      setFollowersCount(details?.followers.length);
      setFollowingCount(details?.following.length);
    }
  }, [details]);

  const toggleFollow = async () => {
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
          setFollowersCount((prev) => prev - 1);
        } else {
          setFollowersCount((prev) => prev + 1);
        }
        setFollowing((prev) => !prev);
      } else {
        setFollowing((prev) => prev);
        console.log("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="px-4 border-b border-gray-600/20">
      <div className="py-2">
        <p className="font-medium text-sm">@{details?.username}</p>
      </div>

      <div className="flex flex-col items-start justify-between gap-1">
        <div className="w-full flex flex-row items-center justify-between gap-2 mt-2">
          <div className="md:w-16 md:h-16 w-14 h-14 rounded-full bg-black overflow-hidden">
            <img />
          </div>

          <div className="flex flex-row items-center md:gap-6 gap-6">
            <div className="flex flex-col items-center justify-center">
              <p className="font-semibold text-sm leading-tight">
                {details?.posts.length}
              </p>
              <p className="font-normal text-sm leading-tight">posts</p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <p className="font-semibold text-sm leading-tight">
                {followersCount}
              </p>
              <p className="font-normal text-sm leading-tight">followers</p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <p className="font-semibold text-sm leading-tight">
                {followingCount}
              </p>
              <p className="font-normal text-sm leading-tight">following</p>
            </div>
          </div>
          {/*  */}
        </div>

        <div className="flex flex-col items-start">
          <p className="font-semibold text-sm">{details?.name}</p>
          <p className="font-normal text-xs leading-none">{details?.bio}</p>
        </div>
        {!loading &&
          (isAdmin ? (
            <button className="bg-blue-500 hover:bg-blue-500/90 px-6 py-1 font-semibold text-base text-background rounded-sm w-full md:w-fit my-3">
              Edit Profile
            </button>
          ) : (
            <button
              onClick={toggleFollow}
              className="bg-blue-500 hover:bg-blue-500/90 px-6 py-1 font-semibold text-base text-background rounded-sm w-full md:w-fit my-3"
            >
              {following ? "Following" : "Follow"}
            </button>
          ))}
      </div>
    </main>
  );
};

export default ProfileDetails;
