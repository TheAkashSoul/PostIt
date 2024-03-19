import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/userSchema";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const { name, username, email, password } = await req.json();
  await connectMongoDB();
  try {
    const userCheck = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (userCheck && userCheck.email === email) {
      return NextResponse.json({
        err: { emailErr: "This email is alread used. Try with new email" },
      });
    } else if (userCheck && userCheck.username === username) {
      return NextResponse.json({
        err: { userErr: "This username is already taken" },
      });
    }
    if (password.length < 6) {
      return NextResponse.json({
        err: { passwordErr: "Password length must be 6 or above" },
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });
    return NextResponse.json({ message: user });
  } catch (error) {
    console.log(error);
  }
}
