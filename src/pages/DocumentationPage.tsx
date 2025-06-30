// src/pages/DocumentationPage.tsx
import { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar'; 
import { Footer } from '../components/layout/Footer';
import { GettingStarted } from '../components/docs/content/GettingStarted';
import { UploadFile } from '../components/docs/content/UploadFile';
import { CreateBucket } from '../components/docs/content/CreateBucket';
import { motion, AnimatePresence } from 'framer-motion'; // Pastikan AnimatePresence diimpor

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState('pendahuluan');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State baru untuk sidebar mobile

  useEffect(() => {
    const handleHashChange = () => {
      setActiveSection(window.location.hash.substring(1) || 'pendahuluan');
      // Tutup sidebar saat navigasi hash berubah di mobile
      if (window.innerWidth < 1024) { // Sesuaikan dengan breakpoint lg Tailwind
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  // Fungsi untuk membuka/menutup sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navLinks = [
    { category: 'Mulai', links: [ { title: 'Pendahuluan', id: 'pendahuluan' }, { title: 'API Keys', id: 'api-keys' }, { title: 'Instalasi SDK', id: 'instalasi-sdk' }] },
    { category: 'Autentikasi', links: [ { title: 'Bearer Token', id: 'bearer-token' }, { title: 'Kode Error', id: 'auth-errors' }] },
    { category: 'File API', links: [ { title: 'Upload File', id: 'upload-file' }, { title: 'Download File', id: 'download-file' }, { title: 'List Files', id: 'list-files' }, { title: 'Hapus File', id: 'delete-file' }] },
    { category: 'Bucket API', links: [ { title: 'Buat Bucket', id: 'create-bucket' }, { title: 'List Buckets', id: 'list-buckets' }, { title: 'Detail Bucket', id: 'detail-bucket' }, { title: 'Hapus Bucket', id: 'delete-bucket' }] },
    { category: 'Lanjutan', links: [ { title: 'Webhooks', id: 'webhooks' }, { title: 'Rate Limiting', id: 'rate-limiting' }, { title: 'Versioning', id: 'versioning' }] },
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'pendahuluan':
      case 'api-keys':
      case 'instalasi-sdk':
        return <GettingStarted />;
      case 'upload-file':
        return <UploadFile />;
      case 'create-bucket':
        return <CreateBucket />;
      // ... tambahkan case untuk bagian dokumentasi lainnya
      case 'bearer-token': 
        return (
            <section id="bearer-token" className="scroll-mt-24">
                <h2>Bearer Token</h2>
                <p>Detail tentang cara menggunakan Bearer Token untuk autentikasi API akan dijelaskan di sini.</p>
            </section>
        );
      case 'auth-errors': 
        return (
            <section id="auth-errors" className="scroll-mt-24">
                <h2>Kode Error Autentikasi</h2>
                <p>Daftar kode error yang terkait dengan autentikasi dan cara menanganinya.</p>
            </section>
        );
      case 'download-file': 
        return (
            <section id="download-file" className="scroll-mt-24">
                <h2>Download File</h2>
                <p>Panduan untuk mengunduh file dari CloudNest Storage.</p>
            </section>
        );
      case 'list-files': 
        return (
            <section id="list-files" className="scroll-mt-24">
                <h2>List Files</h2>
                <p>Cara mendapatkan daftar file dalam bucket tertentu.</p>
            </section>
        );
      case 'delete-file': 
        return (
            <section id="delete-file" className="scroll-mt-24">
                <h2>Hapus File</h2>
                <p>Instruksi untuk menghapus file dari CloudNest Storage.</p>
            </section>
        );
      case 'list-buckets': 
        return (
            <section id="list-buckets" className="scroll-mt-24">
                <h2>List Buckets</h2>
                <p>Cara mendapatkan daftar semua bucket yang ada di proyek Anda.</p>
            </section>
        );
      case 'detail-bucket': 
        return (
            <section id="detail-bucket" className="scroll-mt-24">
                <h2>Detail Bucket</h2>
                <p>Melihat detail konfigurasi sebuah bucket.</p>
            </section>
        );
      case 'delete-bucket': 
        return (
            <section id="delete-bucket" className="scroll-mt-24">
                <h2>Hapus Bucket</h2>
                <p>Cara menghapus bucket dari proyek Anda.</p>
            </section>
        );
      case 'webhooks': 
        return (
            <section id="webhooks" className="scroll-mt-24">
                <h2>Webhooks</h2>
                <p>Konfigurasi dan penggunaan webhooks untuk event notifikasi.</p>
            </section>
        );
      case 'rate-limiting': 
        return (
            <section id="rate-limiting" className="scroll-mt-24">
                <h2>Rate Limiting</h2>
                <p>Informasi tentang batasan rate API dan cara menanganinya.</p>
            </section>
        );
      case 'versioning': 
        return (
            <section id="versioning" className="scroll-mt-24">
                <h2>Versioning</h2>
                <p>Detail tentang bagaimana versioning file bekerja di CloudNest.</p>
            </section>
        );
      default:
        return (
          <section id={activeSection} className="scroll-mt-24">
            <h2>{activeSection.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h2>
            <p>Dokumentasi untuk bagian ini sedang dalam pengembangan.</p>
          </section>
        );
    }
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen flex flex-col">
      {/* Navbar utama */}
      <Navbar /> {/* Teruskan fungsi toggleSidebar */}

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
        {/* Konten utama dengan grid untuk desktop */}
        <div className="lg:grid lg:grid-cols-[280px_1fr_280px] lg:gap-8 pt-24 pb-8">
          
          {/* Navigasi Kiri (Sidebar) untuk Desktop */}
          <aside className="hidden lg:block sticky top-24 self-start max-h-[calc(100vh-6rem)] overflow-y-auto pr-4">
            <nav>
              {navLinks.map((group) => (
                <div key={group.category} className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">{group.category}</h3>
                  <ul className="space-y-2">
                    {group.links.map((link) => (
                      <li key={link.id}>
                        <a 
                          href={`#${link.id}`} 
                          className={`transition-colors text-base ${activeSection === link.id ? 'text-blue-400 font-semibold' : 'text-gray-300 hover:text-white'}`}
                        >
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>
          
          {/* Konten Utama Dokumentasi */}
          <main className="prose prose-invert max-w-none prose-h1:text-4xl prose-h2:text-2xl prose-h2:border-b prose-h2:border-gray-700 prose-h2:pb-2">
            {renderActiveSection()}
          </main>
          
          {/* Navigasi Kanan (On this page) - Opsional, hidden di mobile secara default */}
          <aside className="hidden lg:block sticky top-24 self-start max-h-[calc(100vh-6rem)] overflow-y-auto pl-4">
             <nav>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">On this page</h3>
                {/* Anda dapat menambahkan logika untuk menghasilkan tautan 'on this page' di sini */}
                <ul>
                    {navLinks.find(group => group.links.some(link => link.id === activeSection))?.links.map(link => (
                        <li key={`on-page-${link.id}`}>
                            <a 
                                href={`#${link.id}`} 
                                className={`transition-colors text-sm ${activeSection === link.id ? 'text-blue-400 font-semibold' : 'text-gray-500 hover:text-white'}`}
                            >
                                {link.title}
                            </a>
                        </li>
                    ))}
                </ul>
             </nav>
          </aside>

        </div>
      </div>

      {/* Off-canvas / Drawer untuk Navigasi Dokumentasi (Mobile) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: '-100%' }} // Mulai dari luar layar kiri
            animate={{ x: '0%' }}   // Geser ke dalam layar
            exit={{ x: '-100%' }}   // Geser keluar layar
            transition={{ type: 'tween', duration: 0.2 }}
            className="fixed inset-y-0 left-0 w-64 bg-gray-900 border-r border-gray-700 z-40 lg:hidden overflow-y-auto pt-20"
          >
            <nav className="p-4">
              {navLinks.map((group) => (
                <div key={group.category} className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">{group.category}</h3>
                  <ul className="space-y-2">
                    {group.links.map((link) => (
                      <li key={link.id}>
                        <a 
                          href={`#${link.id}`} 
                          onClick={() => setIsSidebarOpen(false)} // Tutup sidebar saat link diklik
                          className={`transition-colors text-base ${activeSection === link.id ? 'text-blue-400 font-semibold' : 'text-gray-300 hover:text-white'}`}
                        >
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay untuk menutup sidebar saat diklik di luar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}