import connectMongoDB from "@/lib/mongodb";
import Saved from "@/models/savedSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    connectMongoDB();
    const { postId, userId } = await req.json();
    let saved = await Saved.findOne({ user: userId });
    if (!saved) {
      saved = await Saved.create({
        user: userId,
        savedPosts: [postId],
      });
    } else {
      const index = saved.savedPosts.indexOf(postId);
      if (index === -1) {
        saved.savedPosts.push(postId);
      } else {
        saved.savedPosts.splice(index, 1);
      }
      saved = await saved.save();
    }
    return NextResponse.json({ saved });
  } catch (error) {
    console.log("error in saved api", error);
    return NextResponse.json({ error });
  }
}
