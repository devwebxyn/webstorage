// frontend/src/components/layout/Navbar.tsx

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Pastikan AnimatePresence diimpor
import { Link, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Logo } from '../../assets/Logo';
import { Menu, X } from 'lucide-react';

// Tambahkan prop onToggleDocMenu
interface NavbarProps {
  onToggleDocMenu?: () => void; // Fungsi opsional untuk mengaktifkan/menonaktifkan menu dokumentasi
}

// Ubah fungsi Navbar menjadi React.FC dengan props yang baru
export default function Navbar({ onToggleDocMenu }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  // isMenuOpen ini sekarang hanya untuk menu navigasi UTAMA (Fitur, Integrasi, Testimoni, Login/Register)
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fungsi untuk menutup menu utama mobile
  const closeMainMenu = () => setIsMainMenuOpen(false);

  // Fungsi cerdas untuk menentukan path link navigasi
  const getNavLink = (path: string) => {
    // Jika kita di halaman dokumentasi, tautan # harus tetap di halaman dokumentasi
    if (location.pathname.startsWith('/documentation') && path.startsWith('#')) {
      return `/documentation${path}`;
    }
    // Jika tidak, berperilaku normal (ke section di landing page)
    return location.pathname === '/' ? path : `/${path}`;
  };

  // Tentukan apakah kita di halaman dokumentasi
  const isDocumentationPage = location.pathname.startsWith('/documentation');

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gray-900/80 backdrop-blur-lg border-b border-gray-700 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo dan Judul Proyek */}
          <Link to="/" className="flex items-center space-x-3">
            <Logo className="h-12 w-12 rounded-full border-2 border-blue-500 p-1 bg-gray-800 shadow-lg" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              CloudNest
            </span>
          </Link>

          {/* Navigasi untuk Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Tautan untuk halaman non-dokumentasi */}
            {!isDocumentationPage && (
              <>
                <Link to={getNavLink('#features')} className="text-gray-300 hover:text-blue-400 transition-colors">Fitur</Link>
                <Link to={getNavLink('#integrations')} className="text-gray-300 hover:text-blue-400 transition-colors">Integrasi</Link>
                <Link to={getNavLink('#testimonials')} className="text-gray-300 hover:text-blue-400 transition-colors">Testimoni</Link>
              </>
            )}
            {/* Tautan untuk dokumentasi - selalu terlihat di desktop Navbar jika di halaman dokumentasi */}
            {isDocumentationPage && (
              <Link to="/documentation" className="text-blue-400 font-semibold hover:text-white transition-colors">Dokumentasi</Link>
            )}
          </div>

          {/* Tombol Autentikasi Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <SignedIn>
              <Link to="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700">Dashboard</Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Link to="/login" className="text-gray-300 hover:text-white font-medium">Login</Link>
              <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700">Mulai Gratis</Link>
            </SignedOut>
          </div>

          {/* Tombol Hamburger untuk Mobile */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Hanya tampilkan UserButton di mobile jika sudah login */}
            <SignedIn>
                <UserButton afterSignOutUrl="/" />
            </SignedIn>
            {/* Tombol hamburger untuk menu utama ATAU menu dokumentasi */}
            <button
              onClick={() => {
                if (isDocumentationPage && onToggleDocMenu) {
                  onToggleDocMenu(); // Panggil fungsi dari DocumentationPage untuk buka sidebar
                } else {
                  setIsMainMenuOpen(!isMainMenuOpen); // Buka menu utama
                }
              }}
              className="text-white"
            >
              {isMainMenuOpen || (isDocumentationPage && onToggleDocMenu) ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

        </div>
      </div>

      {/* Panel Menu Mobile yang Fungsional (Menu Utama) */}
      <AnimatePresence>
        {isMainMenuOpen && !isDocumentationPage && ( // Tampilkan hanya jika di halaman non-dokumentasi
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900/95"
          >
            <div className="px-2 pt-2 pb-4 space-y-2 flex flex-col items-center">
              <Link to={getNavLink('#features')} onClick={closeMainMenu} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Fitur</Link>
              <Link to={getNavLink('#integrations')} onClick={closeMainMenu} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Integrasi</Link>
              <Link to={getNavLink('#testimonials')} onClick={closeMainMenu} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Testimoni</Link>
              <div className="border-t border-gray-700 w-full my-3"></div>
              <SignedIn>
                <Link to="/dashboard" onClick={closeMainMenu} className="w-40 text-center bg-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium">Dashboard</Link>
                {/* UserButton tidak perlu di sini karena sudah ada di header mobile */}
              </SignedIn>
              <SignedOut>
                <Link to="/login" onClick={closeMainMenu} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Login</Link>
                <Link to="/register" onClick={closeMainMenu} className="w-40 text-center bg-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium">Mulai Gratis</Link>
              </SignedOut>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}