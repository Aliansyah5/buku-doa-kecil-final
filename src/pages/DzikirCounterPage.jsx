import { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandsPraying,
  faRotateLeft,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import useTitle from "../hooks/useTitle";

export default function DzikirCounterPage() {
  const [counter, setCounter] = useState(0);

  useTitle("Dzikir Counter");

  // Load counter from localStorage
  useEffect(() => {
    const savedCounter = localStorage.getItem("dzikirCounter");
    if (savedCounter) {
      setCounter(parseInt(savedCounter, 10));
    }
  }, []);

  // Save counter to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("dzikirCounter", counter.toString());
  }, [counter]);

  const handleIncrement = () => {
    setCounter((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (counter > 0) {
      setCounter((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCounter(0);
  };

  return (
    <Layout showBanner={false}>
      <div className="min-h-screen bg-linear-to-br from-gray-50 via-indigo-50/30 to-blue-50/50">
        {/* Header Section */}
        <div className="text-center py-6 px-5">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="w-11 h-11 bg-linear-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
              <FontAwesomeIcon
                icon={faHandsPraying}
                className="text-white text-lg"
              />
            </div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent leading-tight">
              Dzikir Counter
            </h1>
          </div>
          <p className="text-gray-600 text-sm">Penghitung dzikir digital</p>

          {/* Islamic decorative line */}
          <div className="flex items-center justify-center space-x-2 mt-4">
            <div className="w-8 h-0.5 bg-linear-to-r from-transparent via-indigo-400 to-indigo-300"></div>
            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full shadow-sm"></div>
            <div className="w-4 h-0.5 bg-indigo-300"></div>
            <div className="w-1 h-1 bg-blue-400 rounded-full shadow-sm"></div>
            <div className="w-4 h-0.5 bg-indigo-300"></div>
            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full shadow-sm"></div>
            <div className="w-8 h-0.5 bg-linear-to-l from-transparent via-indigo-400 to-indigo-300"></div>
          </div>
        </div>

        {/* Main Counter Card */}
        <div className="px-4 pb-24 max-w-3xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-indigo-100 shadow-md overflow-hidden">
            {/* Counter Display */}
            <div className="p-8">
              {/* Big Circle Counter */}
              <div className="relative mb-8">
                <div className="w-64 h-64 sm:w-80 sm:h-80 mx-auto">
                  {/* Outer Ring */}
                  <div className="absolute inset-0 rounded-full bg-linear-to-br from-indigo-100 to-blue-100 shadow-inner"></div>

                  {/* Middle Ring */}
                  <div className="absolute inset-2 rounded-full bg-linear-to-br from-indigo-50 to-blue-50"></div>

                  {/* Inner Circle */}
                  <div className="absolute inset-4 rounded-full bg-linear-to-br from-white to-indigo-50 shadow-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-7xl sm:text-8xl font-bold bg-linear-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-2 leading-none">
                        {counter}
                      </div>
                      <div className="text-sm text-gray-500 mt-3">
                        hitungan dzikir
                      </div>
                    </div>
                  </div>

                  {/* Decorative dots */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-indigo-500 rounded-full shadow-md"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full shadow-md"></div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-indigo-400 rounded-full shadow-md"></div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-blue-400 rounded-full shadow-md"></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-4 mb-6">
                {/* Decrement Button */}
                <button
                  onClick={handleDecrement}
                  disabled={counter === 0}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 text-2xl shadow-sm hover:shadow-md transition-all duration-300 active:scale-95 flex items-center justify-center ${
                    counter === 0
                      ? "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
                      : "bg-white border-indigo-300 hover:bg-indigo-50 hover:border-indigo-400 text-indigo-600"
                  }`}
                  title="Kurangi"
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>

                {/* Big Tap Button - Increment */}
                <button
                  onClick={handleIncrement}
                  className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-linear-to-br from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-bold text-5xl sm:text-6xl shadow-lg hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 active:scale-95 flex items-center justify-center"
                >
                  +
                </button>

                {/* Reset Button */}
                <button
                  onClick={handleReset}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border-2 border-red-300 hover:bg-red-50 hover:border-red-400 text-red-600 shadow-sm hover:shadow-md transition-all duration-300 active:scale-95 flex items-center justify-center"
                  title="Reset"
                >
                  <FontAwesomeIcon icon={faRotateLeft} className="text-xl" />
                </button>
              </div>

              {/* Quick Counter Buttons */}
              <div className="border-t border-indigo-100 pt-6">
                <p className="text-center text-xs text-gray-600 mb-3">
                  Tambah cepat:
                </p>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  {[33, 11, 10, 3].map((num) => (
                    <button
                      key={num}
                      onClick={() => setCounter((prev) => prev + num)}
                      className="px-4 py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 hover:border-indigo-300 text-indigo-700 font-semibold text-sm transition-all duration-300 active:scale-95"
                    >
                      +{num}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Info Card */}
          <div className="mt-6 bg-linear-to-r from-amber-50/50 to-yellow-50/50 rounded-xl p-4 border border-amber-200/50 shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="text-lg shrink-0 mt-0.5">💡</div>
              <div className="flex-1">
                <h4 className="text-amber-800 font-semibold text-sm mb-2">
                  Tips Penggunaan
                </h4>
                <ul className="text-gray-700 text-sm leading-relaxed space-y-1">
                  <li>
                    • Tekan tombol <strong>+</strong> besar untuk menambah
                    hitungan
                  </li>
                  <li>
                    • Gunakan tombol <strong>+33</strong>, <strong>+11</strong>,
                    dll untuk tambah cepat
                  </li>
                  <li>
                    • Tekan <strong>-</strong> untuk mengurangi jika salah
                    hitung
                  </li>
                  <li>
                    • Tekan <strong>reset</strong> untuk memulai dari awal
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
