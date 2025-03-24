"use client";

import { useState, useEffect } from "react";

export default function CurrentTimeDisplay({ timezone }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now);
    };

    // Update every second
    const interval = setInterval(updateTime, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Format time based on timezone
  const timeString = currentTime.toLocaleTimeString("en-US", {
    timeZone: timezone || "UTC", // Fallback to UTC if timezone is missing
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="flex items-center justify-center mb-6">
      <div className="bg-background/80 backdrop-blur-sm rounded-lg shadow-md border border-muted-foreground/10 p-4">
        <h3 className="text-lg font-semibold">Current Time</h3>
        <p className="text-3xl font-mono text-primary mt-2">{timeString}</p>
      </div>
    </div>
  );
}
