// src/pages/PrivateFilesPage.tsx
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { FileTable } from '../components/dashboard/FileTable';
import apiClient from '@/services/apiClient';

// Tipe data dari API (tetap fleksibel dengan `any`)
type ApiFile = {
  id: number;
  fileName: string;
  size: number;
  createdAt: string;
  isPublic: boolean;
};

// Tipe data yang dibutuhkan oleh komponen FileTable
type TableFile = {
  name: string;
  size: string;
  sharedWith: string; // <-- PERBAIKAN: Ubah dari number ke string
  lastModified: string;
};

// Data untuk Tab
const TABS = [
  { id: 'all', label: 'Semua' },
  { id: 'supabase', label: 'Supabase' },
  { id: 'mega', label: 'MEGA' },
  { id: 'internxt', label: 'Internxt' },
];

export default function PrivateFilesPage() {
  const [files, setFiles] = useState<TableFile[]>([]); // Gunakan tipe TableFile
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      try {
        let url = '/files'; // Endpoint dasar untuk mengambil file privat
        
        // Logika filter berdasarkan tab tetap dipertahankan
        const params: Record<string, string | boolean> = { isPublic: 'false' };
        if (activeTab !== 'all') {
          params.provider = activeTab;
        }

        const response = await apiClient.get<ApiFile[]>(url, { params });

        // Konversi dari API ke struktur yang diinginkan oleh FileTable
        const formatted = response.data.map((file: ApiFile) => ({
          name: file.fileName,
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          sharedWith: file.isPublic ? 'Public' : 'Only you', // <-- Ini adalah string
          lastModified: new Date(file.createdAt).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          }),
        }));

        setFiles(formatted);
      } catch (error) {
        console.error('Gagal mengambil file:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [activeTab]);

  return (
    // Membungkus semua konten dengan DashboardLayout untuk konsistensi
    <DashboardLayout>
      <div className="space-y-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Private Files</h1>
          <p className="text-slate-500 mt-1">Kelola semua file pribadi Anda di sini.</p>
        </div>

        {/* Komponen Tabs */}
        <div className="border-b border-slate-200">
          <nav className="-mb-px flex space-x-6 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                  ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {loading ? (
          <p className="text-center text-slate-500 py-10">Memuat file...</p>
        ) : (
          <FileTable 
            title="File Pribadi" 
            files={files} 
          />
        )}
      </div>
    </DashboardLayout>
  );
}