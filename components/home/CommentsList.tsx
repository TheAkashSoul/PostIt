import { User } from "@/types/type";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";

type commentType = {
  createdAt: string;
  text: string;
  updatedAt: string;
  user: string;
  _id: string;
};
const CommentsList = ({ postId }: { postId: string }) => {
  const [comments, setComments] = useState<commentType[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/postdetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ post: postId }),
        });
        const data = await res.json();
        if (data) {
          setComments(data?.postDetails.comments);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, [postId, comments]);

  return (
    <div className="w-full">
      {comments?.map((comment: commentType) => (
        <CommentCard key={comment._id} comment={comment} postId={postId} />
      ))}
    </div>
  );
};

export default CommentsList;

export const CommentCard = ({
  comment,
  postId,
}: {
  comment: commentType;
  postId: string;
}) => {
  const userId = comment?.user;
  const commentId = comment?._id;
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/userbypost", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: userId }),
        });
        const data = await res.json();
        if (data) {
          setUser(data?.userData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [userId]);

  const deleteComment = async () => {
    try {
      if (!comment) return;
      const res = await fetch("/api/commentdelete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId, commentId }),
      });
      const data = await res.json();

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col w-full mb-6">
      <div className="flex flex-row items-center justify-between">
        <Link
          href={`/${user?.username}`}
          className="flex flex-row items-center gap-2 w-fit"
        >
          <div className="h-10 w-10 overflow-hidden rounded-full flex items-center justify-center">
            <img
              src={user?.displaypic}
              alt="img"
              className="h-10 w-10 rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-md leading-tight">{user?.name}</p>
            <p className="font-light text-xs leading-tight text-gray-400">
              {user?.username}
            </p>
          </div>
        </Link>
        <button onClick={deleteComment} className="w-fit">
          <HiOutlineTrash color="red" />
        </button>
      </div>
      <div className="w-full pl-12 text-balance">
        <p className="font-light text-sm">{comment?.text}</p>
      </div>
    </div>
  );
};
