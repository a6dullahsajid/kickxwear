"use client";

export default function TrackedWhatsappLink({ source, className, children }) {
  const handleClick = () => {
    fetch("/api/whatsapp-clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source }),
      keepalive: true,
    }).catch((error) => {
      console.error("Failed to track WhatsApp click:", error);
    });
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