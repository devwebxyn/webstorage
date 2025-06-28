// src/sections/Hero.tsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center text-center bg-gray-900 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/path-to-your/bg-cloud.svg')] opacity-5"></div>
      
      <div className="relative z-10 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 pb-4"
        >
          Infrastruktur Cloud Generasi Berikutnya
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
          className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-gray-300"
        >
          CloudNest menyediakan platform data center dan penyimpanan enterprise yang aman, cepat, dan skalabel untuk kebutuhan bisnis global Anda.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
          className="mt-10 flex justify-center gap-4"
        >
          <Link to="/register" className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/50">
            Mulai Migrasi
          </Link>
          <a href="#features" className="border border-gray-600 text-white px-8 py-3 rounded-md font-semibold text-lg hover:bg-gray-800 transition-all duration-300">
            Pelajari Fitur
          </a>
        </motion.div>
      </div>
    </section>
  );
};