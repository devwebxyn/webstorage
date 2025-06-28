// src/sections/Integrations.tsx
import { motion } from 'framer-motion';
import { CodeXml } from 'lucide-react';
import { GithubLogo } from '../assets/TechLogos'; // Kita masih pakai ini untuk GitHub

// Impor path gambar untuk Supabase dan Docker
import supabaseLogoSrc from '../assets/logo-supabase.png';
import dockerLogoSrc from '../assets/logo-docker.png';

// Data untuk setiap logo
const integrationsList = [
  { 
    name: 'GitHub', 
    icon: <GithubLogo className="h-12 w-12 text-gray-300" /> 
  },
  { 
    name: 'Supabase', 
    // Gunakan tag <img> dengan path yang sudah diimpor
    icon: <img src={supabaseLogoSrc} alt="Supabase Logo" className="h-12 object-contain" /> 
  },
  { 
    name: 'Docker', 
    // Gunakan tag <img> dengan path yang sudah diimpor
    icon: <img src={dockerLogoSrc} alt="Docker Logo" className="h-12 object-contain" /> 
  },
  { 
    name: 'API Rest', 
    icon: <CodeXml size={48} className="text-gray-300" /> 
  },
];

export const Integrations = () => (
  <section id="integrations" className="py-20 bg-gray-900">
    <div className="max-w-screen-lg mx-auto px-4 text-center">
      <h2 className="text-4xl font-bold text-white">Terintegrasi dengan Mudah</h2>
      <p className="mt-4 text-lg text-gray-400">
        Hubungkan CloudNest dengan ekosistem development Anda tanpa hambatan.
      </p>
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
        {integrationsList.map((item, index) => (
          <motion.div
            key={item.name}
            className="bg-gray-800/50 p-6 rounded-lg flex flex-col items-center justify-center gap-4 border border-transparent hover:border-blue-500 hover:bg-gray-800 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex-grow flex items-center justify-center">{item.icon}</div>
            <p className="text-white font-semibold text-lg mt-2">{item.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);