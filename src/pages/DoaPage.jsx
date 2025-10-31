import { useState, useEffect, useContext } from "react";
import Layout from "../components/Layout/Layout";
import LoadingIndicator from "../components/LoadingIndicator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHands,
  faShare,
  faBookmark,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import useTitle from "../hooks/useTitle";
import { convertToArabicNumerals } from "../utils/arabicNumbers";
import { appContext } from "../context/app-context";

export default function DoaPage() {
  const [doaList, setDoaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookmarkedDoas, setBookmarkedDoas] = useState([]);
  const { showModal, bookmark, saveAndSyncBookmark, deleteAndSyncBookmark } =
    useContext(appContext);

  useTitle("Doa Rutin 13");

  // Sync bookmarked doas from bookmark context
  useEffect(() => {
    if (bookmark && bookmark.length > 0) {
      // Get all doa bookmarks from default collection
      const doaBookmarks = bookmark
        .flatMap((collection) => collection.lists || [])
        .filter(
          (item) =>
            item.surahNumber && item.surahNumber.toString().startsWith("doa-")
        )
        .map((item) => item.surahNumber);
      setBookmarkedDoas(doaBookmarks);
    }
  }, [bookmark]);

  useEffect(() => {
    const loadDoaData = async () => {
      try {
        const response = await fetch("/data/doarutin.json");
        const data = await response.json();
        setDoaList(data);
      } catch (error) {
        console.error("Error loading doa data:", error);
        // Fallback data jika file tidak bisa dimuat
        const fallbackData = [
          {
            nomor_doa: 1,
            text_arab:
              "لَا إِلٰهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيْكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلٰى كُلِّ شَيْءٍ قَدِيْرٌ",
            terjemah:
              "Tidak ada Tuhan selain Allah Yang Maha Esa, tidak ada sekutu bagi-Nya. Bagi-Nya kerajaan dan bagi-Nya segala puji, dan Dia Maha Kuasa atas segala sesuatu.",
            keutamaan:
              "Barang siapa yang membaca kalimat ini 100x dalam sehari, maka pahalanya membanding memerdekakan 10 budak dan ditulis baginya 100 kebaikan dan dihapus 100 kejelekan dan dijaga dari syaitan dalam sehari semalam.",
          },
        ];
        setDoaList(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    loadDoaData();
  }, []);

  const handleShareDoa = (doa) => {
    const shareText = `Doa ${convertToArabicNumerals(doa.nomor_doa)}:\n\n${
      doa.text_arab
    }\n\nKeutamaan: ${doa.keutamaan}`;

    if (navigator.share) {
      navigator.share({
        title: `Doa Rutin ${convertToArabicNumerals(doa.nomor_doa)}`,
        text: shareText,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert("Teks doa telah disalin ke clipboard");
    }
  };

  const handleBookmarkDoa = (doa) => {
    const doaId = `doa-${doa.nomor_doa}`;
    const isBookmarked = bookmarkedDoas.includes(doaId);
    const collectionId = 1; // Default collection

    let message;

    if (isBookmarked) {
      // Remove bookmark - find and delete it
      const bookmarkId = `${collectionId}@${doaId}-doa`;
      deleteAndSyncBookmark(bookmarkId, collectionId);
      setBookmarkedDoas(bookmarkedDoas.filter((id) => id !== doaId));
      message = `Doa ${convertToArabicNumerals(
        doa.nomor_doa
      )} dihapus dari bookmark`;
    } else {
      // Add bookmark
      const result = saveAndSyncBookmark(
        doaId,
        `Doa ${convertToArabicNumerals(doa.nomor_doa)}`,
        doa.text_arab,
        collectionId
      );
      if (!result.error) {
        setBookmarkedDoas([...bookmarkedDoas, doaId]);
        message = result.message;
      } else {
        message = result.message;
      }
    }

    // Show notification
    showModal(
      <div className="p-6 text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FontAwesomeIcon
            icon={faBookmark}
            className="text-emerald-600 text-2xl"
          />
        </div>
        <p className="text-gray-800 font-medium">{message}</p>
      </div>,
      true
    );
  };

  const isDoaBookmarked = (doaId) => {
    return bookmarkedDoas.includes(`doa-${doaId}`);
  };

  if (loading) return <LoadingIndicator />;

  return (
    <Layout showBanner={false}>
      <div className="min-h-screen bg-linear-to-br from-gray-50 via-emerald-50/30 to-green-50/50">
        {/* Header Section */}
        <div className="text-center py-8 px-6">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-linear-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
              <FontAwesomeIcon icon={faHands} className="text-white text-lg" />
            </div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
              Doa Rutin 13
            </h1>
          </div>
          <p className="text-gray-600 text-sm max-w-md mx-auto">
            Kumpulan doa rutin sehari-hari dengan keutamaan dan pahala yang luar
            biasa
          </p>

          {/* Islamic decorative line */}
          <div className="flex items-center justify-center space-x-2 mt-4">
            <div className="w-8 h-0.5 bg-linear-to-r from-transparent to-emerald-300"></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <div className="w-4 h-0.5 bg-emerald-300"></div>
            <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
            <div className="w-4 h-0.5 bg-emerald-300"></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <div className="w-8 h-0.5 bg-linear-to-l from-transparent to-emerald-300"></div>
          </div>
        </div>

        {/* Doa List */}
        <div className="pb-24">
          {doaList.map((doa) => (
            <DoaItem
              key={doa.nomor_doa}
              doaData={doa}
              onShare={() => handleShareDoa(doa)}
              onBookmark={() => handleBookmarkDoa(doa)}
              isBookmarked={isDoaBookmarked(doa.nomor_doa)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

// Component untuk setiap item doa
function DoaItem({ doaData, onShare, onBookmark, isBookmarked }) {
  return (
    <div className="relative group doa-item mx-4 mt-6 mb-4 bg-white/70 backdrop-blur-sm rounded-3xl border border-emerald-100 shadow-md p-6 hover:shadow-lg transition-all duration-300">
      {/* Islamic corner decorations */}
      <div className="absolute top-3 left-3 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
        <div className="w-3 h-3 border-l-2 border-t-2 border-emerald-400 rounded-tl-xl"></div>
      </div>
      <div className="absolute top-3 right-3 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
        <div className="w-3 h-3 border-r-2 border-t-2 border-emerald-400 rounded-tr-xl"></div>
      </div>

      {/* Header dengan nomor doa dan tombol aksi */}
      <div className="flex items-center justify-between mb-6">
        {/* Nomor Doa */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-linear-to-r from-emerald-500/30 to-green-500/30 rounded-2xl flex items-center justify-center shadow-sm opacity-60 hover:opacity-80 transition-opacity duration-300">
            <span className="text-emerald-700 font-medium text-lg">
              {convertToArabicNumerals(doaData.nomor_doa)}
            </span>
          </div>
          <div>
            <h3 className="text-emerald-800 font-semibold text-base">
              Doa {convertToArabicNumerals(doaData.nomor_doa)}
            </h3>
            <p className="text-gray-500 text-xs">Doa Rutin Harian</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 opacity-50 hover:opacity-80 transition-opacity duration-300">
          {/* Share Button */}
          <button
            onClick={onShare}
            className="w-10 h-10 bg-purple-100/40 hover:bg-purple-200/60 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105"
            title="Bagikan doa"
          >
            <FontAwesomeIcon icon={faShare} className="text-purple-600/70" />
          </button>

          {/* Bookmark Button */}
          <button
            onClick={onBookmark}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 ${
              isBookmarked
                ? "bg-amber-500 hover:bg-amber-600"
                : "bg-amber-100/40 hover:bg-amber-200/60"
            }`}
            title={isBookmarked ? "Hapus dari bookmark" : "Simpan ke bookmark"}
          >
            <FontAwesomeIcon
              icon={faBookmark}
              className={isBookmarked ? "text-white" : "text-amber-600/70"}
            />
          </button>
        </div>
      </div>

      {/* Konten Doa */}
      <div className="space-y-5">
        {/* Teks Arab */}
        <div className="relative">
          <div className="bg-linear-to-r from-emerald-50/30 to-green-50/30 rounded-2xl p-6 border border-emerald-100/50">
            <p className="text-right text-2xl text-gray-800 font-arabic leading-loose">
              {doaData.text_arab}
            </p>
          </div>

          {/* Decorative line after Arabic */}
          <div className="flex items-center justify-center mt-4">
            <div className="w-16 h-0.5 bg-linear-to-r from-transparent via-emerald-300 to-transparent"></div>
          </div>
        </div>

        {/* Terjemahan */}
        {doaData.terjemah && (
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-emerald-100/50">
            <div className="flex items-start space-x-3">
              <div className="text-xl shrink-0 mt-0.5">📖</div>
              <div className="flex-1">
                <h4 className="text-emerald-800 font-semibold text-sm mb-2">
                  Terjemahan
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed italic">
                  "{doaData.terjemah}"
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Keutamaan */}
        {doaData.keutamaan && (
          <div className="bg-linear-to-r from-amber-50/40 to-yellow-50/40 rounded-2xl p-5 border border-amber-200/50">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <FontAwesomeIcon icon={faStar} className="text-white text-xs" />
              </div>
              <div className="flex-1">
                <h4 className="text-amber-800 font-semibold text-sm mb-2">
                  Keutamaan & Pahala
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {doaData.keutamaan}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom decorative dots */}
      <div className="flex items-center justify-center space-x-1 mt-6 pt-4 border-t border-emerald-100/50">
        <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
        <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
        <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
        <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
        <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
      </div>
    </div>
  );
}
