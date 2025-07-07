import React from 'react';
import { FileText, Image, Video, File } from 'lucide-react';

type FilePreviewProps = {
  file: {
    type: string;
    url: string;
    name: string;
    previewUrl?: string;
  };
  className?: string;
  onClick?: () => void;
};

export const FilePreview: React.FC<FilePreviewProps> = ({ file, className = '', onClick }) => {
  const renderPreview = () => {
    const fileType = file.type.split('/')[0];
    const extension = file.name.split('.').pop()?.toLowerCase();
    const isImage = ['image'].includes(fileType) || ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '');
    const isVideo = ['video'].includes(fileType) || ['mp4', 'webm', 'ogg'].includes(extension || '');
    const isPdf = fileType === 'application/pdf' || extension === 'pdf';
    const isDocument = [
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ].includes(file.type) || ['doc', 'docx', 'txt', 'xls', 'xlsx', 'ppt', 'pptx'].includes(extension || '');

    if (isImage) {
      return (
        <div className="relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
          <img 
            src={file.previewUrl || file.url} 
            alt={file.name}
            className="max-h-full max-w-full object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = '/file-placeholder.png';
            }}
          />
        </div>
      );
    }

    if (isVideo) {
      return (
        <div className="relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
          <video 
            src={file.url} 
            className="max-h-full max-w-full"
            controls
          >
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }

    if (isPdf) {
      return (
        <div className="w-full h-40 bg-red-50 rounded-lg flex flex-col items-center justify-center p-4">
          <FileText className="h-12 w-12 text-red-500 mb-2" />
          <span className="text-sm text-gray-600 text-center truncate w-full">
            {file.name}
          </span>
        </div>
      );
    }

    if (isDocument) {
      return (
        <div className="w-full h-40 bg-blue-50 rounded-lg flex flex-col items-center justify-center p-4">
          <FileText className="h-12 w-12 text-blue-500 mb-2" />
          <span className="text-sm text-gray-600 text-center truncate w-full">
            {file.name}
          </span>
        </div>
      );
    }

    // Default file preview
    return (
      <div className="w-full h-40 bg-gray-100 rounded-lg flex flex-col items-center justify-center p-4">
        <File className="h-12 w-12 text-gray-400 mb-2" />
        <span className="text-sm text-gray-500 text-center truncate w-full">
          {file.name}
        </span>
      </div>
    );
  };

  return (
    <div 
      className={`cursor-pointer transition-all hover:shadow-md ${className}`}
      onClick={onClick}
    >
      {renderPreview()}
    </div>
  );
};

export default FilePreview;
