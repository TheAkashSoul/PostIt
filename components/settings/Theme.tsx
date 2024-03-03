"use client";
import * as React from "react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { PiMoonStarsFill } from "react-icons/pi";
import { IoSunny } from "react-icons/io5";
import { MdAutoAwesome } from "react-icons/md";

const Theme = () => {
  const { setTheme } = useTheme();
  const [themeButtonToggle, setThemeButtonToggle] = useState<boolean>(false);

  const themeChange = (theme: string) => {
    setTheme(theme);
    setThemeButtonToggle(!themeButtonToggle);
  };
  return (
    <div className="p-4 border-b border-gray-500/20">
      <button
        onClick={() => setThemeButtonToggle(!themeButtonToggle)}
        className="flex flex-row items-center gap-2 w-full"
      >
        <span className="font-medium text-lg">Theme</span>

        <span
          className={`${
            themeButtonToggle ? "rotate-180" : "rotate-0"
          } transition-all`}
        >
          <IoIosArrowDown size={18} />
        </span>
      </button>

      {themeButtonToggle && (
        <div className="flex flex-col gap-2 items-start ml-4 mt-4">
          <button
            className="flex flex-row gap-2 items-center"
            onClick={() => themeChange("light")}
          >
            <span className="font-medium">Light</span>
            <span>
              <IoSunny />
            </span>
          </button>
          <button
            className="flex flex-row gap-2 items-center"
            onClick={() => themeChange("dark")}
          >
            <span className="font-medium">Dark</span>
            <span>
              <PiMoonStarsFill />
            </span>
          </button>
          <button
            className="flex flex-row gap-2 items-center"
            onClick={() => themeChange("system")}
          >
            <span className="font-medium">System</span>
            <span>
              <MdAutoAwesome />
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Theme;
