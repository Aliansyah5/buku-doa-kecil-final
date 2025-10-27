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
    <div className="group relative bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-emerald-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5">
      {/* Islamic ornamental border */}
      <div className="absolute inset-0 rounded-xl border border-transparent bg-linear-to-r from-emerald-100/30 via-green-100/20 to-teal-100/30 p-0.5 group-hover:from-emerald-200/50 group-hover:via-green-200/40 group-hover:to-teal-200/50 transition-all duration-300">
        <div className="w-full h-full bg-white/90 rounded-xl"></div>
      </div>

      {/* Islamic corner decorations */}
      <div className="absolute top-2 left-2 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
        <div className="w-2 h-2 border-l border-t border-emerald-400 rounded-tl"></div>
      </div>
      <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
        <div className="w-2 h-2 border-r border-t border-emerald-400 rounded-tr"></div>
      </div>
      <div className="absolute bottom-2 left-2 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
        <div className="w-2 h-2 border-l border-b border-emerald-400 rounded-bl"></div>
      </div>
      <div className="absolute bottom-2 right-2 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
        <div className="w-2 h-2 border-r border-b border-emerald-400 rounded-br"></div>
      </div>

      <div className="relative z-10 flex justify-between items-center">
        <div className="flex items-center space-x-3.5 flex-1 min-w-0">
          {/* Surah Number with Islamic styling */}
          <div className="relative shrink-0">
            <div className="w-11 h-11 bg-linear-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
              {/* Islamic pattern overlay */}
              <div className="absolute inset-0 opacity-20 rounded-xl">
                <div className="islamic-icon-pattern w-full h-full"></div>
              </div>
              <span className="text-white font-bold text-sm relative z-10">
                {formatSurahNumber(surahData.nomor)}
              </span>
              {/* Border accent */}
              <div className="absolute inset-0 rounded-xl border border-white/20"></div>
            </div>
          </div>

          {/* Surah Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-0.5">
              <h3
                className={`font-semibold text-sm leading-tight truncate ${
                  surahAvailableOffline ? "text-emerald-700" : "text-gray-800"
                } group-hover:text-emerald-600 transition-colors duration-300`}
              >
                {surahData.namaLatin}
              </h3>
              {surahAvailableOffline && (
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-emerald-600 text-xs shrink-0"
                />
              )}
            </div>
            <p className="text-gray-500 text-xs italic mb-0.5 truncate">
              {surahData.arti}
            </p>
            <p className="text-gray-400 text-xs">
              {convertToArabicNumerals(surahData.jumlahAyat)} ayat
            </p>
          </div>
        </div>

        {/* Arabic Name */}
        <div className="text-right shrink-0 ml-3">
          <div className="font-arabic text-emerald-800 font-bold text-lg leading-tight group-hover:text-emerald-600 transition-colors duration-300">
            {surahData.nama}
          </div>
          {/* Decorative accent */}
          <div className="flex items-center justify-end space-x-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-0.5 h-0.5 bg-emerald-400 rounded-full"></div>
            <div className="w-2.5 h-0.5 bg-linear-to-r from-emerald-400 to-green-400"></div>
            <div className="w-0.5 h-0.5 bg-green-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-xl bg-linear-to-r from-emerald-500 to-green-500 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
}
