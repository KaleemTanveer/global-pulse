async function getCountry(code: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/countries/${code}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  return res.json();
}

export default async function CountryDetail(props: any) {
  const params = await props.params;
  const code = params.code;


  if (!code) {
    return <p className="p-6">Invalid country code</p>;
  }

  const country = await getCountry(code);

  if (!country) {
    return <p className="p-6">Country not found</p>;
  }

  return (
    <div className="p-6">
      <img src={country.flag} width="150" />
      <h1 className="text-2xl font-bold">{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Region: {country.region}</p>
    </div>
  );
}