"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import DuaCard from "./duacard";
import { Skeleton } from "@/components/ui/skeleton";

export default function DuasPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [duas, setDuas] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: "daily-dua", name: "Daily Dua" },
    { id: "dhikr-after-salah", name: "Dhikr After Salah" },
    { id: "evening-dhikr", name: "Evening Dhikr" },
    { id: "morning-dhikr", name: "Morning Dhikr" },
    { id: "selected-dua", name: "Selected Dua" },
  ];

  useEffect(() => {
    async function fetchDuas() {
      try {
        setLoading(true);
        const response = await fetch(`/api/duas?category=${selectedCategory}`);
        if (!response.ok) throw new Error("Failed to fetch duas");
        const data = await response.json();
        setDuas(data); // Data is now an array
      } catch (error) {
        console.error("Error fetching duas:", error);
        setDuas([]);
      } finally {
        setLoading(false);
      }
    }
    fetchDuas();
  }, [selectedCategory]);

  const filteredDuas = duas.filter((dua) =>
    [dua.title, dua.arabic, dua.translation, dua.latin]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">Duas Collection</h1>
          <p className="mt-2">Find peace through supplication</p>
        </div>

        <div className="flex flex-col gap-6 mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5" />
            <input
              type="text"
              placeholder="Search duas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "hover:bg-primary/10 border border-border"
                }`}
              >
                {category.name}
              </button>
            ))}
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === "all"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "hover:bg-primary/10 border border-border"
              }`}
            >
              All
            </button>
          </div>
        </div>

        {loading && (
          <div className="grid gap-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="p-6 rounded-xl border shadow-sm">
                <Skeleton className="h-6 w-1/2 mb-4" />
                <Skeleton className="h-8 w-full mb-4" />
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            ))}
          </div>
        )}

        {!loading && (
          <div className="grid gap-6">
            {filteredDuas.length === 0 ? (
              <div className="text-center py-12">No duas found.</div>
            ) : (
              filteredDuas.map((dua, index) => (
                <DuaCard key={index} dua={dua} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}