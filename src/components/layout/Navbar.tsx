// src/components/layout/Navbar.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink, useLocation } from 'react-router-dom'; 
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Logo } from '../../assets/Logo';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMainMenu = () => setIsMainMenuOpen(false);
  const getNavlinkClass = ({ isActive }: { isActive: boolean, isPending: boolean }) =>
    `transition-colors text-base font-medium ${isActive ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`;

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
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">CloudNest</span>
          </Link>

          {/* Navigasi Desktop - Berubah sesuai state login */}
          <div className="hidden md:flex items-center space-x-8">
            <SignedOut>
              <Link to="/#features" className="text-gray-300 hover:text-blue-400 transition-colors">Fitur</Link>
              <Link to="/#integrations" className="text-gray-300 hover:text-blue-400 transition-colors">Integrasi</Link>
              <Link to="/#testimonials" className="text-gray-300 hover:text-blue-400 transition-colors">Testimoni</Link>
            </SignedOut>
            <SignedIn>
              {/* Tautan navigasi baru setelah login */}
              <NavLink to="/dashboard" className={getNavlinkClass}>Dashboard</NavLink>
              <NavLink to="/private-files" className={getNavlinkClass}>Private</NavLink>
              <NavLink to="/shared-files" className={getNavlinkClass}>Shared</NavLink>
            </SignedIn>
          </div>

          {/* Tombol Autentikasi Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <SignedIn>
              {/* === TOMBOL DASHBOARD DIKEMBALIKAN === */}
              <Link to="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700">Dashboard</Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Link to="/login" className="text-gray-300 hover:text-white font-medium">Login</Link>
              <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700">Mulai Gratis</Link>
            </SignedOut>
          </div>

          {/* Tombol Hamburger Mobile */}
          <div className="md:hidden flex items-center space-x-4">
            <SignedIn>
                <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <button onClick={() => setIsMainMenuOpen(!isMainMenuOpen)} className="text-white">
              {isMainMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Panel Menu Mobile */}
      <AnimatePresence>
        {isMainMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900/95"
          >
            <div className="px-2 pt-2 pb-4 space-y-2 flex flex-col items-center">
              <SignedOut>
                <Link to="/#features" onClick={closeMainMenu} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Fitur</Link>
                <Link to="/#integrations" onClick={closeMainMenu} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Integrasi</Link>
                <Link to="/#testimonials" onClick={closeMainMenu} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Testimoni</Link>
                <div className="border-t border-gray-700 w-full my-3"></div>
                <Link to="/login" onClick={closeMainMenu} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Login</Link>
                <Link to="/register" onClick={closeMainMenu} className="w-40 text-center bg-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium">Mulai Gratis</Link>
              </SignedOut>
              <SignedIn>
                <Link to="/dashboard" onClick={closeMainMenu} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Dashboard</Link>
                <Link to="/files?view=private" onClick={closeMainMenu} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Private</Link>
                <Link to="/files?view=shared" onClick={closeMainMenu} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Shared</Link>
              </SignedIn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}