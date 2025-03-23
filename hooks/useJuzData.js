import { useState, useEffect } from 'react';
import axios from 'axios';
import { getAudioUrl, narrators } from '@/utils/audioUtils';

export const useJuzData = (currentJuz, englishTranslator) => {
  const [juzData, setJuzData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJuz = async () => {
      if (currentJuz === 0) return;

      try {
        setLoading(true);
        setError(null);
        const [arabicResponse, urduResponse, englishResponse] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_QURAN_API}/juz/${currentJuz}/ar.uthmani`),
          axios.get(`${process.env.NEXT_PUBLIC_QURAN_API}/juz/${currentJuz}/ur.jalandhry`),
          axios.get(`${process.env.NEXT_PUBLIC_QURAN_API}/juz/${currentJuz}/${englishTranslator}`),
        ]);

        const verses = arabicResponse.data.data.ayahs.map((ayah, index) => ({
          arabic: ayah.text || 'Arabic text not available',
          urdu: urduResponse.data.data.ayahs[index]?.text || 'Urdu not available',
          english: englishResponse.data.data.ayahs[index]?.text || 'English not available',
          numberInSurah: ayah.numberInSurah,
          surahId: ayah.surah.number,
          audioUrl: getAudioUrl(narrators.arabic, ayah.surah.number, ayah.numberInSurah),
          urduAudioUrl: getAudioUrl(narrators.urdu, ayah.surah.number, ayah.numberInSurah),
        }));

        setJuzData({
          verses,
          name: `Juz ${currentJuz}`,
        });
      } catch (err) {
        setError('Failed to load Juz data');
        console.error('Error fetching Juz:', err.response || err);
      } finally {
        setLoading(false);
      }
    };

    fetchJuz();
  }, [currentJuz, englishTranslator]);

  return { juzData, loading, error, setJuzData };
};