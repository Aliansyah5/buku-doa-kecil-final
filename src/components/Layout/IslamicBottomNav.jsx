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
        <div className="absolute inset-0 bg-white/80 backdrop-blur-lg border-t border-emerald-200/50"></div>

        {/* Islamic pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="islamic-nav-pattern w-full h-full"></div>
        </div>

        {/* Golden accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400/60 via-yellow-300/80 to-yellow-400/60"></div>

        {/* Navigation Content */}
        <div className="relative z-10 flex justify-around items-center py-3 px-4">
          {navItems.map((item, index) => {
            const active = isActive(item.link);

            return (
              <Link
                key={index}
                to={item.link}
                className="flex flex-col items-center space-y-1 group relative"
              >
                {/* Icon Container with Islamic styling */}
                <div className="relative">
                  {/* Active state background with gradient */}
                  {active && (
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-2xl blur-sm opacity-20 scale-110`}
                    ></div>
                  )}

                  {/* Icon background */}
                  <div
                    className={`
                    relative w-10 h-10 rounded-2xl flex items-center justify-center
                    transition-all duration-300 ease-in-out
                    ${
                      active
                        ? `bg-gradient-to-r ${item.gradient} shadow-lg scale-110`
                        : "bg-gray-100 hover:bg-gray-200 group-hover:scale-105"
                    }
                  `}
                  >
                    {/* Islamic corner ornaments for active state */}
                    {active && (
                      <>
                        <div className="absolute -top-1 -left-1 w-2 h-2 border-l-2 border-t-2 border-yellow-300/60 rounded-tl-lg"></div>
                        <div className="absolute -top-1 -right-1 w-2 h-2 border-r-2 border-t-2 border-yellow-300/60 rounded-tr-lg"></div>
                        <div className="absolute -bottom-1 -left-1 w-2 h-2 border-l-2 border-b-2 border-yellow-300/60 rounded-bl-lg"></div>
                        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-r-2 border-b-2 border-yellow-300/60 rounded-br-lg"></div>
                      </>
                    )}

                    <FontAwesomeIcon
                      icon={item.icon}
                      className={`text-lg transition-colors duration-300 ${
                        active
                          ? "text-white"
                          : "text-gray-600 group-hover:text-emerald-600"
                      }`}
                    />
                  </div>

                  {/* Active indicator dot */}
                  {active && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yellow-300 rounded-full"></div>
                  )}
                </div>

                {/* Label */}
                <span
                  className={`
                  text-xs font-medium transition-colors duration-300
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
                <div className="absolute inset-0 rounded-2xl bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            );
          })}
        </div>

        {/* Bottom safe area for mobile */}
        <div className="h-safe-bottom bg-white/60 backdrop-blur-lg"></div>
      </div>
    </div>
  );
}
