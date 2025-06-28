// src/components/layout/Navbar.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom'; // <-- 1. Impor 'useLocation'
import { Logo } from '../../assets/Logo';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const location = useLocation(); // <-- 2. Dapatkan lokasi halaman saat ini

  // Fungsi untuk menutup menu saat link diklik
  const closeMenu = () => setIsMenuOpen(false);

  // Fungsi untuk menentukan path link yang benar
  const getNavLink = (path: string) => {
    // Jika kita di landing page, gunakan hash link. Jika tidak, kembali ke landing page lalu ke hash.
    return location.pathname === '/' ? path : `/${path}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          <Link to="/" className="flex items-center space-x-3">
            <Logo className="h-12 w-12 rounded-full border-2 border-blue-500 p-1 bg-gray-800 shadow-lg" />
            {/* 3. Hapus kelas 'hidden sm:block' agar judul selalu tampil */}
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              CloudNest
            </span>
          </Link>

          {/* Navigasi untuk Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to={getNavLink('#features')} className="text-gray-300 hover:text-blue-400 transition-colors duration-300 font-medium">Fitur</Link>
            <Link to={getNavLink('#integrations')} className="text-gray-300 hover:text-blue-400 transition-colors duration-300 font-medium">Integrasi</Link>
            <Link to={getNavLink('#testimonials')} className="text-gray-300 hover:text-blue-400 transition-colors duration-300 font-medium">Testimoni</Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium">Login</Link>
            <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition-all duration-300">
              Mulai Gratis
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Panel Menu Mobile */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-gray-900/95 backdrop-blur-lg`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
            <Link to={getNavLink('#features')} onClick={closeMenu} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Fitur</Link>
            <Link to={getNavLink('#integrations')} onClick={closeMenu} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Integrasi</Link>
            <Link to={getNavLink('#testimonials')} onClick={closeMenu} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Testimoni</Link>
            <div className="border-t border-gray-700 w-full my-3"></div>
            <Link to="/login" onClick={closeMenu} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Login</Link>
            <Link to="/register" onClick={closeMenu} className="w-full text-center bg-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium">Mulai Gratis</Link>
        </div>
      </div>
    </motion.nav>
  );
};