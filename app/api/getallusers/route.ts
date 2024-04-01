import connectMongoDB from "@/lib/mongodb";
import User from "@/models/userSchema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    connectMongoDB();
    const users = await User.find();
    if (!users) {
      return NextResponse.json({ message: "No user Found" });
    }
    return NextResponse.json({ users });
  } catch (error) {
    console.log("error in getallusers", error);
    return NextResponse.json({ error });
  }
}
