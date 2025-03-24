// app/api/blogs/route.js
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import DeenifyBlog from "@/models/DeenifyBlog";
import connectToDatabase from "@/lib/db";

export async function POST(request) {
  try {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }


    const data = await request.json();
    const blog = await DeenifyBlog.create({
        ...data,
        author: token.id,
      })
    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const blogs = await DeenifyBlog.find().populate("author", "name email");
    const plainBlogs = blogs.map((blog) => blog.toObject()); // Convert Mongoose docs to plain objects
    return NextResponse.json(plainBlogs, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}