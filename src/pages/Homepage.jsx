import Layout from "../components/Layout/Layout";
import IslamicCard from "../components/UI/IslamicCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuran,
  faBookOpen,
  faClock,
  faHands,
  faBookmark,
  faMosque,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { getRandomVerse } from "../data/inspirationalVerses";

export default function Homepage() {
  const [currentVerse, setCurrentVerse] = useState(null);

  // Initialize with random verse on component mount (every page refresh)
  useEffect(() => {
    setCurrentVerse(getRandomVerse());
  }, []);
  const menuItems = [
    {
      title: "Baca Al-Qur'an",
      icon: faQuran,
      link: "/list-surah",
      gradient: "from-emerald-500 to-green-600",
      description: "Bacaan suci umat Islam",
    },
    {
      title: "Doa Rutin 13",
      icon: faHands,
      link: "/doa",
      gradient: "from-teal-500 to-cyan-600",
      description: "Kumpulan doa rutin 13 harian",
    },
    {
      title: "Jadwal Sholat",
      icon: faClock,
      link: "/sholat",
      gradient: "from-blue-500 to-indigo-600",
      description: "Waktu sholat hari ini",
    },
    {
      title: "Dzikir Setelah Sholat",
      icon: faMosque,
      link: "/dzikir",
      gradient: "from-purple-500 to-pink-600",
      description: "Dzikir dan doa setelah shalat",
    },
    // {
    //   title: "Masjid LDII Terdekat",
    //   icon: faMapMarkerAlt,
    //   link: "/masjid",
    //   gradient: "from-blue-600 to-blue-500",
    //   description: "Temukan masjid LDII di sekitar Anda",
    // },
  ];

  return (
    <Layout>
      <div className="px-5 py-6 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-3 bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent leading-tight">
            Al-Qur'an & Buku Doa Digital
          </h1>

          {/* Islamic decorative line */}
          <div className="flex items-center justify-center space-x-2 mt-5">
            <div className="w-8 h-0.5 bg-linear-to-r from-transparent via-emerald-400 to-emerald-300"></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-sm"></div>
            <div className="w-4 h-0.5 bg-emerald-300"></div>
            <div className="w-1.5 h-1.5 bg-amber-400 rounded-full shadow-sm"></div>
            <div className="w-4 h-0.5 bg-emerald-300"></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-sm"></div>
            <div className="w-8 h-0.5 bg-linear-to-l from-transparent via-emerald-400 to-emerald-300"></div>
          </div>
        </div>

        {/* Menu Cards */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 mb-6">
          {menuItems.map((item, index) => (
            <IslamicCard
              key={index}
              title={item.title}
              icon={item.icon}
              customIcon={item.customIcon}
              link={item.link}
              gradient={item.gradient}
              size="normal"
            />
          ))}
        </div>

        {/* Last Read Section */}
        <div className="mb-6">
          <IslamicCard
            title="Terakhir Dibaca"
            description="Lanjutkan bacaan Al-Qur'an Anda"
            icon={faBookmark}
            link="/list-surah"
            gradient="from-amber-500 to-orange-500"
            size="wide"
          />
        </div>

        {/* Daily Inspiration */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-emerald-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
              <h3 className="text-lg font-bold text-emerald-800">
                Ayat Hari Ini
              </h3>
              <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
            </div>

            {currentVerse && (
              <div className="bg-linear-to-br from-emerald-50 via-green-50 to-teal-50 rounded-2xl p-6 mb-4 border border-emerald-100/50">
                <p className="text-right text-2xl text-gray-800 mb-5 font-arabic leading-loose">
                  {currentVerse.arabic}
                </p>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-20 h-0.5 bg-linear-to-r from-transparent via-emerald-300 to-transparent"></div>
                </div>
                <p className="text-gray-700 text-sm italic leading-relaxed mb-3 px-2">
                  "{currentVerse.translation}"
                </p>
                <div className="inline-block bg-emerald-100/50 px-3 py-1.5 rounded-full">
                  <p className="text-emerald-700 text-xs font-semibold">
                    {currentVerse.reference}
                  </p>
                </div>
              </div>
            )}

            {!currentVerse && (
              <div className="bg-linear-to-br from-emerald-50 via-green-50 to-teal-50 rounded-2xl p-6 mb-4 border border-emerald-100/50">
                <div className="animate-pulse space-y-3">
                  <div className="h-6 bg-emerald-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-emerald-100 rounded-lg mb-2"></div>
                  <div className="h-3 bg-emerald-100 rounded-lg w-2/3 mx-auto"></div>
                </div>
              </div>
            )}

            <p className="text-xs text-gray-500 mt-4 flex items-center justify-center space-x-1.5">
              <span className="text-base">✨</span>
              <span>
                Ayat inspiratif berganti setiap kali halaman dimuat ulang
              </span>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
