import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  // 👇 This fixes the 404 issue on refresh
  build: {
    rollupOptions: {
      input: '/index.html',
    }
  },
  // 👇 Most important part
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  // 👇 Catch-all fallback for React Router
  base: '/',
});
