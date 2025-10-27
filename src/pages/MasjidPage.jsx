import { useState } from "react";
import Layout from "../components/Layout/Layout";
import LoadingIndicator from "../components/LoadingIndicator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMosque,
  faMapMarkerAlt,
  faExternalLinkAlt,
  faLocationCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import useTitle from "../hooks/useTitle";

export default function MasjidPage() {
  const [masjidList, setMasjidList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  useTitle("Masjid LDII Terdekat");

  const getUserLocation = () => {
    setLoadingLocation(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation tidak didukung oleh browser Anda");
      setLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(location);
        searchNearbyMasjid(location);
        setLoadingLocation(false);
      },
      (error) => {
        setError(
          "Gagal mendapatkan lokasi. Pastikan GPS aktif dan izin lokasi diberikan."
        );
        setLoadingLocation(false);
        console.error("Geolocation error:", error);
      }
    );
  };

  const searchNearbyMasjid = async (location) => {
    setLoading(true);
    setError(null);

    try {
      const radius = 20000; // 20km radius (diperluas dari 5km)

      // Pendekatan 1: Coba Google Places API via AllOrigins CORS proxy
      // Jika gagal, fallback ke Nominatim

      let masjids = [];

      // Coba Google Places API dulu (lebih akurat)
      try {
        const query = encodeURIComponent("Masjid LDII");
        // Gunakan AllOrigins sebagai CORS proxy untuk Google Places
        const corsProxy = "https://api.allorigins.win/raw?url=";
        const googleUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&location=${location.lat},${location.lng}&radius=${radius}&language=id&key=AIzaSyBYour-API-Key-Here`;

        const googleResponse = await fetch(
          `${corsProxy}${encodeURIComponent(googleUrl)}`
        );

        if (googleResponse.ok) {
          const googleData = await googleResponse.json();

          if (googleData.results && googleData.results.length > 0) {
            // Process Google Places data
            masjids = googleData.results
              .filter((place) => place.name.toLowerCase().includes("ldii"))
              .map((place, index) => ({
                id: place.place_id || index,
                name: place.name,
                address: place.formatted_address || "Alamat tidak tersedia",
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng,
                distance: calculateDistance(
                  location.lat,
                  location.lng,
                  place.geometry.location.lat,
                  place.geometry.location.lng
                ),
              }));

            masjids.sort((a, b) => a.distance - b.distance);

            if (masjids.length > 0) {
              setMasjidList(masjids);
              setLoading(false);
              return;
            }
          }
        }
      } catch (googleError) {
        console.log("Google API failed, trying Nominatim...", googleError);
      }

      // Fallback ke Nominatim dengan radius lebih besar
      const searchRadius = 0.2; // ~20km dalam derajat koordinat
      const nominatimQuery = encodeURIComponent("Masjid LDII");
      const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${nominatimQuery}&viewbox=${
        location.lng - searchRadius
      },${location.lat + searchRadius},${location.lng + searchRadius},${
        location.lat - searchRadius
      }&bounded=1&limit=50`;

      const response = await fetch(nominatimUrl, {
        headers: {
          "User-Agent": "BukuDoaKecil/1.0",
        },
      });

      if (!response.ok) {
        throw new Error("Gagal mengambil data masjid");
      }

      const data = await response.json();

      if (data.length === 0) {
        setError(
          'Tidak ditemukan "Masjid LDII" dalam radius 20km dari lokasi Anda. Pastikan GPS aktif dan coba lokasi lain.'
        );
        setLoading(false);
        return;
      }

      // Filter hanya yang mengandung kata "LDII" di nama (strict filter)
      const filteredData = data.filter((place) =>
        place.display_name.toLowerCase().includes("ldii")
      );

      if (filteredData.length === 0) {
        setError(
          'Tidak ditemukan "Masjid LDII" dalam radius 20km. Data mungkin belum tersedia di peta untuk area ini.'
        );
        setLoading(false);
        return;
      }

      masjids = processMasjidData(filteredData, location);

      // Filter berdasarkan radius 20km
      const masjidsInRadius = masjids.filter((m) => m.distance <= 20);

      if (masjidsInRadius.length === 0) {
        setError(
          'Tidak ditemukan "Masjid LDII" dalam radius 20km dari lokasi Anda.'
        );
        setLoading(false);
        return;
      }

      setMasjidList(masjidsInRadius);
    } catch (error) {
      console.error("Error fetching masjid data:", error);
      setError(
        "Gagal mengambil data masjid. Silakan coba lagi atau periksa koneksi internet Anda."
      );
    } finally {
      setLoading(false);
    }
  };

  const processMasjidData = (data, location) => {
    const masjids = data.map((element, index) => {
      const lat = parseFloat(element.lat);
      const lon = parseFloat(element.lon);

      return {
        id: element.place_id || index,
        name: element.display_name.split(",")[0] || "Masjid",
        address:
          element.display_name.split(",").slice(1).join(",").trim() ||
          "Alamat tidak tersedia",
        lat: lat,
        lng: lon,
        distance: calculateDistance(location.lat, location.lng, lat, lon),
      };
    });

    // Sort by distance
    masjids.sort((a, b) => a.distance - b.distance);

    return masjids;
  };

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const toRad = (value) => {
    return (value * Math.PI) / 180;
  };

  const openInGoogleMaps = (masjid) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${masjid.lat},${masjid.lng}&query_place_id=${masjid.name}`;
    window.open(url, "_blank");
  };

  const formatDistance = (distance) => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)} m`;
    }
    return `${distance.toFixed(1)} km`;
  };

  return (
    <Layout showBanner={false}>
      <div className="min-h-screen bg-linear-to-br from-gray-50 via-emerald-50/30 to-green-50/50">
        {/* Header Section */}
        <div className="text-center py-8 px-6">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-linear-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
              <FontAwesomeIcon icon={faMosque} className="text-white text-lg" />
            </div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
              Masjid LDII Terdekat
            </h1>
          </div>
          <p className="text-gray-600 text-sm max-w-md mx-auto">
            Temukan masjid LDII terdekat dari lokasi Anda
          </p>

          {/* Islamic decorative line */}
          <div className="flex items-center justify-center space-x-2 mt-4">
            <div className="w-8 h-0.5 bg-linear-to-r from-transparent to-emerald-300"></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <div className="w-4 h-0.5 bg-emerald-300"></div>
            <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
            <div className="w-4 h-0.5 bg-emerald-300"></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <div className="w-8 h-0.5 bg-linear-to-l from-transparent to-emerald-300"></div>
          </div>
        </div>

        <div className="px-4 pb-24">
          <div className="max-w-2xl mx-auto">
            {/* Get Location Button */}
            {!userLocation && !loading && (
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-emerald-100 shadow-lg p-8 text-center">
                <div className="mb-6">
                  <div className="w-20 h-20 mx-auto bg-linear-to-r from-emerald-100 to-green-100 rounded-full flex items-center justify-center mb-4">
                    <FontAwesomeIcon
                      icon={faLocationCrosshairs}
                      className="text-emerald-600 text-3xl"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Aktifkan Lokasi
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Izinkan akses lokasi untuk menemukan masjid LDII terdekat
                    dari posisi Anda
                  </p>
                </div>
                <button
                  onClick={getUserLocation}
                  disabled={loadingLocation}
                  className="px-6 py-3 bg-linear-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                >
                  {loadingLocation
                    ? "Mengambil Lokasi..."
                    : "Cari Masjid Terdekat"}
                </button>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="text-center py-12">
                <LoadingIndicator />
                <p className="text-gray-600 mt-4">
                  Mencari masjid LDII terdekat...
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
                <p className="text-red-600 text-sm">{error}</p>
                <button
                  onClick={getUserLocation}
                  className="mt-3 text-sm text-emerald-600 hover:text-emerald-700 font-semibold"
                >
                  Coba Lagi
                </button>
              </div>
            )}

            {/* Masjid List */}
            {!loading && masjidList.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    Ditemukan {masjidList.length} masjid
                  </h3>
                  <button
                    onClick={getUserLocation}
                    className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold"
                  >
                    Refresh
                  </button>
                </div>

                {masjidList.map((masjid) => (
                  <div
                    key={masjid.id}
                    onClick={() => openInGoogleMaps(masjid)}
                    className="bg-white/70 backdrop-blur-sm rounded-2xl border border-emerald-100 shadow-md hover:shadow-lg transition-all duration-300 p-5 cursor-pointer group"
                  >
                    <div className="flex items-start space-x-4">
                      {/* Icon */}
                      <div className="shrink-0">
                        <div className="w-12 h-12 bg-linear-to-r from-emerald-100 to-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <FontAwesomeIcon
                            icon={faMosque}
                            className="text-emerald-600 text-xl"
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-emerald-600 transition-colors">
                          {masjid.name}
                        </h4>
                        <div className="flex items-start space-x-2 text-sm text-gray-600 mb-2">
                          <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            className="text-emerald-500 mt-0.5 shrink-0"
                          />
                          <p className="line-clamp-2">{masjid.address}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                            {formatDistance(masjid.distance)}
                          </span>
                          <div className="flex items-center space-x-1 text-emerald-600 text-sm font-medium">
                            <span>Buka di Maps</span>
                            <FontAwesomeIcon
                              icon={faExternalLinkAlt}
                              className="text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
