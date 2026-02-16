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
          `https://api.myquran.com/v2/sholat/jadwal/${settings.lokasi}/${dateString}`,
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
        current.remainingTime < closest.remainingTime ? current : closest,
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
      <div className="relative bg-linear-to-br from-emerald-600 via-emerald-500 to-green-600 px-4 sm:px-5 py-6 sm:py-8 overflow-hidden">
        {/* Pattern Background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <img
            src="/icon/pattern1.png"
            alt="Pattern"
            className="w-full h-full object-cover opacity-[0.08]"
            style={{
              transform: "scale(1.5)",
              imageRendering: "crisp-edges",
            }}
          />
        </div>

        {/* Overlay Gradient dengan Texture */}
        <div className="absolute inset-0 bg-linear-to-br from-emerald-600/70 via-emerald-500/65 to-green-600/75 overflow-hidden">
          {/* Texture Pattern */}
          <img
            src="/icon/texture.png"
            alt="Texture"
            className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
        </div>

        {/* Islamic Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="islamic-ornament-pattern w-full h-full"></div>
        </div>

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-yellow-300 to-transparent"></div>

        {/* Diagonal accent - subtle */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-yellow-300/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Top Section - Greeting - Responsive */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-5">
            {/* Left: Greeting Text */}
            <div className="flex-1">
              {/* Badge + Time Row - Mobile Optimized */}
              <div className="flex items-center justify-between gap-2 mb-2.5 sm:mb-3">
                {/* Greeting Badge */}
                <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full border border-white/20 hover:bg-white/15 transition-colors duration-300">
                  <span className="text-white text-xs sm:text-sm font-semibold">
                    ✨ Assalamualaikum
                  </span>
                </div>

                {/* Time Display - Same Row on Mobile */}
                <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/5 backdrop-blur-sm px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full border border-white/15">
                  <svg
                    className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-yellow-300 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-white text-[10px] sm:text-xs font-medium">
                    {formatTime()}
                  </span>
                </div>
              </div>

              {/* Main Greeting Text - More Compact */}
              <p className="text-white/95 text-xs sm:text-sm leading-relaxed">
                <span className="font-bold text-sm sm:text-base text-white">
                  {getGreeting()}
                </span>
                , Semoga hari ini lancar barokah. 🤲
              </p>

              {/* Mobile Masjid Icon - Small & Bottom Right */}
              <div className="sm:hidden mt-2.5 flex justify-end">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/20 to-emerald-300/10 rounded-2xl blur-xl"></div>
                </div>
              </div>
            </div>

            {/* Right: Welcome Image - Tablet & Desktop Only */}
            <div className="hidden sm:flex items-center justify-end flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/20 to-emerald-300/10 rounded-3xl blur-2xl"></div>
                <img
                  src="/icon/masjid.png"
                  alt="Islamic Decoration"
                  className="relative w-28 h-28 md:w-32 md:h-32 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-300 opacity-95"
                />
              </div>
            </div>
          </div>

          {/* Prayer Time Indicator - Minimalist Design */}
          {nextPrayer && (
            <div className="relative">
              {/* Clean White Card */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-md border border-gray-100">
                {/* Main Content */}
                <div className="flex items-center justify-between gap-4">
                  {/* Left: Icon + Prayer Info */}
                  <div className="flex items-center gap-3 sm:gap-4 flex-1">
                    {/* Simple Prayer Icon */}
                    <div
                      className={`shrink-0 w-12 sm:w-14 h-12 sm:h-14 rounded-lg flex items-center justify-center ${
                        nextPrayer.name === "Subuh"
                          ? "bg-indigo-500"
                          : nextPrayer.name === "Dzuhur"
                            ? "bg-amber-500"
                            : nextPrayer.name === "Ashar"
                              ? "bg-orange-500"
                              : nextPrayer.name === "Maghrib"
                                ? "bg-pink-500"
                                : "bg-blue-700"
                      }`}
                    >
                      {/* Simple Icon SVGs */}
                      {nextPrayer.name === "Subuh" && (
                        <svg
                          className="w-6 sm:w-7 h-6 sm:h-7 text-white"
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
                        <svg
                          className="w-6 sm:w-7 h-6 sm:h-7 text-white"
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
                        <svg
                          className="w-6 sm:w-7 h-6 sm:h-7 text-white"
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
                        <svg
                          className="w-6 sm:w-7 h-6 sm:h-7 text-white"
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
                        <svg
                          className="w-6 sm:w-7 h-6 sm:h-7 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                      )}
                    </div>

                    {/* Prayer Details - Minimal */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 font-medium mb-1">
                        Sholat Berikutnya
                      </p>
                      <h3 className="text-gray-900 text-lg sm:text-xl font-bold mb-0.5">
                        {nextPrayer.name}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 font-medium">
                        {nextPrayer.time} WIB
                      </p>
                    </div>
                  </div>

                  {/* Right: Time Remaining - Minimal */}
                  <div className="bg-emerald-500 px-4 py-2.5 sm:py-3 rounded-lg text-center min-w-[80px] sm:min-w-[90px]">
                    <p className="text-emerald-50 text-[10px] font-medium uppercase tracking-wide mb-0.5">
                      Tersisa
                    </p>
                    <p className="text-white text-xl sm:text-2xl font-bold leading-none">
                      {formatRemainingTime(nextPrayer.remainingTime)}
                    </p>
                  </div>
                </div>

                {/* Simple Progress Bar */}
                <div className="mt-4">
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                      style={{
                        width: `${Math.max(5, 100 - nextPrayer.remainingTime / 10)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom decorative border */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-yellow-300/60 to-transparent"></div>
      </div>

      {/* Curved bottom edge - Responsive */}
      <div className="relative -mt-1">
        <svg
          className="w-full h-2 sm:h-3 text-white"
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
