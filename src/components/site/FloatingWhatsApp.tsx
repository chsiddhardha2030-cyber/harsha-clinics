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
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group"
    >
      {/* WhatsApp SVG Icon */}
      <svg
        className="w-7 h-7 fill-current transition-transform duration-300 group-hover:rotate-6"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.489 0 9.952-4.414 9.955-9.847 0-2.632-1.025-5.105-2.887-6.969C16.48 1.96 14.018 1.04 11.997 1.041 6.51 1.041 2.046 5.456 2.043 10.89c-.001 1.5.399 2.97 1.157 4.26l.254.436-1.01 3.685 3.774-.99.43.255zm10.725-7.734c-.26-.13-1.534-.76-1.77-.845-.236-.085-.407-.13-.578.13s-.66.845-.808 1.013c-.148.168-.297.188-.557.057-2.122-1.063-3.479-2.314-4.32-3.766-.222-.382-.023-.589.176-.788.179-.179.397-.467.595-.7.198-.233.264-.4.396-.667.13-.267.065-.5-.033-.7-.098-.2-.578-1.402-.79-1.928-.207-.5-.443-.413-.578-.42-.118-.006-.254-.007-.39-.007-.136 0-.358.05-.545.253-.186.203-.71.693-.71 1.692 0 .998.724 1.96.825 2.094.1.134 1.424 2.174 3.45 3.05.482.207.859.332 1.153.426.483.154.924.132 1.272.08.388-.058 1.534-.627 1.75-.1.216.527.216 1.004 0 1.218s-.26.236-.578.136z" />
      </svg>

      {/* Pulsing indicator */}
      <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-white flex items-center justify-center shadow-md">
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping" />
        <span className="relative h-2 w-2 rounded-full bg-[#25D366]" />
      </span>

      {/* Dynamic tooltip */}
      {hovered && (
        <span className="absolute right-16 bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap animate-fade-in">
          Chat with us on WhatsApp
        </span>
      )}
    </a>
  );
}
