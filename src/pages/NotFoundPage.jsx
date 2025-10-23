import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faHome } from "@fortawesome/free-solid-svg-icons";

export default function NotFoundPage() {
  return (
    <Layout>
      <div className="px-6 py-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <FontAwesomeIcon icon={faSearch} className="text-white text-lg" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent">
              Oppss!!
            </h1>
          </div>
          <p className="text-gray-600 text-sm">
            Halaman yang Anda cari tidak dapat ditemukan
          </p>

          {/* Islamic decorative line */}
          <div className="flex items-center justify-center space-x-2 mt-4">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-amber-300"></div>
            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
            <div className="w-4 h-0.5 bg-amber-300"></div>
            <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
            <div className="w-4 h-0.5 bg-amber-300"></div>
            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-amber-300"></div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center justify-center py-16">
          {/* Illustration */}
          <div className="w-64 h-48 bg-gradient-to-r from-amber-100 to-orange-100 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg overflow-hidden">
            <div className="text-center">
              <FontAwesomeIcon
                icon={faSearch}
                className="text-amber-400 text-6xl mb-4 animate-bounce"
              />
              <p className="text-amber-600 font-bold text-lg">404</p>
            </div>
          </div>

          {/* Message */}
          <div className="text-center mb-8 max-w-md">
            <h3 className="text-gray-800 text-xl font-bold mb-4">
              Halaman Tidak Ditemukan
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Halaman yang Anda minta tidak ditemukan. Mari kembali ke halaman
              surah untuk melanjutkan membaca Al-Qur'an.
            </p>
          </div>

          {/* Action Button */}
          <Link
            to="/list-surah"
            className="group bg-gradient-to-r from-emerald-500 to-green-500 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-3"
          >
            <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <FontAwesomeIcon icon={faHome} className="text-sm" />
            </div>
            <span className="font-medium">Kembali ke Halaman Surah</span>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
