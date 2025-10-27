import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function IslamicCard({
  title,
  icon,
  link,
  gradient = "from-emerald-500 to-green-500",
  size = "normal", // normal, large, wide
  description = null,
  customIcon = null, // Path to custom image icon
}) {
  const sizeClasses = {
    normal: "p-5",
    large: "p-7",
    wide: "p-5 col-span-2",
  };

  const iconSizes = {
    normal: "w-14 h-14 text-lg",
    large: "w-16 h-16 text-xl",
    wide: "w-14 h-14 text-lg",
  };

  return (
    <Link
      to={link}
      className={`
        group relative bg-white rounded-2xl shadow-md hover:shadow-xl
        transition-all duration-300 ease-out hover:scale-[1.03] hover:-translate-y-0.5
        ${sizeClasses[size]}
        ${size === "wide" ? "flex items-center space-x-0" : ""}
        overflow-hidden
      `}
    >
      {/* Background Pattern Image */}
      <div className="absolute inset-0 pointer-events-none z-0 rounded-2xl overflow-hidden">
        <img
          src="/icon/pattern1.png"
          alt="Pattern"
          className="w-full h-full object-cover opacity-[0.06]"
          style={{
            objectFit: "cover",
            transform: "scale(1.5)",
            imageRendering: "crisp-edges",
          }}
        />
      </div>

      {/* Islamic ornamental border */}
      <div className="absolute inset-0 rounded-2xl border border-transparent bg-linear-to-r from-emerald-100/30 via-green-100/20 to-teal-100/30 p-0.5 group-hover:from-emerald-200/50 group-hover:via-green-200/40 group-hover:to-teal-200/50 transition-all duration-300 z-1">
        <div className="w-full h-full bg-transparent rounded-2xl"></div>
      </div>

      {/* Islamic corner decorations */}
      <div className="absolute top-2.5 left-2.5 opacity-25 group-hover:opacity-50 transition-opacity duration-300">
        <div className="w-2.5 h-2.5 border-l-2 border-t-2 border-emerald-400 rounded-tl"></div>
      </div>
      <div className="absolute top-2.5 right-2.5 opacity-25 group-hover:opacity-50 transition-opacity duration-300">
        <div className="w-2.5 h-2.5 border-r-2 border-t-2 border-emerald-400 rounded-tr"></div>
      </div>
      <div className="absolute bottom-2.5 left-2.5 opacity-25 group-hover:opacity-50 transition-opacity duration-300">
        <div className="w-2.5 h-2.5 border-l-2 border-b-2 border-emerald-400 rounded-bl"></div>
      </div>
      <div className="absolute bottom-2.5 right-2.5 opacity-25 group-hover:opacity-50 transition-opacity duration-300">
        <div className="w-2.5 h-2.5 border-r-2 border-b-2 border-emerald-400 rounded-br"></div>
      </div>

      {/* Content */}
      <div
        className={`relative z-10 ${
          size === "wide"
            ? "flex items-center space-x-5 w-full"
            : "flex flex-col items-center text-center"
        }`}
      >
        {/* Icon with Islamic styling */}
        <div className="relative shrink-0">
          {/* Icon background with gradient */}
          <div
            className={`
            ${iconSizes[size]} rounded-xl flex items-center justify-center
            bg-linear-to-br ${gradient} shadow-md
            group-hover:scale-105 group-hover:shadow-lg
            transition-all duration-300 ease-out
            relative overflow-hidden
          `}
          >
            {/* Islamic pattern overlay on icon */}
            <div className="absolute inset-0 opacity-20">
              <div className="islamic-icon-pattern w-full h-full"></div>
            </div>

            {/* Golden accent border */}
            <div className="absolute inset-0 rounded-xl border border-white/30"></div>

            {/* Icon - Custom Image or FontAwesome */}
            {customIcon ? (
              <div className="w-full h-full bg-white/95 rounded-lg flex items-center justify-center p-2">
                <img
                  src={customIcon}
                  alt={title}
                  className="w-full h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ) : (
              <FontAwesomeIcon
                icon={icon}
                className="text-white text-2xl relative z-10 group-hover:scale-105 transition-transform duration-300"
              />
            )}

            {/* Sparkle effect on hover */}
            <div className="absolute top-1 right-1 w-1 h-1 bg-white/60 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
          </div>
        </div>

        {/* Text content */}
        <div className={`${size === "wide" ? "flex-1 text-left" : "mt-3.5"}`}>
          <h3 className="text-gray-800 font-semibold text-sm leading-snug group-hover:text-emerald-600 transition-colors duration-300">
            {title}
          </h3>
          {description && (
            <p className="text-gray-500 text-xs mt-1 leading-relaxed group-hover:text-gray-600 transition-colors duration-300">
              {description}
            </p>
          )}

          {/* Islamic typography accent */}
          <div className="flex items-center justify-center mt-2 space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-0.5 h-0.5 bg-emerald-400 rounded-full"></div>
            <div className="w-2 h-0.5 bg-linear-to-r from-emerald-400 to-green-400"></div>
            <div className="w-0.5 h-0.5 bg-green-400 rounded-full"></div>
          </div>
        </div>

        {/* Arrow indicator for wide cards */}
        {size === "wide" && (
          <div className="text-emerald-500 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300 shrink-0">
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
        absolute inset-0 rounded-2xl bg-linear-to-r ${gradient} opacity-0
        group-hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none
      `}
      ></div>
    </Link>
  );
}
