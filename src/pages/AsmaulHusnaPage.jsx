import { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import LoadingIndicator from "../components/LoadingIndicator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingHeart } from "@fortawesome/free-solid-svg-icons";
import useTitle from "../hooks/useTitle";
import { convertToArabicNumerals } from "../utils/arabicNumbers";

export default function AsmaulHusnaPage() {
  const [asmaulHusna, setAsmaulHusna] = useState([]);
  const [loading, setLoading] = useState(true);

  useTitle("Asmaul Husna - 99 Nama Allah");

  // Load asmaul husna data
  useEffect(() => {
    const loadAsmaulHusnaData = async () => {
      try {
        const response = await fetch("/data/asmaulhusna.json");
        const data = await response.json();
        setAsmaulHusna(data);
      } catch (error) {
        console.error("Error loading asmaul husna data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAsmaulHusnaData();
  }, []);

  if (loading) return <LoadingIndicator />;

  // Split names into groups of 4 (no reverse - keep correct order)
  const groupedNames = [];
  for (let i = 0; i < asmaulHusna.length; i += 4) {
    const group = asmaulHusna.slice(i, i + 4);
    groupedNames.push(group);
  }

  return (
    <Layout showBanner={false}>
      <div className="min-h-screen bg-linear-to-br from-gray-50 via-teal-50/30 to-cyan-50/50">
        {/* Header Section */}
        <div className="text-center py-6 px-5">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="w-11 h-11 bg-linear-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md">
              <FontAwesomeIcon
                icon={faHandHoldingHeart}
                className="text-white text-lg"
              />
            </div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
              Asmaul Husna
            </h1>
          </div>
          <p className="text-gray-600 text-sm">99 Nama Allah Yang Maha Indah</p>

          {/* Islamic decorative line */}
          <div className="flex items-center justify-center space-x-2 mt-4">
            <div className="w-8 h-0.5 bg-linear-to-r from-transparent via-teal-400 to-teal-300"></div>
            <div className="w-1.5 h-1.5 bg-teal-400 rounded-full shadow-sm"></div>
            <div className="w-4 h-0.5 bg-teal-300"></div>
            <div className="w-1 h-1 bg-cyan-400 rounded-full shadow-sm"></div>
            <div className="w-4 h-0.5 bg-teal-300"></div>
            <div className="w-1.5 h-1.5 bg-teal-400 rounded-full shadow-sm"></div>
            <div className="w-8 h-0.5 bg-linear-to-l from-transparent via-teal-400 to-teal-300"></div>
          </div>
        </div>

        {/* Opening Verse */}
        <div className="px-4 mb-6 max-w-3xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-teal-100 shadow-md p-5">
            <div className="bg-linear-to-br from-teal-50/50 via-cyan-50/30 to-teal-50/50 rounded-xl p-5 border border-teal-100/50">
              <p className="text-right text-2xl md:text-3xl text-gray-800 font-arabic leading-loose mb-3">
                يَا أَللَّهُ ٱلَّذِي لَآ إِلَٰهَ إِلَّآ أَنتَ
              </p>
              <p className="text-center text-gray-700 text-sm italic">
                "Ya Allah yang tiada Tuhan selain Engkau"
              </p>
            </div>
          </div>
        </div>

        {/* Names Grid */}
        <div className="px-4 pb-24 max-w-6xl mx-auto">
          <div className="space-y-4">
            {groupedNames.map((group, groupIndex) => (
              <div
                key={groupIndex}
                className="grid grid-cols-2 md:grid-cols-4 gap-3"
              >
                {group.map((name) => (
                  <div
                    key={name.urutan}
                    className="bg-white/80 backdrop-blur-sm rounded-xl border border-teal-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                  >
                    {/* Number Badge */}
                    <div className="bg-linear-to-r from-teal-500 to-cyan-600 px-3 py-1.5 flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">
                        {convertToArabicNumerals(name.urutan)}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-4 text-center">
                      {/* Arabic Name */}
                      <div className="mb-3">
                        <p className="text-2xl md:text-3xl text-gray-800 font-arabic leading-relaxed">
                          يَا {name.arab}
                        </p>
                      </div>

                      {/* Latin Name */}
                      <div className="mb-2">
                        <p className="text-sm font-semibold text-teal-700">
                          {name.latin}
                        </p>
                      </div>

                      {/* Meaning */}
                      <div className="border-t border-teal-100 pt-2">
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {name.arti}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Info Card at Bottom */}
          <div className="mt-6 bg-linear-to-r from-amber-50/50 to-yellow-50/50 rounded-xl p-4 border border-amber-200/50 shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="text-lg shrink-0 mt-0.5">✨</div>
              <div className="flex-1">
                <h4 className="text-amber-800 font-semibold text-sm mb-2">
                  Keutamaan Membaca Asmaul Husna
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Rasulullah ﷺ bersabda: "Sesungguhnya Allah mempunyai sembilan
                  puluh sembilan nama, seratus kurang satu. Barang siapa yang
                  menghafalnya, niscaya masuk surga." (HR. Bukhari dan Muslim)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
