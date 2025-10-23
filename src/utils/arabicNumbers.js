// Fungsi untuk mengkonversi angka Latin ke angka Arabic
export const convertToArabicNumerals = (number) => {
  const arabicNumerals = {
    0: "٠",
    1: "١",
    2: "٢",
    3: "٣",
    4: "٤",
    5: "٥",
    6: "٦",
    7: "٧",
    8: "٨",
    9: "٩",
  };

  return number.toString().replace(/[0-9]/g, (digit) => arabicNumerals[digit]);
};

// Fungsi untuk format angka dengan pemisah ribuan dalam Arabic
export const formatArabicNumber = (number) => {
  const converted = convertToArabicNumerals(number);
  return converted;
};

// Fungsi untuk menampilkan nomor ayat dengan format Arabic
export const formatAyahNumber = (ayahNumber) => {
  return convertToArabicNumerals(ayahNumber);
};

// Fungsi untuk menampilkan nomor surah dengan format Arabic
export const formatSurahNumber = (surahNumber) => {
  return convertToArabicNumerals(surahNumber);
};
