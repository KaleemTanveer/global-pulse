import Link from "next/link";
import SearchBar from "@/components/SearchBar";

async function getCountries(page = 1, search = "") {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/countries?page=${page}&limit=10&search=${search}`,
    { cache: "no-store" }
  );

  return res.json();
}

type Props = {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
};

export default async function CountriesPage({ searchParams }: Props) {
  const { page = "1", search = "" } = await searchParams;

  const currentPage = Number(page) || 1;

  const data = await getCountries(currentPage, search);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Countries</h1>

      <SearchBar initialQuery={search} />

     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {data?.data?.length > 0 ? (
    data.data.map((c: any) => (
      <Link key={c.code} href={`/countries/${c.code}`}>
       <div className="border p-4 rounded-xl shadow hover:shadow-lg transition cursor-pointer bg-white">
  
 

  <h2 className="font-semibold text-lg text-gray-800">
    {c.name}
  </h2>

  <p className="text-sm text-gray-600 mt-1">
    <span className="font-medium">Capital:</span> {c.capital || "N/A"}
  </p>

  <p className="text-sm text-gray-600">
    <span className="font-medium">Region:</span> {c.region}
  </p>

</div>
      </Link>
    ))
  ) : (
    <p className="col-span-3 text-center text-gray-500">
      No countries found
    </p>
  )}
</div>

      <div className="mt-6 flex gap-4">
        {currentPage > 1 && (
          <Link href={`/countries?page=${currentPage - 1}&search=${search}`}>
            <button className="ml-2 px-4 py-2 bg-blue-500 text-white">Prev</button>
          </Link>
        )}

        {currentPage < data.totalPages && (
          <Link href={`/countries?page=${currentPage + 1}&search=${search}`}>
            <button className="ml-2 px-4 py-2 bg-blue-500 text-white">Next</button>
          </Link>
        )}
      </div>
    </div>
  );
}