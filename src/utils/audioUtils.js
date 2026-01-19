/**
 * Audio utility functions for handling Qur'an audio playback
 */

/**
 * Play audio URL directly in audio element
 * Uses blob URL as fallback for CORS issues
 */
export async function playAudioDirect(audioElement, audioUrl) {
  if (!audioElement || !audioUrl) {
    console.warn("❌ Invalid audio element or URL");
    return false;
  }

  console.log("=== 🎵 playAudioDirect called ===");
  console.log("Original URL:", audioUrl.substring(0, 80) + "...");

  try {
    // Clean slate - pause and reset
    audioElement.pause();
    audioElement.currentTime = 0;
    audioElement.src = "";

    await new Promise((resolve) => setTimeout(resolve, 50));

    // Set the source
    audioElement.src = audioUrl;
    audioElement.volume = 1;
    audioElement.crossOrigin = "anonymous";

    console.log("📡 Audio element ready");

    // Try direct play
    try {
      const playPromise = audioElement.play();
      if (playPromise !== undefined) {
        await playPromise;
        console.log("✅ Audio playing!");
        return true;
      }
    } catch (playError) {
      console.warn("⚠️ Direct play failed:", playError.message);
      console.warn("Error name:", playError.name);

      // Try with CORS proxy services
      console.log("🔄 Trying CORS proxy methods...");

      // List of CORS proxies to try (local proxy first, then external services)
      const corsProxies = [
        // Local dev proxy via Vite
        (url) => url.replace("https://cdn.alquran.cloud", "/audio-proxy"),
        // cors-anywhere
        (url) => `https://cors-anywhere.herokuapp.com/${url}`,
        // allorigins
        (url) =>
          `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
        // thingproxy
        (url) => `https://thingproxy.freehostia.com/fetch/${url}`,
      ];

      let success = false;
      for (let i = 0; i < corsProxies.length && !success; i++) {
        try {
          const proxiedUrl = corsProxies[i](audioUrl);
          console.log(`📥 Attempt ${i + 1}: Trying CORS proxy...`);
          console.log(`   URL: ${proxiedUrl.substring(0, 80)}...`);

          const response = await fetch(proxiedUrl, {
            headers: {
              Accept: "audio/*",
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }

          const blob = await response.blob();
          const blobUrl = URL.createObjectURL(blob);
          console.log(
            `✅ Blob created via proxy ${i + 1}:`,
            blob.size,
            "bytes, type:",
            blob.type
          );

          audioElement.pause();
          audioElement.currentTime = 0;
          audioElement.src = blobUrl;
          audioElement.crossOrigin = "anonymous";

          const playPromise2 = audioElement.play();
          if (playPromise2 !== undefined) {
            await playPromise2;
          }

          console.log(`✅ Blob playback successful via proxy ${i + 1}!`);

          // Cleanup
          audioElement.addEventListener(
            "ended",
            () => {
              URL.revokeObjectURL(blobUrl);
              console.log("🧹 Blob URL cleaned up");
            },
            { once: true }
          );

          success = true;
          return true;
        } catch (proxyError) {
          console.warn(`⚠️ Proxy ${i + 1} failed:`, proxyError.message);
          // Continue to next proxy
        }
      }

      if (!success) {
        console.error("❌ All CORS proxy attempts failed");
        return false;
      }
    }
  } catch (error) {
    console.error("❌ Error in playAudioDirect:", error.message);
    return false;
  }
}

// CORS proxy options untuk fallback (deprecated, tapi tetap ada for reference)
const CORS_PROXIES = [
  (url) => url,
  (url) => `https://cors-anywhere.herokuapp.com/${url}`,
  (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
];

export async function playAudioWithRetry(
  audioElement,
  audioUrl,
  maxRetries = 3
) {
  if (!audioElement || !audioUrl) {
    console.warn("❌ Invalid audio element or URL");
    return false;
  }

  // Try multiple URL variations (original + CORS proxies)
  for (let proxyIndex = 0; proxyIndex < CORS_PROXIES.length; proxyIndex++) {
    const urlVariation = CORS_PROXIES[proxyIndex](audioUrl);
    console.log(
      `🔄 Trying URL variation ${proxyIndex + 1}: ${urlVariation.substring(
        0,
        80
      )}...`
    );

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(
          `🎵 Attempt ${attempt} with variation ${
            proxyIndex + 1
          }: Playing audio`
        );

        audioElement.src = urlVariation;
        audioElement.crossOrigin = "anonymous";
        audioElement.volume = 1;

        // Reset any previous errors
        audioElement.onerror = null;
        audioElement.onabort = null;

        // Wait for audio to load metadata with timeout
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error("Audio load timeout"));
          }, 8000);

          const onLoadedMetadata = () => {
            clearTimeout(timeout);
            audioElement.removeEventListener(
              "loadedmetadata",
              onLoadedMetadata
            );
            audioElement.removeEventListener("error", onError);
            resolve();
          };

          const onError = () => {
            clearTimeout(timeout);
            audioElement.removeEventListener(
              "loadedmetadata",
              onLoadedMetadata
            );
            const errorCode = audioElement.error?.code;
            const errorMsg = getErrorMessage(errorCode);
            reject(new Error(`Audio load error (${errorCode}): ${errorMsg}`));
          };

          audioElement.addEventListener("loadedmetadata", onLoadedMetadata, {
            once: true,
          });
          audioElement.addEventListener("error", onError, { once: true });
        });

        // Try to play
        const playPromise = audioElement.play();
        if (playPromise !== undefined) {
          await playPromise;
        }

        console.log("✅ Audio playing successfully!");
        return true;
      } catch (error) {
        console.error(
          `❌ Attempt ${attempt} (variation ${proxyIndex + 1}) failed:`,
          error.message
        );

        if (proxyIndex === CORS_PROXIES.length - 1 && attempt === maxRetries) {
          console.error("❌ All URL variations and retry attempts exhausted");
          continue;
        }

        await new Promise((resolve) => setTimeout(resolve, 300));
      }
    }
  }

  return false;
}

function getErrorMessage(errorCode) {
  const errorMap = {
    1: "MEDIA_ERR_ABORTED - Playback aborted",
    2: "MEDIA_ERR_NETWORK - Network error",
    3: "MEDIA_ERR_DECODE - Decoding error",
    4: "MEDIA_ERR_SRC_NOT_SUPPORTED - Source not supported",
  };
  return errorMap[errorCode] || "Unknown error";
}

export function stopAudio(audioElement) {
  if (audioElement) {
    try {
      audioElement.pause();
      audioElement.currentTime = 0;
      audioElement.src = "";
      audioElement.load();
    } catch (error) {
      console.error("Error stopping audio:", error);
    }
  }
}

export function getAudioUrl(ayahData, qoriId) {
  if (!ayahData?.audio) {
    console.warn("❌ No audio object in ayah data");
    return null;
  }

  const url = ayahData.audio[qoriId];

  if (!url) {
    console.warn(
      `❌ No audio URL for qori ${qoriId}. Available qori IDs:`,
      Object.keys(ayahData.audio)
    );
    return null;
  }

  return url;
}

/**
 * Convert CDN URL to local proxy URL for development
 * Only works in dev environment with Vite proxy configured
 */
export function getProxyUrlIfDev(audioUrl) {
  if (!audioUrl) return audioUrl;

  // Only use proxy in development
  if (import.meta.env.DEV) {
    // If it's a cdn.alquran.cloud URL, proxy it
    if (audioUrl.includes("cdn.alquran.cloud")) {
      const proxiedUrl = audioUrl.replace(
        "https://cdn.alquran.cloud",
        "/audio-proxy"
      );
      console.log("🔄 Using dev proxy for audio URL");
      console.log("   Original:", audioUrl.substring(0, 60));
      console.log("   Proxied:", proxiedUrl);
      return proxiedUrl;
    }
  }

  return audioUrl;
}

export function validateAudioUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Helper function to test audio URL loading without playing
export async function testAudioUrl(audioUrl) {
  return new Promise((resolve) => {
    const audio = new Audio();
    audio.crossOrigin = "anonymous";

    const timeout = setTimeout(() => {
      audio.src = "";
      resolve({ success: false, error: "Timeout" });
    }, 5000);

    audio.onloadedmetadata = () => {
      clearTimeout(timeout);
      audio.src = "";
      resolve({ success: true, duration: audio.duration });
    };

    audio.onerror = () => {
      clearTimeout(timeout);
      resolve({ success: false, error: getErrorMessage(audio.error?.code) });
    };

    audio.src = audioUrl;
  });
}
