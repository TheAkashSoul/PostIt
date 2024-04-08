import connectMongoDB from "@/lib/mongodb";
import Post from "@/models/postSchema";
import Saved from "@/models/savedSchema";
import User from "@/models/userSchema";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { postId, userId } = await req.json();
    // console.log("Post id", postId, "userId", userId);
    await connectMongoDB();

    await Post.findByIdAndDelete(postId);
    const user = await User.findById(userId);
    const saved = await Saved.findOne({ user: userId });

    if (user) {
      const index = user.posts.indexOf(postId);
      if (index > -1) {
        user.posts.splice(index, 1);
      }
      await user.save();
    }

    if (saved) {
      const postIndex = saved.savedPosts.indexOf(postId);
      if (postIndex > -1) {
        saved.savedPosts.splice(postIndex, 1);
        await saved.save();
      }
    }

    return NextResponse.json({ messagge: "Post deleted successfully" });
  } catch (error) {
    console.log("error in post delete api", error);
    return NextResponse.json({ error });
  }
}
