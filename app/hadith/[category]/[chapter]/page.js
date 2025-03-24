import { fetchHadiths } from "@/lib/hadithApi";
import HadithList from "@/components/hadith/HadithList";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default async function ChapterPage({ params }) {
  let hadiths = [];

  try {
    const data = await fetchHadiths(params.category, params.chapter);
    hadiths = Array.isArray(data.hadiths?.data) ? data.hadiths.data : [];
  } catch (error) {
    console.error("Error in ChapterPage:", error);
    hadiths = [];
  }

  const totalHadiths = hadiths.length; // Total Hadiths in this chapter

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <Link href={`/hadith/${params.category}`}>
          <Button variant="outline" className="flex items-center gap-2">
            <ChevronLeft className="h-5 w-5" />
            Back to Chapters
          </Button>
        </Link>
        <div className="text-center sm:text-right">
          <h1 className="text-3xl md:text-4xl font-bold">
            Hadiths in Chapter {params.chapter}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {totalHadiths} Hadith{totalHadiths !== 1 ? "s" : ""} in this chapter
          </p>
        </div>
      </div>
      <HadithList
        hadiths={hadiths}
        category={params.category}
        chapter={params.chapter}
        totalHadiths={totalHadiths}
      />
    </div>
  );
}