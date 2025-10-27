import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSearch,
  faBookmark,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function IslamicBottomNav({ currentPath = "/" }) {
  const navItems = [
    {
      icon: faHome,
      label: "Home",
      link: "/",
      gradient: "from-emerald-500 to-green-500",
    },
    {
      icon: faSearch,
      label: "Search",
      link: "/search",
      gradient: "from-green-500 to-teal-500",
    },
    {
      icon: faBookmark,
      label: "Bookmark",
      link: "/bookmark",
      gradient: "from-teal-500 to-emerald-500",
    },
    {
      icon: faUser,
      label: "Profile",
      link: "/settings",
      gradient: "from-emerald-600 to-green-600",
    },
  ];

  const isActive = (link) => {
    if (link === "/" && currentPath === "/") return true;
    if (link !== "/" && currentPath.startsWith(link)) return true;
    return false;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Glassmorphism Background */}
      <div className="relative">
        {/* Background blur */}
        <div className="absolute inset-0 bg-white/90 backdrop-blur-xl border-t border-emerald-100"></div>

        {/* Islamic pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="islamic-nav-pattern w-full h-full"></div>
        </div>

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-emerald-400/40 via-green-400/60 to-emerald-400/40"></div>

        {/* Navigation Content */}
        <div className="relative z-10 flex justify-around items-center py-2.5 px-3 max-w-lg mx-auto">
          {navItems.map((item, index) => {
            const active = isActive(item.link);

            return (
              <Link
                key={index}
                to={item.link}
                className="flex flex-col items-center space-y-1 group relative min-w-16"
              >
                {/* Icon Container with Islamic styling */}
                <div className="relative">
                  {/* Active state background glow */}
                  {active && (
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${item.gradient} rounded-xl blur-sm opacity-20 scale-105`}
                    ></div>
                  )}

                  {/* Icon background */}
                  <div
                    className={`
                    relative w-11 h-11 rounded-xl flex items-center justify-center
                    transition-all duration-300 ease-out
                    ${
                      active
                        ? `bg-linear-to-br ${item.gradient} shadow-md scale-105`
                        : "bg-gray-100 hover:bg-gray-150 group-hover:scale-105"
                    }
                  `}
                  >
                    {/* Islamic corner ornaments for active state */}
                    {active && (
                      <>
                        <div className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 border-l border-t border-white/40 rounded-tl"></div>
                        <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 border-r border-t border-white/40 rounded-tr"></div>
                        <div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 border-l border-b border-white/40 rounded-bl"></div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 border-r border-b border-white/40 rounded-br"></div>
                      </>
                    )}

                    <FontAwesomeIcon
                      icon={item.icon}
                      className={`text-base transition-colors duration-300 ${
                        active
                          ? "text-white"
                          : "text-gray-600 group-hover:text-emerald-600"
                      }`}
                    />
                  </div>

                  {/* Active indicator dot */}
                  {active && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-emerald-400 rounded-full shadow-sm"></div>
                  )}
                </div>

                {/* Label */}
                <span
                  className={`
                  text-[10px] font-medium transition-colors duration-300 leading-tight
                  ${
                    active
                      ? "text-emerald-700 font-semibold"
                      : "text-gray-500 group-hover:text-emerald-600"
                  }
                `}
                >
                  {item.label}
                </span>

                {/* Hover effect */}
                <div className="absolute inset-0 rounded-xl bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            );
          })}
        </div>

        {/* Bottom safe area for mobile */}
        <div className="h-safe-bottom bg-white/80 backdrop-blur-xl"></div>
      </div>
    </div>
  );
}
