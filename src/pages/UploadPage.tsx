// src/pages/UploadPage.tsx
import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import apiClient from '@/services/apiClient';
import { supabase } from '@/services/supabase'; // Import supabase instance
import { useAuth, useUser } from '@clerk/clerk-react';
import { FileUp } from 'lucide-react';

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isPublic, setIsPublic] = useState(false); // State untuk privat/shared
  const [isUploading, setIsUploading] = useState(false);
  const { getToken } = useAuth();
  const { user } = useUser();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Pilih file terlebih dahulu.');
      return;
    }
    if (!user?.id) {
        alert('Anda harus login untuk mengunggah file.');
        return;
    }

    setIsUploading(true);
    try {
      // Setup Axios Interceptor di sini atau pastikan sudah di App.tsx/main.tsx
      // Jika Anda memanggilnya di DashboardPage, pastikan juga dipanggil di sini
      // atau di root App.tsx agar global
      // setupAxiosInterceptor(getToken); // Panggil hanya jika belum global

      const bucketName = 'cloudnest-files'; // Ganti dengan nama bucket Supabase Anda
      // Path file di storage akan menyertakan ID pengguna dan/atau indikator public/private
      const filePathInStorage = `${user.id}/${isPublic ? 'public' : 'private'}/${Date.now()}-${selectedFile.name}`;
      
      // 1. Upload file langsung ke Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePathInStorage, selectedFile);

      if (uploadError) throw uploadError;

      // 2. Kirim metadata ke backend NestJS untuk disimpan ke DB
      const { data: newFileData } = await apiClient.post('/files', {
        fileName: selectedFile.name,
        path: filePathInStorage, // Simpan path lengkap di DB
        size: selectedFile.size,
        isPublic: isPublic, // Kirim status privat/shared ke backend
      });

      alert(`File "${newFileData.file_name}" berhasil diunggah sebagai ${isPublic ? 'Shared' : 'Private'}!`);
      // Reset form
      setSelectedFile(null);
      setIsPublic(false);
      // Opsional: Arahkan pengguna ke halaman file setelah upload
      // navigate('/dashboard/files'); 

    } catch (error: any) {
      console.error('Gagal mengunggah file:', error);
      alert(`Gagal mengunggah file: ${error.message || 'Terjadi kesalahan tidak dikenal.'}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-3xl font-bold mb-8 text-center">Unggah File Baru</h1>

        <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
          <div className="mb-6">
            <label htmlFor="file-input" className="block text-gray-300 text-sm font-bold mb-2">
              Pilih File:
            </label>
            <input
              id="file-input"
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-300
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-500 file:text-white
                hover:file:bg-blue-600 cursor-pointer"
            />
            {selectedFile && (
              <p className="mt-2 text-sm text-gray-400">File dipilih: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-bold mb-2">
              Visibilitas:
            </label>
            <div className="flex items-center gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-blue-500 bg-gray-700 border-gray-600 focus:ring-blue-500"
                  name="visibility"
                  value="private"
                  checked={!isPublic}
                  onChange={() => setIsPublic(false)}
                  disabled={isUploading}
                />
                <span className="ml-2 text-gray-300">Privat (Hanya Anda)</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-blue-500 bg-gray-700 border-gray-600 focus:ring-blue-500"
                  name="visibility"
                  value="public"
                  checked={isPublic}
                  onChange={() => setIsPublic(true)}
                  disabled={isUploading}
                />
                <span className="ml-2 text-gray-300">Shared (Publik)</span>
              </label>
            </div>
          </div>

          <button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className={`w-full flex items-center justify-center py-3 px-6 rounded-lg font-bold text-lg transition-all
              ${!selectedFile || isUploading ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
          >
            <FileUp className="mr-2" size={20} /> {isUploading ? 'Mengunggah...' : 'Unggah File'}
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}