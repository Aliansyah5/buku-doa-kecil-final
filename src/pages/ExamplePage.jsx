import IslamicBanner from "../components/Layout/IslamicBanner";

export default function ExamplePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Islamic Banner with Prayer Time Indicator */}
      <IslamicBanner />

      {/* Rest of your page content */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Contoh Halaman dengan Banner Prayer Time
        </h2>
        <p className="text-gray-600">
          Banner di atas menampilkan pengingat sholat berikutnya dengan
          countdown timer. Timer akan update setiap menit dan menghitung sholat
          terdekat berdasarkan jadwal yang sudah ditentukan.
        </p>
      </div>
    </div>
  );
}
