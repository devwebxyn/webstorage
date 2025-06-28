// src/pages/FilesOverviewPage.tsx
import { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import apiClient from '@/services/apiClient';
import { useAuth, useUser, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { FileText, Users } from 'lucide-react'; // Ikon untuk tab

// Definisi ulang tipe CloudFile jika belum punya isPublic
interface CloudFile {
    id: number;
    file_name: string;
    path: string;
    size: number; // Ukuran dalam bytes
    created_at: string;
    is_public: boolean; // <-- Pastikan ini ada dari backend
}

type FileView = 'private' | 'shared';

export default function FilesOverviewPage() {
    const { getToken } = useAuth();
    const { user } = useUser();
    const [files, setFiles] = useState<CloudFile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentView, setCurrentView] = useState<FileView>('private'); // 'private' atau 'shared'

    useEffect(() => {
        const fetchFiles = async () => {
            setIsLoading(true);
            try {
                // Pastikan interceptor sudah disiapkan (misal di App.tsx atau main.tsx)
                // setupAxiosInterceptor(getToken); // Hanya jika belum dipanggil secara global

                let response;
                if (currentView === 'private') {
                    // Mengambil file milik user yang sedang login
                    response = await apiClient.get<CloudFile[]>('/files'); 
                } else {
                    // Mengambil semua file yang ditandai sebagai publik
                    // Pastikan endpoint ini ada di FilesController backend Anda
                    response = await apiClient.get<CloudFile[]>('/files/public');
                }
                setFiles(response.data);
            } catch (error: any) {
                console.error(`Gagal mengambil data file (${currentView}):`, error);
                alert(`Gagal mengambil data file: ${error.message || 'Terjadi kesalahan.'}`);
                setFiles([]); // Kosongkan file jika ada error
            } finally {
                setIsLoading(false);
            }
        };

        fetchFiles();
    }, [currentView, getToken, user?.id]); // Re-fetch saat view berubah atau token/user ID berubah

    const formatBytesToMB = (bytes: number) => {
        return (bytes / (1024 * 1024)).toFixed(2);
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white flex flex-col">
            <Navbar />
            <main className="flex-grow max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <h1 className="text-3xl font-bold mb-8 text-center">Kelola File Anda</h1>

                {/* Tab Navigasi */}
                <div className="mb-8 flex justify-center border-b border-gray-700">
                    <button
                        onClick={() => setCurrentView('private')}
                        className={`px-6 py-3 text-lg font-semibold flex items-center gap-2
                                    ${currentView === 'private' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}
                                    transition-colors duration-200`}
                    >
                        <FileText size={20} /> File Privat
                    </button>
                    <button
                        onClick={() => setCurrentView('shared')}
                        className={`ml-4 px-6 py-3 text-lg font-semibold flex items-center gap-2
                                    ${currentView === 'shared' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}
                                    transition-colors duration-200`}
                    >
                        <Users size={20} /> File Shared
                    </button>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
                    <h2 className="text-xl font-semibold mb-4">Daftar File ({currentView === 'private' ? 'Privat Anda' : 'Publik'})</h2>
                    {isLoading ? (
                        <p className="p-4 text-center text-gray-400">Memuat file...</p>
                    ) : files.length === 0 ? (
                        <p className="p-4 text-center text-gray-400">
                            {currentView === 'private'
                                ? 'Anda belum memiliki file privat.'
                                : 'Tidak ada file publik yang tersedia.'}
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-700">
                                <thead className="bg-gray-700">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Nama File
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Ukuran
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                            Tanggal Unggah
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-800 divide-y divide-gray-700">
                                    {files.map((file) => (
                                        <tr key={file.id} className="hover:bg-gray-700 transition-colors duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                                {file.file_name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                                {formatBytesToMB(file.size)} MB
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                                ${file.is_public ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                                    {file.is_public ? 'Shared' : 'Privat'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                                {new Date(file.created_at).toLocaleDateString('id-ID')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </div>
    );
}