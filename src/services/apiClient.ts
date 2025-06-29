// src/services/apiClient.ts
import axios from 'axios';

// Kita buat sebuah variabel untuk "menampung" fungsi getToken dari Clerk
let getAuthToken: (() => Promise<string | null>) | null = null;

// Ini adalah fungsi yang akan kita panggil dari komponen React
// untuk memberikan fungsi getToken ke apiClient
export const setAuthTokenFunction = (tokenFetcher: () => Promise<string | null>) => {
  getAuthToken = tokenFetcher;
};

// Buat instance Axios dasar
const apiClient = axios.create({
  // PERBAIKAN: Tambahkan /api di akhir baseURL
  baseURL: 'http://localhost:3000/api', 
});

// Interceptor untuk menyisipkan token autentikasi secara otomatis
apiClient.interceptors.request.use(
  async (config) => {
    // Periksa apakah fungsi getAuthToken sudah diberikan
    if (getAuthToken) {
      const token = await getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;