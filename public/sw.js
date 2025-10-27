/* eslint-disable no-restricted-globals */

// Workbox manifest injection point - DO NOT REMOVE
// This will be replaced by Workbox during build
const precacheManifest = self.__WB_MANIFEST || [];

// Service Worker version - will be replaced during build
const CACHE_VERSION = "buku-doa-v1.0.0-dev";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const API_CACHE = `${CACHE_VERSION}-api`;

// Version checking
let currentVersion = CACHE_VERSION;

// Check for updates every 6 hours
const UPDATE_CHECK_INTERVAL = 6 * 60 * 60 * 1000;
let lastUpdateCheck = 0;

// Files to cache immediately (in addition to precacheManifest)
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/favicon/android-chrome-192x192.png",
  "/favicon/android-chrome-512x512.png",
  "/favicon/apple-touch-icon.png",
  "/favicon/favicon.ico",
];

// API endpoints to cache
const API_ENDPOINTS = ["/data/dzikir.json", "/data/doarutin.json"];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing version:", CACHE_VERSION);
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        console.log("[Service Worker] Caching static assets");
        // Combine Workbox precache manifest with our static assets
        const allAssets = [
          ...STATIC_ASSETS.map((url) => new Request(url, { cache: "reload" })),
          ...precacheManifest.map((entry) =>
            typeof entry === "string" ? entry : entry.url
          ),
        ];
        return cache.addAll(allAssets);
      })
      .catch((err) => {
        console.log("[Service Worker] Cache failed:", err);
      })
  );
  // Force activate immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activating version:", CACHE_VERSION);
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Delete all caches that don't match current version
            if (
              cacheName.startsWith("buku-doa-") &&
              cacheName !== STATIC_CACHE &&
              cacheName !== DYNAMIC_CACHE &&
              cacheName !== API_CACHE
            ) {
              console.log("[Service Worker] Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log("[Service Worker] Version", CACHE_VERSION, "is now active");
      })
  );
  // Take control of all pages immediately
  return self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    // For external APIs, try network first
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful API responses
          if (request.method === "GET" && response.status === 200) {
            const responseClone = response.clone();
            caches.open(API_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache if network fails
          return caches.match(request);
        })
    );
    return;
  }

  // For static assets and pages
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      // Not in cache, fetch from network
      return fetch(request)
        .then((response) => {
          // Don't cache if not successful
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Cache the fetched resource
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseToCache);
          });

          return response;
        })
        .catch((error) => {
          console.log("[Service Worker] Fetch failed:", error);

          // Return offline page if available
          if (request.destination === "document") {
            return caches.match("/index.html");
          }
        });
    })
  );
});

// Handle messages from clients
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }

  if (event.data && event.data.type === "GET_VERSION") {
    event.ports[0].postMessage({
      version: CACHE_VERSION,
    });
  }
});

// Check for new version
async function checkForUpdate() {
  try {
    const response = await fetch("/version.json", { cache: "no-store" });
    if (response.ok) {
      const data = await response.json();
      if (data.version !== currentVersion) {
        console.log("[Service Worker] New version available:", data.version);
        // Notify all clients about update
        const clients = await self.clients.matchAll();
        clients.forEach((client) => {
          client.postMessage({
            type: "UPDATE_AVAILABLE",
            version: data.version,
          });
        });
        currentVersion = data.version;
      }
    }
  } catch (error) {
    console.log("[Service Worker] Version check failed:", error);
  }
  lastUpdateCheck = Date.now();
}

// Periodic version check
setInterval(() => {
  if (Date.now() - lastUpdateCheck > UPDATE_CHECK_INTERVAL) {
    checkForUpdate();
  }
}, UPDATE_CHECK_INTERVAL);

// Background sync for offline actions
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-data") {
    event.waitUntil(syncData());
  }
});

async function syncData() {
  // Implement data sync logic here
  console.log("[Service Worker] Syncing data...");
}

// Push notification handler
self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "Waktu sholat telah tiba",
    icon: "/favicon/android-chrome-192x192.png",
    badge: "/favicon/android-chrome-192x192.png",
    vibrate: [200, 100, 200],
  };

  event.waitUntil(
    self.registration.showNotification("Buku Doa Kecil", options)
  );
});

// Notification click handler
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(self.clients.openWindow("/"));
});
