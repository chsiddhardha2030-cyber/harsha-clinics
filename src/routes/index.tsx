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
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Nav } from "@/components/site/Nav";
import { Chatbot } from "@/components/site/Chatbot";
import { toast } from "sonner";
import drRaviAsset from "@/assets/dr-ravi-kumar.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Harsha Clinic — Advanced Healthcare in Madhapur, Hyderabad" },
      {
        name: "description",
        content:
          "Trusted clinic in Madhapur offering general medicine, emergency care, critical care, lab tests and in-house pharmacy. Book your appointment online.",
      },
      { property: "og:title", content: "Harsha Clinic — Madhapur, Hyderabad" },
      {
        property: "og:description",
        content: "Advanced Healthcare. Compassionate Care. Book an appointment today.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
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
    a: "We are open every day from 9:00 AM to 10:00 PM. Emergency consultation is available on call.",
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
    a: "Absolutely. Use the Book Appointment form on this page or chat with our AI assistant.",
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
            Open today • 9 AM – 10 PM
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
              href="tel:+910000000000"
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

        <div className="lg:col-span-5 order-last">
          <div className="relative mx-auto max-w-[260px] sm:max-w-[300px]">
            <div className="relative glass-strong rounded-3xl p-5 sm:p-6 text-center shadow-soft">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet/12 via-transparent to-orange-start/12 pointer-events-none" />
              <div className="relative mx-auto h-[88px] w-[88px] sm:h-[140px] sm:w-[140px] rounded-full overflow-hidden avatar-ring">
                <img
                  src={drRaviAsset.url}
                  alt="Dr. D. Ravi Kumar — General Physician at Harsha Clinic"
                  loading="eager"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              </div>
              <div className="relative mt-3 sm:mt-4">
                <div className="font-display text-base sm:text-lg font-extrabold text-foreground">
                  Dr. D. Ravi Kumar
                </div>
                <div className="text-[11px] sm:text-xs font-semibold text-violet-deep mt-0.5">
                  MBBS, DEM, FCCM
                </div>
                <div className="text-[10px] sm:text-[11px] text-muted-foreground mt-1 leading-snug">
                  General Physician • Emergency • Critical Care
                </div>
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
  initials,
  onBook,
}: {
  name: string;
  qualifications: string;
  roles: string[];
  reg: string;
  initials: string;
  onBook?: () => void;
}) {
  return (
    <div className="group relative glass-strong rounded-3xl p-6 sm:p-8 overflow-hidden hover:-translate-y-1 transition-all duration-300">
      <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-violet/15 blur-2xl group-hover:bg-violet/25 transition-colors" />
      <div className="relative flex items-start gap-5">
        <div className="shrink-0 relative">
          <div className="h-24 w-24 rounded-3xl gradient-orange grid place-items-center font-display text-3xl font-extrabold text-white shadow-soft">
            {initials}
          </div>
          <span className="absolute -bottom-2 -right-2 grid h-9 w-9 place-items-center rounded-2xl glass-strong">
            <Stethoscope className="h-4 w-4 text-violet-deep" />
          </span>
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-xl sm:text-2xl font-extrabold text-foreground">
            {name}
          </h3>
          <p className="text-sm text-violet-deep font-semibold mt-1">{qualifications}</p>
          <ul className="mt-3 space-y-1.5">
            {roles.map((r) => (
              <li key={r} className="flex items-center gap-2 text-sm text-foreground/80">
                <CheckCircle2 className="h-4 w-4 text-violet shrink-0" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="relative mt-6 pt-5 border-t border-border flex items-center justify-between gap-3 flex-wrap">
        <div className="text-xs">
          <div className="text-muted-foreground">Registration</div>
          <div className="font-mono font-semibold text-foreground">{reg}</div>
        </div>
        <a
          href="#book"
          onClick={onBook}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white gradient-orange hover:shadow-glow transition-all"
        >
          Book Consultation
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}

function Doctors({
  onSelectDoctorAndBranch,
}: {
  onSelectDoctorAndBranch: (doctor: string, branch: string) => void;
}) {
  return (
    <Section
      id="doctors"
      eyebrow="Meet our doctors"
      title="Skilled, certified and genuinely caring"
      subtitle="Backed by years of clinical experience, our doctors bring world-class expertise to your neighbourhood."
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <DoctorCard
          name="Dr. D. Ravi Kumar"
          qualifications="MBBS, DEM, FCCM"
          roles={[
            "General Physician & Surgeon",
            "Emergency Physician",
            "Consultant Critical Care",
          ]}
          reg="TSMC/FMR/03090"
          initials="RK"
          onBook={() => onSelectDoctorAndBranch("Dr. D. Ravi Kumar", "Madhapur")}
        />
        <DoctorCard
          name="Dr. P. Pushpalatha"
          qualifications="BAMS"
          roles={["Female Specialist", "Family Physician"]}
          reg="544/A"
          initials="PL"
          onBook={() => onSelectDoctorAndBranch("Dr. P. Pushpalatha", "Gachibowli")}
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

function BookingForm({
  selectedDoctor,
  selectedBranch,
  setSelectedDoctor,
  setSelectedBranch,
}: {
  selectedDoctor: string;
  selectedBranch: string;
  setSelectedDoctor: (doctor: string) => void;
  setSelectedBranch: (branch: string) => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

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

    const message = `*New Appointment Request*

*Full Name:* ${name}
*Phone Number:* ${phone}
*Age:* ${age}
*Gender:* ${gender}
*Doctor:* ${doctor}
*Branch:* ${branch}
*Preferred Date:* ${date}
*Preferred Time:* ${time}
*Symptoms / Reason:* ${symptoms}`;

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
                <option value="Dr. D. Ravi Kumar">Dr. D. Ravi Kumar</option>
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
              >
                <option value="" disabled>
                  Select Branch
                </option>
                <option value="Madhapur">Madhapur</option>
                <option value="Gachibowli">Gachibowli</option>
              </select>,
            )}
            {field(
              "Preferred Date",
              <input name="date" type="date" className={inputCls} />,
            )}
            {field(
              "Preferred Time",
              <input name="time" type="time" className={inputCls} />,
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
      subtitle="Need something else? Chat with our assistant or give us a call."
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

function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Visit us"
      title="We're right here in Madhapur"
      subtitle="Drop in, give us a call, or get directions in one tap."
    >
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 glass-strong rounded-3xl p-6 sm:p-8 space-y-5">
          <div className="flex gap-4">
            <span className="grid h-11 w-11 place-items-center rounded-2xl gradient-orange shrink-0">
              <MapPin className="h-5 w-5 text-white" />
            </span>
            <div>
              <div className="font-display font-bold text-foreground">Address</div>
              <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                Plot No. 337, Ground Floor, Opposite Hotel ITR, Chanda Nayak Nagar Thanda,
                Siddi Vinayak Nagar, Ayyappa Society, Madhapur, Hyderabad.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="grid h-11 w-11 place-items-center rounded-2xl gradient-orange shrink-0">
              <Clock className="h-5 w-5 text-white" />
            </span>
            <div>
              <div className="font-display font-bold text-foreground">Hours</div>
              <p className="text-sm text-muted-foreground mt-1">
                Open daily • Clinic closes at 10:00 PM
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2">
            <a
              href="tel:+910000000000"
              className="inline-flex flex-col items-center gap-1 px-3 py-3 rounded-2xl bg-violet/8 hover:bg-violet/15 transition-colors text-violet-deep"
            >
              <Phone className="h-4 w-4" />
              <span className="text-xs font-semibold">Call</span>
            </a>
            <a
              href="https://wa.me/910000000000"
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-col items-center gap-1 px-3 py-3 rounded-2xl bg-violet/8 hover:bg-violet/15 transition-colors text-violet-deep"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="text-xs font-semibold">WhatsApp</span>
            </a>
            <a
              href="https://maps.google.com/?q=Madhapur+Hyderabad"
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-col items-center gap-1 px-3 py-3 rounded-2xl gradient-orange text-white hover:shadow-glow transition-all"
            >
              <Navigation className="h-4 w-4" />
              <span className="text-xs font-semibold">Directions</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-3 glass-strong rounded-3xl overflow-hidden h-[360px] lg:h-auto">
          <iframe
            title="Clinic location"
            className="w-full h-full min-h-[360px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Madhapur,+Hyderabad&output=embed"
          />
        </div>
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
        { href: "tel:+910000000000", label: "Call clinic" },
        { href: "https://wa.me/910000000000", label: "WhatsApp" },
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
            <a href="#home" className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-xl gradient-orange shadow-soft">
                <HeartPulse className="h-5 w-5 text-white" />
              </span>
              <span className="font-display font-extrabold text-lg gradient-text">
                Harsha Clinic
              </span>
            </a>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Advanced healthcare with a compassionate, family-first touch. Serving Madhapur
              and beyond.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[Facebook, Instagram, Twitter, Youtube, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="grid h-9 w-9 place-items-center rounded-xl bg-violet/8 text-violet-deep hover:gradient-orange hover:text-white transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
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
            Crafted with care for the families of Madhapur.
          </p>
        </div>
      </div>
    </footer>
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
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");

  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <About />
        <Doctors
          onSelectDoctorAndBranch={(doctor, branch) => {
            setSelectedDoctor(doctor);
            setSelectedBranch(branch);
          }}
        />
        <Specialties />
        <Facilities />
        <BookingForm
          selectedDoctor={selectedDoctor}
          selectedBranch={selectedBranch}
          setSelectedDoctor={setSelectedDoctor}
          setSelectedBranch={setSelectedBranch}
        />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <MobileSticky />
      <Chatbot />
    </div>
  );
}
