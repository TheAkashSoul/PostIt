import connectMongoDB from "@/lib/mongodb";
import User from "@/models/userSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const { user } = await req.json();
    // console.log(user);
    const userData = await User.findById(user);
    return NextResponse.json({ userData });
  } catch (error) {
    console.log("error in getuser api", error);
    return NextResponse.json({ error });
  }
}
