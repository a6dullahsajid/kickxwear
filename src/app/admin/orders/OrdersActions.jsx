"use client";

import { useState } from "react";

export default function OrdersActions({ id, initialStatus }) {
  const [status, setStatus] = useState(initialStatus || "Pending");
  const [loading, setLoading] = useState(false);

  const toggleProcessed = async () => {
    const newStatus = status === "Processed" ? "Pending" : "Processed";
    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        setStatus(newStatus);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleProcessed}
        disabled={loading}
        className={`px-3 py-1 cursor-pointer hover:bg-amber-400 rounded-lg text-sm ${
          status === "Processed" ? "bg-green-500 text-white" : "bg-yellow-300"
        }`}
      >
        {loading ? "..." : status === "Processed" ? "Processed" : "Mark Processed"}
      </button>
    </div>
  );
}
