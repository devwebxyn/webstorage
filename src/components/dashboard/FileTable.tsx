// src/components/dashboard/FileTable.tsx
import React from 'react';
import { MoreVertical, FileText, Share2, Trash2, Link as LinkIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'; // Impor ini sekarang akan berhasil

// Definisikan tipe data untuk setiap baris file
type FileData = {
  name: string;
  size: string;
  sharedWith: string; // Tipe sudah benar (string)
  lastModified: string;
};

// Definisikan props untuk komponen
type FileTableProps = {
  title: string;
  files: FileData[];
};

export const FileTable: React.FC<FileTableProps> = ({ title, files }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Size
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Shared With
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Modified
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {files.length > 0 ? (
              files.map((file, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center gap-3">
                     <FileText className="w-5 h-5 text-gray-400"/>
                    {file.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.size}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {file.sharedWith}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.lastModified}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                          <MoreVertical size={18} />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Share2 className="mr-2 h-4 w-4" />
                          <span>Share</span>
                        </DropdownMenuItem>
                         <DropdownMenuItem>
                          <LinkIcon className="mr-2 h-4 w-4" />
                          <span>Get link</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-10 text-sm text-gray-500">
                  Tidak ada file yang ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};