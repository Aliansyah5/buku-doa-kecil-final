import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show install prompt after 3 seconds
      setTimeout(() => {
        setShowInstallPrompt(true);
      }, 3000);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    console.log(`User response to the install prompt: ${outcome}`);

    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Remember dismissal for 7 days
    localStorage.setItem("installPromptDismissed", Date.now().toString());
  };

  // Check if already installed
  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setShowInstallPrompt(false);
    }

    // Check if dismissed recently (within 7 days)
    const dismissed = localStorage.getItem("installPromptDismissed");
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
      if (Date.now() - dismissedTime < sevenDaysInMs) {
        setShowInstallPrompt(false);
      }
    }
  }, []);

  if (!showInstallPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <div className="bg-white rounded-2xl shadow-2xl border border-emerald-200 overflow-hidden animate-slide-up">
        <div className="bg-linear-to-r from-emerald-500 to-green-500 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faDownload} className="text-white text-lg" />
            <h3 className="text-white font-bold text-sm">Install Aplikasi</h3>
          </div>
          <button
            onClick={handleDismiss}
            className="text-white hover:bg-white/20 rounded-full w-6 h-6 flex items-center justify-center transition-colors"
          >
            <FontAwesomeIcon icon={faTimes} className="text-sm" />
          </button>
        </div>
        <div className="p-4">
          <p className="text-gray-700 text-sm mb-4">
            Install aplikasi Buku Doa Kecil untuk akses lebih cepat dan bisa
            digunakan offline!
          </p>
          <button
            onClick={handleInstallClick}
            className="w-full py-2.5 bg-linear-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Install Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}
