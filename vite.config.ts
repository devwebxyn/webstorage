// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path' // <-- Penting: Impor 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      // Ini adalah alias yang Anda gunakan
      '@': path.resolve(__dirname, './src'),
    },
  },
})