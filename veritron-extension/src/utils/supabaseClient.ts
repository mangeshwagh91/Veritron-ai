import { createClient } from '@supabase/supabase-js';

export const createSupabaseClient = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase credentials. Please check your .env file.');
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}; 