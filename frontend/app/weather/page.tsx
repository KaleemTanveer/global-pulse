// "use client";

// import { useState } from "react";

// export default function WeatherPage() {
//   const [city, setCity] = useState("");
//   const [data, setData] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const fetchWeather = async () => {
//     if (!city) return;

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch(
//         `http://127.0.0.1:5000/api/weather?city=${city}`
//       );

//       if (!res.ok) {
//         throw new Error("City not found");
//       }

//       const result = await res.json();
//       console.log("🚀 ~ fetchWeather ~ result:", result)
//       setData(result);

//     } catch (err: any) {
//       setError(err.message || "Something went wrong");
//       setData(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto">

//       <h1 className="text-xl font-bold mb-4">Weather Lookup</h1>

//       {/* Search */}
//       <input
//         type="text"
//         placeholder="Enter city..."
//         className="border p-2 w-full mb-2"
//         value={city}
//         onChange={(e) => setCity(e.target.value)}
//       />

//       <button
//         onClick={fetchWeather}
//         className="bg-blue-500 text-white px-4 py-2 mb-4"
//       >
//         Search
//       </button>

//       {/* Loading */}
//       {loading && <p>Loading...</p>}

//       {/* Error */}
//       {error && (
//         <div>
//           <p className="text-red-500">{error}</p>
//           <button
//             onClick={fetchWeather}
//             className="bg-gray-300 px-3 py-1 mt-2"
//           >
//             Retry
//           </button>
//         </div>
//       )}

//       {/* Data */}
//       {data && (
//         <div className="border p-4 mt-4">
//           <p>Temperature: {data?.current_weather?.temperature}°C</p>
//           <p>Wind Speed: {data?.current_weather?.windspeed}</p>
//         </div>
//       )}

//     </div>
//   );
// }

"use client";

import { useState } from "react";

export default function WeatherPage() {
  const [city, setCity] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/weather?city=${city}`
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

      {/* Search */}
      <div className="mb-4">
        <input
          className="border p-2"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={fetchWeather}
          className="ml-2 px-4 py-2 bg-blue-500 text-white"
        >
          Search
        </button>
      </div>

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Error */}
      {error && (
        <div>
          <p className="text-red-500">{error}</p>
          <button
            onClick={fetchWeather}
            className="ml-2 px-4 py-2 bg-blue-500 text-white"
          >
            Retry
          </button>
        </div>
      )}

      {/* Data */}
      {data && (
        <div className="border p-4 rounded shadow">
          <p>Temperature: {data.temperature}°C</p>
          <p>Wind Speed: {data.windspeed}</p>
        </div>
      )}
    </div>
  );
}