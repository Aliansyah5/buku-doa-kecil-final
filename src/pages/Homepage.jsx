import Layout from "../components/Layout/Layout";
import IslamicCard from "../components/UI/IslamicCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuran,
  faBookOpen,
  faClock,
  faHands,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";

export default function Homepage() {
  const menuItems = [
    {
      title: "Baca Al-Qur'an",
      icon: faQuran,
      link: "/list-surah",
      gradient: "from-emerald-600 to-emerald-500",
      description: "Bacaan suci umat Islam",
    },
    {
      title: "Hadist",
      icon: faBookOpen,
      link: "/hadist",
      gradient: "from-green-600 to-green-500",
      description: "Kumpulan hadist Nabi",
    },
    {
      title: "Jadwal Sholat",
      icon: faClock,
      link: "/sholat",
      gradient: "from-teal-600 to-teal-500",
      description: "Waktu sholat hari ini",
    },
    {
      title: "Doa Harian",
      icon: faHands,
      link: "/doa",
      gradient: "from-emerald-700 to-green-600",
      description: "Kumpulan doa sehari-hari",
    },
  ];

  return (
    <Layout>
      <div className="px-6 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
            Al-Qur'an Digital
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
            Mari kita pelajari Al-Qur'an dan tingkatkan keimanan setiap hari
          </p>

          {/* Islamic decorative line */}
          <div className="flex items-center justify-center space-x-2 mt-4">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-emerald-300"></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <div className="w-4 h-0.5 bg-emerald-300"></div>
            <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
            <div className="w-4 h-0.5 bg-emerald-300"></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-emerald-300"></div>
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
            <h3 className="text-lg font-bold text-emerald-800 mb-3">
              Ayat Hari Ini
            </h3>
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-4 mb-4">
              <p className="text-right text-xl text-gray-800 mb-3 font-arabic leading-loose">
                وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا
              </p>
              <p className="text-gray-600 text-sm italic">
                "Dan barangsiapa yang bertakwa kepada Allah niscaya Dia akan
                mengadakan baginya jalan keluar."
              </p>
              <p className="text-emerald-600 text-xs font-medium mt-2">
                QS. At-Talaq: 2
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
