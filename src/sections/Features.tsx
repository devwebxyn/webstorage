// src/sections/Features.tsx
import { motion } from 'framer-motion';
import { UploadCloud, ServerCog, Globe, BarChart, ArrowRight } from 'lucide-react';

const featureData = [
  { icon: <UploadCloud size={28} />, title: "Upload Cepat & Aman", description: "Infrastruktur kami mengoptimalkan kecepatan transfer data tanpa mengorbankan enkripsi end-to-end AES-256." },
  { icon: <ServerCog size={28} />, title: "Backup Otomatis", description: "Data Anda dicadangkan secara real-time di beberapa lokasi geografis untuk pemulihan bencana yang instan." },
  { icon: <Globe size={28} />, title: "Global Region Access", description: "Pilih dari puluhan data center kami di seluruh dunia untuk latensi terendah bagi pengguna Anda." },
  { icon: <BarChart size={28} />, title: "Manajemen Real-time", description: "Dapatkan wawasan mendalam dan kelola sumber daya Anda melalui dashboard analitik yang intuitif." }
];

export const Features = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Animasi muncul satu per satu
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="features" className="py-24 bg-gray-900 text-white">
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold">Dibangun untuk Kinerja Terbaik</h2>
        <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">Semua yang Anda butuhkan dalam satu platform terintegrasi, dirancang untuk skalabilitas dan keandalan tingkat enterprise.</p>
        
        <motion.div
          className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {featureData.map((feature) => (
            <motion.div
              key={feature.title}
              className="group relative p-8 rounded-xl border border-white/10 bg-gray-900 hover:bg-gray-800/50 transition-colors duration-300"
              variants={cardVariants}
            >
              <div className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(circle_at_top,_#1e40af,_transparent_40%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-blue-400 bg-blue-900/50 rounded-lg w-12 h-12 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-left">{feature.title}</h3>
                <p className="text-gray-400 text-left mb-4">{feature.description}</p>
                <a href="#" className="flex items-center text-blue-400 font-semibold group-hover:translate-x-1 transition-transform duration-300">
                  Pelajari lebih <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};