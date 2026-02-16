import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function IslamicCard({
  title,
  icon,
  link,
  gradient = "from-emerald-500 to-green-500",
  description = null,
  customIcon = null,
}) {
  return (
    <Link
      to={link}
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden p-4 flex flex-col items-center text-center"
    >
      {/* Subtle gradient hover overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300`}
      ></div>

      {/* Pattern texture background */}
      <div className="absolute inset-0 opacity-[0.12] group-hover:opacity-[0.18] transition-opacity duration-300">
        <img
          src="/icon/pattern1.png"
          alt="Pattern"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Icon */}
      <div className="relative z-10 shrink-0 mb-3">
        {customIcon ? (
          <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <img
              src={customIcon}
              alt={title}
              className="w-full h-full object-contain drop-shadow-md"
            />
          </div>
        ) : (
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${gradient} shadow-md group-hover:scale-105 group-hover:shadow-lg transition-all duration-300`}
          >
            <FontAwesomeIcon
              icon={icon}
              className="text-white text-xl sm:text-2xl"
            />
          </div>
        )}
      </div>

      {/* Text */}
      <div className="relative z-10">
        <h3 className="text-gray-800 font-semibold text-sm leading-snug group-hover:text-emerald-700 transition-colors duration-200">
          {title}
        </h3>
        {description && (
          <p className="text-gray-400 text-[11px] mt-1 leading-relaxed line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}
