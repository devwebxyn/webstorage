// src/components/dashboard/HeaderActionBar.tsx
import { Search, PlusCircle, Upload } from 'lucide-react';
import { Link } from 'react-router-dom'; // Pastikan Link diimpor

export const HeaderActionBar = () => (
  <div className="flex-1 flex items-center gap-4">
    <div className="relative w-full max-w-sm">
      {/* ... input pencarian ... */}
    </div>
    {/* Ubah menjadi Link */}
    <Link to="/dashboard/manage-files" className="hidden md:flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-slate-700 font-semibold hover:bg-slate-100">
      <PlusCircle size={20} /> Create
    </Link>
    <Link to="/dashboard/manage-files" className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800">
      <Upload size={20} /> Upload
    </Link>
  </div>
);