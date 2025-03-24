"use client";

import { useState, useEffect } from "react";
import { fetchChapters } from "@/lib/hadithApi";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function CollectionPage({ params }) {
  const [chapters, setChapters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadChapters() {
      try {
        const data = await fetchChapters(params.category);
        setChapters(data.chapters || []);
      } catch (error) {
        console.error("Error fetching chapters:", error);
        setChapters([]);
      } finally {
        setLoading(false);
      }
    }
    loadChapters();
  }, [params.category]);

  const filteredChapters = chapters.filter((chapter) =>
    chapter.chapterEnglish?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-4">
        Chapters in {params.category.replace(/-/g, " ")}
      </h1>
      <p className="text-center mb-8 text-lg">Total Chapters: {chapters.length}</p>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
        <Input
          placeholder="Search chapters..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <Link href={`/hadith`}>
          <Button variant="outline" className="flex items-center gap-2 mb-5">
            <ChevronLeft className="h-5 w-5" />
            Back to Hadith's
          </Button>
        </Link>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChapters.length === 0 ? (
            <p className="text-center col-span-full">No chapters found.</p>
          ) : (
            filteredChapters.map((chapter) => (
              <Link
                key={chapter.chapterNumber}
                href={`/hadith/${params.category}/${chapter.chapterNumber}`}
              >
                <Card className="hover:shadow-lg transition-shadow border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      Chapter {chapter.chapterNumber}: {chapter.chapterEnglish}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1">
                    <Separator />
                    <p className="text-sm italic">{chapter.chapterUrdu}</p>
                    <p className="text-sm">{chapter.chapterArabic}</p>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
