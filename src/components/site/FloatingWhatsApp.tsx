import { useState } from "react";

export function FloatingWhatsApp() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="https://wa.me/918247815584"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.45)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.65)] transition-all duration-300 hover:scale-110 active:scale-95 group border-2 border-white/20"
    >
      {/* Ambient Pulsing Glow Effect Behind Button */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 blur-md group-hover:opacity-70 transition-opacity duration-300 pointer-events-none" />

      {/* Official WhatsApp SVG Icon - White inside Green */}
      <svg
        className="w-8 h-8 fill-white relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 drop-shadow-sm"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m0-18.333c-4.668 0-8.467 3.799-8.469 8.47 0 1.492.389 2.949 1.127 4.229l.169.292-.668 2.44 2.497-.654.283.168a8.423 8.423 0 004.06 1.05h.004c4.667 0 8.467-3.8 8.469-8.471.001-2.261-.878-4.387-2.479-5.99-1.601-1.601-3.728-2.483-5.993-2.484z" />
      </svg>

      {/* Pulsing online indicator dot */}
      <span className="absolute top-0.5 right-0.5 h-3.5 w-3.5 rounded-full bg-white flex items-center justify-center shadow-md z-20">
        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-75 animate-ping" />
        <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
      </span>

      {/* Dynamic Hover Tooltip */}
      {hovered && (
        <span className="absolute right-16 bg-slate-900/95 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-xl whitespace-nowrap animate-fade-in border border-white/10 backdrop-blur-md z-30">
          Chat with us on WhatsApp
        </span>
      )}
    </a>
  );
}
