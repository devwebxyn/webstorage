// src/sections/Testimonials.tsx
import { motion } from 'framer-motion';
// Impor logo partner dari file aset kustom Anda
import { GithubLogo, SupabaseLogo, DockerLogo } from '../assets/TechLogos'; 

const testimonials = [
  { name: 'Aria Chen', company: 'CTO di TechNova', quote: '"CloudNest mengubah cara kami mengelola data. Skalabilitasnya luar biasa dan keamanannya tak tertandingi."' },
  { name: 'Ben Carter', company: 'Lead DevOps di BitWare', quote: '"Kecepatan dan keandalan backup otomatisnya menyelamatkan kami berkali-kali. Platform yang solid."' },
  { name: 'Chloe Davis', company: 'Founder Orbitron', quote: '"Sebagai startup, kami butuh solusi yang efisien. CloudNest memberikan performa enterprise dengan harga yang masuk akal."' },
];

export const Testimonials = () => {
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-24 bg-gray-950 text-white overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center">Dipercaya oleh Ribuan Perusahaan Inovatif</h2>
        <div className="mt-12 relative h-40 flex items-center">
          <motion.div
            className="absolute flex"
            animate={{
              x: ['0%', '-100%'],
              transition: {
                ease: 'linear',
                duration: 20,
                repeat: Infinity,
              }
            }}
          >
            {duplicatedTestimonials.map((item, index) => (
              <div key={index} className="flex-shrink-0 w-80 mx-4 p-6 bg-gray-900 rounded-lg border border-gray-800">
                <p className="italic">"{item.quote}"</p>
                <p className="mt-4 font-bold text-right">- {item.name}, <span className="text-blue-400">{item.company}</span></p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};