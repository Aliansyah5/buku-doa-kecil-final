# Quick Fix Checklist - Audio Tidak Jalan

Ikuti checklist ini sampai audio jalan:

## ☐ Step 1: Verifikasi Settings (2 menit)

```javascript
// Buka console (F12), paste ini:
const settings = JSON.parse(localStorage.getItem("settings"));
console.log("Qori yang dipilih:", settings.qori);
console.log("Semua settings:", settings);
```

**Expected output:**

```
Qori yang dipilih: 05  (atau 01-05)
Semua settings: {interfaceSetting: {...}, qori: "05", ...}
```

**Jika qori kosong atau undefined:**

- Buka app → Settings ⚙️
- Klik tab "Qori"
- Pilih salah satu (radio button)
- Refresh browser
- Coba lagi

---

## ☐ Step 2: Test URL Accessibility (3 menit)

```javascript
// Test langsung ke URL audio
fetch(
  "https://equran.nos.wjv-1.neo.id/audio-full/Misyari-Rasyid-Al-Afasi/001001.mp3"
)
  .then((r) => console.log("Status:", r.status, r.ok ? "✅" : "❌"))
  .catch((e) => console.error("Error:", e.message));
```

**Expected:**

```
Status: 200 ✅
```

**Jika error atau status bukan 200:**

- Internet mati?
- Server equran.id down? (coba akses https://equran.id langsung)
- Coba 5 menit lagi

---

## ☐ Step 3: Test Audio Element (2 menit)

```javascript
// Test bisa main audio dari URL
const audio = new Audio();
audio.crossOrigin = "anonymous";
audio.src =
  "https://equran.nos.wjv-1.neo.id/audio-full/Misyari-Rasyid-Al-Afasi/001001.mp3";

audio.onloadedmetadata = () => {
  console.log("✅ Audio loaded, duration:", audio.duration, "seconds");
  audio
    .play()
    .then(() => console.log("▶️ Playing!"))
    .catch((e) => console.error("❌ Play error:", e.message));
};

audio.onerror = () => {
  console.error("❌ Audio error:", audio.error?.code, audio.error?.message);
};
```

**Expected:**

```
✅ Audio loaded, duration: 52.3 seconds
▶️ Playing!
(dan dengarkan suara recitation)
```

**Jika error:**

- Lihat error code (1, 2, 3, atau 4)
- Cek `HTTPS_CORS_DEBUG.md` untuk solusi per error code

---

## ☐ Step 4: Test di App (3 menit)

1. **Buka app** (npm run dev)
2. **Buka Surah 1** (Al-Fatihah)
3. **Klik tombol play** (speaker icon) di ayah pertama
4. **Buka console** (F12)
5. **Cek logs:**

**Expected logs:**

```
=== AUDIO DEBUG ===
Settings qori: 05
Ayah number: 1
Available audio keys: 01,02,03,04,05
Audio URL: https://equran.nos.wjv-1.neo.id/audio-full/...
==================
✅ Playing audio with URL: ...
🎵 Starting audio playback for ayah 1
🔄 Trying URL variation 1: ...
🎵 Attempt 1 with variation 1: Playing audio
✅ Audio playing successfully!
```

**Dengarkan:** Harus ada suara dari speaker ✅

**Jika tidak ada suara:**

- Cek speaker tidak di-mute 🔊
- Cek browser tab tidak di-mute (ada icon di tab bar)
- Volume device cukup keras
- Coba ayah lain

---

## ☐ Step 5: Jika Masih Tidak Jalan

Cek error di console, cocokkan dengan tabel ini:

| Error                             | Artinya              | Solusi                                   |
| --------------------------------- | -------------------- | ---------------------------------------- |
| `MEDIA_ERR_NETWORK (2)`           | CORS atau network    | Coba 5 menit lagi, atau lihat CORS_DEBUG |
| `MEDIA_ERR_DECODE (3)`            | File rusak           | Coba qori lain di Settings               |
| `MEDIA_ERR_SRC_NOT_SUPPORTED (4)` | Format tidak support | Tidak ada solusi (server issue)          |
| `NotAllowedError`                 | Browser policy       | Normal, app auto-retry                   |
| `Timeout`                         | URL loading lama     | Coba refresh                             |
| Silent (no error)                 | Settings kosong      | Run Step 1 lagi                          |

---

## ☓ Checklist Sebelum Report Masalah

Pastikan sudah cek:

- [ ] Step 1-5 semua sudah dicoba
- [ ] Screenshot console dengan error message
- [ ] Browser apa + version (Chrome 120?)
- [ ] App pakai https atau http?
- [ ] Surah berapa + ayah berapa?
- [ ] Qori yang dipilih di Settings?
- [ ] Internet connection OK?
- [ ] Speaker/headphone terkoneksi?

---

## Video Summary

**Jika Berhasil:**

1. Buka app
2. Klik ayah
3. Klik play button
4. Dengarkan suara ✅

**Jika Error:**

1. Buka console (F12)
2. Lihat error message
3. Follow troubleshooting tabel
4. Atau cek HTTPS_CORS_DEBUG.md

---

## Next Steps

Setelah audio jalan:

1. Test di beberapa surah berbeda
2. Coba ganti qori di Settings
3. Coba pause/resume
4. Coba skip ke ayah lain saat playing

---

## Tips

- 💡 **Tip 1:** HTTPS lebih stabil dari HTTP
- 💡 **Tip 2:** Refresh browser jika error
- 💡 **Tip 3:** Coba qori lain jika satu tidak jalan
- 💡 **Tip 4:** Tunggu sampai audio fully loaded
- 💡 **Tip 5:** Clear browser cache jika persistent issue

---

**Kapan ini selesai?** Setelah Step 4 berhasil + dengarkan suara! 🎉

**Masih error?** Kumpulkan info dari ☓ Checklist dan report! 📋
