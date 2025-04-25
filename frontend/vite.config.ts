import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dns from 'node:dns';
dns.setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
  },
  build: {
    outDir: './build',
  },
  base: '/Slab2Reuse/',
  resolve: {
    alias: {
      src: '/src',
    },
  },
});
