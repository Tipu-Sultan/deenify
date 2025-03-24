import { createContext, useState, useEffect, useContext } from "react";

const HadithContext = createContext();

const BASE_URL = "https://hadithapi.com/api";
const API_KEY =
  process.env.NEXT_PUBLIC_HADITH_API_KEY ||
  "$2y$10$RgqYzdFHt06wwvwnumtXPeUFbvkt0fP4eIEgS3XvVHYyap1li5c0O";

export function HadithProvider({ children }) {
  const [collections, setCollections] = useState([]);
  const [chapters, setChapters] = useState({});
  const [hadiths, setHadiths] = useState({});

  // Fetch collections only once
  useEffect(() => {
    async function getCollections() {
      try {
        const response = await fetch(`${BASE_URL}/books?apiKey=${API_KEY}`);
        if (!response.ok) throw new Error("Failed to fetch collections");
        const data = await response.json();
        setCollections(data.books || []);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    }
    getCollections();
  }, []);

  // Fetch chapters for a collection
  async function fetchChapters(bookSlug) {
    if (chapters[bookSlug]) return chapters[bookSlug]; // Return cached data

    try {
      const response = await fetch(
        `${BASE_URL}/${bookSlug}/chapters?apiKey=${API_KEY}`
      );
      if (!response.ok) throw new Error("Failed to fetch chapters");
      const data = await response.json();
      setChapters((prev) => ({ ...prev, [bookSlug]: data.chapters || [] }));
      return data.chapters || [];
    } catch (error) {
      console.error("Error fetching chapters:", error);
      return [];
    }
  }

  // Fetch Hadiths for a chapter
  async function fetchHadiths(bookSlug, chapterId) {
    const key = `${bookSlug}-${chapterId}`;
    if (hadiths[key]) return hadiths[key]; // Return cached data

    try {
      const response = await fetch(
        `${BASE_URL}/hadiths?apiKey=${API_KEY}&book=${bookSlug}&chapter=${chapterId}`
      );
      if (!response.ok) throw new Error("Failed to fetch Hadiths");
      const data = await response.json();
      setHadiths((prev) => ({ ...prev, [key]: data.hadiths?.data || [] }));
      return data.hadiths?.data || [];
    } catch (error) {
      console.error("Error fetching Hadiths:", error);
      return [];
    }
  }

  return (
    <HadithContext.Provider value={{ collections, fetchChapters, fetchHadiths }}>
      {children}
    </HadithContext.Provider>
  );
}

export function useHadith() {
  return useContext(HadithContext);
}
