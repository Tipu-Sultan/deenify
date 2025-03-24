import DuaCard from "./duacard";
import ClientDuaControls from "./ClientDuaControls";

async function fetchDuas(category = "selected-dua") {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/duas?category=${category}`;
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    console.error("Fetch failed:", response.status, response.statusText);
    throw new Error("Failed to fetch duas");
  }
  const data = await response.json();
  return data;
}

export default async function DuasPage({ searchParams }) {
  const category = searchParams?.category || "selected-dua";
  let duas = [];

  try {
    duas = await fetchDuas(category);
  } catch (error) {
    console.error("Error in DuasPage:", error);
    duas = [];
  }

  const categories = [
    { id: "daily-dua", name: "Daily Dua" },
    { id: "dhikr-after-salah", name: "Dhikr After Salah" },
    { id: "evening-dhikr", name: "Evening Dhikr" },
    { id: "morning-dhikr", name: "Morning Dhikr" },
    { id: "selected-dua", name: "Selected Dua" },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">Duas Collection</h1>
          <p className="mt-2">Find peace through supplication</p>
        </div>

        <ClientDuaControls
          initialDuas={duas}
          categories={categories}
          initialCategory={category}
        />
      </div>
    </div>
  );
}