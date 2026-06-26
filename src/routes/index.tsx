import { createFileRoute } from "@tanstack/react-router";
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
import { useDoctorAvailability, DoctorAvailability, BranchStatus } from "@/hooks/useDoctorAvailability";
import { useIsMobile } from "@/hooks/use-mobile";

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
    text:
      "Dr. Ravi Kumar diagnosed my condition quickly and the treatment plan worked wonderfully. The clinic feels modern and the staff is incredibly kind.",
  },
  {
    name: "Anil Reddy",
    role: "Patient",
    text:
      "Walked in for an emergency at night and was attended to immediately. Professional, calm and thorough. Highly recommend Harsha Clinic.",
  },
  {
    name: "Lakshmi Rao",
    role: "Patient",
    text:
      "Dr. Pushpalatha is so warm and patient. She listened carefully and explained everything. Best family physician in Madhapur.",
  },
  {
    name: "Rahul Verma",
    role: "Patient",
    text:
      "In-house pharmacy and lab is a game changer — got everything done in one visit. Clean, quick and very affordable.",
  },
  {
    name: "Sneha Iyer",
    role: "Patient",
    text:
      "Booked online, got a reminder, walked in on time. Felt like a 5-star healthcare experience right in our neighbourhood.",
  },
  {
    name: "Mohammed Aslam",
    role: "Patient",
    text:
      "Critical care consultation here saved my father's recovery time. Forever grateful to the team at Harsha Clinic.",
  },
];

const FAQS = [
  {
    q: "What are the clinic timings?",
    a: "We are open every day from 10:00 AM to 10:00 PM. Emergency consultation is available on call.",
  },
  { q: "Do you accept walk-ins?", a: "Yes — walk-ins are welcome. Booking ahead reduces your wait." },
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

function Hero() {
  return (
    <section id="home" className="relative pt-24 sm:pt-28 pb-12 sm:pb-20 overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 -left-24 h-64 w-64 sm:h-80 sm:w-80 rounded-full bg-violet/25 blur-3xl" />
        <div className="absolute top-40 right-0 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-orange-start/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="animate-fade-up text-center lg:text-left lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-violet-deep glass mb-4 sm:mb-6">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            Open today • 10:00 AM – 10:00 PM
          </div>
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] text-foreground">
            Advanced Healthcare.{" "}
            <span className="gradient-text">Compassionate Care.</span>
          </h1>
          <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Expert General Physician, Emergency Care &amp; Family Healthcare in
            Madhapur, Hyderabad.
          </p>
          <div className="mt-5 sm:mt-7 flex flex-wrap gap-3 justify-center lg:justify-start">
            <a
              href="#book"
              className="inline-flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 rounded-2xl text-sm font-semibold text-white gradient-orange shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition-all"
            >
              <Calendar className="h-4 w-4" />
              Book Appointment
            </a>
            <a
              href="tel:+918247815584"
              className="inline-flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 rounded-2xl text-sm font-semibold text-violet-deep glass-strong hover:-translate-y-0.5 transition-all"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </a>
          </div>

          <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-3 max-w-md mx-auto lg:mx-0">
            {[
              { k: "4.9★", v: "Rated by Patients" },
              { k: "20+", v: "Years Experience" },
              { k: "15k+", v: "Happy Patients" },
            ].map((s) => (
              <div key={s.v} className="glass rounded-2xl px-2 py-2.5 sm:p-3 text-center">
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

        <div className="lg:col-span-5 order-last animate-fade-up">
          <div className="relative mx-auto max-w-lg lg:max-w-none">
            {/* Decorative background glows specific to the image frame */}
            <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-violet to-orange-start opacity-35 blur-lg" />
            <div className="relative glass-strong rounded-3xl p-3 shadow-glow overflow-hidden border border-white/10">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl relative shadow-inner">
                <img
                  src="/Madhapur%20Branch/IMG-20260619-WA0089.jpg"
                  alt="Harsha Clinic Madhapur Lobby & Reception"
                  loading="eager"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent pointer-events-none" />
                
                {/* Overlay Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white bg-violet-deep/80 backdrop-blur-md border border-white/10 shadow-soft animate-pulse-slow">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  Madhapur Main Branch
                </div>
              </div>
              <div className="mt-4 px-2 pb-2 text-center lg:text-left flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-left">
                  <h3 className="font-display text-sm sm:text-base font-extrabold text-foreground leading-tight">
                    Siddi Vinayak Nagar Clinic
                  </h3>
                  <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">
                    Our state-of-the-art facility in Madhapur, Hyderabad
                  </p>
                </div>
                <a
                  href="#gallery"
                  className="shrink-0 inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-[10px] sm:text-xs font-bold text-violet-deep bg-violet/8 border border-violet/15 hover:bg-violet/15 transition-all"
                >
                  Tour Clinic
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function About() {
  const items = [
    {
      icon: Stethoscope,
      title: "Family Medicine",
      text: "Holistic primary care for every member of your family — from toddlers to grandparents.",
    },
    {
      icon: Bandage,
      title: "Emergency Care",
      text: "Rapid assessment, suturing, stabilization and on-call critical care when minutes matter.",
    },
    {
      icon: HeartPulse,
      title: "Critical Care Consult",
      text: "ICU & ventilator case consultation by an experienced FCCM-certified physician.",
    },
    {
      icon: ShieldCheck,
      title: "Preventive Health",
      text: "Routine check-ups, screenings and lifestyle plans that keep you ahead of disease.",
    },
  ];
  return (
    <Section
      id="about"
      eyebrow="About the clinic"
      title="A trusted neighbourhood clinic, built for modern families"
      subtitle="Harsha Clinic combines compassionate doctors, modern diagnostics and an in-house pharmacy under one calm, welcoming roof in the heart of Madhapur."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <div
              key={i}
              className="group glass-strong rounded-3xl p-6 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl gradient-orange shadow-soft mb-4 group-hover:scale-110 transition-transform">
                <Icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">
                {it.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{it.text}</p>
            </div>
          );
        })}
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
    <div className="group relative glass-strong rounded-[32px] p-5 sm:p-6 overflow-hidden hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full border border-violet/10 hover:border-violet/20 hover:shadow-glow">
      {/* Background soft ambient glows */}
      <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-violet/10 blur-3xl group-hover:bg-violet/20 transition-all duration-500" />
      <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-orange-start/5 blur-3xl group-hover:bg-orange-start/10 transition-all duration-500" />
      
      <div className="relative space-y-6">
        {/* Large Portrait Image Container */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px] shadow-soft border border-white/10 bg-slate-100">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full gradient-orange grid place-items-center font-display text-4xl font-extrabold text-white">
              {name.split(" ").pop()?.substring(0, 2) || "Dr"}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent pointer-events-none" />
          
          {/* Suffix/Registration Badge Overlay */}
          <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-violet-deep/80 backdrop-blur-md border border-white/5 shadow-soft">
            <Award className="h-3.5 w-3.5 text-orange-start shrink-0" />
            <span>TSMC Registered</span>
          </div>

          <span className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-xl bg-white text-violet-deep shadow-soft border border-white/20">
            <Stethoscope className="h-5 w-5" />
          </span>
        </div>

        {/* Doctor Info */}
        <div className="space-y-4">
          <div className="text-left">
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground group-hover:gradient-text transition-all">
              {name}
            </h3>
            <p className="text-sm sm:text-base text-violet-deep font-bold mt-1 tracking-wide">
              {qualifications}
            </p>
          </div>

          {/* Specialties / Roles */}
          <div className="space-y-2 text-left">
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              Specializations
            </div>
            <ul className="space-y-2">
              {roles.map((r) => (
                <li key={r} className="flex items-center gap-2.5 text-sm text-foreground/80 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-violet shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Availability Pill */}
          {availability && (
            <div className="pt-1 text-left">
              {availability.available ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-500/10 text-green-600 text-xs font-bold border border-green-500/20">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  Available: {availability.currentBranch.toLowerCase().includes("madhapur") ? "Madhapur Branch" : "TNGO's Colony Branch"}
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 text-red-600 text-xs font-bold border border-red-500/20">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  Not Available Today
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Card Action & Meta Footer */}
      <div className="relative mt-6 pt-5 border-t border-border flex items-center justify-between gap-4 flex-wrap">
        <div className="text-left">
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Registration</div>
          <div className="font-mono text-xs font-semibold text-foreground/95 mt-0.5">{reg}</div>
        </div>
        <a
          href="#book"
          onClick={onBook}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold text-white gradient-orange hover:shadow-glow transition-all hover:-translate-y-0.5"
        >
          Book Consultation
          <ArrowRight className="h-4 w-4" />
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
      <div className="grid lg:grid-cols-2 gap-8 items-stretch">
        <DoctorCard
          name="Dr. Ravi Kumar"
          qualifications="MBBS, DEM, FCCM"
          roles={[
            "General Physician & Surgeon",
            "Emergency Physician",
            "Consultant Critical Care",
          ]}
          reg="TSMC/FMR/03090"
          image="/doctors/Doctor%20photo.jpg"
          availability={drRaviAvail}
          onBook={() => onSelectDoctorAndBranch("Dr. Ravi Kumar", mapBranchName(drRaviAvail?.currentBranch))}
        />
        <DoctorCard
          name="Dr. P. Pushpalatha"
          qualifications="BAMS"
          roles={["Female Specialist", "Family Physician"]}
          reg="544/A"
          image="/doctors/Madam%20photo.jpg"
          availability={drPushpalathaAvail}
          onBook={() => onSelectDoctorAndBranch("Dr. P. Pushpalatha", mapBranchName(drPushpalathaAvail?.currentBranch))}
        />
      </div>
    </Section>
  );
}

function ExpandableGrid<T extends { label: string; icon: React.ComponentType<{ className?: string }> }>({
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
              <div className="text-sm font-semibold text-foreground leading-tight">
                {s.label}
              </div>
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

function Specialties() {
  return (
    <Section
      id="specialties"
      eyebrow="Specialties"
      title="Comprehensive care under one roof"
      subtitle="From everyday concerns to complex conditions — we treat a broad range of medical needs with precision and warmth."
    >
      <ExpandableGrid
        items={SPECIALTIES}
        initial={6}
        showAllLabel={`View All Specialties (${SPECIALTIES.length})`}
        showLessLabel="Show Less"
        gridClass="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6"
        cardClass="group glass rounded-2xl p-5 sm:p-6 hover:bg-white hover:-translate-y-1 hover:shadow-soft transition-all duration-300"
        iconWrapClass="grid h-11 w-11 place-items-center rounded-xl bg-violet/10 text-violet-deep group-hover:gradient-orange group-hover:text-white transition-all mb-3"
      />
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
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
  "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM",
  "9:00 PM", "9:30 PM", "10:00 PM"
];

function BookingForm({
  doctors,
  branches,
  selectedDoctor,
  selectedBranch,
  setSelectedDoctor,
  setSelectedBranch,
}: {
  doctors: DoctorAvailability[];
  branches: BranchStatus[];
  selectedDoctor: string;
  selectedBranch: string;
  setSelectedDoctor: (doctor: string) => void;
  setSelectedBranch: (branch: string) => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [preferredTime, setPreferredTime] = useState("");
  const isMobile = useIsMobile();

  // On mobile devices, default Preferred Time should always be 9:00 AM
  useEffect(() => {
    if (isMobile) {
      setPreferredTime("9:00 AM");
    } else {
      setPreferredTime("");
    }
  }, [isMobile]);

  // Find availability of the selected doctor to trigger automatic branch assignment
  const currentDoctorAvailability = doctors.find(
    (d) => d.name === selectedDoctor
  );

  useEffect(() => {
    if (
      currentDoctorAvailability &&
      currentDoctorAvailability.available &&
      currentDoctorAvailability.currentBranch
    ) {
      const assignedBranch =
        currentDoctorAvailability.currentBranch.toLowerCase().includes("tngo")
          ? "TNGO's Colony"
          : "Madhapur";
      setSelectedBranch(assignedBranch);
    }
  }, [selectedDoctor, currentDoctorAvailability, setSelectedBranch]);

  // Handle branch Open/Closed statuses
  const madhapurOpen = branches.find((b) => b.name.toLowerCase().includes("madhapur"))?.isOpen !== false;
  const tngosOpen = branches.find((b) => b.name.toLowerCase().includes("tngo"))?.isOpen !== false;

  const disableMadhapur = !madhapurOpen || !!(
    currentDoctorAvailability && 
    currentDoctorAvailability.available && 
    currentDoctorAvailability.currentBranch && 
    !currentDoctorAvailability.currentBranch.toLowerCase().includes("madhapur")
  );

  const disableTngos = !tngosOpen || !!(
    currentDoctorAvailability && 
    currentDoctorAvailability.available && 
    currentDoctorAvailability.currentBranch && 
    !currentDoctorAvailability.currentBranch.toLowerCase().includes("tngo")
  );

  const selectedBranchClosed = (selectedBranch === "Madhapur" && !madhapurOpen) || (selectedBranch === "TNGO's Colony" && !tngosOpen);

  // Helper to format date: 2026-06-22 -> 22-06-2026 (22nd June 2026)
  const formatAppointmentDate = (dateStr: string): string => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length !== 3) return dateStr;
    const year = parts[0];
    const monthIdx = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
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
    const branch = String(fd.get("branch") || "").trim();
    const date = String(fd.get("date") || "").trim();
    const time = String(fd.get("time") || "").trim();
    const symptoms = String(fd.get("symptoms") || "").trim();

    if (
      !name ||
      !phone ||
      !age ||
      !gender ||
      !doctor ||
      !branch ||
      !date ||
      !time ||
      !symptoms
    ) {
      toast.error("Please fill in all the required fields.");
      return;
    }

    if (selectedBranchClosed) {
      toast.error(`The ${selectedBranch} branch is closed today. Appointments cannot be requested.`);
      return;
    }

    if (currentDoctorAvailability && !currentDoctorAvailability.available) {
      toast.error(`${selectedDoctor} is not available today.`);
      return;
    }

    const formattedDate = formatAppointmentDate(date);

    const message = `New Appointment Request

Full Name: ${name}
Phone Number: ${phone}
Age: ${age}
Gender: ${gender}
Doctor: ${doctor}
Branch: ${branch}

Preferred Date:
${formattedDate}

Preferred Time:
${time}

Symptoms:
${symptoms}`;

    const url = `https://wa.me/918247815584?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
      toast.success("Appointment request generated. Redirecting to WhatsApp...");
      e.currentTarget.reset?.();
      setSelectedDoctor("");
      setSelectedBranch("");
      setPreferredTime(isMobile ? "9:00 AM" : "");
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
            <h3 className="font-display text-2xl font-extrabold gradient-text">
              Why book online?
            </h3>
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
          onSubmit={onSubmit}
          className="lg:col-span-3 glass-strong rounded-3xl p-6 sm:p-8 space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            {field("Full Name", <input name="name" className={inputCls} placeholder="Your name" />)}
            {field(
              "Phone",
              <input name="phone" type="tel" className={inputCls} placeholder="+91 ..." />,
            )}
            {field("Age", <input name="age" type="number" min={0} className={inputCls} placeholder="32" />)}
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
                <option value="Dr. Ravi Kumar">Dr. Ravi Kumar</option>
                <option value="Dr. P. Pushpalatha">Dr. P. Pushpalatha</option>
              </select>,
            )}
            {field(
              "Branch",
              <select
                name="branch"
                className={inputCls}
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                disabled={!!(currentDoctorAvailability && currentDoctorAvailability.available && currentDoctorAvailability.currentBranch)}
              >
                <option value="" disabled>
                  Select Branch
                </option>
                <option value="Madhapur" disabled={disableMadhapur}>
                  Madhapur {!madhapurOpen && " (Closed Today)"}
                </option>
                <option value="TNGO's Colony" disabled={disableTngos}>
                  TNGO's Colony {!tngosOpen && " (Closed Today)"}
                </option>
              </select>,
            )}

            {/* Notice for doctor branch assignment constraints */}
            {currentDoctorAvailability && (
              <div className="sm:col-span-2 p-3.5 rounded-xl bg-violet/8 border border-violet/20 text-xs sm:text-sm text-violet-deep font-semibold animate-fade-up">
                {currentDoctorAvailability.available && currentDoctorAvailability.currentBranch ? (
                  <span>📢 {selectedDoctor} is available today only at the {currentDoctorAvailability.currentBranch.toLowerCase().includes("tngo") ? "TNGO's Colony" : "Madhapur"} Branch.</span>
                ) : (
                  <span>⚠️ {selectedDoctor} is not available today.</span>
                )}
              </div>
            )}

            {/* Notice for closed branch */}
            {selectedBranchClosed && (
              <div className="sm:col-span-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs sm:text-sm text-red-600 font-semibold animate-fade-up">
                ⚠️ The {selectedBranch} branch is closed today. Appointment booking is currently disabled.
              </div>
            )}

            {field(
              "Preferred Date",
              <input name="date" type="date" className={inputCls} />,
            )}
            {field(
              "Preferred Time",
              <select
                name="time"
                className={inputCls}
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
              >
                <option value="" disabled>
                  Select Time
                </option>
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>,
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
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })],
  );
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
      subtitle="Real words from real patients who've experienced care at Harsha Clinic."
    >
      <div className="relative">
        <div className="overflow-hidden -mx-2" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/3 px-2"
              >
                <div className="group relative h-full glass-strong rounded-3xl p-6 sm:p-7 hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden">
                  <Quote className="absolute top-5 right-5 h-10 w-10 text-violet/15 group-hover:text-violet/25 transition-colors" />
                  <div className="flex items-center gap-0.5 text-orange-start mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground/85 leading-relaxed flex-1">
                    "{t.text}"
                  </p>
                  <div className="mt-5 pt-4 border-t border-border flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full gradient-orange grid place-items-center text-white font-bold shrink-0">
                      {t.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-sm text-foreground truncate">
                        {t.name}
                      </div>
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
                  className={`shrink-0 grid h-9 w-9 place-items-center rounded-full transition-all duration-300 ${isOpen ? "gradient-orange text-white rotate-180" : "bg-violet/10 text-violet-deep"
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
  const madhapurOpen = branches.find((b) => b.name.toLowerCase().includes("madhapur"))?.isOpen !== false;
  const tngosOpen = branches.find((b) => b.name.toLowerCase().includes("tngo"))?.isOpen !== false;

  const branchesData = [
    {
      name: "Harsha Clinics | Top Clinic in Madhapur",
      address: "Plot No. 337, Ground Floor, Opposite Hotel ITR, Chanda Nayak Nagar Thanda, Siddi Vinayak Nagar, Ayyappa Society, Madhapur, Hyderabad.",
      phone: "+91 8247815584",
      whatsapp: "918247815584",
      directionsUrl: "#", // User to insert directions URL later
      isOpen: madhapurOpen,
      image: "/Madhapur%20Branch/IMG-20260619-WA0089.jpg",
    },
    {
      name: "Harsha Clinics | Best Clinic in TNGO's Colony",
      address: "Plot No. 45, Ground Floor, TNGO's Colony Phase 2, Near TNGO's Colony Main Road, Gachibowli, Hyderabad.",
      phone: "+91 8247815584",
      whatsapp: "918247815584",
      directionsUrl: "#", // User to insert directions URL later
      isOpen: tngosOpen,
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
          <div key={i} className="glass-strong rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-glow transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet/5 via-transparent to-orange-start/5 pointer-events-none" />
            
            <div className="relative space-y-5">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-violet-deep bg-violet/8">
                  Branch {i + 1}
                </span>
                {!b.isOpen && (
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
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Address</div>
                  <p className="text-sm text-foreground/80 leading-relaxed mt-0.5">
                    {b.address}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-violet/8 text-violet-deep shrink-0">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Phone</div>
                  <a href={`tel:${b.phone.replace(/\s+/g, '')}`} className="text-sm font-semibold text-foreground/80 hover:text-violet-deep transition-colors mt-0.5 block">
                    {b.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-violet/8 text-violet-deep shrink-0">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Hours</div>
                  <p className="text-sm text-foreground/80 mt-0.5">
                    {b.isOpen ? "Open daily • 10:00 AM – 10:00 PM" : "Closed Today"}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative pt-6 mt-6 border-t border-border space-y-4">
              {/* Representative Branch Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border shadow-inner bg-slate-100 group/branch-img">
                <img
                  src={b.image}
                  alt={b.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/branch-img:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/40 to-transparent pointer-events-none" />
              </div>

              {/* Map Placeholder container for future embed */}
              <div className="aspect-[16/9] w-full bg-violet/5 border border-dashed border-violet/25 rounded-2xl flex flex-col items-center justify-center p-4 text-center">
                <MapPin className="h-6 w-6 text-violet-deep mb-2 animate-bounce" />
                <span className="text-xs font-semibold text-foreground/80">Interactive Map View Ready</span>
                <span className="text-[10px] text-muted-foreground mt-1 max-w-[200px]">Exact Google Maps embed will be inserted here.</span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2">
                <a
                  href={`tel:${b.phone.replace(/\s+/g, '')}`}
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
                  onClick={(e) => {
                    if (b.directionsUrl === "#") {
                      e.preventDefault();
                      toast.info("Google Directions URL will be configured soon.");
                    }
                  }}
                  target={b.directionsUrl !== "#" ? "_blank" : undefined}
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

function Footer() {
  const sections = [
    {
      title: "Quick Links",
      links: [
        { href: "#about", label: "About" },
        { href: "#doctors", label: "Doctors" },
        { href: "#book", label: "Book Appointment" },
        { href: "#faq", label: "FAQ" },
      ],
    },
    {
      title: "Services",
      links: [
        { href: "#specialties", label: "Specialties" },
        { href: "#facilities", label: "Facilities" },
        { href: "#book", label: "Emergency Care" },
        { href: "#book", label: "Lab Tests" },
      ],
    },
    {
      title: "Contact",
      links: [
        { href: "tel:+918247815584", label: "Call clinic" },
        { href: "https://wa.me/918247815584", label: "WhatsApp" },
        { href: "#contact", label: "Get directions" },
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
                  alt="Harsha Clinic Logo" 
                  className="h-full w-full object-contain rounded-lg"
                />
              </div>
              <span className="font-display font-extrabold text-lg gradient-text tracking-tight">
                Harsha Clinic
              </span>
            </a>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Advanced healthcare with a compassionate, family-first touch. Open daily 10:00 AM – 10:00 PM.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href="https://wa.me/918247815584"
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
            © {new Date().getFullYear()} Harsha Clinic. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Crafted with care for the families of Hyderabad.
          </p>
        </div>
      </div>
    </footer>
  );
}

function WhyChooseUs() {
  const features = [
    {
      title: "Experienced Doctors",
      desc: "Our board-certified medical specialists bring decades of clinical experience in family medicine, critical care, and emergency response.",
      icon: Award,
    },
    {
      title: "Family Healthcare",
      desc: "Comprehensive primary care services tailored for patients of all ages, from infants to seniors, ensuring complete family wellness.",
      icon: Users,
    },
    {
      title: "Convenient Locations",
      desc: "Easily accessible premium clinics located across Hyderabad's key hubs, in Madhapur and TNGO's Colony, Gachibowli.",
      icon: MapPin,
    },
    {
      title: "Emergency Care",
      desc: "Equipped with advanced diagnostic tools and stabilization beds to handle urgent treatments, suturing, and medical emergencies.",
      icon: HeartPulse,
    },
    {
      title: "Affordable Consultation",
      desc: "Quality, transparent healthcare designed to be accessible. Clean, professional check-ups without inflated medical costs.",
      icon: ShieldCheck,
    },
    {
      title: "Patient-Centered Treatment",
      desc: "A warm, personalized approach where our doctors take the time to listen, diagnose thoroughly, and explain treatment paths clearly.",
      icon: Stethoscope,
    },
  ];

  return (
    <Section
      id="why-choose-us"
      eyebrow="Why Choose Us"
      title="Healthcare you can trust, right in your neighborhood"
      subtitle="We combine clinical expertise with compassionate care to deliver a premium medical experience for you and your loved ones."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <div
              key={i}
              className="group glass-strong rounded-3xl p-6 sm:p-8 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet/5 via-transparent to-orange-start/5 pointer-events-none" />
              <div className="grid h-12 w-12 place-items-center rounded-2xl gradient-orange text-white shadow-soft mb-6 group-hover:scale-110 transition-transform">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-3">
                {f.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {f.desc}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
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
    (item) => filter === "all" || item.category === filter
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

  return (
    <Section
      id="gallery"
      eyebrow="Our Facilities"
      title="Take a look inside our premium clinics"
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
            onClick={() => setFilter(tab.id as any)}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
              filter === tab.id
                ? "bg-violet-deep text-white shadow-soft"
                : "bg-violet/8 text-violet-deep hover:bg-violet/12 border border-violet/10"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredItems.map((img, i) => (
          <div
            key={img.src}
            onClick={() => setLightboxIndex(i)}
            className="group relative rounded-3xl overflow-hidden glass-strong border border-border/60 shadow-soft hover:shadow-glow hover:-translate-y-1 cursor-pointer transition-all duration-300"
          >
            <div className="aspect-[4/3] overflow-hidden relative bg-slate-100">
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
        ))}
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
  return (
    <a
      href="#book"
      className="sm:hidden fixed bottom-5 left-5 z-40 inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold text-white gradient-orange shadow-glow"
    >
      <Calendar className="h-4 w-4" />
      Book Now
    </a>
  );
}

function Home() {
  const { doctors, branches } = useDoctorAvailability();
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");

  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <About />
        <WhyChooseUs />
        <Doctors
          doctors={doctors}
          onSelectDoctorAndBranch={(doctor, branch) => {
            setSelectedDoctor(doctor);
            setSelectedBranch(branch);
          }}
        />
        <Specialties />
        <Facilities />
        <ClinicGallery />
        <BookingForm
          doctors={doctors}
          branches={branches}
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
