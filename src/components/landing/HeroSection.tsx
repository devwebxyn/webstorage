// src/components/landing/HeroSection.tsx

import React from 'react';
import { Link } from 'react-router-dom';

export const HeroSection: React.FC = () => {
  return (
    <section className="bg-gray-900 text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Pusat Data Enterprise Anda.
            <span className="sm:block"> Disederhanakan di Cloud. </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed text-gray-300">
            Simpan, kelola, dan akses data skala besar Anda dengan keamanan dan keandalan kelas dunia. Dibangun untuk masa depan.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              to="/register"
            >
              Mulai Sekarang
            </Link>
            <Link
              className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring sm:w-auto"
              to="/features"
            >
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};