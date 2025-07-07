import * as React from 'react';
import { useState, useEffect, useCallback, memo } from 'react';
import { X, Download, Link as LinkIcon, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useToast } from '../ui/toast';

import { FileType } from '@/types/file';

// Helper function to format file size
const formatFileSize = (bytes: number) => {
  if (!bytes || bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Helper function to get file type from URL or name
const getFileType = (file: { url: string; name: string; type?: string }) => {
  if (file.type) return file.type;
  
  const extension = file.name.split('.').pop()?.toLowerCase() || '';
  const urlExtension = file.url.split('.').pop()?.toLowerCase() || '';
  
  const extensionMap: Record<string, string> = {
    // Images
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'svg': 'image/svg+xml',
    // Videos
    'mp4': 'video/mp4',
    'webm': 'video/webm',
    'ogg': 'video/ogg',
    'mov': 'video/quicktime',
    // Documents
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'xls': 'application/vnd.ms-excel',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'ppt': 'application/vnd.ms-powerpoint',
    'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  };
  
  return extensionMap[extension] || extensionMap[urlExtension] || 'application/octet-stream';
};

type FilePreviewModalProps = {
  file: FileType | null;
  onClose: () => void;
  onDownload?: (file: FileType) => Promise<void> | void;
};

const FilePreviewModal = ({
  file,
  onClose,
  onDownload,
}: FilePreviewModalProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const copyShareLink = useCallback(async () => {
    if (!file) return;
    
    try {
      await navigator.clipboard.writeText(file.url);
      toast.success('Tautan disalin!', 'Tautan berhasil disalin ke clipboard');
    } catch (error) {
      console.error('Gagal menyalin tautan:', error);
      toast.error('Gagal menyalin', 'Tidak dapat menyalin tautan ke clipboard');
    }
  }, [file, toast]);

  const loadFile = useCallback(async () => {
    if (!file) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const detectedType = getFileType(file);
      const typeGroup = detectedType.split('/')[0];
      
      setFileType(typeGroup);
      
      if (isMegaUrl(file.url)) {
        // Tetap set preview URL untuk memungkinkan preview jika memungkinkan
        setPreviewUrl(file.url);
        setIsLoading(false);
        return;
      }
      
      setPreviewUrl(file.url);
      setIsLoading(false);
    } catch (err) {
      console.error('Error loading file:', err);
      setError('Gagal memuat pratinjau file. Silakan coba lagi.');
      setIsLoading(false);
    }
  }, [file]);

  useEffect(() => {
    let isMounted = true;
    
    const loadFileData = async () => {
      if (!file) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Process file type
        const detectedType = getFileType(file);
        const typeGroup = detectedType.split('/')[0];
        
        if (isMounted) {
          setFileType(typeGroup);
          
          // Check if it's a MEGA.nz URL
          if (isMegaUrl(file.url)) {
            setError('File berada di MEGA.nz. Silakan gunakan tombol unduh di bawah.');
            setIsLoading(false);
            return;
          }
          
          // Get file extension for type checking
          const extension = file.name.split('.').pop()?.toLowerCase() || '';
          const isImage = typeGroup === 'image' || ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension);
          const isVideo = typeGroup === 'video' || ['mp4', 'webm', 'ogg', 'mov'].includes(extension);
          
          // Set a timeout for all file loading
          const timeout = setTimeout(() => {
            if (isMounted && isLoading) {
              setError('Waktu pemuatan file habis. Server mungkin lambat atau file terlalu besar.');
              setIsLoading(false);
            }
          }, 15000); // 15 second timeout
          
          if (isImage) {
            // For images, verify the URL is accessible
            try {
              const response = await fetch(file.url, { method: 'HEAD' });
              if (!response.ok) throw new Error('Gagal memuat gambar');
              
              const img = new Image();
              img.src = file.url;
              
              img.onload = () => {
                clearTimeout(timeout);
                if (isMounted) {
                  setPreviewUrl(file.url);
                  setIsLoading(false);
                }
              };
              
              img.onerror = () => {
                clearTimeout(timeout);
                if (isMounted) {
                  setError('Format gambar tidak didukung');
                  setIsLoading(false);
                }
              };
            } catch (err) {
              clearTimeout(timeout);
              if (isMounted) {
                setError('Tidak dapat mengakses file');
                setIsLoading(false);
              }
            }
          } else if (isVideo) {
            // For videos, just set the URL and let the video element handle it
            clearTimeout(timeout);
            setPreviewUrl(file.url);
            setIsLoading(false);
          } else {
            // For other files, just set the URL and let the browser handle it
            clearTimeout(timeout);
            setPreviewUrl(file.url);
            setIsLoading(false);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError('Gagal memproses file');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    if (file) {
      loadFile();
    }
    
    return () => {
      isMounted = false;
    };
  }, [file, loadFile]);

  const getFileExtension = (filename: string): string => {
    return filename.split('.').pop()?.toLowerCase() || '';
  };

  const isMegaUrl = (url: string): boolean => {
    return url.includes('mega.nz') || url.includes('mega.co.nz');
  };

  const getFileInfo = useCallback(() => {
    if (!file) return null;
    
    const extension = getFileExtension(file.name);
    const isImage = fileType === 'image' || ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension);
    const isVideo = fileType === 'video' || ['mp4', 'webm', 'ogg', 'mov'].includes(extension);
    const isPdf = fileType === 'application' && (file.type?.includes('pdf') || extension === 'pdf');
    const isDocument = [
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ].some(t => file.type?.includes(t) || ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(extension));
    
    // Hanya mengembalikan nilai, tidak ada deklarasi variabel di sini

    return { extension, isImage, isVideo, isPdf, isDocument };
  }, [file, fileType]);

  const renderLoading = () => (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <Loader2 className="w-8 h-8 text-gray-500 animate-spin mb-4" />
      <p className="text-gray-600">Memuat pratinjau...</p>
    </div>
  );

  const renderError = () => {
    if (!file) return null;
    
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <EyeOff className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Gagal Memuat Pratinjau</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <a 
          href={file.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Buka file di tab baru
        </a>
      </div>
    );
  };

  const renderContent = useCallback((): React.ReactNode => {
    if (!file) return null;
    
    const fileInfo = getFileInfo();
    if (!fileInfo) return null;
    
    const { extension, isImage, isVideo, isPdf, isDocument } = fileInfo;

    if (isLoading) return renderLoading();
    if (error) return renderError();
    
    // Semua deklarasi variabel sekarang berada di getFileInfo()

    // Handle image previews
    if (isImage) {
      return (
        <div className="flex-1 flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-900 relative">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10">
              <div className="flex flex-col items-center">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-2" />
                <p className="text-sm text-gray-600">Memuat gambar...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg text-center">
              <EyeOff className="w-16 h-16 text-red-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Gagal Memuat Gambar</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <div className="flex gap-4">
                <Button 
                  variant="outline"
                  onClick={() => window.open(file.url, '_blank')}
                >
                  Buka di Tab Baru
                </Button>
                <Button 
                  variant="default"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = file.url;
                    link.download = file.name;
                    link.click();
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Unduh
                </Button>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <img 
                src={previewUrl}
                alt={file.name}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-lg bg-white"
                onError={() => {
                  setError('Gagal menampilkan gambar');
                }}
              />
            </div>
          )}
        </div>
      );
    }

    // Handle video previews
    if (isVideo && file) {
      return (
        <div className="w-full max-w-4xl mx-auto p-4 bg-gray-100 dark:bg-gray-900 rounded-lg relative">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
              <div className="flex flex-col items-center">
                <Loader2 className="w-8 h-8 text-white animate-spin mb-2" />
                <p className="text-sm text-white">Memuat video...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg text-center">
              <EyeOff className="w-16 h-16 text-red-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Gagal Memutar Video</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <div className="flex gap-4">
                <Button 
                  variant="outline"
                  onClick={() => window.open(file.url, '_blank')}
                >
                  Putar di Tab Baru
                </Button>
                <Button 
                  variant="default"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = file.url;
                    link.download = file.name;
                    link.click();
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Unduh
                </Button>
              </div>
            </div>
          ) : (
            <div className="relative w-full max-h-[80vh] bg-black rounded-lg overflow-hidden">
              <video 
                controls 
                autoPlay
                className="w-full h-full object-contain"
                src={previewUrl}
                onError={() => {
                  setError('Tidak dapat memutar video');
                }}
              >
                Browser Anda tidak mendukung pemutaran video.
              </video>
            </div>
          )}
        </div>
      );
    }

    // Handle PDF previews
    if (isPdf && file) {
      return (
        <div className="w-full h-full bg-gray-100 dark:bg-gray-900 p-4">
          <div className="relative w-full h-[80vh] bg-white rounded-lg shadow-lg overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10">
                <div className="flex flex-col items-center">
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-2" />
                  <p className="text-sm text-gray-600">Memuat dokumen...</p>
                </div>
              </div>
            )}
            
            {error ? (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                <EyeOff className="w-16 h-16 text-red-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Gagal Memuat Dokumen</h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <div className="flex gap-4">
                  <Button 
                    variant="outline"
                    onClick={() => window.open(file.url, '_blank')}
                  >
                    Buka di Tab Baru
                  </Button>
                  <Button 
                    variant="default"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = file.url;
                      link.download = file.name;
                      link.click();
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Unduh
                  </Button>
                </div>
              </div>
            ) : (
              <iframe 
                src={`${previewUrl}#view=fitH`}
                className="w-full h-full border-0"
                title={file.name}
                onLoad={() => {
                  setIsLoading(false);
                  setError(null);
                }}
                onError={() => {
                  setError('Tidak dapat memuat pratinjau PDF');
                  setIsLoading(false);
                }}
              />
            )}
          </div>
        </div>
      );
    }

    // Handle MEGA.nz files
    if (isMegaUrl(file.url)) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="bg-yellow-100 p-4 rounded-full mb-4">
            <EyeOff className="w-12 h-12 text-yellow-600" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            File Berada di MEGA.nz
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            File ini disimpan di MEGA.nz. Silakan gunakan tombol di bawah untuk mengunduh atau membuka file.
          </p>
          <div className="flex flex-col space-y-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
            <div className="text-left">
              <span className="font-medium">Nama:</span> {file.name}
            </div>
            {file.size && (
              <div className="text-left">
                <span className="font-medium">Ukuran:</span> {formatFileSize(typeof file.size === 'string' ? parseInt(file.size) : file.size || 0)}
              </div>
            )}
          </div>
          <div className="flex gap-4">
            <Button 
              variant="outline"
              onClick={() => window.open(file.url, '_blank')}
            >
              Buka di MEGA.nz
            </Button>
            <Button 
              variant="default"
              onClick={() => onDownload?.(file)}
            >
              <Download className="w-4 h-4 mr-2" />
              Unduh File
            </Button>
          </div>
          <div className="mt-4 text-sm text-yellow-600 dark:text-yellow-400">
            <p>Pastikan Anda sudah login ke MEGA.nz untuk mengunduh file.</p>
          </div>
        </div>
      );
    }

    // Handle document previews using Google Docs Viewer
    if (isDocument && file) {
      const googleDocsUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(file.url)}&embedded=true`;
      return (
        <div className="w-full h-full bg-gray-100 dark:bg-gray-900 p-4">
          <iframe
            src={googleDocsUrl}
            className="w-full h-[80vh] border-0 rounded-lg shadow-lg bg-white"
            title={`Preview ${file.name}`}
          ></iframe>
        </div>
      );
    }

    // Default view for unsupported file types or MEGA.nz files
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-gray-50 dark:bg-gray-800 rounded-lg">
        <EyeOff className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
          {isMegaUrl(file.url) ? 'File Berada di MEGA.nz' : 'Pratinjau tidak tersedia'}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {isMegaUrl(file.url) 
            ? 'Untuk file di MEGA.nz, silakan gunakan tombol unduh di bawah.'
            : 'Format file ini tidak mendukung pratinjau.'
          }
        </p>
        <div className="flex flex-col space-y-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <div className="text-left">
            <span className="font-medium">Nama:</span> {file.name}
          </div>
          {file.size && (
            <div className="text-left">
              <span className="font-medium">Ukuran:</span> {formatFileSize(typeof file.size === 'string' ? parseInt(file.size) : file.size)}
            </div>
          )}
          {isMegaUrl(file.url) && (
            <div className="mt-4 text-sm text-yellow-600 dark:text-yellow-400">
              <p>Pastikan Anda sudah login ke MEGA.nz untuk mengunduh file.</p>
            </div>
          )}
        </div>
        <div className="flex gap-4">
          <Button 
            variant="outline"
            onClick={() => window.open(file.url, '_blank')}
          >
            Buka di Tab Baru
          </Button>
          <Button 
            variant="default"
            onClick={() => {
              const link = document.createElement('a');
              link.href = file.url;
              link.download = file.name;
              link.click();
            }}
          >
            <Download className="w-4 h-4 mr-2" />
            Unduh File
          </Button>
        </div>
      </div>
    );
  }, [file, fileType, previewUrl, isLoading, error]);

  if (!file) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="relative w-full max-w-6xl bg-white rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-medium text-gray-900 truncate max-w-[70%]">
              {file.name}
            </h2>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={copyShareLink}
                title="Salin tautan"
              >
                <LinkIcon className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => onDownload?.(file)}
                title="Unduh file"
              >
                <Download className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
                title="Tutup"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-auto">
            {renderContent()}
          </div>
          
          {/* Footer */}
          <div className="p-4 border-t bg-gray-50">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {file.type}{file.size && ` • ${file.size}`}
              </span>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={onClose}>
                  Tutup
                </Button>
                <Button onClick={() => onDownload?.(file)} className="gap-2">
                  <Download className="h-4 w-4" />
                  Unduh
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MemoizedFilePreviewModal = memo(FilePreviewModal, (prevProps, nextProps) => {
  return prevProps.file?.url === nextProps.file?.url;
});

MemoizedFilePreviewModal.displayName = 'FilePreviewModal';

export default MemoizedFilePreviewModal;
