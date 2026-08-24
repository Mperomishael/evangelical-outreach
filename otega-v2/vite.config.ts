import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // When running `vite` directly (not `vercel dev`), proxy /api calls
      // to a local vercel dev instance on 3001 if you run both together.
      '/api': { target: 'http://localhost:3001', changeOrigin: true },
    },
  },
});
