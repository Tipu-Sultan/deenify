"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PrayerTimesControls({ initialCity }) {
  const [searchCity, setSearchCity] = useState(initialCity);
  const router = useRouter();

  const handleCitySearch = (e) => {
    e.preventDefault();
    if (searchCity.trim()) {
      router.push(`/prayer-times?city=${encodeURIComponent(searchCity)}`, { scroll: false });
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-lg mb-8">
      <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
        Prayer Times
      </h1>
      <form onSubmit={handleCitySearch} className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by city (e.g., Mumbai, Kolkata)..."
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-background/80 backdrop-blur-sm border rounded-xl shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
      </form>
    </div>
  );
}