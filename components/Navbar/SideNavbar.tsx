"use client";

import Link from "next/link";
import Logo from "../common/Logo";
import { MdOutlineHome } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FiBell } from "react-icons/fi";
import { MdBookmarkBorder } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { MdOutlinePersonOutline } from "react-icons/md";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useUserData from "@/services/UserData";

const SideNavbar = () => {
  const [userName, setUserName] = useState<string>("");
  const pathName = usePathname();
  const { fetchUserData } = useUserData();

  useEffect(() => {
    const getUserId = async () => {
      const userData = await fetchUserData();
      setUserName(userData?.userData?.username);
    };
    if (pathName === "/") {
      getUserId();
    }
  }, [pathName]);

  return (
    <div className="hidden md:flex flex-col w-64 h-screen border-x border-gray-700/5 px-4">
      <div className="mt-2 mb-4 w-fit h-fit px-2">
        <Logo />
      </div>
      <div className="flex flex-col space-y-1">
        <Link
          href="/"
          className={`flex flex-row items-center space-x-2 hover:bg-blue-500/10 p-2 rounded-md ${
            pathName === "/" ? "bg-blue-500/15" : ""
          }`}
        >
          <MdOutlineHome size={26} />
          <span className="text-lg font-semibold">Home</span>
        </Link>

        <Link
          href="/explore"
          className={`flex flex-row items-center space-x-2 hover:bg-blue-500/10 p-2 rounded-md ${
            pathName === "/explore" ? "bg-blue-500/15" : ""
          }`}
        >
          <IoSearch size={26} />
          <span className="text-lg font-semibold">Explore</span>
        </Link>

        <Link
          href="/notifications"
          className={`flex flex-row items-center space-x-2 hover:bg-blue-500/10 p-2 rounded-md ${
            pathName === "/notifications" ? "bg-blue-500/15" : ""
          }`}
        >
          <FiBell size={26} />
          <span className="text-lg font-semibold">Notifications</span>
        </Link>

        <Link
          href="/saved"
          className={`flex flex-row items-center space-x-2 hover:bg-blue-500/10 p-2 rounded-md ${
            pathName === "/saved" ? "bg-blue-500/15" : ""
          }`}
        >
          <MdBookmarkBorder size={26} />
          <span className="text-lg font-semibold">Saved</span>
        </Link>

        <Link
          href="/settings"
          className={`flex flex-row items-center space-x-2 hover:bg-blue-500/10 p-2 rounded-md ${
            pathName === "/settings" ? "bg-blue-500/15" : ""
          }`}
        >
          <MdOutlineSettings size={26} />
          <span className="text-lg font-semibold">Settings</span>
        </Link>

        <Link
          href={`/${userName}`}
          className={`flex flex-row items-center space-x-2 hover:bg-blue-500/10 p-2 rounded-md ${
            pathName === `/${userName}` ? "bg-blue-500/15" : ""
          }`}
        >
          <MdOutlinePersonOutline size={26} />
          <span className="text-lg font-semibold">Profile</span>
        </Link>
      </div>
      <Link
        href="/post"
        className="flex justify-center items-center bg-blue-500 hover:bg-blue-500/90 p-2 rounded-full mt-8"
      >
        <span className="text-lg font-semibold text-white">Post</span>
      </Link>
    </div>
  );
};

export default SideNavbar;
