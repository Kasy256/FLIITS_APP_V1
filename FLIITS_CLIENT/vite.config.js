import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    commonjs(),
    nodeResolve()
  ],
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
