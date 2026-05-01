"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RefreshButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);

    setTimeout(() => {
      router.refresh();
      setLoading(false);
    }, 1000);
  };

  return (
    <button
      onClick={handleRefresh}
      className="mt-3 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      disabled={loading}
    >
      {loading ? "Refreshing..." : "Refresh"}
    </button>
  );
}