"use server";
import mongoose from "mongoose";
import connectToDatabase from "./db";
import DeenifyBlog from "@/models/DeenifyBlog";


export async function getAllBlogs() {
  await connectToDatabase();
  const blogs = await DeenifyBlog.find().populate("author", "name email");
  return blogs.map((blog) => blog.toObject());
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