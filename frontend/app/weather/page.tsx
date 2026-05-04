"use client";
import React from "react";
import { useState } from "react";
import SearchBar from "../../components/SearchBar";

export default function WeatherPage() {
  const [currentCity, setCurrentCity] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (cityToSearch: string) => {
    if (!cityToSearch) return;

    setCurrentCity(cityToSearch);
    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/weather?city=${cityToSearch}`
      );

      if (!res.ok) {
        throw new Error("City not found");
      }

      const result = await res.json();
      setData(result);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Weather</h1>

      <SearchBar 
        placeholder="Enter city..." 
        onSearch={fetchWeather} 
      />

      {loading && <p>Loading...</p>}

      {error && (
        <div>
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => fetchWeather(currentCity)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white"
          >
            Retry
          </button>
        </div>
      )}

      {data && (
        <div className="border p-4 rounded shadow mt-4">
          <p>Temperature: {data.temperature}°C</p>
          <p>Wind Speed: {data.windspeed}</p>
        </div>
      )}
    </div>
  );
}