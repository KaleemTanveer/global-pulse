"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DOMPurify from "dompurify";

import { useDispatch, useSelector } from "react-redux";
import { addSearch } from "../store/searchSlice";
import { RootState } from "../store/store";

export default function SearchBar({ 
  initialQuery = "", 
  onSearch,
  placeholder = "Search country...",
  category = "country"
}: { 
  initialQuery?: string;
  onSearch?: (query: string) => void;
  placeholder?: string;
  category?: "country" | "weather";
}) {
  const router = useRouter();
  const dispatch = useDispatch();

  const lastSearch = useSelector((state: RootState) => 
    category === "country" ? state.search.lastCountrySearch : state.search.lastWeatherSearch
  );
  console.log("🚀 ~ SearchBar ~ lastSearch:", lastSearch)

  const [query, setQuery] = useState(lastSearch || initialQuery);

  const handleSearch = () => {
    const clean = DOMPurify.sanitize(query); 
    if (clean) {
      dispatch(addSearch({ category, query: clean }));
    }

    if (onSearch) {
      onSearch(clean);
    } else {
      router.push(`/countries?page=1&search=${clean}`);
    }
  };

  return (
    <div className="mb-4">
      <div className="flex">
        <input
          className="border p-2 flex-grow max-w-md"
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
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}