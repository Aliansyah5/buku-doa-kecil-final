// Script untuk test audio dari equran.id API dan debugging CORS
// Buka browser console dan copy-paste ini untuk test

async function testEquranAPI() {
  console.log("=== Testing Equran.id API & CORS ===");
  console.clear();

  try {
    // Test fetch surat 1 (Al-Fatihah)
    const response = await fetch("https://equran.id/api/v2/surat/1");
    const data = await response.json();

    console.log("✅ API Response received");

    if (data.data && data.data.ayat && data.data.ayat.length > 0) {
      const firstAyah = data.data.ayat[0];
      console.log("\n📋 First ayah data:");
      console.log("  - Ayah number:", firstAyah.nomorAyat);
      console.log(
        "  - Available qori IDs:",
        Object.keys(firstAyah.audio || {})
      );

      // Get all audio URLs
      const audioUrls = firstAyah.audio || {};
      console.log("\n🔗 Audio URLs:");
      Object.entries(audioUrls).forEach(([qoriId, url]) => {
        console.log(`  [${qoriId}] ${url}`);
      });

      // Try to play first available audio
      const firstAudioKey = Object.keys(firstAyah.audio || {})[0];
      if (firstAudioKey) {
        const audioUrl = firstAyah.audio[firstAudioKey];
        console.log(`\n🎵 Testing audio playback with qori ${firstAudioKey}`);

        // Test with different URL variations
        await testAudioUrls(audioUrl);
      } else {
        console.error("❌ No audio keys found!");
      }
    }
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

async function testAudioUrls(originalUrl) {
  console.log("\n=== Testing Different URL Variations ===\n");

  const variations = [
    { name: "Original URL", url: originalUrl },
    {
      name: "CORS-Anywhere",
      url: `https://cors-anywhere.herokuapp.com/${originalUrl}`,
    },
    {
      name: "AllOrigins API",
      url: `https://api.allorigins.win/raw?url=${encodeURIComponent(
        originalUrl
      )}`,
    },
  ];

  for (const variation of variations) {
    console.log(`\n🔄 Testing: ${variation.name}`);
    console.log(`   URL: ${variation.url.substring(0, 80)}...`);

    const result = await testAudioUrl(variation.url);

    if (result.success) {
      console.log(`   ✅ SUCCESS - Duration: ${result.duration}s`);

      // Try to play
      try {
        const audio = new Audio();
        audio.crossOrigin = "anonymous";
        audio.src = variation.url;
        audio.volume = 0.3; // Quiet for testing

        audio.onplay = () => console.log(`   ▶️  Playing!`);
        audio.onpause = () => console.log(`   ⏸️  Paused`);
        audio.onended = () => console.log(`   ✅ Playback finished`);

        await audio.play();
        console.log(`   ✅ Audio started playing`);

        // Stop after 3 seconds
        setTimeout(() => {
          audio.pause();
          console.log(`   ⏹️  Test stopped after 3 seconds`);
        }, 3000);

        return; // Success! Don't try other variations
      } catch (playError) {
        console.error(`   ❌ Play error: ${playError.message}`);
      }
    } else {
      console.error(`   ❌ FAILED - ${result.error}`);
    }
  }
}

function testAudioUrl(audioUrl) {
  return new Promise((resolve) => {
    const audio = new Audio();
    audio.crossOrigin = "anonymous";

    const timeout = setTimeout(() => {
      audio.src = "";
      console.log("   ⏱️  Timeout - URL took too long");
      resolve({ success: false, error: "Timeout (5s)" });
    }, 5000);

    audio.onloadedmetadata = () => {
      clearTimeout(timeout);
      audio.src = "";
      resolve({
        success: true,
        duration: Math.round(audio.duration * 100) / 100,
      });
    };

    audio.onerror = () => {
      clearTimeout(timeout);
      const errorCode = audio.error?.code;
      const errorMsg = getErrorMsg(errorCode);
      resolve({ success: false, error: errorMsg });
    };

    audio.src = audioUrl;
  });
}

function getErrorMsg(code) {
  const errors = {
    1: "ABORTED",
    2: "NETWORK ERROR",
    3: "DECODE ERROR",
    4: "NOT SUPPORTED",
  };
  return errors[code] || "Unknown error";
}

// Quick diagnostic info
function showDiagnostics() {
  console.log("\n=== 🔍 Browser Diagnostics ===");
  console.log("User Agent:", navigator.userAgent.substring(0, 80));
  console.log("HTTPS:", window.location.protocol === "https:");
  console.log("Audio API supported:", !!new Audio());
  console.log("Can access equran.id API:", "Testing...");

  fetch("https://equran.id/api/v2/surat/1", { method: "HEAD" })
    .then((r) => console.log("✅ equran.id accessible:", r.status))
    .catch((e) => console.error("❌ equran.id not accessible:", e.message));
}

// Run diagnostics first
showDiagnostics();

// Then run main test
setTimeout(() => {
  testEquranAPI();
}, 1000);
