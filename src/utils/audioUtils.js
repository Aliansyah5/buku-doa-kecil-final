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

  try {
    console.log(
      "🎵 Attempting direct playback from:",
      audioUrl.substring(0, 80) + "..."
    );

    // Method 1: Direct play (fastest)
    try {
      audioElement.pause();
      audioElement.currentTime = 0;
      audioElement.src = "";

      // Delay to ensure clean state
      await new Promise((resolve) => setTimeout(resolve, 50));

      audioElement.src = audioUrl;
      audioElement.volume = 1;

      console.log("📡 Audio element state:", {
        src: audioElement.src.substring(0, 80),
        readyState: audioElement.readyState,
        networkState: audioElement.networkState,
      });

      const playPromise = audioElement.play();
      if (playPromise !== undefined) {
        await playPromise;
        console.log("✅ Direct playback successful!");
        return true;
      }
    } catch (directError) {
      console.warn("⚠️ Direct playback failed:", directError.message);
      console.log("Trying blob URL method...");

      // Method 2: Blob URL (for CORS issues)
      try {
        const response = await fetch(audioUrl);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        console.log("✅ Blob created, size:", blob.size, "bytes");

        audioElement.pause();
        audioElement.currentTime = 0;
        audioElement.src = blobUrl;
        audioElement.volume = 1;

        const playPromise = audioElement.play();
        if (playPromise !== undefined) {
          await playPromise;
        }

        console.log("✅ Blob URL playback successful!");

        // Cleanup blob URL when done
        audioElement.addEventListener(
          "ended",
          () => {
            URL.revokeObjectURL(blobUrl);
          },
          { once: true }
        );

        return true;
      } catch (blobError) {
        console.error("❌ Blob URL method also failed:", blobError.message);
        return false;
      }
    }
  } catch (error) {
    console.error("❌ Unexpected error in playAudioDirect:", error.message);
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
