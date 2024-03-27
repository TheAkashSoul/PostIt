import connectMongoDB from "@/lib/mongodb";
import Post from "@/models/postSchema";
import User from "@/models/userSchema";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { postId, userId } = await req.json();
    // console.log("Post id", postId, "userId", userId);
    await connectMongoDB();

    await Post.findByIdAndDelete(postId);
    const user = await User.findById(userId);

    if (user) {
      const index = user.posts.indexOf(postId);
      if (index > -1) {
        user.posts.splice(index, 1);
      }
      await user.save();
    }

    return NextResponse.json({ messagge: "Post deleted successfully" });
  } catch (error) {
    console.log("error in post delete api", error);
    return NextResponse.json({ error });
  }
}
