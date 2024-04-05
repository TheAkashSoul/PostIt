"use client";

import ProfileDetails from "@/components/profile/ProfileDetails";
import Link from "next/link";
import { CiSettings } from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";
import ProfilePosts from "@/components/profile/ProfilePosts";
import ProfileUpdate from "@/components/profile/ProfileUpdate";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type params = {
  profile: string;
};
const Profile = ({ params }: { params: params }) => {
  const username = params?.profile;
  const { data: session, status } = useSession();
  const router = useRouter();
  // console.log(username);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);
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

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  useEffect(() => {
    refetch();
  }, [isUpdate, refetch]);

  const userDetails = data?.userData;
  const postsUploaded = userDetails?.posts;
  // console.log("user details", userDetails);

  return (
    <main className="relative min-h-screen md:max-w-lg mx-auto md:border-x md:border-gray-500/20 md:mb-1 mb-14">
      <div className="py-2 sticky top-0 z-30 border-b border-gray-500/20 bg-background flex flex-row items-center justify-between">
        <h2 className="md:ml-4 ml-2 text-lg font-semibold">Profile</h2>
        <Link href="/settings" className="mr-2 block md:hidden">
          <CiSettings size={22} />
        </Link>
      </div>

      <div className=" px-2 md:px-10">
        <ProfileDetails
          details={userDetails}
          loading={isLoading}
          setIsUpdate={setIsUpdate}
        />
      </div>
      <div>
        <ProfilePosts postUploads={postsUploaded} username={username} />
      </div>

      {isUpdate && (
        <ProfileUpdate setIsUpdate={setIsUpdate} details={userDetails} />
      )}
    </main>
  );
};

export default Profile;
