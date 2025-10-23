import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export default function Notification({ title, message }) {
  const isSuccess =
    title?.toLowerCase().includes("berhasil") ||
    title?.toLowerCase().includes("success");

  return (
    <div className="text-center">
      {/* Icon */}
      <div
        className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
          isSuccess
            ? "bg-gradient-to-r from-green-100 to-emerald-100"
            : "bg-gradient-to-r from-blue-100 to-sky-100"
        }`}
      >
        <FontAwesomeIcon
          icon={isSuccess ? faCheckCircle : faInfoCircle}
          className={`text-3xl ${
            isSuccess ? "text-emerald-600" : "text-blue-600"
          }`}
        />
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold text-gray-800 mb-3">{title}</h2>

      {/* Message */}
      <p className="text-gray-600 leading-relaxed">{message}</p>

      {/* Decorative element */}
      <div className="flex items-center justify-center mt-4 space-x-2">
        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
        <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
      </div>
    </div>
  );
}
