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
      gradient: "from-emerald-600 to-emerald-500",
      description: "Bacaan suci umat Islam",
    },
    {
      title: "Doa Rutin 13",
      icon: faHands,
      link: "/doa",
      gradient: "from-emerald-700 to-green-600",
      description: "Kumpulan doa rutin 13 harian",
    },
    {
      title: "Jadwal Sholat",
      icon: faClock,
      link: "/sholat",
      gradient: "from-teal-600 to-teal-500",
      description: "Waktu sholat hari ini",
    },
    {
      title: "Dzikir Setelah Sholat",
      icon: faMosque,
      link: "/dzikir",
      gradient: "from-purple-600 to-purple-500",
      description: "Dzikir dan doa setelah shalat",
    },
  ];

  return (
    <Layout>
      <div className="px-6 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3 bg-linear-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
            Al-Qur'an Digital
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
            Mari kita pelajari Al-Qur'an dan tingkatkan keimanan setiap hari
          </p>

          {/* Islamic decorative line */}
          <div className="flex items-center justify-center space-x-2 mt-4">
            <div className="w-8 h-0.5 bg-linear-to-r from-transparent to-emerald-300"></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <div className="w-4 h-0.5 bg-emerald-300"></div>
            <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
            <div className="w-4 h-0.5 bg-emerald-300"></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <div className="w-8 h-0.5 bg-linear-to-l from-transparent to-emerald-300"></div>
          </div>
        </div>

        {/* Menu Cards */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {menuItems.map((item, index) => (
            <IslamicCard
              key={index}
              title={item.title}
              icon={item.icon}
              link={item.link}
              gradient={item.gradient}
              size="normal"
            />
          ))}
        </div>

        {/* Last Read Section */}
        <div className="mb-8">
          <IslamicCard
            title="Terakhir Dibaca"
            description="Lanjutkan bacaan Al-Qur'an Anda dari surat Al-Fatihah ayat 1"
            icon={faBookmark}
            link="/list-surah"
            gradient="from-amber-500 to-yellow-500"
            size="wide"
          />
        </div>

        {/* Daily Inspiration */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-emerald-100 shadow-lg">
          <div className="text-center">
            <h3 className="text-lg font-bold text-emerald-800 mb-4">
              Ayat Hari Ini
            </h3>

            {currentVerse && (
              <div className="bg-linear-to-r from-emerald-50 to-green-50 rounded-2xl p-6 mb-4">
                <p className="text-right text-2xl text-gray-800 mb-4 font-arabic leading-loose">
                  {currentVerse.arabic}
                </p>
                <div className="flex items-center justify-center mb-3">
                  <div className="w-16 h-0.5 bg-linear-to-r from-transparent via-emerald-300 to-transparent"></div>
                </div>
                <p className="text-gray-700 text-sm italic leading-relaxed mb-3">
                  "{currentVerse.translation}"
                </p>
                <p className="text-emerald-600 text-xs font-semibold">
                  {currentVerse.reference}
                </p>
              </div>
            )}

            {!currentVerse && (
              <div className="bg-linear-to-r from-emerald-50 to-green-50 rounded-2xl p-6 mb-4">
                <div className="animate-pulse">
                  <div className="h-6 bg-emerald-200 rounded mb-3"></div>
                  <div className="h-4 bg-emerald-100 rounded mb-2"></div>
                  <div className="h-3 bg-emerald-100 rounded w-1/2 mx-auto"></div>
                </div>
              </div>
            )}

            <p className="text-xs text-gray-500 mt-3">
              ✨ Ayat inspiratif akan berganti setiap kali halaman dimuat ulang
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
