import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./TamilNaduMap.css";

// Fix default icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Beaches in Tamil Nadu
const beaches = [
  {
    name: "Marina Beach",
    lat: 13.05,
    lng: 80.28,
    attractions: ["Lighthouse", "Marina Promenade", "Local Food Stalls"],
  },
  {
    name: "Elliot Beach",
    lat: 13.0001,
    lng: 80.2666,
    attractions: ["Church of Our Lady of Good Health", "Café Coffee Spots"],
  },
  {
    name: "Kanyakumari Beach",
    lat: 8.0883,
    lng: 77.5385,
    attractions: [
      "Vivekananda Rock",
      "Thiruvalluvar Statue",
      "Sunrise & Sunset View",
    ],
  },
  {
    name: "Rameswaram Beach",
    lat: 9.2876,
    lng: 79.3129,
    attractions: ["Pamban Bridge", "Ramanathaswamy Temple", "Water Sports"],
  },
  {
    name: "Kovalam Beach",
    lat: 12.785,
    lng: 80.257,
    attractions: ["Surfing", "Fishing Village", "Scenic Viewpoints"],
  },
];

function TamilNaduMap() {
  const [selectedBeach, setSelectedBeach] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [pastWeather, setPastWeather] = useState([]);
  const [dangerLevel, setDangerLevel] = useState(null);

  const API_KEY = "5936ba0dd5a11687626b509d6b7c51d4";

  // Compute UNIX timestamp for past days
  const getPastTimestamp = (daysAgo) => {
    const now = new Date();
    now.setDate(now.getDate() - daysAgo);
    return Math.floor(now.getTime() / 1000);
  };

  // Danger detection logic
  const analyzeDanger = (past) => {
    let rainyCount = 0;
    let strongWind = false;

    past.forEach((day) => {
      const desc = day.weather[0].main.toLowerCase();
      if (desc.includes("rain")) rainyCount++;
      if (day.wind_speed > 10) strongWind = true;
    });

    if (rainyCount >= 3) return { level: "High", icon: "⛈", msg: "Heavy rain for 3 days — Avoid travel" };
    if (strongWind) return { level: "Moderate", icon: "🌊", msg: "High waves — stay cautious" };
    return { level: "Low", icon: "✅", msg: "Weather seems calm and safe" };
  };

  // Fetch current + past 3 days weather
  const fetchWeather = async (beach) => {
    try {
      // Current weather
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${beach.lat}&lon=${beach.lng}&appid=${API_KEY}&units=metric`
      );
      const currentData = await res.json();

      // Past 3 days
      const past = [];
      for (let i = 1; i <= 3; i++) {
        const ts = getPastTimestamp(i);
        const histRes = await fetch(
          `https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${beach.lat}&lon=${beach.lng}&dt=${ts}&appid=${API_KEY}&units=metric`
        );
        const histData = await histRes.json();
        // Take daily summary (use hourly[0] for simplicity)
        if (histData?.data || histData?.hourly) {
          const sample = histData.data ? histData.data[0] : histData.hourly[0];
          past.push(sample);
        }
      }

      setWeatherData(currentData);
      setPastWeather(past);
      setDangerLevel(analyzeDanger(past));
      setSelectedBeach(beach);
    } catch (err) {
      console.error("Error fetching weather:", err);
      setWeatherData({ message: "Network error" });
      setSelectedBeach(beach);
    }
  };

  return (
    <div className="map-page">
      <MapContainer
        center={[11.1271, 78.6569]}
        zoom={7}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {beaches.map((beach, i) => (
          <Marker
            key={i}
            position={[beach.lat, beach.lng]}
            eventHandlers={{ click: () => fetchWeather(beach) }}
          >
            <Popup>{beach.name}</Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Modal */}
      {selectedBeach && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="close-btn"
              onClick={() => {
                setSelectedBeach(null);
                setWeatherData(null);
                setPastWeather([]);
                setDangerLevel(null);
              }}
            >
              ✖
            </button>

            <h2>{selectedBeach.name}</h2>

            {/* Current Weather */}
            {weatherData && weatherData.cod === 200 ? (
              <>
                <h3 style={{ textTransform: "capitalize" }}>
                  {weatherData.weather[0].description}
                </h3>
                <img
                  src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt="weather icon"
                />
                <p>🌡 Temp: {weatherData.main.temp} °C</p>
                <p>💧 Humidity: {weatherData.main.humidity}%</p>
                <p>🌬 Wind: {weatherData.wind.speed} m/s</p>
              </>
            ) : (
              <p style={{ color: "red" }}>
                ⚠ {weatherData?.message || "Unable to fetch weather data"}
              </p>
            )}

            {/* Past 3 Days */}
            {pastWeather.length > 0 && (
              <div className="past-weather">
                <h4>🗓 Past 3 Days</h4>
                <ul>
                  {pastWeather.map((day, idx) => (
                    <li key={idx}>
                      Day -{3 - idx} : {day.weather[0].main} | 🌡 {day.temp}°C
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Danger Indicator */}
            {dangerLevel && (
              <div
                className={`danger-box ${
                  dangerLevel.level === "High"
                    ? "danger-high"
                    : dangerLevel.level === "Moderate"
                    ? "danger-moderate"
                    : "danger-low"
                }`}
              >
                <h4>
                  {dangerLevel.icon} Danger Level: {dangerLevel.level}
                </h4>
                <p>{dangerLevel.msg}</p>
              </div>
            )}

            {/* Attractions */}
            <h4>🌟 Top Attractions</h4>
            <ul>
              {selectedBeach.attractions.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default TamilNaduMap;
