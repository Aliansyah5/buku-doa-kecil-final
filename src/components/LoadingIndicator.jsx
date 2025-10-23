import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function LoadingIndicator() {
  return (
    <div className="flex justify-center items-center h-screen flex-col bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden">
      {/* Islamic Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #10b981 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #059669 2px, transparent 2px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Loading Content */}
      <div className="relative z-10 text-center">
        {/* Decorative Islamic Pattern */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-emerald-300"></div>
          <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
          <div className="w-4 h-0.5 bg-emerald-300"></div>
          <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
          <div className="w-4 h-0.5 bg-emerald-300"></div>
          <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
          <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-emerald-300"></div>
        </div>

        {/* Spinner Container */}
        <div className="relative flex items-center justify-center mb-8">
          {/* Outer ring */}
          <div className="w-20 h-20 border-4 border-emerald-200 rounded-full animate-pulse absolute"></div>

          {/* Inner spinning element */}
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              className="text-white text-2xl"
            />
          </div>
        </div>

        {/* Loading Text */}
        <div className="mt-4">
          <p className="text-emerald-700 font-medium text-lg mb-2">Memuat...</p>
          <p className="text-gray-600 text-sm">
            Sedang menyiapkan konten untuk Anda
          </p>
        </div>

        {/* Bottom decorative line */}
        <div className="flex items-center justify-center space-x-2 mt-8">
          <div className="w-6 h-0.5 bg-gradient-to-r from-transparent to-emerald-300"></div>
          <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
          <div className="w-3 h-0.5 bg-emerald-300"></div>
          <div className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="w-3 h-0.5 bg-emerald-300"></div>
          <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
          <div className="w-6 h-0.5 bg-gradient-to-l from-transparent to-emerald-300"></div>
        </div>
      </div>
    </div>
  );
}
