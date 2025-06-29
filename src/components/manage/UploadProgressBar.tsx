// src/components/manage/UploadProgressBar.tsx
import { File, X } from 'lucide-react';

type Props = {
  fileName: string;
  progress: number; // 0 to 100
};

export const UploadProgressBar = ({ fileName, progress }: Props) => (
  <div className="w-full bg-slate-100 rounded-lg p-4 flex items-center gap-4 border border-slate-200">
    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
      <File size={24} />
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-center mb-1">
        <p className="text-sm font-semibold text-slate-800">{fileName}</p>
        <p className="text-sm font-bold text-slate-600">{Math.round(progress)}%</p>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>
    </div>
    <button className="text-slate-400 hover:text-slate-700">
      <X size={20} />
    </button>
  </div>
);