import connectMongoDB from "@/lib/mongodb";
import Post from "@/models/postSchema";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    await connectMongoDB();

    const { postId, commentId } = await req.json();

    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json({ error: "Post not available" });
    }

    const commentIndex = post.comments.findIndex(
      (comment: any) => comment._id.toString() === commentId
    );

    if (commentIndex === -1) {
      return NextResponse.json({ error: "Comment not available" });
    }

    post.comments.splice(commentIndex, 1);
    await post.save();
    return NextResponse.json({ post });
  } catch (error) {
    console.log("error in delete comment api", error);
    return NextResponse.json({ error });
  }
}
