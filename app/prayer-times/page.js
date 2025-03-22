'use client';

import { useState } from 'react';
import { MapPin, Clock, Search, Calendar } from 'lucide-react';
import usePrayer from '@/hooks/usePrayer';
import { Skeleton } from '@/components/ui/skeleton';

export default function PrayerTimesPage() {
  const {
    prayerTimes,
    hijriDate,
    cityName,
    searchCity,
    setSearchCity,
    handleCitySearch,
    loading,
    error,
    timezone,
  } = usePrayer();

  // Use setError from the hook if it’s provided; otherwise, keep it local
  const [localError, setLocalError] = useState(error);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-card rounded-xl p-6 shadow-lg mb-8 space-y-6">
            <Skeleton className="h-8 w-1/4 mx-auto" /> {/* Title */}
            <Skeleton className="h-12 w-full" /> {/* Search bar */}
            <Skeleton className="h-6 w-1/3 mx-auto" /> {/* Location */}
            <div className="grid gap-4 md:grid-cols-2">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full rounded-lg" /> // Prayer cards
              ))}
            </div>
            <Skeleton className="h-24 w-full rounded-lg" /> {/* Calendar */}
          </div>
          <Skeleton className="h-24 w-full rounded-xl" /> {/* Settings */}
        </div>
      </div>
    );
  }

  if (localError || error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {localError || error}
          <button
            onClick={() => setLocalError(null)} // Assuming usePrayer doesn’t provide a setter for error
            className="ml-4 text-sm underline"
          >
            Clear
          </button>
        </div>
      </div>
    );
  }

  const prayers = prayerTimes
    ? [
        { name: 'Fajr', time: prayerTimes.Fajr || 'N/A' },
        { name: 'Sunrise', time: prayerTimes.Sunrise || 'N/A' },
        { name: 'Dhuhr', time: prayerTimes.Dhuhr || 'N/A' },
        { name: 'Asr', time: prayerTimes.Asr || 'N/A' },
        { name: 'Maghrib', time: prayerTimes.Maghrib || 'N/A' },
        { name: 'Isha', time: prayerTimes.Isha || 'N/A' },
      ]
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-card rounded-xl p-6 shadow-lg mb-8">
          <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Prayer Times
          </h1>

          {/* Search Input */}
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

          {/* Location Display */}
          <div className="flex items-center justify-center gap-2 mb-6 text-muted-foreground">
            <MapPin className="h-5 w-5" />
            <span>{cityName}</span>
            {timezone && <span className="text-sm">({timezone})</span>}
          </div>

          {/* Prayer Times */}
          <div className="grid gap-4 md:grid-cols-2 mb-8">
            {prayers.map((prayer) => (
              <div
                key={prayer.name}
                className="flex items-center justify-between p-4 bg-background/80 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-all border border-muted-foreground/10"
              >
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-medium">{prayer.name}</span>
                </div>
                <span className="text-muted-foreground font-mono">{prayer.time}</span>
              </div>
            ))}
          </div>

          {/* Hijri Calendar */}
          {hijriDate && (
            <div className="mt-8 p-6 bg-background/80 backdrop-blur-sm rounded-xl shadow-md border border-muted-foreground/10">
              <h2 className="text-xl font-semibold mb-4 text-center flex items-center justify-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Islamic Calendar
              </h2>
              <div className="text-center space-y-2">
                <p className="text-2xl font-medium text-primary">
                  {hijriDate.day} {hijriDate.month.en} {hijriDate.year} AH
                </p>
                <p className="text-muted-foreground">
                  {hijriDate.weekday.en} ({hijriDate.weekday.ar})
                </p>
                <p className="text-sm text-muted-foreground">
                  {hijriDate.designation.abbreviated} Date: {hijriDate.date}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-card rounded-xl p-6 shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-4">Prayer Time Settings</h2>
          <p className="text-muted-foreground text-sm">
            Prayer times are calculated using the Islamic Society of North America (ISNA)
            method. Times are based on your current or searched location and local timezone.
          </p>
        </div>
      </div>
    </div>
  );
}