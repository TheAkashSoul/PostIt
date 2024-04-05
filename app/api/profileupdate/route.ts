import connectMongoDB from "@/lib/mongodb";
import User from "@/models/userSchema";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    connectMongoDB();
    const body = await req.json();
    const { name, username, bio, displaypic, _id } = body;
    const updatedDetails = {
      name: name,
      username: username,
      bio: bio,
      displaypic: displaypic,
    };
    const users = await User.find();
    if (users.length > 0) {
      if (users.some((user) => user.username === username)) {
        return NextResponse.json({ error: "Username already exists" });
      } else {
        const user = await User.findByIdAndUpdate(_id, updatedDetails, {
          new: true,
        });

        if (!user) {
          return NextResponse.json({ error: "User not found" });
        }
        return NextResponse.json({ user });
      }
    }
    // const user = await User.findByIdAndUpdate(_id, updatedDetails, {
    //   new: true,
    // });
    // if (!user) {
    //   return NextResponse.json({ error: "User not found" });
    // }
    // return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
