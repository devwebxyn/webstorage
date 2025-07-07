// src/services/apiClient.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Inisialisasi Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Buat instance Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Buat variabel untuk menyimpan fungsi getToken dari Clerk
let getAuthToken: (() => Promise<string | null>) | null = null;

// Fungsi untuk menyetel fungsi getToken dari Clerk
export const setAuthTokenFunction = (tokenFetcher: () => Promise<string | null>) => {
  getAuthToken = tokenFetcher;
  
  // Set up interceptor untuk menambahkan token ke header request
  supabase.auth.onAuthStateChange(async (event) => {
    if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
      const token = await getAuthToken?.();
      if (token) {
        // Set the session with the token
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
          return;
        }
        
        // Update the session with the new token
        const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
          access_token: token,
          refresh_token: data.session?.refresh_token || ''
        });
        
        if (sessionError) {
          console.error('Error updating session:', sessionError);
        }
      }
    }
  });
};

// Buat fungsi untuk fetch data dari Supabase Storage
const fetchFilesFromSupabase = async (isPublic: boolean = false) => {
  try {
    const { data: files, error } = await supabase
      .storage
      .from('files')
      .list('', {
        sortBy: { column: 'created_at', order: 'desc' },
      });

    if (error) throw error;
    
    return files.map(file => ({
      id: file.id,
      name: file.name,
      size: file.metadata?.size || 0,
      type: file.metadata?.mimetype || 'application/octet-stream',
      url: `${supabaseUrl}/storage/v1/object/public/files/${file.name}`,
      lastModified: file.created_at,
    }));
  } catch (error) {
    console.error('Error fetching files from Supabase:', error);
    throw error;
  }
};

// Ekspor fungsi-fungsi API
export const apiClient = {
  get: async (url: string, config?: any) => {
    if (url === '/files') {
      const isPublic = config?.params?.isPublic === 'true';
      return { data: await fetchFilesFromSupabase(isPublic) };
    }
    throw new Error(`Unhandled API endpoint: ${url}`);
  },
  // Tambahkan method lain (post, put, delete) sesuai kebutuhan
};

export default apiClient;