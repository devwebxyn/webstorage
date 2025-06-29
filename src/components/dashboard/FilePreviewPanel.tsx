// src/components/dashboard/FilePreviewPanel.tsx
import { CheckCircle2, FileText } from 'lucide-react';

export const FilePreviewPanel = () => (
    <div className="bg-white p-4 rounded-xl border border-gray-200">
       <h3 className="font-bold text-lg text-slate-800 mb-2">File Preview</h3>
       <div className="aspect-video bg-orange-200 rounded-lg flex items-center justify-center mb-3">
           {/* Placeholder for PDF icon or preview */}
           <FileText size={48} className="text-orange-500 opacity-60"/>
       </div>
       <h4 className="font-semibold text-slate-800">Basic UI Design for Beginner.pdf</h4>
       <p className="text-sm text-slate-500 mb-3">10 MB - Dibagikan ke 89 Members</p>
       <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-slate-500">
                <CheckCircle2 size={16} className="text-green-500"/>
                <span>By Members</span>
            </div>
            <a href="#" className="font-semibold text-blue-600">Download</a>
       </div>
       <p className="text-xs text-slate-500 mt-2">
           Desain antarmuka dasar dan prinsip UI secara visual...
       </p>
    </div>
);
