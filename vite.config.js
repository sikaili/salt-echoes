import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Organize chunks manually
        manualChunks(id) {
          // Check if the module is from node_modules
          if (id.includes('node_modules')) {
            // Group dependencies into chunks by package
            return id.split('node_modules/')[1].split('/')[0].replace('@', ''); // Handle scoped packages
          }
        },
      },
    },
  },
});
