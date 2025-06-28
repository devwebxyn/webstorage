// src/pages/DocumentationPage.tsx
import { useState, useEffect } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

// Impor semua komponen konten baru kita
import { GettingStarted } from '../components/docs/content/GettingStarted';
import { UploadFile } from '../components/docs/content/UploadFile';
import { CreateBucket } from '../components/docs/content/CreateBucket';
// Anda bisa terus mengimpor komponen lain di sini saat Anda membuatnya

export default function DocumentationPage() {
  // State untuk melacak section mana yang aktif
  const [activeSection, setActiveSection] = useState('pendahuluan');

  // Efek untuk mendeteksi perubahan hash di URL dan update state
  useEffect(() => {
    const handleHashChange = () => {
      setActiveSection(window.location.hash.substring(1) || 'pendahuluan');
    };
    window.addEventListener('hashchange', handleHashChange);
    // Jalankan sekali saat pertama kali load
    handleHashChange(); 
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  // Data untuk navigasi (tetap sama)
  const navLinks = [
    { category: 'Mulai', links: [ { title: 'Pendahuluan', id: 'pendahuluan' }, { title: 'API Keys', id: 'api-keys' }, { title: 'Instalasi SDK', id: 'instalasi-sdk' }] },
    { category: 'Autentikasi', links: [ { title: 'Bearer Token', id: 'bearer-token' }, { title: 'Kode Error', id: 'auth-errors' }] },
    { category: 'File API', links: [ { title: 'Upload File', id: 'upload-file' }, { title: 'Download File', id: 'download-file' }, { title: 'List Files', id: 'list-files' }, { title: 'Hapus File', id: 'delete-file' }] },
    { category: 'Bucket API', links: [ { title: 'Buat Bucket', id: 'create-bucket' }, { title: 'List Buckets', id: 'list-buckets' }, { title: 'Detail Bucket', id: 'detail-bucket' }, { title: 'Hapus Bucket', id: 'delete-bucket' }] },
    { category: 'Lanjutan', links: [ { title: 'Webhooks', id: 'webhooks' }, { title: 'Rate Limiting', id: 'rate-limiting' }, { title: 'Versioning', id: 'versioning' }] },
  ];

  // Fungsi untuk menampilkan komponen konten yang sesuai
  const renderActiveSection = () => {
    // Untuk sekarang, kita hanya punya 3 contoh. Sisanya bisa menampilkan placeholder.
    switch (activeSection) {
      case 'pendahuluan':
      case 'api-keys':
      case 'instalasi-sdk':
        return <GettingStarted />;
      case 'upload-file':
        return <UploadFile />;
      case 'create-bucket':
        return <CreateBucket />;
      default:
        return (
          <section id={activeSection} className="scroll-mt-24">
            <h2>{activeSection.replace('-', ' ')}</h2>
            <p>Dokumentasi untuk bagian ini sedang dalam pengembangan.</p>
          </section>
        );
    }
  };

  return (
    <div className="bg-gray-950 text-white">
      <Navbar />
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="lg:grid lg:grid-cols-[280px_1fr_280px] lg:gap-8">
          
          <aside className="hidden lg:block sticky top-24 self-start max-h-[calc(100vh-6rem)] overflow-y-auto">
            {/* Sidebar Kiri */}
            <nav>
              {navLinks.map((group) => (
                <div key={group.category} className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">{group.category}</h3>
                  <ul className="space-y-2">
                    {group.links.map((link) => (
                      <li key={link.id}>
                        <a href={`#${link.id}`} className={`transition-colors ${activeSection === link.id ? 'text-blue-400 font-semibold' : 'text-gray-300 hover:text-white'}`}>
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>
          
          <main className="prose prose-invert max-w-none prose-h1:text-4xl prose-h2:text-2xl prose-h2:border-b prose-h2:border-gray-700 prose-h2:pb-2">
            {renderActiveSection()}
          </main>
          
          <aside className="hidden lg:block sticky top-24 self-start">
             {/* Sidebar Kanan bisa dibuat lebih dinamis nanti */}
             <nav>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">On this page</h3>
             </nav>
          </aside>

        </div>
      </div>
      <Footer />
    </div>
  );
}