import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Supabase client for use in Server Components and Server Actions.
 * A single shared instance is safe because Next.js server code runs
 * in an isolated environment per request (no shared state across users).
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
