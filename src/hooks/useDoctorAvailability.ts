import { useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

export interface DoctorAvailability {
  id: number;
  name: string;
  available: boolean;
  currentBranch: string;
}

export interface BranchStatus {
  id: number;
  name: string;
  isOpen: boolean;
}

// Fallback initial data (to prevent app crash when offline)
const FALLBACK_DOCTORS: DoctorAvailability[] = [
  {
    id: 1,
    name: "Dr. Ravi Kumar",
    available: true,
    currentBranch: "Madhapur",
  },
  {
    id: 2,
    name: "Dr. P. Pushpalatha",
    available: true,
    currentBranch: "TNGO Colony",
  },
];

const FALLBACK_BRANCHES: BranchStatus[] = [
  { id: 1, name: "Madhapur", isOpen: true },
  { id: 2, name: "TNGO Colony", isOpen: true },
];

export function useDoctorAvailability() {
  const [doctors, setDoctors] = useState<DoctorAvailability[]>(FALLBACK_DOCTORS);
  const [branches, setBranches] = useState<BranchStatus[]>(FALLBACK_BRANCHES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  const fetchLiveAvailability = async () => {
    console.log("fetchLiveAvailability called. isSupabaseConfigured:", isSupabaseConfigured());
    if (!isSupabaseConfigured()) {
      console.log("Supabase is not configured. Using fallback data.");
      setUsingFallback(true);
      setLoading(false);
      return;
    }

    try {
      console.log("Fetching live data from Supabase...");
      setLoading(true);
      setError(null);

      // Fetch branches first since doctors reference them by name
      const { data: branchesData, error: branchesError } = await supabase
        .from("branches")
        .select("*")
        .order("id", { ascending: true });

      if (branchesError) {
        console.error("Error fetching branches from Supabase:", branchesError);
        throw branchesError;
      }

      const { data: doctorsData, error: doctorsError } = await supabase
        .from("doctors")
        .select("*")
        .order("id", { ascending: true });

      if (doctorsError) {
        console.error("Error fetching doctors from Supabase:", doctorsError);
        throw doctorsError;
      }

      console.log("Supabase fetch successful:", { doctorsData, branchesData });

      if (doctorsData && doctorsData.length > 0) {
        console.log(`Found ${doctorsData.length} doctors in Supabase.`);
        setDoctors(
          doctorsData.map((d: any) => {
            let normalizedName = d.name || "";
            if (normalizedName.toLowerCase().includes("ravi")) {
              normalizedName = "Dr. Ravi Kumar";
            } else if (normalizedName.toLowerCase().includes("pushpalatha")) {
              normalizedName = "Dr. P. Pushpalatha";
            }

            let normalizedBranch = d.current_branch || "";
            if (normalizedBranch.toLowerCase().includes("madhapur")) {
              normalizedBranch = "Madhapur";
            } else if (normalizedBranch.toLowerCase().includes("tngo")) {
              normalizedBranch = "TNGO Colony";
            }

            return {
              id: Number(d.id),
              name: normalizedName,
              available: Boolean(d.available),
              currentBranch: normalizedBranch,
            };
          })
        );
      } else {
        console.warn("Doctors data from Supabase is empty. Using FALLBACK_DOCTORS and attempting to seed...");
        setDoctors(FALLBACK_DOCTORS);
        
        // Attempt to seed doctors table in background
        supabase
          .from("doctors")
          .insert(
            FALLBACK_DOCTORS.map((d) => ({
              id: d.id,
              name: d.name,
              available: d.available,
              current_branch: d.currentBranch,
            }))
          )
          .then(({ error: seedErr }) => {
            if (seedErr) {
              console.warn("Seeding doctors table failed (RLS policies might prevent inserts):", seedErr);
            } else {
              console.log("Successfully seeded doctors table in Supabase!");
            }
          });
      }

      if (branchesData && branchesData.length > 0) {
        console.log(`Found ${branchesData.length} branches in Supabase.`);
        setBranches(
          branchesData.map((b: any) => {
            let normalizedBranchName = b.name || "";
            if (normalizedBranchName.toLowerCase().includes("madhapur")) {
              normalizedBranchName = "Madhapur";
            } else if (normalizedBranchName.toLowerCase().includes("tngo")) {
              normalizedBranchName = "TNGO Colony";
            }

            return {
              id: Number(b.id),
              name: normalizedBranchName,
              isOpen: Boolean(b.is_open),
            };
          })
        );
      } else {
        console.warn("Branches data from Supabase is empty. Using FALLBACK_BRANCHES and attempting to seed...");
        setBranches(FALLBACK_BRANCHES);

        // Attempt to seed branches table in background
        supabase
          .from("branches")
          .insert(
            FALLBACK_BRANCHES.map((b) => ({
              id: b.id,
              name: b.name,
              is_open: b.isOpen,
            }))
          )
          .then(({ error: seedErr }) => {
            if (seedErr) {
              console.warn("Seeding branches table failed (RLS policies might prevent inserts):", seedErr);
            } else {
              console.log("Successfully seeded branches table in Supabase!");
            }
          });
      }

      setUsingFallback(false);
    } catch (err: any) {
      console.error("Supabase load failed, using local fallback state:", err);
      setError(err.message || "Failed to load database content");
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveAvailability();
  }, []);

  const updateDoctorAvailability = async (
    doctorId: number,
    available: boolean,
    currentBranch: string
  ) => {
    // Optimistic local update
    setDoctors((prev) =>
      prev.map((d) =>
        d.id === doctorId ? { ...d, available, currentBranch } : d
      )
    );

    if (isSupabaseConfigured() && !usingFallback) {
      try {
        const { error: updateError } = await supabase
          .from("doctors")
          .update({
            available,
            current_branch: currentBranch,
          })
          .eq("id", doctorId);

        if (updateError) throw updateError;
      } catch (err: any) {
        console.error("Failed to sync doctor changes to Supabase:", err);
        throw err;
      }
    }
  };

  const updateBranchStatus = async (branchId: number, isOpen: boolean) => {
    // Optimistic local update
    setBranches((prev) =>
      prev.map((b) => (b.id === branchId ? { ...b, isOpen } : b))
    );

    if (isSupabaseConfigured() && !usingFallback) {
      try {
        const { error: updateError } = await supabase
          .from("branches")
          .update({
            is_open: isOpen,
          })
          .eq("id", branchId);

        if (updateError) throw updateError;
      } catch (err: any) {
        console.error("Failed to sync branch changes to Supabase:", err);
        throw err;
      }
    }
  };

  return {
    doctors,
    branches,
    loading,
    error,
    usingFallback,
    updateDoctorAvailability,
    updateBranchStatus,
    refresh: fetchLiveAvailability,
  };
}
