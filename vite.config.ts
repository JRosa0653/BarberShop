import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      // Manual chunk splitting: visitors never download AdminPanel unless they open it
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react':  ['react', 'react-dom'],
            'vendor-motion': ['motion'],
            'vendor-icons':  ['lucide-react'],
          },
        },
      },
      minify: 'esbuild',
      chunkSizeWarningLimit: 600,
      assetsInlineLimit: 4096,
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
