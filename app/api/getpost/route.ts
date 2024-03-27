import connectMongoDB from "@/lib/mongodb";
import Post from "@/models/postSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const { postIds } = await req.json();
    // console.log("list of post ids", postIds);
    // console.log("postId type", typeof postIds);
    const postDetailsArray = [];
    if (postIds) {
      for (const postId of postIds) {
        const postDetails = await Post.findOne({ _id: postId });
        postDetailsArray.push(postDetails);
      }
      return NextResponse.json({ postDetailsArray });
    }

    return NextResponse.json({ error: "No posts found" });
  } catch (error) {
    console.log("error in getpost api", error);
    return NextResponse.json({ error });
  }
}
