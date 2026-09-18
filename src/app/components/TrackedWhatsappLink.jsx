"use client";

export default function TrackedWhatsappLink({ source, className, children }) {
  const handleClick = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/whatsapp-clicks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source }),
        keepalive: true,
      });

      if (!response.ok) {
        throw new Error(`Tracking failed with status ${response.status}`);
      }

      window.open("https://wa.me/918707697774", "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Failed to track WhatsApp click:", error);
      window.open("https://wa.me/918707697774", "_blank", "noopener,noreferrer");
    }
  };

  return (
    <a
      href="https://wa.me/918707697774"
      target="_blank"
      rel="noreferrer"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}