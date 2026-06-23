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
    if (!isSupabaseConfigured()) {
      setUsingFallback(true);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Fetch branches first since doctors reference them by name
      const { data: branchesData, error: branchesError } = await supabase
        .from("branches")
        .select("*")
        .order("id", { ascending: true });

      if (branchesError) throw branchesError;

      const { data: doctorsData, error: doctorsError } = await supabase
        .from("doctors")
        .select("*")
        .order("id", { ascending: true });

      if (doctorsError) throw doctorsError;

      if (doctorsData) {
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
      }

      if (branchesData) {
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
      }

      setUsingFallback(false);
    } catch (err: any) {
      console.warn("Supabase load failed, using local fallback state:", err);
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
