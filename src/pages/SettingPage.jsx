import Layout from "../components/Layout/Layout";
import Tab from "../components/Tab";
import SettingTampilan from "../components/SettingTampilan";
import SettingQori from "../components/SettingQori";
import SettingLokasi from "../components/SettingLokasi";
import Tentang from "../components/Tentang";
import AppVersion from "../components/AppVersion";
import { scrollToTop } from "../utils/scrollUtils";
import { useEffect } from "react";
import useTitle from "../hooks/useTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

export default function SettingPage() {
  useEffect(() => scrollToTop(), []);
  useTitle("Pengaturan");

  return (
    <Layout>
      <div className="px-6 py-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
              <FontAwesomeIcon icon={faCog} className="text-white text-lg" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
              Pengaturan
            </h1>
          </div>
          <p className="text-gray-600 text-sm">
            Sesuaikan aplikasi sesuai preferensi Anda
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

        {/* Settings Content */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-emerald-100 shadow-lg overflow-hidden">
          <Tab
            structure={[
              { title: "Aplikasi", body: <SettingTampilan /> },
              { title: "Qori", body: <SettingQori /> },
              { title: "Lokasi", body: <SettingLokasi /> },
              { title: "Tentang", body: <Tentang /> },
            ]}
          />
        </div>

        {/* App Version */}
        <AppVersion />
      </div>
    </Layout>
  );
}
