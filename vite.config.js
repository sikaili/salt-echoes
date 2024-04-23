import { defineConfig } from "vite";
import React from "@vitejs/plugin-react"; // Changed 'react' to 'React' for consistency
import path from "path"; // Changed to use ES module import

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [React()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@sketches": path.resolve(__dirname, "./src/sketches"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Organize chunks manually
        manualChunks(id) {
          // Check if the module is from node_modules
          if (id.includes("node_modules")) {
            // Group dependencies into chunks by package
            // Correctly handling scoped packages like @vue, @angular etc.
            const packageName = id.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
            )[1];
            return packageName.includes("@")
              ? packageName.split("/")[0] + packageName.split("/")[1]
              : packageName;
          }
        },
      },
    },
  },
});
