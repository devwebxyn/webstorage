// frontend/src/services/apiClient.ts
import axios from 'axios';

// Pastikan URL ini sesuai dengan port backend NestJS Anda (defaultnya 3000)
const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3000/api', 
    headers: {
        'Accept': 'application/json',
    }
});

// Fungsi ini akan dipanggil dari komponen untuk menyisipkan token Clerk
export const setupAxiosInterceptor = (getToken: () => Promise<string | null>) => {
    apiClient.interceptors.request.use(async (config) => {
        // Mengambil token dari Clerk setiap kali ada request
        const token = await getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
};

export default apiClient;