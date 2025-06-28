// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path' // <-- 1. Impor 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  // 2. Tambahkan blok 'resolve' di bawah ini
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})