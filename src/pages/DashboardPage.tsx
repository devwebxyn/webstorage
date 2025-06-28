// frontend/src/pages/DashboardPage.tsx
import { useEffect, useState } from 'react';
import { useAuth, useUser, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Navbar from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import apiClient, { setupAxiosInterceptor } from '@/services/apiClient';
import { supabase } from '@/services/supabase'; // Import supabase instance
import { FileUp, FolderDot, Share2, Activity, PieChart as PieChartIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // <-- Import useNavigate

// Tipe data untuk file dari backend Anda
interface CloudFile {
    id: number;
    file_name: string;
    path: string; // Pastikan ini ada di entity File Anda di backend
    size: number; // Ukuran dalam bytes
    created_at: string;
}

// Tipe data untuk breakdown storage
interface StorageBreakdownItem {
    type: string;
    size: number; // dalam GB
    color: string;
}

// Tipe data untuk recent activities
interface ActivityLog {
    id: number | string;
    icon: string;
    description: string;
    time: string;
}

export default function DashboardPage() {
    const { getToken } = useAuth();
    const { user } = useUser();
    const navigate = useNavigate(); // <-- Inisialisasi useNavigate
    
    const [files, setFiles] = useState<CloudFile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    // isUploading tidak lagi dibutuhkan di sini karena upload dipindah
    // const [isUploading, setIsUploading] = useState(false); 

    // State untuk data overview
    const [totalFiles, setTotalFiles] = useState(0);
    const [totalFolders, setTotalFolders] = useState(0);
    const [storageUsedBytes, setStorageUsedBytes] = useState(0); // dalam bytes
    const storageCapacityBytes = 100 * 1024 * 1024 * 1024; // Contoh: 100 GB dalam bytes
    const [sharedFiles, setSharedFiles] = useState(0); 
    const [recentActivities, setRecentActivities] = useState<ActivityLog[]>([]);
    const [storageBreakdown, setStorageBreakdown] = useState<StorageBreakdownItem[]>([]);

    // Supabase client sekarang diimpor sebagai singleton dari services/supabase.ts
    // Jadi baris ini sudah tidak diperlukan di sini:
    // const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    // const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    // const supabase = createClient(supabaseUrl, supabaseAnonKey);

    useEffect(() => {
        setupAxiosInterceptor(getToken);

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const filesResponse = await apiClient.get<CloudFile[]>('/files');
                const fetchedFiles = filesResponse.data;
                setFiles(fetchedFiles);

                let currentTotalFiles = fetchedFiles.length;
                let currentStorageUsed = 0;
                const fileTypeCounts: { [key: string]: number } = {
                    Docs: 0, Images: 0, Videos: 0, Others: 0
                };
                const folderPaths = new Set<string>();

                fetchedFiles.forEach((file: CloudFile) => {
                    currentStorageUsed += file.size;

                    const fileNameParts = file.file_name.split('.');
                    const extension = fileNameParts.length > 1 ? fileNameParts.pop()?.toLowerCase() : 'none';

                    if (['pdf', 'doc', 'docx', 'txt', 'ppt', 'pptx', 'xls', 'xlsx'].includes(extension || '')) {
                        fileTypeCounts.Docs += file.size;
                    } else if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'].includes(extension || '')) {
                        fileTypeCounts.Images += file.size;
                    } else if (['mp4', 'mov', 'avi', 'mkv'].includes(extension || '')) {
                        fileTypeCounts.Videos += file.size;
                    } else {
                        fileTypeCounts.Others += file.size;
                    }

                    const pathSegments = file.path.split('/');
                    if (pathSegments.length > 1) {
                        pathSegments.pop();
                        let currentFolder = '';
                        for (const segment of pathSegments) {
                            if (segment) {
                                currentFolder += segment + '/';
                                folderPaths.add(currentFolder);
                            }
                        }
                    }
                });

                setTotalFiles(currentTotalFiles);
                setTotalFolders(folderPaths.size);
                setStorageUsedBytes(currentStorageUsed);

                const breakdown: StorageBreakdownItem[] = Object.keys(fileTypeCounts).map(type => ({
                    type,
                    size: (fileTypeCounts[type] / (1024 * 1024 * 1024)),
                    color: {
                        Docs: '#8b5cf6',
                        Images: '#3b82f6',
                        Videos: '#ef4444',
                        Others: '#eab308'
                    }[type] || '#ccc',
                }));
                setStorageBreakdown(breakdown);

                const recentFileActivities: ActivityLog[] = fetchedFiles
                    .sort((a: CloudFile, b: CloudFile) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                    .slice(0, 5)
                    .map((file: CloudFile) => ({
                        id: file.id,
                        icon: '⬆️',
                        description: `Mengupload "${file.file_name}"`,
                        time: new Date(file.created_at).toLocaleString('id-ID', {
                            hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short'
                        }),
                    }));
                setRecentActivities(recentFileActivities);

            } catch (error: any) {
                console.error('Gagal mengambil data dashboard:', error);
                alert('Gagal mengambil data dashboard. Sesi Anda mungkin telah habis atau server tidak merespons. Silakan coba lagi.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [getToken]);

    // handleFileUpload tidak lagi ada di sini, diganti dengan navigasi
    const handleUploadClick = () => {
        navigate('/upload'); // Mengarahkan ke halaman upload baru
    };

    const getPieChartSegments = (data: StorageBreakdownItem[]) => {
      let currentAngle = 0;
      const segments = data.map((item: StorageBreakdownItem) => {
        const percentage = item.size / (storageCapacityBytes / (1024 * 1024 * 1024));
        const angle = percentage * 3.6;
        const segment = {
          color: item.color,
          startAngle: currentAngle,
          endAngle: currentAngle + angle,
          percentage: percentage,
          value: item.size
        };
        currentAngle += angle;
        return segment;
      });
      return segments;
    };

    const pieSegments = getPieChartSegments(storageBreakdown);
    const currentUserName = user?.firstName || user?.username || "Pengguna CloudNest";

    const storageUsedGB = (storageUsedBytes / (1024 * 1024 * 1024)).toFixed(2);
    const storageCapacityGB = (storageCapacityBytes / (1024 * 1024 * 1024));
    const storagePercentage = (storageUsedBytes / storageCapacityBytes) * 100;

    return (
        <div className="bg-gray-950 text-white min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
                {isLoading ? (
                    <div className="text-center py-10">
                        <p className="text-xl text-blue-400">Memuat data dashboard...</p>
                    </div>
                ) : (
                    <>
                        {/* Header Section */}
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {currentUserName} 👋</h1>
                            <p className="text-gray-400 text-lg">Anda memiliki {totalFiles} file dan {totalFolders} folder, menggunakan {storageUsedGB}GB dari {storageCapacityGB}GB storage Anda.</p>
                        </div>

                        {/* Stat Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="bg-gray-800 p-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-700">
                                <h3 className="text-gray-400 text-sm font-semibold mb-2 flex items-center"><FileUp className="mr-2" size={16}/>Total Files</h3>
                                <p className="text-3xl font-bold text-blue-400">{totalFiles}</p>
                            </div>
                            <div className="bg-gray-800 p-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-700">
                                <h3 className="text-gray-400 text-sm font-semibold mb-2 flex items-center"><FolderDot className="mr-2" size={16}/>Total Folders</h3>
                                <p className="text-3xl font-bold text-purple-400">{totalFolders}</p>
                            </div>
                            <div className="bg-gray-800 p-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-700">
                                <h3 className="text-gray-400 text-sm font-semibold mb-2 flex items-center"><PieChartIcon className="mr-2" size={16}/>Storage Used</h3>
                                <p className="text-3xl font-bold text-green-400 mb-3">{storageUsedGB}GB</p>
                                <div className="w-full bg-gray-700 rounded-full h-2.5">
                                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${storagePercentage.toFixed(1)}%` }}></div>
                                </div>
                                <span className="text-gray-500 text-xs mt-1 block">{storagePercentage.toFixed(1)}% dari {storageCapacityGB}GB</span>
                            </div>
                            <div className="bg-gray-800 p-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-700">
                                <h3 className="text-gray-400 text-sm font-semibold mb-2 flex items-center"><Share2 className="mr-2" size={16}/>Shared Files</h3>
                                <p className="text-3xl font-bold text-yellow-400">{sharedFiles}</p>
                            </div>
                        </div>

                        {/* Quick Actions & Recent Activities */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
                                <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={handleUploadClick} // <-- Mengarahkan ke halaman upload
                                        className={`flex-1 flex items-center justify-center py-3 px-6 rounded-lg font-semibold transition-all
                                        ${isLoading ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                                        disabled={isLoading} // Menonaktifkan tombol saat loading
                                    >
                                        <FileUp className="mr-2" size={20}/> Upload File
                                    </button>
                                    {/* Input file telah dihapus dari sini */}
                                    <button className="flex-1 flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                                        <FolderDot className="mr-2" size={20}/> New Folder
                                    </button>
                                    <button className="flex-1 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                                        <Share2 className="mr-2" size={20}/> Share
                                    </button>
                                </div>
                            </div>

                            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
                                <h2 className="text-xl font-semibold text-white mb-4 flex items-center"><Activity className="mr-2" size={20}/>Recent Activities</h2>
                                <div className="max-h-64 overflow-y-auto">
                                    <ul className="space-y-3">
                                        {recentActivities.length > 0 ? (
                                            recentActivities.map((activity) => (
                                                <li key={activity.id} className="flex items-center bg-gray-900 p-3 rounded-lg hover:bg-gray-700/50 transition-colors duration-200">
                                                    <span className="text-xl mr-3">{activity.icon}</span>
                                                    <div className="flex-grow">
                                                        <p className="text-gray-300">{activity.description}</p>
                                                        <span className="text-xs text-gray-500">{activity.time}</span>
                                                    </div>
                                                </li>
                                            ))
                                        ) : (
                                            <p className="text-gray-400 text-center">Tidak ada aktivitas terbaru.</p>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Storage Breakdown Chart */}
                        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
                            <h2 className="text-xl font-semibold text-white mb-4 flex items-center"><PieChartIcon className="mr-2" size={20}/>Storage Breakdown</h2>
                            <div className="flex flex-col md:flex-row items-center justify-center h-64">
                                {/* Pie Chart Visualization (Basic SVG, untuk fitur lengkap pakai Recharts) */}
                                <div className="relative w-48 h-48 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg viewBox="0 0 100 100" className="w-full h-full">
                                        {pieSegments.map((segment, index) => (
                                            <path
                                                key={index}
                                                d={`M 50 50 L 50 0 A 50 50 0 ${segment.endAngle - segment.startAngle > 180 ? 1 : 0} 1 ${
                                                    50 + 50 * Math.sin(segment.endAngle * Math.PI / 180)
                                                } ${
                                                    50 - 50 * Math.cos(segment.endAngle * Math.PI / 180)
                                                } Z`}
                                                fill={segment.color}
                                                transform={`rotate(${segment.startAngle} 50 50)`}
                                            />
                                        ))}
                                        <circle cx="50" cy="50" r="25" fill="#1f2937" />
                                    </svg>
                                </div>
                                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6 md:mt-0 md:ml-8">
                                    {storageBreakdown.length > 0 ? (
                                        storageBreakdown.map((data) => (
                                            <div key={data.type} className="flex items-center">
                                                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: data.color }}></span>
                                                <span className="text-gray-300">{data.type} ({data.size.toFixed(2)}GB)</span>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-400">Tidak ada data storage.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </main>

            <Footer />
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </div>
    );
}