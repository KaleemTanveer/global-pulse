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
    <div className="p-6 space-y-3">

      <h1 className="text-2xl font-bold">{country.name}</h1>

      <p><b>Capital:</b> {country.capital}</p>
      <p><b>Region:</b> {country.region}</p>

      <p>
        <b>Currencies:</b>{" "}
        {country.currencies?.length > 0
          ? country.currencies
              .map((c: any) => `${c.name} (${c.symbol})`)
              .join(", ")
          : "N/A"}
      </p>

      <p>
        <b>Languages:</b>{" "}
        {country.languages?.length > 0
          ? country.languages.join(", ")
          : "N/A"}
      </p>

      <p>
        <b>Border Countries:</b>{" "}
        {country.borders?.length > 0
          ? country.borders.join(", ")
          : "No bordering countries"}
      </p>
    </div>
  );
}