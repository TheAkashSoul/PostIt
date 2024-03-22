import connectMongoDB from "@/lib/mongodb";
import User from "@/models/userSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const { email } = await req.json();
    // console.log(email);
    const userData = await User.findOne({ email });
    return NextResponse.json({ userData });
  } catch (error) {
    console.log("error in getuser api", error);
    return NextResponse.json({ error });
  }
}
