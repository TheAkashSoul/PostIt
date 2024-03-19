"use client";

import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const Post = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handlePostSubmit = () => {
    console.log(description, imageUrl);
  };

  return (
    <main className="h-screen md:max-w-lg mx-auto md:border-x md:border-gray-500/20 md:mb-1 mb-14">
      <div className="py-2 sticky top-0 z-30 border-b border-gray-500/20 bg-background">
        <h2 className="md:ml-4 ml-2 text-lg font-semibold">Post</h2>
      </div>

      <div className="mt-6">
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
              />
            )}
          </div>
        </div>
        <div className="mt-4 md:px-8 px-2 flex items-center justify-center">
          <button
            onClick={handlePostSubmit}
            className="bg-blue-500 hover:bg-blue-500/85 w-full h-12 rounded-full py-2 text-lg font-bold text-background"
          >
            Post IT
          </button>
        </div>
      </div>
    </main>
  );
};

export default Post;
