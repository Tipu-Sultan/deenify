'use client';

import { useState, useEffect, useRef } from 'react';
import { ScrollText, Volume2, Languages, Menu } from 'lucide-react';
import AudioPlayer from 'react-h5-audio-player';
import axios from 'axios';
import 'react-h5-audio-player/lib/styles.css';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

export default function QuranPage() {
  const [currentSurah, setCurrentSurah] = useState(1);
  const [currentJuz, setCurrentJuz] = useState(0);
  const [surahData, setSurahData] = useState(null);
  const [juzData, setJuzData] = useState(null);
  const [surahsList, setSurahsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentAyahIndex, setCurrentAyahIndex] = useState(-1);
  const [isPlayingUrdu, setIsPlayingUrdu] = useState(false);
  const audioRefs = useRef([]);
  const urduAudioRefs = useRef([]);
  const ayahRefs = useRef([]);
  const [englishTranslator, setEnglishTranslator] = useState('en.sahih');

  const englishTranslators = [
    { id: 'en.sahih', name: 'Sahih International' },
    { id: 'en.asad', name: 'Muhammad Asad' },
    { id: 'en.pickthall', name: 'Pickthall' },
    { id: 'en.yusufali', name: 'Yusuf Ali' },
  ];

  // Base URL for dynamic audio
  const audioBaseUrl = 'https://minhaj.net/downloads/irfan-ul-quran';
  const narrators = {
    arabic: 'Mishary-Rashid-Alafasy',
    urdu: 'Tasleem-Ahmed-Sabri',
  };

  // Helper function to format Surah and Ayah numbers
  const formatNumber = (num) => String(num).padStart(3, '0');

  // Dynamic audio URL generator
  const getAudioUrl = (narrator, surah, ayah) => {
    const surahFormatted = formatNumber(surah);
    const ayahFormatted = formatNumber(ayah);
    return `${audioBaseUrl}/${narrator}/${surahFormatted}/${surahFormatted}_${ayahFormatted}.mp3`;
  };

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_QURAN_API}/surah`);
        setSurahsList(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching metadata:', err);
        setError('Failed to load Surah list');
      }
    };
    fetchMetadata();
  }, []);

  useEffect(() => {
    const fetchSurah = async () => {
      if (!surahsList.length || currentJuz !== 0) return;

      try {
        setLoading(true);
        setJuzData(null);
        const [arabicResponse, urduResponse, englishResponse] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_QURAN_API}/surah/${currentSurah}/ar.uthmani`),
          axios.get(`${process.env.NEXT_PUBLIC_QURAN_API}/surah/${currentSurah}/ur.jalandhry`),
          axios.get(`${process.env.NEXT_PUBLIC_QURAN_API}/surah/${currentSurah}/${englishTranslator}`),
        ]);

        const verses = arabicResponse.data.data.ayahs.map((ayah, index) => {
          const arabicText = ayah.text || 'Arabic text not available';
          const urduText = urduResponse.data.data.ayahs[index]?.text || 'Urdu not available';
          return {
            arabic: arabicText,
            urdu: urduText,
            hinglish: toHinglish(urduText),
            english: englishResponse.data.data.ayahs[index]?.text || 'English not available',
            numberInSurah: ayah.numberInSurah,
            audioUrl: getAudioUrl(narrators.arabic, currentSurah, ayah.numberInSurah),
            urduAudioUrl: getAudioUrl(narrators.urdu, currentSurah, ayah.numberInSurah),
          };
        });

        setSurahData({
          verses,
          name: arabicResponse.data.data.name,
          englishName: arabicResponse.data.data.englishName,
        });
        setCurrentAyahIndex(-1);
      } catch (err) {
        setError('Failed to load Surah data');
        console.error('Error fetching Surah:', err.response || err);
      } finally {
        setLoading(false);
      }
    };

    fetchSurah();
  }, [currentSurah, englishTranslator, surahsList]);

  useEffect(() => {
    const fetchJuz = async () => {
      if (currentJuz === 0) return;

      try {
        setLoading(true);
        setSurahData(null);
        const [arabicResponse, urduResponse, englishResponse] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_QURAN_API}/juz/${currentJuz}/ar.uthmani`),
          axios.get(`${process.env.NEXT_PUBLIC_QURAN_API}/juz/${currentJuz}/ur.jalandhry`),
          axios.get(`${process.env.NEXT_PUBLIC_QURAN_API}/juz/${currentJuz}/${englishTranslator}`),
        ]);

        const verses = arabicResponse.data.data.ayahs.map((ayah, index) => {
          const arabicText = ayah.text || 'Arabic text not available';
          const urduText = urduResponse.data.data.ayahs[index]?.text || 'Urdu not available';
          return {
            arabic: arabicText,
            urdu: urduText,
            hinglish: toHinglish(urduText),
            english: englishResponse.data.data.ayahs[index]?.text || 'English not available',
            numberInSurah: ayah.numberInSurah,
            surahId: ayah.surah.number,
            audioUrl: getAudioUrl(narrators.arabic, ayah.surah.number, ayah.numberInSurah),
            urduAudioUrl: getAudioUrl(narrators.urdu, ayah.surah.number, ayah.numberInSurah),
          };
        });

        setJuzData({
          verses,
          name: `Juz ${currentJuz}`,
        });
        setCurrentAyahIndex(-1);
      } catch (err) {
        setError('Failed to load Juz data');
        console.error('Error fetching Juz:', err.response || err);
      } finally {
        setLoading(false);
      }
    };

    fetchJuz();
  }, [currentJuz, englishTranslator]);

  useEffect(() => {
    if (currentAyahIndex >= 0 && ayahRefs.current[currentAyahIndex]) {
      ayahRefs.current[currentAyahIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentAyahIndex]);

  const toHinglish = (urduText) => {
    const translitMap = {
      'ا': 'a', 'آ': 'aa', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ٹ': 't', 'ث': 's', 'ج': 'j',
      'چ': 'ch', 'ح': 'h', 'خ': 'kh', 'د': 'd', 'ڈ': 'd', 'ذ': 'z', 'ر': 'r', 'ڑ': 'r',
      'ز': 'z', 'ژ': 'zh', 'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'z', 'ط': 't', 'ظ': 'z',
      'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ک': 'k', 'گ': 'g', 'ل': 'l', 'م': 'm',
      'ن': 'n', 'ں': 'n', 'و': 'w', 'ہ': 'h', 'ھ': 'h', 'ی': 'y', 'ے': 'e',
    };

    const wordMap = {
      'اللہ': 'Allah', 'ہے': 'hai', 'نہیں': 'nahi', 'اور': 'aur', 'کے': 'ke', 'میں': 'mein',
      'پر': 'par', 'سے': 'se', 'کا': 'ka', 'کی': 'ki', 'کو': 'ko', 'ہم': 'hum', 'تم': 'tum',
    };

    const words = urduText.split(' ');
    const hinglishWords = words.map((word) => {
      if (wordMap[word]) return wordMap[word];
      return word.split('').map((char) => translitMap[char] || char).join('');
    });

    return hinglishWords.join(' ').replace(/\s+/g, ' ').trim();
  };

  const handleArabicAudioEnded = (index) => {
    const data = surahData || juzData;
    if (!data || !data.verses[index]) return;

    setIsPlayingUrdu(true);
    if (urduAudioRefs.current[index]?.audio.current) {
      urduAudioRefs.current[index].audio.current.play();
    } else {
      handleNextAyah(index); // Skip if no Urdu audio
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

  if (loading) {
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

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
          <Button variant="link" className="ml-4" onClick={() => setError(null)}>
            Clear
          </Button>
        </div>
      </div>
    );
  }

  const displayData = surahData || juzData;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex">
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-card shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Quran Navigation</h2>
          <div className="space-y-4">
            <select
              value={currentSurah}
              onChange={(e) => {
                setCurrentSurah(parseInt(e.target.value));
                setCurrentJuz(0);
              }}
              className="w-full p-2 bg-background border rounded-lg"
            >
              {surahsList.map((surah) => (
                <option key={surah.number} value={surah.number}>
                  {surah.number}. {surah.englishName} ({surah.name})
                </option>
              ))}
            </select>
            <select
              value={currentJuz}
              onChange={(e) => {
                setCurrentJuz(parseInt(e.target.value));
                setCurrentSurah(0);
              }}
              className="w-full p-2 bg-background border rounded-lg"
            >
              <option value={0}>Select Juz</option>
              {Array.from({ length: 30 }, (_, i) => i + 1).map((juz) => (
                <option key={juz} value={juz}>
                  Juz {juz}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-xl p-6 shadow-lg mb-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                The Holy Quran
              </h1>
              <Button
                variant="ghost"
                className="md:hidden"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <ScrollText className="h-5 w-5" />
                <span>
                  {surahData
                    ? `Surah ${currentSurah}: ${surahData.englishName} (${surahData.name})`
                    : `Juz ${currentJuz}`}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Languages className="h-5 w-5" />
                <select
                  value={englishTranslator}
                  onChange={(e) => setEnglishTranslator(e.target.value)}
                  className="bg-background border rounded-lg px-2 py-1"
                >
                  {englishTranslators.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-6 max-h-[60vh] overflow-y-auto">
              {displayData?.verses?.map((ayah, index) => (
                <div
                  ref={(el) => (ayahRefs.current[index] = el)}
                  key={`${ayah.surahId || currentSurah}-${ayah.numberInSurah}`}
                  className={`border-b pb-4 transition-colors rounded-lg p-4 ${
                    currentAyahIndex === index ? 'bg-primary/20' : 'hover:bg-muted/50'
                  }`}
                >
                  <p className="text-3xl font-arabic text-right mb-4">
                    {ayah.arabic || 'Arabic text missing'}
                  </p>
                  <div className="space-y-2 text-muted-foreground">
                    <p className="text-lg">
                      <span className="font-semibold">Urdu (Hinglish): </span>
                      {ayah.hinglish}
                    </p>
                    <p className="text-lg">
                      <span className="font-semibold">English: </span>
                      {ayah.english}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {ayah.surahId ? `Surah ${ayah.surahId}:` : ''} Verse {ayah.numberInSurah}
                  </p>
                  {ayah.audioUrl && (
                    <AudioPlayer
                      ref={(el) => (audioRefs.current[index] = el)}
                      src={ayah.audioUrl}
                      showJumpControls={false}
                      customProgressBarSection={[]}
                      customControlsSection={['MAIN_CONTROLS', 'VOLUME_CONTROLS']}
                      className="mt-4 bg-background rounded-lg shadow-sm"
                      autoPlayAfterSrcChange={currentAyahIndex === index && !isPlayingUrdu}
                      onPlay={() => {
                        setCurrentAyahIndex(index);
                        setIsPlayingUrdu(false);
                      }}
                      onEnded={() => handleArabicAudioEnded(index)}
                      onError={(e) => console.error('Arabic audio error:', e)}
                    />
                  )}
                  {ayah.urduAudioUrl && (
                    <AudioPlayer
                      ref={(el) => (urduAudioRefs.current[index] = el)}
                      src={ayah.urduAudioUrl}
                      showJumpControls={false}
                      customProgressBarSection={[]}
                      customControlsSection={['MAIN_CONTROLS', 'VOLUME_CONTROLS']}
                      className="mt-2 bg-background rounded-lg shadow-sm"
                      autoPlayAfterSrcChange={currentAyahIndex === index && isPlayingUrdu}
                      onPlay={() => setIsPlayingUrdu(true)}
                      onEnded={() => handleUrduAudioEnded(index)}
                      onError={(e) => console.error('Urdu audio error:', e)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @font-face {
          font-family: 'Arabic';
          src: url('https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;700&display=swap') format('woff2');
        }
        .font-arabic {
          font-family: 'Noto Naskh Arabic', 'Arabic', sans-serif;
        }
      `}</style>
    </div>
  );
}