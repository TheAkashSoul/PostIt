import connectMongoDB from "@/lib/mongodb";
import Post from "@/models/postSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { postId, userId, text } = await req.json();
    await connectMongoDB();

    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ error: "Post not available" });
    }

    const newComment = {
      user: userId,
      text,
    };

    post.comments.push(newComment);
    await post.save();

    return NextResponse.json({ post });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
