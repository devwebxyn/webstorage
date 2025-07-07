import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { FileGrid } from '@/components/dashboard/FileGrid';
import FilePreviewModal from '@/components/dashboard/FilePreviewModal';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import apiClient from '@/services/apiClient';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

// Tipe data untuk file
type FileType = {
  id: string;
  name: string;
  size: string;
  type: string;
  url: string;
  previewUrl?: string;
  lastModified: string;
};

export default function PrivateFilesPage() {
  const [files, setFiles] = useState<FileType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<FileType | null>(null);
  const { getToken } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const fetchFiles = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = await getToken();
      if (!token) {
        throw new Error('Anda harus login untuk melihat file pribadi');
      }

      const response = await apiClient.get<Array<{
        id: string;
        fileName: string;
        size: number;
        type: string;
        url: string;
        previewUrl?: string;
        createdAt: string;
      }>>('/files', {
        params: { isPublic: 'false' },
        headers: { 
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });

      const formattedFiles = response.data.map(file => ({
        id: file.id,
        name: file.fileName,
        size: formatFileSize(file.size),
        type: file.type || 'application/octet-stream',
        url: file.url,
        previewUrl: file.previewUrl,
        lastModified: new Date(file.createdAt).toLocaleString('id-ID', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }));

      setFiles(formattedFiles);
    } catch (error) {
      console.error('Gagal mengambil file:', error);
      let errorMessage = 'Terjadi kesalahan saat memuat file';
      
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          errorMessage = 'Sesi Anda telah berakhir. Silakan login kembali.';
        } else if (error.response?.status === 403) {
          errorMessage = 'Anda tidak memiliki izin untuk mengakses file ini';
        } else if (error.code === 'ERR_NETWORK') {
          errorMessage = 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.';
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Gagal memuat file",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (file: FileType) => {
    try {
      const token = await getToken();
      if (!token) throw new Error('Tidak terautentikasi');

      const response = await fetch(file.url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Gagal mengunduh file');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Unduhan dimulai",
        description: `Mengunduh ${file.name}`,
      });
    } catch (error) {
      console.error('Gagal mengunduh file:', error);
      toast({
        variant: "destructive",
        title: "Gagal mengunduh",
        description: error instanceof Error ? error.message : 'Terjadi kesalahan saat mengunduh file',
      });
    }
  };

  const handleUpload = () => {
    navigate('/manage');
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">File Pribadi</h1>
            <p className="text-sm text-gray-500 mt-1">Semua file pribadi Anda tersimpan di sini</p>
          </div>
          <Button 
            onClick={fetchFiles} 
            variant="outline" 
            size="sm" 
            disabled={loading}
            className="flex items-center gap-2"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            <span>Segarkan</span>
          </Button>
        </div>

        {loading && files.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
            <p className="text-gray-500">Memuat file...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h3 className="text-lg font-medium text-red-800 mb-2">Gagal Memuat File</h3>
            <p className="text-red-700 mb-6">{error}</p>
            <Button 
              onClick={fetchFiles}
              variant="outline"
              className="text-red-700 border-red-300 hover:bg-red-50"
            >
              Coba Lagi
            </Button>
          </div>
        ) : files.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Tidak ada file</h3>
            <p className="text-gray-500 mb-6">Mulai unggah file pertama Anda</p>
            <Button onClick={handleUpload}>Unggah File</Button>
          </div>
        ) : (
          <FileGrid 
            files={files}
            onView={setPreviewFile}
            onDownload={handleDownload}
          />
        )}

        {/* File Preview Modal */}
        <FilePreviewModal
          file={previewFile}
          onClose={() => setPreviewFile(null)}
          onDownload={handleDownload}
        />
      </div>
    </DashboardLayout>
  );
}
