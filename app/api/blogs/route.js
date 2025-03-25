// app/api/blogs/route.js
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import DeenifyBlog from "@/models/DeenifyBlog";
import connectToDatabase from "@/lib/db";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export async function POST(request) {
  try {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }


    const data = await request.json();
    const blog = await DeenifyBlog.create({
        ...data,
      })
    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Get the current session
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized: Please log in" },
        { status: 401 }
      );
    }

    // Fetch blogs where the author matches the current user's ID
    const blogs = await DeenifyBlog.find({ author: session.user.id }).populate(
      "author",
      "name email"
    );

    // Convert Mongoose documents to plain objects
    const plainBlogs = blogs.map((blog) => blog.toObject());

    return NextResponse.json(plainBlogs, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
