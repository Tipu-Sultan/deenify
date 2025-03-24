import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getBlogBySlug, toggleLike } from "@/lib/blogs";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { authOptions } from "@/lib/authOptions";
import mongoose from "mongoose";
import Image from "next/image";

export default async function BlogDetail({ params }) {
  // Fetch the blog by slug
  const blog = await getBlogBySlug(params.slug);

  if (
    !blog ||
    blog.category.toLowerCase().replace(/\s+/g, "-") !== params.category
  ) {
    notFound();
  }

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id
    ? new mongoose.Types.ObjectId(session.user.id)
    : null;
  const hasLiked =
    userId && blog?.likes?.some((likeId) => likeId.equals(userId));
  const categorySlug = blog?.category?.toLowerCase().replace(/\s+/g, "-");

  async function handleLikeAction() {
    "use server";
    try {
      await toggleLike(params?.slug, categorySlug);
    } catch (error) {
      console.error("Error liking blog:", error);
    }
  }

  return (
    <div className="container max-w-5xl mx-auto px-4 py-8 max-w-4xl">
      {/* Back Button (Top) */}
      <div className="mb-6">
        <Link href={`/blog/${categorySlug}`}>
          <Button variant="outline" className="w-full sm:w-auto">
            Back to {blog.category}
          </Button>
        </Link>
      </div>

      {/* Blog Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{blog?.title}</h1>
        <div className="flex items-center justify-between text-sm ">
          <span>
            By {blog?.author?.name || "Unknown Author"} •{" "}
            {new Date(blog?.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          {/* Like Button with Form */}
          <form action={handleLikeAction}>
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="flex items-center space-x-1"
              disabled={!session} // Disable if not logged in
            >
              <Heart
                className={cn(
                  "h-5 w-5",
                  hasLiked ? "fill-red-500 text-red-500" : "text-gray-500"
                )}
              />
              <span>{blog?.likes?.length}</span>
            </Button>
          </form>
        </div>
      </header>

      {/* Blog Card */}
      <Card className="shadow-lg rounded-lg overflow-hidden">
        {blog.imageUrl && (
          <Image
          width={100}
          height={100}
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-64 md:h-96 object-cover"
          />
        )}
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">{blog.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
          {/* Back Button (Bottom) */}
          <div className="mt-8">
            <Link href={`/blog/${categorySlug}`}>
              <Button variant="outline" className="w-full sm:w-auto">
                Back to {blog.category}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
