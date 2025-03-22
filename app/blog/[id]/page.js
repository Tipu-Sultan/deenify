import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const blogs = [
  {
    id: "1",
    title: "The Importance of Daily Prayers",
    excerpt: "Prayer is the foundation of faith...",
    image: "https://plus.unsplash.com/premium_photo-1726761718590-1017add4c33c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: "Full content about daily prayers...",
  },
  {
    id: "2",
    title: "Understanding Ramadan Fasting",
    excerpt: "Fasting during Ramadan is one of the five pillars...",
    image: "https://plus.unsplash.com/premium_photo-1723532511908-8aaab763942b?q=80&w=1958&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: "Full content about Ramadan fasting...",
  },
  {
    id: "3",
    title: "The Power of Du'a (Supplication)",
    excerpt: "Discover how Du'a can change your life...",
    image: "https://plus.unsplash.com/premium_photo-1723914005379-404c97029e06?q=80&w=2029&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: "Full content about Du'a...",
  },
];

// Generate static paths
export function generateStaticParams() {
  return blogs.map((blog) => ({ id: blog.id }));
}

export default function BlogDetail({ params }) {
  const blog = blogs.find((b) => b.id === params.id);

  if (!blog) {
    return <div className="text-center text-red-500">Blog Not Found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <Card className="shadow-lg rounded-lg overflow-hidden">
        <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover" />
        <CardContent className="p-4">
          <CardTitle className="text-2xl font-semibold">{blog.title}</CardTitle>
          <p className="text-gray-700 mt-4">{blog.content}</p>
          <Link href="/blog">
            <Button className="mt-6">Back to Blogs</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
