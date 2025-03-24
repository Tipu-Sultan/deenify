import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllBlogs } from "@/lib/blogs";
import { notFound } from "next/navigation";
import { AlertCircle, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default async function CategoryBlogsPage({ params }) {
  const blogs = await getAllBlogs();
  const categorySlug = params.category;

  const categoryName = categorySlug
    .split("-")
    .map((word, index) => {
      // Capitalize the first word and major words, keep "and" lowercase
      if (word === "and") return "and";
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

  // Filter blogs by the actual category name from the database
  const categoryBlogs = blogs.filter((blog) => blog.category === categoryName);

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      {categoryBlogs?.length > 0 && (
        <div className="mt-8">
        <Link href="/blog">
          <Button variant="outline">Back to Categories</Button>
        </Link>
      </div>
      )}
      <h1 className="text-4xl font-bold mb-8">{categoryName}</h1>
      {categoryBlogs?.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <AlertCircle className="h-16 w-16  mb-4" />
          <h2 className="text-2xl font-semibold  mb-2">No Blogs Found</h2>
          <p className="text-lg  max-w-md mb-6">
            It looks like there are no blogs in the "{categoryName}" category
            yet. Check back later or explore other categories!
          </p>
          <Link href="/blog">
            <Button
              variant="default"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Explore Categories
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryBlogs.map((blog) => (
              <Card
                key={blog._id}
                className="shadow-lg rounded-lg overflow-hidden"
              >
                {blog.imageUrl && (
                  <Image
                    width={100}
                    height={100}
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">
                      {blog.title}
                    </CardTitle>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className={cn("h-5 w-5")} />
                    <span className="text-sm text-gray-600">
                      {blog?.likes?.length}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>
                    {blog.content.replace(/<[^>]+>/g, "").substring(0, 100) +
                      "..."}
                  </p>
                  <Link href={`/blog/${categorySlug}/${blog.slug}`}>
                    <Button className="mt-4 w-full">Read More</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/blog">
              <Button variant="outline">Back to Categories</Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
