import { useState, useEffect } from 'react';
import axios from 'axios';
import { getAudioUrl, narrators } from '@/utils/audioUtils';

export const useSurahData = (currentSurah, englishTranslator, surahsList) => {
  const [surahData, setSurahData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSurah = async () => {
      if (!surahsList.length || currentSurah === 0) return;

      try {
        setLoading(true);
        setError(null);
        const [arabicResponse, urduResponse, englishResponse] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_QURAN_API}/surah/${currentSurah}/ar.uthmani`),
          axios.get(`${process.env.NEXT_PUBLIC_QURAN_API}/surah/${currentSurah}/ur.jalandhry`),
          axios.get(`${process.env.NEXT_PUBLIC_QURAN_API}/surah/${currentSurah}/${englishTranslator}`),
        ]);

        const verses = arabicResponse.data.data.ayahs.map((ayah, index) => ({
          arabic: ayah.text || 'Arabic text not available',
          urdu: urduResponse.data.data.ayahs[index]?.text || 'Urdu not available',
          english: englishResponse.data.data.ayahs[index]?.text || 'English not available',
          numberInSurah: ayah.numberInSurah,
          audioUrl: getAudioUrl(narrators.arabic, currentSurah, ayah.numberInSurah),
          urduAudioUrl: getAudioUrl(narrators.urdu, currentSurah, ayah.numberInSurah),
        }));

        setSurahData({
          verses,
          name: arabicResponse.data.data.name,
          englishName: arabicResponse.data.data.englishName,
        });
      } catch (err) {
        setError('Failed to load Surah data');
        console.error('Error fetching Surah:', err.response || err);
      } finally {
        setLoading(false);
      }
    };

    fetchSurah();
  }, [currentSurah, englishTranslator, surahsList]);

  return { surahData, loading, error, setSurahData };
};