import connectMongoDB from "@/lib/mongodb";
import Post from "@/models/postSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    connectMongoDB();
    const posts = await Post.find();
    if (!posts) {
      return NextResponse.json({ message: "No posts available" });
    }

    return NextResponse.json({ posts });
  } catch (error) {
    console.log("error in getallposts api", error);
    return NextResponse.json({ error });
  }
}
