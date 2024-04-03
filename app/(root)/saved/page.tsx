"use client";

import ProfilePosts from "@/components/profile/ProfilePosts";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";

const Saved = () => {
  const [savedData, setSavedData] = useState([]);
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const router = useRouter();

  const fetchSaved = async () => {
    try {
      const res = await fetch("/api/getsaved", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const { data, refetch } = useQuery({
    queryKey: ["get saved"],
    queryFn: fetchSaved,
  });

  useEffect(() => {
    if (data) {
      setSavedData(data?.saved?.savedPosts);
    }
    refetch();
  }, [savedData, refetch]);
  // console.log(savedData);

  return (
    <main className="min-h-screen md:max-w-lg mx-auto md:border-x md:border-gray-500/20 md:mb-1 mb-14">
      <div className="py-2 sticky top-0 z-30 border-b border-gray-500/20 bg-background flex flex-row gap-3 items-center">
        <button onClick={() => router.back()} className="ml-2 block md:hidden">
          <IoMdArrowBack size={20} />
        </button>
        <h2 className="md:ml-4 text-lg font-semibold">Saved</h2>
      </div>
      <div>
        <ProfilePosts postUploads={savedData} />
      </div>
    </main>
  );
};

export default Saved;
