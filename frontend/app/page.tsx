import Card from "@/components/Card";

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

  {/* Weather */}
  <Card title="🌦 Weather">
    {weather ? (
     <p className="text-gray-700">
  Temperature: {weather.temperature}°C
</p>
    ) : (
      <p>Loading...</p>
    )}
  </Card>

  {/* ISS */}
  <Card title="🛰 ISS">
    {iss ? (
         <div className="text-gray-700">
      <p>Latitude: {Number(iss.iss_position?.latitude).toFixed(2)}</p>
      <p>Longitude: {Number(iss.iss_position?.longitude).toFixed(2)}</p>
    </div>
    ) : (
      <p>Loading...</p>
    )}
  </Card>

  {/* Country */}
   <Card title="🌍 Country">
    {country?.data?.[0] ? (
      <>
      <p className="mt-2 font-medium text-lg">
  {country.data[0].name}
</p>

<p className="text-sm text-gray-500">
  Capital: {country.data[0].capital}
</p>
      </>
    ) : (
      <p>Loading...</p>
    )}
  </Card>

</div>
  );
}