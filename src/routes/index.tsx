import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  Activity,
  Stethoscope,
  HeartPulse,
  Syringe,
  Pill,
  TestTube,
  ShieldCheck,
  Phone,
  MapPin,
  MessageSquare,
  Navigation,
  Star,
  Clock,
  Award,
  Users,
  Sparkles,
  Plus,
  Minus,
  Calendar,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Quote,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  CheckCircle2,
  Brain,
  Droplet,
  Wind,
  Microscope,
  Bandage,
  Baby,
  FlaskConical,
  ClipboardList,
  X,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Nav } from "@/components/site/Nav";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { toast } from "sonner";
import {
  useDoctorAvailability,
  DoctorAvailability,
  BranchStatus,
  DoctorSchedule,
} from "@/hooks/useDoctorAvailability";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileCarousel } from "@/components/ui/mobile-carousel";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/")({
  component: Home,
});

const SPECIALTIES = [
  { icon: HeartPulse, label: "Critical Care" },
  { icon: Activity, label: "ICU Cases" },
  { icon: Wind, label: "Ventilator Cases" },
  { icon: Bandage, label: "Emergency Medicine" },
  { icon: HeartPulse, label: "Heart Diseases" },
  { icon: Droplet, label: "Diabetes" },
  { icon: Activity, label: "Hypertension" },
  { icon: FlaskConical, label: "Thyroid Disorders" },
  { icon: TestTube, label: "High Cholesterol" },
  { icon: Wind, label: "Pneumonia" },
  { icon: Wind, label: "Asthma" },
  { icon: Brain, label: "Epilepsy" },
  { icon: Pill, label: "Gastric Problems" },
  { icon: FlaskConical, label: "Liver Disorders" },
  { icon: Droplet, label: "Kidney Diseases" },
  { icon: Wind, label: "Lung Diseases" },
  { icon: Microscope, label: "Dengue" },
  { icon: Microscope, label: "Malaria" },
  { icon: Microscope, label: "Typhoid" },
  { icon: ShieldCheck, label: "Covid-19" },
  { icon: Microscope, label: "Chikungunya" },
  { icon: Sparkles, label: "Allergies" },
  { icon: Activity, label: "Obesity" },
  { icon: Brain, label: "Paralysis" },
  { icon: Brain, label: "Headache" },
  { icon: Activity, label: "Joint Pain" },
  { icon: Brain, label: "Migraine" },
  { icon: Droplet, label: "Anemia" },
  { icon: Wind, label: "TB" },
  { icon: ShieldCheck, label: "HIV/STD" },
];

const FACILITIES = [
  { icon: ClipboardList, label: "GST Bills" },
  { icon: Activity, label: "ECG" },
  { icon: Droplet, label: "Blood Sugar Checkup" },
  { icon: HeartPulse, label: "BP Checkup" },
  { icon: Bandage, label: "Suturing" },
  { icon: Pill, label: "In-House Pharmacy" },
  { icon: TestTube, label: "Lab Tests" },
  { icon: Syringe, label: "Blood Collection" },
  { icon: Baby, label: "Day Care" },
  { icon: ShieldCheck, label: "Medical Fitness" },
  { icon: Activity, label: "Physical Fitness" },
  { icon: Stethoscope, label: "General Health Checkups" },
  { icon: Wind, label: "Nebulization" },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "Patient",
    text: "Dr. D. Ravi Kumar diagnosed my condition quickly and the treatment plan worked wonderfully. The clinic feels modern and the staff is incredibly kind.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    name: "Anil Reddy",
    role: "Patient",
    text: "Walked in for an emergency at night and was attended to immediately. Professional, calm and thorough. Highly recommend Harsha Clinics.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    name: "Lakshmi Rao",
    role: "Patient",
    text: "Dr. Pushpalatha is so warm and patient. She listened carefully and explained everything. Best family physician in Madhapur.",
    avatar: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    name: "Rahul Verma",
    role: "Patient",
    text: "In-house pharmacy and lab is a game changer — got everything done in one visit. Clean, quick and very affordable.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    name: "Sneha Iyer",
    role: "Patient",
    text: "Booked online, got a reminder, walked in on time. Felt like a 5-star healthcare experience right in our neighbourhood.",
    avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    name: "Mohammed Aslam",
    role: "Patient",
    text: "Critical care consultation here saved my father's recovery time. Forever grateful to the team at Harsha Clinics.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
  },
];

const FAQS = [
  {
    q: "What are the clinic timings?",
    a: "We are open every day from 10:00 AM to 10:00 PM. Emergency consultation is available on call.",
  },
  {
    q: "Do you accept walk-ins?",
    a: "Yes — walk-ins are welcome. Booking ahead reduces your wait.",
  },
  {
    q: "Is emergency care available?",
    a: "Yes. We offer emergency consultation, suturing, nebulization and stabilization during clinic hours.",
  },
  {
    q: "Are lab tests available?",
    a: "Yes — blood collection, blood sugar, ECG and a wide range of lab tests are available in-house.",
  },
  { q: "Is pharmacy available?", a: "Yes, an in-house pharmacy serves all our patients." },
  {
    q: "Can I book online?",
    a: "Absolutely. Use the Book Appointment form on this page or tap the floating WhatsApp button to chat directly with us.",
  },
];

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        {(eyebrow || title || subtitle) && (
          <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
            {eyebrow && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-violet-deep bg-violet/8 mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold gradient-text leading-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

const HERO_SLIDES = [
  "/hero/slide1.png",
  "/hero/slide2.png",
  "/hero/slide3.png",
  "/hero/slide4.png",
  "/hero/slide5.png",
];

const CURATED_PALETTES: { [key: string]: [string, string, string] } = {
  "/hero/slide1.png": ["rgb(186, 230, 253)", "rgb(224, 242, 254)", "rgb(243, 244, 246)"], // Soft Sky Blue
  "/hero/slide2.png": ["rgb(233, 213, 255)", "rgb(243, 232, 255)", "rgb(250, 245, 255)"], // Lavender
  "/hero/slide3.png": ["rgb(207, 250, 254)", "rgb(224, 242, 254)", "rgb(243, 244, 246)"], // Light Cyan
  "/hero/slide4.png": ["rgb(255, 237, 213)", "rgb(254, 243, 199)", "rgb(255, 251, 235)"], // Warm Peach
  "/hero/slide5.png": ["rgb(209, 250, 229)", "rgb(236, 253, 245)", "rgb(240, 253, 250)"], // Soft Mint
};

function parseRgb(rgbStr: string): [number, number, number] {
  const match = rgbStr.match(/\d+/g);
  if (!match || match.length < 3) return [255, 255, 255];
  return [parseInt(match[0], 10), parseInt(match[1], 10), parseInt(match[2], 10)];
}

function blendColors(predStr: string, extStr: string, weightExt: number = 0.25): string {
  const [pr, pg, pb] = parseRgb(predStr);
  const [er, eg, eb] = parseRgb(extStr);

  const r = Math.round(pr * (1 - weightExt) + er * weightExt);
  const g = Math.round(pg * (1 - weightExt) + eg * weightExt);
  const b = Math.round(pb * (1 - weightExt) + eb * weightExt);

  return `rgb(${r}, ${g}, ${b})`;
}

function getRgba(rgbStr: string, opacity: number): string {
  const match = rgbStr.match(/\d+/g);
  if (!match || match.length < 3) return rgbStr;
  return `rgba(${match[0]}, ${match[1]}, ${match[2]}, ${opacity})`;
}

function extractDominantColors(imageUrl: string): Promise<string[]> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(["rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)"]);
          return;
        }
        canvas.width = 10;
        canvas.height = 10;
        ctx.drawImage(img, 0, 0, 10, 10);
        const data = ctx.getImageData(0, 0, 10, 10).data;
        const colorCounts: { [key: string]: number } = {};
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          if (a < 200) continue;

          const qr = Math.round(r / 32) * 32;
          const qg = Math.round(g / 32) * 32;
          const qb = Math.round(b / 32) * 32;

          const luma = 0.2126 * qr + 0.7152 * qg + 0.0722 * qb;
          if (luma < 40 || luma > 225) continue;

          const rgb = `rgb(${qr}, ${qg}, ${qb})`;
          colorCounts[rgb] = (colorCounts[rgb] || 0) + 1;
        }
        const sorted = Object.keys(colorCounts).sort((a, b) => colorCounts[b] - colorCounts[a]);
        if (sorted.length >= 3) {
          resolve(sorted.slice(0, 3));
        } else {
          const fallbacks = ["rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)"];
          const combined = [...sorted];
          for (const f of fallbacks) {
            if (combined.length < 3 && !combined.includes(f)) {
              combined.push(f);
            }
          }
          resolve(combined);
        }
      } catch (e) {
        resolve(["rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)"]);
      }
    };
    img.onerror = () => {
      resolve(["rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(255, 255, 255)"]);
    };
  });
}

function Hero({ branches }: { branches: BranchStatus[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  const madhapurBranch = branches.find((b) => b.name.toLowerCase().includes("madhapur")) || {
    name: "Madhapur",
    isOpen: true,
    openingTime: "10:00 AM",
    closingTime: "10:00 PM",
  };
  const tngoBranch = branches.find((b) => b.name.toLowerCase().includes("tngo")) || {
    name: "TNGO Colony",
    isOpen: true,
    openingTime: "10:00 AM",
    closingTime: "10:00 PM",
  };
  const branchList = [madhapurBranch, tngoBranch];

  // Color state containing blended colors for each slide
  const [slideColors, setSlideColors] = useState<{ [key: string]: [string, string, string] }>(
    CURATED_PALETTES,
  );

  // Trigger color extraction and blending on mount
  useEffect(() => {
    let active = true;
    HERO_SLIDES.forEach(async (slide) => {
      const extracted = await extractDominantColors(slide);
      if (!active) return;
      const curated = CURATED_PALETTES[slide];
      // Blend 75% curated colors with 25% extracted colors to preserve hospital aesthetics
      const blended: [string, string, string] = [
        blendColors(curated[0], extracted[0] || "rgb(255, 255, 255)", 0.25),
        blendColors(curated[1], extracted[1] || "rgb(255, 255, 255)", 0.25),
        blendColors(curated[2], extracted[2] || "rgb(255, 255, 255)", 0.25),
      ];
      setSlideColors((prev) => ({
        ...prev,
        [slide]: blended,
      }));
    });
    return () => {
      active = false;
    };
  }, []);

  // Set up event listeners to clear isHovered on scroll or when window loses focus
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsHovered(false);
      }
    };
    const handleBlur = () => {
      setIsHovered(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("blur", handleBlur);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  // Autoplay interval with proper cleanup
  useEffect(() => {
    if (isHovered && !isMobile) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isHovered, isMobile]);

  const currentColors =
    slideColors[HERO_SLIDES[currentIndex]] || CURATED_PALETTES[HERO_SLIDES[currentIndex]];

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-background min-h-[85vh] flex items-center pt-20 pb-12 md:pt-20 md:pb-16 lg:pt-16 lg:pb-14"
      onMouseEnter={() => {
        if (!isMobile) setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background ambient layers for each slide to support smooth GPU-accelerated opacity cross-fade */}
      {HERO_SLIDES.map((slide, index) => {
        const colors = slideColors[slide] || CURATED_PALETTES[slide];
        return (
          <div
            key={`bg-ambient-${slide}`}
            className="absolute inset-0 pointer-events-none -z-20 transition-opacity duration-[2500ms] ease-in-out"
            style={{
              opacity: index === currentIndex ? 1 : 0,
              backgroundImage: `
                radial-gradient(circle at 75% 30%, ${getRgba(colors[0], 0.12)} 0%, transparent 65%),
                radial-gradient(circle at 25% 70%, ${getRgba(colors[1], 0.08)} 0%, transparent 70%),
                radial-gradient(circle at 60% 50%, ${getRgba(colors[2], 0.05)} 0%, transparent 75%),
                radial-gradient(circle at 10% 15%, ${getRgba(colors[0], 0.04)} 0%, transparent 50%)
              `,
            }}
          />
        );
      })}

      {/* Subtle Vignette to naturally blend edges into page background */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          backgroundImage: `radial-gradient(circle at center, transparent 35%, var(--background) 95%)`,
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Content Area */}
          <div className="lg:col-span-5 flex items-center order-2 lg:order-1 pt-4 pb-8 lg:py-12">
            <div className="animate-fade-up text-left max-w-xl mx-auto lg:mx-0 w-full">
              <div className="flex flex-wrap items-center gap-2.5 mb-4 sm:mb-6">
                {branchList.map((b) => (
                  <div
                    key={b.name}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-violet-deep glass"
                  >
                    {b.isOpen ? (
                      <>
                        <span>🟢</span>
                        <span>
                          {b.name}: Open today • {b.openingTime} - {b.closingTime}
                        </span>
                      </>
                    ) : (
                      <>
                        <span>🔴</span>
                        <span>{b.name}: Closed Today</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] text-foreground">
                Advanced Healthcare.{" "}
                <span className="gradient-text">Compassionate Care.</span>
              </h1>
              <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-muted-foreground leading-relaxed">
                Your all-in-one healthcare destination for expert clinical care, pharmacy services, and advanced diagnostics.
              </p>
              <div className="mt-5 sm:mt-7 flex flex-wrap gap-3">
                <a
                  href="#appointment-form"
                  className="inline-flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 rounded-2xl text-sm font-semibold text-white gradient-orange shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition-all"
                >
                  <Calendar className="h-4 w-4" />
                  Book Appointment
                </a>
                <a
                  href="tel:+918309403610"
                  className="inline-flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 rounded-2xl text-sm font-semibold text-violet-deep glass-strong hover:-translate-y-0.5 transition-all"
                >
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
              </div>

              <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-3 max-w-md">
                {[
                  { k: "4.9★", v: "Rated by Patients" },
                  { k: "20+", v: "Years Experience" },
                  { k: "15k+", v: "Happy Patients" },
                ].map((s) => (
                  <div
                    key={s.v}
                    className="glass rounded-2xl px-2 py-2.5 sm:p-3 text-center animate-hover"
                  >
                    <div className="font-display text-base sm:text-xl font-extrabold gradient-text leading-none">
                      {s.k}
                    </div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground mt-1 leading-tight">
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Image Slider Area */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex items-center justify-center relative w-full aspect-[16/11] sm:aspect-[16/10] md:h-[400px] lg:h-[460px] xl:h-[500px]">
            {/* Primary Ambient Glow Layers (cross-fading opacity instead of gradient for smooth rendering) */}
            {HERO_SLIDES.map((slide, index) => {
              const colors = slideColors[slide] || CURATED_PALETTES[slide];
              return (
                <div
                  key={`glow-primary-${slide}`}
                  className="absolute w-[85%] h-[85%] rounded-full filter blur-[95px] opacity-70 pointer-events-none transition-opacity duration-[2500ms] ease-in-out"
                  style={{
                    opacity: index === currentIndex ? 1 : 0,
                    background: `radial-gradient(circle, ${getRgba(colors[0], 0.32)} 0%, ${getRgba(colors[1], 0.12)} 60%, transparent 100%)`,
                  }}
                />
              );
            })}

            {/* Secondary Ambient Glow Layers */}
            {HERO_SLIDES.map((slide, index) => {
              const colors = slideColors[slide] || CURATED_PALETTES[slide];
              return (
                <div
                  key={`glow-secondary-${slide}`}
                  className="absolute w-[65%] h-[65%] rounded-full filter blur-[65px] opacity-75 pointer-events-none transition-opacity duration-[2500ms] ease-in-out"
                  style={{
                    opacity: index === currentIndex ? 1 : 0,
                    background: `radial-gradient(circle, ${getRgba(colors[1], 0.18)} 0%, transparent 80%)`,
                  }}
                />
              );
            })}

            {/* Image Frame with aggressively feathered/melted edges */}
            <div
              className="relative w-full h-full max-w-[620px] max-h-[440px] pointer-events-none"
              style={{
                maskImage:
                  "radial-gradient(circle at center, black 15%, rgba(0,0,0,0.72) 45%, rgba(0,0,0,0.12) 72%, transparent 96%)",
                WebkitMaskImage:
                  "radial-gradient(circle at center, black 15%, rgba(0,0,0,0.72) 45%, rgba(0,0,0,0.12) 72%, transparent 96%)",
              }}
            >
              {HERO_SLIDES.map((slide, index) => (
                <div
                  key={slide}
                  className={`absolute inset-0 pointer-events-none`}
                  style={{
                    opacity: index === currentIndex ? 1 : 0,
                    transform: index === currentIndex ? "scale(1.00)" : "scale(1.05)",
                    transition: "opacity 2500ms ease-in-out, transform 2500ms ease-in-out",
                  }}
                >
                  <img
                    src={slide}
                    alt={`Clinic slide ${index + 1}`}
                    className="w-full h-full object-cover rounded-3xl"
                    style={{ filter: "brightness(93%) contrast(104%)" }}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>

            {/* Edge blending overlay gradient using the app background color */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at center, transparent 35%, rgba(248, 250, 252, 0.25) 60%, var(--background) 95%)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Section id="about">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        {/* Left Column: Premium Poster Image inside a Glassmorphism Frame */}
        <div className="lg:col-span-6 flex items-center justify-center w-full max-w-[450px] mx-auto lg:mx-0 select-none group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-violet/20 to-orange-start/15 rounded-[28px] blur-xl opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <div className="w-full relative glass-strong border border-white/30 p-3 sm:p-4 rounded-[28px] shadow-2xl transition-all duration-500 hover:scale-[1.01] hover:shadow-glow bg-white/90">
            <div className="overflow-hidden rounded-[16px] shadow-inner bg-slate-50/50 flex items-center justify-center">
              <img
                src="/extras/IMG-20260619-WA0120.jpg"
                alt="Harsha Clinics, Pharmacy &amp; Diagnostics Poster"
                className="w-full h-auto object-cover rounded-[16px] transition-transform duration-500 group-hover:scale-102"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Text & Features Content */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-violet-deep bg-violet/8 mb-4 w-fit">
            <Sparkles className="h-3.5 w-3.5 text-orange-start" />
            Who We Are
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-extrabold leading-tight text-foreground mb-4">
            Harsha Clinics, Pharmacy &amp; Diagnostics
          </h2>

          {/* Tagline highlighted quote block */}
          <div className="relative glass-strong border border-violet/10 rounded-2xl p-4 sm:p-5 mb-5 shadow-soft overflow-hidden">
            <div className="absolute -top-6 -right-6 h-12 w-12 rounded-full bg-violet/5 blur-xl" />
            <div className="relative flex gap-3 items-start">
              <Quote className="h-5 w-5 text-orange-start shrink-0 mt-1 transform rotate-180" />
              <p className="font-display font-bold italic text-base sm:text-lg text-violet-deep leading-relaxed">
                "Happiness is the Highest Form of Health"
              </p>
            </div>
          </div>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4 max-w-xl">
            Harsha Clinics, Pharmacy &amp; Diagnostics is a comprehensive healthcare center dedicated to providing affordable, accessible, and quality medical care. We offer expert consultations, diagnostic services, pharmacy support, preventive healthcare, and emergency medical management under one roof.
          </p>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
            With a patient-centric approach, we strive to deliver timely and effective healthcare solutions to individuals and families across Hyderabad.
          </p>

          {/* Accordion trigger button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-sm font-bold text-white gradient-orange shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition-all w-fit cursor-pointer mb-2 animate-hover"
          >
            <span>{isExpanded ? "Show Less" : "Our Vision & Mission"}</span>
            {isExpanded ? (
              <Minus className="h-4 w-4 shrink-0 transition-transform duration-300" />
            ) : (
              <Plus className="h-4 w-4 shrink-0 transition-transform duration-300" />
            )}
          </button>
        </div>
      </div>

      {/* Expandable Section with smooth grid accordion height animation */}
      <div
        className={`grid transition-all duration-500 ease-in-out ${isExpanded ? "grid-rows-[1fr] opacity-100 mt-8" : "grid-rows-[0fr] opacity-0"
          }`}
      >
        <div className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 pb-2">
            {/* Vision Card */}
            <div className="p-5 sm:p-6 rounded-[24px] glass-strong border border-violet/10 hover:border-violet/20 hover:shadow-soft transition-all duration-300 text-left bg-white/5">
              <div className="flex items-center gap-3 mb-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-violet/8 text-violet-deep">
                  <Sparkles className="h-5 w-5 text-orange-start" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">
                  Our Vision
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                To become the most trusted neighborhood healthcare provider by delivering compassionate, evidence-based, and affordable medical services.
              </p>
            </div>

            {/* Mission Card */}
            <div className="p-5 sm:p-6 rounded-[24px] glass-strong border border-violet/10 hover:border-violet/20 hover:shadow-soft transition-all duration-300 text-left bg-white/5">
              <div className="flex items-center gap-3 mb-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-violet/8 text-violet-deep">
                  <CheckCircle2 className="h-5 w-5 text-orange-start" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">
                  Our Mission
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-violet-deep mt-0.5">•</span>
                  <span>Provide quality healthcare accessible to all.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-deep mt-0.5">•</span>
                  <span>Promote preventive and wellness-focused healthcare.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-deep mt-0.5">•</span>
                  <span>Deliver timely diagnosis and treatment.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-deep mt-0.5">•</span>
                  <span>Ensure patient satisfaction through ethical medical practice.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Full-width Closing Statement Banner */}
          <div className="mt-6 p-5 sm:p-6 rounded-[24px] glass-strong border border-violet/15 text-center relative overflow-hidden bg-gradient-to-r from-violet/5 via-orange-start/3 to-transparent">
            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
            <p className="text-base sm:text-lg font-bold text-foreground leading-relaxed">
              Providing Trusted Healthcare for Families Since Day One.
            </p>
            <p className="text-violet-deep font-display font-extrabold text-lg sm:text-xl mt-1 tracking-wide">
              "Your Health, Our Commitment."
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function DoctorCard({
  name,
  qualifications,
  roles,
  reg,
  image,
  availability,
  onBook,
}: {
  name: string;
  qualifications: string;
  roles: string[];
  reg: string;
  image?: string;
  availability?: DoctorAvailability;
  onBook?: () => void;
}) {
  return (
    <div className="group relative glass-strong rounded-[28px] p-4 sm:p-5 overflow-hidden hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full border border-violet/10 hover:border-violet/20 hover:shadow-glow">
      {/* Background soft ambient glows */}
      <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-violet/10 blur-3xl group-hover:bg-violet/20 transition-all duration-500" />
      <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-orange-start/5 blur-3xl group-hover:bg-orange-start/10 transition-all duration-500" />

      <div className="relative flex flex-col items-center text-center space-y-4 flex-grow">
        {/* Centered Circular Image Container */}
        <div className="relative w-[130px] h-[130px] md:w-[150px] md:h-[150px] lg:w-[210px] lg:h-[210px] rounded-full overflow-hidden border-[3px] border-white shadow-md bg-white flex-shrink-0 group-hover:scale-105 transition-all duration-300 mx-auto">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover object-[center_20%]"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full gradient-orange grid place-items-center font-display text-2xl font-extrabold text-white">
              {name.split(" ").pop()?.substring(0, 2) || "Dr"}
            </div>
          )}
        </div>

        {/* Doctor Info */}
        <div className="w-full space-y-3">
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-extrabold text-foreground group-hover:gradient-text transition-all leading-tight">
              {name}
            </h3>
            <p className="text-sm font-bold text-violet-deep mt-0.5">{qualifications}</p>
          </div>

          {/* TSMC Registered Badge & Availability Badge side by side */}
          <div className="flex flex-wrap justify-center gap-2">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-violet-deep bg-violet/8 border border-violet/10">
              <Award className="h-3 w-3 text-orange-start shrink-0" />
              <span>TSMC Registered</span>
            </div>

            {availability &&
              (availability.available ? (
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-500/10 text-green-600 text-[10px] font-bold border border-green-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span>
                    Available:{" "}
                    {availability.currentBranch.toLowerCase().includes("madhapur")
                      ? "Madhapur"
                      : "TNGO's Colony"}
                  </span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-600 text-[10px] font-bold border border-red-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  <span>Not Available Today</span>
                </div>
              ))}
          </div>

          {/* Specialties / Roles */}
          <div className="text-left bg-violet/4 rounded-2xl p-3 sm:p-4 border border-violet/5 space-y-1.5">
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-center sm:text-left">
              Specializations
            </div>
            <ul className="space-y-1 sm:space-y-1.5">
              {roles.map((r) => (
                <li
                  key={r}
                  className="flex items-center gap-2 text-xs sm:text-sm text-foreground/80 font-medium"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-violet shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Card Action & Meta Footer */}
      <div className="relative mt-4 pt-4 border-t border-border flex items-center justify-between gap-4 flex-wrap w-full">
        <div className="text-left">
          <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
            Registration
          </div>
          <div className="font-mono text-xs font-semibold text-foreground/95">{reg}</div>
        </div>
        <a
          href="#appointment-form"
          onClick={onBook}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white gradient-orange hover:shadow-glow transition-all hover:-translate-y-0.5"
        >
          Book Consultation
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}

function Doctors({
  doctors,
  onSelectDoctorAndBranch,
}: {
  doctors: DoctorAvailability[];
  onSelectDoctorAndBranch: (doctor: string, branch: string) => void;
}) {
  const drRaviAvail = doctors.find((d) => d.name.toLowerCase().includes("ravi"));
  const drPushpalathaAvail = doctors.find((d) => d.name.toLowerCase().includes("pushpalatha"));

  const mapBranchName = (b: string | null | undefined) => {
    if (!b) return "Madhapur";
    if (b.toLowerCase().includes("tngo")) return "TNGO's Colony";
    return b;
  };

  return (
    <Section
      id="doctors"
      eyebrow="Meet our doctors"
      title="Skilled, certified and genuinely caring"
      subtitle="Backed by years of clinical experience, our doctors bring world-class expertise to your neighbourhood."
    >
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        <DoctorCard
          name="Dr. D. Ravi Kumar"
          qualifications="MBBS, DEM, FCCM"
          roles={["General Physician & Surgeon", "Emergency Physician", "Consultant Critical Care"]}
          reg="TSMC/FMR/03090"
          image="/doctors/Doctor%20photo.jpg"
          availability={drRaviAvail}
          onBook={() =>
            onSelectDoctorAndBranch("Dr. D. Ravi Kumar", mapBranchName(drRaviAvail?.currentBranch))
          }
        />
        <DoctorCard
          name="Dr. P. Pushpalatha"
          qualifications="BAMS"
          roles={["Female Specialist", "Family Physician"]}
          reg="544/A"
          image="/doctors/Madam%20photo.jpg"
          availability={drPushpalathaAvail}
          onBook={() =>
            onSelectDoctorAndBranch(
              "Dr. P. Pushpalatha",
              mapBranchName(drPushpalathaAvail?.currentBranch),
            )
          }
        />
      </div>

      <div className="mt-8 text-center flex justify-center">
        <Link
          to="/credentials"
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold text-violet-deep bg-violet/8 border border-violet/20 hover:bg-violet/15 hover:shadow-soft transition-all hover:-translate-y-0.5"
        >
          <Award className="h-4 w-4 text-orange-start shrink-0" />
          <span>View All Certifications & Verified Credentials</span>
          <ArrowRight className="h-4 w-4 shrink-0" />
        </Link>
      </div>
    </Section>
  );
}

function ExpandableGrid<
  T extends { label: string; icon: React.ComponentType<{ className?: string }> },
>({
  items,
  initial,
  showAllLabel,
  showLessLabel,
  cardClass,
  iconWrapClass,
  gridClass,
}: {
  items: T[];
  initial: number;
  showAllLabel: string;
  showLessLabel: string;
  cardClass: string;
  iconWrapClass: string;
  gridClass: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, initial);
  return (
    <>
      <div className={gridClass}>
        {visible.map((s, i) => {
          const Icon = s.icon;
          const isNew = i >= initial;
          return (
            <div
              key={s.label}
              className={cardClass}
              style={
                isNew
                  ? {
                    animation: `fade-up 0.5s ease-out ${(i - initial) * 50}ms both`,
                  }
                  : undefined
              }
            >
              <div className={iconWrapClass}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-sm font-semibold text-foreground leading-tight">{s.label}</div>
            </div>
          );
        })}
      </div>
      {items.length > initial && (
        <div className="mt-10 sm:mt-12 flex justify-center">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold text-white gradient-orange shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition-all"
          >
            {expanded ? showLessLabel : showAllLabel}
            {expanded ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </button>
        </div>
      )}
    </>
  );
}

const FEATURED_SPECIALTIES = [
  {
    title: "Family Medicine",
    desc: "Compassionate primary healthcare including complete diagnostic checkups, wellness advice, and preventive care for family members of all ages.",
    image: "/extras/IMG-20260619-WA0120.jpg",
    icon: Stethoscope,
    anchor: "/specialties#family-medicine",
  },
  {
    title: "Cardiology",
    desc: "Specialized cardiac assessments, ECG tests, blood pressure checkups, and expert management for complex cardiovascular conditions.",
    image: "/extras/IMG-20260619-WA0109.jpg",
    icon: HeartPulse,
    anchor: "/specialties#cardiology",
  },
  {
    title: "Nephrology",
    desc: "Dedicated clinical support for kidney diseases, electrolyte imbalance corrections, and coordinated care for outpatient dialysis.",
    image: "/extras/IMG-20260626-WA0014.jpg",
    icon: Droplet,
    anchor: "/specialties#nephrology",
  },
  {
    title: "Diabetes Care",
    desc: "Advanced therapeutic regimens, regular blood glucose evaluations, diet planning, and management of secondary diabetic symptoms.",
    image: "/extras/IMG-20260619-WA0107.jpg",
    icon: Activity,
    anchor: "/specialties#diabetes-care",
  },
  {
    title: "Emergency Medicine",
    desc: "Equipped to handle urgent clinical needs including minor surgeries, suturing, immediate patient stabilization, and nebulization.",
    image: "/extras/IMG-20260619-WA0108.jpg",
    icon: Bandage,
    anchor: "/specialties#emergency-medicine",
  },
  {
    title: "Diagnostics & Labs",
    desc: "Prompt and accurate clinical testing using state-of-the-art laboratory devices to ensure rapid confirmation and reliable results.",
    image: "/extras/Facilities/IMG-20260626-WA0001.jpg",
    icon: Microscope,
    anchor: "/specialties#diagnostics",
  },
];

function Specialties() {
  return (
    <Section
      id="specialties"
      eyebrow="Specialties"
      title="Comprehensive care under one roof"
      subtitle="From everyday concerns to complex conditions — we treat a broad range of medical needs with precision and warmth."
    >
      {/* Desktop/Tablet Grid */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
        {FEATURED_SPECIALTIES.slice(0, 4).map((spec, i) => {
          const Icon = spec.icon;
          return (
            <Link
              to="/specialties"
              hash={spec.anchor.split("#")[1]}
              key={spec.title}
              className="group glass-strong rounded-[24px] overflow-hidden hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full shadow-soft hover:shadow-glow border border-violet/10 hover:border-violet/20 cursor-pointer block text-left"
            >
              {/* Image Container */}
              <div className="aspect-[16/10] w-full overflow-hidden relative bg-slate-100">
                <img
                  src={spec.image}
                  alt={spec.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Floating department icon badge */}
                <div className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-xl bg-white/90 backdrop-blur-sm text-violet-deep shadow-md">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow text-left">
                <h3 className="font-display text-base sm:text-lg font-bold text-foreground mb-2 group-hover:gradient-text transition-colors">
                  {spec.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex-grow mb-4 line-clamp-3">
                  {spec.desc}
                </p>
                <div
                  className="inline-flex items-center gap-1 text-xs font-bold text-violet hover:text-violet-deep transition-colors mt-auto"
                >
                  <span>Learn More</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Mobile Carousel */}
      <MobileCarousel>
        {FEATURED_SPECIALTIES.map((spec, i) => {
          const Icon = spec.icon;
          return (
            <Link
              to="/specialties"
              hash={spec.anchor.split("#")[1]}
              key={spec.title}
              className="group glass-strong rounded-[24px] overflow-hidden flex flex-col h-full shadow-soft border border-violet/10 cursor-pointer block text-left"
            >
              {/* Image Container */}
              <div className="aspect-[16/10] w-full overflow-hidden relative bg-slate-100">
                <img
                  src={spec.image}
                  alt={spec.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                {/* Floating department icon badge */}
                <div className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-xl bg-white/90 backdrop-blur-sm text-violet-deep shadow-md">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow text-left">
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {spec.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-grow mb-4 line-clamp-3">
                  {spec.desc}
                </p>
                <div
                  className="inline-flex items-center gap-1 text-xs font-bold text-violet hover:text-violet-deep transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </Link>
          );
        })}
      </MobileCarousel>

      {/* Centered Button to View All Specialties */}
      <div className="mt-8 sm:mt-12 flex justify-center">
        <Link
          to="/specialties"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-white gradient-orange shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition-all"
        >
          View All 35+ Specialties
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}

function AwardsAndRecognition() {
  return (
    <Section id="awards">
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Side: Award Image Card */}
        <div className="lg:col-span-5 flex items-center justify-center w-full max-w-[450px] mx-auto lg:mx-0 select-none group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-start/20 rounded-[28px] blur-xl opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <div className="w-full relative glass-strong border border-white/30 p-3 sm:p-4 rounded-[28px] shadow-2xl transition-all duration-500 hover:scale-[1.01] hover:shadow-glow bg-white/90">
            <div className="overflow-hidden rounded-[16px] shadow-inner bg-slate-50/50 flex items-center justify-center">
              <img
                src="/Awards/IMG_20260626_084430.jpg"
                alt="Dr. A.P.J. Abdul Kalam Health & Medical Excellence Best Doctor Award 2024"
                className="w-full h-auto object-cover rounded-[16px] transition-transform duration-500 group-hover:scale-102"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-500/10 border border-amber-500/20">
            <Award className="h-4 w-4 text-amber-500 shrink-0" />
            <span>🏆 Awards &amp; Recognition</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-foreground">
            Recognized for <span className="gradient-text">Medical Excellence</span>
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            We are honored to share that <strong className="text-foreground font-semibold">Dr. D. Ravi Kumar</strong> was conferred with the prestigious <strong className="text-foreground font-semibold">Dr. A.P.J. Abdul Kalam Health &amp; Medical Excellence Best Doctor Award – 2024</strong>. This accolade recognizes exceptional dedication, clinical expertise, and pioneering contributions to patient care, emergency medicine, and critical care across Hyderabad.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl glass border border-violet/10">
              <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Award Title</div>
              <div className="text-xs sm:text-sm font-bold text-foreground mt-1">Best Doctor Award</div>
            </div>
            <div className="p-3.5 rounded-2xl glass border border-violet/10">
              <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Award Year</div>
              <div className="text-xs sm:text-sm font-bold text-violet-deep mt-1">2024</div>
            </div>
            <div className="p-3.5 rounded-2xl glass border border-violet/10 col-span-2 sm:col-span-1">
              <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Category</div>
              <div className="text-xs sm:text-sm font-bold text-foreground mt-1">Healthcare &amp; Critical Care</div>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/credentials"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-sm font-bold text-white gradient-orange shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition-all"
            >
              <Award className="h-4 w-4 shrink-0" />
              <span>View Credentials &amp; Certifications</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Facilities() {
  return (
    <Section
      id="facilities"
      eyebrow="Facilities"
      title="Everything you need, in one visit"
      subtitle="Modern diagnostics, in-house pharmacy and supportive services for a seamless healthcare experience."
    >
      <ExpandableGrid
        items={FACILITIES}
        initial={6}
        showAllLabel={`View All Facilities (${FACILITIES.length})`}
        showLessLabel="Show Less"
        gridClass="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6"
        cardClass="group glass-strong rounded-3xl p-5 sm:p-6 hover:-translate-y-1 transition-all duration-300"
        iconWrapClass="grid h-12 w-12 place-items-center rounded-2xl gradient-orange text-white shadow-soft mb-3"
      />
    </Section>
  );
}

const TIME_SLOTS = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
  "10:00 PM",
];

function formatSqlTime(timeStr: string): string {
  if (!timeStr) return "";
  const parts = timeStr.split(":");
  let hours = parseInt(parts[0], 10);
  const minutes = parts[1] || "00";
  if (isNaN(hours)) return timeStr;
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  if (hours === 0) hours = 12;
  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  return `${formattedHours}:${minutes} ${ampm}`;
}

function timeToMinutes(t: string): number {
  if (!t) return 0;
  const clean = t.trim().toUpperCase();
  let hours = 0;
  let minutes = 0;

  if (clean.includes("AM") || clean.includes("PM")) {
    const isPM = clean.includes("PM");
    const isAM = clean.includes("AM");
    const timePart = clean.replace("AM", "").replace("PM", "").trim();
    const parts = timePart.split(":");
    hours = parseInt(parts[0], 10) || 0;
    minutes = parseInt(parts[1], 10) || 0;
    if (isPM && hours < 12) hours += 12;
    if (isAM && hours === 12) hours = 0;
  } else {
    const parts = clean.split(":");
    hours = parseInt(parts[0], 10) || 0;
    minutes = parseInt(parts[1], 10) || 0;
  }
  return hours * 60 + minutes;
}

function formatBranchDisplayName(bName: string): string {
  if (!bName) return "Madhapur Branch";
  let name = bName.trim();
  if (name.toLowerCase().includes("tngo")) {
    name = "TNGO Colony";
  } else if (name.toLowerCase().includes("madhapur")) {
    name = "Madhapur";
  }
  if (!name.toLowerCase().endsWith("branch")) {
    name = `${name} Branch`;
  }
  return name;
}

function BookingForm({
  doctors,
  branches,
  schedules,
  selectedDoctor,
  selectedBranch,
  setSelectedDoctor,
  setSelectedBranch,
}: {
  doctors: DoctorAvailability[];
  branches: BranchStatus[];
  schedules: DoctorSchedule[];
  selectedDoctor: string;
  selectedBranch: string;
  setSelectedDoctor: (doctor: string) => void;
  setSelectedBranch: (branch: string) => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [preferredTime, setPreferredTime] = useState("10:00");
  const isMobile = useIsMobile();

  useEffect(() => {
    setPreferredTime("10:00");
  }, [isMobile]);

  const selectedDocObj = doctors.find((d) => d.name === selectedDoctor);
  const docId = selectedDocObj ? selectedDocObj.id : (selectedDoctor.includes("Ravi") ? 1 : 2);

  const availableSchedules = schedules.filter(
    (s) => s.doctor_id === docId && s.is_available
  );

  const availableBranches = availableSchedules.map((s) =>
    s.branch_name.toLowerCase().includes("tngo") ? "TNGO's Colony" : "Madhapur"
  );

  const showBranchSelect = availableBranches.length >= 2;

  useEffect(() => {
    if (selectedDoctor && availableBranches.length === 1) {
      if (selectedBranch !== availableBranches[0]) {
        setSelectedBranch(availableBranches[0]);
      }
    } else if (selectedDoctor && availableBranches.length >= 2) {
      if (selectedBranch && !(availableBranches as string[]).includes(selectedBranch)) {
        setSelectedBranch(availableBranches[0]);
      }
    }
  }, [selectedDoctor, availableBranches, selectedBranch, setSelectedBranch]);

  const currentSchedule = availableSchedules.find((s) => {
    const bName = s.branch_name.toLowerCase();
    if (selectedBranch.toLowerCase().includes("madhapur") && bName.includes("madhapur")) return true;
    if (selectedBranch.toLowerCase().includes("tngo") && bName.includes("tngo")) return true;
    return false;
  });

  const madhapurOpen = branches.find((b) => b.name.toLowerCase().includes("madhapur"))?.isOpen !== false;
  const tngosOpen = branches.find((b) => b.name.toLowerCase().includes("tngo"))?.isOpen !== false;

  const selectedBranchClosed =
    (selectedBranch === "Madhapur" && !madhapurOpen) ||
    (selectedBranch === "TNGO's Colony" && !tngosOpen);

  const formatAppointmentDate = (dateStr: string): string => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length !== 3) return dateStr;
    const year = parts[0];
    const monthIdx = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthName = months[monthIdx] || "";

    const getOrdinal = (n: number) => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    const formattedDay = getOrdinal(day);
    const formattedMonthStr = parts[1];
    const formattedDayStr = parts[2];

    return `${formattedDayStr}-${formattedMonthStr}-${year} (${formattedDay} ${monthName} ${year})`;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const age = String(fd.get("age") || "").trim();
    const gender = String(fd.get("gender") || "").trim();
    const doctor = String(fd.get("doctor") || "").trim();
    const date = String(fd.get("date") || "").trim();
    const time = String(fd.get("time") || "").trim();
    const symptoms = String(fd.get("symptoms") || "").trim();

    if (!name || !phone || !age || !gender || !doctor || !date || !time || !symptoms) {
      toast.error("Please fill in all the required fields.");
      return;
    }

    // 1. Verify selected Preferred Time falls within a matching doctor_schedule where is_available = true
    const userMins = timeToMinutes(time);
    const matchingSchedule = availableSchedules.find((sched) => {
      const startMins = timeToMinutes(sched.start_time);
      const endMins = timeToMinutes(sched.end_time);
      return userMins >= startMins && userMins <= endMins;
    });

    if (!matchingSchedule) {
      toast.error(
        `${doctor} is unavailable at the selected time. Please choose one of the consultation timings shown above.`
      );
      return;
    }

    // 2. Find corresponding branch and verify is_open = true
    const matchedBranchObj = branches.find((b) => {
      const bName = b.name.toLowerCase();
      const sName = matchingSchedule.branch_name.toLowerCase();
      if (bName.includes("madhapur") && sName.includes("madhapur")) return true;
      if (bName.includes("tngo") && sName.includes("tngo")) return true;
      return bName === sName;
    });

    const branchDisplayName = matchedBranchObj
      ? matchedBranchObj.name
      : matchingSchedule.branch_name.toLowerCase().includes("madhapur")
        ? "Madhapur"
        : "TNGO Colony";

    if (matchedBranchObj && matchedBranchObj.isOpen === false) {
      toast.error(
        `The ${branchDisplayName} Branch is closed today. Please choose another available consultation time.`
      );
      return;
    }

    const whatsappNum = (matchedBranchObj?.whatsapp_number || "918309403610").replace(/\D/g, "");
    const formattedDate = formatAppointmentDate(date);

    const message = `New Appointment Request

Full Name: ${name}
Phone Number: ${phone}
Age: ${age}
Gender: ${gender}
Doctor: ${doctor}
Branch: ${branchDisplayName}

Preferred Date:
${formattedDate}

Preferred Time:
${formatSqlTime(time)}

Symptoms:
${symptoms}`;

    const url = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
      toast.success("Appointment request generated. Redirecting to WhatsApp...");
      e.currentTarget.reset?.();
      setSelectedDoctor("");
      setSelectedBranch("");
      setPreferredTime("10:00");
    }, 800);
  };

  const field = (label: string, children: React.ReactNode) => (
    <label className="block">
      <span className="text-xs font-semibold text-foreground/80">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );

  const inputCls =
    "w-full h-11 px-4 rounded-xl bg-white border border-border focus:border-violet focus:ring-2 focus:ring-violet/20 outline-none transition text-sm";

  return (
    <Section
      id="book"
      eyebrow="Book appointment"
      title="Reserve your slot in under a minute"
      subtitle="Share a few details and our team will confirm your visit by phone."
    >
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 glass-strong rounded-3xl p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-violet/20 blur-3xl" />
          <div className="relative">
            <h3 className="font-display text-2xl font-extrabold gradient-text">Why book online?</h3>
            <ul className="mt-5 space-y-4">
              {[
                { icon: Clock, t: "Save time", d: "Skip the wait — we'll have your slot ready." },
                { icon: Award, t: "Expert care", d: "Seen by our senior physicians on duty." },
                { icon: Users, t: "Family friendly", d: "Book one slot or multiple, together." },
                { icon: ShieldCheck, t: "Secure", d: "Your details stay private and safe." },
              ].map(({ icon: Icon, t, d }) => (
                <li key={t} className="flex gap-3">
                  <span className="shrink-0 grid h-10 w-10 place-items-center rounded-2xl gradient-orange">
                    <Icon className="h-4 w-4 text-white" />
                  </span>
                  <div>
                    <div className="font-semibold text-foreground">{t}</div>
                    <div className="text-sm text-muted-foreground">{d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <form
          id="appointment-form"
          onSubmit={onSubmit}
          className="lg:col-span-3 glass-strong rounded-3xl p-6 sm:p-8 space-y-4 scroll-mt-24"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            {field("Full Name", <input name="name" className={inputCls} placeholder="Your name" />)}
            {field(
              "Phone",
              <input name="phone" type="tel" className={inputCls} placeholder="+91 ..." />,
            )}
            {field(
              "Age",
              <input name="age" type="number" min={0} className={inputCls} placeholder="32" />,
            )}
            {field(
              "Gender",
              <select name="gender" className={inputCls} defaultValue="">
                <option value="" disabled>
                  Select
                </option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>,
            )}
            {field(
              "Doctor",
              <select
                name="doctor"
                className={inputCls}
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
              >
                <option value="" disabled>
                  Select Doctor
                </option>
                <option value="Dr. D. Ravi Kumar">Dr. D. Ravi Kumar</option>
                <option value="Dr. P. Pushpalatha">Dr. P. Pushpalatha</option>
              </select>,
            )}

            {/* Hidden Branch input for form submission */}
            <input type="hidden" name="branch" value={selectedBranch} />

            {/* Doctor Availability Schedule Card */}
            {selectedDoctor && availableSchedules.length > 0 && (
              <div className="sm:col-span-2 p-4 sm:p-5 rounded-2xl bg-violet/8 border border-violet/20 space-y-3 animate-fade-up">
                <div className="text-sm font-bold text-foreground">
                  {selectedDoctor} is available today at:
                </div>
                <div className="space-y-3 pt-1">
                  {availableSchedules.map((sched, idx) => {
                    const branchText = formatBranchDisplayName(sched.branch_name);
                    const timeText = `${formatSqlTime(sched.start_time)} – ${formatSqlTime(sched.end_time)}`;
                    return (
                      <div key={idx} className="space-y-1 text-sm">
                        <div className="font-semibold text-foreground flex items-center gap-1.5">
                          <span>📍</span>
                          <span>{branchText}</span>
                        </div>
                        <div className="text-muted-foreground flex items-center gap-1.5 pl-6">
                          <span>🕒</span>
                          <span>{timeText}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Notice if doctor is not available today at any branch */}
            {selectedDoctor && availableBranches.length === 0 && (
              <div className="sm:col-span-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs sm:text-sm text-red-600 font-semibold animate-fade-up">
                ⚠️ {selectedDoctor} is not available today.
              </div>
            )}

            {/* Notice for closed branch */}
            {selectedBranchClosed && (
              <div className="sm:col-span-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs sm:text-sm text-red-600 font-semibold animate-fade-up">
                ⚠️ The {selectedBranch} branch is closed today. Appointment booking is currently
                disabled.
              </div>
            )}

            {field("Preferred Date", <input name="date" type="date" className={inputCls} />)}
            {field(
              "Preferred Time",
              <input
                type="time"
                name="time"
                className={inputCls}
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                required
              />,
            )}
          </div>
          {field(
            "Symptoms / Reason",
            <textarea
              name="symptoms"
              rows={4}
              className={`${inputCls} h-auto py-3 resize-none`}
              placeholder="Tell us what's bothering you..."
            />,
          )}
          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-xl text-sm font-bold text-white gradient-orange shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition-all disabled:opacity-70"
          >
            {submitting ? "Submitting..." : done ? "Submitted ✓" : "Request Appointment"}
            {!submitting && <ArrowRight className="h-4 w-4" />}
          </button>
          <p className="text-xs text-muted-foreground text-center">
            By submitting, you agree to be contacted about your appointment.
          </p>
        </form>
      </div>
    </Section>
  );
}

function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <Section
      id="testimonials"
      eyebrow="Patient stories"
      title="Trusted by families across Madhapur"
      subtitle="Real words from real patients who've experienced care at Harsha Clinics."
    >
      <div className="relative">
        <div className="overflow-hidden -mx-2" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/3 px-2">
                <div className="group relative h-full glass-strong rounded-3xl p-6 sm:p-7 hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden">
                  <Quote className="absolute top-5 right-5 h-10 w-10 text-violet/15 group-hover:text-violet/25 transition-colors" />
                  <div className="flex items-center gap-0.5 text-orange-start mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground/85 leading-relaxed flex-1">"{t.text}"</p>
                  <div className="mt-5 pt-4 border-t border-border flex items-center gap-3">
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarImage
                        src={t.avatar}
                        alt={t.name}
                        className="object-cover"
                        loading="lazy"
                      />
                      <AvatarFallback className="gradient-orange text-white font-bold">
                        {t.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="font-semibold text-sm text-foreground truncate">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Previous testimonial"
            className="grid h-10 w-10 place-items-center rounded-full glass-strong text-violet-deep hover:gradient-orange hover:text-white transition-all"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            {snaps.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all ${selected === i ? "w-8 gradient-orange" : "w-2 bg-violet/30 hover:bg-violet/50"
                  }`}
              />
            ))}
          </div>
          <button
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Next testimonial"
            className="grid h-10 w-10 place-items-center rounded-full glass-strong text-violet-deep hover:gradient-orange hover:text-white transition-all"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <Section
      id="faq"
      eyebrow="FAQ"
      title="Answers to common questions"
      subtitle="Need something else? Tap the WhatsApp button or give us a call."
    >
      <div className="max-w-3xl mx-auto space-y-4">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className={`glass-strong rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? "shadow-soft" : ""
                }`}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
              >
                <span className="font-display font-bold text-base sm:text-lg text-foreground">
                  {f.q}
                </span>
                <span
                  className={`shrink-0 grid h-9 w-9 place-items-center rounded-full transition-all duration-300 ${isOpen
                    ? "gradient-orange text-white rotate-180"
                    : "bg-violet/10 text-violet-deep"
                    }`}
                >
                  {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 sm:px-6 pb-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {f.a}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function Contact({ branches }: { branches: BranchStatus[] }) {
  const madhapurBranch = branches.find((b) => b.name.toLowerCase().includes("madhapur")) || {
    isOpen: true,
    openingTime: "10:00 AM",
    closingTime: "10:00 PM",
  };
  const tngoBranch = branches.find((b) => b.name.toLowerCase().includes("tngo")) || {
    isOpen: true,
    openingTime: "10:00 AM",
    closingTime: "10:00 PM",
  };

  const branchesData = [
    {
      name: "Harsha Clinics, Pharmacy & Diagnostics | Top Clinic in Madhapur",
      address:
        "Plot No. 337, Ground Floor, Opposite Hotel ITR, Chanda Nayak Nagar Thanda, Siddi Vinayak Nagar, Ayyappa Society, Madhapur, Hyderabad.",
      phone: "+91 8309403610",
      whatsapp: "918309403610",
      directionsUrl: "https://www.google.com/maps/search/?api=1&query=Harsha+Clinics+Madhapur+Hyderabad",
      mapEmbedUrl: "https://maps.google.com/maps?q=Harsha+Clinics+Madhapur+Ayyappa+Society+Hyderabad&t=&z=15&ie=UTF8&iwloc=&output=embed",
      isOpen: madhapurBranch.isOpen !== false,
      openingTime: madhapurBranch.openingTime || "10:00 AM",
      closingTime: madhapurBranch.closingTime || "10:00 PM",
      image: "/Madhapur%20Branch/IMG-20260619-WA0089.jpg",
    },
    {
      name: "Harsha Clinics, Pharmacy & Diagnostics | Best Clinic in TNGO's Colony",
      address:
        "Plot No. 45, Ground Floor, TNGO's Colony Phase 2, Near TNGO's Colony Main Road, Gachibowli, Hyderabad.",
      phone: "+91 8309403610",
      whatsapp: "918309403610",
      directionsUrl: "https://www.google.com/maps/search/?api=1&query=Harsha+Clinics+TNGO+Colony+Gachibowli+Hyderabad",
      mapEmbedUrl: "https://maps.google.com/maps?q=Harsha+Clinics+TNGO+Colony+Gachibowli+Hyderabad&t=&z=15&ie=UTF8&iwloc=&output=embed",
      isOpen: tngoBranch.isOpen !== false,
      openingTime: tngoBranch.openingTime || "10:00 AM",
      closingTime: tngoBranch.closingTime || "10:00 PM",
      image: "/TNGO%20Colony%20Branch/IMG-20260619-WA0079.jpg",
    },
  ];

  return (
    <Section
      id="contact"
      eyebrow="Our Locations"
      title="We're right here for you and your family"
      subtitle="Visit either of our branches for premium clinical care. Direct calls and WhatsApp support available."
    >
      <div className="grid md:grid-cols-2 gap-8">
        {branchesData.map((b, i) => (
          <div
            key={i}
            className="glass-strong rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-glow transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet/5 via-transparent to-orange-start/5 pointer-events-none" />

            <div className="relative space-y-5">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-violet-deep bg-violet/8">
                  Branch {i + 1}
                </span>
                {b.isOpen ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-green-500/10 text-green-600 border border-green-500/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    Open Now
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-red-500/10 text-red-600 border border-red-500/20 animate-pulse">
                    Closed Today
                  </span>
                )}
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-extrabold gradient-text leading-tight pt-1 text-left">
                {b.name}
              </h3>
            </div>

            <div className="relative space-y-4 pt-4 text-left">
              <div className="flex items-start gap-4">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-violet/8 text-violet-deep shrink-0">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Address
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed mt-0.5">{b.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-violet/8 text-violet-deep shrink-0">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Phone
                  </div>
                  <a
                    href={`tel:${b.phone.replace(/\s+/g, "")}`}
                    className="text-sm font-semibold text-foreground/80 hover:text-violet-deep transition-colors mt-0.5 block"
                  >
                    {b.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-violet/8 text-violet-deep shrink-0">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Hours
                  </div>
                  <p className="text-sm text-foreground/80 mt-0.5">
                    {b.isOpen
                      ? `Open daily • ${b.openingTime} – ${b.closingTime}`
                      : "Closed Today"}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative pt-6 mt-6 border-t border-border space-y-4">
              {/* Embedded Interactive Google Map */}
              <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-border shadow-soft bg-slate-100 relative">
                <iframe
                  title={`Google Maps embed for ${b.name}`}
                  src={b.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2">
                <a
                  href={`tel:${b.phone.replace(/\s+/g, "")}`}
                  className="inline-flex flex-col items-center justify-center gap-1.5 px-2 py-3 rounded-2xl bg-violet/8 hover:bg-violet/15 transition-colors text-violet-deep font-semibold"
                >
                  <Phone className="h-4 w-4" />
                  <span className="text-[10px] sm:text-xs">Call</span>
                </a>
                <a
                  href={`https://wa.me/${b.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-col items-center justify-center gap-1.5 px-2 py-3 rounded-2xl bg-violet/8 hover:bg-[#25D366]/10 hover:text-[#25D366] transition-colors text-violet-deep font-semibold"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-[10px] sm:text-xs">WhatsApp</span>
                </a>
                <a
                  href={b.directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-col items-center justify-center gap-1.5 px-2 py-3 rounded-2xl gradient-orange text-white hover:shadow-glow transition-all font-semibold"
                >
                  <Navigation className="h-4 w-4" />
                  <span className="text-[10px] sm:text-xs">Directions</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Footer() {
  const sections = [
    {
      title: "Quick Links",
      links: [
        { href: "/#about", label: "About" },
        { href: "/#doctors", label: "Doctors" },
        { href: "/#appointment-form", label: "Book Appointment" },
        { href: "/#faq", label: "FAQ" },
      ],
    },
    {
      title: "Services",
      links: [
        { href: "/#specialties", label: "Specialties" },
        { href: "/#lab-tests", label: "Lab Tests" },
        { href: "/#ambulance", label: "Ambulance Support" },
        { href: "/#gallery", label: "Clinic Gallery" },
      ],
    },
    {
      title: "Contact",
      links: [
        { href: "tel:+918309403610", label: "Call clinic" },
        { href: "https://wa.me/918309403610", label: "WhatsApp" },
        { href: "/#contact", label: "Get directions" },
        { href: "mailto:hello@harshaclinic.in", label: "Email us" },
      ],
    },
  ];

  return (
    <footer className="relative pt-20 pb-8 mt-10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-4 gap-10">
          <div>
            <a href="#home" className="flex items-center gap-2.5 group">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-violet/10 bg-white p-0.5 shadow-soft transition-all duration-300 group-hover:scale-105">
                <img
                  src="/Logo/Logo.jpg"
                  alt="Harsha Clinics Logo"
                  className="h-full w-full object-contain rounded-lg"
                />
              </div>
              <span className="font-display font-extrabold text-lg gradient-text tracking-tight">
                Harsha Clinics, Pharmacy &amp; Diagnostics
              </span>
            </a>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Advanced healthcare with a compassionate, family-first touch. Open daily 10:00 AM –
              10:00 PM.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href="https://wa.me/918309403610"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid h-9 w-9 place-items-center rounded-xl bg-violet/8 text-violet-deep hover:bg-[#25D366]/10 hover:text-[#25D366] transition-all"
              >
                <MessageSquare className="h-4 w-4" />
              </a>
              <a
                href="mailto:hello@harshaclinic.in"
                aria-label="Email"
                className="grid h-9 w-9 place-items-center rounded-xl bg-violet/8 text-violet-deep hover:gradient-orange hover:text-white transition-all"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {sections.map((s) => (
            <div key={s.title}>
              <h4 className="font-display font-bold text-foreground mb-4">{s.title}</h4>
              <ul className="space-y-2.5">
                {s.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-muted-foreground hover:text-violet-deep transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Harsha Clinics, Pharmacy &amp; Diagnostics. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Crafted with care for the families of Hyderabad.
          </p>
        </div>
      </div>
    </footer>
  );
}


const GALLERY_ITEMS = [
  {
    src: "/Madhapur%20Branch/IMG-20260619-WA0095.jpg",
    title: "Madhapur Reception Wait Area",
    branch: "Madhapur",
    category: "madhapur",
    desc: "A neat and welcoming lobby wait area in our Siddi Vinayak Nagar branch.",
  },
  {
    src: "/TNGO%20Colony%20Branch/IMG-20260619-WA0079.jpg",
    title: "Gachibowli Lounge Area",
    branch: "TNGO's Colony",
    category: "tngo",
    desc: "Clean and comfortable seating for patients at our TNGO's Colony branch.",
  },
  {
    src: "/Madhapur%20Branch/IMG-20260619-WA0092.jpg",
    title: "Madhapur Consult Room",
    branch: "Madhapur",
    category: "madhapur",
    desc: "Private and sanitised consult suite designed for thorough checkups.",
  },
  {
    src: "/TNGO%20Colony%20Branch/IMG-20260619-WA0080.jpg",
    title: "Gachibowli Front Lobby",
    branch: "TNGO's Colony",
    category: "tngo",
    desc: "Comfortable and sanitized lounge area at the Gachibowli clinic.",
  },
  {
    src: "/extras/Facilities/IMG-20260626-WA0001.jpg",
    title: "Diagnostic Equipment",
    branch: "Facilities",
    category: "facilities",
    desc: "Advanced medical diagnostic apparatus available for standard testing.",
  },
  {
    src: "/Madhapur%20Branch/IMG-20260619-WA0091.jpg",
    title: "Madhapur Doctor Cabin",
    branch: "Madhapur",
    category: "madhapur",
    desc: "Professional consultation room environment for complete patient care.",
  },
  {
    src: "/TNGO%20Colony%20Branch/IMG-20260619-WA0078.jpg",
    title: "Gachibowli Entry Hall",
    branch: "TNGO's Colony",
    category: "tngo",
    desc: "Bright and hygienic passageway at our TNGO's Colony branch.",
  },
  {
    src: "/Madhapur%20Branch/IMG-20260619-WA0098.jpg",
    title: "Madhapur Ward Room",
    branch: "Madhapur",
    category: "madhapur",
    desc: "Equipped checkup cabin area with basic patient monitoring setups.",
  },
  {
    src: "/Awards/IMG_20260626_084430.jpg",
    title: "Clinic Excellence & Awards",
    branch: "Awards",
    category: "facilities",
    desc: "Proud recipient of medical excellence and trusted care recognition.",
  },
];

function ClinicGallery() {
  const [filter, setFilter] = useState<"all" | "madhapur" | "tngo" | "facilities">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => filter === "all" || item.category === filter,
  );

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    const prev = (lightboxIndex - 1 + filteredItems.length) % filteredItems.length;
    setLightboxIndex(prev);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    const next = (lightboxIndex + 1) % filteredItems.length;
    setLightboxIndex(next);
  };

  // Setup Embla Carousel for unified responsive layout
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect, filteredItems.length]);

  return (
    <Section
      id="gallery"
      eyebrow="Clinic Gallery"
      title="Explore Our Clinics"
      subtitle="Step inside our clean, well-equipped branches located in Madhapur and TNGO's Colony, Gachibowli."
    >
      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2.5 mb-10">
        {[
          { id: "all", label: "All Photos" },
          { id: "madhapur", label: "Madhapur Branch" },
          { id: "tngo", label: "TNGO's Colony" },
          { id: "facilities", label: "Facilities & Awards" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as "all" | "madhapur" | "tngo" | "facilities")}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${filter === tab.id
              ? "bg-violet-deep text-white shadow-soft"
              : "bg-violet/8 text-violet-deep hover:bg-violet/12 border border-violet/10"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Unified Carousel Container */}
      <div className="w-full relative px-0 sm:px-12" key={filter}>
        {/* Carousel Viewport */}
        <div className="overflow-hidden px-1" ref={emblaRef}>
          <div className="flex items-stretch touch-pan-y -ml-4">
            {filteredItems.map((img, i) => (
              <div
                key={img.src}
                className="shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-4 flex flex-col"
              >
                <div
                  onClick={() => setLightboxIndex(i)}
                  className="group relative rounded-3xl overflow-hidden glass-strong border border-border/60 shadow-soft hover:shadow-glow hover:-translate-y-1 cursor-pointer transition-all duration-300 flex flex-col h-full aspect-[4/3] w-full"
                >
                  <div className="w-full h-full overflow-hidden relative bg-slate-100">
                    <img
                      src={img.src}
                      alt={img.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/20 to-transparent opacity-90 pointer-events-none" />

                    {/* Branch Tag */}
                    <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider text-white bg-slate-900/60 backdrop-blur-sm border border-white/10">
                      {img.branch}
                    </div>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                    <h3 className="font-display text-base font-extrabold leading-tight text-left">
                      {img.title}
                    </h3>
                    <p className="text-[11px] text-white/80 mt-1 leading-relaxed text-left">
                      {img.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating side navigation buttons for tablet and desktop */}
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          className="hidden sm:grid absolute -left-2 lg:-left-4 top-1/2 -translate-y-1/2 h-11 w-11 place-items-center rounded-full glass-strong text-violet-deep hover:gradient-orange hover:text-white transition-all shadow-md shrink-0 z-10 border border-violet/10 bg-white/95"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          className="hidden sm:grid absolute -right-2 lg:-right-4 top-1/2 -translate-y-1/2 h-11 w-11 place-items-center rounded-full glass-strong text-violet-deep hover:gradient-orange hover:text-white transition-all shadow-md shrink-0 z-10 border border-violet/10 bg-white/95"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Pagination Dots (All viewports) and Arrows (Mobile only) */}
      <div className="mt-8 flex items-center justify-center gap-4">
        {/* Left Arrow (Mobile only) */}
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Previous slide"
          className="grid sm:hidden h-9 w-9 place-items-center rounded-full glass-strong text-violet-deep hover:gradient-orange hover:text-white transition-all shadow-sm shrink-0 border border-violet/10 bg-white"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Pagination dots */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {scrollSnaps.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => emblaApi?.scrollTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${selectedIndex === idx ? "w-6 gradient-orange" : "w-1.5 bg-violet/30 hover:bg-violet/50"
                }`}
            />
          ))}
        </div>

        {/* Right Arrow (Mobile only) */}
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Next slide"
          className="grid sm:hidden h-9 w-9 place-items-center rounded-full glass-strong text-violet-deep hover:gradient-orange hover:text-white transition-all shadow-sm shrink-0 border border-violet/10 bg-white"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8 animate-fade-in"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Main Content Area */}
          <div
            className="relative max-w-4xl w-full max-h-[80vh] flex flex-col items-center animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-h-[65vh] flex justify-center bg-slate-950 rounded-2xl overflow-hidden border border-white/10">
              <img
                src={filteredItems[lightboxIndex].src}
                alt={filteredItems[lightboxIndex].title}
                className="max-h-[65vh] object-contain max-w-full"
              />
            </div>

            {/* Image Details */}
            <div className="mt-4 text-center text-white px-4 max-w-xl">
              <span className="text-[10px] uppercase font-bold tracking-widest text-violet/70">
                {filteredItems[lightboxIndex].branch} Clinic
              </span>
              <h4 className="font-display text-lg sm:text-xl font-bold mt-1">
                {filteredItems[lightboxIndex].title}
              </h4>
              <p className="text-xs sm:text-sm text-white/70 mt-1.5 leading-relaxed">
                {filteredItems[lightboxIndex].desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}

function MobileSticky() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("home");
      if (hero) {
        const heroBottom = hero.getBoundingClientRect().bottom;
        // Show after the user scrolls past the hero section (e.g., hero bottom is above/close to the viewport top)
        setIsVisible(heroBottom < 80);
      } else {
        setIsVisible(window.scrollY > 400);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      href="#appointment-form"
      style={{
        bottom: "calc(6.5rem + env(safe-area-inset-bottom))",
      }}
      className={`sm:hidden fixed right-6 z-40 inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold text-white gradient-orange shadow-glow transition-all duration-300 transform ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-4 scale-95 pointer-events-none"
      }`}
    >
      <Calendar className="h-4 w-4" />
      Book Now
    </a>
  );
}

function LabTests() {
  const highlights = [
    { title: "NABL-Standard Quality", desc: "Accurate and reliable diagnostics confirmation.", icon: ShieldCheck },
    { title: "Expert Technicians", desc: "Hygienic and professional sample collection.", icon: Users },
    { title: "Biochemistry Analyzers", desc: "State-of-the-art diagnostic equipment.", icon: Microscope },
    { title: "Home Collection", desc: "Free home sample collection in Madhapur & Gachibowli.", icon: MapPin },
  ];

  return (
    <Section
      id="lab-tests"
      eyebrow="Diagnostics & Labs"
      title="Diagnostic & Laboratory Services"
      subtitle="Complete, accurate, and prompt laboratory diagnostics right in your neighborhood."
    >
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Side: Description, Highlights Grid, and Call Now CTA */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Harsha Clinics is equipped with an advanced in-house diagnostic laboratory. We leverage modern biochemistry analyzers and NABL-standard protocols to ensure rapid and accurate testing, helping our doctors provide prompt clinical decisions and treatment plans.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((h, idx) => {
              const Icon = h.icon;
              return (
                <div
                  key={idx}
                  className="flex gap-4 p-4 rounded-2xl glass-strong border border-violet/10 hover:border-violet/20 hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet/8 text-violet-deep group-hover:gradient-orange group-hover:text-white transition-all duration-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-foreground text-sm sm:text-base">
                      {h.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {h.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <a
                href="tel:+918309403610"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl text-sm font-bold text-white gradient-orange shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition-all"
              >
                <Phone className="h-4 w-4 animate-pulse" />
                <span>Call Now</span>
              </a>
              <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-semibold">
                <ShieldCheck className="h-4 w-4 text-green-500 shrink-0" />
                Emergency Dispatch: +91 8309403610
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2 font-medium">
              Speak directly with our reception to schedule your laboratory tests.
            </p>
          </div>
        </div>

        {/* Right Side: Lab Image Card */}
        <div className="lg:col-span-5 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-violet/20 to-orange-start/15 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <div className="relative rounded-3xl overflow-hidden border border-violet/15 shadow-soft hover:shadow-glow transition-all duration-300">
            <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
              <img
                src="/extras/Facilities/IMG-20260626-WA0001.jpg"
                alt="Diagnostics and Laboratory Services"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 text-white text-left">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider text-white bg-slate-900/60 backdrop-blur-sm border border-white/10 mb-2">
                  In-House Lab
                </span>
                <p className="text-xs text-white/90 leading-relaxed">
                  State-of-the-art biochemistry analyzers ensure reliable, NABL-standard diagnostic confirmation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Ambulance() {
  const highlights = [
    "24x7 Availability with dedicated helpline",
    "Oxygen-equipped Cardiac Life Support",
    "FCCM-certified emergency medical paramedical staff",
    "Direct priority admission to Gachibowli & Madhapur ICUs",
    "Fully air-conditioned medical transport vehicle",
  ];

  return (
    <Section
      id="ambulance"
      eyebrow="Emergency Support"
      title="24×7 Ambulance Service"
      subtitle="When seconds count, count on our emergency medical team. Prompt dispatch and advanced life-support ambulances are ready around the clock."
    >
      <div className="grid lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Image */}
        <div className="lg:col-span-5 order-last lg:order-first relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-start/15 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <div className="relative rounded-3xl overflow-hidden border border-red-500/10 shadow-soft hover:shadow-glow transition-all duration-300">
            <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
              <img
                src="/images/ambulance.png"
                alt="24/7 Ambulance Service at Harsha Clinics"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 text-white text-left">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider text-white bg-red-600/80 backdrop-blur-sm border border-white/10 mb-2">
                  Emergency Support
                </span>
                <p className="text-xs text-white/90 leading-relaxed">
                  Fully equipped with patient monitors, medical gas cylinders, and trauma stabilization kits.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Features and Contact */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="space-y-4">
            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-foreground">
              Critical Care & Emergency Highlights
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Our ambulance services are staffed with emergency care technicians and fully prepared for cardiac, respiratory, and pediatric emergencies. We ensure continuous patient monitoring from pickup to clinical admission.
            </p>
          </div>

          <ul className="grid sm:grid-cols-2 gap-3.5">
            {highlights.map((item) => (
              <li key={item} className="flex gap-2.5 items-start text-xs sm:text-sm text-foreground/90 font-medium">
                <CheckCircle2 className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            <a
              href="tel:+918309403610"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl text-sm font-bold text-white bg-red-600 shadow-[0_8px_24px_rgba(220,38,38,0.35)] hover:shadow-[0_12px_32px_rgba(220,38,38,0.45)] hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Phone className="h-4 w-4 animate-bounce" />
              Call Ambulance: +91 8309403610
            </a>
            <span className="text-xs text-muted-foreground font-semibold">
              Emergency Dispatch: +91 8309403610
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Home() {
  const { doctors, branches, schedules } = useDoctorAvailability();
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");

  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero branches={branches} />
        <Doctors
          doctors={doctors}
          onSelectDoctorAndBranch={(doctor, branch) => {
            setSelectedDoctor(doctor);
            setSelectedBranch(branch);
          }}
        />
        <About />
        <Specialties />
        <AwardsAndRecognition />
        <LabTests />
        <Ambulance />
        <ClinicGallery />
        <BookingForm
          doctors={doctors}
          branches={branches}
          schedules={schedules}
          selectedDoctor={selectedDoctor}
          selectedBranch={selectedBranch}
          setSelectedDoctor={setSelectedDoctor}
          setSelectedBranch={setSelectedBranch}
        />
        <Testimonials />
        <FAQ />
        <Contact branches={branches} />
      </main>
      <Footer />
      <MobileSticky />
      <FloatingWhatsApp />
    </div>
  );
}
