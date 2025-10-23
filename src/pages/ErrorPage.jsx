import { Link, useRouteError } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faBan,
  faHome,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import useTitle from "../hooks/useTitle";

export default function ErrorPage() {
  const errorObject = useRouteError();
  const isNotFound = errorObject.status === 404;

  useTitle(isNotFound ? "Halaman tidak ditemukan" : "Error!");

  return (
    <Layout>
      <div className="px-6 py-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <FontAwesomeIcon
                icon={isNotFound ? faBan : faCircleExclamation}
                className="text-white text-lg"
              />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-700 to-orange-600 bg-clip-text text-transparent">
              {isNotFound ? "Halaman Tidak Ditemukan" : "Terjadi Kesalahan"}
            </h1>
          </div>
          <p className="text-gray-600 text-sm">
            {isNotFound
              ? "Halaman yang Anda cari tidak dapat ditemukan"
              : "Silakan periksa koneksi internet Anda"}
          </p>

          {/* Islamic decorative line */}
          <div className="flex items-center justify-center space-x-2 mt-4">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-red-300"></div>
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <div className="w-4 h-0.5 bg-red-300"></div>
            <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
            <div className="w-4 h-0.5 bg-red-300"></div>
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-red-300"></div>
          </div>
        </div>

        {/* Error Content */}
        <div className="flex flex-col items-center justify-center py-16">
          {/* Large Icon */}
          <div className="w-32 h-32 bg-gradient-to-r from-red-100 to-orange-100 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
            <FontAwesomeIcon
              icon={isNotFound ? faBan : faCircleExclamation}
              className="text-red-400 text-6xl animate-pulse"
            />
          </div>

          {/* Error Message */}
          <div className="text-center mb-8 max-w-md">
            <h3 className="text-gray-800 text-xl font-bold mb-4">
              {isNotFound
                ? "Halaman yang Anda minta tidak ditemukan"
                : "Terjadi kesalahan, silakan cek koneksi internet Anda"}
            </h3>

            {errorObject.statusText && (
              <p className="text-red-500 text-sm mb-2 bg-red-50 px-4 py-2 rounded-xl border border-red-200">
                {errorObject.statusText}
              </p>
            )}
            {errorObject.message && (
              <p className="text-red-500 text-sm bg-red-50 px-4 py-2 rounded-xl border border-red-200">
                {errorObject.message}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <button
              onClick={() => window.location.reload()}
              className="group bg-gradient-to-r from-emerald-500 to-green-500 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-3"
            >
              <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  className="text-sm rotate-180"
                />
              </div>
              <span className="font-medium">Refresh Halaman</span>
            </button>

            <Link
              to="/list-surah"
              className="group bg-white/70 backdrop-blur-sm border border-emerald-200 text-emerald-700 px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-3"
            >
              <div className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <FontAwesomeIcon
                  icon={faBan}
                  className="text-emerald-600 text-sm"
                />
              </div>
              <span className="font-medium">Kembali ke Daftar Surah</span>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
