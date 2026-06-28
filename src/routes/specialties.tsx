import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  HeartPulse,
  Activity,
  Wind,
  Bandage,
  Droplet,
  Brain,
  Microscope,
  Stethoscope,
  Search,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Phone,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "./index";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";

export const Route = createFileRoute("/specialties")({
  component: SpecialtiesPage,
});

const DEPARTMENTS = [
  {
    id: "family-medicine",
    name: "Family Medicine & Primary Care",
    icon: Stethoscope,
    image: "/images/clinic_family_2.webp",
    desc: "Comprehensive health services for patients of all ages. We focus on prevention, diagnosis, and treatment of everyday health conditions.",
    specialties: [
      { name: "Family Physician Consultation", desc: "Routine health checks and general diagnostic consulting for the whole family." },
      { name: "Pediatric & Geriatric Care", desc: "Specialized clinical attention tailored for children and elderly family members." },
      { name: "General Health Checkups", desc: "Comprehensive screening packages to assess key health parameters." },
      { name: "Infectious Diseases", desc: "Treatment for viral and bacterial infections including Dengue, Malaria, Typhoid, and Chikungunya." },
      { name: "Covid-19 Care", desc: "Testing consultation, supportive treatment, and post-covid recovery monitoring." },
      { name: "Allergies Management", desc: "Identifying and mitigating common environmental and food-related allergies." },
      { name: "Obesity & Weight Management", desc: "Medical support, diet plans, and lifestyle adjustments to control obesity." },
    ]
  },
  {
    id: "cardiology",
    name: "Cardiology & Heart Care",
    icon: HeartPulse,
    image: "/extras/IMG-20260619-WA0120.jpg",
    desc: "Professional cardiovascular care to evaluate heart health, manage chronic cardiac conditions, and screen for coronary diseases.",
    specialties: [
      { name: "Heart Diseases Care", desc: "Outpatient management of coronary issues, angina, and ischemic conditions." },
      { name: "Hypertension (High BP) Control", desc: "Continuous monitoring, medication adjustment, and lifestyle therapy for high blood pressure." },
      { name: "High Cholesterol & Lipids", desc: "Dietary guidance and pharmaceutical treatment for high cholesterol and triglycerides." },
      { name: "ECG Testing & Reporting", desc: "In-house electrocardiogram scans with prompt diagnostic reviews." },
    ]
  },
  {
    id: "nephrology",
    name: "Nephrology & Kidney Care",
    icon: Droplet,
    image: "/extras/IMG-20260619-WA0118.jpg",
    desc: "Dedicated clinical support to evaluate kidney functions, prevent disease progression, and coordinate ongoing care.",
    specialties: [
      { name: "Kidney Diseases Management", desc: "Outpatient treatment of chronic kidney disease (CKD) and nephrotic syndromes." },
      { name: "Electrolyte Imbalances", desc: "Correction of sodium, potassium, and calcium imbalances to restore cellular health." },
      { name: "Dialysis Patient Coordination", desc: "Post-dialysis checkups, complication management, and scheduling support." },
    ]
  },
  {
    id: "diabetes-care",
    name: "Diabetology & Endocrinology",
    icon: Activity,
    image: "/extras/IMG-20260619-WA0113.jpg",
    desc: "Specialized endocrinological care focusing on blood sugar control, thyroid health, and hormonal/metabolic balance.",
    specialties: [
      { name: "Diabetes Mellitus Care", desc: "Glycated hemoglobin (HbA1c) checks, insulin adjustments, and medication regimes." },
      { name: "Thyroid Disorders Care", desc: "Clinical management for hypothyroidism, hyperthyroidism, and goiter concerns." },
      { name: "High Cholesterol & Dyslipidemia", desc: "Targeted strategies to optimize lipid profile and lower cardiovascular risk." },
    ]
  },
  {
    id: "emergency-medicine",
    name: "Emergency & Critical Care",
    icon: Bandage,
    image: "/extras/IMG-20260619-WA0108.jpg",
    desc: "Equipped to handle urgent clinical needs including minor surgeries, trauma stabilization, and critical care coordination.",
    specialties: [
      { name: "Emergency Medicine", desc: "Rapid clinical triaging, stabilization, and immediate medical intervention." },
      { name: "Critical Care (ICU Cases)", desc: "FCCM-certified specialist consults for multi-organ failures and critical illnesses." },
      { name: "Ventilator Cases Support", desc: "Clinical management and bedside parameters monitoring for patients on ventilator support." },
      { name: "Minor Suturing & Wound Dressing", desc: "Sterile suturing for lacerations, cut wounds, and surgical dressing services." },
    ]
  },
  {
    id: "pulmonology",
    name: "Pulmonology & Respiratory Care",
    icon: Wind,
    image: "/images/pulmonology.png",
    desc: "Diagnosis and therapy for acute and chronic respiratory disorders, allergies, and infectious lung diseases.",
    specialties: [
      { name: "Asthma & Bronchitis Care", desc: "Preventative inhaler management, nebulization, and lung function guidance." },
      { name: "Pneumonia Treatment", desc: "Antibiotic therapy, oxygen stabilization, and supportive lung rehabilitation." },
      { name: "Lung Diseases & COPD", desc: "Therapeutic care for chronic obstructive pulmonary diseases and chronic cough." },
      { name: "Tuberculosis (TB) Program", desc: "Standard anti-tubercular treatment regimens and close patient monitoring." },
      { name: "Nebulization Services", desc: "In-clinic bronchodilator nebulization for acute respiratory relief." },
    ]
  },
  {
    id: "neurology",
    name: "Neurology & Pain Management",
    icon: Brain,
    image: "/images/neurology.png",
    desc: "Comprehensive diagnostic support and management of neurological disorders, chronic pain, and mobility issues.",
    specialties: [
      { name: "Epilepsy & Seizures", desc: "Anti-epileptic medication therapy adjustments and seizure frequency control." },
      { name: "Paralysis & Stroke Recovery Support", desc: "Post-stroke clinical monitoring, medical stability, and referral for rehabilitation." },
      { name: "Migraine & Chronic Headaches", desc: "Diagnostic headache assessments, trigger identification, and prophylactic treatment." },
      { name: "Joint Pain & Arthritis Care", desc: "Medications, joint care plans, and exercise guidance for gout and osteoarthritis." },
    ]
  },
  {
    id: "diagnostics",
    name: "Diagnostics & Lab Services",
    icon: Microscope,
    image: "/extras/IMG-20260626-WA0016.jpg",
    desc: "Complete diagnostic investigations supported by our high-end in-house biochemistry analyzers and lab technicians.",
    specialties: [
      { name: "Clinical Pathology Tests", desc: "Complete blood counts (CBC), urine analyses, and general screenings." },
      { name: "Biochemistry Panel Tests", desc: "Kidney function tests (KFT), liver function tests (LFT), and lipid profile checks." },
      { name: "Blood Sugar Monitoring", desc: "Fast and accurate blood glucose evaluations (Fasting and Post-Prandial)." },
      { name: "Lab Blood Collection", desc: "Hygienic and convenient blood draws at either of our branch clinics." },
    ]
  }
];

function SpecialtiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const departmentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Deep-linking smooth scroll support for hash URLs on mount or hash change
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace("#", "");
        const targetElement = departmentRefs.current[id];
        if (targetElement) {
          setTimeout(() => {
            targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
            // Add brief visual highlight class
            targetElement.classList.add("ring-2", "ring-violet/30");
            setTimeout(() => {
              targetElement.classList.remove("ring-2", "ring-violet/30");
            }, 2000);
          }, 200);
        }
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    handleHashScroll();
    window.addEventListener("hashchange", handleHashScroll);
    return () => window.removeEventListener("hashchange", handleHashScroll);
  }, []);

  const filteredDepartments = DEPARTMENTS.map((dept) => {
    const matchedSpecialties = dept.specialties.filter(
      (spec) =>
        spec.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        spec.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const matchesDeptName = dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            dept.desc.toLowerCase().includes(searchQuery.toLowerCase());

    return {
      ...dept,
      matchedSpecialties: matchesDeptName ? dept.specialties : matchedSpecialties,
      isMatched: matchesDeptName || matchedSpecialties.length > 0
    };
  }).filter((dept) => dept.isMatched);

  const totalSpecialtiesCount = DEPARTMENTS.reduce((acc, d) => acc + d.specialties.length, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-grow pt-28">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 sm:py-20 text-center">
          {/* Ambient Glows */}
          <div className="absolute inset-0 pointer-events-none -z-10">
            <div className="absolute top-1/4 left-1/4 h-80 w-80 rounded-full bg-violet/10 blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-orange-start/8 blur-[100px]" />
          </div>

          <div className="max-w-4xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-violet-deep bg-violet/8 mb-4">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              Comprehensive Care
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold gradient-text tracking-tight leading-tight">
              Our Medical Specialties
            </h1>
            <p className="mt-4 text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Harsha Clinics offers world-class healthcare with specialized consultations, in-house diagnostics, 
              and family wellness checkups across {totalSpecialtiesCount}+ services.
            </p>

            {/* Back to Home Link */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet hover:text-violet-deep transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </div>

            {/* Dynamic Search Box */}
            <div className="mt-6 max-w-lg mx-auto relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-violet/20 to-orange-start/15 rounded-2xl blur opacity-75 group-focus-within:opacity-100 transition-opacity" />
              <div className="relative flex items-center bg-white rounded-2xl border border-violet/15 p-1.5 focus-within:border-violet shadow-soft">
                <Search className="h-5 w-5 text-muted-foreground ml-3.5 shrink-0" />
                <input
                  type="text"
                  placeholder="Search specialties (e.g. ECG, Diabetes, Kidneys)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 px-3 text-sm focus:outline-none bg-transparent text-foreground"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Specialties Lists */}
        <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredDepartments.length === 0 ? (
            <div className="text-center py-16 glass-strong rounded-3xl p-8 max-w-md mx-auto border border-dashed border-violet/20">
              <div className="h-12 w-12 rounded-2xl bg-orange-start/10 text-orange-start grid place-items-center mx-auto mb-4">
                <Activity className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">No matches found</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                We couldn't find any specialties matching "{searchQuery}". Try searching for symptoms, 
                conditions, or general departments.
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 px-4 py-2 text-xs font-semibold bg-violet/8 hover:bg-violet/12 text-violet-deep rounded-xl transition-all"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredDepartments.map((dept) => {
                const Icon = dept.icon;
                return (
                  <div
                    key={dept.id}
                    ref={(el) => {
                      departmentRefs.current[dept.id] = el;
                    }}
                    className="group scroll-mt-28 glass-strong rounded-[28px] p-6 sm:p-8 md:p-10 border border-violet/10 hover:border-violet/20 hover:shadow-glow transition-all duration-500 relative overflow-hidden"
                  >
                    {/* Background glows */}
                    <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-violet/5 blur-3xl group-hover:bg-violet/8 transition-all" />
                    
                    {/* Header */}
                    <div className="relative flex flex-col md:flex-row md:items-center gap-5 pb-6 border-b border-border">
                      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-orange text-white shadow-soft shrink-0">
                        <Icon className="h-7 w-7" />
                      </div>
                      <div>
                        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight leading-tight text-left">
                          {dept.name}
                        </h2>
                        <p className="text-sm text-muted-foreground leading-relaxed mt-1 text-left">
                          {dept.desc}
                        </p>
                      </div>
                    </div>

                    {/* Large Premium Banner Image */}
                    {dept.image && (
                      <div className="mt-6 aspect-[16/6] md:aspect-[21/7] w-full overflow-hidden rounded-2xl border border-violet/10 shadow-soft bg-slate-100">
                        <img
                          src={dept.image}
                          alt={dept.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                        />
                      </div>
                    )}

                    {/* Specialties Grid */}
                    <div className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
                      {dept.matchedSpecialties.map((spec, index) => (
                        <div
                          key={spec.name}
                          className="flex gap-4.5 p-4 rounded-2xl bg-white/40 border border-violet/5 hover:bg-white hover:shadow-soft hover:border-violet/10 hover:-translate-y-0.5 transition-all duration-300 text-left"
                        >
                          <div className="h-2 w-2 rounded-full bg-violet shrink-0 mt-2.5" />
                          <div>
                            <h4 className="font-display text-base font-bold text-foreground leading-snug">
                              {spec.name}
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed mt-1.5">
                              {spec.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* CTA section */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative glass-strong rounded-[32px] p-8 sm:p-12 md:p-16 text-center overflow-hidden border border-violet/15 shadow-glow">
            {/* Background design elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet/5 via-transparent to-orange-start/5 pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-violet/20 blur-[90px]" />
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-orange-start/15 blur-[90px]" />

            <div className="relative max-w-2xl mx-auto">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
                Need Medical Assistance?
              </h2>
              <p className="mt-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
                Connect with our senior physicians on duty at Harsha Clinics. Save time by booking your 
                appointment slot online and routing your request directly to WhatsApp.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/"
                  hash="book"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl text-sm font-bold text-white gradient-orange shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition-all"
                >
                  <Calendar className="h-4 w-4" />
                  Book Appointment Now
                </Link>
                
                <a
                  href="tel:+918247815584"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl text-sm font-bold text-violet-deep glass-strong hover:bg-violet/12 hover:-translate-y-0.5 transition-all"
                >
                  <Phone className="h-4 w-4" />
                  Call Clinic
                </a>
              </div>

              <div className="mt-6 flex justify-center items-center gap-4 text-xs font-semibold text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  Madhapur Branch
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  TNGO's Colony Branch
                </span>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
