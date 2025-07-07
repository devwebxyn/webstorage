import React from 'react';
import { Download, Link2, Eye, File, FileImage, FileVideo, FileText, FileArchive } from 'lucide-react';
import { Button } from '../ui/button';
import { useToast } from '../ui/toast';

type FileType = {
  id: string;
  name: string;
  size: string;
  type: string;
  url: string;
  previewUrl?: string;
  lastModified: string;
};

type FileGridProps = {
  files: FileType[];
  onView: (file: FileType) => void;
  onDownload: (file: FileType) => Promise<void>;
};

const getFileIcon = (type: string) => {
  if (type.startsWith('image/')) return <FileImage className="w-6 h-6" />;
  if (type.startsWith('video/')) return <FileVideo className="w-6 h-6" />;
  if (type === 'application/pdf') return <FileText className="w-6 h-6" />;
  if (['application/zip', 'application/x-rar-compressed'].includes(type)) return <FileArchive className="w-6 h-6" />;
  return <File className="w-6 h-6" />;
};

export const FileGrid: React.FC<FileGridProps> = ({ files, onView, onDownload }) => {
  const { toast } = useToast();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Tautan disalin!', 'Tautan berhasil disalin ke clipboard');
    } catch (error) {
      console.error('Gagal menyalin:', error);
      toast.error('Gagal menyalin', 'Tidak dapat menyalin ke clipboard');
    }
  };

  const renderFilePreview = (file: FileType) => {
    if (file.type.startsWith('image/')) {
      return (
        <img
          src={file.previewUrl || file.url}
          alt={file.name}
          className="w-full h-40 object-cover rounded-t-lg"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = '/file-placeholder.png';
          }}
        />
      );
    }

    if (file.type.startsWith('video/')) {
      return (
        <div className="w-full h-40 bg-black flex items-center justify-center rounded-t-lg">
          <video
            src={file.url}
            className="max-h-full max-w-full"
            controls={false}
          />
        </div>
      );
    }

    return (
      <div className="w-full h-40 bg-gray-100 flex items-center justify-center rounded-t-lg">
        <div className="text-center p-4">
          {getFileIcon(file.type)}
          <p className="mt-2 text-sm text-gray-600 truncate px-2">
            {file.name.split('.').pop()?.toUpperCase()}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
      {files.map((file) => (
        <div key={file.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
          <div 
            className="cursor-pointer"
            onClick={() => onView(file)}
          >
            {renderFilePreview(file)}
          </div>
          
          <div className="p-3">
            <h3 className="text-sm font-medium text-gray-900 truncate mb-1">{file.name}</h3>
            <p className="text-xs text-gray-500 mb-2">{file.size}</p>
            
            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  onView(file);
                }}
                title="Lihat"
              >
                <Eye className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={async (e) => {
                  e.stopPropagation();
                  await copyToClipboard(`${window.location.origin}/shared/${file.id}`);
                }}
                title="Salin Tautan"
              >
                <Link2 className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={async (e) => {
                  e.stopPropagation();
                  await onDownload(file);
                }}
                title="Unduh"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
