import Link from "next/link";
import { fetchCollections } from "@/lib/hadithApi";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default async function HadithPage() {
  const data = await fetchCollections();
  const collections = data.books || [];

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Hadith Collections</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <Link key={collection.bookSlug} href={`/hadith/${collection.bookSlug}`}>
            <Card className="hover:shadow-lg transition-shadow border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{collection.bookName}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Separator />
                <p className="text-sm">
                  <span className="font-medium">Author:</span> {collection.writerName || "Unknown"}
                </p>
                {collection.writerDeath && (
                  <p className="text-sm">
                    <span className="font-medium">Death Year:</span> {collection.writerDeath}
                  </p>
                )}
                <p className="text-sm">
                  <span className="font-medium">Total Hadiths:</span> {collection.hadiths_count}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Chapters:</span> {collection.chapters_count}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
