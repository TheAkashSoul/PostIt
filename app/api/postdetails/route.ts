import connectMongoDB from "@/lib/mongodb";
import Post from "@/models/postSchema";
import User from "@/models/userSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    connectMongoDB();
    const { post } = await req.json();
    const postDetails = await Post.findOne({ _id: post });
    if (postDetails) {
      const userDetails = postDetails?.user;
      const user = await User.findById(userDetails);
      return NextResponse.json({ postDetails, user });
    }
    return NextResponse.json({ error: "No post found" });
  } catch (error) {
    console.log("error in postdetails api", error);
    return NextResponse.json({ error });
  }
}
