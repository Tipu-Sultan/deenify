import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllBlogs } from "@/lib/blogs";

// List of categories with preview images
const categories = [
  {
    name: "Quran and Hadith",
    slug: "quran-and-hadith",
    image: "https://plus.unsplash.com/premium_photo-1677013622212-2cd4260dee5c?q=80&w=2070&auto=format&fit=crop", // Quran reading
  },
  {
    name: "Islamic Beliefs and Practices",
    slug: "islamic-beliefs-and-practices",
    image: "https://plus.unsplash.com/premium_photo-1726761718590-1017add4c33c?q=80&w=2070&auto=format&fit=crop", // Prayer
  },
  {
    name: "Ramadan and Islamic Festivals",
    slug: "ramadan-and-islamic-festivals",
    image: "https://plus.unsplash.com/premium_photo-1679952779171-c0a395ce4bf4?q=80&w=2070&auto=format&fit=crop", // Ramadan scene
  },
  {
    name: "Islamic History and Biographies",
    slug: "islamic-history-and-biographies",
    image: "https://images.unsplash.com/photo-1607700234059-a3322b07820e?q=80&w=2070&auto=format&fit=crop", // Historical Islamic site
  },
  {
    name: "Islamic Lifestyle and Morality",
    slug: "islamic-lifestyle-and-morality",
    image: "https://plus.unsplash.com/premium_photo-1661326256609-9a5e49d29fd0?q=80&w=2070&auto=format&fit=crop", // Modest lifestyle
  },
  {
    name: "Islamic Spirituality and Self-Improvement",
    slug: "islamic-spirituality-and-self-improvement",
    image: "https://images.unsplash.com/photo-1561399452-bdcd36b25b38?q=80&w=2070&auto=format&fit=crop", // Hands in supplication
  },
  {
    name: "Islamic Finance and Business Ethics",
    slug: "islamic-finance-and-business-ethics",
    image: "https://plus.unsplash.com/premium_photo-1682126138375-607d2d963cde?q=80&w=2070&auto=format&fit=crop", // Finance-related
  },
  {
    name: "Dawah and Islamic Outreach",
    slug: "dawah-and-islamic-outreach",
    image: "https://images.unsplash.com/photo-1559736111-cfe1517e84e3?q=80&w=2070&auto=format&fit=crop", // Community outreach
  },
  {
    name: "Women in Islam",
    slug: "women-in-islam",
    image: "https://plus.unsplash.com/premium_photo-1723759451820-ea0a7e90ca38?q=80&w=2070&auto=format&fit=crop", // Muslim women
  },
  {
    name: "Islamic Parenting and Education",
    slug: "islamic-parenting-and-education",
    image: "https://plus.unsplash.com/premium_photo-1726776171883-f26aae4ec1e9?q=80&w=2071&auto=format&fit=crop", // Family education
  },
  {
    name: "Islamic Travel and Hajj/Umrah",
    slug: "islamic-travel-and-hajj-umrah",
    image: "https://images.unsplash.com/photo-1553755088-ef1973c7b4a1?q=80&w=2070&auto=format&fit=crop", // Kaaba
  },
  {
    name: "Islamic Science and Contributions",
    slug: "islamic-science-and-contributions",
    image: "https://images.unsplash.com/photo-1453847668862-487637052f8a?q=80&w=2076&auto=format&fit=crop", // Islamic architecture
  },
];

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Blog Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categoryCounts.map((cat) => (
          <Card key={cat.slug} className="shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
            {cat.image && (
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-48 object-cover"
              />
            )}
            <CardHeader>
              <CardTitle className="text-xl font-semibol">{cat.name}</CardTitle>
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