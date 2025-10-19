import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./WeatherInsights.css";

const beaches = [
  { name: "Marina Beach", lat: 13.05, lon: 80.28 },
  { name: "Elliot Beach", lat: 13.0001, lon: 80.2666 },
  { name: "Kanyakumari Beach", lat: 8.0883, lon: 77.5385 },
  { name: "Rameswaram Beach", lat: 9.2876, lon: 79.3129 },
  { name: "Kovalam Beach", lat: 12.785, lon: 80.257 },
];

const API_KEY = "5936ba0dd5a11687626b509d6b7c51d4";

function WeatherInsights() {
  const [weatherData, setWeatherData] = useState([]);
  const [bestBeach, setBestBeach] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const dataArr = [];

      for (let beach of beaches) {
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${beach.lat}&lon=${beach.lon}&appid=${API_KEY}&units=metric`
          );
          const data = await res.json();

          const temp = data.main.temp;
          const humidity = data.main.humidity;
          const wind = data.wind.speed;
          const desc = data.weather[0].description;

          // Compute safety level
          let safety = "Safe";
          if (humidity > 85 || wind > 9) safety = "Caution";
          if (desc.includes("rain") || wind > 12) safety = "Danger";

          dataArr.push({
            name: beach.name,
            temp,
            humidity,
            wind,
            condition: desc,
            safety,
          });
        } catch (err) {
          console.error("Error fetching:", beach.name);
        }
      }

      setWeatherData(dataArr);
      findBestBeach(dataArr);
    };

    fetchWeather();
  }, []);

  // Pick the beach with lowest humidity + lowest wind + highest temp
  const findBestBeach = (data) => {
    if (!data || data.length === 0) return;
    const scored = data.map((b) => ({
      ...b,
      score: b.temp - b.humidity / 10 - b.wind,
    }));
    const best = scored.reduce((max, b) => (b.score > max.score ? b : max));
    setBestBeach(best);
  };

  return (
    <div className="insights-container">
      <h1>🌤 Tamil Nadu Weather Insights Dashboard</h1>

      {/* Recommendation */}
      {bestBeach && (
        <div className="recommendation-box">
          <h2>🏖 Best Beach to Visit Today</h2>
          <p>
            <strong>{bestBeach.name}</strong> — {bestBeach.condition} <br />
            🌡 {bestBeach.temp}°C | 💧 {bestBeach.humidity}% | 🌬{" "}
            {bestBeach.wind} m/s
          </p>
        </div>
      )}

      {/* Chart */}
      {weatherData.length > 0 && (
        <div className="chart-wrapper">
          <h3>📊 Weather Comparison Across Beaches</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={weatherData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="temp" fill="#42a5f5" name="Temperature (°C)" />
              <Bar dataKey="humidity" fill="#66bb6a" name="Humidity (%)" />
              <Bar dataKey="wind" fill="#ef5350" name="Wind (m/s)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Table */}
      <table className="weather-table">
        <thead>
          <tr>
            <th>Beach</th>
            <th>Temp (°C)</th>
            <th>Humidity (%)</th>
            <th>Wind (m/s)</th>
            <th>Condition</th>
            <th>Safety</th>
          </tr>
        </thead>
        <tbody>
          {weatherData.map((b, i) => (
            <tr key={i}>
              <td>{b.name}</td>
              <td>{b.temp}</td>
              <td>{b.humidity}</td>
              <td>{b.wind}</td>
              <td>{b.condition}</td>
              <td
                className={`safety-cell ${
                  b.safety === "Danger"
                    ? "danger"
                    : b.safety === "Caution"
                    ? "caution"
                    : "safe"
                }`}
              >
                {b.safety}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WeatherInsights;
