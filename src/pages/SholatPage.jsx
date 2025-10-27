import { useEffect, useState, useContext } from "react";
import { appContext } from "../context/app-context";
import Layout from "../components/Layout/Layout";

import LoadingIndicator from "../components/LoadingIndicator";
import SettingLokasi from "../components/SettingLokasi";
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
  faCog,
} from "@fortawesome/free-solid-svg-icons";

export default function SholatPage() {
  const [requestData, setRequestData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { settings, showModal } = useContext(appContext);

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
      <div className="px-5 py-6 max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="w-11 h-11 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
              <FontAwesomeIcon icon={faClock} className="text-white text-lg" />
            </div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
              Jadwal Sholat
            </h1>
          </div>
          <p className="text-gray-600 text-sm">
            Waktu sholat untuk wilayah Anda
          </p>

          {/* Islamic decorative line */}
          <div className="flex items-center justify-center space-x-2 mt-4">
            <div className="w-8 h-0.5 bg-linear-to-r from-transparent via-blue-400 to-blue-300"></div>
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full shadow-sm"></div>
            <div className="w-4 h-0.5 bg-blue-300"></div>
            <div className="w-1 h-1 bg-indigo-400 rounded-full shadow-sm"></div>
            <div className="w-4 h-0.5 bg-blue-300"></div>
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full shadow-sm"></div>
            <div className="w-8 h-0.5 bg-linear-to-l from-transparent via-blue-400 to-blue-300"></div>
          </div>
        </div>

        {/* Location & Date Info */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-blue-100 shadow-md mb-5">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="text-blue-600 text-sm"
              />
              <h2 className="text-lg font-bold text-gray-800">
                {requestData.data.lokasi}
              </h2>
              <button
                onClick={() => showModal(<SettingLokasi />)}
                className="ml-2 w-8 h-8 bg-blue-100 hover:bg-blue-200 rounded-lg flex items-center justify-center transition-colors duration-300 group"
                title="Ubah Lokasi"
              >
                <FontAwesomeIcon
                  icon={faCog}
                  className="text-blue-600 text-sm group-hover:rotate-90 transition-transform duration-300"
                />
              </button>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              {requestData.data.daerah}
            </p>
            <div className="space-y-1">
              <p className="text-gray-800 font-medium text-sm">
                {formatGregorianDate(selectedDate)}
              </p>
              <p className="text-blue-600 text-sm font-medium">
                {getHijriDate(selectedDate)}
              </p>
            </div>
          </div>
        </div>

        {/* Date Navigation */}
        <div className="flex items-center justify-center space-x-3 mb-5">
          <button
            onClick={() => changeDate(-1)}
            className="w-10 h-10 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center group"
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-gray-600 text-sm group-hover:text-blue-600 transition-colors duration-300"
            />
          </button>

          <div className="relative">
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm pointer-events-none z-10"
            />
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd-MM-yyyy"
              className="pl-10 pr-4 py-2.5 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-center text-gray-700 text-sm shadow-sm font-medium"
              calendarStartDay={1}
            />
          </div>

          <button
            onClick={() => changeDate(1)}
            className="w-10 h-10 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center group"
          >
            <FontAwesomeIcon
              icon={faChevronRight}
              className="text-gray-600 text-sm group-hover:text-blue-600 transition-colors duration-300"
            />
          </button>
        </div>

        {/* Prayer Times */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100 shadow-md overflow-hidden">
          <div className="bg-linear-to-r from-blue-500 to-indigo-600 p-4">
            <h3 className="text-white font-bold text-center">
              Waktu Sholat Hari Ini
            </h3>
          </div>

          <div className="p-4 space-y-2.5">
            {Object.entries(requestData.data.jadwal).map(([key, value]) => {
              if (["tanggal", "date"].includes(key)) return null;

              const prayerName = prayerNames[key] || key;

              return (
                <div
                  key={key}
                  className="group relative bg-linear-to-r from-blue-50/50 via-indigo-50/30 to-blue-50/50 backdrop-blur-sm rounded-xl p-3.5 border border-blue-100/50 hover:shadow-sm hover:border-blue-200 transition-all duration-300"
                >
                  {/* Islamic corner decorations */}
                  <div className="absolute top-1.5 left-1.5 opacity-15 group-hover:opacity-30 transition-opacity duration-300">
                    <div className="w-1.5 h-1.5 border-l border-t border-blue-400 rounded-tl"></div>
                  </div>
                  <div className="absolute top-1.5 right-1.5 opacity-15 group-hover:opacity-30 transition-opacity duration-300">
                    <div className="w-1.5 h-1.5 border-r border-t border-blue-400 rounded-tr"></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 font-medium text-sm">
                      {prayerName}
                    </span>
                    <span className="text-blue-700 font-bold text-base">
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
