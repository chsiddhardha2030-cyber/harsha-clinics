import { createClient } from "@supabase/supabase-js";

const rawUrl = import.meta.env.VITE_SUPABASE_URL || "";
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

const supabaseUrl = rawUrl && rawUrl !== "https://your-project-id.supabase.co" ? rawUrl : "https://placeholder-url-for-local-testing.supabase.co";
const supabaseAnonKey = rawKey && rawKey !== "your-anon-key-here" ? rawKey : "placeholder-anon-key-for-local-testing";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const isSupabaseConfigured = () => {
  return !!rawUrl && !!rawKey && rawUrl !== "https://your-project-id.supabase.co";
};
