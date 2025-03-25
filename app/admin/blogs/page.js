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
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";

export default function BlogManagement() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalBlogs: 0,
    limit: 10,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const fetchBlogs = async (page = 1) => {
    try {
      const response = await fetch(`/api/blogs?page=${page}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch blogs");
      const { blogs: fetchedBlogs, pagination: fetchedPagination } = await response.json();
      setBlogs(fetchedBlogs);
      setPagination(fetchedPagination);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(pagination.currentPage);
  }, [pagination.currentPage]);

  const handleDelete = async (slug) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const response = await fetch(`/api/blogs/${slug}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast({ title: "Success", description: "Blog Deleted" });
        setBlogs(blogs.filter((blog) => blog.slug !== slug));
      } else {
        console.error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setLoading(true);
      setPagination((prev) => ({ ...prev, currentPage: newPage }));
    }
  };

  if (loading) {
    return <div className="p-4 sm:p-6 text-center">Loading...</div>;
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Manage Blogs
        </h1>
        <Link href="/admin/blogs/create">
          <Button
            className="w-full sm:w-auto text-sm sm:text-base py-2"
          >
            Create New Blog
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs sm:text-sm font-medium ">
                Title
              </TableHead>
              <TableHead className="text-xs sm:text-sm font-medium  hidden sm:table-cell">
                Slug
              </TableHead>
              <TableHead className="text-xs sm:text-sm font-medium  md:table-cell">
                Author
              </TableHead>
              <TableHead className="text-xs sm:text-sm font-medium  hidden md:table-cell">
                Created At
              </TableHead>
              <TableHead className="text-xs sm:text-sm font-medium ">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 ">
                  No blogs found.
                </TableCell>
              </TableRow>
            ) : (
              blogs.map((blog) => (
                <TableRow key={blog.slug}>
                  <TableCell className="text-xs sm:text-sm ">
                    {blog.title}
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm hidden sm:table-cell">
                    {blog.slug}
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm md:table-cell">
                    {blog.author?.name || "Unknown"}
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm hidden md:table-cell">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm">
                    <div className="flex gap-2">
                      <Link href={`/admin/blogs/${blog.slug}`}>
                        <Button
                          variant="outline"
                          size="sm"
                        >
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(blog.slug)}
                        disabled={blog.isSuperAdmin}
                        aria-label={`Delete ${blog.title}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={!pagination.hasPrevPage}
          className={cn(
            "w-full sm:w-auto",
            !pagination.hasPrevPage && "opacity-50 cursor-not-allowed"
          )}
        >
          Previous
        </Button>
        <span className="text-sm text-gray-600">
          Page {pagination.currentPage} of {pagination.totalPages} (
          {pagination.totalBlogs} blogs)
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={!pagination.hasNextPage}
          className={cn(
            "w-full sm:w-auto",
            !pagination.hasNextPage && "opacity-50 cursor-not-allowed"
          )}
        >
          Next
        </Button>
      </div>
    </div>
  );
}