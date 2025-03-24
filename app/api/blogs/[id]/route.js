import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import DeenifyBlog from "@/models/DeenifyBlog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;

    // Assuming 'id' could be a slug or MongoDB _id
    const blog = await DeenifyBlog.findOne({
      $or: [{ _id: id }, { slug: id }],
    }).populate("author", "name email");

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog.toObject(), { status: 200 });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const data = await request.json();

    const updatedBlog = await DeenifyBlog.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(updatedBlog.toObject(), { status: 200 });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;

    const deletedBlog = await DeenifyBlog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  try {
    await connectToDatabase();
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = params;
    const userId = session.user.id;

    const blog = await DeenifyBlog.findOne({ slug });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Check if user already liked the blog
    const hasLiked = blog.likes.includes(userId);

    if (hasLiked) {
      // Unlike: Remove user ID from likes array
      blog.likes = blog.likes.filter((id) => id.toString() !== userId);
    } else {
      // Like: Add user ID to likes array
      blog.likes.push(userId);
    }

    await blog.save();

    return NextResponse.json(
      { likes: blog.likes.length, hasLiked: !hasLiked },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error toggling like:", error);
    return NextResponse.json({ error: "Failed to toggle like" }, { status: 500 });
  }
}