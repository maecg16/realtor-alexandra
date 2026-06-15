import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://pafkhikabeuleilrbnya.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhZmtoaWthYmV1bGVpbHJibnlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1MjQzMjksImV4cCI6MjA5NzEwMDMyOX0.vzLeKLTqxzsQ91AYEXq3vaGGM2xYPrAQ-uqMiwfG6bA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
