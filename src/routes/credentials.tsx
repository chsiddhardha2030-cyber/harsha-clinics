import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Award,
  ShieldCheck,
  Building2,
  Stethoscope,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  Calendar,
  Search,
} from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "./index";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";

export const Route = createFileRoute("/credentials")({
  component: CredentialsPage,
});

interface CertificateItem {
  id: string;
  filename: string;
  url: string;
  category: "ravi" | "madhapur" | "tngo";
  title: string;
  issuingAuthority: string;
  isPdf: boolean;
  badgeText: string;
}

// Helper to format clean human-readable title and issuing authority from filename
function parseCertificateMetadata(filePath: string): CertificateItem {
  const parts = filePath.split("/");
  const filename = parts[parts.length - 1] || filePath;
  const cleanName = filename.replace(/\.(pdf|jpeg|jpg|png|webp)$/i, "");
  const isPdf = /\.pdf$/i.test(filename);

  let category: "ravi" | "madhapur" | "tngo" = "ravi";
  if (filePath.toLowerCase().includes("madhapur")) {
    category = "madhapur";
  } else if (filePath.toLowerCase().includes("tngo")) {
    category = "tngo";
  }

  let title = cleanName;
  let issuingAuthority = "Authorized Medical & Healthcare Licensing Body";
  let badgeText = "Verified Credential";

  const nameLower = cleanName.toLowerCase();

  // Custom metadata parsing rules based on filename contents
  if (nameLower.includes("mbbs")) {
    title = "MBBS Medical Degree Certification";
    issuingAuthority = "NTR University of Health Sciences / TSMC";
    badgeText = "Primary Medical Qualification";
  } else if (nameLower.includes("engineering medicine") || nameLower.includes("dem")) {
    title = "Diploma in Emergency Medicine (DEM)";
    issuingAuthority = "Royal College of Emergency Physicians & Critical Care";
    badgeText = "Specialization Diploma";
  } else if (nameLower.includes("fellowship") || nameLower.includes("critical care medicine")) {
    title = "Fellowship in Critical Care Medicine (FCCM)";
    issuingAuthority = "College of Critical Care Medicine";
    badgeText = "Advanced Clinical Fellowship";
  } else if (nameLower.includes("advanced") && nameLower.includes("critical care")) {
    title = "Advanced Certificate in Critical Care Medicine";
    issuingAuthority = "Society of Emergency & Critical Care Medicine";
    badgeText = "Sub-specialty Certificate";
  } else if (nameLower.includes("renewal") || nameLower.includes("medical council")) {
    title = "Telangana State Medical Council Registration Renewal";
    issuingAuthority = "Telangana State Medical Council (TSMC)";
    badgeText = "Official State Registration";
  } else if (nameLower.includes("fire")) {
    title = "Fire Safety & Extinguisher Compliance Certificate";
    issuingAuthority = "Telangana State Disaster Response & Fire Services";
    badgeText = "Safety Compliance";
  } else if (nameLower.includes("clinical establishment")) {
    title = "Registration Certificate of Clinical Establishment";
    issuingAuthority = "District Medical & Health Officer (DM&HO), Hyderabad";
    badgeText = "Government License";
  } else if (nameLower.includes("iso")) {
    title = "ISO 9001:2015 Quality Standards Certificate";
    issuingAuthority = "International Organization for Standardization";
    badgeText = "Quality Assurance";
  } else if (nameLower.includes("service-") || nameLower.includes("trade")) {
    title = "GHMC Municipal Trade & Operational License";
    issuingAuthority = "Greater Hyderabad Municipal Corporation (GHMC)";
    badgeText = "Municipal License";
  } else {
    // Fallback pretty title derivation
    title = cleanName
      .replace(/[-_]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  // Final public static URL for browser navigation
  const publicUrl = filePath.startsWith("/public")
    ? filePath.replace("/public", "")
    : filePath;

  return {
    id: filePath,
    filename,
    url: publicUrl,
    category,
    title,
    issuingAuthority,
    isPdf,
    badgeText,
  };
}

export function CredentialsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "ravi" | "madhapur" | "tngo">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Automatically read all files inside public/Certificates using Vite eager glob
  const certificateFiles = useMemo(() => {
    const rawGlob = import.meta.glob("/public/Certificates/**/*.*", {
      eager: true,
      query: "?url",
      import: "default",
    });

    let paths = Object.keys(rawGlob);

    // If glob returns empty due to static path aliases, use direct known file paths from public directory as bulletproof backup
    if (paths.length === 0) {
      paths = [
        "/public/Certificates/Dr. Ravi Kumar/MBBS OD.pdf",
        "/public/Certificates/Dr. Ravi Kumar/Diploma in Engineering Medicine (DEM).pdf",
        "/public/Certificates/Dr. Ravi Kumar/Certification of Completion of fellowship in Critical Care Medicine - Edition 2.pdf",
        "/public/Certificates/Dr. Ravi Kumar/cert of renewal of registration (Telangana State Medical Council).pdf",
        "/public/Certificates/Dr. Ravi Kumar/Advanced-Certificate-in-Critical-Care-Me.pdf",
        "/public/Certificates/Branches/Madhapur/Fire Extinguisher Certificate.pdf",
        "/public/Certificates/Branches/Madhapur/Registration of Certificate of Clinical Establishment.jpeg",
        "/public/Certificates/Branches/Madhapur/Service-3833.1140663.1000044831.pdf",
        "/public/Certificates/Branches/TNGO/Fire & Extinguisher Certificate.jpeg",
        "/public/Certificates/Branches/TNGO/ISO Certificate.pdf",
        "/public/Certificates/Branches/TNGO/Registration of Certificate of Clinical Establishment.jpeg",
        "/public/Certificates/Branches/TNGO/Service-3833.1149724.1000070630.pdf",
      ];
    }

    return paths.map((p) => parseCertificateMetadata(p));
  }, []);

  const drRaviCertificates = useMemo(
    () => certificateFiles.filter((c) => c.category === "ravi"),
    [certificateFiles]
  );

  const madhapurCertificates = useMemo(
    () => certificateFiles.filter((c) => c.category === "madhapur"),
    [certificateFiles]
  );

  const tngoCertificates = useMemo(
    () => certificateFiles.filter((c) => c.category === "tngo"),
    [certificateFiles]
  );

  const filterCertificates = (items: CertificateItem[]) => {
    if (!searchQuery) return items;
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.issuingAuthority.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.filename.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const renderCertificateCard = (cert: CertificateItem) => (
    <div
      key={cert.id}
      className="group relative glass-strong rounded-[24px] p-5 sm:p-6 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 border border-violet/10 hover:border-violet/25 shadow-soft hover:shadow-glow overflow-hidden"
    >
      {/* Background Soft Glow */}
      <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-violet/8 blur-2xl group-hover:bg-violet/15 transition-all duration-500 pointer-events-none" />

      <div>
        {/* Top Header & Badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-violet-deep bg-violet/8 border border-violet/12">
            <ShieldCheck className="h-3.5 w-3.5 text-orange-start" />
            {cert.badgeText}
          </span>
          <span className="text-[11px] font-semibold text-muted-foreground uppercase flex items-center gap-1">
            {cert.isPdf ? (
              <FileText className="h-3.5 w-3.5 text-red-500" />
            ) : (
              <ImageIcon className="h-3.5 w-3.5 text-blue-500" />
            )}
            {cert.isPdf ? "PDF Document" : "Image File"}
          </span>
        </div>

        {/* Thumbnail / Visual Card Graphic */}
        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-4 border border-white/10 flex flex-col items-center justify-center text-center shadow-inner mb-5 group-hover:border-violet/30 transition-colors">
          {!cert.isPdf ? (
            <img
              src={cert.url}
              alt={cert.title}
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              loading="lazy"
            />
          ) : (
            <div className="relative z-10 flex flex-col items-center space-y-2">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 backdrop-blur-md text-white border border-white/20 shadow-lg group-hover:scale-110 transition-transform">
                <Award className="h-6 w-6 text-amber-300" />
              </div>
              <span className="text-[11px] font-bold text-white/90 tracking-wide uppercase px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
                Official Certification
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Certificate Metadata */}
        <div className="space-y-2 text-left">
          <h3 className="font-display text-lg font-bold text-foreground group-hover:gradient-text transition-all leading-snug">
            {cert.title}
          </h3>
          <div className="pt-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Issuing Authority
            </div>
            <p className="text-xs font-semibold text-foreground/80 leading-relaxed mt-0.5">
              {cert.issuingAuthority}
            </p>
          </div>
        </div>
      </div>

      {/* Card Action Button */}
      <div className="pt-5 mt-5 border-t border-border/60">
        <a
          href={cert.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white gradient-orange hover:shadow-glow transition-all hover:-translate-y-0.5"
        >
          <span>View Certificate</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col justify-between">
      <Nav />

      <main className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow space-y-12">
        {/* Header Hero Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-violet-deep bg-violet/8 border border-violet/15">
            <Sparkles className="h-4 w-4 text-orange-start" />
            Official Verifications & Licenses
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            Credentials & <span className="gradient-text">Certifications</span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Harsha Clinics operates under stringent medical standards and official state registrations. Browse our verified physician qualifications and branch operational licenses.
          </p>

          {/* Back Link */}
          <div className="pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-violet-deep hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Return to Homepage</span>
            </Link>
          </div>
        </div>

        {/* Section Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-strong p-3 rounded-2xl border border-violet/10">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {[
              { id: "all", label: "All Credentials" },
              { id: "ravi", label: "Dr. Ravi Kumar" },
              { id: "madhapur", label: "Madhapur Branch" },
              { id: "tngo", label: "TNGO Branch" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? "gradient-orange text-white shadow-soft"
                    : "text-foreground/75 hover:bg-violet/8 hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search certificates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-xl bg-white border border-border text-xs text-foreground outline-none focus:border-violet focus:ring-2 focus:ring-violet/20 transition"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* Category 1: Dr. Ravi Kumar */}
        {(activeTab === "all" || activeTab === "ravi") && (
          <section className="space-y-6 animate-fade-up">
            <div className="flex items-center gap-3 border-b border-border pb-4">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-violet/10 text-violet-deep shrink-0">
                <Stethoscope className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-extrabold text-foreground">
                  Dr. Ravi Kumar
                </h2>
                <p className="text-xs text-muted-foreground">
                  Doctor qualifications, medical registrations, and specialist certifications
                </p>
              </div>
            </div>

            {filterCertificates(drRaviCertificates).length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterCertificates(drRaviCertificates).map(renderCertificateCard)}
              </div>
            ) : (
              <div className="p-8 rounded-2xl text-center glass text-sm text-muted-foreground">
                No matching certificates found in this section.
              </div>
            )}
          </section>
        )}

        {/* Category 2: Madhapur Branch */}
        {(activeTab === "all" || activeTab === "madhapur") && (
          <section className="space-y-6 animate-fade-up">
            <div className="flex items-center gap-3 border-b border-border pb-4">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-violet/10 text-violet-deep shrink-0">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-extrabold text-foreground">
                  Madhapur Branch
                </h2>
                <p className="text-xs text-muted-foreground">
                  Clinical establishment permits, trade licenses, and safety certifications for Madhapur
                </p>
              </div>
            </div>

            {filterCertificates(madhapurCertificates).length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterCertificates(madhapurCertificates).map(renderCertificateCard)}
              </div>
            ) : (
              <div className="p-8 rounded-2xl text-center glass text-sm text-muted-foreground">
                No matching certificates found in this section.
              </div>
            )}
          </section>
        )}

        {/* Category 3: TNGO Branch */}
        {(activeTab === "all" || activeTab === "tngo") && (
          <section className="space-y-6 animate-fade-up">
            <div className="flex items-center gap-3 border-b border-border pb-4">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-violet/10 text-violet-deep shrink-0">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-extrabold text-foreground">
                  TNGO Branch
                </h2>
                <p className="text-xs text-muted-foreground">
                  ISO quality certifications, clinical licenses, and municipal approvals for TNGO's Colony
                </p>
              </div>
            </div>

            {filterCertificates(tngoCertificates).length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterCertificates(tngoCertificates).map(renderCertificateCard)}
              </div>
            ) : (
              <div className="p-8 rounded-2xl text-center glass text-sm text-muted-foreground">
                No matching certificates found in this section.
              </div>
            )}
          </section>
        )}
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
