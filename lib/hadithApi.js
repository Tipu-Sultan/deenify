const BASE_URL = "https://hadithapi.com/api";
const API_KEY =
  process.env.NEXT_PUBLIC_HADITH_API_KEY ||
  "$2y$10$RgqYzdFHt06wwvwnumtXPeUFbvkt0fP4eIEgS3XvVHYyap1li5c0O";

// Fetch all Hadith collections
export async function fetchCollections() {
  const response = await fetch(`${BASE_URL}/books?apiKey=${API_KEY}`, {
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Failed to fetch collections");
  return response.json();
}

// Fetch chapters for a collection
export async function fetchChapters(bookSlug) {
  const response = await fetch(
    `${BASE_URL}/${bookSlug}/chapters?apiKey=${API_KEY}`,
    {
      cache: "no-store",
    }
  );
  if (!response.ok) throw new Error("Failed to fetch chapters");
  return response.json();
}

// Fetch Hadiths for a chapter
export async function fetchHadiths(bookSlug, chapterId) {
  try {
    const response = await fetch(
      `${BASE_URL}/hadiths?apiKey=${API_KEY}&book=${bookSlug}&chapter=${chapterId}`,
      { cache: "no-store" }
    );
    if (!response.ok)
      throw new Error(`Failed to fetch Hadiths: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Hadiths:", error);
    throw error;
  }
}

export async function fetchHadith(bookSlug, chapterId, hadithNumber) {
  try {
    const response = await fetch(
      `${BASE_URL}/hadiths?apiKey=${API_KEY}&book=${bookSlug}&chapter=${chapterId}`,
      { cache: "no-store" }
    );
    if (!response.ok)
      throw new Error(`Failed to fetch Hadith: ${response.status}`);
    const data = await response.json();
    const hadiths = Array.isArray(data.hadiths?.data) ? data.hadiths.data : [];
    return hadiths.find((h) => h.hadithNumber === hadithNumber) || null;
  } catch (error) {
    console.error("Error fetching Hadith:", error);
    return null;
  }
}
