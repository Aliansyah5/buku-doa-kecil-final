# Panduan Debugging Audio HTTPS/CORS Issue

## Masalah

Anda bisa play URL MP3 langsung di browser, tapi di aplikasi tidak bisa. Ini kemungkinan besar **CORS (Cross-Origin Resource Sharing)** atau **HTTPS mixed content** issue.

---

## Step 1: Diagnosa Masalah (Buka Console Browser)

### 1a. Cek URL aplikasi Anda

Perhatikan di address bar:

- ✅ `https://localhost:5173` atau `https://...` → HTTPS (BAGUS)
- ❌ `http://localhost:5173` atau `http://...` → HTTP (MUNGKIN MASALAH)

### 1b. Cek audio URL dari API

Di console, paste ini:

```javascript
fetch("https://equran.id/api/v2/surat/1")
  .then((r) => r.json())
  .then((data) => {
    const ayah = data.data.ayat[0];
    console.log("Audio URL:", ayah.audio["05"]);
  });
```

Cek URL yang keluar. Harus dimulai dengan `https://` bukan `http://`

---

## Step 2: Debug dengan Test Script

Buka console browser dan paste ini:

```javascript
// TEST 1: Direct fetch test
console.log("=== TEST 1: Direct URL Test ===");
fetch(
  "https://equran.nos.wjv-1.neo.id/audio-full/Misyari-Rasyid-Al-Afasi/001001.mp3"
)
  .then((r) => {
    console.log("✅ Fetch status:", r.status);
    return r.blob();
  })
  .then((blob) => console.log("✅ Got blob, size:", blob.size))
  .catch((e) => console.error("❌ Fetch error:", e.message));

// TEST 2: Audio element test (wait 2 seconds before running)
setTimeout(() => {
  console.log("\n=== TEST 2: Audio Element Test ===");
  const audio = new Audio();

  audio.addEventListener("loadedmetadata", () => {
    console.log("✅ Audio loaded! Duration:", audio.duration);
    // Try to play
    audio
      .play()
      .then(() => console.log("▶️ Playing!"))
      .catch((e) => console.error("❌ Play error:", e.message));
  });

  audio.addEventListener("error", (e) => {
    console.error("❌ Audio error:", audio.error?.message);
    console.log("Error code:", audio.error?.code);
  });

  audio.crossOrigin = "anonymous";
  audio.src =
    "https://equran.nos.wjv-1.neo.id/audio-full/Misyari-Rasyid-Al-Afasi/001001.mp3";
}, 2000);
```

### Hasil yang Diharapkan:

- ✅ TEST 1 harus return status 200
- ✅ TEST 2 harus show duration dan bisa play

### Jika Ada Error:

- Error: `"NetworkError"` → CORS atau HTTPS issue
- Error: `"NotSupportedError"` → Format tidak support
- Error: `"NotAllowedError"` → Browser policy (click dulu)

---

## Step 3: Cek Settings Qori

1. Buka app → Settings ⚙️
2. Klik tab "Qori"
3. **Pastikan ada satu Qori yang dipilih** (radio button terisi)
4. Cek nilai di console:
   ```javascript
   const settings = JSON.parse(localStorage.getItem("settings"));
   console.log("Current qori setting:", settings.qori);
   ```
   Harus return `"01"`, `"02"`, `"03"`, `"04"`, atau `"05"`

---

## Step 4: Test Audio Playback di App

Setelah cek settings:

1. Buka Surah manapun (misal Surah 1)
2. **Klik ayah pertama** (jangan tombol play, klik di text ayah-nya)
3. **Baru klik tombol play** (speaker icon)
4. **Buka console browser** (F12)
5. **Lihat logs:**

Harus ada logs seperti ini:

```
=== AUDIO DEBUG ===
Settings qori: 05
Ayah number: 1
Available audio keys: 01,02,03,04,05
Audio URL: https://equran.nos.wjv-1.neo.id/...
==================
✅ Playing audio with URL: https://...
🎵 Starting audio playback for ayah 1
🔄 Trying URL variation 1: https://equran.nos.wjv...
🎵 Attempt 1 with variation 1: Playing audio
✅ Audio playing successfully!
```

---

## Step 5: Solusi untuk Setiap Error

### Error: "MEDIA_ERR_NETWORK (2)"

**Penyebab:** CORS blocked atau URL tidak accessible

**Solusi:**

- Cek apakah URL benar (harus https)
- Tunggu server equran.id nyala
- App akan otomatis coba CORS proxy (cors-anywhere atau allorigins)

### Error: "MEDIA_ERR_DECODE (3)"

**Penyebab:** File audio rusak atau format tidak support

**Solusi:**

- Coba qori lain di settings
- Refresh browser dan coba lagi
- Report ke admin equran.id

### Error: "NotAllowedError"

**Penyebab:** Browser policy - harus interaksi user dulu

**Solusi:**

- ✅ NORMAL - jangan khawatir
- Sistem sudah handle dengan retry otomatis
- Biasanya sukses di attempt ke-2 atau 3

### Aplikasi Dengan HTTPS Aman (Recommended)

**Jika pakai `https://`:**

- ✅ Lebih aman
- ✅ Service worker bisa jalan
- ✅ Audio dari `https://equran.nos.wjv-1.neo.id` bisa play langsung

**Jika pakai `http://`:**

- ⚠️ CORS lebih ketat
- ⚠️ Harus pakai proxy untuk audio https
- ✅ Sudah ditangani di audioUtils.js

---

## Step 6: Advanced Testing

Jika masih error, paste ini di console untuk detailed diagnostic:

```javascript
async function fullDiagnostic() {
  console.clear();
  console.log("=== 🔍 FULL AUDIO DIAGNOSTIC ===\n");

  // 1. Check browser support
  console.log("1️⃣ Browser Audio Support:");
  console.log("  - Audio API:", !!new Audio());
  console.log("  - HTTPS:", window.location.protocol === "https:");
  console.log("  - User Agent:", navigator.userAgent.substring(0, 70));

  // 2. Check equran.id API
  console.log("\n2️⃣ Equran.id API Check:");
  try {
    const resp = await fetch("https://equran.id/api/v2/surat/1");
    console.log("  - Status:", resp.status);
    const data = await resp.json();
    const ayah = data.data.ayat[0];
    console.log("  - Data received: ✅");
    console.log("  - Available qori: ", Object.keys(ayah.audio).join(", "));
  } catch (e) {
    console.error("  - Error:", e.message);
  }

  // 3. Test each audio URL
  console.log("\n3️⃣ Audio URL Accessibility:");
  const testUrls = {
    "01-Abdullah":
      "https://equran.nos.wjv-1.neo.id/audio-full/Abdullah-Al-Juhany/001001.mp3",
    "05-Misyari":
      "https://equran.nos.wjv-1.neo.id/audio-full/Misyari-Rasyid-Al-Afasi/001001.mp3",
  };

  for (const [name, url] of Object.entries(testUrls)) {
    try {
      const r = await fetch(url, { method: "HEAD" });
      console.log(`  - ${name}: ${r.status} ${r.ok ? "✅" : "❌"}`);
    } catch (e) {
      console.error(`  - ${name}: ❌ ${e.message}`);
    }
  }

  // 4. Test local settings
  console.log("\n4️⃣ Local Storage Settings:");
  const settings = JSON.parse(localStorage.getItem("settings"));
  console.log("  - Qori setting:", settings.qori);
  console.log("  - Full settings:", settings);

  console.log("\n✅ Diagnostic complete!");
}

fullDiagnostic();
```

---

## Step 7: Kumpulkan Info untuk Report

Jika masih tidak jalan setelah semua itu, kumpulkan:

1. **Screenshot dari console** (F12 → Console)
2. **Error message lengkap**
3. **Settings qori yang dipilih**
4. **Surah dan ayah berapa yang dicoba**
5. **Browser dan version** (Chrome 120? Firefox 121?)
6. **URL aplikasi** (https atau http?)
7. **Output dari `fullDiagnostic()` function di atas**

---

## Perubahan yang Sudah Dibuat

### 1. **audioUtils.js** - Enhanced dengan:

- ✅ Multiple CORS proxy fallback
- ✅ Retry logic dengan 3 attempts
- ✅ Error code mapping (tahu error apa)
- ✅ Timeout handling (8 detik)
- ✅ Event listeners cleanup

### 2. **TEST_AUDIO.js** - Test script dengan:

- ✅ Diagnostic info
- ✅ Multi-variation URL testing
- ✅ CORS proxy testing
- ✅ Real playback test (3 detik)

### 3. **Console Logs** - Lebih informatif:

- ✅ Step-by-step status
- ✅ Error codes dan pesan jelas
- ✅ URL variation tracking
- ✅ Success/failure indicators

---

## Ringkasan Solusi

| Masalah            | Solusi                               |
| ------------------ | ------------------------------------ |
| CORS error         | App otomatis coba CORS proxy         |
| HTTP vs HTTPS      | Gunakan HTTPS untuk app              |
| Qori tidak setting | Cek Settings → Qori ada yang dipilih |
| Timeout            | Coba URL variation atau refresh      |
| Not supported      | Coba qori/surah lain                 |
| Not allowed error  | Normal, retry otomatis akan sukses   |

Sekarang coba jalankan **TEST_AUDIO.js** di console dan lapor hasilnya! 🎵
