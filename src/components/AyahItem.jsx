import { useParams } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShare,
  faPlay,
  faBookmark,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";

import { saveLastReadSurah } from "../helper/local-storage-helper";
import { appContext } from "../context/app-context";
import Notification from "./Modal/Notification";
import Confirmation from "./Modal/Confirmation";
import ShareAyah from "./ShareAyah";
import Ayah from "./Ayah";
import { formatAyahNumber } from "../utils/arabicNumbers";

export default function AyahItem({ ayahData, onPlayAudio, playStatus }) {
  const { number } = useParams();
  const seletedCollectionIdRef = useRef();
  const [showTooltips, setShowTooltips] = useState(false);
  const {
    showModal,
    listSurah,
    saveAndSyncBookmark,
    bookmark,
    closeModal,
    replaceModalContent,
    settings,
  } = useContext(appContext);
  const surahName = listSurah.find((item) => item.nomor == number).namaLatin;

  useEffect(() => {
    if (ayahData.nomorAyat === 1) {
      // Delay 1 detik sebelum muncul tooltip
      const showTimeout = setTimeout(() => {
        setShowTooltips(true);

        // Auto close setelah 10 detik
        const hideTimeout = setTimeout(() => {
          setShowTooltips(false);
        }, 10000);

        return () => clearTimeout(hideTimeout);
      }, 1000);

      return () => clearTimeout(showTimeout);
    }
  }, [ayahData.nomorAyat]);

  function handleClick() {
    const audioUrl = ayahData.audio?.[settings.qori];
    console.log("=== AUDIO DEBUG ===");
    console.log("Settings qori:", settings.qori);
    console.log("Ayah number:", ayahData.nomorAyat);
    console.log("Available audio keys:", Object.keys(ayahData.audio || {}));
    console.log("Audio URL:", audioUrl);
    console.log("Full audio object:", ayahData.audio);
    console.log("==================");

    if (!audioUrl) {
      console.warn(
        `❌ Audio not available for qori ${settings.qori} in ayah ${ayahData.nomorAyat}. Available keys:`,
        Object.keys(ayahData.audio || {})
      );
      alert(
        `Audio not available for this qori. Available: ${Object.keys(
          ayahData.audio || {}
        ).join(", ")}`
      );
      return;
    }

    console.log("✅ Playing audio with URL:", audioUrl);
    onPlayAudio(audioUrl, {
      ayahNumber: ayahData.nomorAyat,
      surahNumber: number,
    });
  }

  function handleLastReadClick() {
    saveLastReadSurah(number, ayahData.nomorAyat);
    showModal(
      <Notification
        title="Berhasil"
        message={`${surahName} ayat ${formatAyahNumber(
          ayahData.nomorAyat
        )} berhasil ditandai sebagai 'terakhir dibaca'`}
      />,
      true
    );
  }

  function handleBookmarkClick() {
    showModal(
      <Confirmation
        heading={"Simpan bookmark"}
        preText={
          <span>
            {surahName} ayat {formatAyahNumber(ayahData.nomorAyat)}. <br />{" "}
            Silahkan pilih collection..
          </span>
        }
        confirmationObject={{
          element: (
            <>
              <select
                name=""
                id=""
                ref={seletedCollectionIdRef}
                className="border border-stone-500 font-bold bg-white rounded-lg my-4"
              >
                {bookmark.map((collection) => (
                  <option
                    key={collection.collectionId}
                    value={collection.collectionId}
                  >
                    {collection.collectionName}
                  </option>
                ))}
              </select>
            </>
          ),
          confirmText: "Simpan",
          cancelText: "Batal",
        }}
        onConfirm={() => {
          const { error, message } = saveAndSyncBookmark(
            number,
            surahName,
            ayahData.nomorAyat,
            seletedCollectionIdRef.current.value
          );

          closeModal(() => {
            replaceModalContent(
              <Notification
                title={error ? "Gagal" : "Berhasil"}
                message={message}
              />,
              true
            );
          });
        }}
      />
    );
  }

  function handleShareClick() {
    const ayahObject = {
      ...ayahData,
      namaSurat: surahName,
      nomorSurah: number,
    };

    showModal(<ShareAyah ayahObject={ayahObject} />);
  }

  return (
    <>
      <div
        className={`relative group ayah-item mx-2 mt-6 mb-4 ${
          playStatus
            ? "bg-linear-to-r from-emerald-100 to-green-100 border-2 border-emerald-300 rounded-3xl shadow-lg p-6"
            : "bg-white/70 backdrop-blur-sm rounded-3xl border border-emerald-100 shadow-md p-6 hover:shadow-lg transition-all duration-300"
        }`}
        id={`${ayahData.nomorAyat}`}
      >
        {/* Islamic corner decorations */}
        <div className="absolute top-3 left-3 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
          <div className="w-3 h-3 border-l-2 border-t-2 border-emerald-400 rounded-tl-xl"></div>
        </div>
        <div className="absolute top-3 right-3 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
          <div className="w-3 h-3 border-r-2 border-t-2 border-emerald-400 rounded-tr-xl"></div>
        </div>

        {/* Header with ayah number and action buttons */}
        <div className="flex items-center justify-between mb-6">
          {/* Ayah Number */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-linear-to-r from-emerald-500/30 to-green-500/30 rounded-2xl flex items-center justify-center shadow-sm opacity-60 hover:opacity-80 transition-opacity duration-300">
              <span className="text-emerald-700 font-medium text-lg">
                {formatAyahNumber(ayahData.nomorAyat)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 opacity-50 hover:opacity-80 transition-opacity duration-300">
            {/* Last Read Button */}
            <div className="relative group/tooltip">
              <button
                onClick={handleLastReadClick}
                className="w-10 h-10 bg-blue-100/40 hover:bg-blue-200/60 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <FontAwesomeIcon
                  icon={faBookOpen}
                  className="text-blue-600/70"
                />
              </button>
              {showTooltips && (
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-emerald-600/90 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
                    Tandai terakhir dibaca
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-emerald-600/90 rotate-45"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Share Button */}
            <div className="relative group/tooltip">
              <button
                onClick={handleShareClick}
                className="w-10 h-10 bg-purple-100/40 hover:bg-purple-200/60 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <FontAwesomeIcon
                  icon={faShare}
                  className="text-purple-600/70"
                />
              </button>
              {showTooltips && (
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-emerald-600/90 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
                    Bagikan ayat
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-emerald-600/90 rotate-45"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Play/Pause Button */}
            {!playStatus && (
              <div className="relative group/tooltip">
                <button
                  onClick={handleClick}
                  className="w-10 h-10 bg-green-100/40 hover:bg-green-200/60 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105"
                >
                  <FontAwesomeIcon
                    icon={faPlay}
                    className="text-green-600/70"
                  />
                </button>
                {showTooltips && (
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-emerald-600/90 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
                      Putar audio
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-emerald-600/90 rotate-45"></div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Bookmark Button */}
            <div className="relative group/tooltip">
              <button
                onClick={handleBookmarkClick}
                className="w-10 h-10 bg-amber-100/40 hover:bg-amber-200/60 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <FontAwesomeIcon
                  icon={faBookmark}
                  className="text-amber-600/70"
                />
              </button>
              {showTooltips && (
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-emerald-600/90 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
                    Bookmark ayat
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-emerald-600/90 rotate-45"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Ayah Content */}
        <div className={`${playStatus ? "bg-white/50 rounded-2xl p-4" : ""}`}>
          <Ayah
            ayah={ayahData}
            arabicFontSize={settings.interfaceSetting.arabicFontSize}
            showTranslation={settings.interfaceSetting.showTranslation}
            showTransliteration={settings.interfaceSetting.showTransliteration}
          />
        </div>

        {/* Bottom decorative border for active ayah */}
        {playStatus && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-linear-to-r from-emerald-500 to-green-500 rounded-full"></div>
        )}
      </div>
    </>
  );
}
