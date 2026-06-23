import { useState, useEffect } from "react";

export type AvailabilityStatus = "available" | "unavailable";
export type BranchId = "madhapur" | "tngos-colony";

export interface DoctorAvailability {
  id: string;
  name: string;
  availabilityStatus: AvailabilityStatus;
  currentBranch: BranchId | null;
}

export interface BranchStatus {
  id: BranchId;
  name: string;
  isOpen: boolean;
}

// Initial mock data simulating database rows
const INITIAL_DOCTORS: DoctorAvailability[] = [
  {
    id: "dr-ravi-kumar",
    name: "Dr. D. Ravi Kumar",
    availabilityStatus: "available",
    currentBranch: "madhapur",
  },
  {
    id: "dr-pushpalatha",
    name: "Dr. P. Pushpalatha",
    availabilityStatus: "available",
    currentBranch: "tngos-colony",
  },
];

const INITIAL_BRANCHES: BranchStatus[] = [
  { id: "madhapur", name: "Madhapur", isOpen: true },
  { id: "tngos-colony", name: "TNGO's Colony", isOpen: true },
];

export function useDoctorAvailability() {
  const [doctors, setDoctors] = useState<DoctorAvailability[]>(INITIAL_DOCTORS);
  const [branches, setBranches] = useState<BranchStatus[]>(INITIAL_BRANCHES);
  const [loading, setLoading] = useState(false);

  // When Supabase is integrated, this can fetch from database
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const updateDoctorAvailability = (
    doctorId: string,
    availabilityStatus: AvailabilityStatus,
    currentBranch: BranchId | null
  ) => {
    setDoctors((prev) =>
      prev.map((d) =>
        d.id === doctorId ? { ...d, availabilityStatus, currentBranch } : d
      )
    );
  };

  const updateBranchStatus = (branchId: BranchId, isOpen: boolean) => {
    setBranches((prev) =>
      prev.map((b) => (b.id === branchId ? { ...b, isOpen } : b))
    );
  };

  return {
    doctors,
    branches,
    loading,
    updateDoctorAvailability,
    updateBranchStatus,
  };
}
