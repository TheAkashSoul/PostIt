import connectMongoDB from "@/lib/mongodb";
import Post from "@/models/postSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { postId, userId } = await req.json();
    await connectMongoDB();
    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ error: "Post not available" });
    }

    const userIndex = post.likes.indexOf(userId);

    if (userIndex === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(userIndex, 1);
    }

    await post.save();

    return NextResponse.json({ post });
  } catch (error) {
    console.log("erroe in likes api", error);
    return NextResponse.json({ error });
  }
}
