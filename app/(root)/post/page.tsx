"use client";

import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

const Post = () => {
  const { data: session } = useSession();
  const username = session?.user?.username;

  const [imageUrl, setImageUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errorPosting, setErrorPosting] = useState<string>("");
  const [canPost, setCanPost] = useState<boolean>(false);
  const [postSuccess, setPostSuccess] = useState<string>("");

  const fetchUserId = async () => {
    try {
      const response = await fetch("/api/getuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["userId"],
    queryFn: fetchUserId,
  });
  const user = data?.userData?._id;

  const trimDescription =
    description.length <= 120 ? description : description.slice(0, 120);
  const postData = {
    description: trimDescription,
    imageUrl: imageUrl,
    user: user,
  };

  useEffect(() => {
    if (
      description.trim() &&
      description.length <= 120 &&
      imageUrl.length > 10
    ) {
      setCanPost(true);
    } else {
      setCanPost(false);
    }
  }, [description, imageUrl]);

  useEffect(() => {
    setTimeout(() => {
      setPostSuccess("");
      setErrorPosting("");
    }, 10000);
  }, [postSuccess, errorPosting]);

  const handlePostSubmit = async () => {
    try {
      const res = await fetch("/api/post", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      const response = await res.json();
      if (response?.error) {
        setErrorPosting(response.error);
        return;
      }
      setDescription("");
      setImageUrl("");
      setPostSuccess("Post Successfully Uploaded");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="h-screen md:max-w-lg mx-auto md:border-x md:border-gray-500/20 md:mb-1 mb-14">
      <div className="py-2 sticky top-0 z-30 border-b border-gray-500/20 bg-background">
        <h2 className="md:ml-4 ml-2 text-lg font-semibold">Post</h2>
      </div>

      <div className="mt-6 px-2 md:px-0">
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Type your description here."
        />

        <div>
          <Textarea
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter public image url"
            className="mt-4"
          />

          <div className="px-2 py-2 md:py-4 md:px-4 mt-2 border border-gray-400/20 flex flex-col gap-3">
            <p className="font-semibold text-lg">Image Preview</p>
            {imageUrl && (
              <img
                src={imageUrl}
                className="object-contain h-fit w-fit max-h-64 max-w-full"
                alt="Enter public image url only"
                onError={() => setCanPost(false)}
              />
            )}
          </div>
        </div>
        <div className="mt-4 md:px-8 px-2 flex items-center justify-center">
          <button
            disabled={!canPost}
            onClick={handlePostSubmit}
            className={`bg-blue-500 hover:bg-blue-500/85 w-full h-12 rounded-full py-2 text-lg font-bold text-background ${
              !canPost && "disabled:cursor-not-allowed disabled:opacity-50"
            }`}
          >
            Post IT
          </button>
        </div>
      </div>

      {errorPosting && (
        <p className="text-center mt-10 text-red-600 font-bold text-lg px-2">
          Something went wrong try later or SignIn again
        </p>
      )}

      {postSuccess && (
        <p className="text-center mt-10 text-green-600 font-bold text-lg px-2">
          {postSuccess}
        </p>
      )}
    </main>
  );
};

export default Post;
