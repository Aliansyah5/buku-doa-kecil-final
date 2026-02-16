import Layout from "../components/Layout/Layout";
import IslamicCard from "../components/UI/IslamicCard";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuran,
  faClock,
  faHands,
  faBookmark,
  faHandHoldingHeart,
  faHandsPraying,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { getRandomVerse } from "../data/inspirationalVerses";
import { getLastReadSurah } from "../helper/local-storage-helper";

export default function Homepage() {
  const [currentVerse, setCurrentVerse] = useState(null);
  const [lastRead, setLastRead] = useState(null);

  // Initialize with random verse on component mount (every page refresh)
  useEffect(() => {
    setCurrentVerse(getRandomVerse());
    const lastReadData = getLastReadSurah();
    setLastRead(lastReadData);
  }, []);
  const menuItems = [
    {
      title: "Baca Al-Qur'an",
      icon: faQuran,
      customIcon: "/icon/alquran.png",
      link: "/list-surah",
      gradient: "from-emerald-500 to-green-600",
      description: "Bacaan suci umat Islam",
    },
    {
      title: "Doa Harian",
      icon: faHands,
      customIcon: "/icon/doaharian.png",
      link: "/doa",
      gradient: "from-purple-500 to-pink-600",
      description: "Kumpulan doa sehari-hari",
    },
    {
      title: "Jadwal Sholat",
      icon: faClock,
      customIcon: "/icon/jadwalsholat.png",
      link: "/sholat",
      gradient: "from-blue-500 to-indigo-600",
      description: "Waktu sholat hari ini",
    },
    // {
    //   title: "Dzikir Setelah Sholat",
    //   icon: faMosque,
    //   link: "/dzikir",
    //   gradient: "from-purple-500 to-pink-600",
    //   description: "Dzikir dan doa setelah shalat",
    // },
    {
      title: "Asmaul Husna",
      icon: faHandHoldingHeart,
      customIcon: "/icon/asmaulhusna.png",
      link: "/asmaul-husna",
      gradient: "from-teal-500 to-cyan-600",
      description: "99 nama Allah yang indah",
    },
    {
      title: "Dzikir Counter",
      icon: faHandsPraying,
      customIcon: "/icon/dzikir.png",
      link: "/dzikir-counter",
      gradient: "from-rose-500 to-orange-600",
      description: "Penghitung dzikir digital",
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
      <div className="px-5  max-w-7xl mx-auto">
        {/* Hero Section with Greeting */}
        <div className="text-center mb-10">
          <div className="inline-block mb-4"></div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent leading-tight">
            Al-Qur'an Digital
          </h1>
          <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto">
            Baca Al-Qur'an, doa harian, dan jadwal sholat dalam satu aplikasi
          </p>

          {/* Modern decorative element */}
          <div className="flex items-center justify-center space-x-3 mt-6">
            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-emerald-300 to-emerald-400 rounded-full"></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <div className="w-12 h-[2px] bg-gradient-to-l from-transparent via-emerald-300 to-emerald-400 rounded-full"></div>
          </div>
        </div>

        {/* Menu Cards with improved spacing */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 md:grid-cols-3 lg:grid-cols-4 mb-8">
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
        <div className="mb-8">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faBookmark}
                    className="text-white text-2xl"
                  />
                </div>
                <div className="text-white">
                  <h3 className="font-bold text-lg mb-1">Terakhir Dibaca</h3>
                  <p className="text-white/80 text-sm">
                    {lastRead
                      ? `Surah ${lastRead.surahNumber} Ayat ${lastRead.ayah}`
                      : "Lanjutkan bacaan Al-Qur'an Anda"}
                  </p>
                </div>
              </div>
              <Link
                to={
                  lastRead
                    ? `/surah/${lastRead.surahNumber}/${lastRead.ayah}`
                    : "/list-surah"
                }
                className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors duration-300"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Daily Inspiration - Enhanced */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xl">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 mb-6 bg-emerald-50 px-4 py-2 rounded-full">
              <span className="text-lg">🌙</span>
              <h3 className="text-base font-bold text-emerald-800">
                Ayat Hari Ini
              </h3>
            </div>

            {currentVerse && (
              <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-2xl p-6 md:p-8 border border-emerald-100">
                <p className="text-right text-2xl md:text-3xl text-gray-800 mb-6 font-arabic leading-loose">
                  {currentVerse.arabic}
                </p>
                <div className="flex items-center justify-center mb-5">
                  <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full"></div>
                </div>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4 px-2">
                  <span className="text-emerald-600 font-serif text-lg">"</span>
                  {currentVerse.translation}
                  <span className="text-emerald-600 font-serif text-lg">"</span>
                </p>
                <div className="inline-flex items-center bg-white px-4 py-2 rounded-full border border-emerald-200 shadow-sm">
                  <span className="text-emerald-600 mr-2">📖</span>
                  <p className="text-emerald-700 text-sm font-semibold">
                    {currentVerse.reference}
                  </p>
                </div>
              </div>
            )}

            {!currentVerse && (
              <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-2xl p-6 md:p-8 border border-emerald-100">
                <div className="animate-pulse space-y-4">
                  <div className="h-8 bg-emerald-200 rounded-lg"></div>
                  <div className="h-6 bg-emerald-100 rounded-lg"></div>
                  <div className="h-6 bg-emerald-100 rounded-lg w-3/4 mx-auto"></div>
                </div>
              </div>
            )}

            <p className="text-xs text-gray-400 mt-6 flex items-center justify-center space-x-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Ayat berganti setiap refresh halaman</span>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
