"use client";

import Theme from "@/components/settings/Theme";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineLogout } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";
import { IoMdBookmark } from "react-icons/io";

const Settings = () => {
  const router = useRouter();
  return (
    <main className="min-h-screen md:max-w-lg mx-auto md:border-x md:border-gray-500/20 md:mb-1 mb-14">
      <div className="py-2 sticky top-0 z-30 border-b border-gray-500/20 bg-background flex flex-row gap-3 items-center">
        <button onClick={() => router.back()} className="ml-2 block md:hidden">
          <IoMdArrowBack size={20} />
        </button>
        <h2 className="md:ml-4 text-lg font-semibold">Settings</h2>
      </div>
      <Link
        href="/saved"
        className="flex flex-row gap-2 items-center md:hidden border-b border-gray-500/20 p-4 font-medium text-lg"
      >
        Saved
        <span>
          <IoMdBookmark size={18} />
        </span>
      </Link>
      <Theme />
      <div className="p-4 mt-10">
        <button
          onClick={() => signOut()}
          className="flex flex-row items-center gap-1 group-hover:scale-105 transition-all"
        >
          <span className="text-md font-semibold text-red-600">Logout</span>
          <AiOutlineLogout size={16} className="text-red-700" />
        </button>
      </div>
    </main>
  );
};

export default Settings;
