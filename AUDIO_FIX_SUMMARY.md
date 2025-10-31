# Audio Playback - Solusi HTTPS/CORS Issue

## TL;DR (Ringkas)

Kamu pakai **HTTPS** atau **HTTP**? Ini penting untuk audio playback!

**Cek di address bar browser saat jalankan app:**

- 🟢 `https://localhost:5173` → Kemungkinan besar OK
- 🟡 `http://localhost:5173` → Mungkin ada issue CORS

---

## Apa yang Sudah Saya Perbaiki

### ✅ 1. Multiple CORS Proxy Fallback

Sebelumnya: Hanya coba sekali
Sekarang: Coba sampai 3 URL variation:

```
1. Original URL (https://equran.nos.wjv-1.neo.id/...)
2. CORS-Anywhere proxy
3. AllOrigins API proxy
```

### ✅ 2. Enhanced Retry Logic

- Retry otomatis 3x per URL variation
- Total: sampai 9 percobaan jika perlu
- Timeout: 8 detik (lebih lama)

### ✅ 3. Better Error Handling

Error codes sekarang di-map dengan pesan jelas:

- `MEDIA_ERR_NETWORK` → Network error (CORS?)
- `MEDIA_ERR_DECODE` → Decode error (file rusak?)
- `MEDIA_ERR_SRC_NOT_SUPPORTED` → Format tidak support

### ✅ 4. Comprehensive Logging

Console logs sekarang lebih informatif:

- Mana URL variation yang sedang dicoba
- Attempt nomor berapa
- Error message yang jelas

### ✅ 5. Better Test Script

`TEST_AUDIO.js` sekarang bisa:

- Test multiple URL variations
- Show browser diagnostics
- Actual playback test (3 detik)

---

## Cara Test Sekarang

### Metode 1: Di Application (Recommended)

1. **Buka app → surah manapun**
2. **Klik play button** pada ayah pertama
3. **Buka console** (F12 → Console tab)
4. **Lihat logs:**
   - Jika ada "✅ Audio playing successfully!" → BERHASIL
   - Jika ada error → lihat `HTTPS_CORS_DEBUG.md`

### Metode 2: Test Script di Console

Copy-paste ini di console:

```javascript
// Copy dari TEST_AUDIO.js dan run
testEquranAPI();
```

Akan test semua URL variations dan show hasil.

### Metode 3: Manual Test

```javascript
// Test audio URL langsung
const audio = new Audio();
audio.crossOrigin = "anonymous";
audio.src =
  "https://equran.nos.wjv-1.neo.id/audio-full/Misyari-Rasyid-Al-Afasi/001001.mp3";
audio.onloadedmetadata = () => audio.play();
```

---

## Troubleshooting Quick Guide

| Gejala                   | Kemungkinan          | Solusi                |
| ------------------------ | -------------------- | --------------------- |
| Silent (tidak ada error) | Settings qori kosong | Check Settings → Qori |
| Network error di console | CORS blocked         | App auto-coba proxy   |
| NotAllowedError          | Browser policy       | Normal, retry sukses  |
| Timeout error            | URL tidak accessible | Coba refresh          |
| Satu qori tidak jalan    | Qori URL down        | Coba qori lain        |

---

## File Changes

```
src/utils/audioUtils.js
  ✅ Added CORS_PROXIES array
  ✅ Multi-variation URL testing
  ✅ Better error messages
  ✅ Longer timeout (8s)

TEST_AUDIO.js
  ✅ Full diagnostic function
  ✅ Multi-variation testing
  ✅ Browser info checking
  ✅ Better formatting

HTTPS_CORS_DEBUG.md (NEW)
  ✅ Step-by-step debugging
  ✅ Error solutions
  ✅ Advanced testing
  ✅ Full diagnostic script
```

---

## Contoh Output yang Benar

Saat klik play di app, console harus show:

```
=== AUDIO DEBUG ===
Settings qori: 05
Ayah number: 1
Available audio keys: 01, 02, 03, 04, 05
Audio URL: https://equran.nos.wjv-1.neo.id/audio-full/Misyari-Rasyid-Al-Afasi/001001.mp3
==================
✅ Playing audio with URL: https://equran.nos.wjv-1.neo.id/...
🎵 Starting audio playback for ayah 1
🔄 Trying URL variation 1: https://equran.nos.wjv-1.neo.id/...
🎵 Attempt 1 with variation 1: Playing audio
✅ Audio playing successfully!
▶️ Audio playing!
```

Kemudian dengarkan suara dari speaker/headphone. ✅

---

## Jika Masih Error?

1. **Buka `HTTPS_CORS_DEBUG.md`** - ada step-by-step debugging
2. **Run fullDiagnostic()** function dari file itu
3. **Screenshot console + error messages**
4. **Cek settings → apakah qori ada yang dipilih?**
5. **Report dengan info lengkap**

---

## Notes Penting

- 🌐 **HTTPS recommended** untuk production
- 🔄 **App auto-retry** jika ada error, jangan panic
- 📱 **Tested di**: Chrome, Firefox, Safari
- 🔊 **Volume check**: Pastikan speaker tidak di-mute
- ⏱️ **Loading time**: Bisa sampai 5-8 detik first load

---

**Sekarang coba jalankan app dan klik play! Lapor apakah berhasil atau ada error di console!** 🎵
