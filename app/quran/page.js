'use client';

import { useState, useEffect, useRef } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/quran/Sidebar';
import { MainContent } from '@/components/quran/MainContent';
import { useMetadata } from '@/hooks/useMetadata';
import { useSurahData } from '@/hooks/useSurahData';
import { useJuzData } from '@/hooks/useJuzData';

export default function QuranPage() {
  const [currentSurah, setCurrentSurah] = useState(1);
  const [currentJuz, setCurrentJuz] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentAyahIndex, setCurrentAyahIndex] = useState(-1);
  const [isPlayingUrdu, setIsPlayingUrdu] = useState(false);
  const [englishTranslator, setEnglishTranslator] = useState('en.sahih');
  const audioRefs = useRef([]);
  const urduAudioRefs = useRef([]);
  const ayahRefs = useRef([]);

  const { surahsList, loading: metadataLoading, error: metadataError } = useMetadata();
  const { surahData, loading: surahLoading, error: surahError, setSurahData } = useSurahData(currentSurah, englishTranslator, surahsList);
  const { juzData, loading: juzLoading, error: juzError, setJuzData } = useJuzData(currentJuz, englishTranslator);

  useEffect(() => {
    if (currentAyahIndex >= 0 && ayahRefs.current[currentAyahIndex]) {
      ayahRefs.current[currentAyahIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentAyahIndex]);

  const handleArabicAudioEnded = (index) => {
    const data = surahData || juzData;
    if (!data || !data.verses[index]) return;

    setIsPlayingUrdu(true);
    if (urduAudioRefs.current[index]?.audio.current) {
      urduAudioRefs.current[index].audio.current.play();
    } else {
      handleNextAyah(index);
    }
  };

  const handleUrduAudioEnded = (index) => {
    setIsPlayingUrdu(false);
    handleNextAyah(index);
  };

  const handleNextAyah = (index) => {
    const data = surahData || juzData;
    if (index + 1 < data.verses.length) {
      setCurrentAyahIndex(index + 1);
      setTimeout(() => {
        audioRefs.current[index + 1]?.audio.current?.play();
      }, 500);
    } else {
      setCurrentAyahIndex(-1);
      setIsPlayingUrdu(false);
    }
  };

  if (metadataLoading || surahLoading || juzLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="space-y-6">
            <Skeleton className="h-10 w-1/3 mx-auto" />
            <Skeleton className="h-12 w-full" />
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-32 w-full rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (metadataError || surahError || juzError) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {metadataError || surahError || juzError}
          <Button variant="link" className="ml-4" onClick={() => { setSurahData(null); setJuzData(null); }}>
            Clear
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex">
      <Sidebar
        surahsList={surahsList}
        currentSurah={currentSurah}
        setCurrentSurah={setCurrentSurah}
        currentJuz={currentJuz}
        setCurrentJuz={setCurrentJuz}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <MainContent
        surahData={surahData}
        juzData={juzData}
        currentSurah={currentSurah}
        currentJuz={currentJuz}
        englishTranslator={englishTranslator}
        setEnglishTranslator={setEnglishTranslator}
        currentAyahIndex={currentAyahIndex}
        setCurrentAyahIndex={setCurrentAyahIndex}
        isPlayingUrdu={isPlayingUrdu}
        setIsPlayingUrdu={setIsPlayingUrdu}
        audioRefs={audioRefs}
        urduAudioRefs={urduAudioRefs}
        ayahRefs={ayahRefs}
        handleArabicAudioEnded={handleArabicAudioEnded}
        handleUrduAudioEnded={handleUrduAudioEnded}
      />
      <style jsx global>{`
        @font-face {
          font-family: 'Arabic';
          src: url('https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;700&display=swap') format('woff2');
        }
        .font-arabic {
          font-family: 'Noto Naskh Arabic', 'Arabic', sans-serif;
        }
        @font-face {
          font-family: 'Urdu';
          src: url('https://fonts.googleapis.com/css2?family=Jameel+Noori+Nastaleeq&display=swap') format('woff2');
        }
        .font-urdu {
          font-family: 'Jameel Noori Nastaleeq', 'Urdu', sans-serif;
        }
      `}</style>
    </div>
  );
}