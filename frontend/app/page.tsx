import React from "react";
import Card from "../components/Card";
import RefreshButton from "../components/RefreshButton";

async function getData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const [weatherRes, issRes, countryRes] = await Promise.all([
      fetch(`${baseUrl}/api/weather?city=Lahore`, { cache: "no-store" }),
      fetch(`${baseUrl}/api/iss`, { cache: "no-store" }),
      fetch(`${baseUrl}/api/countries?page=1&limit=1`, { cache: "no-store" }),
    ]);

    const weather = await weatherRes.json();
    const iss = await issRes.json();
    const country = await countryRes.json();

    return { weather, iss, country };
  } catch (error) {
    return { weather: null, iss: null, country: null };
  }
}

export default async function Dashboard() {
  const { weather, iss, country } = await getData();

  return (
   <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

  <Card title="🌦 Weather">
  {weather ? (
    <>
      <p className="text-gray-700">
        <span className="font-semibold">Temperature:</span> {weather.temperature}°C
      </p>
      <RefreshButton />
    </>
  ) : (
    <p>Loading...</p>
  )}
</Card>

  <Card title="🛰 ISS">
  {iss ? (
    <>
      <p>Lat: {iss.iss_position?.latitude}</p>
      <p>Lng: {iss.iss_position?.longitude}</p>
      <RefreshButton />
    </>
  ) : (
    <p>Loading...</p>
  )}
</Card>

<Card title="🌍 Country">
  {country?.data?.[0] ? (
    <>
      <img src={country.data[0].flag} width="80" />
      <p>{country.data[0].name}</p>
      <p>Capital: {country.data[0].capital}</p>
      <RefreshButton />
    </>
  ) : (
    <p>Loading...</p>
  )}
</Card>

</div>
  );
}