// src/components/dashboard/FileTable.tsx
import React, { useState } from 'react';
import { MoreVertical, FileText, Share2, Trash2, Link as LinkIcon, Download, Eye, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { useToast } from '../ui/toast';

// Definisikan tipe data untuk setiap baris file
type FileData = {
  id: string;
  name: string;
  size: string;
  sharedWith: string;
  lastModified: string;
  url: string;
  type: string;
};

// Definisikan props untuk komponen
type FileTableProps = {
  title: string;
  files: FileData[];
};

export const FileTable: React.FC<FileTableProps> = ({ title, files }) => {
  const [previewFile, setPreviewFile] = useState<FileData | null>(null);
  const { showToast } = useToast();

  const handleDownload = (file: FileData) => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async (file: FileData) => {
    try {
      await navigator.share({
        title: file.name,
        text: `Check out this file: ${file.name}`,
        url: file.url,
      });
    } catch (err) {
      console.error('Error sharing:', err);
      // Fallback to copy link
      navigator.clipboard.writeText(file.url);
      showToast('Link copied to clipboard');
    }
  };

  const getPreviewContent = (file: FileData) => {
    const fileType = file.type.split('/')[0];
    
    switch (fileType) {
      case 'image':
        return <img src={file.url} alt={file.name} className="max-w-full max-h-[70vh] object-contain" />;
      case 'video':
        return <video src={file.url} controls className="max-w-full max-h-[70vh]" />;
      case 'audio':
        return <audio src={file.url} controls className="w-full" />;
      case 'application':
        if (file.type.includes('pdf')) {
          return (
            <iframe 
              src={`${file.url}#toolbar=0&navpanes=0`} 
              className="w-full h-[70vh] border-0"
              title={file.name}
            />
          );
        }
        // Fallback for other application types
        return (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <FileText className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-lg font-medium">Preview not available</p>
            <p className="text-sm text-gray-500 mt-1">Download the file to view its contents</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => handleDownload(file)}
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <FileText className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-lg font-medium">Preview not available</p>
            <p className="text-sm text-gray-500 mt-1">This file type cannot be previewed</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => handleDownload(file)}
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        );
    }
  };
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
                  <td 
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center gap-3 hover:text-blue-600 cursor-pointer"
                    onClick={() => setPreviewFile(file)}
                  >
                    <FileText className="w-5 h-5 text-gray-400 flex-shrink-0"/>
                    <span className="truncate max-w-xs">{file.name}</span>
                    <Eye className="w-4 h-4 ml-2 text-gray-400 hover:text-blue-600" />
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
                        <DropdownMenuItem onClick={() => handleShare(file)}>
                          <Share2 className="mr-2 h-4 w-4" />
                          <span>Share</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          navigator.clipboard.writeText(file.url);
                          showToast('Link copied to clipboard');
                        }}>
                          <LinkIcon className="mr-2 h-4 w-4" />
                          <span>Copy link</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDownload(file)}>
                          <Download className="mr-2 h-4 w-4" />
                          <span>Download</span>
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
      
      {/* File Preview Dialog */}
      <Dialog open={!!previewFile} onOpenChange={(open) => !open && setPreviewFile(null)}>
        {previewFile && (
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <div className="flex justify-between items-center">
                <DialogTitle className="text-lg font-medium truncate pr-4">{previewFile.name}</DialogTitle>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownload(previewFile)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleShare(previewFile)}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => setPreviewFile(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </DialogHeader>
            <div className="mt-4 flex justify-center items-center min-h-[400px] bg-gray-50 rounded-lg p-4">
              {getPreviewContent(previewFile)}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};