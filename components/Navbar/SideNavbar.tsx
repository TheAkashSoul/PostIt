import Link from "next/link";
import Logo from "../common/Logo";
import { MdOutlineHome } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FiBell } from "react-icons/fi";
import { MdBookmarkBorder } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { MdOutlinePersonOutline } from "react-icons/md";

const SideNavbar = () => {
  return (
    <div className="hidden md:flex flex-col w-64 h-screen border-x border-gray-700/15 px-4">
      <div className="mt-2 mb-4 w-fit h-fit px-2">
        <Logo />
      </div>
      <div className="flex flex-col space-y-1">
        <Link
          href="/"
          className="flex flex-row items-center space-x-2 hover:bg-blue-500/20 p-2 rounded-md"
        >
          <MdOutlineHome size={26} />
          <span className="text-lg font-semibold">Home</span>
        </Link>

        <Link
          href="/explore"
          className="flex flex-row items-center space-x-2 hover:bg-blue-500/20 p-2 rounded-md"
        >
          <IoSearch size={26} />
          <span className="text-lg font-semibold">Explore</span>
        </Link>

        <Link
          href="/notifications"
          className="flex flex-row items-center space-x-2 hover:bg-blue-500/20 p-2 rounded-md"
        >
          <FiBell size={26} />
          <span className="text-lg font-semibold">Notifications</span>
        </Link>

        <Link
          href="/saved"
          className="flex flex-row items-center space-x-2 hover:bg-blue-500/20 p-2 rounded-md"
        >
          <MdBookmarkBorder size={26} />
          <span className="text-lg font-semibold">Saved</span>
        </Link>

        <Link
          href="/settings"
          className="flex flex-row items-center space-x-2 hover:bg-blue-500/20 p-2 rounded-md"
        >
          <MdOutlineSettings size={26} />
          <span className="text-lg font-semibold">Settings</span>
        </Link>

        <Link
          href="/profile"
          className="flex flex-row items-center space-x-2 hover:bg-blue-500/20 p-2 rounded-md"
        >
          <MdOutlinePersonOutline size={26} />
          <span className="text-lg font-semibold">Profile</span>
        </Link>
      </div>
      <Link
        href="/post"
        className="flex justify-center items-center bg-blue-500 p-2 rounded-full mt-8"
      >
        <span className="text-lg font-semibold text-white">Post</span>
      </Link>
    </div>
  );
};

export default SideNavbar;
