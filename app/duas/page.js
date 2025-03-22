'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import DuaCard from './duacard';
import { Skeleton } from '@/components/ui/skeleton';

export default function DuasPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [duas, setDuas] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'daily', name: 'Daily Duas' },
    { id: 'prayer', name: 'Prayer' },
    { id: 'protection', name: 'Protection' },
    { id: 'forgiveness', name: 'Forgiveness' },
  ];

  useEffect(() => {
    async function fetchDuas() {
      try {
        setLoading(true);
        const response = await fetch(`/api/duas?category=${selectedCategory}`);
        if (!response.ok) throw new Error('Failed to fetch duas');
        const data = await response.json();
        setDuas(data);
      } catch (error) {
        console.error('Error fetching duas:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchDuas();
  }, [selectedCategory]);

  const filteredDuas = duas.filter((dua) => {
    const matchesSearch =
      dua.translation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dua.arabic?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary">Duas Collection</h1>
          <p className="text-muted-foreground mt-2">Find peace through supplication</p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col gap-6 mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search duas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-background border rounded-xl shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-background/80 hover:bg-primary/10 border border-muted-foreground/20'
                }`}
              >
                {category.name}
              </button>
            ))}
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-background/80 hover:bg-primary/10 border border-muted-foreground/20'
              }`}
            >
              All
            </button>
          </div>
        </div>

        {/* Loading State with Skeleton */}
        {loading && (
          <div className="grid gap-6">
            {/* Show 3 skeleton cards as placeholders */}
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-background/80 backdrop-blur-sm border border-muted-foreground/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Skeleton className="h-5 w-5 rounded-full" /> {/* BookOpen icon */}
                  <Skeleton className="h-4 w-1/3" /> {/* Reference */}
                </div>
                <Skeleton className="h-8 w-full mb-4" /> {/* Arabic text */}
                <Skeleton className="h-6 w-3/4 mb-4" /> {/* Translation */}
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-full" /> {/* Tag icon */}
                  <Skeleton className="h-4 w-1/4" /> {/* Category */}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Duas List */}
        {!loading && (
          <div className="grid gap-6">
            {filteredDuas.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No duas found.</div>
            ) : (
              filteredDuas.map((dua) => <DuaCard key={dua.id} dua={dua} />)
            )}
          </div>
        )}
      </div>
    </div>
  );
}
