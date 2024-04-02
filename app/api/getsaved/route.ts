import connectMongoDB from "@/lib/mongodb";
import Saved from "@/models/savedSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    connectMongoDB();
    const { userId } = await req.json();
    const saved = await Saved.findOne({ user: userId });
    if (saved) {
      return NextResponse.json({ saved });
    }
  } catch (error) {
    console.log("error in getsaved api", error);
    return NextResponse.json({ error });
  }
}
