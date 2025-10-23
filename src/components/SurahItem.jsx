import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import SurahMarker from "../assets/surah-marker.png";
import { checkExistingSurahData } from "../helper/local-storage-helper";
import {
  formatSurahNumber,
  convertToArabicNumerals,
} from "../utils/arabicNumbers";

export default function SurahItem({ surahData }) {
  const surahAvailableOffline = checkExistingSurahData(surahData.nomor);

  return (
    <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
      {/* Islamic ornamental border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-linear-to-r from-emerald-200/20 via-green-200/10 to-teal-200/20 p-0.5 group-hover:from-emerald-300/30 group-hover:via-green-300/20 group-hover:to-teal-300/30 transition-all duration-300">
        <div className="w-full h-full bg-white/80 rounded-2xl"></div>
      </div>

      {/* Islamic corner decorations */}
      <div className="absolute top-2 left-2 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
        <div className="w-2 h-2 border-l border-t border-emerald-400 rounded-tl-lg"></div>
      </div>
      <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
        <div className="w-2 h-2 border-r border-t border-emerald-400 rounded-tr-lg"></div>
      </div>
      <div className="absolute bottom-2 left-2 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
        <div className="w-2 h-2 border-l border-b border-emerald-400 rounded-bl-lg"></div>
      </div>
      <div className="absolute bottom-2 right-2 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
        <div className="w-2 h-2 border-r border-b border-emerald-400 rounded-br-lg"></div>
      </div>

      <div className="relative z-10 flex justify-between items-center">
        <div className="flex items-center space-x-4 flex-1">
          {/* Surah Number with Islamic styling */}
          <div className="relative">
            <div className="w-12 h-12 bg-linear-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              {/* Islamic pattern overlay */}
              <div className="absolute inset-0 opacity-20 rounded-2xl">
                <div className="islamic-icon-pattern w-full h-full"></div>
              </div>
              <span className="text-white font-bold text-sm relative z-10">
                {formatSurahNumber(surahData.nomor)}
              </span>
              {/* Golden accent border */}
              <div className="absolute inset-0 rounded-2xl border border-yellow-300/30"></div>
            </div>
          </div>

          {/* Surah Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3
                className={`font-bold text-base leading-tight ${
                  surahAvailableOffline ? "text-emerald-700" : "text-gray-800"
                } group-hover:text-emerald-600 transition-colors duration-300`}
              >
                {surahData.namaLatin}
              </h3>
              {surahAvailableOffline && (
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-emerald-600 text-sm"
                />
              )}
            </div>
            <p className="text-gray-500 text-xs italic mb-1">
              {surahData.arti}
            </p>
            <p className="text-gray-400 text-xs">
              {convertToArabicNumerals(surahData.jumlahAyat)} ayat
            </p>
          </div>
        </div>

        {/* Arabic Name */}
        <div className="text-right">
          <div className="font-arabic text-emerald-800 font-bold text-lg group-hover:text-emerald-600 transition-colors duration-300">
            {surahData.nama}
          </div>
          {/* Decorative accent */}
          <div className="flex items-center justify-end space-x-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
            <div className="w-3 h-0.5 bg-linear-to-r from-emerald-400 to-green-400"></div>
            <div className="w-1 h-1 bg-green-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-emerald-500 to-green-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
}
