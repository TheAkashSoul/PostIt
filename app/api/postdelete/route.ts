import connectMongoDB from "@/lib/mongodb";
import Post from "@/models/postSchema";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { postId } = await req.json();
    await connectMongoDB();

    await Post.findByIdAndDelete(postId);

    return NextResponse.json({ messagge: "Post deleted successfully" });
  } catch (error) {
    console.log("error in post delete api", error);
    return NextResponse.json({ error });
  }
}
