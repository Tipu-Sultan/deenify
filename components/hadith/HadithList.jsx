"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";

export default function HadithList({ hadiths, category, chapter, totalHadiths }) {
  const searchParams = useSearchParams();
  const scrollTo = searchParams.get("scrollTo");

  useEffect(() => {
    if (scrollTo) {
      const element = document.getElementById(`hadith-${scrollTo}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [scrollTo]);

  return (
    <div className="grid gap-4 md:gap-6">
      {hadiths.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No Hadiths found in this chapter.</p>
        </div>
      ) : (
        hadiths.map((hadith) => (
          <Link
            key={hadith.hadithNumber}
            href={`/hadith/${category}/${chapter}/${hadith.hadithNumber}`}
            id={`hadith-${hadith.hadithNumber}`}
          >
            <Card
              className={`transition-all hover:shadow-md border ${
                scrollTo === hadith.hadithNumber ? "border-red-500 shadow-lg" : "border-gray-200"
              }`}
            >
              <CardHeader className="pb-2">
                <CardTitle
                  className={`text-lg font-semibold ${
                    scrollTo === hadith.hadithNumber ? "text-red-500" : ""
                  }`}
                >
                  Hadith #{hadith.hadithNumber}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {hadith.hadithEnglish?.substring(0, 120)}...
                </p>
              </CardContent>
            </Card>
          </Link>
        ))
      )}
    </div>
  );
}