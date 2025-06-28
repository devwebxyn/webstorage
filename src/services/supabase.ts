// src/services/supabase.ts

import { createClient } from '@supabase/supabase-js'

// Ambil URL dan Anon Key dari Environment Variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Buat dan ekspor client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)