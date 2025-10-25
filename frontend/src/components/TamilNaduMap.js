import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./TamilNaduMap.css";

// Fix Leaflet icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// === Beach Data ===
const beaches = [
  { name: "Marina Beach", lat: 13.05, lng: 80.28, attractions: ["Lighthouse", "Marina Promenade", "Local Food Stalls"] },
  { name: "Elliot Beach", lat: 13.0001, lng: 80.2666, attractions: ["Church of Our Lady of Good Health", "Café Spots"] },
  { name: "Kanyakumari Beach", lat: 8.0883, lng: 77.5385, attractions: ["Vivekananda Rock", "Thiruvalluvar Statue", "Sunrise & Sunset View"] },
  { name: "Rameswaram Beach", lat: 9.2876, lng: 79.3129, attractions: ["Pamban Bridge", "Ramanathaswamy Temple", "Water Sports"] },
  { name: "Kovalam Beach", lat: 12.785, lng: 80.257, attractions: ["Surfing", "Fishing Village", "Scenic Viewpoints"] },
];

function TamilNaduMap() {
  const [selectedBeach, setSelectedBeach] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [pastWeather, setPastWeather] = useState([]);
  const [dangerLevel, setDangerLevel] = useState(null);

  const API_KEY = "5936ba0dd5a11687626b509d6b7c51d4";

  // Determine risk level based on trends
  const analyzeDanger = (data) => {
    const avgWind = data.reduce((a, b) => a + b.wind, 0) / data.length;
    const rainy = data.filter((d) => d.humidity > 80).length;

    if (rainy >= 3) return { level: "High", icon: "⛈", msg: "Continuous rain expected — avoid travel" };
    if (avgWind > 8) return { level: "Moderate", icon: "🌊", msg: "Windy conditions — stay cautious" };
    return { level: "Low", icon: "✅", msg: "Weather calm and safe" };
  };

  // Fetch Current Weather and Simulate Past 3 Days
  const fetchWeather = async (beach) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${beach.lat}&lon=${beach.lng}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (data.cod !== 200) {
        throw new Error("Weather data unavailable");
      }

      // Simulate past 3 days
      const simulatedPast = [
        {
          date: "3 days ago",
          temp: data.main.temp - 2,
          humidity: data.main.humidity + 5,
          wind: data.wind.speed - 1,
        },
        {
          date: "2 days ago",
          temp: data.main.temp - 1,
          humidity: data.main.humidity + 2,
          wind: data.wind.speed,
        },
        {
          date: "Yesterday",
          temp: data.main.temp,
          humidity: data.main.humidity,
          wind: data.wind.speed + 1,
        },
      ];
      
      setWeatherData(data);
      setPastWeather(simulatedPast);
      setDangerLevel(analyzeDanger(simulatedPast));
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
          attribution='&copy; <a href="https://osm.org">OpenStreetMap</a>'
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
                <h3>{weatherData.weather[0].description}</h3>
                <img
                  src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt="weather icon"
                />
                <div className="weather-grid">
                  <p>🌡 Temp: {weatherData.main.temp} °C</p>
                  <p>💧 Humidity: {weatherData.main.humidity}%</p>
                  <p>🌬 Wind: {weatherData.wind.speed} m/s</p>
                  <p>☁️ Clouds: {weatherData.clouds.all}%</p>
                  <p>📏 Pressure: {weatherData.main.pressure} hPa</p>
                  <p>🤒 Feels Like: {weatherData.main.feels_like} °C</p>
                </div>
              </>
            ) : (
              <p style={{ color: "red" }}>
                ⚠ {weatherData?.message || "Unable to fetch weather data"}
              </p>
            )}

            {/* Visualization */}
            {pastWeather.length > 0 && (
              <div className="chart-box">
                <h4>📊 Weather Trends (Past 3 Days)</h4>
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={pastWeather}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="temp" stroke="#1565c0" strokeWidth={2} name="Temp (°C)" />
                    <Line type="monotone" dataKey="humidity" stroke="#43a047" strokeWidth={2} name="Humidity (%)" />
                    <Line type="monotone" dataKey="wind" stroke="#f44336" strokeWidth={2} name="Wind (m/s)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Danger Level */}
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
