import { useState, useEffect } from "react";

export default function IslamicBanner() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

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
      <div className="relative bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-500 px-6 py-8">
        {/* Islamic Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="islamic-ornament-pattern w-full h-full"></div>
        </div>

        {/* Golden accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400"></div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-between">
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

        {/* Bottom decorative border */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-300 to-transparent opacity-60"></div>
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
