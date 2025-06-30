// src/pages/SharedFilesPage.tsx
import { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { FileTable } from '../components/dashboard/FileTable';
import apiClient from '@/services/apiClient';
import { Users } from 'lucide-react'; // Menggunakan ikon yang berbeda

interface ApiFile {
  id: number;
  file_name: string;
  size: number;
  created_at: string;
}

export default function SharedFilesPage() {
  const [sharedFiles, setSharedFiles] = useState<ApiFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      setIsLoading(true);
      try {
        // Panggil endpoint backend untuk mendapatkan file publik
        const response = await apiClient.get<ApiFile[]>('/files/public');
        setSharedFiles(response.data);
      } catch (error) {
        console.error("Gagal mengambil file shared:", error);
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
          <Users className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-bold text-slate-800">Shared Files</h1>
        </div>

        {isLoading ? (
          <p className="text-center text-slate-500">Memuat data...</p>
        ) : (
          <FileTable 
            title="All Publicly Shared Files"
            files={sharedFiles.map(file => ({
              name: file.file_name,
              size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
              sharedWith: '0', // Placeholder
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