import { useState, useEffect } from 'react';
import axios from 'axios';

export const useMetadata = () => {
  const [surahsList, setSurahsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_QURAN_API}/surah`);
        setSurahsList(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching metadata:', err);
        setError('Failed to load Surah list');
        setLoading(false);
      }
    };
    fetchMetadata();
  }, []);

  return { surahsList, loading, error };
};