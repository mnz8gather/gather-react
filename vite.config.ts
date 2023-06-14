import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { react_convention_route } from './plugins';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), react_convention_route()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://xxx.xxx.com',
  //       changeOrigin: true,
  //       // rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },
});
