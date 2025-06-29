// src/components/manage/UploadForm.tsx
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';
import toast from 'react-hot-toast';
import { UploadProgressBar } from './UploadProgressBar';
import { PostUploadModal } from './PostUploadModal';
import apiClient from '@/services/apiClient';
import { useUser } from '@clerk/clerk-react';

type FileMetadata = {
  id: string;
  fileName: string;
};

export const UploadForm = () => {
  const { user } = useUser();
  const [uploadingFile, setUploadingFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedFileMetadata, setUploadedFileMetadata] = useState<FileMetadata | null>(null);

  const onUploadSuccess = (metadata: FileMetadata) => {
    toast.success(`File "${metadata.fileName}" berhasil diunggah!`);
    setUploadedFileMetadata(metadata);
    setIsModalOpen(true);
    setUploadingFile(null);
  };

  const onUploadError = (message: string) => {
    toast.error(message);
    setUploadingFile(null);
  };

  const handleMakeShared = async () => {
    if (!uploadedFileMetadata) return;
    const toastId = toast.loading('Mengubah status file...');
    try {
      await apiClient.patch(`/files/${uploadedFileMetadata.id}`, { isPublic: true });
      toast.success('File sekarang bersifat publik (shared).', { id: toastId });
    } catch (error) {
      toast.error('Gagal mengubah status file.', { id: toastId });
    } finally {
      setIsModalOpen(false);
      setUploadedFileMetadata(null);
    }
  };

  const handleMoveToFolder = () => {
    toast.success('Fitur folder akan segera hadir!', { icon: '📁' });
    setIsModalOpen(false);
    setUploadedFileMetadata(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUploadedFileMetadata(null);
  }

  const uploadToMega = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await apiClient.post('/upload/mega', formData, {
        onUploadProgress: (progressEvent) => {
          const total = progressEvent.total ?? file.size;
          const percentCompleted = Math.round((progressEvent.loaded * 100) / total);
          setUploadProgress(percentCompleted);
        },
      });
      onUploadSuccess({ id: response.data.file.id, fileName: response.data.file.name });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Upload ke MEGA gagal.';
      onUploadError(errorMessage);
    }
  };

  const handleUpload = async (file: File) => {
    if (!user) {
      toast.error('Anda harus login untuk mengunggah file.');
      return;
    }
    setUploadingFile(file);
    setUploadProgress(0);
    await uploadToMega(file);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      handleUpload(acceptedFiles[0]);
    }
  }, [user]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false });

  return (
    <>
      <PostUploadModal
        isOpen={isModalOpen}
        fileName={uploadedFileMetadata?.fileName || ''}
        onClose={handleCloseModal}
        onMakeShared={handleMakeShared}
        onMoveToFolder={handleMoveToFolder}
      />
      <div className="bg-white p-6 rounded-xl border border-gray-200 h-full flex flex-col">
        <h3 className="font-bold text-xl text-slate-800 mb-6">Upload Files to MEGA</h3>
        
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
    </>
  );
};