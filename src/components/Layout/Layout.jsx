import { useLocation } from "react-router-dom";
import IslamicBanner from "./IslamicBanner";
import IslamicBottomNav from "./IslamicBottomNav";

export default function Layout({ children, showBanner = true }) {
  const location = useLocation();

  // Only show banner on homepage
  const shouldShowBanner = showBanner && location.pathname === "/";

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-emerald-50/30 to-green-50/50 relative">
      {/* Islamic Pattern Background */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
        <div className="islamic-pattern-bg w-full h-full"></div>
      </div>

      {/* Banner - Only on Homepage */}
      {shouldShowBanner && <IslamicBanner />}

      {/* Main Content with smooth transitions */}
      <main className="relative z-10 pb-24 transition-all duration-500 ease-in-out">
        <div className="animate-fadeIn">{children}</div>
      </main>

      {/* Bottom Navigation */}
      <IslamicBottomNav currentPath={location.pathname} />
    </div>
  );
}
