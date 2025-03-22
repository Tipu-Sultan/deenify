import { useEffect, useState } from "react";
import axios from "axios";

const usePrayer = () => {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [hijriDate, setHijriDate] = useState(null);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [cityName, setCityName] = useState("Detecting location...");
  const [searchCity, setSearchCity] = useState("");
  const [timezone, setTimezone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default location (Gonda City)
  const defaultLocation = { latitude: 27.0755981, longitude: 82.008014 };

  // Get user's location initially
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setError("Failed to get location. Using default location.");
          setLocation(defaultLocation);
          setCityName("Gonda City");
        },
        { timeout: 10000 }
      );
    } else {
      setError("Geolocation not supported. Using default location.");
      setLocation(defaultLocation);
      setCityName("Gonda City");
    }
  }, []);

  // Fetch city name and timezone based on coordinates
  useEffect(() => {
    const fetchLocationDetails = async () => {
      if (!location.latitude || !location.longitude) return;

      try {
        const geoResponse = await axios.get(
          process.env.NEXT_PUBLIC_BIGDATA_CLOUD_API,
          {
            params: {
              latitude: location.latitude,
              longitude: location.longitude,
              localityLanguage: "en",
            },
          }
        );

        const { city, locality, timeZone } = geoResponse.data;
        setCityName(city || locality || "Unknown City");
        setTimezone(timeZone || "Asia/Kolkata");
      } catch (err) {
        setCityName("Unknown Location");
        setTimezone("Asia/Kolkata");
        console.error("Error fetching location details:", err);
      }
    };

    fetchLocationDetails();
  }, [location]);

  // Handle city search
  const handleCitySearch = async (e) => {
    e.preventDefault();
    if (!searchCity.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const nominatimResponse = await axios.get(
        process.env.NEXT_PUBLIC_NOMINATIM_API,
        {
          params: {
            q: searchCity,
            format: "json",
            limit: 1,
          },
        }
      );

      if (nominatimResponse.data.length === 0) {
        setError("City not found. Please try again.");
        setLoading(false);
        return;
      }

      const { lat, lon, display_name } = nominatimResponse.data[0];
      setLocation({ latitude: parseFloat(lat), longitude: parseFloat(lon) });
      setCityName(display_name.split(",")[0]);
    } catch (err) {
      setError("Failed to search city");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch prayer times and Hijri date
  useEffect(() => {
    const fetchPrayerTimesAndCalendar = async () => {
      if (!location.latitude || !location.longitude) return;

      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_ALADHAN_API}/${Math.floor(Date.now() / 1000)}`,
          {
            params: {
              latitude: location.latitude,
              longitude: location.longitude,
              method: 2, // Islamic Society of North America
              tune: "0,0,0,0,0,0,0,0,0",
            },
          }
        );

        const { timings, date } = response.data.data;
        setPrayerTimes(timings);
        setHijriDate(date.hijri); // Extract Hijri date info
      } catch (err) {
        setError("Failed to load prayer times and calendar");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimesAndCalendar();
  }, [location]);

  return { 
    prayerTimes, 
    hijriDate, 
    cityName, 
    searchCity, 
    setSearchCity, 
    handleCitySearch, 
    loading, 
    error,
    timezone
  };
};

export default usePrayer;
