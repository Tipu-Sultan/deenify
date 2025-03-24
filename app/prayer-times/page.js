import PrayerTimesControls from "./PrayerTimesControls";
import PrayerTimesDisplay from "./PrayerTimesDisplay";

// Fetch prayer times server-side (replace with your actual API logic)
async function fetchPrayerTimes(city = "Lucknow") {
  const url = `http://api.aladhan.com/v1/timingsByCity?city=${city}&country=India&method=2`; // ISNA method
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error("Failed to fetch prayer times");
  const data = await response.json();

  return {
    prayerTimes: data.data.timings,
    hijriDate: data.data.date.hijri,
    timezone: data.data.meta.timezone,
    cityName: city,
  };
}

export default async function PrayerTimesPage({ searchParams }) {
  const city = searchParams?.city || "Lucknow"; // Default city
  let prayerData = {
    prayerTimes: null,
    hijriDate: null,
    timezone: null,
    cityName: city,
    error: null,
  };

  try {
    prayerData = await fetchPrayerTimes(city);
  } catch (error) {
    console.error("Error fetching prayer times:", error);
    prayerData.error = "Unable to fetch prayer times. Please try again.";
  }

  const prayers = prayerData.prayerTimes
    ? [
        { name: "Fajr", time: prayerData.prayerTimes.Fajr || "N/A" },
        { name: "Sunrise", time: prayerData.prayerTimes.Sunrise || "N/A" },
        { name: "Dhuhr", time: prayerData.prayerTimes.Dhuhr || "N/A" },
        { name: "Asr", time: prayerData.prayerTimes.Asr || "N/A" },
        { name: "Maghrib", time: prayerData.prayerTimes.Maghrib || "N/A" },
        { name: "Isha", time: prayerData.prayerTimes.Isha || "N/A" },
      ]
    : [];

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {prayerData.error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg">
            {prayerData.error}
          </div>
        ) : (
          <>
            <PrayerTimesControls initialCity={city} />
            <PrayerTimesDisplay
              prayers={prayers}
              hijriDate={prayerData.hijriDate}
              cityName={prayerData.cityName}
              timezone={prayerData.timezone}
            />
          </>
        )}
      </div>
    </div>
  );
}

export async function generateMetadata({ searchParams }) {
  const city = searchParams?.city || "Mumbai";
  return {
    title: `Prayer Times for ${city} | Deenify`,
    description: `Get accurate prayer times for ${city} with Islamic (Hijri) calendar details.`,
  };
}