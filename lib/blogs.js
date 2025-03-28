"use server";
import mongoose from "mongoose";
import connectToDatabase from "./db";
import DeenifyBlog from "@/models/DeenifyBlog";
import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";
import { revalidatePath } from "next/cache";


export async function getAllBlogs() {
  await connectToDatabase();
  const blogs = await DeenifyBlog.find().populate("author", "name email");
  return blogs.map((blog) => blog.toObject());
}

export async function getCategoryBlogs(category, page = 1, accumulate = false) {
  await connectToDatabase();

  const limit = 10;
  const skip = accumulate ? 0 : (page - 1) * limit; // This can become negative
  const fetchLimit = accumulate ? page * limit : limit;

  // Fetch blogs for the specific category
  const blogs = await DeenifyBlog.find({ category })
    .populate("author", "name email")
    .skip(skip) // Errors if skip < 0
    .limit(fetchLimit)
    .sort({ createdAt: -1 });

  const totalBlogs = await DeenifyBlog.countDocuments({ category });
  const totalPages = Math.ceil(totalBlogs / limit);

  return {
    blogs: blogs.map((blog) => blog.toObject()),
    pagination: {
      currentPage: page,
      totalPages,
      totalBlogs,
      limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
}

export async function getBlogBySlug(slug) {
  await connectToDatabase();
  const blog = await DeenifyBlog.findOne({ slug }).populate("author", "name email");
  return blog ? blog.toObject() : null;
}

export async function updateBlog(id, data) {
  await connectToDatabase();
  return DeenifyBlog.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteBlog(id) {
  await connectToDatabase();
  return DeenifyBlog.findByIdAndDelete(id);
}

export async function toggleLike(slug, categorySlug) {
  await connectToDatabase();
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    throw new Error("Unauthorized: Please log in to like this blog");
  }

  const userId = session?.user?.id;
  const blog = await DeenifyBlog.findOne({ slug });

  if (!blog) {
    throw new Error("Blog not found");
  }

  const hasLiked = blog?.likes?.includes(userId);
  
  if (hasLiked) {
    blog.likes = blog?.likes?.filter((id) => id?.toString() !== userId.toString());
  } else {
    blog?.likes?.push(userId);
  }

  await blog.save();

  // Revalidate the blog page to reflect updated likes
  revalidatePath(`/blog/${categorySlug}/${slug}`);

  return {
    likes: blog.likes.length,
    hasLiked: !hasLiked,
  };
}