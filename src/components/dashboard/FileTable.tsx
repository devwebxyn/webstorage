// src/components/dashboard/FileTable.tsx
import { File } from 'lucide-react';

type FileData = {
  name: string;
  size: string;
  sharedWith: number;
  lastModified: string;
};

type FileTableProps = {
  title: string;
  // FIX: Tambahkan `files` sebagai prop opsional dengan nilai default array kosong
  files?: FileData[]; 
};

// FIX: Beri nilai default `[]` pada `files` di dalam parameter fungsi
export const FileTable = ({ title, files = [] }: FileTableProps) => (
  <div>
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-bold text-xl text-slate-800">{title}</h3>
      <a href="#" className="text-sm font-semibold text-blue-600">See all</a>
    </div>
    <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-500 uppercase bg-slate-50">
          <tr>
            <th scope="col" className="px-6 py-4">File Name</th>
            <th scope="col" className="px-6 py-3">Size</th>
            <th scope="col" className="px-6 py-3">Shared With</th>
            <th scope="col" className="px-6 py-3">Last Modified</th>
          </tr>
        </thead>
        <tbody>
          {/* Sekarang ini aman, karena `files` tidak akan pernah undefined */}
          {files.length > 0 ? (
            files.map(file => (
              <tr key={file.name} className="border-b hover:bg-slate-50">
                <th scope="row" className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap flex items-center gap-3">
                  <File size={20} className="text-blue-500 flex-shrink-0" /> <span className="truncate">{file.name}</span>
                </th>
                <td className="px-6 py-4 text-slate-600">{file.size}</td>
                <td className="px-6 py-4 text-slate-600">{file.sharedWith > 0 ? `${file.sharedWith} Members` : 'Only you'}</td>
                <td className="px-6 py-4 text-slate-600">{file.lastModified}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-8 text-slate-500">
                Tidak ada file untuk ditampilkan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);