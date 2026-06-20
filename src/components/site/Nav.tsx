import { useEffect, useState } from "react";
import { Menu, X, HeartPulse } from "lucide-react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#doctors", label: "Doctors" },
  { href: "#specialties", label: "Specialties" },
  { href: "#facilities", label: "Facilities" },
  { href: "#book", label: "Book Appointment" },
  { href: "#contact", label: "Contact" },
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

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={`glass-strong rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between transition-all ${
            scrolled ? "shadow-soft" : ""
          }`}
        >
          <a href="#home" className="flex items-center gap-2 shrink-0">
            <span className="grid h-9 w-9 place-items-center rounded-xl gradient-orange shadow-soft">
              <HeartPulse className="h-5 w-5" />
            </span>
            <span className="font-display font-extrabold text-lg gradient-text">
              Harsha Clinic
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {links.slice(0, -1).map((l) => (
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
              href="#book"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold text-white gradient-orange shadow-soft hover:shadow-glow transition-all hover:-translate-y-0.5"
            >
              Book Appointment
            </a>
            <button
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden grid place-items-center h-10 w-10 rounded-xl bg-violet/8 text-violet-deep"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden mt-2 glass-strong rounded-2xl p-3 animate-fade-up">
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
        )}
      </div>
    </header>
  );
}
