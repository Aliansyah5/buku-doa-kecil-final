import { useState, useEffect, useMemo, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { appContext } from "../context/app-context";
import SurahItem from "../components/SurahItem";
import LoadingIndicator from "../components/LoadingIndicator";
import useTitle from "../hooks/useTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBookQuran,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function SearchPage() {
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const searchInputRef = useRef();
  const { listSurah } = useContext(appContext);

  useTitle("Cari Surah");

  // Auto focus on search input when page loads
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  // Debounce search keyword
  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedKeyword(keyword.trim());
    }, 300);
    return () => clearTimeout(delay);
  }, [keyword]);

  const filteredSurah = useMemo(() => {
    if (!debouncedKeyword) return [];

    const cleanedKeyword = debouncedKeyword
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .toLowerCase();

    return listSurah.filter((item) => {
      const cleanedNamaLatin = item.namaLatin
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .toLowerCase();
      const cleanedArti = item.arti.replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase();
      const nomorString = item.nomor.toString();

      return (
        cleanedNamaLatin.includes(cleanedKeyword) ||
        cleanedArti.includes(cleanedKeyword) ||
        nomorString.includes(cleanedKeyword) ||
        item.nama.includes(debouncedKeyword)
      );
    });
  }, [debouncedKeyword, listSurah]);

  const clearSearch = () => {
    setKeyword("");
    setDebouncedKeyword("");
    searchInputRef.current?.focus();
  };

  if (listSurah.length === 0) return <LoadingIndicator />;

  return (
    <Layout showBanner={false}>
      <div className="px-5 py-6 max-w-7xl mx-auto min-h-screen">
        {/* Header Section */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="w-11 h-11 bg-linear-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md">
              <FontAwesomeIcon icon={faSearch} className="text-white text-lg" />
            </div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
              Cari Surah
            </h1>
          </div>
          <p className="text-gray-600 text-sm">
            Temukan surah berdasarkan nama, arti, atau nomor
          </p>

          {/* Islamic decorative line */}
          <div className="flex items-center justify-center space-x-2 mt-4">
            <div className="w-8 h-0.5 bg-linear-to-r from-transparent via-teal-400 to-teal-300"></div>
            <div className="w-1.5 h-1.5 bg-teal-400 rounded-full shadow-sm"></div>
            <div className="w-4 h-0.5 bg-teal-300"></div>
            <div className="w-1 h-1 bg-cyan-400 rounded-full shadow-sm"></div>
            <div className="w-4 h-0.5 bg-teal-300"></div>
            <div className="w-1.5 h-1.5 bg-teal-400 rounded-full shadow-sm"></div>
            <div className="w-8 h-0.5 bg-linear-to-l from-transparent via-teal-400 to-teal-300"></div>
          </div>
        </div>

        {/* Search Input */}
        <div className="mb-6">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FontAwesomeIcon
                icon={faSearch}
                className="text-gray-400 text-sm"
              />
            </div>
            <input
              ref={searchInputRef}
              className="w-full pl-11 pr-12 py-4 bg-white border-2 border-teal-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent text-gray-700 placeholder-gray-400 shadow-sm transition-all duration-200 text-base"
              type="search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Ketik nama surah, arti, atau nomor..."
              autoComplete="off"
            />
            {keyword && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-teal-600 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faTimesCircle} className="text-lg" />
              </button>
            )}
          </div>
        </div>

        {/* Search Results */}
        {debouncedKeyword ? (
          <>
            {/* Results Header */}
            <div className="mb-4 flex items-center justify-between max-w-2xl mx-auto">
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon
                  icon={faBookQuran}
                  className="text-teal-600 text-sm"
                />
                <span className="text-sm text-gray-600 font-medium">
                  {filteredSurah.length > 0 ? (
                    <>
                      Ditemukan{" "}
                      <span className="font-bold text-teal-600">
                        {filteredSurah.length}
                      </span>{" "}
                      surah
                    </>
                  ) : (
                    "Tidak ada hasil"
                  )}
                </span>
              </div>
              {filteredSurah.length > 0 && (
                <span className="text-xs text-gray-500">
                  untuk "{debouncedKeyword}"
                </span>
              )}
            </div>

            {/* Results Grid */}
            {filteredSurah.length > 0 ? (
              <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                {filteredSurah.map((item) => (
                  <Link
                    to={`/surah/${item.nomor}`}
                    key={item.nomor}
                    className="block transform transition-transform duration-200 hover:scale-[1.02]"
                  >
                    <SurahItem surahData={item} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="max-w-md mx-auto text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="text-teal-400 text-3xl"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Tidak Ada Hasil
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Tidak ditemukan surah yang cocok dengan pencarian "
                  <span className="font-medium text-teal-600">
                    {debouncedKeyword}
                  </span>
                  "
                </p>
                <button
                  onClick={clearSearch}
                  className="px-6 py-2.5 bg-linear-to-r from-teal-500 to-cyan-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Coba Lagi
                </button>
              </div>
            )}
          </>
        ) : (
          // Empty State - Before Search
          <div className="max-w-md mx-auto text-center py-12">
            <div className="relative inline-block mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-3xl flex items-center justify-center mx-auto">
                <FontAwesomeIcon
                  icon={faBookQuran}
                  className="text-teal-500 text-4xl"
                />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="text-white text-sm"
                />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Cari Surah Al-Qur'an
            </h3>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Mulai ketik di kolom pencarian untuk menemukan surah berdasarkan:
            </p>
            <div className="space-y-2 text-left max-w-xs mx-auto">
              <div className="flex items-center space-x-3 p-3 bg-teal-50 rounded-lg">
                <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <span className="text-sm text-gray-700">
                  Nama surah (Latin atau Arab)
                </span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-cyan-50 rounded-lg">
                <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <span className="text-sm text-gray-700">Arti surah</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-teal-50 rounded-lg">
                <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                <span className="text-sm text-gray-700">Nomor surah</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
