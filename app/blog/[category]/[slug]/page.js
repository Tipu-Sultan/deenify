import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getBlogBySlug } from "@/lib/blogs";
import { notFound } from "next/navigation";

export default async function BlogDetail({ params }) {
  // Fetch the blog by slug
  const blog = await getBlogBySlug(params.slug);

  // If blog is not found or category doesn't match, trigger a 404
  if (
    !blog ||
    blog.category.toLowerCase().replace(/\s+/g, "-") !== params.category
  ) {
    notFound();
  }

  // Convert category to slug format for the back link
  const categorySlug = blog.category.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back Button */}
      <div className="mt-8">
        <Link href={`/blog/${categorySlug}`}>
          <Button variant="outline" className="w-full sm:w-auto">
            Back to {blog.category}
          </Button>
        </Link>
      </div>
      {/* Blog Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold  mb-2">{blog.title}</h1>
        <div className="text-sm text-gray-500">
          By {blog.author?.name || "Unknown Author"} •{" "}
          {new Date(blog.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </header>

      {/* Blog Card */}
      <Card className="shadow-lg rounded-lg overflow-hidden">
        {blog.imageUrl && (
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-64 md:h-96 object-cover"
          />
        )}
        <CardHeader>
          <CardTitle className="text-2xl font-semibold ">
            {blog.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Render HTML content safely */}
          <div
            className="prose prose-lg  max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
          {/* Back Button */}
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
