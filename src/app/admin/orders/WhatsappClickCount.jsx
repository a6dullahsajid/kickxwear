"use client";

import { useEffect, useState } from "react";

export default function WhatsappClickCount() {
  const [clicks, setClicks] = useState(null);

  useEffect(() => {
    fetch("/api/whatsapp-clicks")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch WhatsApp clicks");
        return response.json();
      })
      .then((data) => setClicks(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <section className="mb-6 rounded-lg border bg-white p-4">
      <div className="text-sm text-gray-500">WhatsApp button clicks</div>
      <div className="mt-1 text-4xl font-extrabold">
        {clicks?.totalClicks ?? "-"}
      </div>
      {clicks?.clicksBySource?.length ? (
        <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-600">
          {clicks.clicksBySource.map((source) => (
            <span key={source._id}>
              {source._id}: {source.clicks}
            </span>
          ))}
        </div>
      ) : null}
    </section>
  );
}