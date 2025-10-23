import { useEffect, useState, useContext } from "react";
import { appContext } from "../context/app-context";
import Layout from "../components/Layout/Layout";

import LoadingIndicator from "../components/LoadingIndicator";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatGregorianDate, getHijriDate } from "../utils/dateUtils";
import { scrollToTop } from "../utils/scrollUtils";
import useTitle from "../hooks/useTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faChevronLeft,
  faChevronRight,
  faMapMarkerAlt,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function SholatPage() {
  const [requestData, setRequestData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { settings } = useContext(appContext);

  useTitle("Jadwal Sholat");

  function formatDateAPI(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  function changeDate(days) {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  }

  const prayerNames = {
    imsak: "Imsak",
    subuh: "Subuh",
    terbit: "Terbit",
    dhuha: "Dhuha",
    dzuhur: "Dzuhur",
    ashar: "Ashar",
    maghrib: "Maghrib",
    isya: "Isya",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.myquran.com/v2/sholat/jadwal/${
            settings.lokasi
          }/${formatDateAPI(selectedDate)}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setRequestData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    scrollToTop();
  }, [settings.lokasi, selectedDate]);

  if (!requestData) return <LoadingIndicator />;

  return (
    <Layout>
      <div className="px-6 py-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
              <FontAwesomeIcon icon={faClock} className="text-white text-lg" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
              Jadwal Sholat
            </h1>
          </div>
          <p className="text-gray-600 text-sm">
            Waktu sholat untuk wilayah Anda
          </p>

          {/* Islamic decorative line */}
          <div className="flex items-center justify-center space-x-2 mt-4">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-emerald-300"></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <div className="w-4 h-0.5 bg-emerald-300"></div>
            <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
            <div className="w-4 h-0.5 bg-emerald-300"></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-emerald-300"></div>
          </div>
        </div>

        {/* Location & Date Info */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-emerald-100 shadow-lg mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="text-emerald-600"
              />
              <h2 className="text-xl font-bold text-gray-800">
                {requestData.data.lokasi}
              </h2>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              {requestData.data.daerah}
            </p>
            <div className="space-y-1">
              <p className="text-gray-800 font-medium">
                {formatGregorianDate(selectedDate)}
              </p>
              <p className="text-emerald-600 text-sm font-medium">
                {getHijriDate(selectedDate)}
              </p>
            </div>
          </div>
        </div>

        {/* Date Navigation */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <button
            onClick={() => changeDate(-1)}
            className="w-12 h-12 bg-white/70 backdrop-blur-sm border border-emerald-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center group"
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-gray-600 group-hover:text-emerald-600 transition-colors duration-300"
            />
          </button>

          <div className="relative">
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd-MM-yyyy"
              className="pl-10 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-emerald-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-center text-gray-700 shadow-lg"
              calendarStartDay={1}
            />
          </div>

          <button
            onClick={() => changeDate(1)}
            className="w-12 h-12 bg-white/70 backdrop-blur-sm border border-emerald-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center group"
          >
            <FontAwesomeIcon
              icon={faChevronRight}
              className="text-gray-600 group-hover:text-emerald-600 transition-colors duration-300"
            />
          </button>
        </div>

        {/* Prayer Times */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-emerald-100 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-green-500 p-4">
            <h3 className="text-white font-bold text-center text-lg">
              Waktu Sholat Hari Ini
            </h3>
          </div>

          <div className="p-4 space-y-3">
            {Object.entries(requestData.data.jadwal).map(([key, value]) => {
              if (["tanggal", "date"].includes(key)) return null;

              const prayerName = prayerNames[key] || key;

              return (
                <div
                  key={key}
                  className="group relative bg-gradient-to-r from-emerald-50/50 to-green-50/50 backdrop-blur-sm rounded-2xl p-4 border border-emerald-100/50 hover:shadow-lg transition-all duration-300"
                >
                  {/* Islamic corner decorations */}
                  <div className="absolute top-2 left-2 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                    <div className="w-2 h-2 border-l border-t border-emerald-400 rounded-tl-lg"></div>
                  </div>
                  <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                    <div className="w-2 h-2 border-r border-t border-emerald-400 rounded-tr-lg"></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 font-medium">
                      {prayerName}
                    </span>
                    <span className="text-emerald-700 font-bold text-lg">
                      {value}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
