import { ARABIC_FONT_SIZE } from "../constant/ARABIC_FONT_SIZE";

export default function Ayah({
  ayah,
  arabicFontSize = "normal",
  showTranslation = true,
  showTransliteration = true,
}) {
  return (
    <div className="ayah-section space-y-6">
      {/* Arabic Text */}
      <div className="relative">
        <div
          className={`arabic-ayah arabic text-right leading-loose ${ARABIC_FONT_SIZE[arabicFontSize]} text-gray-800`}
        >
          <span className="block p-4 bg-gradient-to-r from-emerald-50/30 to-green-50/30 rounded-2xl border border-emerald-100/50">
            {ayah.teksArab}
          </span>
        </div>

        {/* Decorative line after Arabic */}
        <div className="flex items-center justify-center mt-4">
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-emerald-300 to-transparent"></div>
        </div>
      </div>

      {/* Transliteration */}
      {showTransliteration && (
        <div className="transliteration-ayah">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-emerald-100/50">
            <p className="text-sm font-medium text-emerald-800 italic leading-relaxed">
              {ayah.teksLatin}
            </p>
          </div>
        </div>
      )}

      {/* Translation */}
      {showTranslation && (
        <div className="translation-ayah">
          <div className="bg-gradient-to-r from-emerald-50/40 to-green-50/40 rounded-2xl p-4 border border-emerald-100/50">
            <p className="text-sm text-gray-700 leading-relaxed">
              {ayah.teksIndonesia}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
