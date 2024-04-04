import connectMongoDB from "@/lib/mongodb";
import User from "@/models/userSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    connectMongoDB();
    const { followerId, followingId } = await req.json();
    const userFollower = await User.findById(followerId);
    const userFollowing = await User.findById(followingId);
    if (
      userFollower.following.includes(userFollowing._id) ||
      userFollowing.followers.includes(userFollower._id)
    ) {
      userFollower.following.splice(
        userFollower.following.indexOf(userFollowing._id),
        1
      );
      userFollowing.followers.splice(
        userFollowing.followers.indexOf(userFollower._id),
        1
      );
      await userFollower.save();
      await userFollowing.save();
      return NextResponse.json({ userFollower, userFollowing });
    }
    userFollower.following.push(userFollowing._id);
    userFollowing.followers.push(userFollower._id);
    await userFollower.save();
    await userFollowing.save();
    return NextResponse.json({ userFollower, userFollowing });
  } catch (error) {
    console.log("error in follow api", error);
    return NextResponse.json({ error });
  }
}
