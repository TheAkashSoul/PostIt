"use client";

import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { FaRegComment } from "react-icons/fa6";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { HiOutlineTrash } from "react-icons/hi2";
import { useState } from "react";
import { useSession } from "next-auth/react";

type Props = {
  likes: string[];
  comments: object[];
  postId: string;
  username?: string;
};

const PostEvents = ({ likes, comments, postId, username }: Props) => {
  const { data: session, status } = useSession();

  const userId = session?.user.id;

  const isLiked = likes?.some((like: string) => like === userId);

  const sessionUsername = session?.user?.username;
  const [isLike, setIsLike] = useState<boolean>(isLiked);
  const [likeCount, setLikeCount] = useState<number>(likes?.length);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const canDelete = sessionUsername === username ? true : false;

  const likeToggle = async () => {
    const response = await fetch("/api/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId, userId }),
    });
    setIsLike((prevState) => !prevState);
    setLikeCount((prevCount) => (isLike ? prevCount - 1 : prevCount + 1));
    return response.json();
  };

  const savedToggle = () => {
    setIsSaved(!isSaved);
  };

  const deletePost = async () => {
    try {
      const response = await fetch("/api/postdelete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId, userId }),
      });
    } catch (error) {
      console.log(error);
    }
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
        <p className="font-light text-xs">{comments?.length}</p>
      </button>

      <button
        onClick={savedToggle}
        className="flex items-center hover:text-[#1D9BF0] border-none"
      >
        {isSaved ? <IoBookmark size={18} /> : <IoBookmarkOutline size={18} />}
      </button>
      {canDelete && (
        <button
          onClick={deletePost}
          className="flex items-center hover:text-[#e94e4b] border-none"
        >
          <HiOutlineTrash size={18} color="#f14d4a" />
        </button>
      )}
    </div>
  );
};

export default PostEvents;
