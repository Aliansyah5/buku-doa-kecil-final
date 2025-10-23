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
      <Layout showBanner={false}>
        <div className="px-6 py-4">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 bg-linear-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
              Daftar Surat Al-Qur'an
            </h1>
            <p className="text-gray-600 text-sm">
              Pilih surat yang ingin Anda baca
            </p>
          </div>

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
