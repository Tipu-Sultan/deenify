import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import DeenifyBlog from "@/models/DeenifyBlog";

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