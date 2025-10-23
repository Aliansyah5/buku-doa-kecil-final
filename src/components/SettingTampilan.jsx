import { useContext, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faTextHeight,
  faEye,
  faUser,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { ARABIC_FONT_SIZE } from "../constant/ARABIC_FONT_SIZE";
import Ayah from "./Ayah";
import Notification from "./Modal/Notification";

import { appContext } from "../context/app-context";

const sampleAyah = {
  nomorAyat: 1,
  teksArab: "اِذَا زُلْزِلَتِ الْاَرْضُ زِلْزَالَهَاۙ",
  teksLatin: "iżā zulzilatil-arḍu zilzālahā.",
  teksIndonesia: "Apabila bumi diguncangkan dengan guncangan yang dahsyat,",
  audio: {
    "01": "https://equran.nos.wjv-1.neo.id/audio-partial/Abdullah-Al-Juhany/099001.mp3",
    "02": "https://equran.nos.wjv-1.neo.id/audio-partial/Abdul-Muhsin-Al-Qasim/099001.mp3",
    "03": "https://equran.nos.wjv-1.neo.id/audio-partial/Abdurrahman-as-Sudais/099001.mp3",
    "04": "https://equran.nos.wjv-1.neo.id/audio-partial/Ibrahim-Al-Dossari/099001.mp3",
    "05": "https://equran.nos.wjv-1.neo.id/audio-partial/Misyari-Rasyid-Al-Afasi/099001.mp3",
  },
};

export default function SettingTampilan() {
  const { settings, handleSaveSettings, userNameApp, saveUsername, showModal } =
    useContext(appContext);

  const usernameRef = useRef();

  function handleSaveUsername() {
    const newUserName = usernameRef.current.value;
    if (!newUserName) return;
    saveUsername(newUserName);
    showModal(
      <Notification
        title="Username tersimpan!"
        message="Perubahan username berhasil disimpan."
      />,
      true
    );
  }

  return (
    <div className="font-poppins space-y-6">
      {/* Arabic Font Size Section */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-emerald-100 shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
              <FontAwesomeIcon icon={faTextHeight} className="text-white" />
            </div>
            <h2 className="text-lg font-bold text-white">Ukuran Teks Arab</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {Object.entries(ARABIC_FONT_SIZE).map(([key, value]) => {
            return (
              <div key={value} className="flex items-center space-x-3 group">
                <input
                  name="font-size"
                  onChange={() =>
                    handleSaveSettings({
                      ...settings,
                      interfaceSetting: {
                        ...settings.interfaceSetting,
                        arabicFontSize: key,
                      },
                    })
                  }
                  defaultChecked={
                    key === settings.interfaceSetting.arabicFontSize
                  }
                  id={key}
                  value={key}
                  type="radio"
                  className="w-5 h-5 text-emerald-600 bg-white border-2 border-emerald-300 focus:ring-emerald-500 focus:ring-2"
                />
                <label
                  htmlFor={key}
                  className="text-sm font-medium text-gray-700 capitalize cursor-pointer group-hover:text-emerald-700 transition-colors duration-300"
                >
                  {key}
                </label>
              </div>
            );
          })}
        </div>
      </div>

      {/* Display Settings Section */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-emerald-100 shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
              <FontAwesomeIcon icon={faEye} className="text-white" />
            </div>
            <h2 className="text-lg font-bold text-white">Tampilan</h2>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
            <label
              htmlFor="transliterasi"
              className="text-sm font-medium text-gray-700"
            >
              Tampilkan Transliterasi
            </label>
            <input
              id="transliterasi"
              type="checkbox"
              className="w-5 h-5 text-emerald-600 bg-white border-2 border-emerald-300 rounded focus:ring-emerald-500 focus:ring-2"
              onChange={(e) =>
                handleSaveSettings({
                  ...settings,
                  interfaceSetting: {
                    ...settings.interfaceSetting,
                    showTransliteration: e.target.checked,
                  },
                })
              }
              defaultChecked={settings.interfaceSetting.showTransliteration}
            />
          </div>
          <div className="flex justify-between items-center p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
            <label
              htmlFor="terjemahan"
              className="text-sm font-medium text-gray-700"
            >
              Tampilkan Terjemahan
            </label>
            <input
              id="terjemahan"
              type="checkbox"
              className="w-5 h-5 text-emerald-600 bg-white border-2 border-emerald-300 rounded focus:ring-emerald-500 focus:ring-2"
              onChange={(e) =>
                handleSaveSettings({
                  ...settings,
                  interfaceSetting: {
                    ...settings.interfaceSetting,
                    showTranslation: e.target.checked,
                  },
                })
              }
              defaultChecked={settings.interfaceSetting.showTranslation}
            />
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-emerald-100 shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
              <FontAwesomeIcon icon={faEye} className="text-white" />
            </div>
            <h2 className="text-lg font-bold text-white">Preview</h2>
          </div>
        </div>
        <div className="p-6">
          <Ayah {...settings.interfaceSetting} ayah={sampleAyah} />
        </div>
      </div>

      {/* Username Section */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-emerald-100 shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} className="text-white" />
            </div>
            <h2 className="text-lg font-bold text-white">Nama Pengguna</h2>
          </div>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-600 mb-4">
            Ubah nama pengguna Anda di sini
          </p>
          <div className="flex gap-3">
            <input
              className="flex-1 px-4 py-3 bg-white border border-emerald-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
              type="text"
              placeholder="Nama Pengguna"
              defaultValue={userNameApp}
              ref={usernameRef}
            />
            <button
              onClick={handleSaveUsername}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>

      {/* Last Read Section */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-emerald-100 shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
              <FontAwesomeIcon icon={faClock} className="text-white" />
            </div>
            <h2 className="text-lg font-bold text-white">Terakhir Dibaca</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <p className="text-sm text-gray-700 leading-relaxed">
              Secara <span className="font-semibold">default</span> fitur{" "}
              <em>Terakhir Dibaca</em> hanya menandai ayat jika Anda klik tombol{" "}
              <span className="inline-flex items-center space-x-1">
                <FontAwesomeIcon
                  icon={faBookOpen}
                  className="text-emerald-600"
                />
              </span>{" "}
              pada ayat yang diinginkan.
            </p>
          </div>

          <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
            <div className="flex justify-between items-start space-x-4">
              <div className="flex-1">
                <label
                  htmlFor="autoLastRead"
                  className="text-sm font-semibold text-gray-800 cursor-pointer"
                >
                  Selalu tandai "terakhir dibaca" di setiap membuka halaman
                  surat
                </label>
                <p className="text-xs text-gray-600 mt-1">
                  Jika diaktifkan, sistem akan mencatat setiap kali Anda membuka
                  halaman surat sebagai 'terakhir dibaca'
                </p>
              </div>
              <input
                id="autoLastRead"
                type="checkbox"
                className="w-5 h-5 text-emerald-600 bg-white border-2 border-emerald-300 rounded focus:ring-emerald-500 focus:ring-2 mt-1"
                onChange={(e) =>
                  handleSaveSettings({
                    ...settings,
                    autoLastReadOnVisitedSurah: e.target.checked,
                  })
                }
                defaultChecked={settings.autoLastReadOnVisitedSurah}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
