import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useDoctorAvailability } from "@/hooks/useDoctorAvailability";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { toast } from "sonner";
import { Lock, Save, LogOut, HeartPulse, User, CheckCircle, RefreshCw } from "lucide-react";

function formatTo12Hr(timeStr: string): string {
  if (!timeStr) return "10:00 AM";
  if (timeStr.includes("AM") || timeStr.includes("PM")) return timeStr;
  const parts = timeStr.split(":");
  let h = parseInt(parts[0], 10);
  const m = parts[1] || "00";
  if (isNaN(h)) return timeStr;
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  const formattedH = h < 10 ? `0${h}` : `${h}`;
  return `${formattedH}:${m} ${ampm}`;
}

function parseTo24Hr(time12: string): string {
  if (!time12) return "10:00:00";
  const clean = time12.trim().toUpperCase();
  if (!clean.includes("AM") && !clean.includes("PM")) {
    const parts = clean.split(":");
    const h = parseInt(parts[0], 10) || 0;
    const m = parseInt(parts[1], 10) || 0;
    const formattedH = h < 10 ? `0${h}` : `${h}`;
    const formattedM = m < 10 ? `0${m}` : `${m}`;
    return `${formattedH}:${formattedM}:00`;
  }
  const isPM = clean.includes("PM");
  const isAM = clean.includes("AM");
  const timePart = clean.replace("AM", "").replace("PM", "").trim();
  const parts = timePart.split(":");
  let h = parseInt(parts[0], 10) || 0;
  const m = parseInt(parts[1], 10) || 0;
  if (isPM && h < 12) h += 12;
  if (isAM && h === 12) h = 0;
  const formattedH = h < 10 ? `0${h}` : `${h}`;
  const formattedM = m < 10 ? `0${m}` : `${m}`;
  return `${formattedH}:${formattedM}:00`;
}

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savingScheduleKey, setSavingScheduleKey] = useState<string | null>(null);
  const [savingBranchId, setSavingBranchId] = useState<number | null>(null);

  const {
    doctors,
    branches,
    schedules,
    loading,
    error,
    usingFallback,
    updateDoctorSchedule,
    updateBranchStatus,
    refresh,
  } = useDoctorAvailability();

  // Add console.log statements for debugging admin state
  console.log("AdminPage state - doctors:", doctors);
  console.log("AdminPage state - branches:", branches);
  console.log("AdminPage state - schedules:", schedules);
  console.log("AdminPage state - loading:", loading);
  console.log("AdminPage state - error:", error);
  console.log("AdminPage state - usingFallback:", usingFallback);

  // Local state for schedule edits: key is `${doctorId}_${branchName}`
  const [scheduleEdits, setScheduleEdits] = useState<
    Record<string, { isAvailable: boolean; startTime: string; endTime: string }>
  >({});
  const [branchEdits, setBranchEdits] = useState<
    Record<number, { isOpen: boolean; openingTime: string; closingTime: string }>
  >({});

  // Check simple session local storage
  useEffect(() => {
    const session = sessionStorage.getItem("harsha_admin_logged_in");
    if (session === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // Sync edits state when data loads
  useEffect(() => {
    const initialScheduleEdits: typeof scheduleEdits = {};
    const branchesList = ["Madhapur", "TNGO Colony"];

    doctors.forEach((d) => {
      branchesList.forEach((bName) => {
        const key = `${d.id}_${bName}`;
        const existingSched = schedules.find(
          (s) =>
            s.doctor_id === d.id &&
            (s.branch_name.toLowerCase().includes(bName.toLowerCase().slice(0, 4)))
        );
        initialScheduleEdits[key] = {
          isAvailable: existingSched ? existingSched.is_available : true,
          startTime: existingSched ? formatTo12Hr(existingSched.start_time) : "10:00 AM",
          endTime: existingSched ? formatTo12Hr(existingSched.end_time) : "01:00 PM",
        };
      });
    });
    setScheduleEdits(initialScheduleEdits);

    const initialBranchEdits: typeof branchEdits = {};
    branches.forEach((b) => {
      initialBranchEdits[b.id] = {
        isOpen: b.isOpen,
        openingTime: b.openingTime || "10:00 AM",
        closingTime: b.closingTime || "10:00 PM",
      };
    });
    setBranchEdits(initialBranchEdits);
  }, [doctors, branches, schedules]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "harsha123") {
      setIsLoggedIn(true);
      sessionStorage.setItem("harsha_admin_logged_in", "true");
      toast.success("Logged in successfully");
    } else {
      toast.error("Invalid username or password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("harsha_admin_logged_in");
    toast.info("Logged out successfully");
  };

  const saveScheduleChanges = async (doctorId: number, branchName: string) => {
    const key = `${doctorId}_${branchName}`;
    const edit = scheduleEdits[key];
    if (!edit) return;

    setSavingScheduleKey(key);
    try {
      await updateDoctorSchedule(
        doctorId,
        branchName,
        edit.isAvailable,
        parseTo24Hr(edit.startTime),
        parseTo24Hr(edit.endTime)
      );
      toast.success(`${branchName} schedule updated successfully`);
    } catch (err: any) {
      toast.error(err.message || "Failed to update schedule");
    } finally {
      setSavingScheduleKey(null);
    }
  };

  const saveBranchChanges = async (id: number) => {
    const edit = branchEdits[id];
    if (!edit) return;

    setSavingBranchId(id);
    try {
      await updateBranchStatus(id, edit.isOpen, edit.openingTime, edit.closingTime);
      toast.success("Branch details updated successfully");
    } catch (err: any) {
      toast.error(err.message || "Failed to update branch");
    } finally {
      setSavingBranchId(null);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 -left-4 h-64 w-64 rounded-full bg-violet/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-orange-start/10 blur-3xl" />

        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <span className="grid h-10 w-10 place-items-center rounded-xl gradient-orange shadow-soft">
              <HeartPulse className="h-5 w-5 text-white" />
            </span>
            <span className="font-display font-extrabold text-xl gradient-text">Harsha Clinics, Pharmacy &amp; Diagnostics</span>
          </Link>
          <h2 className="text-3xl font-extrabold font-display tracking-tight text-foreground">
            Admin Portal
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to manage doctor availability & branches
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="glass-strong rounded-3xl p-8 shadow-soft border border-border">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-foreground/80">Username</label>
                <div className="mt-1.5 relative">
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 rounded-xl bg-white border border-border focus:border-violet focus:ring-2 focus:ring-violet/20 outline-none transition text-sm text-foreground"
                    placeholder="admin"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                    <User className="h-4 w-4" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground/80">Password</label>
                <div className="mt-1.5 relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 rounded-xl bg-white border border-border focus:border-violet focus:ring-2 focus:ring-violet/20 outline-none transition text-sm text-foreground"
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                    <Lock className="h-4 w-4" />
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center h-12 rounded-xl text-sm font-bold text-white gradient-orange shadow-soft hover:shadow-glow transition-all"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-16">
      {/* Header */}
      <header className="glass-strong border-b border-border py-4 fixed top-0 inset-x-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl gradient-orange shadow-soft">
                <HeartPulse className="h-5 w-5 text-white" />
              </span>
              <span className="font-display font-extrabold text-base sm:text-lg gradient-text">
                Harsha Clinics, Pharmacy &amp; Diagnostics
              </span>
            </Link>
            <span className="hidden sm:inline px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-violet/8 text-violet-deep border border-violet/20">
              Admin Dashboard
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={refresh}
              disabled={loading}
              className="inline-flex items-center justify-center h-9 w-9 rounded-xl bg-violet/8 hover:bg-violet/15 text-violet-deep transition-all"
              aria-label="Refresh data"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-600 bg-red-500/10 hover:bg-red-500/15 transition-all"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 pt-28 space-y-8">
        {/* Supabase connection warning */}
        {usingFallback && (
          <div className="p-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 text-sm text-yellow-700 font-semibold animate-slide-down-fade">
            ⚠️ Supabase environment variables are missing or unavailable. Dashboard modifications
            will update the local fallback states only.
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Section 1: Doctors */}
          <div className="glass-strong rounded-3xl p-6 sm:p-8 shadow-soft border border-border flex flex-col justify-between">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-extrabold gradient-text mb-2">
                Doctors Management
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                Configure branch availability and consultation hours for each doctor.
              </p>

              {loading ? (
                <div className="py-12 flex justify-center items-center">
                  <RefreshCw className="h-6 w-6 text-violet animate-spin" />
                </div>
              ) : (
                <div className="space-y-6">
                  {doctors.map((d) => {
                    const branchList = ["Madhapur", "TNGO Colony"];

                    return (
                      <div
                        key={d.id}
                        className="p-5 rounded-2xl bg-violet/5 border border-border/60 space-y-4"
                      >
                        <div className="flex items-center justify-between border-b border-border/40 pb-3">
                          <span className="font-display font-bold text-foreground text-base">
                            {d.name}
                          </span>
                        </div>

                        <div className="space-y-4">
                          {branchList.map((bName) => {
                            const key = `${d.id}_${bName}`;
                            const edit = scheduleEdits[key] || {
                              isAvailable: true,
                              startTime: "09:00",
                              endTime: "12:00",
                            };
                            const isSaving = savingScheduleKey === key;

                            return (
                              <div
                                key={bName}
                                className="p-4 rounded-xl bg-white/80 border border-border/60 space-y-3 shadow-sm"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-semibold text-xs text-violet-deep uppercase tracking-wider">
                                    {bName} Branch
                                  </span>
                                  <span
                                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                      edit.isAvailable
                                        ? "bg-green-500/10 text-green-600"
                                        : "bg-red-500/10 text-red-600"
                                    }`}
                                  >
                                    {edit.isAvailable ? "Available" : "Unavailable"}
                                  </span>
                                </div>

                                <div className="grid sm:grid-cols-3 gap-3">
                                  <div>
                                    <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                      Availability
                                    </label>
                                    <select
                                      value={edit.isAvailable ? "true" : "false"}
                                      onChange={(e) =>
                                        setScheduleEdits((prev) => ({
                                          ...prev,
                                          [key]: {
                                            ...edit,
                                            isAvailable: e.target.value === "true",
                                          },
                                        }))
                                      }
                                      className="mt-1 w-full h-9 px-2.5 rounded-lg bg-white border border-border outline-none transition text-xs"
                                    >
                                      <option value="true">Available</option>
                                      <option value="false">Unavailable</option>
                                    </select>
                                  </div>

                                  <div>
                                    <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                      Start Time
                                    </label>
                                    <input
                                      type="text"
                                      value={edit.startTime}
                                      onChange={(e) =>
                                        setScheduleEdits((prev) => ({
                                          ...prev,
                                          [key]: { ...edit, startTime: e.target.value },
                                        }))
                                      }
                                      placeholder="10:00 AM"
                                      className="mt-1 w-full h-9 px-2.5 rounded-lg bg-white border border-border outline-none transition text-xs font-medium focus:border-violet focus:ring-2 focus:ring-violet/20"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                      End Time
                                    </label>
                                    <input
                                      type="text"
                                      value={edit.endTime}
                                      onChange={(e) =>
                                        setScheduleEdits((prev) => ({
                                          ...prev,
                                          [key]: { ...edit, endTime: e.target.value },
                                        }))
                                      }
                                      placeholder="01:00 PM"
                                      className="mt-1 w-full h-9 px-2.5 rounded-lg bg-white border border-border outline-none transition text-xs font-medium focus:border-violet focus:ring-2 focus:ring-violet/20"
                                    />
                                  </div>
                                </div>

                                <div className="pt-1 flex justify-end">
                                  <button
                                    onClick={() => saveScheduleChanges(d.id, bName)}
                                    disabled={isSaving}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white gradient-orange hover:shadow-glow disabled:opacity-75"
                                  >
                                    <Save className="h-3 w-3" />
                                    <span>{isSaving ? "Saving..." : "Save Schedule"}</span>
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Branch Open/Closed status */}
          <div className="glass-strong rounded-3xl p-6 sm:p-8 shadow-soft border border-border flex flex-col justify-between">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-extrabold gradient-text mb-2">
                Branches Management
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                Open or close locations globally. Closed branches immediately disable booking forms.
              </p>

              {loading ? (
                <div className="py-12 flex justify-center items-center">
                  <RefreshCw className="h-6 w-6 text-violet animate-spin" />
                </div>
              ) : (
                <div className="space-y-6">
                  {branches.map((b) => {
                    const edit = branchEdits[b.id] || {
                      isOpen: b.isOpen,
                      openingTime: b.openingTime || "10:00 AM",
                      closingTime: b.closingTime || "10:00 PM",
                    };

                    return (
                      <div
                        key={b.id}
                        className="p-5 rounded-2xl bg-violet/5 border border-border/60 space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-display font-bold text-foreground text-sm sm:text-base">
                            {b.name}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              b.isOpen
                                ? "bg-green-500/10 text-green-600"
                                : "bg-red-500/10 text-red-600"
                            }`}
                          >
                            {b.isOpen ? "Open" : "Closed"}
                          </span>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                            Branch Status
                          </label>
                          <select
                            value={edit.isOpen ? "true" : "false"}
                            onChange={(e) =>
                              setBranchEdits((prev) => ({
                                ...prev,
                                [b.id]: { ...edit, isOpen: e.target.value === "true" },
                              }))
                            }
                            className="mt-1.5 w-full h-10 px-3 rounded-lg bg-white border border-border outline-none transition text-xs"
                          >
                            <option value="true">Open</option>
                            <option value="false">Closed</option>
                          </select>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                              Opening Time
                            </label>
                            <input
                              type="text"
                              value={edit.openingTime}
                              onChange={(e) =>
                                setBranchEdits((prev) => ({
                                  ...prev,
                                  [b.id]: { ...edit, openingTime: e.target.value },
                                }))
                              }
                              placeholder="10:00 AM"
                              className="mt-1.5 w-full h-10 px-3 rounded-lg bg-white border border-border outline-none transition text-xs text-foreground focus:border-violet focus:ring-2 focus:ring-violet/20"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                              Closing Time
                            </label>
                            <input
                              type="text"
                              value={edit.closingTime}
                              onChange={(e) =>
                                setBranchEdits((prev) => ({
                                  ...prev,
                                  [b.id]: { ...edit, closingTime: e.target.value },
                                }))
                              }
                              placeholder="10:00 PM"
                              className="mt-1.5 w-full h-10 px-3 rounded-lg bg-white border border-border outline-none transition text-xs text-foreground focus:border-violet focus:ring-2 focus:ring-violet/20"
                            />
                          </div>
                        </div>

                        <div className="pt-2 flex justify-end">
                          <button
                            onClick={() => saveBranchChanges(b.id)}
                            disabled={savingBranchId === b.id}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white gradient-orange hover:shadow-glow disabled:opacity-75"
                          >
                            <Save className="h-3.5 w-3.5" />
                            <span>{savingBranchId === b.id ? "Saving..." : "Save Branch"}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
