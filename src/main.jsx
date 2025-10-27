import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./fonts.css";
import "./index.css";

import App from "./App.jsx";

// Register Service Worker for PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);

        // Listen for updates from service worker
        navigator.serviceWorker.addEventListener("message", (event) => {
          if (event.data && event.data.type === "UPDATE_AVAILABLE") {
            console.log("New version available:", event.data.version);

            // Show update notification
            if (
              confirm(
                "🎉 Versi baru tersedia!\n\nUpdate aplikasi sekarang untuk mendapatkan fitur terbaru?"
              )
            ) {
              // Tell service worker to skip waiting
              registration.waiting?.postMessage({ type: "SKIP_WAITING" });
              window.location.reload();
            }
          }
        });

        // Check for updates on page load
        registration.update();

        // Check for updates every hour
        setInterval(() => {
          registration.update();
        }, 60 * 60 * 1000);

        // Handle service worker updates
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;

          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              // New service worker available
              console.log("New service worker installed and waiting");

              // Show subtle notification
              const updateBanner = document.createElement("div");
              updateBanner.innerHTML = `
                <div style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%); z-index: 9999; background: linear-gradient(135deg, #059669, #10b981); color: white; padding: 12px 24px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); font-family: system-ui; font-size: 14px; display: flex; align-items: center; gap: 12px; animation: slideDown 0.3s ease-out;">
                  <span>✨ Update tersedia!</span>
                  <button onclick="this.parentElement.remove(); location.reload();" style="background: white; color: #059669; border: none; padding: 6px 16px; border-radius: 8px; font-weight: 600; cursor: pointer;">Update</button>
                  <button onclick="this.parentElement.remove();" style="background: transparent; color: white; border: 1px solid white; padding: 6px 16px; border-radius: 8px; cursor: pointer;">Nanti</button>
                </div>
                <style>
                  @keyframes slideDown {
                    from { transform: translate(-50%, -100%); opacity: 0; }
                    to { transform: translate(-50%, 0); opacity: 1; }
                  }
                </style>
              `;
              document.body.appendChild(updateBanner);
            }
          });
        });
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });

  // Reload page when new service worker takes control
  let refreshing;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
