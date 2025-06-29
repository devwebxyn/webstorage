// src/pages/PrivateFilesPage.tsx
import { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { FileTable } from '../components/dashboard/FileTable'; // Kita gunakan kembali komponen tabel file
import apiClient from '@/services/apiClient';
import { FileText } from 'lucide-react';

// Definisikan tipe data untuk file yang akan diterima dari API
interface ApiFile {
  id: number;
  file_name: string;
  size: number;
  created_at: string;
  // Tambahkan properti lain jika ada, contoh:
  // sharedWith: number;
}

export default function PrivateFilesPage() {
  const [privateFiles, setPrivateFiles] = useState<ApiFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      setIsLoading(true);
      try {
        // Panggil endpoint backend untuk mendapatkan file privat
        const response = await apiClient.get<ApiFile[]>('/files');
        setPrivateFiles(response.data);
      } catch (error) {
        console.error("Gagal mengambil file privat:", error);
        // Anda bisa menambahkan notifikasi error di sini
      } finally {
        setIsLoading(false);
      }
    };

    fetchFiles();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <FileText className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-slate-800">Private Files</h1>
        </div>
        
        {isLoading ? (
          <p className="text-center text-slate-500">Memuat data...</p>
        ) : (
          <FileTable 
            title="All Your Private Files"
            files={privateFiles.map(file => ({
              name: file.file_name,
              size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
              sharedWith: 1, // Placeholder, ganti dengan data asli jika ada
              lastModified: new Date(file.created_at).toLocaleDateString('id-ID', {
                  day: '2-digit', month: 'short', year: 'numeric'
              }),
            }))}
          />
        )}
      </div>
    </DashboardLayout>
  );
}