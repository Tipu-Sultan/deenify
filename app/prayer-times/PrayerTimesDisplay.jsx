import { MapPin, Clock, Calendar } from "lucide-react";

export default function PrayerTimesDisplay({ prayers, hijriDate, cityName, timezone }) {
  return (
    <>
      <div className="bg-card rounded-xl p-6 shadow-lg mb-8">
        {/* Location and Current Time */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-5 w-5" />
            <span>{cityName}</span>
            {timezone && <span className="text-sm">({timezone})</span>}
          </div>
        </div>

        {/* Prayer Times */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 mb-8">
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
    </>
  );
}