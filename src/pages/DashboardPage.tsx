// src/pages/DashboardPage.tsx
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { ProjectCard } from '../components/dashboard/ProjectCard';
import { CloudSummaryCard } from '../components/dashboard/CloudSummaryCard';
import { FolderCard } from '../components/dashboard/FolderCard';
import { FileTable } from '../components/dashboard/FileTable';
import { StorageUsageChart } from '../components/dashboard/StorageUsageChart';
import { FilePreviewPanel } from '../components/dashboard/FilePreviewPanel';

// Impor ikon untuk props. Pastikan Anda sudah menginstal react-icons
// npm install react-icons
import { Folder, Image as ImageIcon, Music, Download } from 'lucide-react';
// FIX: Mengubah FaMega menjadi SiMega dan mengimpor dari 'react-icons/si'
import { FaGoogleDrive, FaDropbox } from 'react-icons/fa';
import { SiMega } from 'react-icons/si';

// --- DATA DUMMY LENGKAP UNTUK DASHBOARD ---
const foldersData = [
  { name: 'Document', files: 402, Icon: Folder, color: 'text-orange-500 bg-orange-100' },
  { name: 'Pictures', files: 82, Icon: ImageIcon, color: 'text-red-500 bg-red-100' },
  { name: 'Audio', files: 46, Icon: Music, color: 'text-purple-500 bg-purple-100' },
  { name: 'Download', files: 332, Icon: Download, color: 'text-red-400 bg-red-100' },
];

const cloudDrivesData = [
    { name: 'Google Drive', files: 422, usedGB: 460, totalGB: 800, logo: <FaGoogleDrive className="text-[#4285F4] h-full w-full" />, color: '#facc15' },
    { name: 'OneDrive', files: 242, usedGB: 100, totalGB: 300, logo: <FaDropbox className="text-[#0061FE] h-full w-full" />, color: '#60a5fa' },
    // FIX: Menggunakan komponen SiMega yang sudah diimpor dengan benar
    { name: 'Mega Drive', files: 162, usedGB: 70, totalGB: 300, logo: <SiMega className="text-[#D9272E] h-full w-full" />, color: '#f472b6' },
];

// DATA UNTUK FILE TABLE YANG SEBELUMNYA HILANG
const dashboardFilesData = [
  { name: 'Figma Design System Tutorial.docx', size: '24 MB', sharedWith: '8', lastModified: '24 Des 2023' },
  { name: 'Basic UI Design.pdf', size: '18 MB', sharedWith: '10', lastModified: '16 Nov 2023' },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-12 gap-6">
        {/* Kolom Konten Tengah */}
        <section className="col-span-12 lg:col-span-8 space-y-8">
          
          {/* Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProjectCard name="Project Backstage" size="42 MB" userCount={6} bgColor="bg-orange-100" avatarOffset={1} />
            <ProjectCard name="Project Yaabook" size="26 MB" userCount={4} bgColor="bg-purple-100" avatarOffset={10} />
          </div>

          {/* My Cloud */}
          <div>
            <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-xl">My Cloud</h3><a href="#" className="text-sm font-semibold text-blue-600">See all</a></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{cloudDrivesData.map(drive => <CloudSummaryCard key={drive.name} {...drive} />)}</div>
          </div>

          {/* Folders */}
          <div>
            <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-xl">Folders</h3><a href="#" className="text-sm font-semibold text-blue-600">See all</a></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">{foldersData.map(folder => <FolderCard key={folder.name} {...folder} />)}</div>
          </div>
          
          {/* Files - PEMANGGILAN YANG SUDAH DIPERBAIKI */}
          <FileTable 
            title="Recent Files" 
            files={dashboardFilesData} 
          />
        </section>

        {/* Panel Kanan */}
        <aside className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-bold text-lg mb-4">Storage Usage</h3>
            <StorageUsageChart />
          </div>
          <FilePreviewPanel />
        </aside>
      </div>
    </DashboardLayout>
  );
}