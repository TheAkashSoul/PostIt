"use client";

import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { FaRegComment } from "react-icons/fa6";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { GoShare } from "react-icons/go";
import { useState } from "react";

const PostEvents = () => {
  const [isLike, setIsLike] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(24);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const likeToggle = () => {
    if (isLike) {
      setLikeCount((likeCount) => likeCount - 1);
      setIsLike(!isLike);
    } else {
      setLikeCount((likeCount) => likeCount + 1);
      setIsLike(!isLike);
    }
  };

  const savedToggle = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div className="flex flex-row items-center justify-between">
      <button
        onClick={likeToggle}
        className="flex flex-row items-center gap-1 hover:text-[#D3156D] border-none"
      >
        {isLike ? (
          <IoMdHeart size={18} color="#D3156D" />
        ) : (
          <IoMdHeartEmpty size={18} />
        )}

        <p className="font-light text-xs">{likeCount}</p>
      </button>

      <button className="flex flex-row items-center gap-1 hover:text-[#00BA7c] border-none">
        <FaRegComment size={16} />
        <p className="font-light text-xs">124</p>
      </button>

      <button
        onClick={savedToggle}
        className="flex items-center hover:text-[#1D9BF0] border-none"
      >
        {isSaved ? <IoBookmark size={18} /> : <IoBookmarkOutline size={18} />}
      </button>

      <button className="flex items-center hover:text-[#FFCC4D] border-none">
        <GoShare size={18} />
      </button>
    </div>
  );
};

export default PostEvents;
