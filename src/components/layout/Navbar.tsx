// frontend/src/components/layout/Navbar.tsx

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Logo } from '../../assets/Logo';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Efek untuk mendeteksi scroll dan mengubah tampilan Navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fungsi untuk menutup menu mobile saat link diklik
  const closeMenu = () => setIsMenuOpen(false);

  // Fungsi cerdas untuk menentukan path link navigasi
  const getNavLink = (path: string) => {
    return location.pathname === '/' ? path : `/${path}`;
  };

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
            <Link to={getNavLink('#features')} className="text-gray-300 hover:text-blue-400 transition-colors">Fitur</Link>
            <Link to={getNavLink('#integrations')} className="text-gray-300 hover:text-blue-400 transition-colors">Integrasi</Link>
            <Link to={getNavLink('#testimonials')} className="text-gray-300 hover:text-blue-400 transition-colors">Testimoni</Link>
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
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

        </div>
      </div>

      {/* Panel Menu Mobile yang Fungsional */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900/95"
          >
            <div className="px-2 pt-2 pb-4 space-y-2 flex flex-col items-center">
              <Link to={getNavLink('#features')} onClick={closeMenu} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Fitur</Link>
              <Link to={getNavLink('#integrations')} onClick={closeMenu} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Integrasi</Link>
              <Link to={getNavLink('#testimonials')} onClick={closeMenu} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Testimoni</Link>
              <div className="border-t border-gray-700 w-full my-3"></div>
              <SignedIn>
                <Link to="/dashboard" onClick={closeMenu} className="w-40 text-center bg-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium">Dashboard</Link>
                <div className="pt-4"><UserButton afterSignOutUrl="/" /></div>
              </SignedIn>
              <SignedOut>
                <Link to="/login" onClick={closeMenu} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Login</Link>
                <Link to="/register" onClick={closeMenu} className="w-40 text-center bg-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium">Mulai Gratis</Link>
              </SignedOut>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// Jangan lupa untuk mengimpor AnimatePresence jika belum ada
import { AnimatePresence } from 'framer-motion';