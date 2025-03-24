import Link from "next/link";
import { fetchHadith } from "@/lib/hadithApi";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default async function HadithPreviewPage({ params }) {
  const hadith = await fetchHadith(params.category, params.chapter, params.hadithId);

  if (!hadith) {
    return <p className="text-center py-12">Hadith not found.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <Link href={`/hadith/${params.category}/${params.chapter}?scrollTo=${params.hadithId}`}>
          <Button variant="outline" className="flex items-center gap-2">
            <ChevronLeft className="h-5 w-5" />
            Back to Chapter
          </Button>
        </Link>
        <h1 className="text-4xl font-bold">Hadith #{params.hadithId}</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{hadith.hadithEnglish?.substring(0, 50)}...</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4"><strong>English:</strong> {hadith.hadithEnglish}</p>
          <p className="text-xl mb-4"><strong>Arabic:</strong> {hadith.hadithArabic}</p>
          <p className="text-sm">
            <strong>Book:</strong> {hadith.book?.bookName} | <strong>Chapter:</strong> {hadith.chapter?.chapterEnglish}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}