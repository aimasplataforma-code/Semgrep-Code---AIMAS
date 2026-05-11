import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              // React and ecosystem
              'vendor-react': ['react', 'react-dom', 'react-router-dom'],
              // Data layer
              'vendor-supabase': ['@supabase/supabase-js'],
              // Google Maps (heavy WebGL)
              'vendor-maps': ['@vis.gl/react-google-maps'],
              // AI logic
              'vendor-gemini': ['@google/genai'],
              // UI Icons
              'vendor-icons': ['lucide-react'],
              // State management
              'vendor-state': ['zustand']
            }
          }
        },
        chunkSizeWarningLimit: 600,
      }
    };
});
