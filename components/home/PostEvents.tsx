"use client";

import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { FaRegComment } from "react-icons/fa6";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { HiOutlineTrash } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type Props = {
  likes: string[];
  comments: object[];
  postId: string;
  username?: string;
};

const PostEvents = ({ likes, comments, postId, username }: Props) => {
  // console.log("likes", likes);
  const { data: session, status } = useSession();
  const router = useRouter();

  const userId = session?.user.id;

  const isLiked = likes?.some((like: string) => like === userId);

  const sessionUsername = session?.user?.username;
  const [isLike, setIsLike] = useState<boolean>(isLiked);
  const [likeCount, setLikeCount] = useState<number>(likes?.length);
  const [isSaved, setIsSaved] = useState<boolean>();
  const [savedData, setSavedData] = useState([]);

  const canDelete = sessionUsername === username ? true : false;

  useEffect(() => {
    setLikeCount(likes?.length);
    setIsLike(isLiked);
  }, [likes, isLiked]);

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

  const fetchSaved = async () => {
    try {
      const response = await fetch("/api/getsaved", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { data } = useQuery({
    queryKey: ["saved"],
    queryFn: fetchSaved,
  });

  useEffect(() => {
    if (data) {
      setSavedData(data?.saved.savedPosts);
      const saved = savedData?.some((post: string) => post === postId);
      setIsSaved(saved);
    }
  }, [data, postId, savedData]);

  const savedToggle = async () => {
    const response = await fetch("/api/saved", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId, userId }),
    });
    setIsSaved((prevState) => !prevState);
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
      if (response.ok) {
        router.back();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleComments = (postId: string) => {
    router.push(`/view/${postId}`);
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

      <button
        onClick={() => handleComments(postId)}
        className="flex flex-row items-center gap-1 hover:text-[#00BA7c] border-none"
      >
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
