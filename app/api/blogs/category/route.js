import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import DeenifyBlog from "@/models/DeenifyBlog";

export async function GET(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = 10;
    const skip = (page - 1) * limit;

    const blogs = await DeenifyBlog.find({ category })
      .populate("author", "name email")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalBlogs = await DeenifyBlog.countDocuments({ category });

    return NextResponse.json(
      {
        blogs: blogs.map((blog) => blog.toObject()),
        totalBlogs,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching category blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}