import { useState, useEffect, useMemo, useRef, useContext } from "react";
import { Link } from "react-router-dom";

import Layout from "../components/Layout/Layout";
import IslamicCard from "../components/UI/IslamicCard";
import LastReadBanner from "../assets/last-read-banner.png";
import QuranSmall from "../assets/quran-small.svg";

import { appContext } from "../context/app-context";
import SurahItem from "../components/SurahItem";

import LoadingIndicator from "../components/LoadingIndicator";
import { scrollToTop } from "../utils/scrollUtils";
import useTitle from "../hooks/useTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faSearch } from "@fortawesome/free-solid-svg-icons";

export default function ListSurahPage() {
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const searchBarRef = useRef();
  const { listSurah } = useContext(appContext);

  useTitle("Daftar Surat");

  useEffect(() => {
    scrollToTop("instant");
    let timeout = setTimeout(() => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedKeyword(keyword.trim());
    }, 1000);
    return () => clearTimeout(delay);
  }, [keyword]);

  const filteredSurah = useMemo(() => {
    if (!debouncedKeyword) return listSurah;

    const cleanedKeyword = debouncedKeyword
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .toLowerCase();
    // const regex = new RegExp(cleanedKeyword, "i");

    return listSurah.filter((item) => {
      const cleanedNamaLatin = item.namaLatin
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .toLowerCase();
      return (
        item.nomor.toString() === debouncedKeyword.toString() ||
        // regex.test(cleanedNamaLatin)
        cleanedNamaLatin.includes(cleanedKeyword)
      );
    });
  }, [debouncedKeyword, listSurah]);

  if (listSurah.length === 0) return <LoadingIndicator />;

  if (listSurah.length > 0)
    return (
      <Layout showBanner={false}>
        <div className="px-5 py-6 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2 bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent leading-tight">
              Daftar Surat Al-Qur'an
            </h1>
            <p className="text-gray-600 text-sm">114 surat dalam Al-Qur'an</p>

            {/* Islamic decorative line */}
            <div className="flex items-center justify-center space-x-2 mt-4">
              <div className="w-8 h-0.5 bg-linear-to-r from-transparent via-emerald-400 to-emerald-300"></div>
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-sm"></div>
              <div className="w-4 h-0.5 bg-emerald-300"></div>
              <div className="w-1 h-1 bg-amber-400 rounded-full shadow-sm"></div>
              <div className="w-4 h-0.5 bg-emerald-300"></div>
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-sm"></div>
              <div className="w-8 h-0.5 bg-linear-to-l from-transparent via-emerald-400 to-emerald-300"></div>
            </div>
          </div>

          {/* Search Section */}
          <div className="mb-5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="text-gray-400 text-sm"
                />
              </div>
              <input
                className="w-full pl-11 pr-4 py-3.5 bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-gray-700 placeholder-gray-400 shadow-sm transition-all duration-200"
                type="search"
                ref={searchBarRef}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Cari nama atau nomor surat..."
                autoComplete="off"
              />
            </div>
          </div>

          {/* Info Section */}
          <div className="bg-emerald-50/70 backdrop-blur-sm rounded-xl p-3.5 mb-5 border border-emerald-100">
            <div className="flex items-start space-x-2.5">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-emerald-600 text-sm mt-0.5 shrink-0"
              />
              <p className="text-xs text-gray-700 leading-relaxed">
                <span className="font-semibold text-emerald-700">
                  Icon checklist
                </span>{" "}
                menandakan surat dapat diakses offline (kecuali audio)
              </p>
            </div>
          </div>

          {/* Surah List */}
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredSurah.map((item) => (
              <Link
                to={`/surah/${item.nomor}`}
                key={item.nomor}
                className="block"
              >
                <SurahItem surahData={item} />
              </Link>
            ))}
          </div>
        </div>
      </Layout>
    );
}
