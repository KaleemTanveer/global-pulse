"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar({ initialQuery = "" }) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/countries?page=1&search=${query}`);
  };

  return (
    <div className="mb-4">
      <input
        className="border p-2"
        placeholder="Search country..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="ml-2 px-4 py-2 bg-blue-500 text-white"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}