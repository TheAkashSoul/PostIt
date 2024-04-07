"use client";

import { User } from "@/types/type";
import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { signOut } from "next-auth/react";
import Loading from "../common/Loading";

const ProfileUpdate = ({
  details,
  setIsUpdate,
}: {
  details: User;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { displaypic, name, username, bio, _id } = details;
  const [displayPic, setDisplayPic] = useState<string>(displaypic);
  const [nameValue, setNameValue] = useState<string>(name);
  const [usernameValue, setUsernameValue] = useState<string>(username);
  const [bioValue, setBioValue] = useState<string>(bio);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // console.log("details", details);

  const updatedDetails = {
    name: nameValue,
    username: usernameValue,
    bio: bioValue,
    displaypic: displayPic,
    _id: _id,
    prevUsername: username,
  };
  const updateProfile = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/profileupdate", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDetails),
      });
      if (res.ok) {
        if (username !== usernameValue) {
          signOut();
        }
        setIsLoading(false);
        setIsUpdate(false);
      } else {
        setIsLoading(false);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main
      className="fixed z-40 w-full h-screen bg-background/90 backdrop-blur-lg top-0 left-0 overflow-y-scroll"
      style={{ scrollbarWidth: "none" }}
    >
      <div className="px-4 py-4 flex flex-col gap-6 max-w-lg mx-auto bg-background h-full">
        <div className="flex flex-row items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">Update Profile</h2>
          <button
            onClick={() => setIsUpdate(false)}
            className="bg-foreground hover:bg-foreground/90 p-1 rounded-full backdrop-blur-xl"
          >
            <IoCloseSharp color="red" size={20} />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-medium text-base">Edit Image</p>
          <div className="flex flex-col gap-2 items-center">
            <div className="h-28 w-28 overflow-hidden rounded-full">
              <img
                src={displayPic}
                alt="img"
                className="object-cover rounded-full h-full w-full"
              />
            </div>
            <input
              placeholder="Public Image URL"
              value={displayPic}
              onChange={(e) => setDisplayPic(e.target.value)}
              className="px-2 py-2 w-full rounded-lg border-none outline-none bg-foreground/20 backdrop-blur-lg"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-medium text-base">Edit Name</p>
          <input
            placeholder="Name"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            className="px-2 py-2 w-full rounded-lg border-none outline-none bg-foreground/20 backdrop-blur-lg"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-medium text-base">
            Edit Username -{" "}
            <span className="text-xs font-thin">
              You have to SignIn again if you change username
            </span>
          </p>
          <input
            placeholder="Username"
            value={usernameValue}
            onChange={(e) => setUsernameValue(e.target.value)}
            className="px-2 py-2 w-full rounded-lg border-none outline-none bg-foreground/20 backdrop-blur-lg"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-medium text-base">Edit Bio</p>
          <input
            placeholder="Bio"
            value={bioValue}
            onChange={(e) => setBioValue(e.target.value)}
            className="px-2 py-2 w-full rounded-lg border-none outline-none bg-foreground/20 backdrop-blur-lg"
          />
        </div>
        <button
          onClick={updateProfile}
          className="bg-foreground hover:bg-foreground/90 py-2 rounded-lg backdrop-blur-xl text-background text-lg font-bold mt-6 mb-2"
        >
          {isLoading ? <Loading /> : "Update"}
        </button>
      </div>
    </main>
  );
};

export default ProfileUpdate;
