
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'

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
