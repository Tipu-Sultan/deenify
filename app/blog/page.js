import Link from "next/link";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const blogs = [
    {
      id: "1",
      title: "The Importance of Daily Prayers",
      excerpt: "Prayer is the foundation of faith. Learn how daily Salah strengthens your connection with Allah.",
      image: "https://plus.unsplash.com/premium_photo-1726761718590-1017add4c33c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Man praying
    },
    {
      id: "2",
      title: "Understanding Ramadan Fasting",
      excerpt: "Fasting during Ramadan is one of the five pillars of Islam. Here’s a deep dive into its significance.",
      image: "https://plus.unsplash.com/premium_photo-1723532511908-8aaab763942b?q=80&w=1958&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Ramadan food preparation
    },
    {
      id: "3",
      title: "The Power of Du'a (Supplication)",
      excerpt: "Discover how Du'a can change your life and bring you closer to Allah.",
      image: "https://plus.unsplash.com/premium_photo-1723914005379-404c97029e06?q=80&w=2029&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Hands raised in prayer
    },
  ];
  

export default function BlogPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Islamic Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Card key={blog.id} className="shadow-lg rounded-lg overflow-hidden">
            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
            <CardContent className="p-4">
              <CardTitle className="text-lg font-semibold">{blog.title}</CardTitle>
              <p className="text-gray-600 mt-2">{blog.excerpt}</p>
              <Link href={`/blog/${blog.id}`}>
                <Button className="mt-4 w-full">Read More</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
