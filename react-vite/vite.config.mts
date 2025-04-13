import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import monacoEditorPluginModule from 'vite-plugin-monaco-editor';
import path from 'path';

// https://github.com/vdesjs/vite-plugin-monaco-editor/issues/21
const isObjectWithDefaultFunction = (module: unknown): module is { default: typeof monacoEditorPluginModule } =>
  module != null && typeof module === 'object' && 'default' in module && typeof module.default === 'function';

const monacoEditorPlugin = isObjectWithDefaultFunction(monacoEditorPluginModule) ? monacoEditorPluginModule.default : monacoEditorPluginModule;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), monacoEditorPlugin({})],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/mock': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
