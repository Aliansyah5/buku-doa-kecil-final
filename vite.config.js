import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { VitePWA } from "vite-plugin-pwa";
import { visualizer } from "rollup-plugin-visualizer";
import { injectVersionPlugin } from "./vite-plugin-version.js";

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          router: ["react-router-dom"],
          datepicker: ["react-datepicker"],
        },
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    basicSsl(),
    visualizer({ open: true }),
    injectVersionPlugin(), // Inject version only on production build
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: null, // We handle registration manually in main.jsx
      strategies: "injectManifest",
      srcDir: "public",
      filename: "sw.js",
      manifest: false, // We use our own manifest.json
      injectManifest: {
        swSrc: "public/sw.js",
        swDest: "dist/sw.js",
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2,otf,ttf,json}"],
        globIgnores: ["**/node_modules/**/*", "sw.js", "workbox-*.js"],
      },
      devOptions: {
        enabled: true,
        type: "module",
      },
    }),
  ],
  server: {
    https: true,
    port: 5173,
    proxy: {
      "/audio-proxy": {
        target: "https://cdn.alquran.cloud",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/audio-proxy/, ""),
        secure: false,
        ws: false,
      },
    },
  },
});
