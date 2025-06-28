// src/components/layout/Footer.tsx
import React from 'react';
import { Logo } from '../../assets/Logo';
// 1. Pastikan 'Link' diimpor dari 'react-router-dom'
import { Link } from 'react-router-dom'; 

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0 max-w-xs">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <Logo className="h-10 w-10 rounded-full border-2 border-blue-500 p-0.5 bg-gray-800" />
              <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
                CloudNest
              </span>
            </Link>
            <p className="text-gray-400">
              Platform penyimpanan cloud enterprise yang aman, cepat, dan andal.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-white">Resources</h2>
              <ul className="text-gray-400 font-medium">
                <li className="mb-4">
                  {/* 2. Ubah <a> menjadi <Link> dengan 'to' yang benar */}
                  <Link to="/documentation" className="hover:underline">Dokumentasi</Link>
                </li>
                <li><a href="#" className="hover:underline">API Status</a></li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-white">Follow us</h2>
              <ul className="text-gray-400 font-medium">
                <li className="mb-4"><a href="#" className="hover:underline">Github</a></li>
                <li><a href="#" className="hover:underline">Discord</a></li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-white">Legal</h2>
              <ul className="text-gray-400 font-medium">
                <li className="mb-4"><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 sm:mx-auto border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm sm:text-center text-gray-400">
            © 2025 <Link to="/" className="hover:underline">CloudNest™</Link>. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};