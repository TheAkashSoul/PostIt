import Link from "next/link";
import { MdOutlineHome } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { LuPlusSquare } from "react-icons/lu";
import { FiBell } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

const MobileNavbar = () => {
  return (
    <div className="flex md:hidden w-full items-center justify-around h-14 border-y border-gray-700/20 bg-background/10 backdrop-blur-sm">
      <Link href="/">
        <MdOutlineHome size={26} />
      </Link>

      <Link href="/explore">
        <IoSearch size={26} />
      </Link>

      <Link href="/post">
        <LuPlusSquare size={26} />
      </Link>

      <Link href="/notifications">
        <FiBell size={26} />
      </Link>

      <Link href="/profile">
        <CgProfile size={26} />
      </Link>
    </div>
  );
};

export default MobileNavbar;
