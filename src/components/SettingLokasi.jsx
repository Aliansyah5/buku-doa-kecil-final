import { useEffect, useState, useContext } from "react";
import { appContext } from "../context/app-context";
import LoadingIndicator from "./LoadingIndicator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faSearch,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function SettingLokasi() {
  // This component is for setting the city location for prayer times.
  const [listKota, setListKota] = useState([]);
  const [keyword, setKeyword] = useState("");
  const { settings, handleSaveSettings, closeModal } = useContext(appContext);

  useEffect(() => {
    async function getListKota() {
      const request = await fetch(
        "https://api.myquran.com/v2/sholat/kota/semua"
      );
      const response = await request.json();
      if (!request.ok) {
        console.error("Error fetching city list:", response);
      }

      setListKota(response.data);
    }

    getListKota();
  }, []);

  const listKotaSorted = keyword
    ? listKota.filter((item) =>
        item.lokasi
          .replace(/[^a-zA-Z0-9 ]/g, "")
          .toLowerCase()
          .includes(keyword.replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase())
      )
    : listKota;

  const handleLocationChange = (locationId) => {
    handleSaveSettings({ ...settings, lokasi: locationId });
    // Auto close modal after selection
    setTimeout(() => {
      closeModal();
    }, 300);
  };

  if (listKota.length === 0) return <LoadingIndicator />;

  return (
    <div className="max-w-2xl mx-auto p-5">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-linear-to-br from-emerald-500 to-green-600 rounded-2xl mb-3 shadow-lg">
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            className="text-white text-xl"
          />
        </div>
        <h2 className="text-2xl font-bold bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-2">
          Pilih Lokasi Kota
        </h2>
        <p className="text-gray-600 text-sm">
          Pilih kota Anda untuk menampilkan jadwal sholat yang sesuai
        </p>
      </div>

      {/* Current Location */}
      {settings.lokasi && (
        <div className="bg-linear-to-br from-emerald-50 to-green-50 rounded-xl p-4 mb-5 border border-emerald-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center shrink-0">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-white text-lg"
              />
            </div>
            <div>
              <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wide">
                Lokasi Saat Ini
              </p>
              <p className="text-gray-800 font-bold">
                {listKota.find((item) => item.id === settings.lokasi)?.lokasi}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Search Input */}
      <div className="mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FontAwesomeIcon
              icon={faSearch}
              className="text-gray-400 text-sm"
            />
          </div>
          <input
            type="search"
            name="kota"
            id="kota"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-gray-700 placeholder-gray-400 shadow-sm transition-all duration-200"
            placeholder="Cari nama kota..."
            autoComplete="off"
          />
        </div>
      </div>

      {/* City List */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm max-h-96 overflow-y-auto">
        {listKotaSorted.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {listKotaSorted.map((item, index) => {
              const isSelected = settings.lokasi === item.id;
              return (
                <label
                  key={item.id}
                  htmlFor={item.id}
                  className={`flex items-center justify-between p-4 cursor-pointer transition-all duration-200 hover:bg-emerald-50 group ${
                    isSelected ? "bg-emerald-50/70" : ""
                  } ${index === 0 ? "rounded-t-xl" : ""} ${
                    index === listKotaSorted.length - 1 ? "rounded-b-xl" : ""
                  }`}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        isSelected
                          ? "border-emerald-500 bg-emerald-500"
                          : "border-gray-300 group-hover:border-emerald-400"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        className={`text-sm ${
                          isSelected
                            ? "text-emerald-600"
                            : "text-gray-400 group-hover:text-emerald-500"
                        } transition-colors duration-200`}
                      />
                      <span
                        className={`text-sm font-medium ${
                          isSelected
                            ? "text-emerald-700"
                            : "text-gray-700 group-hover:text-emerald-600"
                        } transition-colors duration-200`}
                      >
                        {item.lokasi}
                      </span>
                    </div>
                  </div>
                  <input
                    name="kota"
                    id={item.id}
                    type="radio"
                    value={item.id}
                    checked={isSelected}
                    onChange={() => handleLocationChange(item.id)}
                    className="sr-only"
                  />
                </label>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FontAwesomeIcon
                icon={faSearch}
                className="text-gray-400 text-xl"
              />
            </div>
            <p className="text-gray-500 text-sm">
              Tidak ada kota yang ditemukan
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Coba kata kunci yang berbeda
            </p>
          </div>
        )}
      </div>

      {/* Info Footer */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-xs text-blue-600 text-center">
          💡 Pilihan akan tersimpan otomatis dan langsung diterapkan
        </p>
      </div>
    </div>
  );
}
