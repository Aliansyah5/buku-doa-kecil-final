import { useState } from "react";

export default function Tab({ structure }) {
  const [tabActive, setTabActive] = useState(0);

  function handleTabClick(tab) {
    setTabActive(tab);
  }

  return (
    <div className="font-poppins">
      <div className="tab-parent flex flex-col">
        {/* Tab Header */}
        <div className="tab-header bg-white/80 backdrop-blur-sm border-b border-emerald-200 shadow-sm">
          <div className="flex items-center justify-around">
            {structure.map((item, index) => (
              <div
                className={`relative text-center flex-1 py-4 cursor-pointer transition-all duration-300 ${
                  index === tabActive
                    ? "text-emerald-700 font-bold"
                    : "text-gray-600 hover:text-emerald-600"
                }`}
                key={index}
                onClick={() => handleTabClick(index)}
              >
                {/* Tab text */}
                <span className="relative z-10">{item.title}</span>

                {/* Active indicator */}
                {index === tabActive && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full transition-all duration-300"></div>
                )}

                {/* Hover effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-2xl transition-all duration-300 ${
                    index === tabActive
                      ? "opacity-30"
                      : "opacity-0 hover:opacity-20"
                  }`}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Body */}
        <div className="tab-body bg-gradient-to-b from-emerald-50/30 to-green-50/30 min-h-96">
          <div className="p-6">{structure[tabActive].body}</div>
        </div>
      </div>
    </div>
  );
}
