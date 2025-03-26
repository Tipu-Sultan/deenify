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

    // Extract pagination parameters from the request URL
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = 5; // Fixed limit of 10 blogs per page
    const skip = (page - 1) * limit;

    // Determine the query based on user role
    let query = {};
    const userId = session.user.id;
    const isSuperAdmin = session.user.isSuperAdmin === true;
    const isAdmin = session.user.isAdmin === true;

    if (isSuperAdmin) {
      // Super admins see all blogs
      query = {};
    } else if (isAdmin) {
      // Admins see only their own blogs
      query = { author: userId };
    } else {
      // Regular users see only their own blogs
      query = { author: userId };
    }

    // Fetch blogs with pagination
    const blogs = await DeenifyBlog.find(query)
      .populate("author", "name email")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // Optional: Sort by creation date, newest first

    // Get the total count of blogs for pagination metadata
    const totalBlogs = await DeenifyBlog.countDocuments(query);
    const totalPages = Math.ceil(totalBlogs / limit);

    // Convert Mongoose documents to plain objects
    const plainBlogs = blogs.map((blog) => blog.toObject());

    // Return blogs with pagination metadata
    return NextResponse.json(
      {
        blogs: plainBlogs,
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          totalBlogs: totalBlogs,
          limit: limit,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
