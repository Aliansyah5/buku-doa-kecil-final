import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function IslamicCard({
  title,
  icon,
  link,
  gradient = "from-emerald-500 to-green-500",
  size = "normal", // normal, large, wide
  description = null,
}) {
  const sizeClasses = {
    normal: "p-6",
    large: "p-8",
    wide: "p-6 col-span-2",
  };

  const iconSizes = {
    normal: "w-12 h-12 text-lg",
    large: "w-16 h-16 text-xl",
    wide: "w-12 h-12 text-lg",
  };

  return (
    <Link
      to={link}
      className={`
        group relative bg-white rounded-3xl shadow-lg hover:shadow-xl
        transition-all duration-500 ease-out hover:scale-[1.02] hover:-translate-y-1
        ${sizeClasses[size]}
        ${size === "wide" ? "flex items-center space-x-6" : ""}
      `}
    >
      {/* Islamic ornamental border */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-emerald-200/30 via-green-200/20 to-teal-200/30 p-0.5 group-hover:from-emerald-300/50 group-hover:via-green-300/30 group-hover:to-teal-300/50 transition-all duration-500">
        <div className="w-full h-full bg-white rounded-3xl"></div>
      </div>

      {/* Islamic corner decorations */}
      <div className="absolute top-3 left-3 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
        <div className="w-3 h-3 border-l-2 border-t-2 border-emerald-300 rounded-tl-lg"></div>
      </div>
      <div className="absolute top-3 right-3 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
        <div className="w-3 h-3 border-r-2 border-t-2 border-emerald-300 rounded-tr-lg"></div>
      </div>
      <div className="absolute bottom-3 left-3 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
        <div className="w-3 h-3 border-l-2 border-b-2 border-emerald-300 rounded-bl-lg"></div>
      </div>
      <div className="absolute bottom-3 right-3 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
        <div className="w-3 h-3 border-r-2 border-b-2 border-emerald-300 rounded-br-lg"></div>
      </div>

      {/* Content */}
      <div
        className={`relative z-10 ${
          size === "wide"
            ? "flex items-center space-x-6 w-full"
            : "flex flex-col items-center text-center"
        }`}
      >
        {/* Icon with Islamic styling */}
        <div className="relative">
          {/* Icon background with gradient */}
          <div
            className={`
            ${iconSizes[size]} rounded-2xl flex items-center justify-center
            bg-gradient-to-r ${gradient} shadow-lg
            group-hover:scale-110 group-hover:shadow-xl
            transition-all duration-500 ease-out
            relative overflow-hidden
          `}
          >
            {/* Islamic pattern overlay on icon */}
            <div className="absolute inset-0 opacity-20">
              <div className="islamic-icon-pattern w-full h-full"></div>
            </div>

            {/* Golden accent border */}
            <div className="absolute inset-0 rounded-2xl border border-yellow-300/30"></div>

            <FontAwesomeIcon
              icon={icon}
              className="text-white relative z-10 group-hover:scale-105 transition-transform duration-300"
            />

            {/* Sparkle effect on hover */}
            <div className="absolute top-1 right-1 w-1 h-1 bg-yellow-200 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
          </div>
        </div>

        {/* Text content */}
        <div className={`${size === "wide" ? "flex-1 text-left" : "mt-4"}`}>
          <h3 className="text-gray-800 font-bold text-base leading-tight group-hover:text-emerald-700 transition-colors duration-300">
            {title}
          </h3>
          {description && (
            <p className="text-gray-500 text-sm mt-1 group-hover:text-gray-600 transition-colors duration-300">
              {description}
            </p>
          )}

          {/* Islamic typography accent */}
          <div className="flex items-center justify-center mt-2 space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
            <div className="w-2 h-0.5 bg-gradient-to-r from-emerald-400 to-green-400"></div>
            <div className="w-1 h-1 bg-green-400 rounded-full"></div>
          </div>
        </div>

        {/* Arrow indicator for wide cards */}
        {size === "wide" && (
          <div className="text-emerald-500 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Hover glow effect */}
      <div
        className={`
        absolute inset-0 rounded-3xl bg-gradient-to-r ${gradient} opacity-0
        group-hover:opacity-5 transition-opacity duration-500 pointer-events-none
      `}
      ></div>
    </Link>
  );
}
