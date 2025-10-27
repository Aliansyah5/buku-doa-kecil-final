import { useState, useEffect } from "react";

export default function AppVersion() {
  const [version, setVersion] = useState(null);
  const [buildDate, setBuildDate] = useState(null);

  useEffect(() => {
    // Fetch version info
    fetch("/version.json")
      .then((res) => res.json())
      .then((data) => {
        setVersion(data.version);
        setBuildDate(
          new Date(data.buildDate).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        );
      })
      .catch(() => {
        // Fallback to default
        setVersion("Development");
      });
  }, []);

  if (!version) return null;

  return (
    <div className="text-center py-4 text-xs text-gray-400">
      <div>Version {version}</div>
      {buildDate && <div>Build: {buildDate}</div>}
    </div>
  );
}
