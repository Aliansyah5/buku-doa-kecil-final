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
      {/* Main Banner with Background Image */}
      <div className="relative bg-linear-to-br from-emerald-600 via-emerald-500 to-green-600 px-5 py-6 overflow-hidden">
        {/* Pattern Background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <img
            src="/icon/pattern1.png"
            alt="Pattern"
            className="w-full h-full object-cover opacity-[0.06]"
            style={{
              transform: "scale(1.5)",
              imageRendering: "crisp-edges",
            }}
          />
        </div>

        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/icon/welcomegambar.png"
            alt="Islamic Background"
            className="w-full h-full object-cover opacity-15"
          />
        </div>

        {/* Overlay Gradient untuk memastikan text tetap readable */}
        <div className="absolute inset-0 bg-linear-to-br from-emerald-600/70 via-emerald-500/60 to-green-600/70"></div>

        {/* Islamic Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.08]">
          <div className="islamic-ornament-pattern w-full h-full"></div>
        </div>

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-yellow-400 to-transparent"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Top Section - Greeting */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex-1">
              <div className="flex items-center space-x-2.5 mb-2">
                {/* Crescent Moon Icon - Improved */}
                <div className="w-7 h-7 relative">
                  <div className="absolute inset-0 bg-linear-to-br from-yellow-300 to-yellow-400 rounded-full shadow-lg"></div>
                  <div className="absolute top-1 left-1.5 w-4 h-4 bg-emerald-600 rounded-full"></div>
                  <div className="absolute inset-0 bg-yellow-200/30 rounded-full blur-sm"></div>
                </div>
                <h1 className="text-white text-2xl font-bold tracking-wide drop-shadow-md">
                  Assalamualaikum
                </h1>
              </div>
              <p className="text-white/90 text-sm font-medium ml-9">
                {getGreeting()}, Semoga hari ini lancar barokah.
              </p>
              <div className="flex items-center space-x-2 mt-1.5 ml-9">
                <div className="flex items-center space-x-1.5 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
                  <svg
                    className="w-3 h-3 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-white text-xs font-semibold">
                    {formatTime()}
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative Islamic Art */}
            <div className="hidden sm:block ml-4">
              <div className="w-20 h-20 relative">
                {/* Stars decorations */}
                <div className="absolute -top-1 -right-2 w-2.5 h-2.5 animate-pulse">
                  <div className="star-shape bg-yellow-300 shadow-lg"></div>
                </div>
                <div
                  className="absolute top-2 left-1 w-1.5 h-1.5 animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                >
                  <div className="star-shape bg-yellow-200"></div>
                </div>
                <div
                  className="absolute bottom-4 -right-1 w-2 h-2 animate-pulse"
                  style={{ animationDelay: "1s" }}
                >
                  <div className="star-shape bg-yellow-400/70"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Prayer Time Indicator - Enhanced */}
          {nextPrayer && (
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/50">
              {/* Main Info Section */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  {/* Prayer Icon - Dynamic Weather Based */}
                  <div
                    className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-md relative overflow-hidden ${
                      nextPrayer.name === "Subuh"
                        ? "bg-linear-to-br from-indigo-500 to-purple-600"
                        : nextPrayer.name === "Dzuhur"
                        ? "bg-linear-to-br from-amber-400 to-orange-500"
                        : nextPrayer.name === "Ashar"
                        ? "bg-linear-to-br from-orange-400 to-amber-600"
                        : nextPrayer.name === "Maghrib"
                        ? "bg-linear-to-br from-pink-500 to-purple-600"
                        : "bg-linear-to-br from-indigo-600 to-blue-800"
                    }`}
                  >
                    {/* Icon pattern overlay */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="islamic-icon-pattern w-full h-full"></div>
                    </div>

                    {/* Dynamic Weather Icons */}
                    {nextPrayer.name === "Subuh" && (
                      // Dawn - Moon with stars fading
                      <svg
                        className="w-6 h-6 text-white relative z-10"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                      </svg>
                    )}

                    {nextPrayer.name === "Dzuhur" && (
                      // Noon - Bright sun
                      <svg
                        className="w-6 h-6 text-white relative z-10"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}

                    {nextPrayer.name === "Ashar" && (
                      // Afternoon - Sun lower
                      <svg
                        className="w-6 h-6 text-white relative z-10"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    )}

                    {nextPrayer.name === "Maghrib" && (
                      // Sunset
                      <svg
                        className="w-6 h-6 text-white relative z-10"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 20h18"
                        />
                      </svg>
                    )}

                    {nextPrayer.name === "Isya" && (
                      // Night - Moon and stars
                      <svg
                        className="w-6 h-6 text-white relative z-10"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                    )}
                  </div>

                  {/* Prayer Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-0.5">
                      <h3 className="text-gray-900 font-bold text-base truncate">
                        Sholat {nextPrayer.name}
                      </h3>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="flex items-center space-x-1.5">
                        <svg
                          className="w-3.5 h-3.5 text-gray-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-600 font-medium">
                          {nextPrayer.time}
                        </span>
                      </div>
                      <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Time Badge - Compact */}
                <div className="shrink-0 bg-linear-to-br from-emerald-50 to-green-50 px-3.5 py-2 rounded-xl border border-emerald-200/50 ml-3">
                  <div className="text-center">
                    <div className="text-emerald-600 text-[10px] font-semibold uppercase tracking-wider mb-0.5">
                      Tersisa
                    </div>
                    <div className="text-emerald-800 text-lg font-bold leading-none">
                      {formatRemainingTime(nextPrayer.remainingTime)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bar Section - Compact */}
              <div className="space-y-2">
                {/* Enhanced Progress Bar */}
                <div className="relative">
                  {/* Background bar */}
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    {/* Progress fill */}
                    <div
                      className="h-full bg-linear-to-r from-emerald-400 via-emerald-500 to-green-500 rounded-full transition-all duration-1000 ease-out relative"
                      style={{
                        width: `${Math.max(
                          5,
                          100 - nextPrayer.remainingTime / 10
                        )}%`,
                      }}
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 animate-pulse"></div>
                    </div>
                  </div>

                  {/* Progress indicator dot */}
                  <div
                    className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white border-2 border-emerald-500 rounded-full shadow-md transition-all duration-1000 ease-out"
                    style={{
                      left: `calc(${Math.max(
                        5,
                        100 - nextPrayer.remainingTime / 10
                      )}% - 6px)`,
                    }}
                  >
                    <div className="absolute inset-0.5 bg-emerald-500 rounded-full"></div>
                  </div>
                </div>

                {/* Time markers - Simplified */}
                <div className="flex justify-between items-center text-[10px] text-gray-400 font-medium">
                  <span>Sekarang</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-500">
                      Menuju {nextPrayer.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom decorative border */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-yellow-300/60 to-transparent"></div>
      </div>

      {/* Curved bottom edge - Smoother */}
      <div className="relative -mt-1">
        <svg
          className="w-full h-3 text-white"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C150,80 350,80 600,40 C850,0 1050,0 1200,40 L1200,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}
