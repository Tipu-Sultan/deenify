import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllBlogs } from "@/lib/blogs";
import categories from "@/data/categories.json";

// Generate metadata for SEO
export async function generateMetadata() {
  return {
    title: "Blog Categories | Deenify",
    description: "Explore a variety of Islamic blog categories on Deenify, including lifestyle, faith, and more.",
    keywords: "Islamic blog, Deenify categories, Muslim lifestyle",
  };
}

// Async component for blog categories page
export default async function BlogCategoriesPage() {
  const blogs = await getAllBlogs();

  // Map categories with blog counts
  const categoryCounts = categories.map((category) => ({
    name: category.name,
    slug: category.slug,
    image: category.image,
    count: blogs.filter((blog) => blog.category === category.name).length,
  }));

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Blog Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryCounts.map((cat) => (
          <Card
            key={cat.slug}
            className="shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
          >
            {cat.image && (
              <Image
                width={100}
                height={100}
                src={cat.image}
                alt={cat.name}
                className="w-full h-48 object-cover"
              />
            )}
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{cat.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{cat.count} article{cat.count !== 1 ? "s" : ""}</p>
              <Link href={`/blog/${cat.slug}`}>
                <Button className="mt-4 w-full">Explore</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}