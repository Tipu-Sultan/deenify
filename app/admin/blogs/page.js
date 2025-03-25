"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";

export default function BlogManagement() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast({ title: "Success", description: "Blog Deleted" });
        setBlogs(blogs.filter((blog) => blog._id !== blogId));
      } else {
        console.error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  if (loading) {
    return <div className="p-4 sm:p-6">Loading...</div>;
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Manage Blogs</h1>
        <Link href="/admin/blogs/create">
          <Button className="w-full sm:w-auto text-sm sm:text-base py-2">
            Create New Blog
          </Button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs sm:text-sm">Title</TableHead>
              <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Slug</TableHead>
              <TableHead className="text-xs sm:text-sm  md:table-cell">Author</TableHead>
              <TableHead className="text-xs sm:text-sm hidden md:table-cell">Created At</TableHead>
              <TableHead className="text-xs sm:text-sm">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog._id}>
                <TableCell className="text-xs sm:text-sm">{blog.title}</TableCell>
                <TableCell className="text-xs sm:text-sm hidden sm:table-cell">{blog.slug}</TableCell>
                <TableCell className="text-xs sm:text-sm md:table-cell">
                  {blog.author?.name || "Unknown"}
                </TableCell>
                <TableCell className="text-xs sm:text-sm hidden md:table-cell">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-xs sm:text-sm">
                  <div className="flex gap-2">
                    <Link href={`/admin/blogs/${blog._id}`}>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(blog._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}