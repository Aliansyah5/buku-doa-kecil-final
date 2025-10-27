import { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import LoadingIndicator from "../components/LoadingIndicator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMosque,
  faChevronLeft,
  faChevronRight,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import useTitle from "../hooks/useTitle";
import { convertToArabicNumerals } from "../utils/arabicNumbers";

export default function DzikirPage() {
  const [dzikirList, setDzikirList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [counters, setCounters] = useState({});

  useTitle("Dzikir Setelah Shalat");

  // Load dzikir data
  useEffect(() => {
    const loadDzikirData = async () => {
      try {
        const response = await fetch("/data/dzikir.json");
        const data = await response.json();
        setDzikirList(data);
      } catch (error) {
        console.error("Error loading dzikir data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDzikirData();
  }, []);

  // Load counters from localStorage
  useEffect(() => {
    const savedCounters = localStorage.getItem("dzikirCounters");
    if (savedCounters) {
      setCounters(JSON.parse(savedCounters));
    }
  }, []);

  // Save counters to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(counters).length > 0) {
      localStorage.setItem("dzikirCounters", JSON.stringify(counters));
    }
  }, [counters]);

  const currentDzikir = dzikirList[currentIndex];
  const currentCount = counters[currentDzikir?.nomor_doa] || 0;

  const handleIncrement = () => {
    if (!currentDzikir) return;

    setCounters((prev) => ({
      ...prev,
      [currentDzikir.nomor_doa]: (prev[currentDzikir.nomor_doa] || 0) + 1,
    }));
  };

  const handleReset = () => {
    if (!currentDzikir) return;

    setCounters((prev) => ({
      ...prev,
      [currentDzikir.nomor_doa]: 0,
    }));
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : dzikirList.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < dzikirList.length - 1 ? prev + 1 : 0));
  };

  if (loading) return <LoadingIndicator />;

  return (
    <Layout showBanner={false}>
      <div className="min-h-screen bg-linear-to-br from-gray-50 via-emerald-50/30 to-green-50/50">
        {/* Header Section */}
        <div className="text-center py-6 px-5">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="w-11 h-11 bg-linear-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
              <FontAwesomeIcon icon={faMosque} className="text-white text-lg" />
            </div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              Dzikir Setelah Shalat
            </h1>
          </div>
          <p className="text-gray-600 text-sm">
            Dzikir dan doa setelah shalat fardhu
          </p>

          {/* Islamic decorative line */}
          <div className="flex items-center justify-center space-x-2 mt-4">
            <div className="w-8 h-0.5 bg-linear-to-r from-transparent via-purple-400 to-purple-300"></div>
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full shadow-sm"></div>
            <div className="w-4 h-0.5 bg-purple-300"></div>
            <div className="w-1 h-1 bg-pink-400 rounded-full shadow-sm"></div>
            <div className="w-4 h-0.5 bg-purple-300"></div>
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full shadow-sm"></div>
            <div className="w-8 h-0.5 bg-linear-to-l from-transparent via-purple-400 to-purple-300"></div>
          </div>
        </div>

        {/* Main Dzikir Card */}
        {currentDzikir && (
          <div className="px-4 pb-24 max-w-3xl mx-auto">
            <div className="space-y-4">
              {/* Tasbih Counter Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-100 shadow-md overflow-hidden">
                {/* Navigation Header */}
                <div className="bg-linear-to-r from-purple-500 to-pink-600 px-5 py-3.5">
                  <div className="flex items-center justify-between text-white">
                    <button
                      onClick={handlePrevious}
                      className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 flex items-center justify-center active:scale-95"
                    >
                      <FontAwesomeIcon
                        icon={faChevronLeft}
                        className="text-sm"
                      />
                    </button>

                    <div className="text-center">
                      <div className="text-xs opacity-90 mb-0.5">Dzikir</div>
                      <div className="text-lg font-bold">
                        {convertToArabicNumerals(currentIndex + 1)} /{" "}
                        {convertToArabicNumerals(dzikirList.length)}
                      </div>
                    </div>

                    <button
                      onClick={handleNext}
                      className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 flex items-center justify-center active:scale-95"
                    >
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="text-sm"
                      />
                    </button>
                  </div>
                </div>

                {/* Counter Display - Like Tasbih */}
                <div className="p-6">
                  <div className="text-center mb-5">
                    <div className="inline-block bg-linear-to-r from-purple-500/20 to-pink-500/20 rounded-full px-4 py-1.5 border border-purple-300/50">
                      <span className="text-purple-700 font-semibold text-sm">
                        Dzikir ke-
                        {convertToArabicNumerals(currentDzikir.nomor_doa)}
                      </span>
                    </div>
                  </div>

                  {/* Arabic Text */}
                  <div className="bg-linear-to-br from-purple-50/50 via-pink-50/30 to-purple-50/50 rounded-xl p-5 border border-purple-100/50 mb-5">
                    <p className="text-right text-2xl md:text-3xl text-gray-800 font-arabic leading-loose">
                      {currentDzikir.text_arab}
                    </p>
                  </div>

                  {/* Big Circle Counter - Tasbih Style */}
                  <div className="relative mb-6">
                    <div className="w-56 h-56 sm:w-64 sm:h-64 mx-auto">
                      {/* Outer Ring */}
                      <div className="absolute inset-0 rounded-full bg-linear-to-br from-purple-100 to-pink-100 shadow-inner"></div>

                      {/* Inner Circle */}
                      <div className="absolute inset-3 rounded-full bg-linear-to-br from-white to-purple-50 shadow-lg flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-6xl sm:text-7xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                            {currentCount}
                          </div>
                        </div>
                      </div>

                      {/* Decorative dots */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-purple-500 rounded-full"></div>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 bg-pink-500 rounded-full"></div>
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-purple-400 rounded-full"></div>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2.5 h-2.5 bg-pink-400 rounded-full"></div>
                    </div>
                  </div>

                  {/* Action Buttons - Centered */}
                  <div className="flex items-center justify-center gap-4">
                    {/* Big Tap Button */}
                    <button
                      onClick={handleIncrement}
                      className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-linear-to-br from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold text-4xl sm:text-5xl shadow-lg hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 active:scale-95 flex items-center justify-center"
                    >
                      +
                    </button>

                    {/* Reset Button */}
                    <button
                      onClick={handleReset}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border-2 border-red-300 hover:bg-red-50 hover:border-red-400 text-red-600 shadow-sm hover:shadow-md transition-all duration-300 active:scale-95 flex items-center justify-center"
                      title="Reset"
                    >
                      <FontAwesomeIcon
                        icon={faRotateLeft}
                        className="text-lg"
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Translation */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-purple-100/50 shadow-sm">
                <div className="flex items-start space-x-3">
                  <div className="text-lg shrink-0 mt-0.5">📖</div>
                  <div className="flex-1">
                    <h4 className="text-purple-800 font-semibold text-sm mb-2">
                      Terjemahan
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed italic">
                      "{currentDzikir.terjemah}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Keutamaan */}
              <div className="bg-linear-to-r from-amber-50/50 to-yellow-50/50 rounded-xl p-4 border border-amber-200/50 shadow-sm">
                <div className="flex items-start space-x-3">
                  <div className="text-lg shrink-0 mt-0.5">✨</div>
                  <div className="flex-1">
                    <h4 className="text-amber-800 font-semibold text-sm mb-2">
                      Keutamaan & Dalil
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {currentDzikir.keutamaan}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
