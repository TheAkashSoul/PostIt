"use client";

import PostCard from "@/components/home/PostCard";
import ProfileDetails from "@/components/profile/ProfileDetails";
import Link from "next/link";
import { CiSettings } from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";

type params = {
  profile: string;
};
const Profile = ({ params }: { params: params }) => {
  const username = params?.profile;
  // console.log(username);

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/getuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  const userDetails = data?.userData;

  // if (data) {
  //   console.log("data", userDetails);
  // }
  // if (error) {
  //   console.log("error", error);
  // }
  // if (isLoading) {
  //   console.log("isloading", isLoading);
  // }
  return (
    <main className="min-h-screen md:max-w-lg mx-auto md:border-x md:border-gray-500/20 md:mb-1 mb-14">
      <div className="py-2 sticky top-0 z-30 border-b border-gray-500/20 bg-background flex flex-row items-center justify-between">
        <h2 className="md:ml-4 ml-2 text-lg font-semibold">Profile</h2>
        <Link href="/settings" className="mr-2 block md:hidden">
          <CiSettings size={22} />
        </Link>
      </div>

      <div className=" px-2 md:px-10">
        <ProfileDetails details={userDetails} />
      </div>
      <div>
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </main>
  );
};

export default Profile;
