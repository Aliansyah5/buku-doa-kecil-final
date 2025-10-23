import { useState, useEffect, useContext } from "react";
import { appContext } from "../../context/app-context";

export default function IslamicBanner() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState(null);
  const [prayerTimes, setPrayerTimes] = useState(null);
  const { settings } = useContext(appContext);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Fetch prayer times from API
  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, "0");
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const year = today.getFullYear();
        const dateString = `${year}-${month}-${day}`;

        const response = await fetch(
          `https://api.myquran.com/v2/sholat/jadwal/${settings.lokasi}/${dateString}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();

        // Transform API data to our format
        const transformedPrayerTimes = {
          subuh: {
            name: "Subuh",
            time: result.data.jadwal.subuh,
            arabicName: "الفجر",
          },
          dzuhur: {
            name: "Dzuhur",
            time: result.data.jadwal.dzuhur,
            arabicName: "الظهر",
          },
          ashar: {
            name: "Ashar",
            time: result.data.jadwal.ashar,
            arabicName: "العصر",
          },
          maghrib: {
            name: "Maghrib",
            time: result.data.jadwal.maghrib,
            arabicName: "المغرب",
          },
          isya: {
            name: "Isya",
            time: result.data.jadwal.isya,
            arabicName: "العشاء",
          },
        };

        setPrayerTimes(transformedPrayerTimes);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
        // Fallback to default times if API fails
        const fallbackTimes = {
          subuh: { name: "Subuh", time: "04:30", arabicName: "الفجر" },
          dzuhur: { name: "Dzuhur", time: "12:15", arabicName: "الظهر" },
          ashar: { name: "Ashar", time: "15:30", arabicName: "العصر" },
          maghrib: { name: "Maghrib", time: "18:45", arabicName: "المغرب" },
          isya: { name: "Isya", time: "20:00", arabicName: "العشاء" },
        };
        setPrayerTimes(fallbackTimes);
      }
    };

    if (settings?.lokasi) {
      fetchPrayerTimes();
    }
  }, [settings?.lokasi]);

  // Fungsi untuk menghitung sholat berikutnya
  useEffect(() => {
    const calculateNextPrayer = () => {
      if (!prayerTimes) return;

      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTimeInMinutes = currentHour * 60 + currentMinute;

      const prayerTimesArray = Object.values(prayerTimes).map((prayer) => {
        const [hour, minute] = prayer.time.split(":").map(Number);
        const timeInMinutes = hour * 60 + minute;
        return {
          ...prayer,
          timeInMinutes,
          remainingTime:
            timeInMinutes > currentTimeInMinutes
              ? timeInMinutes - currentTimeInMinutes
              : 24 * 60 - currentTimeInMinutes + timeInMinutes, // Next day
        };
      });

      // Cari sholat terdekat
      const nextPrayerTime = prayerTimesArray.reduce((closest, current) =>
        current.remainingTime < closest.remainingTime ? current : closest
      );

      setNextPrayer(nextPrayerTime);
    };

    calculateNextPrayer();
  }, [currentTime, prayerTimes]);

  const formatRemainingTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours > 0) {
      return `${hours}j ${mins}m`;
    }
    return `${mins}m`;
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Selamat Pagi";
    if (hour < 15) return "Selamat Siang";
    if (hour < 18) return "Selamat Sore";
    return "Selamat Malam";
  };

  const formatTime = () => {
    return currentTime.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="relative overflow-hidden">
      {/* Main Banner with Gradient */}
      <div className="relative bg-linear-to-r from-emerald-600 via-emerald-500 to-green-500 px-6 py-8">
        {/* Islamic Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="islamic-ornament-pattern w-full h-full"></div>
        </div>

        {/* Golden accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-yellow-400 via-yellow-300 to-yellow-400"></div>

        {/* Content */}
        <div className="relative z-10">
          {/* Top Section */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                {/* Crescent Moon Icon */}
                <div className="w-6 h-6 relative">
                  <div className="absolute inset-0 bg-yellow-300 rounded-full opacity-80"></div>
                  <div className="absolute top-1 left-1 w-4 h-4 bg-emerald-600 rounded-full"></div>
                </div>
                <h1 className="text-white text-2xl font-bold tracking-wide">
                  Assalamualaikum
                </h1>
              </div>
              <p className="text-emerald-100 text-sm font-medium">
                {getGreeting()}, semoga berkah selalu
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-1 h-1 bg-yellow-300 rounded-full"></div>
                <span className="text-emerald-200 text-xs">{formatTime()}</span>
              </div>
            </div>

            {/* Islamic Illustration */}
            <div className="ml-4 relative">
              {/* Mosque Silhouette */}
              <div className="w-16 h-16 relative">
                {/* Stars */}
                <div className="absolute -top-2 -right-1 w-2 h-2">
                  <div className="star-shape bg-yellow-300 opacity-80"></div>
                </div>
                <div className="absolute -top-1 left-2 w-1.5 h-1.5">
                  <div className="star-shape bg-yellow-200 opacity-60"></div>
                </div>

                {/* Mosque */}
                <div className="absolute bottom-0 w-full h-10 bg-white/20 backdrop-blur-sm rounded-t-xl">
                  {/* Dome */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white/30 rounded-full"></div>
                  {/* Minaret */}
                  <div className="absolute -top-6 left-2 w-2 h-8 bg-white/25 rounded-t-full"></div>
                  <div className="absolute -top-6 right-2 w-2 h-8 bg-white/25 rounded-t-full"></div>
                  {/* Central spire */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-yellow-300/80"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Prayer Time Indicator */}
          {nextPrayer && (
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-emerald-100/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {/* Prayer Icon */}
                  <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center shadow-md">
                    <div className="w-5 h-5 bg-yellow-300 rounded-full relative">
                      <div className="absolute inset-1 bg-white rounded-full"></div>
                    </div>
                  </div>

                  {/* Prayer Info */}
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <span className="text-gray-800 font-bold text-base">
                        Sholat {nextPrayer.name}
                      </span>
                      <span className="text-emerald-600 text-sm font-arabic font-medium">
                        {nextPrayer.arabicName}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600 text-sm font-medium">
                        Pukul {nextPrayer.time}
                      </span>
                      <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
                      <span className="text-emerald-700 text-sm font-semibold">
                        {formatRemainingTime(nextPrayer.remainingTime)} lagi
                      </span>
                    </div>
                  </div>
                </div>

                {/* Time Badge */}
                <div className="bg-linear-to-r from-emerald-50 to-green-50 px-4 py-2 rounded-xl border border-emerald-200">
                  <div className="text-center">
                    <div className="text-emerald-700 text-xs font-medium uppercase tracking-wide">
                      Tersisa
                    </div>
                    <div className="text-emerald-800 text-lg font-bold">
                      {formatRemainingTime(nextPrayer.remainingTime)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bar Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 font-medium">
                    Progress Waktu Sholat
                  </span>
                  <span className="text-emerald-600 font-semibold">
                    {Math.round(
                      Math.max(5, 100 - nextPrayer.remainingTime / 10)
                    )}
                    %
                  </span>
                </div>

                {/* Enhanced Progress Bar */}
                <div className="relative">
                  {/* Background bar */}
                  <div className="w-full h-3 bg-linear-to-r from-gray-100 to-gray-200 rounded-full overflow-hidden shadow-inner">
                    {/* Progress fill */}
                    <div
                      className="h-full bg-linear-to-r from-emerald-400 via-emerald-500 to-green-500 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                      style={{
                        width: `${Math.max(
                          5,
                          100 - nextPrayer.remainingTime / 10
                        )}%`,
                      }}
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-pulse"></div>
                    </div>
                  </div>

                  {/* Progress indicator dot */}
                  <div
                    className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-3 border-emerald-500 rounded-full shadow-lg transition-all duration-1000 ease-out"
                    style={{
                      left: `calc(${Math.max(
                        5,
                        100 - nextPrayer.remainingTime / 10
                      )}% - 8px)`,
                    }}
                  >
                    <div className="absolute inset-1 bg-emerald-500 rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Time markers */}
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>Sekarang</span>
                  <span>{nextPrayer.name}</span>
                </div>
              </div>

              {/* Action Hint */}
              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-center space-x-2 text-gray-500 text-xs">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span>
                    Bersiaplah untuk melaksanakan sholat {nextPrayer.name}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom decorative border */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-yellow-300 to-transparent opacity-60"></div>
      </div>

      {/* Curved bottom edge */}
      <div className="relative">
        <svg
          className="w-full h-4 text-emerald-500"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C120,60 240,60 360,30 C480,0 600,0 720,30 C840,60 960,60 1080,30 C1140,15 1170,7.5 1200,0 L1200,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}
