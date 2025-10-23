# 🕌 Prayer Time Indicator - IslamicBanner Component

## Overview

Komponen `IslamicBanner` telah diperbarui dengan **Prayer Time Indicator** yang menampilkan pengingat sholat berikutnya dengan countdown timer real-time.

## ✨ Fitur Baru

### 🕐 Real-time Prayer Countdown

- **Deteksi otomatis** sholat berikutnya berdasarkan waktu saat ini
- **Countdown timer** yang menunjukkan sisa waktu hingga sholat berikutnya
- **Update setiap menit** untuk akurasi real-time

### 📋 Informasi yang Ditampilkan

- **Nama sholat** dalam bahasa Indonesia dan Arab
- **Waktu sholat** (jam:menit)
- **Sisa waktu** dalam format jam dan menit (contoh: "2j 15m" atau "45m")
- **Progress indicator** visual dengan circular progress bar

### 🎨 Design Elements

- **Glassmorphism card** dengan backdrop blur
- **Circular progress indicator** dengan animasi
- **Islamic typography** untuk nama sholat dalam bahasa Arab
- **Responsive design** untuk mobile dan desktop

## 📝 Jadwal Sholat Default

```javascript
const prayerTimes = {
  subuh: { name: "Subuh", time: "04:30", arabicName: "الفجر" },
  dzuhur: { name: "Dzuhur", time: "12:15", arabicName: "الظهر" },
  ashar: { name: "Ashar", time: "15:30", arabicName: "العصر" },
  maghrib: { name: "Maghrib", time: "18:45", arabicName: "المغرب" },
  isya: { name: "Isya", time: "20:00", arabicName: "العشاء" },
};
```

## 🔧 Cara Penggunaan

```jsx
import IslamicBanner from "./components/Layout/IslamicBanner";

function App() {
  return (
    <div>
      <IslamicBanner />
      {/* Konten lainnya */}
    </div>
  );
}
```

## 🛠 Kustomisasi

### Mengubah Jadwal Sholat

Untuk menggunakan jadwal sholat yang berbeda atau dari API:

```javascript
// Di dalam komponen IslamicBanner
const [prayerTimes, setPrayerTimes] = useState({
  // jadwal default
});

// Fetch dari API
useEffect(() => {
  fetchPrayerTimesFromAPI().then((times) => setPrayerTimes(times));
}, []);
```

### Mengubah Format Waktu

Untuk mengubah format tampilan countdown:

```javascript
const formatRemainingTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours > 0) {
    return `${hours} jam ${mins} menit`; // Format lengkap
  }
  return `${mins} menit`;
};
```

## 📱 Responsive Design

Banner secara otomatis menyesuaikan dengan ukuran layar:

- **Mobile**: Stack vertical, prayer indicator di bawah greeting
- **Desktop**: Layout horizontal dengan lebih banyak space

## 🎯 Logika Perhitungan

1. **Ambil waktu saat ini** dalam format jam:menit
2. **Konversi ke menit** untuk perhitungan mudah
3. **Bandingkan dengan semua waktu sholat**
4. **Pilih sholat terdekat** yang belum lewat
5. **Jika semua sholat hari ini sudah lewat**, ambil sholat Subuh hari berikutnya

## 🔄 Auto-update

- **Timer berjalan setiap 1 menit** untuk update real-time
- **Recalculate next prayer** setiap kali waktu berubah
- **Progress bar** update berdasarkan sisa waktu

## 🎨 Visual Elements

### Prayer Time Card

- **Background**: Glassmorphism dengan blur
- **Border**: Subtle white border dengan opacity
- **Icon**: Crescent moon dengan gradient
- **Typography**: Mix antara Latin dan Arabic

### Progress Indicator

- **Circular SVG** dengan animated stroke
- **Color gradient** dari emerald ke yellow
- **Pulsing center dot** untuk visual feedback
- **Responsive sizing** sesuai container

## 💡 Tips Implementasi

1. **Testing**: Gunakan waktu mock untuk testing berbagai skenario
2. **API Integration**: Siapkan fallback jika API prayer time gagal
3. **Localization**: Tambahkan support untuk timezone berbeda
4. **Accessibility**: Pastikan contrast ratio memadai
5. **Performance**: Consider memoization untuk heavy calculations

## 🚀 Future Enhancements

- [ ] Integration dengan API prayer time (Islamic Finder, Aladhan)
- [ ] Notifikasi push sebelum waktu sholat
- [ ] Qibla direction indicator
- [ ] Audio adzan player
- [ ] Prayer history tracking
- [ ] Multiple location support
- [ ] Hijri calendar integration

Banner sekarang tidak hanya menampilkan greeting, tapi juga berfungsi sebagai **Islamic spiritual companion** yang membantu user tetap aware dengan waktu sholat! 🕌✨
