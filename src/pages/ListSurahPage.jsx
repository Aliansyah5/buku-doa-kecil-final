import { useState, useEffect, useMemo, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import Layout from "../components/Layout/Layout";
import IslamicCard from "../components/UI/IslamicCard";
import LastReadBanner from "../assets/last-read-banner.png";
import QuranSmall from "../assets/quran-small.svg";

import { appContext } from "../context/app-context";
import SurahItem from "../components/SurahItem";

import { getLastReadSurah, getUsername } from "../helper/local-storage-helper";
import LoadingIndicator from "../components/LoadingIndicator";
import Form from "../components/Modal/Form";
import { scrollToTop } from "../utils/scrollUtils";
import useTitle from "../hooks/useTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faSearch } from "@fortawesome/free-solid-svg-icons";

export default function ListSurahPage() {
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const searchBarRef = useRef();
  const { listSurah, showModal, userNameApp, saveUsername } =
    useContext(appContext);
  const navigate = useNavigate();

  useTitle("Daftar Surat");

  const lastRead = getLastReadSurah();

  useEffect(() => {
    if (!userNameApp) {
      showModal(
        <Form
          heading="Assalamualaikum"
          preText="Tolong masukkan nama panggilan kamu ya.."
          inputObject={{
            placeholder: "nama panggilan kamu..",
            onSubmit: (name) => {
              saveUsername(name);
            },
          }}
        />
      );
    }
  }, [showModal, saveUsername, userNameApp]);

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
      <Layout showBanner={!keyword}>
        <div className="px-6 py-4">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
              Daftar Surat Al-Qur'an
            </h1>
            <p className="text-gray-600 text-sm">
              Pilih surat yang ingin Anda baca
            </p>
          </div>

          {/* Welcome & Last Read Section */}
          {!keyword && (
            <div className="mb-8 space-y-6">
              {/* Welcome Card */}
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-emerald-100 shadow-lg">
                <div className="text-center">
                  <h3 className="text-emerald-600 text-lg mb-2">
                    Assalamualaikum
                  </h3>
                  <h2 className="text-gray-800 font-bold text-xl">
                    {getUsername() || "Pengguna"}
                  </h2>
                  <div className="flex items-center justify-center space-x-2 mt-3">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-emerald-300"></div>
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <div className="w-4 h-0.5 bg-emerald-300"></div>
                    <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                    <div className="w-4 h-0.5 bg-emerald-300"></div>
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-emerald-300"></div>
                  </div>
                </div>
              </div>

              {/* Last Read Card */}
              <div
                className="relative bg-gradient-to-r from-emerald-600 to-green-500 rounded-3xl p-6 shadow-lg cursor-pointer group overflow-hidden"
                onClick={() =>
                  navigate(
                    lastRead
                      ? `/surah/${lastRead.surahNumber}/${lastRead.ayah}`
                      : "/surah/1/1"
                  )
                }
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="islamic-ornament-pattern w-full h-full"></div>
                </div>

                <div className="relative z-10 flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <img src={QuranSmall} alt="Quran" className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-emerald-100 text-sm mb-1">
                      {lastRead ? "Terakhir dibaca" : "Mulai baca Al-Qur'an"}
                    </p>
                    <h4 className="text-white font-bold text-lg">
                      {lastRead
                        ? listSurah[lastRead.surahNumber - 1]?.namaLatin
                        : "Al-Fatihah"}
                    </h4>
                    <p className="text-emerald-200 text-xs">
                      Ayat: {lastRead ? lastRead.ayah : "1"}
                    </p>
                  </div>
                  <div className="text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Search Section */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
              </div>
              <input
                className="w-full pl-12 pr-4 py-4 bg-white/70 backdrop-blur-sm border border-emerald-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700 placeholder-gray-500 shadow-lg"
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
          <div className="bg-emerald-50/50 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-emerald-100">
            <div className="flex items-start space-x-3">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-emerald-600 mt-1 flex-shrink-0"
              />
              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="font-semibold text-emerald-700">
                  Icon checklist
                </span>{" "}
                di samping nama surat menandakan surat dapat diakses offline
                (kecuali audio)
              </p>
            </div>
          </div>

          {/* Surah List */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
