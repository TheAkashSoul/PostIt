"use client";

import Link from "next/link";
import { MdOutlineHome } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { LuPlusSquare } from "react-icons/lu";
import { FiBell } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MobileNavbar = () => {
  const [userName, setUserName] = useState<string>("");

  const pathName = usePathname();

  // setTimeout(() => {
  //   const getUserId = async () => {
  //     const userData = await fetchUserData();
  //     setUserName(userData?.userData?.username);
  //   };
  //   getUserId();
  // }, 0.1);

  return (
    <div className="flex md:hidden w-full items-center justify-around h-14 border-t border-gray-700/5 bg-background/10 backdrop-blur-sm">
      <Link
        href="/"
        className={`${
          pathName === "/" ? "bg-blue-500/15" : ""
        } p-2 rounded-full`}
      >
        <MdOutlineHome size={22} />
      </Link>

      <Link
        href="/explore"
        className={`${
          pathName === "/explore" ? "bg-blue-500/15" : ""
        } p-2 rounded-full`}
      >
        <IoSearch size={22} />
      </Link>

      <Link
        href="/post"
        className={`${
          pathName === "/post" ? "bg-blue-500/15" : ""
        } p-2 rounded-full`}
      >
        <LuPlusSquare size={20} />
      </Link>

      <Link
        href="/notifications"
        className={`${
          pathName === "/notifications" ? "bg-blue-500/15" : ""
        } p-2 rounded-full`}
      >
        <FiBell size={20} />
      </Link>

      <Link
        href={`/${userName}`}
        className={`${
          pathName === `/${userName}` ? "bg-blue-500/15" : ""
        } p-2 rounded-full`}
      >
        <CgProfile size={20} />
      </Link>
    </div>
  );
};

export default MobileNavbar;
