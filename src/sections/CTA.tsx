// src/sections/CTA.tsx
import { motion } from 'framer-motion';

export const CTA = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-900 via-gray-900 to-purple-900">
      <div className="max-w-screen-md mx-auto px-4 text-center">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Siap Mengubah Infrastruktur Anda?
        </motion.h2>
        <motion.p 
          className="mt-4 text-lg text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Percayakan data Anda pada platform masa depan. Mulai migrasi ke CloudNest hari ini dan rasakan perbedaannya.
        </motion.p>
        <motion.button 
          className="mt-10 bg-white text-gray-900 px-10 py-4 rounded-lg font-bold text-lg shadow-2xl shadow-white/20"
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          Hubungi Tim Sales
        </motion.button>
      </div>
    </section>
  )
}