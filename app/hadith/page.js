'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Book, Hash, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function HadithSearch() {
  const [searchParams, setSearchParams] = useState({
    book: '',
    number: '',
    chapter: '',
    keyword: '',
  });
  const [hadiths, setHadiths] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock Hadith data (for demo; replace with API or full dataset)
  const mockHadiths = [
    {
      book: 'Sahih al-Bukhari',
      number: 1,
      chapter: 'Revelation',
      text: 'The commencement of the Divine Inspiration to Allah\'s Messenger was in the form of good dreams...',
    },
    {
      book: 'Sahih Muslim',
      number: 2,
      chapter: 'Faith',
      text: 'Faith is to believe in Allah, His angels, His books, His messengers...',
    },
    {
      book: 'Sunan Abu Dawud',
      number: 3,
      chapter: 'Prayer',
      text: 'The prayer of a person who does not recite Al-Fatiha is invalid...',
    },
    {
      book: 'Muwatta Malik',
      number: 4,
      chapter: 'Purity',
      text: 'He who performs ablution perfectly, his sins will depart from his body...',
    },
  ];

  // Fetch Hadiths from API or mock data
  const fetchHadiths = async () => {
    setLoading(true);
    setError(null);

    try {
      // Real API call (limited to demo; adjust for full dataset)
      const { book, number, chapter, keyword } = searchParams;
      let filteredHadiths = mockHadiths;

      // If using real API (example: Aladhan Hadith API)
      // const response = await axios.get(`https://api.aladhan.com/v1/hadith?book=${book}&number=${number}`);
      // filteredHadiths = response.data.data;

      // Filter mock data based on search params
      if (book) {
        filteredHadiths = filteredHadiths.filter((h) => h.book.toLowerCase() === book.toLowerCase());
      }
      if (number) {
        filteredHadiths = filteredHadiths.filter((h) => h.number === parseInt(number));
      }
      if (chapter) {
        filteredHadiths = filteredHadiths.filter((h) =>
          h.chapter.toLowerCase().includes(chapter.toLowerCase())
        );
      }
      if (keyword) {
        filteredHadiths = filteredHadiths.filter((h) =>
          h.text.toLowerCase().includes(keyword.toLowerCase())
        );
      }

      setHadiths(filteredHadiths);
    } catch (err) {
      setError('Failed to fetch Hadiths. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (key, value) => {
    setSearchParams((prev) => ({ ...prev, [key]: value }));
  };

  // Handle form submission
  const handleSearch = (e) => {
    e.preventDefault();
    fetchHadiths();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Hadith Search
        </h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="bg-card p-6 rounded-xl shadow-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Book Selection */}
            <div className="flex items-center gap-2">
              <Book className="h-5 w-5 text-muted-foreground" />
              <Select
                value={searchParams.book}
                onValueChange={(value) => handleInputChange('book', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Book" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sahih al-Bukhari">Sahih al-Bukhari</SelectItem>
                  <SelectItem value="Sahih Muslim">Sahih Muslim</SelectItem>
                  <SelectItem value="Sunan Abu Dawud">Sunan Abu Dawud</SelectItem>
                  <SelectItem value="Muwatta Malik">Muwatta Malik</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Hadith Number */}
            <div className="flex items-center gap-2">
              <Hash className="h-5 w-5 text-muted-foreground" />
              <Input
                type="number"
                placeholder="Hadith Number"
                value={searchParams.number}
                onChange={(e) => handleInputChange('number', e.target.value)}
                className="w-full"
              />
            </div>

            {/* Chapter */}
            <div className="flex items-center gap-2">
              <List className="h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Chapter Name"
                value={searchParams.chapter}
                onChange={(e) => handleInputChange('chapter', e.target.value)}
                className="w-full"
              />
            </div>

            {/* Keyword */}
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Keyword in Hadith"
                value={searchParams.keyword}
                onChange={(e) => handleInputChange('keyword', e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <Button type="submit" className="mt-4 w-full" disabled={loading}>
            {loading ? 'Searching...' : 'Search Hadiths'}
          </Button>
        </form>

        {/* Results */}
        <div className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
              {error}
            </div>
          )}

          {hadiths.length === 0 && !loading && !error && (
            <p className="text-center text-muted-foreground">
              No Hadiths found. Try adjusting your search.
            </p>
          )}

          {loading && (
            <div className="text-center text-muted-foreground">Loading Hadiths...</div>
          )}

          {hadiths.map((hadith, index) => (
            <div
              key={index}
              className="bg-card p-4 rounded-lg shadow-md hover:bg-muted/50 transition-colors"
            >
              <h3 className="text-lg font-semibold">
                {hadith.book} - Hadith #{hadith.number}
              </h3>
              <p className="text-sm text-muted-foreground">Chapter: {hadith.chapter}</p>
              <p className="mt-2">{hadith.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}