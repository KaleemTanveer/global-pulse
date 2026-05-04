"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DOMPurify from "dompurify";

export default function SearchBar({ 
  initialQuery = "", 
  onSearch,
  placeholder = "Search country..."
}: { 
  initialQuery?: string;
  onSearch?: (query: string) => void;
  placeholder?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSearch = () => {
    const clean = DOMPurify.sanitize(query); 
    if (onSearch) {
      onSearch(clean);
    } else {
      router.push(`/countries?page=1&search=${clean}`);
    }
  };

  return (
    <div className="mb-4">
      <input
        className="border p-2"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
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