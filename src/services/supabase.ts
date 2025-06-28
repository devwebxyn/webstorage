// src/services/supabase.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Ambil variabel lingkungan dari Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Pastikan variabel lingkungan tersedia
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase URL or Anon Key. Please check your .env file.');
  //throw new Error('Supabase URL and Anon Key are required!'); // Anda bisa membuat ini throw error
}

// Buat satu instance Supabase Client
export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey
);