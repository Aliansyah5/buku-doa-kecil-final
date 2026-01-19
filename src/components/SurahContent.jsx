import { useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { appContext } from "../context/app-context";
import useTitle from "../hooks/useTitle";
import { playAudioDirect } from "../utils/audioUtils";

import QuranAsset from "../assets/quran.png";

import AyahItem from "../components/AyahItem";

import SurahAndAyahNavigation from "../components/SurahAndAyahNavigation";

import { scrollToTop } from "../utils/scrollUtils";

export default function SurahContent({ loadedSurahData }) {
  const { number, ayah } = useParams();
  const audioRef = useRef();

  useTitle(loadedSurahData.namaLatin);

  const { handleActiveAyahChange, activeAyah, settings } =
    useContext(appContext);

  if (number > 114) window.location.href = "/list-surah";

  useEffect(() => {
    handleActiveAyahChange(null, null);
  }, [handleActiveAyahChange]);

  useEffect(() => {
    let timeout = null;

    if (!ayah || ayah < 2) {
      scrollToTop();
      timeout = setTimeout(() => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 1500);
    }

    if (audioRef.current) {
      audioRef.current.src = "";
    }

    return () => clearTimeout(timeout);
  }, [number, ayah]);

  async function ayahAudioPlayEvent(
    src,
    ayahObj,
    next = false,
    nextAudio = false
  ) {
    console.log("=== 🎵 ayahAudioPlayEvent CALLED ===");
    console.log("Parameters received:");
    console.log("  src:", src);
    console.log("  ayahObj:", ayahObj);
    console.log("  next:", next);
    console.log("  nextAudio:", nextAudio);
    console.log("  audioRef.current:", audioRef.current);
    console.log("====================================");

    if (!audioRef.current) {
      console.error(
        "❌ FATAL: audioRef.current is still null! Audio element not mounted."
      );
      return;
    }

    try {
      if (!next) {
        if (!src) {
          console.warn("❌ No audio source provided for playback");
          return;
        }

        console.log("🎵 Starting audio playback for ayah", ayahObj.ayahNumber);
        handleActiveAyahChange(ayahObj.ayahNumber, ayahObj.surahNumber);

        // Small delay to ensure audio element state is updated
        await new Promise((resolve) => setTimeout(resolve, 50));

        console.log(
          "Calling playAudioDirect with audioRef and src:",
          src.substring(0, 80)
        );
        // Use new playAudioDirect method (handles both direct + blob fallback)
        const success = await playAudioDirect(audioRef.current, src);
        console.log("playAudioDirect returned:", success);
        if (!success) {
          console.error("❌ Failed to play audio");
        }
      } else {
        handleActiveAyahChange(null, null, true);
        const nextAudioUrl = nextAudio?.audio?.[settings.qori];
        if (nextAudioUrl) {
          // Small delay before playing next audio
          await new Promise((resolve) => setTimeout(resolve, 100));
          const success = await playAudioDirect(audioRef.current, nextAudioUrl);
          if (!success) {
            console.error("❌ Failed to play next audio");
          }
        }
      }
    } catch (error) {
      console.error("❌ Unexpected error in ayahAudioPlayEvent:", error);
    }
  }
  function handleAyahPlayedEnded(event, loadedSurahData) {
    event.target.src = null;
    if (activeAyah.ayahNumber + 1 > loadedSurahData.ayat.length) {
      return handleActiveAyahChange(null, null);
    }
    const timeout = setTimeout(() => {
      ayahAudioPlayEvent(
        null,
        null,
        true,
        loadedSurahData.ayat[activeAyah.ayahNumber],
        loadedSurahData.ayat.length
      );
    }, 1000);
    return () => clearTimeout(timeout);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-green-50/50 mb-40">
      <SurahAndAyahNavigation surahData={loadedSurahData} />

      <>
        <div className="surah-banner relative p-4 rounded-xl text-white flex flex-col gap-1 justify-center items-center m-6 shadow bg-cover bg-no-repeat mt-30 md:w-[512px] md:mx-auto bg-gradient-to-br from-[#4ADE80]/80 to-[#16A34A]/80 overflow-hidden">
          <h1 className="text-2xl my-2">{loadedSurahData.namaLatin}</h1>
          <h2 className="text-sm">{loadedSurahData.arti}</h2>
          <hr className="my-4 border-1 border-stone-50 w-1/2 opacity-50" />
          <div className="flex gap-1 justify-evenly">
            <h2>{loadedSurahData.tempatTurun}, </h2>
            <h2>{loadedSurahData.jumlahAyat} Ayat</h2>
          </div>
          <div className="text-3xl my-4">
            <h1 className="arabic">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</h1>
          </div>
          <img
            src={QuranAsset}
            alt=""
            className="-z-10 absolute right-0 bottom-0 w-3/5 min-[420px]:w-2/5 h-auto"
          />
        </div>

        <div className="surah-ayah-container">
          {loadedSurahData.ayat.map((item) => (
            <AyahItem
              key={item.nomorAyat}
              ayahData={item}
              onPlayAudio={ayahAudioPlayEvent}
              playStatus={item.nomorAyat === activeAyah.ayahNumber}
            />
          ))}
        </div>

        <div className="fixed bottom-20 md:bottom-28 lg:bottom-20 left-0 right-0 mx-auto w-full px-3 z-40">
          <div className="max-w-xl mx-auto relative">
            {/* Audio Element - ALWAYS in DOM, not conditional */}
            <audio
              className="w-full h-12 bg-transparent outline-none
                      [&::-webkit-media-controls-panel]:bg-transparent
                      [&::-webkit-media-controls-current-time-display]:text-emerald-700
                      [&::-webkit-media-controls-current-time-display]:font-medium
                      [&::-webkit-media-controls-time-remaining-display]:text-emerald-700
                      [&::-webkit-media-controls-time-remaining-display]:font-medium
                      [&::-webkit-media-controls-timeline]:bg-emerald-100
                      [&::-webkit-media-controls-timeline]:rounded-full
                      [&::-webkit-media-controls-timeline]:h-1
                      [&::-webkit-media-controls-play-button]:bg-emerald-500
                      [&::-webkit-media-controls-play-button]:rounded-full
                      [&::-webkit-media-controls-play-button]:text-white
                      [&::-webkit-media-controls-play-button]:shadow-md
                      [&::-webkit-media-controls-volume-slider]:accent-emerald-500
                      [&::-webkit-media-controls-mute-button]:text-emerald-600
                      hover:bg-emerald-50/30 transition-colors duration-300
                      ${activeAyah.ayahNumber ? 'block' : 'hidden'}"
              ref={audioRef}
              controls
              controlsList="nodownload"
              onEnded={(event) => {
                handleAyahPlayedEnded(event, loadedSurahData);
              }}
              onError={(e) => {
                console.error("Audio element error:", e);
                console.log("Error code:", audioRef.current?.error?.code);
              }}
              onLoadStart={() => console.log("Audio load started")}
              onCanPlay={() => console.log("Audio can play")}
            />

            {activeAyah.ayahNumber && (
              <div className="bg-white/95 backdrop-blur-lg shadow-xl rounded-2xl border border-emerald-100 overflow-hidden">
                {/* Header with close button */}
                <div className="bg-linear-to-r from-emerald-50 to-green-50 px-4 py-3 border-b border-emerald-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse delay-75"></div>
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse delay-150"></div>
                      </div>
                      <div className="text-sm">
                        <span className="text-emerald-700 font-medium">
                          Sedang Diputar
                        </span>
                        <div className="text-xs text-gray-600">
                          {loadedSurahData.namaLatin} • Ayat{" "}
                          {activeAyah.ayahNumber}
                        </div>
                      </div>
                    </div>

                    {/* Close button */}
                    <button
                      onClick={() => {
                        if (audioRef.current) {
                          audioRef.current.pause();
                          audioRef.current.src = "";
                        }
                        handleActiveAyahChange(null, null);
                      }}
                      className="w-8 h-8 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center transition-colors duration-300 group"
                    >
                      <svg
                        className="w-4 h-4 text-red-600 group-hover:scale-110 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Islamic decorative bottom border */}
                <div className="flex items-center justify-center py-2">
                  <div className="w-16 h-0.5 bg-linear-to-r from-transparent via-emerald-300 to-transparent"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    </div>
  );
}
