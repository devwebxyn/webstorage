// src/components/manage/PostUploadModal.tsx
import React from 'react';
import { File, Folder, Share2, X } from 'lucide-react';

type PostUploadModalProps = {
  fileName: string;
  isOpen: boolean;
  onClose: () => void;
  onMakeShared: () => void;
  onMoveToFolder: () => void;
};

export const PostUploadModal: React.FC<PostUploadModalProps> = ({
  isOpen,
  fileName,
  onClose,
  onMakeShared,
  onMoveToFolder,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md m-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-slate-800">Upload Selesai!</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={24} />
          </button>
        </div>
        <p className="text-slate-600 mb-6">
          File <span className="font-semibold text-blue-600">{fileName}</span> berhasil diunggah. Apa yang ingin Anda lakukan?
        </p>

        <div className="space-y-3">
          <button
            onClick={onMakeShared}
            className="w-full flex items-center gap-3 text-left p-4 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all"
          >
            <Share2 className="w-5 h-5 text-blue-500" />
            <div>
              <p className="font-semibold text-slate-700">Jadikan File Shared</p>
              <p className="text-xs text-slate-500">Dapatkan link untuk berbagi file ini.</p>
            </div>
          </button>

          <button
            onClick={onMoveToFolder}
            className="w-full flex items-center gap-3 text-left p-4 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all"
          >
            <Folder className="w-5 h-5 text-orange-500" />
            <div>
              <p className="font-semibold text-slate-700">Pindahkan ke Folder</p>
              <p className="text-xs text-slate-500">Organisir file Anda ke dalam folder tertentu.</p>
            </div>
          </button>

           <button
            onClick={onClose}
            className="w-full flex items-center gap-3 text-left p-4 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all"
          >
            <File className="w-5 h-5 text-slate-500" />
            <div>
              <p className="font-semibold text-slate-700">Simpan di Private</p>
              <p className="text-xs text-slate-500">Tutup dan simpan sebagai file pribadi.</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};