import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export function FloatingWhatsApp() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="https://wa.me/917989693477"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Chat on WhatsApp"
      style={{ bottom: "calc(1.5rem + env(safe-area-inset-bottom))" }}
      className="fixed right-6 z-50 flex items-center justify-center h-16 w-16 rounded-full bg-[#25D366] text-white shadow-[0_8px_32px_rgba(37,211,102,0.35)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.55)] transition-all duration-300 hover:scale-110 active:scale-95 group border border-white/20"
    >
      {/* Ambient Pulsing Glow Effect Behind Button */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 blur-lg group-hover:opacity-70 transition-opacity duration-300 pointer-events-none" />

      {/* Official WhatsApp Icon from react-icons */}
      <FaWhatsapp
        size={32}
        className="relative z-10 text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 drop-shadow-sm shrink-0"
      />

      {/* Pulsing online indicator dot */}
      <span className="absolute top-0.5 right-0.5 h-3.5 w-3.5 rounded-full bg-white flex items-center justify-center shadow-md z-20">
        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-75 animate-ping" />
        <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
      </span>

      {/* Dynamic Hover Tooltip */}
      {hovered && (
        <span className="absolute right-18 bg-slate-900/95 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-xl whitespace-nowrap animate-fade-in border border-white/10 backdrop-blur-md z-30">
          Chat with us on WhatsApp
        </span>
      )}
    </a>
  );
}
