import { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { appContext } from "../context/app-context";
import { useParams, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { scrollToElement } from "../utils/scrollUtils";

export default function SurahAndAyahNavigation({ surahData }) {
  const [selectedSurah, setSelectedSurah] = useState("");
  const [selectedAyah, setSelectedAyah] = useState(0);
  const { listSurah, activeAyah } = useContext(appContext);
  const { number, ayah } = useParams();
  const navigate = useNavigate();

  const handleSelectAyah = useCallback(
    (ayahNumber) => {
      if (ayahNumber <= surahData.jumlahAyat) {
        scrollToElement(ayahNumber);
        setSelectedAyah(ayahNumber);
      }
    },
    [surahData.jumlahAyat]
  );

  useEffect(() => {
    setSelectedSurah(number);
    if (ayah > 1) {
      handleSelectAyah(ayah);
    } else {
      setSelectedAyah(0);
    }
  }, [number, ayah, handleSelectAyah]);

  useEffect(() => {
    activeAyah.ayahNumber !== null && handleSelectAyah(activeAyah.ayahNumber);
  }, [activeAyah.ayahNumber, handleSelectAyah]);

  function handleSelectSurah(e) {
    setSelectedSurah(e.target.value);
    navigate(`/surah/${e.target.value}`);
  }

  const prevSurah = number > 1 ? parseInt(number) - 1 : null;
  const nextSurah = number < 114 ? parseInt(number) + 1 : null;

  if (listSurah.length == 0) return navigate("/surah");

  return (
    <>
      {/* Compact Navigation Bar */}
      <div className="fixed left-0 right-0 top-0 z-20 bg-white/95 backdrop-blur-lg shadow-sm border-b border-emerald-100 overflow-hidden">
        {/* Main Navigation Row */}
        <div className="flex items-center justify-between px-2 sm:px-4 py-2.5 max-w-7xl mx-auto w-full min-w-0">
          {/* Left: Previous Surah */}
          <button
            className={`flex items-center space-x-2 px-2 sm:px-3 py-2 rounded-xl transition-all duration-200 flex-shrink-0 ${
              prevSurah
                ? "text-emerald-700 hover:bg-emerald-50 active:scale-95"
                : "text-gray-300 cursor-not-allowed"
            }`}
            onClick={() => prevSurah && navigate(`/surah/${prevSurah}`)}
            disabled={!prevSurah}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
            <span className="text-xs font-medium hidden md:block max-w-[120px] truncate">
              {prevSurah
                ? `${prevSurah}. ${listSurah[prevSurah - 1]?.namaLatin}`
                : "---"}
            </span>
            <span className="text-xs font-medium md:hidden">
              {prevSurah || "---"}
            </span>
          </button>

          {/* Center: Surah & Ayah Selectors */}
          <div className="flex items-center space-x-2 flex-1 max-w-sm mx-2 sm:mx-4 min-w-0">
            {/* Surah Selector */}
            <div className="flex-1 min-w-0">
              <select
                value={selectedSurah}
                onChange={handleSelectSurah}
                className="w-full bg-white border border-emerald-200 rounded-xl px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent transition-all duration-200 truncate"
              >
                {listSurah.map((item) => (
                  <option
                    key={item.nomor}
                    value={item.nomor}
                    className={item.nomor == number ? "bg-emerald-50" : ""}
                  >
                    {item.nomor}. {item.namaLatin}
                  </option>
                ))}
              </select>
            </div>

            {/* Divider */}
            <div className="w-px h-6 bg-emerald-200 flex-shrink-0"></div>

            {/* Ayah Selector */}
            <div className="w-20 sm:w-24 flex-shrink-0">
              <select
                value={selectedAyah}
                onChange={(e) => handleSelectAyah(e.target.value)}
                className="w-full bg-white border border-emerald-200 rounded-xl px-1 sm:px-2 py-2 text-xs sm:text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent transition-all duration-200"
              >
                <option value={0} className="text-gray-500">
                  Ayat
                </option>
                {surahData.ayat.map((item) => (
                  <option key={item.nomorAyat} value={item.nomorAyat}>
                    {item.nomorAyat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Right: Next Surah */}
          <button
            className={`flex items-center space-x-2 px-2 sm:px-3 py-2 rounded-xl transition-all duration-200 flex-shrink-0 ${
              nextSurah
                ? "text-emerald-700 hover:bg-emerald-50 active:scale-95"
                : "text-gray-300 cursor-not-allowed"
            }`}
            onClick={() => nextSurah && navigate(`/surah/${nextSurah}`)}
            disabled={!nextSurah}
          >
            <span className="text-xs font-medium hidden md:block max-w-[120px] truncate">
              {nextSurah
                ? `${nextSurah}. ${listSurah[nextSurah - 1]?.namaLatin}`
                : "---"}
            </span>
            <span className="text-xs font-medium md:hidden">
              {nextSurah || "---"}
            </span>
            <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
          </button>
        </div>

        {/* Bottom Info Bar - Optional compact info */}
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-t border-emerald-100 px-2 sm:px-4 py-1.5 overflow-hidden">
          <div className="flex items-center justify-center space-x-4 text-xs text-emerald-700 max-w-7xl mx-auto w-full min-w-0">
            <span className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
              <span>Surah {number}</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-1 h-1 bg-yellow-400 rounded-full"></span>
              <span>{surahData.jumlahAyat} Ayat</span>
            </span>
            <span className="items-center space-x-1 hidden sm:flex">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
              <span className="capitalize">{surahData.tempatTurun}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Reduced Spacer - much closer to header */}
      <div className="h-20"></div>
    </>
  );
}
