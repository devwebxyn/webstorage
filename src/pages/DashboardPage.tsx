// frontend/src/pages/DashboardPage.tsx
import { useAuth, UserButton } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import apiClient, { setupAxiosInterceptor } from '@/services/apiClient'; // Menggunakan path alias

// Tipe data untuk file agar TypeScript senang
interface CloudFile {
    id: number;
    file_name: string;
    size: number;
    created_at: string;
}

export default function DashboardPage() {
    const { getToken } = useAuth();
    const [files, setFiles] = useState<CloudFile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);

    // Inisialisasi Supabase client HANYA untuk storage
    // Pastikan variabel ini ada di file .env frontend Anda
    const supabase = createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_ANON_KEY
    );

    useEffect(() => {
        // Setup Axios Interceptor agar setiap request membawa token Clerk
        setupAxiosInterceptor(getToken);

        const fetchFiles = async () => {
            setIsLoading(true);
            try {
                // Memanggil backend NestJS kita
                const response = await apiClient.get('/files');
                setFiles(response.data);
            } catch (error) {
                console.error('Gagal mengambil data file:', error);
                alert('Gagal mengambil data. Sesi Anda mungkin telah habis. Silakan login kembali.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchFiles();
    }, [getToken]);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            // 1. Upload file langsung ke Supabase Storage
            const filePath = `public/${Date.now()}-${file.name}`;
            const { error: uploadError } = await supabase.storage
                .from('cloudnest-files') // PENTING: Pastikan nama bucket ini ada di Supabase Anda
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // 2. Kirim metadata ke backend NestJS untuk disimpan ke DB
            const { data: newFileData } = await apiClient.post('/files', {
                fileName: file.name,
                path: filePath,
                size: file.size,
            });

            // 3. Perbarui daftar file di UI secara langsung untuk UX yang baik
            setFiles(currentFiles => [newFileData, ...currentFiles]);
            alert('File berhasil diunggah!');

        } catch (error: any) {
            console.error('Gagal mengunggah file:', error);
            alert(`Gagal mengunggah file: ${error.message}`);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <header className="bg-gray-800 shadow-md p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">CloudNest Dashboard</h1>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-300">Selamat Datang!</span>
                    <UserButton afterSignOutUrl="/" />
                </div>
            </header>
            <main className="p-8 max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">File Anda</h2>
                    <div>
                        <label htmlFor="file-upload" className={`cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            {isUploading ? 'Mengunggah...' : 'Upload File'}
                        </label>
                        <input id="file-upload" type="file" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
                    </div>
                </div>
                <div className="bg-gray-800 rounded-lg shadow-inner">
                    {isLoading ? (
                        <p className="p-4 text-center text-gray-400">Memuat data file...</p>
                    ) : files.length > 0 ? (
                        <ul className="divide-y divide-gray-700">
                            {files.map(file => (
                                <li key={file.id} className="p-4 flex justify-between items-center hover:bg-gray-700/50">
                                    <span className="font-medium">{file.file_name}</span>
                                    <span className="text-sm text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="p-8 text-center text-gray-400">Anda belum memiliki file. Silakan unggah file pertama Anda.</p>
                    )}
                </div>
            </main>
        </div>
    );
}