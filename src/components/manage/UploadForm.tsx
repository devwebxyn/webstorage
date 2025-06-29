// src/components/manage/UploadForm.tsx
import React, { useState, useCallback } from 'react';
// Ini adalah sintaks impor yang BENAR untuk versi modern react-dropzone.
// Jika ini masih error, masalahnya 100% ada di node_modules Anda.
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';
import { UploadProgressBar } from './UploadProgressBar';
import apiClient from '@/services/apiClient';
import { supabase } from '@/services/supabase';
import { useUser } from '@clerk/clerk-react';

export const UploadForm = () => {
  const { user } = useUser();
  const [uploadingFile, setUploadingFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUpload = async (file: File) => {
    if (!user) {
      alert('Anda harus login untuk mengunggah file.');
      return;
    }
    
    setUploadingFile(file);
    setUploadProgress(0);

    try {
      const bucketName = 'cloudnest-files';
      const filePath = `${user.id}/private/${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, { cacheControl: '3600', upsert: false });

      if (uploadError) throw uploadError;

      // Simulasi progress bar
      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        if (progress > 100) progress = 100;
        
        setUploadProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          apiClient.post('/files', {
            fileName: file.name,
            path: filePath,
            size: file.size,
            isPublic: false,
          }).then(() => {
             alert(`File "${file.name}" berhasil diunggah!`);
             setTimeout(() => setUploadingFile(null), 1000);
          }).catch(apiError => {
            console.error("Gagal menyimpan metadata:", apiError);
            alert("Upload ke storage berhasil, tapi gagal menyimpan data ke database.");
            setUploadingFile(null);
          });
        }
      }, 200);

    } catch (error: any) {
      console.error('Upload failed:', error);
      alert(`Upload Gagal: ${error.message}`);
      setUploadingFile(null);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      handleUpload(acceptedFiles[0]);
    }
  }, [user]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false });

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 h-full flex flex-col">
      <h3 className="font-bold text-xl text-slate-800 mb-4">Upload Files</h3>
      <div
        {...getRootProps()}
        className={`flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-slate-50 hover:bg-slate-100'
        }`}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-slate-600">
            <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">Video, Document, Image, etc.</p>
        </div>
      </div>
      {uploadingFile && (
        <div className="mt-4">
          <UploadProgressBar fileName={uploadingFile.name} progress={uploadProgress} />
        </div>
      )}
    </div>
  );
};