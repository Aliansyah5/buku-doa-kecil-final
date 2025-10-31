# Audio Playback Debugging Guide

## Masalah: Audio Tidak Terdengar Saat Klik Play

### Step 1: Buka Developer Tools

1. Tekan `F12` atau `Ctrl+Shift+I` di browser
2. Buka tab **Console**
3. Buka tab **Network**

### Step 2: Coba Play Audio dan Perhatikan Console

Saat Anda klik tombol play pada ayah:

**Seharusnya Anda melihat logs seperti ini:**

```
=== AUDIO DEBUG ===
Settings qori: 05
Ayah number: 1
Available audio keys: 01, 02, 03, 04, 05
Audio URL: https://equran.nos.wjv-1.neo.id/audio-full/Misyari-Rasyid-Al-Afasi/001001.mp3
Full audio object: {01: "...", 02: "...", ...}
==================
✅ Playing audio with URL: https://equran.nos.wjv-1.neo.id/audio-full/...
🎵 Starting audio playback for ayah 1
Attempt 1: Playing audio from https://...
✅ Audio playing successfully
```

### Step 3: Jika Ada Error, Cari Petunjuk

**Kemungkinan Error 1: Audio URL tidak ditemukan**

```
❌ Audio not available for qori 05 in ayah 1
Available keys: 01, 02, 03, 04, 05
```

→ **Solusi**: Settings qori mungkin tidak tersimpan. Cek di Settings > Qori

**Kemungkinan Error 2: Gagal memainkan audio**

```
❌ Attempt 1 failed: NotAllowedError: play() can only be triggered by user gesture
```

→ **Solusi**: Normal di browser modern. Biasanya akan sukses di attempt 2

**Kemungkinan Error 3: CORS Error**

```
❌ Audio load error: CORS policy
```

→ **Solusi**: Kami sudah menambah retry logic, akan mencoba tanpa CORS

**Kemungkinan Error 4: Network Error**

```
❌ Attempt 1 failed: Audio load timeout
```

→ **Solusi**: Cek koneksi internet, atau equran.id server mungkin down

### Step 4: Cek Network Tab

1. Di tab **Network**, filter untuk type **media** atau **audio**
2. Cari request ke `equran.nos.wjv-1.neo.id`
3. Lihat status response:
   - `200` = Sukses
   - `403` = Forbidden/CORS issue
   - `404` = Audio file not found
   - `5xx` = Server error

### Step 5: Manual Test di Console

Copy-paste ini di console untuk test langsung:

```javascript
// Test Equran.id API dan play audio
async function testAudio() {
  console.log("🧪 Testing audio playback...");

  try {
    // Fetch surah 1
    const response = await fetch("https://equran.id/api/v2/surat/1");
    const data = await response.json();
    const firstAyah = data.data.ayat[0];

    console.log("✅ Got ayah data:", firstAyah);
    console.log("Available audio qori IDs:", Object.keys(firstAyah.audio));

    // Get audio URL for qori 05 (Misyari Rasyid Al-Afasi)
    const audioUrl = firstAyah.audio["05"];
    console.log("Audio URL:", audioUrl);

    // Create and play audio
    const audio = new Audio();
    audio.crossOrigin = "anonymous";
    audio.src = audioUrl;

    audio.onloadedmetadata = () => {
      console.log("✅ Audio loaded:", {
        duration: audio.duration,
        readyState: audio.readyState,
      });
    };

    audio.onerror = () => {
      console.error("❌ Audio error:", audio.error?.message);
    };

    audio.onplay = () => console.log("▶️ Playing!");
    audio.onpause = () => console.log("⏸️ Paused");

    await audio.play();
    console.log("✅ Audio should be playing now!");

    // Stop after 5 seconds for testing
    setTimeout(() => {
      audio.pause();
      console.log("⏹️ Test stopped");
    }, 5000);
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
}

testAudio();
```

### Step 6: Cek Settings

1. Buka aplikasi → Settings ⚙️
2. Buka tab "Qori"
3. Verifikasi ada Qori yang dipilih (default: Misyari Rasyid Al-Afasi)
4. Coba klik tombol "audio" untuk test play qori

### Step 7: Cek Sound System

- ✅ Pastikan speaker/headphone terkoneksi
- ✅ Pastikan volume tidak di-mute
- ✅ Pastikan browser volume tidak di-mute (ada icon speaker di tab browser)
- ✅ Coba play audio dari website lain untuk verifikasi

### Step 8: Jika Masih Tidak Jalan

Kumpulkan informasi berikut dan laporkan:

1. **Console logs**: Screenshot/copy semua logs yang muncul
2. **Network errors**: Ada error di tab Network?
3. **Browser info**: Chrome/Firefox/Safari? Version berapa?
4. **Qori yang dipilih**: Qori mana di Settings?
5. **Surah yang dicoba**: Surah berapa dan ayah berapa?

---

## File Changes Summary

### Perubahan yang Dibuat:

1. **src/components/SurahContent.jsx**

   - ✅ Menambah `playAudioWithRetry()` dengan retry logic
   - ✅ Menambah detailed logging untuk debugging
   - ✅ Menambah error event handler pada audio element
   - ✅ Menambah loadstart, canplay callbacks

2. **src/components/AyahItem.jsx**

   - ✅ Menambah detailed console logs
   - ✅ Menambah alert jika audio tidak tersedia
   - ✅ Log semua available audio keys

3. **src/utils/audioUtils.js** (NEW)
   - ✅ `playAudioWithRetry()` - Play dengan auto-retry 3x
   - ✅ `stopAudio()` - Stop audio playback
   - ✅ `getAudioUrl()` - Get audio URL dengan validation
   - ✅ `validateAudioUrl()` - Validate URL format

### Fitur Baru:

- 🔄 **Retry Logic**: Otomatis retry 3x jika audio gagal
- 📝 **Better Logging**: Console logs yang informatif untuk debugging
- ⏱️ **Timeout Handling**: 5 detik timeout untuk load, dengan error handling
- ❌ **Error Recovery**: Coba tanpa CORS jika ada error
- 🎵 **Metadata Loading**: Tunggu metadata loaded sebelum play
- 🔊 **Event Callbacks**: onLoadStart, onCanPlay, onError tracking

---

## Testing Checklist

- [ ] Buka app, pergi ke Surah 1 (Al-Fatihah)
- [ ] Klik play button pada ayah 1
- [ ] Cek console untuk logs (harus ada "✅ Audio playing successfully")
- [ ] Dengarkan audio (seharusnya terdengar)
- [ ] Klik pause di audio player
- [ ] Klik play lagi (harus jalan)
- [ ] Ganti Qori di Settings, coba play di surah lain
- [ ] Periksa Network tab untuk verifikasi audio file loading

---

## Common Issues & Solutions

| Issue            | Cause               | Solution                     |
| ---------------- | ------------------- | ---------------------------- |
| Audio tidak play | Browser policy      | Coba click di area lain dulu |
| Audio tidak ada  | Qori tidak tepat    | Check Settings > Qori        |
| CORS error       | Cross-origin issue  | Sudah ditangani retry logic  |
| Timeout          | Server slow/down    | Coba refresh atau tunggu     |
| Muted            | Browser/device mute | Unmute speaker icon di tab   |
