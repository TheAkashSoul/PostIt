"use client";

import Link from "next/link";
import Logo from "../common/Logo";
import { MdOutlineHome } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FiBell } from "react-icons/fi";
import { MdBookmarkBorder } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { MdOutlinePersonOutline } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { usePathname } from "next/navigation";

const SideNavbar = () => {
  const pathName = usePathname();

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
          href="/profile"
          className={`flex flex-row items-center space-x-2 hover:bg-blue-500/10 p-2 rounded-md ${
            pathName === "/profile" ? "bg-blue-500/15" : ""
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

      <div className="mt-auto mb-10 flex flex-row gap-2  items-center justify-center p-2 group">
        <div className="h-8 w-8 bg-black rounded-full overflow-hidden flex items-center justify-center border border-black">
          <img
            src="https://plus.unsplash.com/premium_photo-1682124752476-40db22034a58?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="profile picture"
            className="h-20 w-20 object-cover brightness-110"
          />
        </div>
        <button className="flex flex-row items-center gap-1 group-hover:scale-105 transition-all">
          <span className="text-md font-semibold">Logout</span>
          <AiOutlineLogout size={16} className="group-hover:text-red-700" />
        </button>
      </div>
    </div>
  );
};

export default SideNavbar;
