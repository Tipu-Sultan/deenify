import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllBlogs } from "@/lib/blogs";
import { notFound } from "next/navigation";

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{categoryName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryBlogs.map((blog) => (
          <Card key={blog._id} className="shadow-lg rounded-lg overflow-hidden">
            {blog.imageUrl && (
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
            )}
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {blog.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                {blog.content.replace(/<[^>]+>/g, "").substring(0, 100) + "..."}
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
    </div>
  );
}
