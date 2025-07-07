export type FileType = {
  id: string;
  name: string;
  size: string;  // Changed to string only to match FilePreviewModal
  type: string;
  url: string;
  previewUrl?: string;
  lastModified: string;
};
