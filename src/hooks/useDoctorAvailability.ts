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
  openingTime: string;
  closingTime: string;
  whatsapp_number?: string;
}

export interface DoctorSchedule {
  id?: number;
  doctor_id: number;
  branch_name: string;
  is_available: boolean;
  start_time: string;
  end_time: string;
}

// Fallback initial data (to prevent app crash when offline)
const FALLBACK_DOCTORS: DoctorAvailability[] = [
  {
    id: 1,
    name: "Dr. D. Ravi Kumar",
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
  { id: 1, name: "Madhapur", isOpen: true, openingTime: "10:00 AM", closingTime: "10:00 PM", whatsapp_number: "918309403610" },
  { id: 2, name: "TNGO Colony", isOpen: true, openingTime: "10:00 AM", closingTime: "10:00 PM", whatsapp_number: "918309403610" },
];

const FALLBACK_SCHEDULES: DoctorSchedule[] = [
  { doctor_id: 1, branch_name: "Madhapur", is_available: true, start_time: "09:00:00", end_time: "12:00:00" },
  { doctor_id: 1, branch_name: "TNGO Colony", is_available: false, start_time: "14:00:00", end_time: "17:00:00" },
  { doctor_id: 2, branch_name: "Madhapur", is_available: false, start_time: "09:00:00", end_time: "12:00:00" },
  { doctor_id: 2, branch_name: "TNGO Colony", is_available: true, start_time: "10:00:00", end_time: "13:00:00" },
];

const isMatchingBranch = (b1: string, b2: string) => {
  if (!b1 || !b2) return false;
  const n1 = b1.toLowerCase();
  const n2 = b2.toLowerCase();
  if (n1.includes("madhapur") && n2.includes("madhapur")) return true;
  if (n1.includes("tngo") && n2.includes("tngo")) return true;
  return n1 === n2;
};

export function useDoctorAvailability() {
  const [doctors, setDoctors] = useState<DoctorAvailability[]>(FALLBACK_DOCTORS);
  const [branches, setBranches] = useState<BranchStatus[]>(FALLBACK_BRANCHES);
  const [schedules, setSchedules] = useState<DoctorSchedule[]>(FALLBACK_SCHEDULES);
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

      const { data: scheduleData, error: scheduleError } = await supabase
        .from("doctor_schedule")
        .select("*");

      if (scheduleError) {
        console.warn("Could not fetch doctor_schedule (table might not exist yet or empty):", scheduleError);
      } else if (scheduleData && scheduleData.length > 0) {
        console.log(`Found ${scheduleData.length} schedules in Supabase.`);
        setSchedules(
          scheduleData.map((s: any) => ({
            id: s.id ? Number(s.id) : undefined,
            doctor_id: Number(s.doctor_id),
            branch_name: s.branch_name,
            is_available: Boolean(s.is_available),
            start_time: s.start_time || "09:00:00",
            end_time: s.end_time || "12:00:00",
          }))
        );
      }

      console.log("Supabase fetch successful:", { doctorsData, branchesData, scheduleData });

      if (doctorsData && doctorsData.length > 0) {
        console.log(`Found ${doctorsData.length} doctors in Supabase.`);
        setDoctors(
          doctorsData.map((d: any) => {
            let normalizedName = d.name || "";
            if (normalizedName.toLowerCase().includes("ravi")) {
              normalizedName = "Dr. D. Ravi Kumar";
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
          }),
        );
      } else {
        console.warn(
          "Doctors data from Supabase is empty. Using FALLBACK_DOCTORS and attempting to seed...",
        );
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
            })),
          )
          .then(({ error: seedErr }) => {
            if (seedErr) {
              console.warn(
                "Seeding doctors table failed (RLS policies might prevent inserts):",
                seedErr,
              );
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
              openingTime: b.opening_time && String(b.opening_time).trim() !== "" ? b.opening_time : "10:00 AM",
              closingTime: b.closing_time && String(b.closing_time).trim() !== "" ? b.closing_time : "10:00 PM",
              whatsapp_number: b.whatsapp_number || b.whatsapp || "918309403610",
            };
          }),
        );
      } else {
        console.warn(
          "Branches data from Supabase is empty. Using FALLBACK_BRANCHES and attempting to seed...",
        );
        setBranches(FALLBACK_BRANCHES);

        // Attempt to seed branches table in background
        supabase
          .from("branches")
          .insert(
            FALLBACK_BRANCHES.map((b) => ({
              id: b.id,
              name: b.name,
              is_open: b.isOpen,
              opening_time: b.openingTime,
              closing_time: b.closingTime,
            })),
          )
          .then(({ error: seedErr }) => {
            if (seedErr) {
              console.warn(
                "Seeding branches table failed (RLS policies might prevent inserts):",
                seedErr,
              );
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

    if (!isSupabaseConfigured()) return;

    const channelBranches = supabase
      .channel("realtime_branches_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "branches",
        },
        () => {
          console.log("Realtime update received for branches table. Refreshing live data...");
          fetchLiveAvailability();
        }
      )
      .subscribe();

    const channelSchedule = supabase
      .channel("realtime_schedule_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "doctor_schedule",
        },
        () => {
          console.log("Realtime update received for doctor_schedule table. Refreshing live data...");
          fetchLiveAvailability();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channelBranches);
      supabase.removeChannel(channelSchedule);
    };
  }, []);

  const updateDoctorAvailability = async (
    doctorId: number,
    available: boolean,
    currentBranch: string,
  ) => {
    // Optimistic local update
    setDoctors((prev) =>
      prev.map((d) => (d.id === doctorId ? { ...d, available, currentBranch } : d)),
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

  const updateDoctorSchedule = async (
    doctorId: number,
    branchName: string,
    isAvailable: boolean,
    startTime: string,
    endTime: string,
  ) => {
    // Optimistic local update
    setSchedules((prev) => {
      const idx = prev.findIndex(
        (s) => s.doctor_id === doctorId && isMatchingBranch(s.branch_name, branchName)
      );
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          is_available: isAvailable,
          start_time: startTime,
          end_time: endTime,
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            doctor_id: doctorId,
            branch_name: branchName,
            is_available: isAvailable,
            start_time: startTime,
            end_time: endTime,
          },
        ];
      }
    });

    if (isSupabaseConfigured() && !usingFallback) {
      try {
        const { data: existingRows } = await supabase
          .from("doctor_schedule")
          .select("*")
          .eq("doctor_id", doctorId);

        const matchingRow = existingRows?.find((r: any) =>
          isMatchingBranch(r.branch_name, branchName)
        );

        if (matchingRow) {
          const { error: updateErr } = await supabase
            .from("doctor_schedule")
            .update({
              is_available: isAvailable,
              start_time: startTime,
              end_time: endTime,
            })
            .eq("doctor_id", doctorId)
            .eq("branch_name", matchingRow.branch_name);
          if (updateErr) throw updateErr;
        } else {
          const { error: insertErr } = await supabase
            .from("doctor_schedule")
            .insert({
              doctor_id: doctorId,
              branch_name: branchName,
              is_available: isAvailable,
              start_time: startTime,
              end_time: endTime,
            });
          if (insertErr) throw insertErr;
        }
      } catch (err: any) {
        console.error("Failed to sync doctor schedule changes to Supabase:", err);
        throw err;
      }
    }
  };

  const updateBranchStatus = async (
    branchId: number,
    isOpen: boolean,
    openingTime: string,
    closingTime: string,
  ) => {
    // Optimistic local update
    setBranches((prev) =>
      prev.map((b) => (b.id === branchId ? { ...b, isOpen, openingTime, closingTime } : b)),
    );

    if (isSupabaseConfigured() && !usingFallback) {
      try {
        const { error: updateError } = await supabase
          .from("branches")
          .update({
            is_open: isOpen,
            opening_time: openingTime,
            closing_time: closingTime,
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
    schedules,
    loading,
    error,
    usingFallback,
    updateDoctorAvailability,
    updateDoctorSchedule,
    updateBranchStatus,
    refresh: fetchLiveAvailability,
  };
}

