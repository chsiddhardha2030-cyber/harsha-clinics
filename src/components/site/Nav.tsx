import { useEffect, useState } from "react";
import { Menu, X, HeartPulse } from "lucide-react";

const links = [
  { href: "/#home", label: "Home" },
  { href: "/#doctors", label: "Doctors" },
  { href: "/#about", label: "About" },
  { href: "/credentials", label: "Credentials" },
  { href: "/#specialties", label: "Specialties" },
  { href: "/#lab-tests", label: "Lab Tests" },
  { href: "/#ambulance", label: "Ambulance" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // Close menu on Escape key press
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={`relative z-50 glass-strong rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between transition-all ${
            scrolled ? "shadow-soft" : ""
          }`}
        >
          <a href="/#home" className="flex items-center gap-2.5 shrink-0 group">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-violet/10 bg-white p-0.5 shadow-soft transition-all duration-300 group-hover:scale-105 group-hover:shadow-glow">
              <img
                src="/Logo/Logo.jpg"
                alt="Harsha Clinics Logo"
                className="h-full w-full object-contain rounded-lg"
              />
            </div>
            <span className="font-display font-extrabold text-base sm:text-lg lg:text-xl gradient-text tracking-tight">
              Harsha Clinics
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-foreground/75 hover:text-foreground hover:bg-violet/8 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="/#appointment-form"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold text-white gradient-orange shadow-soft hover:shadow-glow transition-all hover:-translate-y-0.5"
            >
              Book Appointment
            </a>
            <button
              aria-label="Menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden grid place-items-center h-10 w-10 rounded-xl bg-violet/8 text-violet-deep"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <>
            {/* Clickable Backdrop */}
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden animate-fade-in"
              onClick={() => setOpen(false)}
            />
            {/* Drawer Menu */}
            <div
              id="mobile-menu"
              role="region"
              aria-label="Mobile Navigation"
              className="relative z-50 lg:hidden mt-2 glass-strong rounded-2xl p-3 animate-fade-up"
            >
              <div className="flex flex-col">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="px-3 py-3 rounded-lg text-sm font-medium hover:bg-violet/8"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
