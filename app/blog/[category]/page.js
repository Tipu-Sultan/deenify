import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCategoryBlogs } from "@/lib/blogs";
import { notFound } from "next/navigation";
import { AlertCircle, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export async function generateMetadata({ params }) {
  const categorySlug = params.category;
  const categoryName = categorySlug
    .split("-")
    .map((word) => (word === "and" ? "and" : word.charAt(0).toUpperCase() + word.slice(1)))
    .join(" ");

  return {
    title: `${categoryName} Blogs | Deenify`,
    description: `Discover ${categoryName} blogs on Deenify. Read insightful articles updated regularly.`,
  };
}

export default async function CategoryBlogsPage({ params, searchParams }) {
  const categorySlug = params.category;
  const page = parseInt(searchParams.page || "1", 10);
  const direction = searchParams.direction || "next";

  const categoryName = categorySlug
    .split("-")
    .map((word) => {
      if (word === "and") return "and";
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

  // Fetch blogs: accumulate if going forward ("next"), single page if going back ("prev")
  const accumulate = direction === "next" && page > 1;
  const { blogs: categoryBlogs, pagination } = await getCategoryBlogs(
    categoryName,
    page,
    accumulate
  );

  if (!categoryBlogs) {
    notFound();
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8">{categoryName}</h1>

      {categoryBlogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <AlertCircle className="h-16 w-16 mb-4" />
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">
            No Blogs Found
          </h2>
          <p className="text-base sm:text-lg max-w-md mb-6">
            It looks like there are no blogs in the "{categoryName}" category
            yet. Check back later or explore other categories!
          </p>
          <Link href="/blog">
            <Button
              variant="default"
              className="text-sm sm:text-base py-2 px-4"
            >
              Explore Categories
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {categoryBlogs.map((blog) => (
              <Card
                key={blog._id}
                className="shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {blog.imageUrl && (
                  <Image
                    width={400}
                    height={200}
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base sm:text-lg font-semibold">
                      {blog.title}
                    </CardTitle>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className={cn("h-4 w-4 sm:h-5 sm:w-5")} />
                    <span className="text-xs sm:text-sm">
                      {blog?.likes?.length || 0}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm">
                    {blog.content.replace(/<[^>]+>/g, "").substring(0, 100) +
                      "..."}
                  </p>
                  <Link href={`/blog/${categorySlug}/${blog.slug}`}>
                    <Button className="mt-4 w-full text-sm sm:text-base py-2">
                      Read More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
            {pagination.hasPrevPage && (
              <Link
                href={`/blog/${categorySlug}?page=${
                  pagination.currentPage - 1
                }&direction=prev`}
                passHref
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  Previous
                </Button>
              </Link>
            )}
            <span className="text-sm">
              Page {pagination.currentPage} of {pagination.totalPages} (
              {pagination.totalBlogs} blogs)
            </span>
            {pagination.hasNextPage && (
              <Link
                href={`/blog/${categorySlug}?page=${
                  pagination.currentPage + 1
                }&direction=next`}
                passHref
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  Next
                </Button>
              </Link>
            )}
          </div>

          <div className="mt-4">
            <Link href="/blog">
              <Button variant="outline" className="w-full sm:w-auto">
                Back to Categories
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
