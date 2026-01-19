# Audio Playback Debug Guide

## Masalah yang Diperbaiki

Audio tidak keluar suara meski sudah klik tombol play.

## Root Cause

1. **Race condition**: Audio element belum render ketika playback dicoba
2. **Parameter missing**: Fungsi `ayahAudioPlayEvent` memerlukan 4 parameter, tapi hanya 2 yang dikirim
3. **Timing issue**: `handleActiveAyahChange` dipanggil terlalu awal sebelum audio element siap

## Perbaikan yang Dilakukan

### 1. AyahItem.jsx

- ✅ Menambahkan delay 200ms sebelum memanggil `onPlayAudio`
- ✅ Mengirim 4 parameter yang benar:
  ```
  onPlayAudio(
    audioUrl,                    // src
    { ayahNumber, surahNumber }, // ayahObj
    false,                        // next
    false                         // nextAudio
  )
  ```
- ✅ Added verbose logging untuk debug

### 2. SurahContent.jsx

- ✅ Delay 100ms sebelum playback untuk memastikan audio element render
- ✅ Added verbose logging di `ayahAudioPlayEvent`

### 3. audioUtils.js

- ✅ Simplified `playAudioDirect` untuk lebih robust
- ✅ Method 1: Direct playback
- ✅ Method 2: Blob URL fallback untuk CORS issues
- ✅ Comprehensive error logging

## Testing Steps

### 1. Buka Dev Console (F12)

```
Jalankan aplikasi di browser
Tekan F12 untuk membuka Developer Console
Pilih tab "Console"
```

### 2. Navigasi ke Surah

- Pilih satu Surah dari list
- Lihat ke bawah halaman untuk melihat audio player

### 3. Klik Tombol Play

- Klik tombol play di salah satu ayat
- Lihat console untuk log-log berikut:

```
=== 🎵 AUDIO PLAY CLICK DEBUG ===
Settings qori: [qori ID]
Ayah number: [ayah number]
Available audio keys: [list of qori IDs]
Audio URL: https://...
✅ Playing audio with URL: https://...
Calling onPlayAudio with parameters:
  - src: https://...
  - ayahObj: {ayahNumber, surahNumber}
  - next: false
  - nextAudio: false
=========================================

=== 🎵 ayahAudioPlayEvent CALLED ===
Parameters received:
  src: https://...
  ayahObj: {ayahNumber, surahNumber}
  next: false
  nextAudio: false
  audioRef.current: [HTMLAudioElement]
====================================

🎵 Starting audio playback for ayah [number]
Calling playAudioDirect with audioRef and src: https://...

=== 🎵 playAudioDirect called ===
URL: https://...
📡 Audio element ready
✅ Audio playing!
```

## Troubleshooting

### Jika Audio Tidak Play:

1. **Check Console Log**

   - Lihat apakah semua log tercetak
   - Jika berhenti di tengah, ada error

2. **CORS Error?**

   - Jika error: "Cross-Origin Request Blocked"
   - Fallback akan mencoba blob URL
   - Lihat di console: "Trying blob URL fallback..."

3. **Audio URL Tidak Valid?**

   - Pastikan `Available audio keys` bukan kosong
   - Jika kosong, data audio belum loaded

4. **Audio Element Not Found?**
   - Check: `audioRef.current: [HTMLAudioElement]`
   - Jika null, audio element belum render
   - Increase delay di AyahItem.jsx ke 300ms

## Debug Commands in Console

Paste ini di console browser:

```javascript
// Check audio element
console.log("audioRef:", document.querySelector("audio"));

// Check settings
JSON.stringify(JSON.parse(localStorage.getItem("appSettings")), null, 2);

// Play sound test
const audio = new Audio();
audio.src = "https://example.com/audio.mp3";
audio.play();
```

## Log Sections

- **AUDIO PLAY CLICK DEBUG**: Click handler di AyahItem
- **ayahAudioPlayEvent CALLED**: Parent function di SurahContent
- **playAudioDirect called**: Utility function di audioUtils
