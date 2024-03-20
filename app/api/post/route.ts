import connectMongoDB from "@/lib/mongodb";
import Post from "@/models/postSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { description, imageUrl, user } = await req.json();
    await connectMongoDB();
    if (!description || !imageUrl) {
      return NextResponse.json({
        error: "Description and Image Url is required",
      });
    }
    const post = await Post.create({ description, imageUrl, user });
    return NextResponse.json({ post });
  } catch (error) {
    console.log("Post API Error", error);
    return NextResponse.json({ error });
  }
}
